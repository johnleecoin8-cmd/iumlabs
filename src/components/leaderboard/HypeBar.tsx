import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface HypeBarProps {
  rank: number;
  name: string;
  logo_url: string | null;
  mindshare_score: number;
  trend_percent: number;
  history: { score: number; recorded_at: string }[];
  website_url: string | null;
  delay?: number;
}

const HypeBar = ({
  rank,
  name,
  logo_url,
  mindshare_score,
  trend_percent,
  history,
  website_url,
  delay = 0
}: HypeBarProps) => {
  const isPositive = trend_percent >= 0;
  const isKing = rank === 1;
  const isTop3 = rank <= 3;
  
  // Sparkline data for vertical chart
  const sparklineData = history.map((h, i) => ({
    value: Number(h.score),
    index: i
  }));

  // Height based on rank - The Hierarchy
  const getBarHeight = () => {
    if (rank === 1) return 380; // The King
    if (rank <= 3) return 300;  // Princes
    if (rank <= 6) return 220;  // Lords
    if (rank <= 10) return 160; // Knights
    return 120;                  // Others
  };

  // Width based on rank
  const getBarWidth = () => {
    if (rank === 1) return 90;
    if (rank <= 3) return 70;
    if (rank <= 6) return 56;
    return 48;
  };

  const barHeight = getBarHeight();
  const barWidth = getBarWidth();

  // Gradient colors based on trend
  const gradientId = `bar-gradient-${rank}`;
  const glowColor = isPositive ? 'rgba(0, 224, 255, 0.4)' : 'rgba(255, 100, 130, 0.4)';
  const primaryColor = isPositive ? '#00E0FF' : '#FF6B9D';
  const secondaryColor = isPositive ? '#10b981' : '#f43f5e';
  const darkColor = isPositive ? '#064e3b' : '#4c0519';

  // Logo size based on rank
  const logoSize = isKing ? 56 : isTop3 ? 44 : rank <= 6 ? 36 : 28;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      className="flex flex-col items-center cursor-pointer group"
      onClick={() => website_url && window.open(website_url, '_blank')}
    >
      {/* Crown for #1 */}
      {isKing && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.3, duration: 0.4 }}
          className="mb-2"
        >
          <Crown className="w-8 h-8 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
        </motion.div>
      )}

      {/* Floating Logo */}
      <motion.div
        whileHover={{ scale: 1.1, y: -5 }}
        className="relative mb-3 z-10"
        style={{
          filter: `drop-shadow(0 0 ${isTop3 ? '15px' : '8px'} ${glowColor})`
        }}
      >
        <img
          src={logo_url || `https://api.dicebear.com/7.x/shapes/svg?seed=${name}`}
          alt={name}
          className={`rounded-full object-cover ring-2 ${isPositive ? 'ring-[#00E0FF]' : 'ring-rose-400'}`}
          style={{
            width: logoSize,
            height: logoSize,
          }}
        />
        {isTop3 && rank !== 1 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-[10px] font-bold text-black">
            {rank}
          </div>
        )}
      </motion.div>

      {/* The Hype Bar (The Pillar) */}
      <div 
        className="relative rounded-t-full rounded-b-lg overflow-hidden group-hover:scale-105 transition-transform duration-300"
        style={{
          width: barWidth,
          height: barHeight,
          boxShadow: `0 0 ${isKing ? '30px' : isTop3 ? '20px' : '12px'} ${glowColor}, inset 0 0 20px rgba(0,0,0,0.5)`,
        }}
      >
        {/* SVG Gradient Background */}
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="1" />
              <stop offset="30%" stopColor={secondaryColor} stopOpacity="0.8" />
              <stop offset="100%" stopColor={darkColor} stopOpacity="0.9" />
            </linearGradient>
            
            {/* Glow filter */}
            <filter id={`glow-${rank}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect 
            width="100%" 
            height="100%" 
            fill={`url(#${gradientId})`}
            rx="8"
          />
        </svg>

        {/* Vertical Sparkline inside the bar */}
        {sparklineData.length > 1 && (
          <div className="absolute inset-0 opacity-40 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart 
                data={sparklineData} 
                layout="vertical"
                margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
              >
                <defs>
                  <linearGradient id={`sparkline-${rank}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={primaryColor} stopOpacity={0.1} />
                    <stop offset="100%" stopColor={primaryColor} stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={primaryColor}
                  strokeWidth={1.5}
                  fill={`url(#sparkline-${rank})`}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Animated glow pulse for top 3 */}
        {isTop3 && (
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-t-full rounded-b-lg"
            style={{
              background: `linear-gradient(to top, transparent, ${primaryColor}20)`,
            }}
          />
        )}

        {/* Energy lines effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 8px,
              ${primaryColor}10 8px,
              ${primaryColor}10 9px
            )`
          }}
        />
      </div>

      {/* Bottom Data */}
      <div className="mt-4 text-center">
        <div className={`font-bold text-white/90 ${isKing ? 'text-lg' : isTop3 ? 'text-base' : 'text-sm'}`}>
          ${name}
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.4 }}
          className={`font-black ${isKing ? 'text-4xl' : isTop3 ? 'text-2xl' : 'text-xl'} mt-1`}
          style={{ color: primaryColor }}
        >
          {Number(mindshare_score).toFixed(1)}%
        </motion.div>
        <div className={`text-xs mt-1 font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(trend_percent).toFixed(1)}%
        </div>
      </div>
    </motion.div>
  );
};

export default HypeBar;
