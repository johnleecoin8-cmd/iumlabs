import { useState, useMemo } from 'react';
import { useHypeProjects } from '@/hooks/useHypeProjects';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MindshareTreemap, { type MindshareProject } from '@/components/mindshare/MindshareTreemap';
import PeriodFilter, { type DateRange } from '@/components/mindshare/PeriodFilter';
import TokenStatusToggle, { type TokenStatus } from '@/components/mindshare/TokenStatusToggle';
import { Radio, RefreshCw, TrendingUp, BarChart3, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const KInfluenceGrid = () => {
  const [dateRange, setDateRange] = useState<DateRange>('24H');
  const [tokenStatus, setTokenStatus] = useState<TokenStatus>('all');
  const { projects, isLoading, lastUpdate } = useHypeProjects();

  // Transform and filter projects for treemap
  const treemapProjects: MindshareProject[] = useMemo(() => {
    if (!projects.length) return [];

    // Filter by token status
    const filtered = projects.filter((p) => {
      if (tokenStatus === 'all') return true;
      return p.token_status === tokenStatus;
    });

    // Calculate total score for mindshare percentage if not provided
    const totalScore = filtered.reduce((sum, p) => sum + Number(p.score), 0);

    return filtered.map((project) => ({
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
    if (!treemapProjects.length) return { total: 0, topProject: null, tgeCount: 0, preTgeCount: 0 };
    
    const topProject = treemapProjects[0];
    const tgeCount = projects.filter(p => p.token_status === 'tge').length;
    const preTgeCount = projects.filter(p => p.token_status === 'pre-tge').length;
    
    return {
      total: projects.length,
      topProject,
      tgeCount,
      preTgeCount,
    };
  }, [treemapProjects, projects]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <div className="text-white/40">Loading mindshare data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Header */}
        <div className="border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col gap-4">
              {/* Top Row: Title + Live Status */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                    <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                      Korean Community Mindshare
                    </h1>
                    <p className="text-xs sm:text-sm text-white/50">Real-time crypto sentiment from Korean Telegram</p>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                    <span className="text-xs font-medium text-emerald-400">Live</span>
                  </div>
                </div>

                {/* Last Update */}
                {lastUpdate && (
                  <div className="flex items-center gap-2 text-white/40">
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="text-xs">
                      Updated {formatDistanceToNow(lastUpdate, { addSuffix: true })}
                    </span>
                  </div>
                )}
              </div>

              {/* Controls Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Left: Token Status Toggle */}
                <TokenStatusToggle selected={tokenStatus} onChange={setTokenStatus} />

                {/* Center: Quick Stats */}
                <div className="flex items-center gap-4 sm:gap-6 text-sm order-last sm:order-none">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-white/30" />
                    <span className="text-white/50">Total:</span>
                    <span className="font-bold text-white">{stats.total}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-white/50">TGE:</span>
                    <span className="font-bold text-emerald-400">{stats.tgeCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="text-white/50">Pre-TGE:</span>
                    <span className="font-bold text-amber-400">{stats.preTgeCount}</span>
                  </div>
                  {stats.topProject && (
                    <div className="hidden lg:flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className="text-white/50">Top:</span>
                      <span className="font-bold text-emerald-400">{stats.topProject.ticker}</span>
                      <span className="text-white/40">({stats.topProject.mindshare.toFixed(1)}%)</span>
                    </div>
                  )}
                </div>

                {/* Right: Period Filter */}
                <PeriodFilter selected={dateRange} onChange={setDateRange} />
              </div>
            </div>
          </div>
        </div>

        {/* Treemap Container */}
        <div className="max-w-[1920px] mx-auto">
          <div className="min-h-[calc(100vh-280px)] sm:min-h-[calc(100vh-240px)]">
            <MindshareTreemap projects={treemapProjects} className="h-full" />
          </div>
        </div>

        {/* Legend */}
        <div className="border-t border-white/5 bg-gradient-to-t from-white/[0.02] to-transparent">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-3">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-white/40">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gradient-to-b from-emerald-500/40 to-emerald-500/10 border border-emerald-500/30" />
                <span>Positive Trend</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gradient-to-b from-red-500/40 to-red-500/10 border border-red-500/30" />
                <span>Negative Trend</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gradient-to-b from-white/20 to-white/5 border border-white/10" />
                <span>Neutral</span>
              </div>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="text-white/30">Cell size = Mindshare %</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default KInfluenceGrid;
