import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function to generate random variance within a percentage range
function addVariance(value: number, minPercent: number, maxPercent: number): number {
  const variancePercent = minPercent + Math.random() * (maxPercent - minPercent);
  const direction = Math.random() > 0.5 ? 1 : -1;
  return value * (1 + (direction * variancePercent / 100));
}

// Generate realistic sparkline with recent trend
function generateSparkline(currentScore: number, trend: string): number[] {
  const points: number[] = [];
  let baseValue = currentScore * 0.85; // Start from 85% of current
  
  for (let i = 0; i < 7; i++) {
    // Add some randomness
    const variance = (Math.random() - 0.5) * 0.15; // ±7.5% variance
    let value = baseValue * (1 + variance);
    
    // Trend influence increases as we get closer to current
    if (trend === 'up') {
      baseValue *= 1.02 + (Math.random() * 0.03); // Gradual increase
    } else if (trend === 'down') {
      baseValue *= 0.98 - (Math.random() * 0.02); // Gradual decrease
    } else {
      baseValue *= 0.99 + (Math.random() * 0.02); // Slight fluctuation
    }
    
    points.push(Math.round(value * 100) / 100);
  }
  
  // Last point should be close to current score
  points.push(Math.round(currentScore * 100) / 100);
  
  return points;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting daily variance simulation...");

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all projects
    const { data: projects, error: fetchError } = await supabase
      .from("hype_projects")
      .select("*")
      .order("rank", { ascending: true });

    if (fetchError) {
      throw new Error(`Failed to fetch projects: ${fetchError.message}`);
    }

    if (!projects || projects.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "No projects to update" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing ${projects.length} projects...`);

    const results: { ticker: string; status: string; changes?: object }[] = [];

    for (const project of projects) {
      try {
        const currentScore = Number(project.score) || 0;
        const currentMindshare = Number(project.mindshare) || 0;
        
        // Generate new score with ±3-8% variance
        const newScore = Math.max(0, addVariance(currentScore, 3, 8));
        
        // Generate new mindshare with ±2-5% variance
        const newMindshare = Math.max(0, addVariance(currentMindshare, 2, 5));
        
        // Calculate mindshare change
        const mindshareChange = currentMindshare > 0 
          ? ((newMindshare - currentMindshare) / currentMindshare) * 100 
          : 0;
        
        // Determine trend based on score change
        const scoreChange = newScore - currentScore;
        let trend: string;
        if (scoreChange > currentScore * 0.02) {
          trend = 'up';
        } else if (scoreChange < -currentScore * 0.02) {
          trend = 'down';
        } else {
          trend = 'neutral';
        }
        
        // Generate new sparkline as integer array
        const sparkline = generateSparkline(newScore, trend).map(v => Math.round(v));
        
        // Add price variance if price exists (±1-5%)
        let newPrice = project.price ? Number(project.price) : null;
        let newChange24h = project.change_24h ? Number(project.change_24h) : null;
        if (newPrice && newPrice > 0) {
          const oldPrice = newPrice;
          newPrice = addVariance(oldPrice, 1, 5);
          newChange24h = ((newPrice - oldPrice) / oldPrice) * 100;
        }

        // Update the project - use simple numeric values
        const updateData: Record<string, unknown> = {
          score: parseFloat(newScore.toFixed(2)),
          mindshare: parseFloat(newMindshare.toFixed(2)),
          mindshare_change: parseFloat(mindshareChange.toFixed(2)),
          trend,
          sparkline,
          updated_at: new Date().toISOString(),
        };
        
        if (newPrice !== null) {
          updateData.price = parseFloat(newPrice.toFixed(6));
        }
        if (newChange24h !== null) {
          updateData.change_24h = parseFloat(newChange24h.toFixed(2));
        }
        
        const { error: updateError } = await supabase
          .from("hype_projects")
          .update(updateData)
          .eq("id", project.id);

        if (updateError) {
          console.error(`Update error for ${project.ticker}:`, updateError.message);
          results.push({
            ticker: project.ticker,
            status: "error",
          });
        } else {
          results.push({
            ticker: project.ticker,
            status: "success",
            changes: {
              score: `${currentScore.toFixed(2)} → ${newScore.toFixed(2)}`,
              mindshare: `${currentMindshare.toFixed(2)} → ${newMindshare.toFixed(2)}`,
              trend,
            },
          });
        }
      } catch (err) {
        console.error(`Error updating ${project.ticker}:`, err);
        results.push({
          ticker: project.ticker,
          status: "error",
        });
      }
    }

    // Re-calculate ranks based on new scores
    const { data: updatedProjects, error: rankFetchError } = await supabase
      .from("hype_projects")
      .select("id, score")
      .order("score", { ascending: false });

    if (!rankFetchError && updatedProjects) {
      for (let i = 0; i < updatedProjects.length; i++) {
        await supabase
          .from("hype_projects")
          .update({ rank: i + 1 })
          .eq("id", updatedProjects[i].id);
      }
    }

    // Record snapshot for history
    try {
      await supabase.rpc("record_hype_snapshot");
      console.log("Snapshot recorded successfully");
    } catch (snapshotError) {
      console.error("Failed to record snapshot:", snapshotError);
    }

    // ==========================================
    // Update brand_stats with daily variance
    // ==========================================
    console.log("Updating brand stats with daily variance...");
    
    const { data: brandStats, error: brandStatsError } = await supabase
      .from("brand_stats")
      .select("*");

    if (!brandStatsError && brandStats) {
      for (const stat of brandStats) {
        try {
          const baseValue = Number(stat.base_value) || 0;
          const minVariance = Number(stat.min_variance) || 2;
          const maxVariance = Number(stat.max_variance) || 5;
          
          // Apply variance within the stat's configured range
          const newValue = addVariance(baseValue, minVariance, maxVariance);
          
          // Round appropriately based on the magnitude
          let roundedValue: number;
          if (baseValue >= 100) {
            roundedValue = Math.round(newValue);
          } else if (baseValue >= 10) {
            roundedValue = Math.round(newValue * 10) / 10;
          } else {
            roundedValue = Math.round(newValue * 100) / 100;
          }

          const { error: updateBrandError } = await supabase
            .from("brand_stats")
            .update({ 
              value: roundedValue,
              updated_at: new Date().toISOString()
            })
            .eq("id", stat.id);

          if (updateBrandError) {
            console.error(`Error updating brand stat ${stat.id}:`, updateBrandError.message);
          } else {
            console.log(`Brand stat ${stat.id}: ${stat.value} → ${roundedValue}`);
          }
        } catch (err) {
          console.error(`Error processing brand stat ${stat.id}:`, err);
        }
      }
      console.log("Brand stats variance applied successfully");
    } else if (brandStatsError) {
      console.error("Failed to fetch brand stats:", brandStatsError.message);
    }

    const successCount = results.filter((r) => r.status === "success").length;

    return new Response(
      JSON.stringify({
        success: true,
        message: `Daily variance applied to ${successCount}/${projects.length} projects`,
        results,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in daily variance simulation:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
