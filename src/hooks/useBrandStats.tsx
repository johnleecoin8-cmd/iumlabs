import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BrandStat {
  id: string;
  value: number;
  base_value: number;
  label: string;
  prefix: string;
  suffix: string;
  min_variance: number;
  max_variance: number;
  created_at: string;
  updated_at: string;
}

export const useBrandStats = () => {
  return useQuery({
    queryKey: ["brand-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brand_stats")
        .select("*");
      
      if (error) {
        console.error("Error fetching brand stats:", error);
        throw error;
      }
      
      return data as BrandStat[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

// Helper to get a specific stat by ID
export const useBrandStat = (statId: string) => {
  const { data: stats, isLoading, error } = useBrandStats();
  
  const stat = stats?.find((s) => s.id === statId);
  
  return {
    stat,
    isLoading,
    error,
  };
};

// Helper to get multiple stats by IDs
export const useBrandStatsByIds = (statIds: string[]) => {
  const { data: stats, isLoading, error } = useBrandStats();
  
  const selectedStats = stats?.filter((s) => statIds.includes(s.id)) || [];
  
  // Create a map for easy lookup
  const statsMap = selectedStats.reduce((acc, stat) => {
    acc[stat.id] = stat;
    return acc;
  }, {} as Record<string, BrandStat>);
  
  return {
    stats: selectedStats,
    statsMap,
    isLoading,
    error,
  };
};
