import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Common ticker to CoinGecko ID mapping
const tickerToCoingeckoId: Record<string, string> = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'SOL': 'solana',
  'SUI': 'sui',
  'TRUMP': 'official-trump',
  'XRP': 'ripple',
  'DOGE': 'dogecoin',
  'PEPE': 'pepe',
  'WIF': 'dogwifcoin',
  'BONK': 'bonk',
  'PENGU': 'pudgy-penguins',
  'ARB': 'arbitrum',
  'OP': 'optimism',
  'BASE': 'base-protocol',
  'AVAX': 'avalanche-2',
  'MATIC': 'matic-network',
  'LINK': 'chainlink',
  'UNI': 'uniswap',
  'AAVE': 'aave',
  'MKR': 'maker',
  'LDO': 'lido-dao',
  'APT': 'aptos',
  'INJ': 'injective-protocol',
  'TIA': 'celestia',
  'SEI': 'sei-network',
  'STX': 'blockstack',
  'NEAR': 'near',
  'ATOM': 'cosmos',
  'DOT': 'polkadot',
  'ADA': 'cardano',
  'SHIB': 'shiba-inu',
  'FLOKI': 'floki',
  'MEME': 'memecoin-2',
  'WLD': 'worldcoin-wld',
  'FET': 'fetch-ai',
  'RENDER': 'render-token',
  'RNDR': 'render-token',
  'TAO': 'bittensor',
  'ONDO': 'ondo-finance',
  'PYTH': 'pyth-network',
  'JUP': 'jupiter-exchange-solana',
  'JTO': 'jito-governance-token',
  'W': 'wormhole',
  'STRK': 'starknet',
  'BLUR': 'blur',
  'EIGEN': 'eigenlayer',
  'ZRO': 'layerzero',
  'ZK': 'zksync',
  'BOME': 'book-of-meme',
  'MEW': 'cat-in-a-dogs-world',
  'POPCAT': 'popcat',
  'NEIRO': 'neiro-on-eth',
  'GOAT': 'goatseus-maximus',
  'AI16Z': 'ai16z',
  'VIRTUAL': 'virtual-protocol',
  'FARTCOIN': 'fartcoin',
  'ZEREBRO': 'zerebro',
  'GRIFFAIN': 'griffain',
  'ARC': 'arc-2',
  'AIXBT': 'aixbt',
  'HYPE': 'hyperliquid',
  'MOVE': 'movement',
  'HBAR': 'hedera-hashgraph',
  'VET': 'vechain',
  'FIL': 'filecoin',
  'IMX': 'immutable-x',
  'SAND': 'the-sandbox',
  'MANA': 'decentraland',
  'AXS': 'axie-infinity',
  'GALA': 'gala',
  'ENS': 'ethereum-name-service',
  'APE': 'apecoin',
  'CRV': 'curve-dao-token',
  'SNX': 'havven',
  '1INCH': '1inch',
  'COMP': 'compound-governance-token',
  'SUSHI': 'sushi',
  'YFI': 'yearn-finance',
  'BAL': 'balancer',
  'RUNE': 'thorchain',
  'CAKE': 'pancakeswap-token',
  'XLM': 'stellar',
  'ALGO': 'algorand',
  'ICP': 'internet-computer',
  'FTM': 'fantom',
  'KAVA': 'kava',
  'ROSE': 'oasis-network',
  'FLOW': 'flow',
  'MINA': 'mina-protocol',
  'KAIA': 'kaia',
  'KAITO': 'kaito',
};

// Fetch price data from CoinGecko
async function fetchCoinGeckoPrices(coinIds: string[]): Promise<Record<string, { price: number; market_cap: number; change_24h: number }>> {
  const result: Record<string, { price: number; market_cap: number; change_24h: number }> = {};
  
  if (coinIds.length === 0) return result;
  
  const idsParam = coinIds.join(',');
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${idsParam}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('CoinGecko API error:', response.status);
      return result;
    }
    
    const data = await response.json();
    
    for (const coinId of coinIds) {
      if (data[coinId]) {
        result[coinId] = {
          price: data[coinId].usd || 0,
          market_cap: data[coinId].usd_market_cap || 0,
          change_24h: data[coinId].usd_24h_change || 0,
        };
      }
    }
  } catch (error) {
    console.error('Error fetching CoinGecko prices:', error);
  }
  
  return result;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get all projects
    const { data: projects, error: fetchError } = await supabase
      .from('hype_projects')
      .select('ticker')
      .order('rank');

    if (fetchError) throw fetchError;

    // Map tickers to CoinGecko IDs
    const tickerToCoinId: Record<string, string> = {};
    const coinIds: string[] = [];

    for (const project of projects || []) {
      const coinId = tickerToCoingeckoId[project.ticker.toUpperCase()];
      if (coinId) {
        tickerToCoinId[project.ticker] = coinId;
        if (!coinIds.includes(coinId)) {
          coinIds.push(coinId);
        }
      }
    }

    console.log(`Fetching prices for ${coinIds.length} coins:`, coinIds);

    // Fetch prices (CoinGecko allows up to 250 coins per request)
    const priceData = await fetchCoinGeckoPrices(coinIds);

    console.log('Price data received:', Object.keys(priceData).length, 'coins');

    // Update projects with price data
    let updatedCount = 0;
    for (const project of projects || []) {
      const coinId = tickerToCoinId[project.ticker];
      if (coinId && priceData[coinId]) {
        const { price, market_cap, change_24h } = priceData[coinId];
        
        const { error: updateError } = await supabase
          .from('hype_projects')
          .update({
            price,
            market_cap,
            change_24h,
            updated_at: new Date().toISOString(),
          })
          .eq('ticker', project.ticker);

        if (updateError) {
          console.error(`Failed to update ${project.ticker}:`, updateError);
        } else {
          updatedCount++;
          console.log(`Updated ${project.ticker}: $${price.toFixed(4)}, MC: $${(market_cap / 1e9).toFixed(2)}B`);
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Updated price data for ${updatedCount} projects`,
        coinsLookedUp: coinIds.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
