import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProject {
  id: string;
  ticker: string;
  name: string;
  mindshare: number;
  mindshare_change?: number | null;
  logo_url?: string | null;
  trend: 'up' | 'down' | 'neutral';
}

interface LeaderboardSidebarProps {
  projects: SidebarProject[];
  className?: string;
}

// Convert percentage to basis points (1% = 100 bps)
const toBps = (percent: number | null | undefined): number => {
  if (percent === null || percent === undefined) return 0;
  return Math.round(percent * 100);
};

const LeaderboardSidebar = ({ projects, className }: LeaderboardSidebarProps) => {
  const [showAbsolute, setShowAbsolute] = useState(true); // bps vs %
  
  // Calculate gainers and losers
  const { gainers, losers } = useMemo(() => {
    const sorted = [...projects]
      .filter(p => p.mindshare_change !== null && p.mindshare_change !== undefined)
      .sort((a, b) => (b.mindshare_change || 0) - (a.mindshare_change || 0));
    
    return {
      gainers: sorted.filter(p => (p.mindshare_change || 0) > 0).slice(0, 5),
      losers: sorted.filter(p => (p.mindshare_change || 0) < 0).slice(-5).reverse(),
    };
  }, [projects]);

  const formatChange = (change: number | null | undefined) => {
    if (change === null || change === undefined) return '-';
    
    if (showAbsolute) {
      const bps = toBps(change);
      return bps > 0 ? `+${bps}` : `${bps}`;
    } else {
      return change > 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`;
    }
  };

  return (
    <div className={cn(
      "flex flex-col h-full bg-[#0a0a0a] border-r border-white/[0.06]",
      className
    )}>
      {/* Header with toggle */}
      <div className="px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-white/50 uppercase tracking-wider">
            Δ7D Changes
          </span>
          <button
            onClick={() => setShowAbsolute(!showAbsolute)}
            className={cn(
              "px-2 py-0.5 text-[10px] font-medium rounded transition-all",
              "bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15]",
              "text-white/50 hover:text-white/70"
            )}
          >
            {showAbsolute ? 'bps' : '%'}
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2">
        {/* Top Gainers Section */}
        <div className="px-3 mb-4">
          <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
            <div className="flex items-center justify-center w-5 h-5 rounded bg-emerald-500/15">
              <ChevronUp className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="text-xs font-semibold text-emerald-400">Top Gainer</span>
          </div>
          
          <div className="space-y-0.5">
            {gainers.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className={cn(
                  "flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all",
                  "hover:bg-emerald-500/[0.08] group"
                )}
              >
                {/* Rank */}
                <span className="text-[10px] font-medium text-white/30 w-3">
                  {index + 1}
                </span>
                
                {/* Logo */}
                <div className="relative flex-shrink-0">
                  {project.logo_url ? (
                    <img
                      src={project.logo_url}
                      alt={project.ticker}
                      className="w-6 h-6 rounded-full ring-1 ring-white/10"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-white/15 to-white/5 ring-1 ring-white/10 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-white/60">{project.ticker.charAt(0)}</span>
                    </div>
                  )}
                </div>
                
                {/* Name + Current Mindshare */}
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-white truncate block group-hover:text-emerald-300 transition-colors">
                    {project.ticker}
                  </span>
                  <span className="text-[10px] text-white/35">
                    {project.mindshare.toFixed(2)}%
                  </span>
                </div>
                
                {/* Change */}
                <div className="flex items-center gap-0.5 text-emerald-400">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-xs font-bold tabular-nums">
                    {formatChange(project.mindshare_change)}
                  </span>
                </div>
              </motion.div>
            ))}
            
            {gainers.length === 0 && (
              <div className="text-center text-white/25 text-[10px] py-3">
                No gainers
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 border-t border-white/[0.04] my-2" />

        {/* Top Losers Section */}
        <div className="px-3">
          <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
            <div className="flex items-center justify-center w-5 h-5 rounded bg-rose-500/15">
              <ChevronDown className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <span className="text-xs font-semibold text-rose-400">Top Loser</span>
          </div>
          
          <div className="space-y-0.5">
            {losers.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.03 }}
                className={cn(
                  "flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all",
                  "hover:bg-rose-500/[0.08] group"
                )}
              >
                {/* Rank */}
                <span className="text-[10px] font-medium text-white/30 w-3">
                  {index + 1}
                </span>
                
                {/* Logo */}
                <div className="relative flex-shrink-0">
                  {project.logo_url ? (
                    <img
                      src={project.logo_url}
                      alt={project.ticker}
                      className="w-6 h-6 rounded-full ring-1 ring-white/10"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-white/15 to-white/5 ring-1 ring-white/10 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-white/60">{project.ticker.charAt(0)}</span>
                    </div>
                  )}
                </div>
                
                {/* Name + Current Mindshare */}
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-white truncate block group-hover:text-rose-300 transition-colors">
                    {project.ticker}
                  </span>
                  <span className="text-[10px] text-white/35">
                    {project.mindshare.toFixed(2)}%
                  </span>
                </div>
                
                {/* Change */}
                <div className="flex items-center gap-0.5 text-rose-400">
                  <TrendingDown className="w-3 h-3" />
                  <span className="text-xs font-bold tabular-nums">
                    {formatChange(project.mindshare_change)}
                  </span>
                </div>
              </motion.div>
            ))}
            
            {losers.length === 0 && (
              <div className="text-center text-white/25 text-[10px] py-3">
                No losers
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-white/[0.04]">
        <p className="text-[9px] text-white/20 text-center">
          1% = 100 bps
        </p>
      </div>
    </div>
  );
};

export default LeaderboardSidebar;
