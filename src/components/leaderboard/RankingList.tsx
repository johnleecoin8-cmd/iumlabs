import { motion } from 'framer-motion';
import { Crown, TrendingUp, TrendingDown } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  slug: string;
  rank: number;
  mindshare_score: number;
  previous_score: number;
  category: string;
  logo_url: string | null;
}

interface RankingListProps {
  projects: Project[];
  activeIndex: number;
  onHover: (index: number) => void;
  onLeave: () => void;
}

const RankingList = ({ projects, activeIndex, onHover, onLeave }: RankingListProps) => {
  const getTrend = (current: number, previous: number) => {
    const change = current - previous;
    return { value: change, isPositive: change >= 0 };
  };

  return (
    <div className="flex flex-col gap-0.5">
      {projects.slice(0, 10).map((project, index) => {
        const trend = getTrend(project.mindshare_score, project.previous_score);
        const isActive = index === activeIndex;
        const isTop3 = index < 3;

        return (
          <motion.div
            key={project.id}
            className={`
              relative flex items-center gap-4 px-4 py-3 cursor-pointer
              transition-all duration-300 group
              ${isActive 
                ? 'bg-white/5 border-l-2 border-primary' 
                : 'border-l-2 border-transparent hover:bg-white/[0.02]'
              }
            `}
            onMouseEnter={() => onHover(index)}
            onMouseLeave={onLeave}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {/* Rank Number */}
            <span className={`
              font-mono text-sm w-6 transition-colors duration-300
              ${isActive ? 'text-primary' : 'text-white/20 group-hover:text-white/40'}
            `}>
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Project Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`
                  font-medium text-sm uppercase tracking-wider truncate
                  transition-colors duration-300
                  ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'}
                `}>
                  {project.name}
                </span>
                {isTop3 && index === 0 && (
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                )}
              </div>
            </div>

            {/* Score & Trend */}
            <div className="flex items-center gap-3">
              <span className={`
                font-bold text-sm tabular-nums
                transition-colors duration-300
                ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/60'}
              `}>
                {project.mindshare_score.toFixed(0)}
              </span>
              
              <div className={`
                flex items-center gap-0.5 text-xs
                ${trend.isPositive ? 'text-emerald-400' : 'text-rose-400'}
              `}>
                {trend.isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span className="tabular-nums">
                  {trend.isPositive ? '+' : ''}{trend.value.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Active Indicator Line */}
            {isActive && (
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-primary"
                layoutId="activeIndicator"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default RankingList;
