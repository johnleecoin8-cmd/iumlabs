import { useState, useMemo } from 'react';
import { useHypeProjects } from '@/hooks/useHypeProjects';
import MindshareTreemap, { type MindshareProject } from '@/components/mindshare/MindshareTreemap';
import TreemapSkeleton from '@/components/mindshare/TreemapSkeleton';
import PeriodFilter, { type DateRange } from '@/components/mindshare/PeriodFilter';
import TokenStatusToggle, { type TokenStatus } from '@/components/mindshare/TokenStatusToggle';
import { History, Users, ExternalLink, Radio } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

const KInfluenceGrid = () => {
  const [dateRange, setDateRange] = useState<DateRange>('7D');
  const [tokenStatus, setTokenStatus] = useState<TokenStatus>('all');
  const { projects, isLoading, lastUpdate } = useHypeProjects();

  // Transform and filter projects for treemap (top 20 only)
  const treemapProjects: MindshareProject[] = useMemo(() => {
    if (!projects.length) return [];

    // Filter by token status
    const filtered = projects.filter((p) => {
      if (tokenStatus === 'all') return true;
      return p.token_status === tokenStatus;
    });

    // Sort by rank and take top 20
    const top20 = filtered
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 20);

    // Calculate total score for mindshare percentage if not provided
    const totalScore = top20.reduce((sum, p) => sum + Number(p.score), 0);

    return top20.map((project) => ({
      id: project.id,
      ticker: project.ticker,
      name: project.name,
      mindshare: project.mindshare > 0 
        ? Number(project.mindshare) 
        : totalScore > 0 
          ? (Number(project.score) / totalScore) * 100 
          : 0,
      score: Number(project.score),
      trend: (project.trend === 'up' || project.trend === 'down' || project.trend === 'neutral' 
        ? project.trend 
        : 'neutral') as 'up' | 'down' | 'neutral',
      sparkline: project.sparkline || [],
      logo_url: project.logo_url,
      rank: project.rank,
      token_status: project.token_status,
    }));
  }, [projects, tokenStatus]);

  // Calculate stats
  const stats = useMemo(() => {
    if (!treemapProjects.length) return { total: 0, tgeCount: 0, preTgeCount: 0 };
    
    const tgeCount = projects.filter(p => p.token_status === 'tge').length;
    const preTgeCount = projects.filter(p => p.token_status === 'pre-tge').length;
    
    return {
      total: projects.length,
      tgeCount,
      preTgeCount,
    };
  }, [treemapProjects, projects]);

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-teal-950/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="border-b border-white/5">
          <div className="px-4 sm:px-6 py-5 sm:py-6">
            <div className="flex flex-col gap-5">
              {/* Title row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      K-Leaderboard
                    </h1>
                    <p className="mt-0.5 text-sm text-white/40">
                      Real-time crypto mindshare from Korean communities
                    </p>
                  </div>
                  
                  {/* Live indicator */}
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full">
                    <Radio className="w-3 h-3 text-teal-400 animate-pulse" />
                    <span className="text-xs font-medium text-teal-400">Live</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  <button 
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-lg',
                      'bg-white/5 text-white/50 border border-white/10',
                      'hover:bg-white/10 hover:text-white hover:border-white/15',
                      'transition-all duration-200 flex items-center gap-2'
                    )}
                  >
                    <History className="w-4 h-4" />
                    Historical
                  </button>
                  <button 
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-lg',
                      'bg-teal-500/10 text-teal-400 border border-teal-500/20',
                      'hover:bg-teal-500/20 hover:border-teal-500/30',
                      'transition-all duration-200 flex items-center gap-2'
                    )}
                  >
                    <Users className="w-4 h-4" />
                    Creator Leaderboard
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </button>
                </div>
              </div>

              {/* Controls row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-1">
                {/* Token Status Filter */}
                <TokenStatusToggle selected={tokenStatus} onChange={setTokenStatus} />
                
                <div className="hidden sm:block h-4 w-px bg-white/10" />
                
                {/* Stats */}
                <div className="flex items-center gap-4 text-sm">
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
                
                <div className="flex-1" />
                
                {/* Period Filter */}
                <PeriodFilter selected={dateRange} onChange={setDateRange} />
                
                {/* Last update */}
                {lastUpdate && (
                  <>
                    <div className="hidden sm:block h-4 w-px bg-white/10" />
                    <span className="text-xs text-white/30">
                      Updated {formatDistanceToNow(lastUpdate, { addSuffix: true })}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Treemap Container - fills remaining viewport height */}
        <div className="h-[calc(100vh-180px)]">
          {isLoading ? (
            <TreemapSkeleton />
          ) : (
            <MindshareTreemap projects={treemapProjects} className="h-full" />
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/5">
          <div className="px-4 sm:px-6 py-4 space-y-3">
            {/* Trend Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/30">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gradient-to-br from-teal-500/30 to-teal-500/5 border border-teal-500/25" />
                <span>Positive Trend</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gradient-to-br from-rose-500/30 to-rose-500/5 border border-rose-500/25" />
                <span>Negative Trend</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gradient-to-br from-white/15 to-white/5 border border-white/10" />
                <span>Neutral</span>
              </div>
              <span className="text-white/15">|</span>
              <span>Cell size = Mindshare %</span>
            </div>
            
            {/* Methodology */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-white/5 text-xs text-white/25">
              <span>Mindshare calculated from 1,000+ Korean community channels across X · Telegram · Naver · KakaoTalk</span>
              <span className="text-white/15">|</span>
              <span className="text-white/20">Powered by Ium Labs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KInfluenceGrid;
