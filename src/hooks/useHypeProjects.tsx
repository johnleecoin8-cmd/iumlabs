import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export interface HypeProject {
  id: string;
  rank: number;
  name: string;
  ticker: string;
  score: number;
  trend: string;
  sparkline: number[];
  updated_at: string;
  created_at: string;
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
