import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RankingList from '@/components/leaderboard/RankingList';
import ProjectSpotlight from '@/components/leaderboard/ProjectSpotlight';
import SideMetrics from '@/components/leaderboard/SideMetrics';
import { motion } from 'framer-motion';
import { Activity, Radio } from 'lucide-react';

const KInfluenceGrid = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['project-leaderboard'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_leaderboard')
        .select('*')
        .eq('is_active', true)
        .order('rank', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });

  // Auto-rotate when not hovering
  useEffect(() => {
    if (isHovering || projects.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % Math.min(projects.length, 10));
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering, projects.length]);

  const handleHover = useCallback((index: number) => {
    setActiveIndex(index);
    setIsHovering(true);
  }, []);

  const handleLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const activeProject = projects[activeIndex];

  // Calculate trend percentages
  const projectsWithTrend = useMemo(() => {
    return projects.map(p => {
      const current = Number(p.mindshare_score);
      const previous = Number(p.previous_score);
      const trend_percent = previous > 0 ? ((current - previous) / previous) * 100 : 0;
      return { ...p, trend_percent };
    }).sort((a, b) => a.rank - b.rank);
  }, [projects]);

  // Gainers and Losers
  const gainers = useMemo(() => {
    return [...projectsWithTrend]
      .filter(p => p.trend_percent > 0)
      .sort((a, b) => b.trend_percent - a.trend_percent);
  }, [projectsWithTrend]);

  const losers = useMemo(() => {
    return [...projectsWithTrend]
      .filter(p => p.trend_percent < 0)
      .sort((a, b) => a.trend_percent - b.trend_percent);
  }, [projectsWithTrend]);

  const totalTracked = projects.length || 150;
  const avgScore = projects.length > 0 
    ? (projects.reduce((sum, p) => sum + Number(p.mindshare_score), 0) / projects.length).toFixed(1)
    : '750';
  const topMover = projectsWithTrend.reduce((best, p) => {
    return (p.trend_percent > (best?.trend_percent || -Infinity)) ? p : best;
  }, projectsWithTrend[0]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-white/40">Loading...</div>
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-white/20 font-mono text-sm">01</span>
                <h1 className="text-xl font-medium text-white tracking-tight">
                  Project Mindshare
                </h1>
                <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-emerald-400">Live</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Activity className="w-3.5 h-3.5" />
                <span>Updates hourly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content: Three-Column Layout */}
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-200px)]">
            
            {/* Left: Ranking List */}
            <div className="lg:col-span-3 border-r border-white/5 py-6">
              <div className="px-4 mb-4">
                <p className="text-xs uppercase tracking-widest text-white/30 font-medium">
                  Top 10 Projects
                </p>
              </div>
              <RankingList
                projects={projects}
                activeIndex={activeIndex}
                onHover={handleHover}
                onLeave={handleLeave}
              />
            </div>

            {/* Center: Project Spotlight */}
            <div className="lg:col-span-6 relative overflow-hidden min-h-[600px]">
              {activeProject ? (
                <ProjectSpotlight 
                  project={activeProject} 
                  rank={activeIndex + 1}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white/40">
                  No projects available
                </div>
              )}
            </div>

            {/* Right: Side Metrics */}
            <div className="lg:col-span-3 border-l border-white/5 py-6 px-4 overflow-y-auto max-h-[calc(100vh-200px)]">
              <SideMetrics
                gainers={gainers}
                losers={losers}
                periodLabel="Δ7D"
                totalTracked={totalTracked}
                avgScore={avgScore}
                topMover={topMover}
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
