import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InspectRequest {
  urls?: string[];
  action: "inspect" | "submit-sitemap" | "ping";
}

async function getAccessToken(serviceAccountJson: string): Promise<string> {
  const sa = JSON.parse(serviceAccountJson);
  const now = Math.floor(Date.now() / 1000);
  const header = btoa(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = btoa(
    JSON.stringify({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/webmasters.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );

  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(sa.private_key),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sig = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(`${header}.${claim}`)
  );
  const jwt = `${header}.${claim}.${arrayBufferToBase64Url(sig)}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const data = await res.json();
  if (!data.access_token) throw new Error(`Auth failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  const bin = atob(b64);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return buf.buffer;
}

function arrayBufferToBase64Url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function inspectUrl(token: string, url: string, siteUrl: string) {
  const res = await fetch(
    "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inspectionUrl: url, siteUrl }),
    }
  );
  return res.json();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  try {
    const saJson = Deno.env.get("GSC_SERVICE_ACCOUNT_JSON");
    if (!saJson) {
      return new Response(
        JSON.stringify({
          error: "GSC_SERVICE_ACCOUNT_JSON not configured",
          setup: [
            "1. Create a Google Cloud service account with Search Console API enabled",
            "2. Add the service account email as a user in GSC for sc-domain:iumlabs.io",
            "3. Run: supabase secrets set GSC_SERVICE_ACCOUNT_JSON='<json>'",
          ],
        }),
        { status: 200, headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }

    const { urls, action }: InspectRequest = await req.json();
    const siteUrl = "sc-domain:iumlabs.io";
    const token = await getAccessToken(saJson);

    if (action === "inspect") {
      const targets = urls || [
        "https://iumlabs.io/",
        "https://iumlabs.io/blog",
        "https://iumlabs.io/services/gtm",
        "https://iumlabs.io/projects",
        "https://iumlabs.io/contact",
        "https://iumlabs.io/crypto-marketing-korea",
        "https://iumlabs.io/kol-marketing-korea",
      ];

      const results = [];
      for (const url of targets) {
        try {
          const data = await inspectUrl(token, url, siteUrl);
          const ir = data.inspectionResult;
          results.push({
            url,
            verdict: ir?.indexStatusResult?.verdict || "UNKNOWN",
            indexingState: ir?.indexStatusResult?.indexingState || "UNKNOWN",
            lastCrawlTime: ir?.indexStatusResult?.lastCrawlTime || null,
            crawledAs: ir?.indexStatusResult?.crawledAs || null,
            robotsTxtState: ir?.indexStatusResult?.robotsTxtState || null,
            pageFetchState: ir?.indexStatusResult?.pageFetchState || null,
            richResults: ir?.richResultsResult?.detectedItems?.length || 0,
            mobile: ir?.mobileUsabilityResult?.verdict || "UNKNOWN",
          });
        } catch (e) {
          results.push({ url, error: e.message });
        }
      }

      return new Response(JSON.stringify({ results, checkedAt: new Date().toISOString() }), {
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    if (action === "submit-sitemap") {
      const sitemapUrl = "https://iumlabs.io/sitemap-index.xml";
      const res = await fetch(
        `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return new Response(
        JSON.stringify({ submitted: res.ok, status: res.status }),
        { headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
