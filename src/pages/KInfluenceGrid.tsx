import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Activity,
  Zap,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  ArrowUpDown,
  ExternalLink,
  Crown,
  Flame
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

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

const topNarratives = [
  { tag: "#AI", heat: 94 },
  { tag: "#RWA", heat: 87 },
  { tag: "#DePIN", heat: 82 },
  { tag: "#L2", heat: 78 },
  { tag: "#Meme", heat: 71 },
];

const fearGreedValue = 72;

const getCategoryStyle = (category: string) => {
  switch (category.toLowerCase()) {
    case 'defi': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'l1': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'l2': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
    case 'infrastructure': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    case 'ai': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
    case 'rwa': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'depin': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'gaming': return 'bg-red-500/20 text-red-400 border-red-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

type SortOption = 'rank' | 'mindshare' | 'trend';
type CategoryFilter = 'all' | 'DeFi' | 'L1' | 'L2' | 'Infrastructure' | 'AI' | 'RWA' | 'DePIN';

const KInfluenceGrid = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [scoreHistory, setScoreHistory] = useState<Record<string, ScoreHistory[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  
  // Filter & Sort states
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('rank');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [projects, categoryFilter, sortBy, sortAsc]);

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

  const applyFiltersAndSort = () => {
    let result = [...projects];

    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category === categoryFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'rank':
          comparison = a.rank - b.rank;
          break;
        case 'mindshare':
          comparison = Number(b.mindshare_score) - Number(a.mindshare_score);
          break;
        case 'trend':
          const trendA = Number(a.mindshare_score) - Number(a.previous_score);
          const trendB = Number(b.mindshare_score) - Number(b.previous_score);
          comparison = trendB - trendA;
          break;
      }
      return sortAsc ? comparison : -comparison;
    });

    setFilteredProjects(result);
  };

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(option);
      setSortAsc(option === 'rank');
    }
  };

  const getRankChange = (current: number, previous: number) => {
    const change = previous - current;
    if (change > 0) return { icon: <ArrowUpRight className="w-3 h-3" />, text: `+${change}`, color: 'text-green-400' };
    if (change < 0) return { icon: <ArrowDownRight className="w-3 h-3" />, text: `${change}`, color: 'text-red-400' };
    return { icon: <Minus className="w-3 h-3" />, text: '-', color: 'text-white/40' };
  };

  const getScoreTrend = (current: number, previous: number) => {
    const change = Number(current) - Number(previous);
    const percent = previous > 0 ? ((change / previous) * 100).toFixed(1) : '0';
    if (change > 0) return { icon: <TrendingUp className="w-4 h-4" />, text: `+${percent}%`, color: 'text-green-400' };
    if (change < 0) return { icon: <TrendingDown className="w-4 h-4" />, text: `${percent}%`, color: 'text-red-400' };
    return { icon: <Minus className="w-4 h-4" />, text: '0%', color: 'text-white/40' };
  };

  const totalTracked = projects.length || 150;
  const avgScore = projects.length > 0 
    ? (projects.reduce((sum, p) => sum + Number(p.mindshare_score), 0) / projects.length).toFixed(1)
    : '750';
  const topMover = projects.reduce((best, p) => {
    const change = Number(p.mindshare_score) - Number(p.previous_score);
    const bestChange = Number(best.mindshare_score) - Number(best.previous_score);
    return change > bestChange ? p : best;
  }, projects[0]);

  const categories: CategoryFilter[] = ['all', 'DeFi', 'L1', 'L2', 'Infrastructure', 'AI', 'RWA', 'DePIN'];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[#00E0FF] font-bold text-xl tracking-tight">ium Labs</span>
              <span className="text-white/30">|</span>
              <span className="text-white font-medium">Project Leaderboard</span>
              <span className="ml-2 px-2 py-0.5 text-xs bg-[#00E0FF]/10 text-[#00E0FF] rounded border border-[#00E0FF]/20">Korea</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Last Updated: Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Fear & Greed Index */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-[#00E0FF]" />
                <h3 className="text-sm font-medium text-white/80">Fear & Greed Index</h3>
              </div>
              
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-[#00E0FF]">{fearGreedValue}</div>
                <div className="text-sm text-green-400 font-medium mt-1">Greed</div>
              </div>

              <div className="relative h-3 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden">
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-5 bg-white rounded-sm shadow-lg border-2 border-[#050505]"
                  style={{ left: `calc(${fearGreedValue}% - 6px)` }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/40 mt-2">
                <span>Extreme Fear</span>
                <span>Extreme Greed</span>
              </div>
            </motion.div>

            {/* Top Narratives */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-[#00E0FF]" />
                <h3 className="text-sm font-medium text-white/80">Top Narratives</h3>
              </div>

              <div className="space-y-3">
                {topNarratives.map((narrative, index) => (
                  <div key={narrative.tag} className="flex items-center gap-3">
                    <span className="text-xs text-white/40 w-4">{index + 1}</span>
                    <span className="text-sm font-medium text-[#00E0FF]">{narrative.tag}</span>
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${narrative.heat}%` }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-[#00E0FF] to-[#00E0FF]/50 rounded-full"
                      />
                    </div>
                    <span className="text-xs text-white/60 w-8 text-right">{narrative.heat}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-[#00E0FF]" />
                <h3 className="text-sm font-medium text-white/80">Market Stats</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Projects Tracked</span>
                  <span className="text-lg font-semibold text-white">{totalTracked}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Avg. Mindshare</span>
                  <span className="text-lg font-semibold text-[#00E0FF]">{avgScore}</span>
                </div>
                {topMover && (
                  <div className="pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span>Top Mover (24h)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img 
                        src={topMover.logo_url || `https://api.dicebear.com/7.x/shapes/svg?seed=${topMover.name}`}
                        alt={topMover.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="font-medium">{topMover.name}</span>
                      <span className="text-green-400 text-sm ml-auto">
                        +{((Number(topMover.mindshare_score) - Number(topMover.previous_score)) / Number(topMover.previous_score) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Leaderboard Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden">
              {/* Table Header with Filters */}
              <div className="px-6 py-4 border-b border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-[#00E0FF]" />
                    <h2 className="text-lg font-semibold">Project Rankings</h2>
                  </div>
                  
                  {/* Filters */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Category Filter */}
                    <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 overflow-x-auto">
                      <Filter className="w-4 h-4 text-white/40 ml-2 flex-shrink-0" />
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategoryFilter(cat)}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                            categoryFilter === cat
                              ? 'bg-[#00E0FF]/20 text-[#00E0FF]'
                              : 'text-white/60 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {cat === 'all' ? 'All' : cat}
                        </button>
                      ))}
                    </div>

                    {/* Sort Options */}
                    <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
                      <ArrowUpDown className="w-4 h-4 text-white/40 ml-2" />
                      {(['rank', 'mindshare', 'trend'] as SortOption[]).map((option) => (
                        <button
                          key={option}
                          onClick={() => toggleSort(option)}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
                            sortBy === option
                              ? 'bg-[#00E0FF]/20 text-[#00E0FF]'
                              : 'text-white/60 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {option === 'mindshare' ? 'Score' : option.charAt(0).toUpperCase() + option.slice(1)}
                          {sortBy === option && (
                            <span className="text-[10px]">{sortAsc ? '↑' : '↓'}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Rank</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Project</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Mindshare</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">7D Trend</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-white/40">
                          Loading...
                        </td>
                      </tr>
                    ) : filteredProjects.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-white/40">
                          No projects found
                        </td>
                      </tr>
                    ) : (
                      filteredProjects.map((item, index) => {
                        const rankChange = getRankChange(item.rank, item.previous_rank);
                        const scoreTrend = getScoreTrend(item.mindshare_score, item.previous_score);
                        const history = scoreHistory[item.id] || [];
                        
                        return (
                          <motion.tr
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            className={`border-b border-white/5 transition-colors ${
                              hoveredRow === index ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
                            }`}
                            onMouseEnter={() => setHoveredRow(index)}
                            onMouseLeave={() => setHoveredRow(null)}
                          >
                            {/* Rank */}
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                                  item.rank === 1 ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30 text-yellow-400 border border-yellow-500/30' :
                                  item.rank === 2 ? 'bg-gradient-to-br from-gray-400/30 to-gray-500/30 text-gray-300 border border-gray-400/30' :
                                  item.rank === 3 ? 'bg-gradient-to-br from-orange-600/30 to-orange-700/30 text-orange-400 border border-orange-600/30' :
                                  'bg-white/5 text-white/60 border border-white/10'
                                }`}>
                                  {item.rank}
                                </div>
                                <div className={`flex items-center gap-0.5 text-xs ${rankChange.color}`}>
                                  {rankChange.icon}
                                  <span>{rankChange.text}</span>
                                </div>
                              </div>
                            </td>

                            {/* Project */}
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                <img 
                                  src={item.logo_url || `https://api.dicebear.com/7.x/shapes/svg?seed=${item.name}`} 
                                  alt={item.name}
                                  className="w-10 h-10 rounded-full bg-white/10 border border-white/10 object-cover"
                                />
                                <div>
                                  <div className="font-medium text-white">{item.name}</div>
                                  <div className="text-xs text-white/40">{item.slug}</div>
                                </div>
                              </div>
                            </td>

                            {/* Category */}
                            <td className="px-6 py-5">
                              <span className={`inline-flex px-2.5 py-1 rounded text-xs font-medium border ${getCategoryStyle(item.category)}`}>
                                {item.category}
                              </span>
                            </td>

                            {/* Mindshare Score */}
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                <div className="text-xl font-bold text-[#00E0FF]">{Number(item.mindshare_score).toFixed(0)}</div>
                                {history.length > 0 && (
                                  <div className="w-20 h-8">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <LineChart data={history}>
                                        <Line 
                                          type="monotone" 
                                          dataKey="score" 
                                          stroke={Number(item.mindshare_score) >= Number(item.previous_score) ? '#22c55e' : '#ef4444'}
                                          strokeWidth={1.5}
                                          dot={false}
                                        />
                                        <Tooltip 
                                          contentStyle={{ 
                                            background: 'rgba(0,0,0,0.8)', 
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '8px',
                                            fontSize: '12px'
                                          }}
                                          labelFormatter={(value) => `Date: ${value}`}
                                        />
                                      </LineChart>
                                    </ResponsiveContainer>
                                  </div>
                                )}
                              </div>
                            </td>

                            {/* 7D Trend */}
                            <td className="px-6 py-5">
                              <div className={`flex items-center gap-1.5 ${scoreTrend.color}`}>
                                {scoreTrend.icon}
                                <span className="font-medium">{scoreTrend.text}</span>
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-2">
                                {item.website_url && (
                                  <a 
                                    href={item.website_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                  >
                                    <ExternalLink className="w-4 h-4 text-white/60" />
                                  </a>
                                )}
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Data Source Note */}
            <div className="mt-4 text-center text-xs text-white/30">
              Mindshare scores based on Korean social media mentions, community activity, and search trends.
              <br />
              Data aggregated from Twitter, Telegram, Discord, and Korean crypto communities.
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default KInfluenceGrid;