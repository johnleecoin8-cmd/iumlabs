import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Fetch logo URL from CoinGecko API
async function fetchLogoFromCoinGecko(ticker: string): Promise<string | null> {
  try {
    // Step 1: Search for coin by ticker
    const searchRes = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(ticker)}`
    );
    
    if (!searchRes.ok) {
      console.error(`CoinGecko search failed: ${searchRes.status}`);
      return null;
    }
    
    const searchData = await searchRes.json();
    
    // Find coin with exact ticker match (case-insensitive)
    const coin = searchData.coins?.find(
      (c: { symbol: string }) => c.symbol.toUpperCase() === ticker.toUpperCase()
    );
    
    if (!coin) {
      console.log(`No coin found for ticker: ${ticker}`);
      return null;
    }
    
    // Step 2: Fetch coin details for high-quality logo
    const coinRes = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin.id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false`
    );
    
    if (!coinRes.ok) {
      // Fallback to thumbnail from search result
      return coin.thumb || coin.large || null;
    }
    
    const coinData = await coinRes.json();
    
    // Prefer small image (64x64), fallback to large or thumb
    return coinData.image?.small || coinData.image?.large || coin.thumb || null;
  } catch (error) {
    console.error(`Error fetching logo for ${ticker}:`, error);
    return null;
  }
}

// Delay helper for rate limiting
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ticker, updateAll } = await req.json();
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Bulk update: fetch logos for all projects without logo_url
    if (updateAll) {
      const { data: projects, error: fetchError } = await supabase
        .from('hype_projects')
        .select('ticker')
        .or('logo_url.is.null,logo_url.eq.');
      
      if (fetchError) {
        throw new Error(`Failed to fetch projects: ${fetchError.message}`);
      }
      
      let updated = 0;
      const errors: string[] = [];
      
      for (const project of projects || []) {
        const logoUrl = await fetchLogoFromCoinGecko(project.ticker);
        
        if (logoUrl) {
          const { error: updateError } = await supabase
            .from('hype_projects')
            .update({ logo_url: logoUrl })
            .eq('ticker', project.ticker);
          
          if (updateError) {
            errors.push(`${project.ticker}: ${updateError.message}`);
          } else {
            updated++;
            console.log(`Updated logo for ${project.ticker}: ${logoUrl}`);
          }
        } else {
          errors.push(`${project.ticker}: Logo not found on CoinGecko`);
        }
        
        // Rate limit: 500ms between requests (CoinGecko free tier ~10-30 req/min)
        await delay(500);
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          updated, 
          total: projects?.length || 0,
          errors: errors.length > 0 ? errors : undefined 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Single ticker update
    if (!ticker || typeof ticker !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid ticker parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const normalizedTicker = ticker.toUpperCase().trim();
    
    if (!/^[A-Z0-9]{1,10}$/.test(normalizedTicker)) {
      return new Response(
        JSON.stringify({ error: 'Invalid ticker format. Use 1-10 alphanumeric characters.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const logoUrl = await fetchLogoFromCoinGecko(normalizedTicker);
    
    if (!logoUrl) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Logo not found for ticker: ${normalizedTicker}` 
        }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update database
    const { error: updateError } = await supabase
      .from('hype_projects')
      .update({ logo_url: logoUrl })
      .eq('ticker', normalizedTicker);

    if (updateError) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Database update failed: ${updateError.message}`,
          logo_url: logoUrl // Return the URL anyway so caller can use it
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        ticker: normalizedTicker,
        logo_url: logoUrl 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
