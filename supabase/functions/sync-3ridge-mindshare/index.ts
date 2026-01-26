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

interface ProjectWithVariance extends ParsedProject {
  adjustedMindshare: number;
  adjustedMindshareChange: number;
  adjustedScore: number;
  adjustedSparkline: number[];
}

// ============================================
// Deterministic Variance Functions
// ============================================

// Seed-based pseudo-random number generator (deterministic)
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Convert ticker + field to a unique seed
function tickerToSeed(ticker: string, field: string): number {
  const combined = ticker + field;
  return combined.split('').reduce((acc, ch, i) => 
    acc + ch.charCodeAt(0) * (i + 1), 0);
}

// Apply deterministic variance to a value
// range: e.g., 0.12 means ±12%
function applyVariance(value: number, ticker: string, field: string, range: number = 0.1): number {
  if (value === 0) return 0;
  const seed = tickerToSeed(ticker, field);
  const variance = (seededRandom(seed) - 0.5) * 2 * range; // -range ~ +range
  return value * (1 + variance);
}

// Apply variance to sparkline array
function applySparklineVariance(sparkline: number[], ticker: string): number[] {
  return sparkline.map((value, index) => {
    const seed = tickerToSeed(ticker, `sparkline_${index}`);
    const variance = (seededRandom(seed) - 0.5) * 2 * 0.06; // ±6% per point
    return Math.round(value * (1 + variance));
  });
}

// ============================================
// Markdown Parsing
// ============================================

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

// ============================================
// Main Handler
// ============================================

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting 3ridge mindshare sync with variance...");
    
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
        waitFor: 5000, // Wait for dynamic content
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

    // ============================================
    // Apply Variance to All Projects
    // ============================================
    console.log("Applying deterministic variance to projects...");
    
    const projectsWithVariance: ProjectWithVariance[] = parsedProjects.map(project => {
      const existing = existingMap.get(project.ticker);
      const existingSparkline = existing?.sparkline || [];
      
      // Calculate base score from mindshare
      const baseScore = project.mindshare * 100;
      
      // Apply variance to mindshare (±12%)
      const adjustedMindshare = applyVariance(project.mindshare, project.ticker, 'mindshare', 0.12);
      
      // Apply variance to mindshare change (±18%)
      const adjustedMindshareChange = applyVariance(project.mindshare_change, project.ticker, 'change', 0.18);
      
      // Apply variance to score (±8%)
      const adjustedScore = applyVariance(baseScore, project.ticker, 'score', 0.08);
      
      // Update sparkline with variance
      const newSparkline = [...existingSparkline, Math.round(adjustedScore)].slice(-8);
      const adjustedSparkline = applySparklineVariance(newSparkline, project.ticker);
      
      return {
        ...project,
        adjustedMindshare,
        adjustedMindshareChange,
        adjustedScore,
        adjustedSparkline,
      };
    });

    // ============================================
    // Re-sort by Adjusted Mindshare for New Rankings
    // ============================================
    const sortedProjects = [...projectsWithVariance]
      .sort((a, b) => b.adjustedMindshare - a.adjustedMindshare)
      .map((project, index) => ({
        ...project,
        adjustedRank: index + 1,
      }));

    console.log(`Variance applied. Sample: ${sortedProjects[0]?.ticker} original mindshare: ${sortedProjects[0]?.mindshare}%, adjusted: ${sortedProjects[0]?.adjustedMindshare.toFixed(4)}%`);

    // ============================================
    // Upsert Projects with Variance-Applied Data
    // ============================================
    const results: { ticker: string; status: string; originalRank: number; adjustedRank: number; error?: string }[] = [];
    
    for (const project of sortedProjects) {
      try {
        const { error: upsertError } = await supabase
          .from("hype_projects")
          .upsert({
            ticker: project.ticker,
            name: project.name,
            rank: project.adjustedRank, // Use variance-adjusted rank
            score: project.adjustedScore, // Use variance-adjusted score
            mindshare: project.adjustedMindshare, // Use variance-adjusted mindshare
            mindshare_change: project.adjustedMindshareChange, // Use variance-adjusted change
            logo_url: project.logo_url,
            sparkline: project.adjustedSparkline, // Use variance-adjusted sparkline
            trend: project.adjustedMindshareChange > 0 ? "up" : project.adjustedMindshareChange < 0 ? "down" : "neutral",
            token_status: "tge",
            updated_at: new Date().toISOString(),
          }, { onConflict: "ticker" });

        if (upsertError) {
          results.push({ 
            ticker: project.ticker, 
            status: "error", 
            originalRank: project.rank,
            adjustedRank: project.adjustedRank,
            error: upsertError.message 
          });
        } else {
          results.push({ 
            ticker: project.ticker, 
            status: "success",
            originalRank: project.rank,
            adjustedRank: project.adjustedRank,
          });
        }
      } catch (err) {
        results.push({ 
          ticker: project.ticker, 
          status: "error",
          originalRank: project.rank,
          adjustedRank: project.adjustedRank,
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

    console.log(`Sync complete with variance: ${successCount} success, ${errorCount} errors`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Synced ${parsedProjects.length} projects with Ium Labs variance: ${successCount} success, ${errorCount} errors`,
        varianceApplied: {
          mindshare: "±12%",
          mindshareChange: "±18%",
          score: "±8%",
          sparkline: "±6% per point",
          rankRecalculated: true,
        },
        results: results.slice(0, 10), // Return first 10 for brevity
        debug: {
          scrapedLength: markdown.length,
          parsedCount: parsedProjects.length,
          sampleComparison: sortedProjects.slice(0, 3).map(p => ({
            ticker: p.ticker,
            original: { mindshare: p.mindshare, rank: p.rank },
            adjusted: { mindshare: p.adjustedMindshare.toFixed(4), rank: p.adjustedRank },
          })),
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
