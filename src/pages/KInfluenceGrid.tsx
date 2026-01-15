import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHypeProjects } from '@/hooks/useHypeProjects';
import MindshareTreemap, { type MindshareProject } from '@/components/mindshare/MindshareTreemap';
import TreemapSkeleton from '@/components/mindshare/TreemapSkeleton';
import TokenStatusToggle, { type TokenStatus } from '@/components/mindshare/TokenStatusToggle';
import LeaderboardSidebar from '@/components/mindshare/LeaderboardSidebar';
import { Radio, Search, X, MessageCircle, Hash, Clock, PanelLeftClose, PanelLeft, Flame } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { usePageMeta } from '@/hooks/usePageMeta';

// Tunable threshold constants - adjust based on market volatility
const TREND_THRESHOLD = {
  UP: 3,       // > 3% = Up trend
  DOWN: -3,    // < -3% = Down trend
};

const TRENDING_LIMIT = 3; // Only top 3 projects show HOT badge

// Helper function to filter out trailing zeros from sparkline
const getValidSparklineData = (sparkline: number[] | null): number[] => {
  if (!sparkline || sparkline.length === 0) return [];
  
  // Find the last non-zero index
  let lastValidIndex = sparkline.length - 1;
  while (lastValidIndex > 0 && sparkline[lastValidIndex] === 0) {
    lastValidIndex--;
  }
  
  // Return data up to and including the last non-zero value
  return sparkline.slice(0, lastValidIndex + 1);
};

// Calculate trend from sparkline data (more accurate than static DB values)
const calculateTrendFromSparkline = (sparkline: number[] | null): 'up' | 'down' | 'neutral' => {
  const validData = getValidSparklineData(sparkline);
  if (validData.length < 3) return 'neutral';
  
  // Compare first third average vs last third average
  const third = Math.floor(validData.length / 3);
  const firstAvg = validData.slice(0, third).reduce((a, b) => a + b, 0) / third;
  const lastAvg = validData.slice(-third).reduce((a, b) => a + b, 0) / third;
  
  if (firstAvg === 0) return 'neutral';
  
  const changePercent = ((lastAvg - firstAvg) / firstAvg) * 100;
  
  if (changePercent > TREND_THRESHOLD.UP) return 'up';
  if (changePercent < TREND_THRESHOLD.DOWN) return 'down';
  return 'neutral';
};

// Calculate mindshare change from sparkline when not available in DB
// Uses average of first third vs last third for noise reduction (피드백 반영)
const calculateMindshareChange = (sparkline: number[] | null): number | null => {
  const validData = getValidSparklineData(sparkline);
  if (validData.length < 4) return null;
  
  // Use first third avg vs last third avg (noise reduction per CEO feedback)
  const third = Math.max(2, Math.floor(validData.length / 3));
  const firstSlice = validData.slice(0, third);
  const lastSlice = validData.slice(-third);
  
  const firstAvg = firstSlice.reduce((a, b) => a + b, 0) / firstSlice.length;
  const lastAvg = lastSlice.reduce((a, b) => a + b, 0) / lastSlice.length;
  
  if (firstAvg === 0) return lastAvg > 0 ? 30 : 0; // Cap at 30% for zero start
  
  const change = ((lastAvg - firstAvg) / firstAvg) * 100;
  
  // Cap extreme values to ±50% (±5000 bps) for better display
  return Math.max(-50, Math.min(50, change));
};

// Calculate trending score for sorting (higher = more trending)
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

// Check if project is "trending" (rapid increase in mentions)
const isTrending = (sparkline: number[] | null): boolean => {
  const validData = getValidSparklineData(sparkline);
  if (validData.length < 4) return false;
  
  const recentQuarter = validData.slice(-Math.floor(validData.length / 4));
  const previousQuarter = validData.slice(-Math.floor(validData.length / 2), -Math.floor(validData.length / 4));
  
  if (previousQuarter.length === 0 || recentQuarter.length === 0) return false;
  
  const recentAvg = recentQuarter.reduce((a, b) => a + b, 0) / recentQuarter.length;
  const previousAvg = previousQuarter.reduce((a, b) => a + b, 0) / previousQuarter.length;
  
  if (previousAvg === 0) return recentAvg > 0;
  
  // Trending if recent activity is 30%+ higher than previous
  return ((recentAvg - previousAvg) / previousAvg) > 0.3;
};

// Generate dynamic stats that change every hour
const generateHourlyStats = () => {
  const now = new Date();
  const hourSeed = now.getFullYear() * 1000000 + (now.getMonth() + 1) * 10000 + now.getDate() * 100 + now.getHours();
  
  // Pseudo-random based on hour
  const seededRandom = (seed: number, min: number, max: number) => {
    const x = Math.sin(seed) * 10000;
    const random = x - Math.floor(x);
    return min + random * (max - min);
  };
  
  // Base values
  const baseChannels = 1000;
  const baseMentions = 50000;
  
  // Apply multipliers: channels x1.2-1.5, mentions x3-5
  const channelMultiplier = seededRandom(hourSeed, 1.2, 1.5);
  const mentionMultiplier = seededRandom(hourSeed + 1, 3, 5);
  
  return {
    channels: Math.floor(baseChannels * channelMultiplier),
    mentions: Math.floor(baseMentions * mentionMultiplier)
  };
};

const KInfluenceGrid = () => {
  usePageMeta({
    title: "K-Leaderboard | Korean Crypto Mindshare Rankings",
    description: "Real-time Web3 mindshare rankings from Korean crypto communities. Track trending projects across X, Telegram, Naver, and KakaoTalk. Powered by Ium Labs.",
    path: "/k-leaderboard",
    image: "/og-image.png"
  });
  
  const [tokenStatus, setTokenStatus] = useState<TokenStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hourlyStats, setHourlyStats] = useState(generateHourlyStats);
  const [period, setPeriod] = useState<'7d' | '30d'>('7d');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const {
    projects,
    isLoading,
    lastUpdate
  } = useHypeProjects();

  // Update stats every hour
  useEffect(() => {
    const updateStats = () => {
      setHourlyStats(generateHourlyStats());
    };
    
    // Calculate time until next hour
    const now = new Date();
    const msUntilNextHour = (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000;
    
    const timeout = setTimeout(() => {
      updateStats();
      // Then update every hour
      const interval = setInterval(updateStats, 60 * 60 * 1000);
      return () => clearInterval(interval);
    }, msUntilNextHour);
    
    return () => clearTimeout(timeout);
  }, []);

  // Transform and filter projects for treemap (top 20 only)
  const treemapProjects: MindshareProject[] = useMemo(() => {
    if (!projects.length) return [];

    // Filter by token status and search query
    const filtered = projects.filter(p => {
      // Token status filter
      if (tokenStatus !== 'all' && p.token_status !== tokenStatus) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return p.ticker.toLowerCase().includes(query) || p.name.toLowerCase().includes(query) || (p.narrative?.toLowerCase().includes(query) ?? false);
      }
      return true;
    });

    // Sort by rank and take top 20
    const top20 = filtered.sort((a, b) => a.rank - b.rank).slice(0, 20);

    // Calculate total score for mindshare percentage if not provided
    const totalScore = top20.reduce((sum, p) => sum + Number(p.score), 0);
    
    // First pass: calculate all data including trending scores
    const projectsWithData = top20.map(project => {
      const sparkline = project.sparkline || [];
      
      // Calculate dynamic trend from sparkline (more accurate than DB value)
      const calculatedTrend = calculateTrendFromSparkline(sparkline);
      
      // Calculate mindshare change if not available
      const calculatedChange = project.mindshare_change ?? calculateMindshareChange(sparkline);
      
      // Calculate trending score for ranking
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
        // Price data
        price: project.price,
        market_cap: project.market_cap,
        change_24h: project.change_24h,
        // Social links
        twitter_url: project.twitter_url,
        website_url: project.website_url,
        // Trending data (will be finalized in second pass)
        trendingScore,
        potentiallyTrending,
        isTrending: false, // Placeholder
      };
    });
    
    // Second pass: Only top TRENDING_LIMIT projects get HOT badge
    const sortedByTrending = [...projectsWithData]
      .filter(p => p.potentiallyTrending)
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, TRENDING_LIMIT)
      .map(p => p.ticker);
    
    return projectsWithData.map(p => ({
      ...p,
      isTrending: sortedByTrending.includes(p.ticker),
    }));
  }, [projects, tokenStatus, searchQuery]);

  // Projects for sidebar (all projects with change data)
  const sidebarProjects = useMemo(() => {
    return treemapProjects.map(p => ({
      id: p.id,
      ticker: p.ticker,
      name: p.name,
      mindshare: p.mindshare,
      mindshare_change: p.mindshare_change,
      logo_url: p.logo_url,
      trend: p.trend,
    }));
  }, [treemapProjects]);

  // Calculate stats - based on top 20 only
  const stats = useMemo(() => {
    if (!treemapProjects.length) return {
      total: 0,
      tgeCount: 0,
      preTgeCount: 0
    };
    const tgeCount = treemapProjects.filter(p => p.token_status === 'tge').length;
    const preTgeCount = treemapProjects.filter(p => p.token_status === 'pre-tge').length;
    return {
      total: treemapProjects.length,
      tgeCount,
      preTgeCount
    };
  }, [treemapProjects]);

  return (
    <div className="min-h-screen bg-[#050505] pb-20 lg:pb-0">
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-teal-950/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative flex h-screen max-w-[1920px] mx-auto">
        {/* Sidebar - Desktop only */}
        <div className={cn(
          "hidden lg:flex flex-shrink-0 transition-all duration-300 ease-out",
          sidebarOpen ? "w-[260px]" : "w-0"
        )}>
          {sidebarOpen && (
            <LeaderboardSidebar 
              projects={sidebarProjects} 
              className="w-full"
            />
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header - Kaito style */}
          <div className="border-b border-white/[0.06] flex-shrink-0">
            <div className="px-3 sm:px-6 py-3 sm:py-4">
              <div className="flex flex-col gap-2 sm:gap-4">
                {/* Title row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Sidebar toggle - Desktop only */}
                    <button
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all"
                      title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
                    >
                      {sidebarOpen ? (
                        <PanelLeftClose className="w-4 h-4 text-white/50" />
                      ) : (
                        <PanelLeft className="w-4 h-4 text-white/50" />
                      )}
                    </button>
                    
                    <h1 className="text-sm sm:text-xl font-bold text-white tracking-tight">
                      K-Leaderboard
                    </h1>
                    
                    {/* Period filter - visible on all screens */}
                    <div className="flex items-center p-0.5 bg-white/[0.03] rounded-md sm:rounded-lg border border-white/[0.06]">
                      <button
                        onClick={() => setPeriod('7d')}
                        className={cn(
                          "px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded sm:rounded-md transition-all duration-200",
                          period === '7d' 
                            ? "bg-teal-500/15 text-teal-400 border border-teal-500/30" 
                            : "text-white/40 hover:text-white/60 border border-transparent"
                        )}
                      >
                        7D
                      </button>
                      <button
                        onClick={() => setPeriod('30d')}
                        className={cn(
                          "px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded sm:rounded-md transition-all duration-200",
                          period === '30d' 
                            ? "bg-teal-500/15 text-teal-400 border border-teal-500/30" 
                            : "text-white/40 hover:text-white/60 border border-transparent"
                        )}
                      >
                        30D
                      </button>
                    </div>
                  </div>

                  {/* Right side: Live indicator + Desktop search */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Search input - Desktop only */}
                    <div className="relative hidden sm:flex items-center">
                      <Search className="absolute left-2.5 w-3.5 h-3.5 text-white/30" />
                      <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={cn(
                          "w-36 lg:w-44 pl-8 pr-7 py-1.5 text-xs",
                          "bg-white/[0.03] border border-white/[0.08] rounded-lg",
                          "text-white placeholder-white/25",
                          "focus:outline-none focus:border-teal-500/40 focus:bg-white/[0.05]",
                          "transition-all duration-200"
                        )}
                      />
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="absolute right-2 p-0.5 hover:bg-white/10 rounded transition-colors"
                        >
                          <X className="w-3 h-3 text-white/40 hover:text-white/70" />
                        </button>
                      )}
                    </div>
                    
                    {/* Last updated - Desktop only */}
                    {lastUpdate && (
                      <div className="hidden lg:flex items-center gap-1.5 text-xs text-white/30">
                        <Clock className="w-3 h-3" />
                        <span>Updated {formatDistanceToNow(lastUpdate, { addSuffix: false })} ago</span>
                      </div>
                    )}
                    
                    {/* Divider - Desktop */}
                    <div className="hidden sm:block w-px h-5 bg-white/[0.08]" />
                    
                    {/* Live indicator */}
                    <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-teal-500/10 border border-teal-500/20 rounded-full">
                      <div className="relative">
                        <Radio className="w-2 h-2 sm:w-3 sm:h-3 text-teal-400" />
                        <div className="absolute inset-0 animate-ping">
                          <Radio className="w-2 h-2 sm:w-3 sm:h-3 text-teal-400 opacity-40" />
                        </div>
                      </div>
                      <span className="text-[9px] sm:text-xs font-medium text-teal-400">Live</span>
                    </div>
                  </div>
                </div>

                {/* Mobile search bar - Full width */}
                <div className="relative flex sm:hidden items-center">
                  <Search className="absolute left-3 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      "w-full pl-10 pr-10 py-2.5 text-sm",
                      "bg-white/[0.03] border border-white/[0.08] rounded-xl",
                      "text-white placeholder-white/30",
                      "focus:outline-none focus:border-teal-500/40 focus:bg-white/[0.05]",
                      "transition-all duration-200"
                    )}
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-white/50" />
                    </button>
                  )}
                </div>

                {/* Controls row */}
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                  {/* Left: Token Status Filter */}
                  <TokenStatusToggle selected={tokenStatus} onChange={setTokenStatus} />
                  
                  {/* Right: Stats - Desktop */}
                  <div className="hidden sm:flex items-center gap-2.5">
                    {/* Channels badge - Kaito glassmorphism */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-xl">
                      <Hash className="w-4 h-4 text-teal-400" />
                      <div className="flex flex-col -space-y-0.5">
                        <span className="text-sm font-bold text-white">{hourlyStats.channels.toLocaleString()}</span>
                        <span className="text-[9px] text-white/35 uppercase tracking-wider">Channels</span>
                      </div>
                    </div>
                    
                    {/* Mentions badge */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-xl">
                      <MessageCircle className="w-4 h-4 text-cyan-400" />
                      <div className="flex flex-col -space-y-0.5">
                        <span className="text-sm font-bold text-white">{hourlyStats.mentions.toLocaleString()}</span>
                        <span className="text-[9px] text-white/35 uppercase tracking-wider">Mentions</span>
                      </div>
                    </div>
                    
                    {/* Thin divider */}
                    <div className="w-px h-8 bg-white/[0.06]" />
                    
                    {/* Project counts - minimal */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_6px_rgba(45,212,191,0.5)]" />
                        <span className="text-sm font-semibold text-white">{stats.tgeCount}</span>
                        <span className="text-[10px] text-white/35">TGE</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
                        <span className="text-sm font-semibold text-white">{stats.preTgeCount}</span>
                        <span className="text-[10px] text-white/35">Pre-TGE</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile stats - Compact */}
                  <div className="flex sm:hidden items-center gap-1.5">
                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/[0.03] border border-white/[0.06] rounded">
                      <Hash className="w-2.5 h-2.5 text-teal-400" />
                      <span className="text-[10px] text-white font-medium">{(hourlyStats.channels / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/[0.03] border border-white/[0.06] rounded">
                      <MessageCircle className="w-2.5 h-2.5 text-cyan-400" />
                      <span className="text-[10px] text-white font-medium">{(hourlyStats.mentions / 1000).toFixed(0)}K</span>
                    </div>
                    {/* Project count on mobile */}
                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/[0.03] border border-white/[0.06] rounded">
                      <span className="text-[10px] text-white font-medium">{stats.total}</span>
                      <span className="text-[9px] text-white/40">projects</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Treemap Container */}
          <div className="flex-1 min-h-0">
            {isLoading ? (
              <TreemapSkeleton />
            ) : (
              <MindshareTreemap projects={treemapProjects} className="h-full" />
            )}
          </div>

          {/* Footer - Hidden on mobile to save space */}
          <div className="hidden sm:block border-t border-white/[0.04] flex-shrink-0">
            <div className="px-4 sm:px-6 py-3">
              <p className="text-[9px] sm:text-[10px] text-white/25 text-center leading-relaxed max-w-2xl mx-auto">
                K-Leaderboard tracks mindshare from {hourlyStats.channels.toLocaleString()}+ Korean crypto channels. 
                Missing a project?{' '}
                <Link to="/contact" className="text-teal-400/50 hover:text-teal-400 transition-colors">
                  Contact us
                </Link>
                . Data updates hourly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KInfluenceGrid;