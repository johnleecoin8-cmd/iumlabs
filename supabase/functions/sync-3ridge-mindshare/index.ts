import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ParsedProject {
  ticker: string;
  name: string;
  mindshare: number;
  mindshare_change: number;
  logo_url: string | null;
  rank: number;
}

// Parse the scraped markdown content from 3ridge
function parseMarkdownContent(markdown: string): ParsedProject[] {
  const projects: ParsedProject[] = [];
  
  // Split by image patterns to identify project entries
  const lines = markdown.split('\n');
  let currentTicker = '';
  let currentLogoUrl = '';
  let values: string[] = [];
  let rank = 1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Match image pattern: ![TICKER](logo_url)TICKER or ![TICKER](logo_url)
    const imageMatch = line.match(/!\[([A-Z0-9]+)\]\((https?:\/\/[^\)]+)\)([A-Z0-9]*)?/);
    
    if (imageMatch) {
      // Save previous project if exists
      if (currentTicker && values.length >= 2) {
        const mindshare = parseFloat(values[0]?.replace('%', '') || '0');
        const mindshareChange = parseFloat(values[1]?.replace('%', '') || '0');
        
        if (!isNaN(mindshare)) {
          projects.push({
            ticker: currentTicker,
            name: currentTicker,
            mindshare,
            mindshare_change: mindshareChange,
            logo_url: currentLogoUrl,
            rank: rank++,
          });
        }
      }
      
      currentTicker = imageMatch[1] || imageMatch[3] || '';
      currentLogoUrl = imageMatch[2] || '';
      values = [];
      continue;
    }
    
    // Match percentage values
    const percentMatch = line.match(/^([\d,.]+)%?$/);
    if (percentMatch && currentTicker) {
      values.push(percentMatch[1]);
    }
  }
  
  // Don't forget last project
  if (currentTicker && values.length >= 2) {
    const mindshare = parseFloat(values[0]?.replace('%', '') || '0');
    const mindshareChange = parseFloat(values[1]?.replace('%', '') || '0');
    
    if (!isNaN(mindshare)) {
      projects.push({
        ticker: currentTicker,
        name: currentTicker,
        mindshare,
        mindshare_change: mindshareChange,
        logo_url: currentLogoUrl,
        rank: rank++,
      });
    }
  }
  
  return projects;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting 3ridge mindshare sync...");
    
    const firecrawlApiKey = Deno.env.get("FIRECRAWL_API_KEY");
    if (!firecrawlApiKey) {
      console.error("FIRECRAWL_API_KEY not configured");
      return new Response(
        JSON.stringify({ success: false, error: "Firecrawl not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Scrape 3ridge mindshare dashboard
    console.log("Scraping 3ridge.io mindshare dashboard...");
    const scrapeResponse = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${firecrawlApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: "https://www.3ridge.io/dashboard/mindshare/community",
        formats: ["markdown"],
        onlyMainContent: true,
        waitFor: 5000,
      }),
    });

    if (!scrapeResponse.ok) {
      const errorData = await scrapeResponse.json();
      console.error("Firecrawl scrape error:", errorData);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to scrape 3ridge", details: errorData }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const scrapeData = await scrapeResponse.json();
    const markdown = scrapeData.data?.markdown || scrapeData.markdown || "";
    
    console.log("Scraped markdown length:", markdown.length);
    
    if (!markdown) {
      return new Response(
        JSON.stringify({ success: false, error: "No content scraped from 3ridge" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the scraped content
    const parsedProjects = parseMarkdownContent(markdown);
    console.log(`Parsed ${parsedProjects.length} projects from 3ridge`);

    if (parsedProjects.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "No projects parsed from content",
          debug: { markdownPreview: markdown.substring(0, 500) }
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get existing projects to preserve sparkline data
    const { data: existingProjects } = await supabase
      .from("hype_projects")
      .select("ticker, sparkline, score");

    const existingMap = new Map(
      (existingProjects || []).map(p => [p.ticker, p])
    );

    // Upsert projects (original data without variance)
    const results: { ticker: string; status: string; rank: number; error?: string }[] = [];
    
    for (const project of parsedProjects) {
      try {
        const existing = existingMap.get(project.ticker);
        const existingSparkline = existing?.sparkline || [];
        
        // Calculate score from mindshare
        const newScore = project.mindshare * 100;
        
        // Update sparkline (keep last 8 values)
        const newSparkline = [...existingSparkline, Math.round(newScore)].slice(-8);
        
        const { error: upsertError } = await supabase
          .from("hype_projects")
          .upsert({
            ticker: project.ticker,
            name: project.name,
            rank: project.rank,
            score: newScore,
            mindshare: project.mindshare,
            mindshare_change: project.mindshare_change,
            logo_url: project.logo_url,
            sparkline: newSparkline,
            trend: project.mindshare_change > 0 ? "up" : project.mindshare_change < 0 ? "down" : "neutral",
            token_status: "tge",
            updated_at: new Date().toISOString(),
          }, { onConflict: "ticker" });

        if (upsertError) {
          results.push({ 
            ticker: project.ticker, 
            status: "error", 
            rank: project.rank,
            error: upsertError.message 
          });
        } else {
          results.push({ 
            ticker: project.ticker, 
            status: "success",
            rank: project.rank,
          });
        }
      } catch (err) {
        results.push({ 
          ticker: project.ticker, 
          status: "error",
          rank: project.rank,
          error: err instanceof Error ? err.message : "Unknown error" 
        });
      }
    }

    // Record snapshot for history
    try {
      await supabase.rpc("record_hype_snapshot");
    } catch (snapshotError) {
      console.error("Failed to record hype snapshot:", snapshotError);
    }

    const successCount = results.filter(r => r.status === "success").length;
    const errorCount = results.filter(r => r.status === "error").length;

    console.log(`Sync complete: ${successCount} success, ${errorCount} errors`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Synced ${parsedProjects.length} projects: ${successCount} success, ${errorCount} errors`,
        results: results.slice(0, 10),
        debug: {
          scrapedLength: markdown.length,
          parsedCount: parsedProjects.length,
        }
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error syncing 3ridge data:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
