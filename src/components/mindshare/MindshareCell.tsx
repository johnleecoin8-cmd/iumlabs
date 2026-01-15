import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

// Convert percentage to basis points (1% = 100 bps)
const toBps = (percent: number | null | undefined): string => {
  if (percent === null || percent === undefined) return '-';
  const bps = Math.round(percent * 100);
  return bps > 0 ? `+${bps}` : `${bps}`;
};

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
  isTrending?: boolean;
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
  isTrending = false,
}: MindshareCellProps) => {
  // Generate sparkline path - Kaito style: full cell coverage
  const sparklinePath = useMemo(() => {
    if (!sparkline || sparkline.length < 2) return '';
    
    const min = Math.min(...sparkline);
    const max = Math.max(...sparkline);
    const range = max - min || 1;
    
    // Kaito style: use 80% of cell height (from 10% to 90%) for maximum visibility
    const points = sparkline.map((value, index) => {
      const x = (index / (sparkline.length - 1)) * 100;
      const y = 90 - ((value - min) / range) * 80;
      return `${x},${y}`;
    }).join(' ');
    
    return `M ${points.split(' ').join(' L ')}`;
  }, [sparkline]);

  // Kaito-inspired color system with enhanced sparkline visibility
  const trendColors = {
    up: {
      cellBg: 'linear-gradient(160deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 95, 70, 0.22) 40%, rgba(4, 47, 46, 0.35) 100%)',
      glowColor: 'rgba(52, 211, 153, 0.15)',
      borderColor: 'rgba(52, 211, 153, 0.3)',
      sparkline: 'rgba(52, 211, 153, 0.85)',
      sparklineGlow: 'rgba(52, 211, 153, 0.4)',
      sparklineFillTop: 'rgba(52, 211, 153, 0.25)',
      sparklineFillBottom: 'rgba(52, 211, 153, 0.02)',
      accentText: 'text-emerald-400',
      percentBg: 'bg-emerald-500/10',
    },
    down: {
      cellBg: 'linear-gradient(160deg, rgba(239, 68, 68, 0.12) 0%, rgba(153, 27, 27, 0.22) 40%, rgba(69, 10, 10, 0.35) 100%)',
      glowColor: 'rgba(248, 113, 113, 0.15)',
      borderColor: 'rgba(248, 113, 113, 0.3)',
      sparkline: 'rgba(248, 113, 113, 0.85)',
      sparklineGlow: 'rgba(248, 113, 113, 0.4)',
      sparklineFillTop: 'rgba(248, 113, 113, 0.25)',
      sparklineFillBottom: 'rgba(248, 113, 113, 0.02)',
      accentText: 'text-rose-400',
      percentBg: 'bg-rose-500/10',
    },
  };

  // Neutral style - subtle but visible
  const neutralColors = {
    cellBg: 'linear-gradient(160deg, rgba(100, 116, 139, 0.1) 0%, rgba(51, 65, 85, 0.18) 40%, rgba(30, 41, 59, 0.3) 100%)',
    glowColor: 'rgba(148, 163, 184, 0.1)',
    borderColor: 'rgba(148, 163, 184, 0.2)',
    sparkline: 'rgba(148, 163, 184, 0.7)',
    sparklineGlow: 'rgba(148, 163, 184, 0.25)',
    sparklineFillTop: 'rgba(148, 163, 184, 0.15)',
    sparklineFillBottom: 'rgba(148, 163, 184, 0.01)',
    accentText: 'text-slate-400',
    percentBg: 'bg-slate-500/10',
  };

  const colors = trend === 'up' ? trendColors.up : trend === 'down' ? trendColors.down : neutralColors;
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null;
  const isPreTge = tokenStatus === 'pre-tge';


  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative w-full h-full overflow-hidden cursor-pointer box-border',
        'rounded-xl transition-all duration-200 ease-out',
        'hover:scale-[1.015] hover:z-20',
        // Trending pulse animation
        isTrending && 'ring-2 ring-amber-400/40 animate-pulse',
      )}
      style={{ 
        background: isTrending 
          ? 'linear-gradient(160deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.1) 30%, ' + colors.cellBg.replace('linear-gradient(160deg, ', '')
          : colors.cellBg,
        border: isTrending ? '1px solid rgba(251, 191, 36, 0.5)' : `1px solid ${colors.borderColor}`,
        boxShadow: isTrending 
          ? `0 4px 32px -4px rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)`
          : `0 4px 24px -4px ${colors.glowColor}, inset 0 1px 0 rgba(255,255,255,0.05)`,
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

      {/* Sparkline Background - Kaito style: prominent and full coverage */}
      {sparkline.length >= 2 && (
        <svg 
          className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <defs>
            {/* Enhanced gradient fill */}
            <linearGradient id={`sparkGrad-${ticker}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.sparklineFillTop} />
              <stop offset="60%" stopColor={colors.sparklineFillBottom} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            {/* Glow filter for line */}
            <filter id={`sparkGlow-${ticker}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Fill area under the line - more prominent */}
          <path
            d={`${sparklinePath} L 100,100 L 0,100 Z`}
            fill={`url(#sparkGrad-${ticker})`}
          />
          {/* Glow line behind main line */}
          <path
            d={sparklinePath}
            fill="none"
            stroke={colors.sparklineGlow}
            strokeWidth={size === 'large' ? '6' : size === 'medium' ? '4' : '3'}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Main sparkline stroke - thicker and more visible */}
          <path
            d={sparklinePath}
            fill="none"
            stroke={colors.sparkline}
            strokeWidth={size === 'large' ? '2.5' : size === 'medium' ? '2' : '1.5'}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            filter={size === 'large' ? `url(#sparkGlow-${ticker})` : undefined}
          />
        </svg>
      )}

      {/* Subtle bottom gradient for depth */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />


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
            <span className={cn(
              'font-bold text-white tracking-tight truncate',
              'font-[\'Space_Grotesk\',sans-serif]',
              size === 'large' ? 'text-xs sm:text-base' : size === 'medium' ? 'text-[11px] sm:text-sm' : 'text-[9px] sm:text-[11px]'
            )}>
              {ticker}
            </span>
          </div>

          {/* Badges: Trending + Narrative + Pre-TGE */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Trending badge - 🔥 */}
            {isTrending && (size === 'large' || size === 'medium') && (
              <span className={cn(
                'px-1 sm:px-1.5 py-0.5 text-[6px] sm:text-[8px] font-semibold rounded',
                'bg-gradient-to-r from-amber-500/25 to-orange-500/25',
                'text-amber-300 border border-amber-400/40',
                'flex items-center gap-0.5',
                'shadow-[0_0_12px_rgba(251,191,36,0.2)]'
              )}>
                <Flame className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                <span className="hidden sm:inline">HOT</span>
              </span>
            )}
            {/* Narrative badge - Kaito style */}
            {narrative && (size === 'large' || size === 'medium') && !isTrending && (
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
            {/* Mindshare change in bps - Kaito style */}
            {mindshareChange !== undefined && mindshareChange !== null && (size === 'large' || size === 'medium') && (
              <span className={cn(
                'text-[9px] sm:text-[11px] font-bold tabular-nums',
                mindshareChange > 0 ? 'text-emerald-400' : mindshareChange < 0 ? 'text-rose-400' : 'text-white/40'
              )}>
                {toBps(mindshareChange)} <span className="text-[7px] sm:text-[9px] font-normal opacity-60">bps</span>
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