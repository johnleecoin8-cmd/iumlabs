import { useState, useMemo, useCallback } from 'react';
import { useHypeProjects } from '@/hooks/useHypeProjects';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SocialGraph from '@/components/leaderboard/SocialGraph';
import LeaderboardTable from '@/components/leaderboard/LeaderboardTable';
import { Activity, Radio, BarChart3, RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const KInfluenceGrid = () => {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const { projects, isLoading, lastUpdate } = useHypeProjects();

  const handleProjectHover = useCallback((projectId: string | null) => {
    setActiveProjectId(projectId);
  }, []);

  // Stats for header
  const stats = useMemo(() => {
    if (projects.length === 0) return { total: 0, avgScore: 0, topProject: null };
    
    const avgScore = projects.reduce((sum, p) => sum + Number(p.score), 0) / projects.length;
    const topProject = projects[0]; // Already sorted by rank
    
    return {
      total: projects.length,
      avgScore: avgScore.toFixed(0),
      topProject
    };
  }, [projects]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-white/40">Loading hype data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Header */}
        <div className="border-b border-white/5">
          <div className="max-w-[1800px] mx-auto px-6 py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white tracking-tight">
                    Hype Equalizer
                  </h1>
                  <p className="text-sm text-white/50">Real-time Korean crypto sentiment tracking</p>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full ml-2">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-emerald-400">Live</span>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-white/40">Tracking:</span>
                  <span className="font-bold text-white">{stats.total}</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-white/40">Avg Hype:</span>
                  <span className="font-bold text-white">{stats.avgScore}</span>
                </div>
                {lastUpdate && (
                  <div className="flex items-center gap-2 text-white/40">
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="text-xs">
                      {formatDistanceToNow(lastUpdate, { addSuffix: true })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content: Two-Column Layout */}
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-200px)]">
            
            {/* Left: Social Graph */}
            <div className="lg:col-span-5 border-r border-white/5 p-6">
              <div className="mb-4">
                <h2 className="text-sm uppercase tracking-widest text-white/30 font-medium">
                  Hype Distribution
                </h2>
                <p className="text-xs text-white/20 mt-1">
                  Bar height = Hype Score • Color = Trend
                </p>
              </div>
              <SocialGraph
                projects={projects}
                onProjectHover={handleProjectHover}
                activeProjectId={activeProjectId}
              />
            </div>

            {/* Right: Leaderboard Table */}
            <div className="lg:col-span-7 flex flex-col min-h-[600px]">
              <LeaderboardTable
                projects={projects}
                onProjectHover={handleProjectHover}
                activeProjectId={activeProjectId}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default KInfluenceGrid;
