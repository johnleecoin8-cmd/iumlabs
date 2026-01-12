import { motion } from 'framer-motion';
import { Crown, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface TreemapCardProps {
  rank: number;
  name: string;
  logo_url: string | null;
  mindshare_score: number;
  trend_percent: number;
  history: { score: number; recorded_at: string }[];
  website_url: string | null;
  gridSpan: 'king' | 'tall' | 'standard' | 'compact';
  delay?: number;
}

const TreemapCard = ({
  rank,
  name,
  logo_url,
  mindshare_score,
  trend_percent,
  history,
  website_url,
  gridSpan,
  delay = 0
}: TreemapCardProps) => {
  const isPositive = trend_percent >= 0;
  const isTop3 = rank <= 3;
  
  // Sparkline data
  const sparklineData = history.map((h, i) => ({
    value: Number(h.score),
    index: i
  }));

  // Grid span classes - Bento style
  const spanClasses = {
    king: 'col-span-2 row-span-2',      // 1위: 2x2 (가장 큼)
    tall: 'col-span-1 row-span-2',      // 2-3위: 1x2 (세로로 긴 형태)
    standard: 'col-span-1 row-span-1',  // 4-10위: 1x1
    compact: 'col-span-1 row-span-1'    // 11위+: 1x1 (작은)
  };

  // Size-based styles - Kaito style
  const sizeStyles = {
    king: {
      logoSize: 'w-20 h-20',
      nameSize: 'text-2xl',
      scoreSize: 'text-5xl',
      trendSize: 'text-lg',
      chartHeight: 80,
      padding: 'p-5'
    },
    tall: {
      logoSize: 'w-14 h-14',
      nameSize: 'text-lg',
      scoreSize: 'text-3xl',
      trendSize: 'text-sm',
      chartHeight: 60,
      padding: 'p-4'
    },
    standard: {
      logoSize: 'w-10 h-10',
      nameSize: 'text-sm',
      scoreSize: 'text-xl',
      trendSize: 'text-xs',
      chartHeight: 40,
      padding: 'p-3'
    },
    compact: {
      logoSize: 'w-8 h-8',
      nameSize: 'text-xs',
      scoreSize: 'text-lg',
      trendSize: 'text-[10px]',
      chartHeight: 32,
      padding: 'p-2.5'
    }
  };

  const styles = sizeStyles[gridSpan];

  // Enhanced background gradient based on trend - Kaito style
  const bgGradient = isPositive
    ? 'from-emerald-900/95 via-emerald-800/70 to-emerald-950'
    : 'from-rose-900/95 via-rose-800/70 to-rose-950';

  const borderColor = isPositive
    ? 'border-emerald-500/40 hover:border-emerald-400/60'
    : 'border-rose-500/40 hover:border-rose-400/60';

  const glowColor = isPositive
    ? 'hover:shadow-emerald-500/20'
    : 'hover:shadow-rose-500/20';

  const chartColor = isPositive ? '#34d399' : '#fb7185';
  const chartFillColor = isPositive ? '#10b981' : '#f43f5e';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className={`${spanClasses[gridSpan]} relative group cursor-pointer`}
    >
      <div
        className={`
          h-full w-full rounded-xl border ${borderColor}
          bg-gradient-to-br ${bgGradient}
          ${styles.padding} flex flex-col
          transition-all duration-300 hover:scale-[1.02]
          overflow-hidden relative
          shadow-lg ${glowColor} hover:shadow-xl
        `}
        onClick={() => website_url && window.open(website_url, '_blank')}
      >
        {/* Sparkline Background Layer */}
        {sparklineData.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 opacity-50" style={{ height: `${styles.chartHeight + 20}px` }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={`gradient-${rank}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartFillColor} stopOpacity={0.6} />
                    <stop offset="100%" stopColor={chartFillColor} stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  strokeWidth={2}
                  fill={`url(#gradient-${rank})`}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Content Layer (above chart) */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Top Row - Rank Badge */}
          <div className="flex items-center justify-between">
            {isTop3 ? (
              <div className="flex items-center gap-1 bg-amber-500/25 rounded-full px-2 py-1 backdrop-blur-sm">
                <Crown className={`${gridSpan === 'king' ? 'w-5 h-5' : 'w-4 h-4'} text-amber-400`} />
                <span className={`text-amber-400 font-bold ${gridSpan === 'king' ? 'text-base' : 'text-sm'}`}>#{rank}</span>
              </div>
            ) : (
              <span className="text-white/50 font-semibold text-sm bg-white/5 px-2 py-0.5 rounded-full">#{rank}</span>
            )}

            {/* External Link */}
            {website_url && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-4 h-4 text-white/60" />
              </div>
            )}
          </div>

          {/* Center Content - Logo & Name */}
          <div className={`flex-1 flex flex-col items-center justify-center ${gridSpan === 'king' || gridSpan === 'tall' ? 'gap-3' : 'gap-1.5'}`}>
            <div className="relative">
              <img
                src={logo_url || `https://api.dicebear.com/7.x/shapes/svg?seed=${name}`}
                alt={name}
                className={`${styles.logoSize} rounded-full object-cover ring-2 ${isPositive ? 'ring-emerald-400/30' : 'ring-rose-400/30'}`}
              />
              {isTop3 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                  <Crown className="w-3 h-3 text-black" />
                </div>
              )}
            </div>
            <span className={`${styles.nameSize} font-bold text-white text-center leading-tight drop-shadow-lg`}>
              ${name}
            </span>
          </div>

          {/* Bottom Row - Score & Trend */}
          <div className="flex items-end justify-between mt-auto">
            <div className={`${styles.scoreSize} font-black text-white drop-shadow-lg`}>
              {Number(mindshare_score).toFixed(1)}%
            </div>
            <div className={`flex items-center gap-1 ${styles.trendSize} font-bold ${isPositive ? 'text-emerald-300' : 'text-rose-300'} bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm`}>
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {isPositive ? '+' : ''}{trend_percent.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TreemapCard;
