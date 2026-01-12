import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Flame, SnowflakeIcon } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  logo_url: string | null;
  mindshare_score: number;
  trend_percent: number;
}

interface GainersLosersListProps {
  gainers: Project[];
  losers: Project[];
  periodLabel: string;
}

const GainersLosersList = ({ gainers, losers, periodLabel }: GainersLosersListProps) => {
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
                <span className="text-xs text-white/40">
                  {Number(project.mindshare_score).toFixed(1)}%
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
          {gainers.length === 0 && (
            <div className="text-center text-white/40 text-sm py-4">
              No gainers in this period
            </div>
          )}
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
                <span className="text-xs text-white/40">
                  {Number(project.mindshare_score).toFixed(1)}%
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
          {losers.length === 0 && (
            <div className="text-center text-white/40 text-sm py-4">
              No losers in this period
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default GainersLosersList;
