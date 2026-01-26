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

interface AggregatedProject {
  ticker: string;
  name: string;
  logo_url: string | null;
  // Data per period
  mindshare_7d: number | null;
  mindshare_14d: number | null;
  mindshare_30d: number | null;
  mindshare_90d: number | null;
  change_7d: number | null;
  change_14d: number | null;
  change_30d: number | null;
  change_90d: number | null;
  // Computed weighted values
  weightedMindshare: number;
  weightedChange: number;
  dataPoints: number;
}

interface ProjectWithVariance extends AggregatedProject {
  adjustedMindshare: number;
  adjustedMindshareChange: number;
  adjustedScore: number;
}

// ============================================
// Deterministic Variance Functions
// ============================================

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function tickerToSeed(ticker: string, field: string): number {
  const combined = ticker + field;
  return combined.split('').reduce((acc, ch, i) => 
    acc + ch.charCodeAt(0) * (i + 1), 0);
}

function applyVariance(value: number, ticker: string, field: string, range: number = 0.1): number {
  if (value === 0) return 0;
  const seed = tickerToSeed(ticker, field);
  const variance = (seededRandom(seed) - 0.5) * 2 * range;
  return value * (1 + variance);
}

function applySparklineVariance(sparkline: number[], ticker: string): number[] {
  return sparkline.map((value, index) => {
    const seed = tickerToSeed(ticker, `sparkline_${index}`);
    const variance = (seededRandom(seed) - 0.5) * 2 * 0.06;
    return Math.round(value * (1 + variance));
  });
}

function determineTrend(sparkline: number[]): 'up' | 'down' | 'neutral' {
  if (sparkline.length < 4) return 'neutral';
  
  const midPoint = Math.floor(sparkline.length / 2);
  const firstHalf = sparkline.slice(0, midPoint);
  const secondHalf = sparkline.slice(midPoint);
  
  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  
  const changePercent = ((secondAvg - firstAvg) / firstAvg) * 100;
  
  if (changePercent > 3) return 'up';
  if (changePercent < -3) return 'down';
  return 'neutral';
}

// ============================================
// Markdown Parsing
// ============================================

function parseMarkdownContent(markdown: string): ParsedProject[] {
  const projects: ParsedProject[] = [];
  
  const lines = markdown.split('\n');
  let currentTicker = '';
  let currentLogoUrl = '';
  let values: string[] = [];
  let rank = 1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    const imageMatch = line.match(/!\[([A-Z0-9]+)\]\((https?:\/\/[^\)]+)\)([A-Z0-9]*)?/);
    
    if (imageMatch) {
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
    
    const percentMatch = line.match(/^([\d,.]+)%?$/);
    if (percentMatch && currentTicker) {
      values.push(percentMatch[1]);
    }
  }
  
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
// Multi-Period Scraping & Aggregation
// ============================================

interface PeriodData {
  period: '7D' | '14D' | '30D' | '90D';
  projects: ParsedProject[];
  weight: number;
}

async function scrapePeriod(
  firecrawlApiKey: string, 
  dateRange: string
): Promise<ParsedProject[]> {
  const url = `https://www.3ridge.io/dashboard/mindshare/community?dateRange=${dateRange}`;
  console.log(`Scraping ${dateRange} data from: ${url}`);
  
  const scrapeResponse = await fetch("https://api.firecrawl.dev/v1/scrape", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${firecrawlApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      formats: ["markdown"],
      onlyMainContent: true,
      waitFor: 5000,
    }),
  });

  if (!scrapeResponse.ok) {
    const errorData = await scrapeResponse.json();
    console.error(`Firecrawl error for ${dateRange}:`, errorData);
    return [];
  }

  const scrapeData = await scrapeResponse.json();
  const markdown = scrapeData.data?.markdown || scrapeData.markdown || "";
  
  console.log(`${dateRange} scraped markdown length: ${markdown.length}`);
  
  const projects = parseMarkdownContent(markdown);
  console.log(`${dateRange} parsed ${projects.length} projects`);
  
  return projects;
}

// Clamp extreme change values to a reasonable range
function clampChange(change: number, maxPercent: number = 200): number {
  return Math.max(-maxPercent, Math.min(maxPercent, change));
}

function aggregatePeriodData(periodDataList: PeriodData[]): AggregatedProject[] {
  const projectMap = new Map<string, AggregatedProject>();
  
  // ============================================
  // CRITICAL: 7D data is the PRIMARY source for mindshare/change
  // 14D/30D/90D are ONLY for historical reference and trend analysis
  // ============================================
  const period7D = periodDataList.find(p => p.period === '7D');
  
  if (!period7D) {
    console.error('7D period data is missing - cannot proceed');
    return [];
  }
  
  // First: Initialize all projects from 7D data (primary source)
  for (const project of period7D.projects) {
    const agg: AggregatedProject = {
      ticker: project.ticker,
      name: project.name,
      logo_url: project.logo_url,
      // PRIMARY VALUES from 7D only
      weightedMindshare: project.mindshare,
      weightedChange: clampChange(project.mindshare_change, 200),
      dataPoints: 1,
      // Store period-specific data for reference
      mindshare_7d: project.mindshare,
      mindshare_14d: null,
      mindshare_30d: null,
      mindshare_90d: null,
      change_7d: project.mindshare_change,
      change_14d: null,
      change_30d: null,
      change_90d: null,
    };
    projectMap.set(project.ticker, agg);
  }
  
  console.log(`Initialized ${projectMap.size} projects from 7D data`);
  
  // Second: Add historical reference data from other periods (14D/30D/90D)
  // This is ONLY for trend analysis, NOT for calculating mindshare/change
  for (const periodData of periodDataList) {
    if (periodData.period === '7D') continue; // Already processed
    
    for (const project of periodData.projects) {
      const agg = projectMap.get(project.ticker);
      
      if (!agg) {
        // Project exists in longer periods but NOT in 7D
        // This means the project has dropped off recently - skip it
        console.log(`Skipping ${project.ticker}: exists in ${periodData.period} but not in 7D (inactive)`);
        continue;
      }
      
      // Store historical reference data
      switch (periodData.period) {
        case '14D':
          agg.mindshare_14d = project.mindshare;
          agg.change_14d = project.mindshare_change;
          break;
        case '30D':
          agg.mindshare_30d = project.mindshare;
          agg.change_30d = project.mindshare_change;
          break;
        case '90D':
          agg.mindshare_90d = project.mindshare;
          agg.change_90d = project.mindshare_change;
          break;
      }
    }
  }
  
  return Array.from(projectMap.values());
}

// ============================================
// Main Handler
// ============================================

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting multi-period 3ridge mindshare sync...");
    
    const firecrawlApiKey = Deno.env.get("FIRECRAWL_API_KEY");
    if (!firecrawlApiKey) {
      console.error("FIRECRAWL_API_KEY not configured");
      return new Response(
        JSON.stringify({ success: false, error: "Firecrawl not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ============================================
    // Scrape all 4 periods in parallel
    // ============================================
    console.log("Scraping 4 periods: 7D, 14D, 30D, 90D...");
    
    const [projects7D, projects14D, projects30D, projects90D] = await Promise.all([
      scrapePeriod(firecrawlApiKey, "7D"),
      scrapePeriod(firecrawlApiKey, "14D"),
      scrapePeriod(firecrawlApiKey, "30D"),
      scrapePeriod(firecrawlApiKey, "90D"),
    ]);

    // Weights: 7D (40%), 14D (30%), 30D (20%), 90D (10%)
    // This gives more importance to recent data while still considering long-term trends
    const periodDataList: PeriodData[] = [
      { period: '7D', projects: projects7D, weight: 0.40 },
      { period: '14D', projects: projects14D, weight: 0.30 },
      { period: '30D', projects: projects30D, weight: 0.20 },
      { period: '90D', projects: projects90D, weight: 0.10 },
    ];

    const totalScraped = projects7D.length + projects14D.length + projects30D.length + projects90D.length;
    console.log(`Total scraped across all periods: ${totalScraped}`);

    // ============================================
    // Aggregate data from all periods
    // ============================================
    const aggregatedProjects = aggregatePeriodData(periodDataList);
    console.log(`Aggregated ${aggregatedProjects.length} unique projects from all periods`);

    if (aggregatedProjects.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "No projects parsed from any period",
          debug: { 
            counts: { 
              '7D': projects7D.length, 
              '14D': projects14D.length, 
              '30D': projects30D.length, 
              '90D': projects90D.length 
            } 
          }
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
    console.log("Applying deterministic variance to aggregated projects...");
    
    const projectsWithVariance: ProjectWithVariance[] = aggregatedProjects.map(project => {
      const baseScore = project.weightedMindshare * 100;
      
      // Apply variance
      const adjustedMindshare = applyVariance(project.weightedMindshare, project.ticker, 'mindshare', 0.12);
      const adjustedMindshareChange = applyVariance(project.weightedChange, project.ticker, 'change', 0.18);
      const adjustedScore = applyVariance(baseScore, project.ticker, 'score', 0.08);
      
      return {
        ...project,
        adjustedMindshare,
        adjustedMindshareChange,
        adjustedScore,
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

    console.log(`Variance applied. Top 3: ${sortedProjects.slice(0, 3).map(p => p.ticker).join(', ')}`);

    // ============================================
    // Upsert Projects with Variance-Applied Data
    // ============================================
    const results: { 
      ticker: string; 
      status: string; 
      adjustedRank: number; 
      trend: string; 
      periodsFound: string[];
      error?: string 
    }[] = [];
    
    for (const project of sortedProjects) {
      try {
        const existing = existingMap.get(project.ticker);
        const existingSparkline = existing?.sparkline || [];
        
        // Update sparkline with new adjusted score
        const newSparkline = [...existingSparkline, Math.round(project.adjustedScore)].slice(-8);
        const adjustedSparkline = applySparklineVariance(newSparkline, project.ticker);
        
        // Determine trend based on sparkline history
        const trend = determineTrend(adjustedSparkline);
        
        // Build periods_found array
        const periodsFoundArray: string[] = [];
        if (project.mindshare_7d !== null) periodsFoundArray.push('7D');
        if (project.mindshare_14d !== null) periodsFoundArray.push('14D');
        if (project.mindshare_30d !== null) periodsFoundArray.push('30D');
        if (project.mindshare_90d !== null) periodsFoundArray.push('90D');

        const { error: upsertError } = await supabase
          .from("hype_projects")
          .upsert({
            ticker: project.ticker,
            name: project.name,
            rank: project.adjustedRank,
            score: project.adjustedScore,
            mindshare: project.adjustedMindshare,
            mindshare_change: project.adjustedMindshareChange,
            logo_url: project.logo_url,
            sparkline: adjustedSparkline,
            trend: trend,
            token_status: "tge",
            periods_found: periodsFoundArray,
            updated_at: new Date().toISOString(),
          }, { onConflict: "ticker" });

        if (upsertError) {
          results.push({ 
            ticker: project.ticker, 
            status: "error", 
            adjustedRank: project.adjustedRank,
            trend: trend,
            periodsFound: periodsFoundArray,
            error: upsertError.message 
          });
        } else {
          results.push({ 
            ticker: project.ticker, 
            status: "success",
            adjustedRank: project.adjustedRank,
            trend: trend,
            periodsFound: periodsFoundArray,
          });
        }
      } catch (err) {
        results.push({ 
          ticker: project.ticker, 
          status: "error",
          adjustedRank: 0,
          trend: 'neutral',
          periodsFound: [],
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
    const trendCounts = {
      up: results.filter(r => r.trend === 'up').length,
      down: results.filter(r => r.trend === 'down').length,
      neutral: results.filter(r => r.trend === 'neutral').length,
    };

    console.log(`Multi-period sync complete: ${successCount} success, ${errorCount} errors`);
    console.log(`Trend distribution: ${trendCounts.up} up, ${trendCounts.down} down, ${trendCounts.neutral} neutral`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Multi-period sync: ${aggregatedProjects.length} unique projects from 4 periods`,
        periodCounts: {
          '7D': projects7D.length,
          '14D': projects14D.length,
          '30D': projects30D.length,
          '90D': projects90D.length,
          uniqueTotal: aggregatedProjects.length,
        },
        weights: {
          '7D': '40%',
          '14D': '30%',
          '30D': '20%',
          '90D': '10%',
        },
        varianceApplied: {
          mindshare: "±12%",
          mindshareChange: "±18%",
          score: "±8%",
          sparkline: "±6% per point",
        },
        trendDistribution: trendCounts,
        syncStats: {
          success: successCount,
          errors: errorCount,
        },
        topProjects: sortedProjects.slice(0, 5).map(p => ({
          ticker: p.ticker,
          rank: p.adjustedRank,
          mindshare: p.adjustedMindshare.toFixed(4) + '%',
          change: p.adjustedMindshareChange.toFixed(2) + '%',
          periodsFound: [
            p.mindshare_7d ? '7D' : null,
            p.mindshare_14d ? '14D' : null,
            p.mindshare_30d ? '30D' : null,
            p.mindshare_90d ? '90D' : null,
          ].filter(Boolean).join(', '),
        })),
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
