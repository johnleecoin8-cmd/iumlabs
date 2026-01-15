import { useState, useMemo } from 'react';
import { useHypeProjects } from '@/hooks/useHypeProjects';
import MindshareTreemap, { type MindshareProject } from '@/components/mindshare/MindshareTreemap';
import TreemapSkeleton from '@/components/mindshare/TreemapSkeleton';
import TokenStatusToggle, { type TokenStatus } from '@/components/mindshare/TokenStatusToggle';
import { History, Users, ExternalLink, Radio, Search, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { usePageMeta } from '@/hooks/usePageMeta';
const KInfluenceGrid = () => {
  usePageMeta({
    title: "K-Leaderboard | Korean Crypto Mindshare Rankings",
    description: "Real-time Web3 mindshare rankings from Korean crypto communities. Track trending projects across X, Telegram, Naver, and KakaoTalk. Powered by Ium Labs.",
    path: "/k-leaderboard",
    image: "/og-image.png"
  });
  const [tokenStatus, setTokenStatus] = useState<TokenStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const {
    projects,
    isLoading,
    lastUpdate
  } = useHypeProjects();

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
    return top20.map(project => ({
      id: project.id,
      ticker: project.ticker,
      name: project.name,
      mindshare: project.mindshare > 0 ? Number(project.mindshare) : totalScore > 0 ? Number(project.score) / totalScore * 100 : 0,
      mindshare_change: project.mindshare_change,
      narrative: project.narrative,
      score: Number(project.score),
      trend: (project.trend === 'up' || project.trend === 'down' || project.trend === 'neutral' ? project.trend : 'neutral') as 'up' | 'down' | 'neutral',
      sparkline: project.sparkline || [],
      logo_url: project.logo_url,
      rank: project.rank,
      token_status: project.token_status
    }));
  }, [projects, tokenStatus, searchQuery]);

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
  return <div className="min-h-screen bg-[#050505]">
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-teal-950/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-[1920px] mx-auto">
        {/* Header - Mobile optimized */}
        <div className="border-b border-white/5">
          <div className="px-3 sm:px-6 py-3 sm:py-5">
            <div className="flex flex-col gap-3 sm:gap-5">
              {/* Title row */}
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h1 className="text-base sm:text-2xl font-bold text-white tracking-tight">
                    K-Leaderboard
                  </h1>
                  <p className="hidden sm:block mt-0.5 text-sm text-white/40">
                    Real-time crypto mindshare from Korean communities
                  </p>
                </div>

                {/* Right side: Search + Action buttons + Live indicator */}
                <div className="flex items-center gap-1.5 sm:gap-3">
                  {/* Search input - Kaito style */}
                  <div className="relative">
                    
                  </div>
                  
                  
                  
                  
                  {/* Live indicator - moved to right end */}
                  <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-teal-500/10 border border-teal-500/20 rounded-full">
                    <Radio className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-teal-400 animate-pulse" />
                    <span className="text-[10px] sm:text-xs font-medium text-teal-400">Live</span>
                  </div>
                </div>
              </div>

              {/* Controls row - Mobile optimized */}
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                {/* Token Status Filter */}
                <TokenStatusToggle selected={tokenStatus} onChange={setTokenStatus} />
                
                {/* Stats - Compact on mobile */}
                <div className="hidden sm:flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-white/40">Total:</span>
                    <span className="font-semibold text-white">{stats.total}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span className="text-white/40">TGE:</span>
                    <span className="font-semibold text-teal-400">{stats.tgeCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="text-white/40">Pre-TGE:</span>
                    <span className="font-semibold text-cyan-400">{stats.preTgeCount}</span>
                  </div>
                </div>
                
                {/* Mobile stats - Compact */}
                <div className="flex sm:hidden items-center gap-2 text-[10px]">
                  <span className="text-white/60 font-medium">{stats.total}</span>
                  <span className="text-white/20">|</span>
                  <span className="text-teal-400 font-medium">{stats.tgeCount}</span>
                  <span className="text-white/20">/</span>
                  <span className="text-cyan-400 font-medium">{stats.preTgeCount}</span>
                </div>
                
                {/* Update frequency - Desktop only */}
                <span className="hidden sm:block text-xs text-white/30">
                  Update every 1 hour
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Treemap Container - Adjusted height for mobile */}
        <div className="h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)]">
          {isLoading ? <TreemapSkeleton /> : <MindshareTreemap projects={treemapProjects} className="h-full" />}
        </div>

        {/* Footer - Kaito style methodology */}
        <div className="border-t border-white/5">
          <div className="px-3 sm:px-6 py-3 sm:py-4">
            {/* Methodology - Kaito style */}
            <div>
              <p className="text-[9px] sm:text-[11px] text-white/30 text-center leading-relaxed max-w-3xl mx-auto">
                K-Leaderboard is calculated as the total mindshare from 1,000+ Korean crypto community channels across X, Telegram, Naver, and KakaoTalk. 
                Community sources are curated from major Korean crypto communities, influencer networks, and trading groups. 
                <span className="hidden sm:inline"> If you notice any projects or community channels missing, feel free to contact us.</span>
                {' '}Data updates every hour.
              </p>
              <p className="text-[8px] sm:text-[10px] text-white/20 text-center mt-2">
                Powered by <span className="text-teal-400/60">Ium Labs</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default KInfluenceGrid;