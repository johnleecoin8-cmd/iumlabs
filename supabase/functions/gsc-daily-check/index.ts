// Daily Search Console health check.
// - Inspects key URLs, saves snapshots
// - Pulls sitemap status
// - Detects missing / not-indexed / error URLs (new today vs yesterday)
// - Sends email alert via Resend if any new issues
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "sc-domain:iumlabs.io";
const SITEMAP_URLS = [
  "https://iumlabs.io/sitemap.xml",
  "https://iumlabs.io/sitemap-index.xml",
  "https://iumlabs.io/sitemap-blog.xml",
];
const KEY_URLS = [
  "https://iumlabs.io/",
  "https://iumlabs.io/blog",
  "https://iumlabs.io/projects",
  "https://iumlabs.io/contact",
  "https://iumlabs.io/services/gtm",
  "https://iumlabs.io/services/influencer",
  "https://iumlabs.io/services/pr",
  "https://iumlabs.io/services/community",
  "https://iumlabs.io/services/ama",
  "https://iumlabs.io/services/offline-event",
  "https://iumlabs.io/services/seo-ads",
  "https://iumlabs.io/services/deep-research",
  "https://iumlabs.io/services/branding",
  "https://iumlabs.io/jobs",
  "https://iumlabs.io/crypto-marketing-korea",
  "https://iumlabs.io/kol-marketing-korea",
  "https://iumlabs.io/korea-web3-guide",
];

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

async function gscFetch(path: string, init: RequestInit = {}) {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const gscKey = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
  if (!lovableKey || !gscKey) throw new Error("Missing LOVABLE_API_KEY or GOOGLE_SEARCH_CONSOLE_API_KEY");
  const res = await fetch(`${GATEWAY}${path}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": gscKey,
    },
  });
  const text = await res.text();
  let body: any;
  try { body = JSON.parse(text); } catch { body = { raw: text }; }
  if (!res.ok) throw new Error(`GSC ${path} ${res.status}: ${text.slice(0, 300)}`);
  return body;
}

async function inspectUrl(url: string) {
  return gscFetch("/webmasters/v3/urlInspection/index:inspect" /* fallback */, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE_URL }),
  }).catch(() =>
    // Correct path
    gscFetch("/v1/urlInspection/index:inspect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE_URL }),
    })
  );
}

async function getSitemap(sitemapUrl: string) {
  return gscFetch(
    `/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps/${encodeURIComponent(sitemapUrl)}`
  );
}

async function sendEmailAlert(alerts: any[], summary: any) {
  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!resendKey || alerts.length === 0) return { sent: false, reason: "no-key-or-no-alerts" };

  const rows = alerts
    .slice(0, 50)
    .map(
      (a) =>
        `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee">${a.alert_type}</td>` +
        `<td style="padding:6px 12px;border-bottom:1px solid #eee"><a href="${a.url || "#"}">${a.url || "-"}</a></td>` +
        `<td style="padding:6px 12px;border-bottom:1px solid #eee;color:#666;font-size:12px">${JSON.stringify(a.details || {})}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:-apple-system,sans-serif;max-width:720px;margin:0 auto;padding:24px">
      <h2 style="margin:0 0 8px">🚨 Search Console Daily Report — iumlabs.io</h2>
      <p style="color:#666;margin:0 0 16px">${new Date().toISOString().slice(0, 10)} · ${alerts.length} alerts</p>
      <div style="background:#f7f7f9;padding:12px 16px;border-radius:8px;margin-bottom:16px">
        <strong>Summary:</strong> ${summary.inspected} URLs inspected · ${summary.indexed} indexed · ${summary.notIndexed} not indexed · ${summary.errors} errors
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <thead><tr style="background:#f0f0f3"><th style="text-align:left;padding:8px 12px">Type</th><th style="text-align:left;padding:8px 12px">URL</th><th style="text-align:left;padding:8px 12px">Details</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="margin-top:24px"><a href="https://iumlabs.io/ium-admin/gsc" style="background:#000;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Open dashboard →</a></p>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "GSC Monitor <admin@iumlabs.io>",
      to: ["admin@iumlabs.io"],
      subject: `[GSC] ${alerts.length} issues · ${new Date().toISOString().slice(0, 10)}`,
      html,
    }),
  });
  const out = await res.json().catch(() => ({}));
  return { sent: res.ok, status: res.status, response: out };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    const today = new Date().toISOString().slice(0, 10);
    const snapshots: any[] = [];
    const alerts: any[] = [];
    let inspected = 0, indexed = 0, notIndexed = 0, errors = 0;

    // Inspect key URLs
    for (const url of KEY_URLS) {
      inspected++;
      try {
        const data: any = await inspectUrl(url);
        const ir = data?.inspectionResult ?? {};
        const idx = ir.indexStatusResult ?? {};
        const verdict = idx.verdict || "UNKNOWN";
        const indexingState = idx.indexingState || "UNKNOWN";
        const coverageState = idx.coverageState || null;

        snapshots.push({
          recorded_date: today,
          url,
          verdict,
          indexing_state: indexingState,
          coverage_state: coverageState,
          last_crawl_time: idx.lastCrawlTime || null,
          page_fetch_state: idx.pageFetchState || null,
          robots_txt_state: idx.robotsTxtState || null,
          rich_results_count: ir.richResultsResult?.detectedItems?.length || 0,
          mobile_verdict: ir.mobileUsabilityResult?.verdict || null,
          raw: ir,
        });

        if (verdict === "PASS") indexed++;
        else if (verdict === "FAIL") {
          errors++;
          alerts.push({ alert_type: "error", url, details: { verdict, indexingState, coverageState } });
        } else {
          notIndexed++;
          alerts.push({ alert_type: "not_indexed", url, details: { verdict, indexingState, coverageState } });
        }
      } catch (e) {
        errors++;
        alerts.push({ alert_type: "error", url, details: { message: (e as Error).message } });
      }
    }

    if (snapshots.length) await supabase.from("gsc_inspection_snapshots").insert(snapshots);

    // Sitemaps
    const sitemapSnaps: any[] = [];
    for (const sm of SITEMAP_URLS) {
      try {
        const data: any = await getSitemap(sm);
        sitemapSnaps.push({
          recorded_date: today,
          sitemap_url: sm,
          is_pending: data.isPending ?? null,
          is_sitemaps_index: data.isSitemapsIndex ?? null,
          last_submitted: data.lastSubmitted || null,
          last_downloaded: data.lastDownloaded || null,
          warnings: Number(data.warnings || 0),
          errors: Number(data.errors || 0),
          contents: data.contents || null,
        });
        if (Number(data.errors || 0) > 0) {
          alerts.push({ alert_type: "sitemap_error", url: sm, details: { errors: data.errors, warnings: data.warnings } });
        }
      } catch (e) {
        alerts.push({ alert_type: "sitemap_error", url: sm, details: { message: (e as Error).message } });
      }
    }
    if (sitemapSnaps.length) await supabase.from("gsc_sitemap_snapshots").insert(sitemapSnaps);

    // Send email
    const emailResult = await sendEmailAlert(alerts, { inspected, indexed, notIndexed, errors });

    // Persist alerts with notification status
    if (alerts.length) {
      await supabase.from("gsc_alerts").insert(
        alerts.map((a) => ({
          ...a,
          recorded_date: today,
          notified: !!emailResult.sent,
          notification_channel: emailResult.sent ? "email" : null,
        }))
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        date: today,
        summary: { inspected, indexed, notIndexed, errors, alerts: alerts.length },
        email: emailResult,
      }),
      { headers: { ...CORS, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("gsc-daily-check error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
