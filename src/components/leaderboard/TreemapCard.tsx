import { motion } from 'framer-motion';
import { Crown, ExternalLink } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface TreemapCardProps {
  rank: number;
  name: string;
  logo_url: string | null;
  mindshare_score: number;
  trend_percent: number;
  history: { score: number; recorded_at: string }[];
  website_url: string | null;
  gridSpan: 'xl' | 'lg' | 'md' | 'sm';
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
  
  // Sparkline data
  const sparklineData = history.map((h, i) => ({
    value: Number(h.score),
    index: i
  }));

  // Grid span classes
  const spanClasses = {
    xl: 'col-span-2 row-span-2',
    lg: 'col-span-2 row-span-1',
    md: 'col-span-1 row-span-1',
    sm: 'col-span-1 row-span-1'
  };

  // Size-based styles
  const sizeStyles = {
    xl: {
      logoSize: 'w-16 h-16',
      nameSize: 'text-2xl',
      scoreSize: 'text-4xl',
      trendSize: 'text-lg',
      chartHeight: 60
    },
    lg: {
      logoSize: 'w-12 h-12',
      nameSize: 'text-lg',
      scoreSize: 'text-2xl',
      trendSize: 'text-sm',
      chartHeight: 40
    },
    md: {
      logoSize: 'w-10 h-10',
      nameSize: 'text-base',
      scoreSize: 'text-xl',
      trendSize: 'text-xs',
      chartHeight: 32
    },
    sm: {
      logoSize: 'w-8 h-8',
      nameSize: 'text-sm',
      scoreSize: 'text-lg',
      trendSize: 'text-xs',
      chartHeight: 28
    }
  };

  const styles = sizeStyles[gridSpan];

  // Background gradient based on trend
  const bgGradient = isPositive
    ? 'from-emerald-950/80 via-emerald-900/50 to-emerald-950/80'
    : 'from-red-950/80 via-red-900/50 to-red-950/80';

  const borderColor = isPositive
    ? 'border-emerald-500/30 hover:border-emerald-400/50'
    : 'border-red-500/30 hover:border-red-400/50';

  const chartColor = isPositive ? '#10b981' : '#ef4444';
  const chartFillColor = isPositive ? '#10b981' : '#ef4444';

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
          backdrop-blur-sm p-4 flex flex-col justify-between
          transition-all duration-300 hover:scale-[1.02]
          overflow-hidden
        `}
        onClick={() => website_url && window.open(website_url, '_blank')}
      >
        {/* Rank Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {rank === 1 ? (
            <div className="flex items-center gap-1 bg-amber-500/20 rounded-full px-2 py-1">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 font-bold text-sm">#1</span>
            </div>
          ) : (
            <span className="text-white/40 font-medium text-sm">#{rank}</span>
          )}
        </div>

        {/* External Link */}
        {website_url && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="w-4 h-4 text-white/60" />
          </div>
        )}

        {/* Center Content - Logo & Name */}
        <div className={`flex-1 flex flex-col items-center justify-center ${gridSpan === 'xl' ? 'gap-4' : 'gap-2'} pt-6`}>
          <img
            src={logo_url || `https://api.dicebear.com/7.x/shapes/svg?seed=${name}`}
            alt={name}
            className={`${styles.logoSize} rounded-full object-cover ring-2 ring-white/10`}
          />
          <span className={`${styles.nameSize} font-bold text-white text-center leading-tight`}>
            {name}
          </span>
        </div>

        {/* Bottom - Score & Trend */}
        <div className="space-y-2">
          {/* Sparkline */}
          {sparklineData.length > 1 && (
            <div style={{ height: styles.chartHeight }} className="w-full opacity-60">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <defs>
                    <linearGradient id={`gradient-${rank}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={chartFillColor} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={chartFillColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={chartColor}
                    strokeWidth={1.5}
                    fill={`url(#gradient-${rank})`}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Score & Trend Row */}
          <div className="flex items-end justify-between">
            <div>
              <div className={`${styles.scoreSize} font-bold text-white`}>
                {Number(mindshare_score).toFixed(1)}%
              </div>
            </div>
            <div className={`${styles.trendSize} font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{trend_percent.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TreemapCard;
