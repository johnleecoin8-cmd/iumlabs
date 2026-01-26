import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export type TokenStatus = 'tge' | 'pre-tge';

export interface HypeProject {
  id: string;
  rank: number;
  name: string;
  ticker: string;
  score: number;
  mindshare: number;
  mindshare_change: number | null;
  narrative: string | null;
  trend: string;
  sparkline: number[];
  logo_url: string | null;
  token_status: TokenStatus;
  updated_at: string;
  created_at: string;
  // Price data from CoinGecko
  price: number | null;
  market_cap: number | null;
  change_24h: number | null;
  // Social links
  twitter_url: string | null;
  website_url: string | null;
  // Top source from crawler
  top_source?: string | null;
  // Periods where project was found (7D, 14D, 30D, 90D)
  periods_found?: string[];
}

export interface HypeScoreHistory {
  ticker: string;
  score: number;
  mindshare: number;
  rank: number;
  recorded_at: string;
}

export const useHypeProjects = () => {
  const queryClient = useQueryClient();
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Fetch projects from hype_projects table
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['hype-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hype_projects')
        .select('*')
        .order('rank', { ascending: true });
      
      if (error) throw error;
      
      // Set last update time from most recent project
      if (data && data.length > 0) {
        const mostRecent = data.reduce((latest, p) => 
          new Date(p.updated_at) > new Date(latest.updated_at) ? p : latest
        , data[0]);
        setLastUpdate(new Date(mostRecent.updated_at));
      }
      
      return data as HypeProject[];
    },
    refetchInterval: 60000, // Refetch every minute as backup
  });

  // Real-time subscription for instant updates
  useEffect(() => {
    const channel = supabase
      .channel('hype-projects-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'hype_projects',
        },
        (payload: RealtimePostgresChangesPayload<HypeProject>) => {
          console.log('Hype projects update:', payload);
          // Invalidate and refetch on any change
          queryClient.invalidateQueries({ queryKey: ['hype-projects'] });
          setLastUpdate(new Date());
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return {
    projects,
    isLoading,
    error,
    lastUpdate,
  };
};

// Hook to fetch historical data for a specific ticker
export const useHypeHistory = (ticker: string, days: number = 30) => {
  return useQuery({
    queryKey: ['hype-history', ticker, days],
    queryFn: async () => {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - days);
      
      const { data, error } = await supabase
        .from('hype_score_history')
        .select('*')
        .eq('ticker', ticker)
        .gte('recorded_at', fromDate.toISOString())
        .order('recorded_at', { ascending: true });
      
      if (error) throw error;
      return data as HypeScoreHistory[];
    },
    enabled: !!ticker,
  });
};

// Hook to get 7d and 30d trend summary for all projects
export const useHypeTrends = () => {
  return useQuery({
    queryKey: ['hype-trends'],
    queryFn: async () => {
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      // Get 7-day history
      const { data: history7d, error: err7d } = await supabase
        .from('hype_score_history')
        .select('ticker, score, rank, recorded_at')
        .gte('recorded_at', sevenDaysAgo.toISOString())
        .order('recorded_at', { ascending: true });
      
      if (err7d) throw err7d;
      
      // Get 30-day history
      const { data: history30d, error: err30d } = await supabase
        .from('hype_score_history')
        .select('ticker, score, rank, recorded_at')
        .gte('recorded_at', thirtyDaysAgo.toISOString())
        .order('recorded_at', { ascending: true });
      
      if (err30d) throw err30d;
      
      // Calculate trends per ticker
      const trends: Record<string, { 
        change7d: number; 
        change30d: number;
        rankChange7d: number;
        rankChange30d: number;
        sparkline7d: number[];
      }> = {};
      
      // Process history data
      const tickers = [...new Set((history30d || []).map(h => h.ticker))];
      
      for (const ticker of tickers) {
        const ticker7d = (history7d || []).filter(h => h.ticker === ticker);
        const ticker30d = (history30d || []).filter(h => h.ticker === ticker);
        
        const firstScore7d = ticker7d[0]?.score || 0;
        const lastScore7d = ticker7d[ticker7d.length - 1]?.score || 0;
        const firstScore30d = ticker30d[0]?.score || 0;
        const lastScore30d = ticker30d[ticker30d.length - 1]?.score || 0;
        
        const firstRank7d = ticker7d[0]?.rank || 0;
        const lastRank7d = ticker7d[ticker7d.length - 1]?.rank || 0;
        const firstRank30d = ticker30d[0]?.rank || 0;
        const lastRank30d = ticker30d[ticker30d.length - 1]?.rank || 0;
        
        trends[ticker] = {
          change7d: firstScore7d > 0 ? ((lastScore7d - firstScore7d) / firstScore7d) * 100 : 0,
          change30d: firstScore30d > 0 ? ((lastScore30d - firstScore30d) / firstScore30d) * 100 : 0,
          rankChange7d: firstRank7d - lastRank7d, // Positive = improved
          rankChange30d: firstRank30d - lastRank30d,
          sparkline7d: ticker7d.map(h => Number(h.score)),
        };
      }
      
      return trends;
    },
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};
