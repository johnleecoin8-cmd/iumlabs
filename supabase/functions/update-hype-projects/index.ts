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

    // Validate API key
    const crawlerApiKey = Deno.env.get("CRAWLER_API_KEY");
    if (!crawlerApiKey || body.api_key !== crawlerApiKey) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Invalid API key" }),
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
