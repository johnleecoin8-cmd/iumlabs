import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface HypeProject {
  rank: number;
  name: string;
  ticker: string;
  score: number;
  mindshare?: number;
  mindshare_change?: number; // Percentage change from previous period
  token_status?: 'tge' | 'pre-tge';
  category?: 'tge' | 'pre_tge'; // From Python crawler (uses underscore)
  narrative?: string; // AI, L2, DePIN, Meme, DeFi, Gaming, etc.
  trend?: string;
  sparkline?: number[];
  logo_url?: string;
}

interface RequestBody {
  api_key: string;
  projects: HypeProject[];
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Only accept POST requests
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body: RequestBody = await req.json();

    // Validate API key (trim whitespace for robustness)
    const crawlerApiKey = Deno.env.get("CRAWLER_API_KEY")?.trim();
    const providedKey = body.api_key?.trim();
    
    // Also check x-api-key header as fallback
    const headerKey = req.headers.get("x-api-key")?.trim();
    const effectiveKey = providedKey || headerKey;
    
    if (!crawlerApiKey || effectiveKey !== crawlerApiKey) {
      // Debug info (safe - doesn't leak full key)
      const debugInfo = {
        providedKeyLength: providedKey?.length ?? 0,
        headerKeyLength: headerKey?.length ?? 0,
        expectedKeyLength: crawlerApiKey?.length ?? 0,
        providedKeyPreview: providedKey ? `${providedKey.slice(0, 3)}...${providedKey.slice(-3)}` : "none",
      };
      console.log("Auth failed - debug:", JSON.stringify(debugInfo));
      
      return new Response(
        JSON.stringify({ 
          error: "Unauthorized: Invalid API key",
          debug: debugInfo
        }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate projects array
    if (!body.projects || !Array.isArray(body.projects) || body.projects.length === 0) {
      return new Response(
        JSON.stringify({ error: "Bad Request: projects array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const results: { ticker: string; status: string; error?: string }[] = [];

    // Process each project
    for (const project of body.projects) {
      try {
        // Validate required fields
        if (!project.ticker || !project.name) {
          results.push({
            ticker: project.ticker || "unknown",
            status: "error",
            error: "Missing required fields: ticker and name",
          });
          continue;
        }

        // Map category (from Python) to token_status (DB field)
        // Python sends: "tge" or "pre_tge" (underscore)
        // DB expects: "tge" or "pre-tge" (hyphen)
        let tokenStatus: 'tge' | 'pre-tge' = 'tge';
        if (project.category === 'pre_tge' || project.token_status === 'pre-tge') {
          tokenStatus = 'pre-tge';
        } else if (project.category === 'tge' || project.token_status === 'tge') {
          tokenStatus = 'tge';
        }

        // Upsert into hype_projects table (ticker as unique key)
        const { error: upsertError } = await supabase
          .from("hype_projects")
          .upsert(
            {
              ticker: project.ticker,
              name: project.name,
              rank: project.rank || 0,
              score: project.score || 0,
              mindshare: project.mindshare || 0,
              mindshare_change: project.mindshare_change ?? null,
              token_status: tokenStatus,
              narrative: project.narrative || null,
              trend: project.trend || "neutral",
              sparkline: project.sparkline || [],
              logo_url: project.logo_url || null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "ticker" }
          );

        if (upsertError) {
          results.push({
            ticker: project.ticker,
            status: "error",
            error: upsertError.message,
          });
        } else {
          results.push({
            ticker: project.ticker,
            status: "success",
          });
        }
      } catch (err) {
        results.push({
          ticker: project.ticker || "unknown",
          status: "error",
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }
    }

    // Record snapshot for history tracking
    try {
      await supabase.rpc("record_hype_snapshot");
    } catch (snapshotError) {
      console.error("Failed to record hype snapshot:", snapshotError);
    }

    const successCount = results.filter((r) => r.status === "success").length;
    const errorCount = results.filter((r) => r.status === "error").length;

    return new Response(
      JSON.stringify({
        success: true,
        message: `Processed ${body.projects.length} projects: ${successCount} success, ${errorCount} errors`,
        results,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
