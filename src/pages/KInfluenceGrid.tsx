import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  MessageCircle, 
  Twitter, 
  Youtube, 
  Smartphone,
  Activity,
  Users,
  Zap,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// Mock Data
const leaderboardData = [
  {
    rank: 1,
    name: "Hobbyist (취미생활방)",
    platform: "telegram",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hobbyist",
    score: 98.2,
    tier: "Alpha",
    tierColor: "cyan",
    trend: +2,
  },
  {
    rank: 2,
    name: "100y",
    platform: "x",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=100y",
    score: 95.5,
    tier: "Builder",
    tierColor: "purple",
    trend: +5,
  },
  {
    rank: 3,
    name: "CoinNess",
    platform: "app",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=coinness",
    score: 91.0,
    tier: "Aggregator",
    tierColor: "blue",
    trend: 0,
  },
  {
    rank: 4,
    name: "WeCrypto (코인같이투자)",
    platform: "telegram",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wecrypto",
    score: 88.4,
    tier: "VC",
    tierColor: "green",
    trend: +1,
  },
  {
    rank: 5,
    name: "Ki Young Ju",
    platform: "x",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kiyoungju",
    score: 85.2,
    tier: "On-chain",
    tierColor: "orange",
    trend: -1,
  },
];

const topNarratives = [
  { tag: "#AI", heat: 94 },
  { tag: "#RWA", heat: 87 },
  { tag: "#ZK", heat: 82 },
  { tag: "#DePIN", heat: 78 },
  { tag: "#Meme", heat: 71 },
];

const fearGreedValue = 72;

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'telegram':
      return <MessageCircle className="w-3 h-3" />;
    case 'x':
      return <Twitter className="w-3 h-3" />;
    case 'youtube':
      return <Youtube className="w-3 h-3" />;
    case 'app':
      return <Smartphone className="w-3 h-3" />;
    default:
      return null;
  }
};

const getPlatformStyle = (platform: string) => {
  switch (platform) {
    case 'telegram':
      return 'bg-[#0088cc]/20 text-[#0088cc] border-[#0088cc]/30';
    case 'x':
      return 'bg-white/10 text-white border-white/20';
    case 'youtube':
      return 'bg-[#ff0000]/20 text-[#ff4444] border-[#ff0000]/30';
    case 'app':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const getTierStyle = (tierColor: string) => {
  switch (tierColor) {
    case 'cyan':
      return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40';
    case 'purple':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/40';
    case 'blue':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
    case 'green':
      return 'bg-green-500/20 text-green-400 border-green-500/40';
    case 'orange':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
  }
};

const KInfluenceGrid = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[#00E0FF] font-bold text-xl tracking-tight">ium Labs</span>
              <span className="text-white/30">|</span>
              <span className="text-white font-medium">K-Influence Grid</span>
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
                <h3 className="text-sm font-medium text-white/80">Network Stats</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Total Tracked</span>
                  <span className="text-lg font-semibold text-white">847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Avg. Score</span>
                  <span className="text-lg font-semibold text-[#00E0FF]">72.4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Active Today</span>
                  <span className="text-lg font-semibold text-green-400">312</span>
                </div>
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
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#00E0FF]" />
                  <h2 className="text-lg font-semibold">Key Opinion Leaders</h2>
                </div>
                <div className="text-sm text-white/40">Top 5 by ium Score</div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Rank</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Key Player</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">ium Score</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Smart Follower Tier</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase tracking-wider">7D Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((item, index) => (
                      <motion.tr
                        key={item.rank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className={`border-b border-white/5 transition-colors cursor-pointer ${
                          hoveredRow === index ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
                        }`}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        {/* Rank */}
                        <td className="px-6 py-5">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                            item.rank === 1 ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30 text-yellow-400 border border-yellow-500/30' :
                            item.rank === 2 ? 'bg-gradient-to-br from-gray-400/30 to-gray-500/30 text-gray-300 border border-gray-400/30' :
                            item.rank === 3 ? 'bg-gradient-to-br from-orange-600/30 to-orange-700/30 text-orange-400 border border-orange-600/30' :
                            'bg-white/5 text-white/60 border border-white/10'
                          }`}>
                            {item.rank}
                          </div>
                        </td>

                        {/* Key Player */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <img 
                              src={item.avatar} 
                              alt={item.name}
                              className="w-10 h-10 rounded-full bg-white/10 border border-white/10"
                            />
                            <div>
                              <div className="font-medium text-white">{item.name}</div>
                              <div className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-xs border ${getPlatformStyle(item.platform)}`}>
                                {getPlatformIcon(item.platform)}
                                <span className="capitalize">{item.platform === 'x' ? 'X (Twitter)' : item.platform}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* ium Score */}
                        <td className="px-6 py-5">
                          <div className="space-y-2">
                            <div className="text-xl font-bold text-[#00E0FF]">{item.score.toFixed(1)}</div>
                            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${item.score}%` }}
                                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                                className="h-full bg-gradient-to-r from-[#00E0FF] to-[#00E0FF]/60 rounded-full"
                              />
                            </div>
                          </div>
                        </td>

                        {/* Smart Follower Tier */}
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTierStyle(item.tierColor)}`}>
                            {item.tier}
                          </span>
                        </td>

                        {/* 7D Trend */}
                        <td className="px-6 py-5">
                          <div className={`inline-flex items-center gap-1 text-sm font-medium ${
                            item.trend > 0 ? 'text-green-400' : 
                            item.trend < 0 ? 'text-red-400' : 
                            'text-white/40'
                          }`}>
                            {item.trend > 0 ? (
                              <>
                                <ArrowUpRight className="w-4 h-4" />
                                <span>+{item.trend}</span>
                              </>
                            ) : item.trend < 0 ? (
                              <>
                                <ArrowDownRight className="w-4 h-4" />
                                <span>{item.trend}</span>
                              </>
                            ) : (
                              <>
                                <Minus className="w-4 h-4" />
                                <span>0</span>
                              </>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between text-sm text-white/40">
                <span>Showing top 5 of 847 tracked influencers</span>
                <span className="text-[#00E0FF]">Powered by ium Intelligence Engine</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default KInfluenceGrid;
