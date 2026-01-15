import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MindshareCellProps {
  ticker: string;
  name: string;
  mindshare: number;
  mindshareChange?: number | null;
  narrative?: string | null;
  trend: 'up' | 'down' | 'neutral';
  tokenStatus?: 'tge' | 'pre-tge';
  sparkline?: number[];
  logoUrl?: string | null;
  size: 'large' | 'medium' | 'small' | 'tiny';
  rank?: number;
  onClick?: () => void;
}

// Narrative color mapping - Kaito style
const narrativeColors: Record<string, { bg: string; text: string; border: string }> = {
  'AI': { bg: 'bg-violet-500/15', text: 'text-violet-300', border: 'border-violet-400/30' },
  'L2': { bg: 'bg-blue-500/15', text: 'text-blue-300', border: 'border-blue-400/30' },
  'DePIN': { bg: 'bg-orange-500/15', text: 'text-orange-300', border: 'border-orange-400/30' },
  'Meme': { bg: 'bg-pink-500/15', text: 'text-pink-300', border: 'border-pink-400/30' },
  'DeFi': { bg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-400/30' },
  'Gaming': { bg: 'bg-yellow-500/15', text: 'text-yellow-300', border: 'border-yellow-400/30' },
  'Infra': { bg: 'bg-cyan-500/15', text: 'text-cyan-300', border: 'border-cyan-400/30' },
  'RWA': { bg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-400/30' },
  'NFT': { bg: 'bg-fuchsia-500/15', text: 'text-fuchsia-300', border: 'border-fuchsia-400/30' },
  'CEX': { bg: 'bg-sky-500/15', text: 'text-sky-300', border: 'border-sky-400/30' },
};

const MindshareCell = ({
  ticker,
  name,
  mindshare,
  mindshareChange,
  narrative,
  trend,
  tokenStatus = 'tge',
  sparkline = [],
  logoUrl,
  size,
  rank,
  onClick,
}: MindshareCellProps) => {
  // Generate sparkline path - positioned to fill more of the cell
  const sparklinePath = useMemo(() => {
    if (!sparkline || sparkline.length < 2) return '';
    
    const min = Math.min(...sparkline);
    const max = Math.max(...sparkline);
    const range = max - min || 1;
    
    // Expand the Y range to use 70% of the cell height (from 15% to 85%)
    const points = sparkline.map((value, index) => {
      const x = (index / (sparkline.length - 1)) * 100;
      const y = 85 - ((value - min) / range) * 70; // More vertical range
      return `${x},${y}`;
    }).join(' ');
    
    return `M ${points.split(' ').join(' L ')}`;
  }, [sparkline]);

  // Ium Labs Premium color system - only up/down, neutral uses default
  const trendColors = {
    up: {
      cellBg: 'linear-gradient(145deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 78, 59, 0.25) 50%, rgba(2, 44, 34, 0.4) 100%)',
      glowColor: 'rgba(52, 211, 153, 0.12)',
      borderColor: 'rgba(52, 211, 153, 0.25)',
      sparkline: 'rgba(52, 211, 153, 0.6)',
      sparklineFill: 'rgba(52, 211, 153, 0.08)',
      accentText: 'text-emerald-400',
      percentBg: 'bg-emerald-500/10',
    },
    down: {
      cellBg: 'linear-gradient(145deg, rgba(239, 68, 68, 0.15) 0%, rgba(127, 29, 29, 0.25) 50%, rgba(69, 10, 10, 0.4) 100%)',
      glowColor: 'rgba(248, 113, 113, 0.12)',
      borderColor: 'rgba(248, 113, 113, 0.25)',
      sparkline: 'rgba(248, 113, 113, 0.6)',
      sparklineFill: 'rgba(248, 113, 113, 0.08)',
      accentText: 'text-rose-400',
      percentBg: 'bg-rose-500/10',
    },
  };

  // Default style when no trend data or neutral
  // Default style - green (same as 'up' trend)
  const defaultColors = {
    cellBg: 'linear-gradient(145deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 78, 59, 0.25) 50%, rgba(2, 44, 34, 0.4) 100%)',
    glowColor: 'rgba(52, 211, 153, 0.12)',
    borderColor: 'rgba(52, 211, 153, 0.25)',
    sparkline: 'rgba(52, 211, 153, 0.6)',
    sparklineFill: 'rgba(52, 211, 153, 0.08)',
    accentText: 'text-emerald-400',
    percentBg: 'bg-emerald-500/10',
  };

  const colors = trend === 'up' || trend === 'down' ? trendColors[trend] : defaultColors;
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null;
  const isPreTge = tokenStatus === 'pre-tge';

  // Crown colors for top 3 with glow effects
  const crownStyles: Record<number, { color: string; glow: string }> = {
    1: { color: '#FFD700', glow: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))' },
    2: { color: '#E5E4E2', glow: 'drop-shadow(0 0 6px rgba(229, 228, 226, 0.5))' },
    3: { color: '#CD7F32', glow: 'drop-shadow(0 0 6px rgba(205, 127, 50, 0.5))' }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative w-full h-full overflow-hidden cursor-pointer box-border',
        'rounded-xl transition-all duration-200 ease-out',
        'hover:scale-[1.015] hover:z-20',
      )}
      style={{ 
        background: colors.cellBg,
        border: `1px solid ${colors.borderColor}`,
        boxShadow: `0 4px 24px -4px ${colors.glowColor}, inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}
    >
      {/* Glass morphism overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(0,0,0,0.1) 100%)',
          backdropFilter: 'blur(1px)',
        }}
      />

      {/* Animated glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${colors.glowColor} 0%, transparent 50%)`,
        }}
      />

      {/* Sparkline Background - Refined style */}
      {sparkline.length >= 2 && (
        <svg 
          className="absolute inset-0 w-full h-full opacity-70 group-hover:opacity-90 transition-opacity duration-300"
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`sparkGrad-${ticker}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.sparklineFill} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          {/* Fill area under the line */}
          <path
            d={`${sparklinePath} L 100,100 L 0,100 Z`}
            fill={`url(#sparkGrad-${ticker})`}
          />
          {/* Main sparkline stroke */}
          <path
            d={sparklinePath}
            fill="none"
            stroke={colors.sparkline}
            strokeWidth={size === 'large' ? '2' : size === 'medium' ? '1.5' : '1'}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}

      {/* Subtle bottom gradient for depth */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

      {/* Rank badge - Kaito style */}
      {rank && (
        <div className={cn(
          "absolute z-20 flex items-center gap-0.5",
          size === 'large' ? 'top-2 right-2' : size === 'medium' ? 'top-1.5 right-1.5' : 'top-1 right-1'
        )}>
          {/* Rank number */}
          <span className={cn(
            "font-bold text-white/20",
            size === 'large' ? 'text-sm' : size === 'medium' ? 'text-xs' : 'text-[9px]'
          )}>
            #{rank}
          </span>
          {/* Crown for top 3 */}
          {rank <= 3 && (
            <Crown 
              className={cn(
                'transition-transform duration-200 group-hover:scale-110',
                size === 'large' ? 'w-4 h-4' : size === 'medium' ? 'w-3.5 h-3.5' : 'w-3 h-3'
              )}
              style={{ 
                color: crownStyles[rank].color, 
                filter: crownStyles[rank].glow,
              }}
              fill={crownStyles[rank].color}
            />
          )}
        </div>
      )}

      {/* Content - Mobile optimized padding */}
      <div className={cn(
        "relative z-10 flex flex-col justify-between h-full",
        size === 'large' ? 'p-2.5' : size === 'medium' ? 'p-2' : 'p-1.5'
      )}>
        {/* Top section */}
        <div className="flex items-start justify-between gap-1">
          {/* Logo and ticker */}
          <div className="flex items-center gap-1.5">
            {(size === 'large' || size === 'medium') && (
              <div className="relative flex-shrink-0">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={ticker}
                    className={cn(
                      'rounded-full object-cover transition-transform duration-300 group-hover:scale-105',
                      'ring-1 sm:ring-2 ring-white/10 group-hover:ring-white/20',
                      size === 'large' ? 'w-7 h-7 sm:w-10 sm:h-10' : 'w-5 h-5 sm:w-6 sm:h-6'
                    )}
                    style={{
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                {/* Fallback avatar with ticker initial */}
                <div 
                  className={cn(
                    'items-center justify-center rounded-full ring-1 sm:ring-2 ring-white/10',
                    'bg-gradient-to-br from-white/15 to-white/5',
                    size === 'large' ? 'w-7 h-7 sm:w-10 sm:h-10' : 'w-5 h-5 sm:w-6 sm:h-6',
                    logoUrl ? 'hidden' : 'flex'
                  )}
                >
                  <span className={cn(
                    'font-bold text-white/80',
                    size === 'large' ? 'text-xs sm:text-sm' : 'text-[8px] sm:text-[10px]'
                  )}>
                    {ticker.charAt(0)}
                  </span>
                </div>
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className={cn(
                'font-bold text-white tracking-tight truncate',
                'font-[\'Space_Grotesk\',sans-serif]',
                size === 'large' ? 'text-xs sm:text-base' : size === 'medium' ? 'text-[11px] sm:text-sm' : 'text-[9px] sm:text-[11px]'
              )}>
                {ticker}
              </span>
              {size === 'large' && name && (
                <span className="text-[8px] sm:text-[10px] text-white/40 truncate max-w-[60px] sm:max-w-[80px] font-medium">
                  {name}
                </span>
              )}
            </div>
          </div>

          {/* Badges: Narrative + Pre-TGE */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Narrative badge - Kaito style */}
            {narrative && (size === 'large' || size === 'medium') && (
              <span className={cn(
                'px-1 sm:px-1.5 py-0.5 text-[6px] sm:text-[8px] font-semibold rounded',
                'border',
                narrativeColors[narrative]?.bg || 'bg-slate-500/15',
                narrativeColors[narrative]?.text || 'text-slate-300',
                narrativeColors[narrative]?.border || 'border-slate-400/30',
              )}>
                {narrative}
              </span>
            )}
            {/* Pre-TGE badge - refined, smaller on mobile */}
            {isPreTge && size === 'large' && (
              <span className={cn(
                'px-1 sm:px-1.5 py-0.5 text-[7px] sm:text-[9px] font-semibold rounded flex-shrink-0',
                'bg-gradient-to-r from-cyan-500/20 to-teal-500/20',
                'text-cyan-300 border border-cyan-400/30',
                'shadow-[0_0_12px_rgba(34,211,238,0.15)]'
              )}>
                PRE
              </span>
            )}
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex items-end justify-between">
          {/* Mindshare percentage + change */}
          <div className="flex flex-col gap-0.5">
            <div className="flex items-baseline gap-0.5">
              <span className={cn(
                'font-bold tracking-tight text-white',
                'font-[\'Space_Grotesk\',sans-serif]',
                size === 'large' ? 'text-lg sm:text-2xl' : size === 'medium' ? 'text-sm sm:text-lg' : size === 'small' ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-[11px]'
              )}>
                {mindshare.toFixed(size === 'tiny' ? 1 : 2)}
              </span>
              <span className={cn(
                'font-medium text-white/50',
                size === 'large' ? 'text-xs sm:text-sm' : size === 'medium' ? 'text-[10px] sm:text-xs' : 'text-[8px] sm:text-[9px]'
              )}>
                %
              </span>
            </div>
            {/* Mindshare change percentage - Kaito style */}
            {mindshareChange !== undefined && mindshareChange !== null && (size === 'large' || size === 'medium') && (
              <span className={cn(
                'text-[9px] sm:text-[11px] font-medium',
                mindshareChange > 0 ? 'text-emerald-400' : mindshareChange < 0 ? 'text-rose-400' : 'text-white/40'
              )}>
                {mindshareChange > 0 ? '+' : ''}{mindshareChange.toFixed(1)}%
              </span>
            )}
          </div>

          {/* Trend icon with background - only on large and when trend exists */}
          {size === 'large' && TrendIcon && (
            <div className={cn(
              'p-0.5 sm:p-1 rounded transition-colors duration-200',
              colors.percentBg,
              'group-hover:bg-opacity-20'
            )}>
              <TrendIcon className={cn(
                'transition-transform duration-300 group-hover:scale-110',
                'w-3 h-3 sm:w-4 sm:h-4',
                colors.accentText
              )} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MindshareCell;