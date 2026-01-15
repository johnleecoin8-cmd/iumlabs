import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHypeProjects } from '@/hooks/useHypeProjects';
import MindshareTreemap, { type MindshareProject } from '@/components/mindshare/MindshareTreemap';
import TreemapSkeleton from '@/components/mindshare/TreemapSkeleton';
import TokenStatusToggle, { type TokenStatus } from '@/components/mindshare/TokenStatusToggle';
import { Search, X, Clock, Radio } from 'lucide-react';
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

type RankGroup = 'top20' | 'top21-50';
type TimeFrame = '24H' | '7D' | '14D' | '30D' | '90D';

const KInfluenceGrid = () => {
  usePageMeta({
    title: "K-Leaderboard | Korean Crypto Mindshare Rankings",
    description: "Real-time Web3 mindshare rankings from Korean crypto communities. Track trending projects across X, Telegram, Naver, and KakaoTalk. Powered by Ium Labs.",
    path: "/k-leaderboard",
    image: "/og-image.png"
  });
  
  const [tokenStatus, setTokenStatus] = useState<TokenStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [rankGroup, setRankGroup] = useState<RankGroup>('top20');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('7D');
  
  const { projects, isLoading, lastUpdate } = useHypeProjects();

  // Transform and filter projects for treemap
  const treemapProjects: MindshareProject[] = useMemo(() => {
    if (!projects.length) return [];

    // Filter by token status and search query
    const filtered = projects.filter(p => {
      if (tokenStatus !== 'all' && p.token_status !== tokenStatus) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return p.ticker.toLowerCase().includes(query) || 
               p.name.toLowerCase().includes(query) || 
               (p.narrative?.toLowerCase().includes(query) ?? false);
      }
      return true;
    });

    // Sort by rank and slice based on rank group
    const sorted = filtered.sort((a, b) => a.rank - b.rank);
    const sliced = rankGroup === 'top20' 
      ? sorted.slice(0, 20) 
      : sorted.slice(20, 50);

    const totalScore = sliced.reduce((sum, p) => sum + Number(p.score), 0);
    
    const projectsWithData = sliced.map(project => {
      const sparkline = project.sparkline || [];
      const calculatedTrend = calculateTrendFromSparkline(sparkline);
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
  }, [projects, tokenStatus, searchQuery, rankGroup]);

  const timeFrames: TimeFrame[] = ['24H', '7D', '14D', '30D', '90D'];

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-teal-950/10 via-transparent to-violet-950/5 pointer-events-none" />

      <div className="relative max-w-[1920px] mx-auto">
        {/* Header Section - Clean DeSpread style */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0a0a0b]/80 border-b border-white/[0.06]">
          <div className="px-4 sm:px-6 lg:px-8">
            {/* Top row: Title + Last Updated */}
            <div className="flex items-center justify-between py-4 sm:py-5">
              <div className="flex items-center gap-3">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight">
                  Korean Community Mindshare
                </h1>
                {/* Live indicator */}
                <div className="flex items-center gap-1.5 px-2 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full">
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping opacity-75" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-teal-400 uppercase tracking-wide">Live</span>
                </div>
              </div>
              
              {/* Last updated */}
              {lastUpdate && (
                <div className="hidden sm:flex items-center gap-1.5 text-xs sm:text-sm text-white/40">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Last updated {formatDistanceToNow(lastUpdate, { addSuffix: false })} ago</span>
                </div>
              )}
            </div>

            {/* Control row: Tabs + Timeframe + Search + Filter */}
            <div className="flex items-center justify-between gap-3 pb-4">
              {/* Left: Rank Group Tabs */}
              <div className="flex items-center gap-4">
                {/* Rank group tabs - DeSpread style */}
                <div className="flex items-center bg-white/[0.03] rounded-lg p-1 border border-white/[0.06]">
                  <button
                    onClick={() => setRankGroup('top20')}
                    className={cn(
                      "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-md transition-all duration-200",
                      rankGroup === 'top20'
                        ? "bg-white text-black shadow-lg"
                        : "text-white/50 hover:text-white/80"
                    )}
                  >
                    Top 20
                  </button>
                  <button
                    onClick={() => setRankGroup('top21-50')}
                    className={cn(
                      "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-md transition-all duration-200",
                      rankGroup === 'top21-50'
                        ? "bg-white text-black shadow-lg"
                        : "text-white/50 hover:text-white/80"
                    )}
                  >
                    Top 21-50
                  </button>
                </div>

                {/* Timeframe buttons - Desktop */}
                <div className="hidden lg:flex items-center gap-1 bg-white/[0.02] rounded-lg p-1 border border-white/[0.06]">
                  {timeFrames.map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeFrame(tf)}
                      className={cn(
                        "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
                        timeFrame === tf
                          ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                          : "text-white/40 hover:text-white/70 border border-transparent"
                      )}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Search + Token Filter */}
              <div className="flex items-center gap-3">
                {/* Search - Desktop */}
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

                {/* Token status filter */}
                <TokenStatusToggle selected={tokenStatus} onChange={setTokenStatus} />
              </div>
            </div>

            {/* Mobile: Timeframe + Search row */}
            <div className="flex lg:hidden flex-col gap-3 pb-4">
              {/* Timeframe buttons - Mobile */}
              <div className="flex items-center gap-1 bg-white/[0.02] rounded-lg p-1 border border-white/[0.06] overflow-x-auto no-scrollbar">
                {timeFrames.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeFrame(tf)}
                    className={cn(
                      "flex-1 min-w-[44px] px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
                      timeFrame === tf
                        ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                        : "text-white/40 hover:text-white/70 border border-transparent"
                    )}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Search - Mobile */}
              <div className="relative sm:hidden">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    "w-full pl-10 pr-10 py-2.5 text-sm",
                    "bg-white/[0.03] border border-white/[0.08] rounded-xl",
                    "text-white placeholder-white/30",
                    "focus:outline-none focus:border-teal-500/40",
                    "transition-all duration-200"
                  )}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-white/50" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Treemap */}
        <main className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
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
                key={`treemap-${rankGroup}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-[calc(100vh-280px)] sm:h-[calc(100vh-240px)] lg:h-[calc(100vh-200px)] min-h-[500px]"
              >
                <MindshareTreemap projects={treemapProjects} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-[500px]"
              >
                <div className="text-center">
                  <p className="text-white/40 text-lg">No projects found</p>
                  <p className="text-white/25 text-sm mt-1">Try adjusting your filters</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="px-4 sm:px-6 lg:px-8 py-6 border-t border-white/[0.04]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-white/30 text-center sm:text-left">
              Tracking mindshare across Korean crypto communities — X, Telegram, Naver, KakaoTalk
            </p>
            <Link
              to="/contact"
              className="text-xs sm:text-sm text-teal-400 hover:text-teal-300 font-medium transition-colors"
            >
              Get Listed →
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default KInfluenceGrid;
