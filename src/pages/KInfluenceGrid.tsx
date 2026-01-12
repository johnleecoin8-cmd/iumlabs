import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, BarChart3, Crown, Flame } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import TreemapCard from '@/components/leaderboard/TreemapCard';
import GainersLosersList from '@/components/leaderboard/GainersLosersList';

interface Project {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  category: string;
  mindshare_score: number;
  previous_score: number;
  rank: number;
  previous_rank: number;
  twitter_mentions: number | null;
  telegram_members: number | null;
  discord_members: number | null;
  website_url: string | null;
  twitter_url: string | null;
}

interface ScoreHistory {
  project_id: string;
  score: number;
  rank: number;
  recorded_at: string;
}

type PeriodFilter = '7D' | '30D' | '3M' | '6M' | '12M';

const topNarratives = [
  { tag: "#AI", heat: 94 },
  { tag: "#RWA", heat: 87 },
  { tag: "#DePIN", heat: 82 },
  { tag: "#L2", heat: 78 },
  { tag: "#Meme", heat: 71 },
];

const fearGreedValue = 72;

const KInfluenceGrid = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [scoreHistory, setScoreHistory] = useState<Record<string, ScoreHistory[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState<PeriodFilter>('7D');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    
    const [projectsRes, historyRes] = await Promise.all([
      supabase
        .from('project_leaderboard')
        .select('*')
        .eq('is_active', true)
        .order('rank', { ascending: true }),
      supabase
        .from('project_score_history')
        .select('*')
        .order('recorded_at', { ascending: true })
    ]);

    if (projectsRes.data) {
      setProjects(projectsRes.data);
    }

    if (historyRes.data) {
      const grouped: Record<string, ScoreHistory[]> = {};
      historyRes.data.forEach((item) => {
        if (!grouped[item.project_id]) {
          grouped[item.project_id] = [];
        }
        grouped[item.project_id].push(item);
      });
      setScoreHistory(grouped);
    }

    setIsLoading(false);
  };

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

  // Grid span assignment - Bento style (Kaito)
  const getGridSpan = (rank: number): 'king' | 'tall' | 'standard' | 'compact' => {
    if (rank === 1) return 'king';       // 2x2 - The King
    if (rank <= 3) return 'tall';        // 1x2 - Tall rectangles
    if (rank <= 10) return 'standard';   // 1x1 - Standard squares
    return 'compact';                    // 1x1 - Compact
  };

  const totalTracked = projects.length || 150;
  const avgScore = projects.length > 0 
    ? (projects.reduce((sum, p) => sum + Number(p.mindshare_score), 0) / projects.length).toFixed(1)
    : '750';
  const topMover = projectsWithTrend.reduce((best, p) => {
    return (p.trend_percent > (best?.trend_percent || -Infinity)) ? p : best;
  }, projectsWithTrend[0]);

  const periodLabels: Record<PeriodFilter, string> = {
    '7D': 'Δ7D',
    '30D': 'Δ30D',
    '3M': 'Δ3M',
    '6M': 'Δ6M',
    '12M': 'Δ12M'
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-black/40 sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[#00E0FF] font-bold text-xl tracking-tight">ium Labs</span>
              <span className="text-white/30">|</span>
              <span className="text-white font-medium">Project Hype Radar</span>
              <span className="ml-2 px-2 py-0.5 text-xs bg-[#00E0FF]/10 text-[#00E0FF] rounded border border-[#00E0FF]/20">Korea</span>
            </div>
            <div className="flex items-center gap-4">
              {/* Period Filter */}
              <div className="hidden sm:flex items-center gap-1 bg-white/5 rounded-lg p-1">
                {(['7D', '30D', '3M', '6M', '12M'] as PeriodFilter[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      period === p
                        ? 'bg-[#00E0FF]/20 text-[#00E0FF]'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="hidden sm:inline">Live</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - 30% */}
          <div className="lg:w-[30%] space-y-4">
            {/* Gainers & Losers */}
            <GainersLosersList 
              gainers={gainers}
              losers={losers}
              periodLabel={periodLabels[period]}
            />

            {/* Fear & Greed Index */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-[#00E0FF]" />
                <h3 className="text-sm font-medium text-white/80">Fear & Greed Index</h3>
              </div>
              
              <div className="text-center mb-3">
                <div className="text-3xl font-bold text-[#00E0FF]">{fearGreedValue}</div>
                <div className="text-xs text-green-400 font-medium mt-0.5">Greed</div>
              </div>

              <div className="relative h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden">
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-4 bg-white rounded-sm shadow-lg border border-[#050505]"
                  style={{ left: `calc(${fearGreedValue}% - 4px)` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-white/40 mt-1">
                <span>Fear</span>
                <span>Greed</span>
              </div>
            </motion.div>

            {/* Top Narratives */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-[#00E0FF]" />
                <h3 className="text-sm font-medium text-white/80">Top Narratives</h3>
              </div>

              <div className="space-y-2">
                {topNarratives.map((narrative, index) => (
                  <div key={narrative.tag} className="flex items-center gap-2">
                    <span className="text-xs text-white/40 w-3">{index + 1}</span>
                    <span className="text-xs font-medium text-[#00E0FF] w-12">{narrative.tag}</span>
                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${narrative.heat}%` }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-[#00E0FF] to-[#00E0FF]/50 rounded-full"
                      />
                    </div>
                    <span className="text-xs text-white/60 w-6 text-right">{narrative.heat}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4 text-[#00E0FF]" />
                <h3 className="text-sm font-medium text-white/80">Market Stats</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/60">Projects Tracked</span>
                  <span className="text-base font-semibold text-white">{totalTracked}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/60">Avg. Mindshare</span>
                  <span className="text-base font-semibold text-[#00E0FF]">{avgScore}%</span>
                </div>
                {topMover && (
                  <div className="pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-white/60 mb-1.5">
                      <Flame className="w-3 h-3 text-orange-400" />
                      <span>Top Mover</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img 
                        src={topMover.logo_url || `https://api.dicebear.com/7.x/shapes/svg?seed=${topMover.name}`}
                        alt={topMover.name}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="text-sm font-medium">{topMover.name}</span>
                      <span className="text-emerald-400 text-xs ml-auto">
                        +{topMover.trend_percent.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Main - Treemap Grid - 70% */}
          <div className="lg:w-[70%]">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-5">
              {/* Header with Title, Badge, Update Info */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-white">Project Mindshare</h2>
                  <span className="px-2.5 py-1 text-xs font-bold bg-[#00E0FF]/20 text-[#00E0FF] rounded-full border border-[#00E0FF]/30">
                    Top 20
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-white/40">Data updates every hour</span>
                  <span className="text-xs text-white/50 hover:text-[#00E0FF] cursor-pointer transition-colors">
                    See Full Leaderboard →
                  </span>
                </div>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00E0FF]"></div>
                </div>
              ) : projectsWithTrend.length === 0 ? (
                <div className="text-center py-20 text-white/40">
                  No projects found
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2 auto-rows-[140px]">
                  {projectsWithTrend.slice(0, 20).map((project, index) => {
                    const gridSpan = getGridSpan(project.rank);
                    const history = scoreHistory[project.id] || [];
                    
                    return (
                      <TreemapCard
                        key={project.id}
                        rank={project.rank}
                        name={project.name}
                        logo_url={project.logo_url}
                        mindshare_score={project.mindshare_score}
                        trend_percent={project.trend_percent}
                        history={history}
                        website_url={project.website_url}
                        gridSpan={gridSpan}
                        delay={index * 0.03}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KInfluenceGrid;
