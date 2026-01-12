import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Flame, SnowflakeIcon, Activity, Zap, BarChart3 } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  logo_url: string | null;
  mindshare_score: number;
  trend_percent: number;
}

interface SideMetricsProps {
  gainers: Project[];
  losers: Project[];
  periodLabel: string;
  totalTracked: number;
  avgScore: string;
  topMover: Project | null;
}

const topNarratives = [
  { tag: "#AI", heat: 94 },
  { tag: "#RWA", heat: 87 },
  { tag: "#DePIN", heat: 82 },
  { tag: "#L2", heat: 78 },
  { tag: "#Meme", heat: 71 },
];

const fearGreedValue = 72;

const SideMetrics = ({ gainers, losers, periodLabel, totalTracked, avgScore, topMover }: SideMetricsProps) => {
  return (
    <div className="space-y-4">
      {/* Top Gainers */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 backdrop-blur-sm p-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-emerald-500/20">
            <Flame className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-sm font-semibold text-white">Rising Stars</h3>
          <span className="ml-auto text-xs text-white/40">{periodLabel}</span>
        </div>

        <div className="space-y-2">
          {gainers.slice(0, 5).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="text-xs text-white/40 w-4">{index + 1}</span>
              <img
                src={project.logo_url || `https://api.dicebear.com/7.x/shapes/svg?seed=${project.name}`}
                alt={project.name}
                className="w-7 h-7 rounded-full ring-1 ring-white/10"
              />
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-white truncate block">
                  {project.name}
                </span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                <TrendingUp className="w-3 h-3" />
                <span className="text-sm font-semibold">
                  +{project.trend_percent.toFixed(1)}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Top Losers */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-red-500/20 bg-red-950/20 backdrop-blur-sm p-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-red-500/20">
            <SnowflakeIcon className="w-4 h-4 text-red-400" />
          </div>
          <h3 className="text-sm font-semibold text-white">Cooling Down</h3>
          <span className="ml-auto text-xs text-white/40">{periodLabel}</span>
        </div>

        <div className="space-y-2">
          {losers.slice(0, 5).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="text-xs text-white/40 w-4">{index + 1}</span>
              <img
                src={project.logo_url || `https://api.dicebear.com/7.x/shapes/svg?seed=${project.name}`}
                alt={project.name}
                className="w-7 h-7 rounded-full ring-1 ring-white/10"
              />
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-white truncate block">
                  {project.name}
                </span>
              </div>
              <div className="flex items-center gap-1 text-red-400">
                <TrendingDown className="w-3 h-3" />
                <span className="text-sm font-semibold">
                  {project.trend_percent.toFixed(1)}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Fear & Greed Index */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium text-white/80">Fear & Greed</h3>
        </div>
        
        <div className="text-center mb-3">
          <div className="text-3xl font-bold text-primary">{fearGreedValue}</div>
          <div className="text-xs text-green-400 font-medium mt-0.5">Greed</div>
        </div>

        <div className="relative h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden">
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-2 h-4 bg-white rounded-sm shadow-lg"
            style={{ left: `calc(${fearGreedValue}% - 4px)` }}
          />
        </div>
      </motion.div>

      {/* Top Narratives */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium text-white/80">Narratives</h3>
        </div>

        <div className="space-y-2">
          {topNarratives.map((narrative, index) => (
            <div key={narrative.tag} className="flex items-center gap-2">
              <span className="text-xs text-primary w-12">{narrative.tag}</span>
              <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${narrative.heat}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-primary to-primary/50 rounded-full"
                />
              </div>
              <span className="text-xs text-white/60 w-6 text-right">{narrative.heat}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Market Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium text-white/80">Stats</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/60">Tracked</span>
            <span className="text-sm font-semibold text-white">{totalTracked}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/60">Avg Score</span>
            <span className="text-sm font-semibold text-primary">{avgScore}</span>
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
                <span className="text-sm font-medium truncate">{topMover.name}</span>
                <span className="text-emerald-400 text-xs ml-auto">
                  +{topMover.trend_percent.toFixed(1)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SideMetrics;
