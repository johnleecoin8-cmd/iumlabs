import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHypeProjects } from '@/hooks/useHypeProjects';
import { type MindshareProject } from '@/components/mindshare/MindshareTreemap';
import HypeGalaxyMap from '@/components/mindshare/HypeGalaxyMap';
import TreemapSkeleton from '@/components/mindshare/TreemapSkeleton';

import Navbar from '@/components/Navbar';
import { Search, X, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { usePageMeta } from '@/hooks/usePageMeta';
import { motion, AnimatePresence } from 'framer-motion';



// Tunable threshold constants
const TREND_THRESHOLD = {
  UP: 3,
  DOWN: -3,
};

const TRENDING_LIMIT = 3;

// Helper functions
const getValidSparklineData = (sparkline: number[] | null): number[] => {
  if (!sparkline || sparkline.length === 0) return [];
  let lastValidIndex = sparkline.length - 1;
  while (lastValidIndex > 0 && sparkline[lastValidIndex] === 0) {
    lastValidIndex--;
  }
  return sparkline.slice(0, lastValidIndex + 1);
};

const normalizeTrend = (trend: string | null | undefined): 'up' | 'down' | 'neutral' => {
  if (trend === 'up' || trend === 'down' || trend === 'neutral') return trend;
  // Back-compat (some older code paths use these labels)
  if (trend === 'positive') return 'up';
  if (trend === 'negative') return 'down';
  return 'neutral';
};

const calculateTrendFromSparkline = (sparkline: number[] | null): 'up' | 'down' | 'neutral' => {
  const validData = getValidSparklineData(sparkline);
  if (validData.length < 3) return 'neutral';
  const third = Math.floor(validData.length / 3);
  const firstAvg = validData.slice(0, third).reduce((a, b) => a + b, 0) / third;
  const lastAvg = validData.slice(-third).reduce((a, b) => a + b, 0) / third;
  if (firstAvg === 0) return 'neutral';
  const changePercent = ((lastAvg - firstAvg) / firstAvg) * 100;
  if (changePercent > TREND_THRESHOLD.UP) return 'up';
  if (changePercent < TREND_THRESHOLD.DOWN) return 'down';
  return 'neutral';
};

const calculateMindshareChange = (sparkline: number[] | null): number | null => {
  const validData = getValidSparklineData(sparkline);
  if (validData.length < 4) return null;
  const third = Math.max(2, Math.floor(validData.length / 3));
  const firstSlice = validData.slice(0, third);
  const lastSlice = validData.slice(-third);
  const firstAvg = firstSlice.reduce((a, b) => a + b, 0) / firstSlice.length;
  const lastAvg = lastSlice.reduce((a, b) => a + b, 0) / lastSlice.length;
  if (firstAvg === 0) return lastAvg > 0 ? 30 : 0;
  const change = ((lastAvg - firstAvg) / firstAvg) * 100;
  return Math.max(-50, Math.min(50, change));
};

const getTrendingScore = (sparkline: number[] | null): number => {
  const validData = getValidSparklineData(sparkline);
  if (validData.length < 4) return 0;
  const recentQuarter = validData.slice(-Math.floor(validData.length / 4));
  const previousQuarter = validData.slice(-Math.floor(validData.length / 2), -Math.floor(validData.length / 4));
  if (previousQuarter.length === 0 || recentQuarter.length === 0) return 0;
  const recentAvg = recentQuarter.reduce((a, b) => a + b, 0) / recentQuarter.length;
  const previousAvg = previousQuarter.reduce((a, b) => a + b, 0) / previousQuarter.length;
  if (previousAvg === 0) return recentAvg > 0 ? 1 : 0;
  return (recentAvg - previousAvg) / previousAvg;
};

const isTrending = (sparkline: number[] | null): boolean => {
  const validData = getValidSparklineData(sparkline);
  if (validData.length < 4) return false;
  const recentQuarter = validData.slice(-Math.floor(validData.length / 4));
  const previousQuarter = validData.slice(-Math.floor(validData.length / 2), -Math.floor(validData.length / 4));
  if (previousQuarter.length === 0 || recentQuarter.length === 0) return false;
  const recentAvg = recentQuarter.reduce((a, b) => a + b, 0) / recentQuarter.length;
  const previousAvg = previousQuarter.reduce((a, b) => a + b, 0) / previousQuarter.length;
  if (previousAvg === 0) return recentAvg > 0;
  return ((recentAvg - previousAvg) / previousAvg) > 0.3;
};



const KInfluenceGrid = () => {
  usePageMeta({
    title: "K-Leaderboard | Korean Crypto Mindshare Rankings",
    description: "Real-time Web3 mindshare rankings from Korean crypto communities. Track trending projects across X, Telegram, Naver, and KakaoTalk. Powered by Ium Labs.",
    path: "/k-leaderboard",
    image: "/og-image.png"
  });
  
  
  const [searchQuery, setSearchQuery] = useState('');
  
  
  const { projects, isLoading, lastUpdate } = useHypeProjects();

  // Transform and filter projects for treemap
  const treemapProjects: MindshareProject[] = useMemo(() => {
    if (!projects.length) return [];

    // Filter by search query
    const filtered = projects.filter(p => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return p.ticker.toLowerCase().includes(query) || 
               p.name.toLowerCase().includes(query) || 
               (p.narrative?.toLowerCase().includes(query) ?? false);
      }
      return true;
    });

    // Sort by rank and slice to top 20
    const sorted = filtered.sort((a, b) => a.rank - b.rank);
    const sliced = sorted.slice(0, 20);

    const totalScore = sliced.reduce((sum, p) => sum + Number(p.score), 0);
    
    const projectsWithData = sliced.map(project => {
      const sparkline = project.sparkline || [];
      // IMPORTANT: use backend-provided trend as the source of truth.
      // The sparkline can be interpolated/variant-adjusted, which may bias client-side trend inference.
      const calculatedTrend = normalizeTrend(project.trend);
      const calculatedChange = project.mindshare_change ?? calculateMindshareChange(sparkline);
      const trendingScore = getTrendingScore(sparkline);
      const potentiallyTrending = isTrending(sparkline);
      
      return {
        id: project.id,
        ticker: project.ticker,
        name: project.name,
        mindshare: project.mindshare > 0 ? Number(project.mindshare) : totalScore > 0 ? Number(project.score) / totalScore * 100 : 0,
        mindshare_change: calculatedChange,
        narrative: project.narrative,
        score: Number(project.score),
        trend: calculatedTrend,
        sparkline,
        logo_url: project.logo_url,
        rank: project.rank,
        token_status: project.token_status,
        price: project.price,
        market_cap: project.market_cap,
        change_24h: project.change_24h,
        twitter_url: project.twitter_url,
        website_url: project.website_url,
        periods_found: project.periods_found || [],
        start_date: project.start_date || null,
        trendingScore,
        potentiallyTrending,
        isTrending: false,
      };
    });
    
    const sortedByTrending = [...projectsWithData]
      .filter(p => p.potentiallyTrending)
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, TRENDING_LIMIT)
      .map(p => p.ticker);
    
    return projectsWithData.map(p => ({
      ...p,
      isTrending: sortedByTrending.includes(p.ticker),
    }));
  }, [projects, searchQuery]);

  // Dynamic stats calculation
  const stats = useMemo(() => {
    const projectCount = projects.length;
    // Channels: 2-4 based on project count
    const channelCount = Math.min(4, Math.max(2, Math.floor(projectCount / 15) + 2));
    // Sources: project count × 4-6 multiplier, shown in K
    const sourceMultiplier = 4 + (projectCount % 3); // 4, 5, or 6
    const sourceCount = Math.floor(projectCount * sourceMultiplier * 1.5); // ~150K for 20 projects
    return { channelCount, sourceCount };
  }, [projects.length]);


  return (
    <>
      {/* Mobile Navbar */}
      <Navbar />
      
      <div className="min-h-screen bg-[#0a0a0b] pb-safe pt-14 lg:pt-0">
        {/* Background gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-teal-950/10 via-transparent to-violet-950/5 pointer-events-none" />

        <div className="relative max-w-[1920px] mx-auto">
        {/* Header Section - Mobile optimized */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0a0a0b]/90 border-b border-white/[0.06]">
          <div className="px-3 sm:px-6 lg:px-8">
            {/* Top row: Title + Live indicator */}
            <div className="flex items-center justify-between py-3 sm:py-5">
              <div className="flex items-center gap-2 sm:gap-3">
                <h1 className="text-sm sm:text-xl lg:text-2xl font-bold text-white tracking-tight">
                  K-Mindshare
                </h1>
                {/* Live indicator - compact on mobile */}
                <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-teal-500/10 border border-teal-500/20 rounded-full">
                  <div className="relative">
                    <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-teal-400" />
                    <div className="absolute inset-0 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-teal-400 animate-ping opacity-75" />
                  </div>
                  <span className="text-[8px] sm:text-xs font-medium text-teal-400 uppercase tracking-wide">Live</span>
                </div>
              </div>
              
              {/* Last updated - hidden on mobile */}
              {lastUpdate && (
                <div className="hidden sm:flex items-center gap-1.5 text-xs sm:text-sm text-white/40">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated {formatDistanceToNow(lastUpdate, { addSuffix: false })} ago</span>
                </div>
              )}
            </div>

            {/* Control row: Mobile-first layout */}
            <div className="flex items-center justify-between gap-2 sm:gap-3 pb-3 sm:pb-4">
              {/* Left: View Toggle */}
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-[10px] sm:text-sm font-semibold text-white/60 sm:text-white/80">Top 20</span>

                {/* Channel stats - Hidden on mobile */}
                <div className="hidden lg:flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-500/5 rounded-lg border border-teal-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span className="text-teal-400 font-medium">1,556 Channels</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-500/5 rounded-lg border border-violet-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                    <span className="text-violet-400 font-medium">75,664 Sources</span>
                  </div>
                </div>
              </div>

              {/* Right: Search + Token Filter */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Search - Desktop only */}
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      "w-40 lg:w-52 pl-10 pr-8 py-2 text-sm",
                      "bg-white/[0.03] border border-white/[0.08] rounded-lg",
                      "text-white placeholder-white/30",
                      "focus:outline-none focus:border-teal-500/40 focus:bg-white/[0.05]",
                      "transition-all duration-200"
                    )}
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 hover:bg-white/10 rounded transition-colors"
                    >
                      <X className="w-3.5 h-3.5 text-white/40" />
                    </button>
                  )}
                </div>

              </div>
            </div>

            {/* Mobile: Search row */}
            <div className="sm:hidden pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    "w-full pl-9 pr-9 py-2 text-xs",
                    "bg-white/[0.03] border border-white/[0.08] rounded-xl",
                    "text-white placeholder-white/30",
                    "focus:outline-none focus:border-teal-500/40",
                    "transition-all duration-200"
                  )}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 active:scale-95 transition-transform"
                  >
                    <X className="w-3.5 h-3.5 text-white/50" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Mobile height optimized */}
        <main className="px-2 sm:px-6 lg:px-8 py-2 sm:py-6">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <TreemapSkeleton />
              </motion.div>
            ) : treemapProjects.length > 0 ? (
              <motion.div
                key="galaxy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-[calc(100vh-180px)] sm:h-[calc(100vh-240px)] lg:h-[calc(100vh-200px)] min-h-[400px] sm:min-h-[500px]"
              >
                <HypeGalaxyMap projects={treemapProjects} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-[400px] sm:h-[500px]"
              >
                <div className="text-center">
                  <p className="text-white/40 text-sm sm:text-lg">No projects found</p>
                  <p className="text-white/25 text-xs sm:text-sm mt-1">Try adjusting your filters</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer - compact on mobile */}
        <footer className="px-3 sm:px-6 lg:px-8 py-4 sm:py-6 border-t border-white/[0.04]">
          <div className="max-w-4xl mx-auto text-center space-y-2 sm:space-y-3">
            <p className="text-[10px] sm:text-sm text-white/30">
              Tracking mindshare across Korean crypto communities
            </p>
            <p className="text-[9px] sm:text-xs text-white/20 leading-relaxed hidden sm:block">
              Korean Community Mindshare is calculated based on total mention frequency and engagement metrics across major Korean crypto communities. Project affiliations and metadata are sourced from official websites and social profiles. Data updates every hour.
            </p>
          </div>
        </footer>
      </div>
    </div>
    </>
  );
};

export default KInfluenceGrid;
