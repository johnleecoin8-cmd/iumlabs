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
  // Price data - optional
  price?: number | null;
  change24h?: number | null;
  topSource?: string | null;
}

// Narrative color mapping - Ium Labs style with teal accents
const narrativeColors: Record<string, { bg: string; text: string; border: string }> = {
  'AI': { bg: 'bg-violet-500/15', text: 'text-violet-300', border: 'border-violet-400/30' },
  'L2': { bg: 'bg-blue-500/15', text: 'text-blue-300', border: 'border-blue-400/30' },
  'DePIN': { bg: 'bg-orange-500/15', text: 'text-orange-300', border: 'border-orange-400/30' },
  'Meme': { bg: 'bg-pink-500/15', text: 'text-pink-300', border: 'border-pink-400/30' },
  'DeFi': { bg: 'bg-teal-500/15', text: 'text-teal-300', border: 'border-teal-400/30' },
  'Gaming': { bg: 'bg-yellow-500/15', text: 'text-yellow-300', border: 'border-yellow-400/30' },
  'Infra': { bg: 'bg-cyan-500/15', text: 'text-cyan-300', border: 'border-cyan-400/30' },
  'RWA': { bg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-400/30' },
  'NFT': { bg: 'bg-fuchsia-500/15', text: 'text-fuchsia-300', border: 'border-fuchsia-400/30' },
  'CEX': { bg: 'bg-sky-500/15', text: 'text-sky-300', border: 'border-sky-400/30' },
};

// Format price for display
const formatPrice = (price: number): string => {
  if (price >= 1000) return `${(price / 1000).toFixed(1)}K`;
  if (price >= 1) return price.toFixed(2);
  if (price >= 0.01) return price.toFixed(3);
  if (price >= 0.0001) return price.toFixed(5);
  return price.toExponential(2);
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
  price,
  change24h,
  topSource,
}: MindshareCellProps) => {
  // Generate sparkline path
  const sparklinePath = useMemo(() => {
    if (!sparkline || sparkline.length < 2) return '';
    
    const min = Math.min(...sparkline);
    const max = Math.max(...sparkline);
    const range = max - min || 1;
    
    const points = sparkline.map((value, index) => {
      const x = (index / (sparkline.length - 1)) * 100;
      const y = 90 - ((value - min) / range) * 80;
      return `${x},${y}`;
    }).join(' ');
    
    return `M ${points.split(' ').join(' L ')}`;
  }, [sparkline]);

  // Ium Labs color system - teal-focused for up trend
  const trendColors = {
    up: {
      cellBg: 'linear-gradient(160deg, rgba(20, 184, 166, 0.12) 0%, rgba(13, 148, 136, 0.22) 40%, rgba(6, 78, 59, 0.35) 100%)',
      glowColor: 'rgba(45, 212, 191, 0.15)',
      borderColor: 'rgba(45, 212, 191, 0.25)',
      sparkline: 'rgba(45, 212, 191, 0.85)',
      sparklineGlow: 'rgba(45, 212, 191, 0.4)',
      sparklineFillTop: 'rgba(45, 212, 191, 0.25)',
      sparklineFillBottom: 'rgba(45, 212, 191, 0.02)',
      accentText: 'text-teal-400',
      percentBg: 'bg-teal-500/10',
    },
    down: {
      cellBg: 'linear-gradient(160deg, rgba(239, 68, 68, 0.10) 0%, rgba(153, 27, 27, 0.18) 40%, rgba(69, 10, 10, 0.30) 100%)',
      glowColor: 'rgba(248, 113, 113, 0.12)',
      borderColor: 'rgba(248, 113, 113, 0.25)',
      sparkline: 'rgba(248, 113, 113, 0.8)',
      sparklineGlow: 'rgba(248, 113, 113, 0.35)',
      sparklineFillTop: 'rgba(248, 113, 113, 0.20)',
      sparklineFillBottom: 'rgba(248, 113, 113, 0.02)',
      accentText: 'text-rose-400',
      percentBg: 'bg-rose-500/10',
    },
  };

  // Neutral style - subtle
  const neutralColors = {
    cellBg: 'linear-gradient(160deg, rgba(100, 116, 139, 0.08) 0%, rgba(51, 65, 85, 0.15) 40%, rgba(30, 41, 59, 0.25) 100%)',
    glowColor: 'rgba(148, 163, 184, 0.08)',
    borderColor: 'rgba(148, 163, 184, 0.15)',
    sparkline: 'rgba(148, 163, 184, 0.65)',
    sparklineGlow: 'rgba(148, 163, 184, 0.2)',
    sparklineFillTop: 'rgba(148, 163, 184, 0.12)',
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
        'rounded-lg sm:rounded-xl transition-all duration-200 ease-out',
        'hover:scale-[1.015] hover:z-20',
        // Ium Labs teal-based trending style
        isTrending && 'ring-1 sm:ring-2 ring-teal-400/50',
      )}
      style={{ 
        background: isTrending 
          ? 'linear-gradient(160deg, rgba(20, 184, 166, 0.18) 0%, rgba(13, 148, 136, 0.12) 30%, ' + colors.cellBg.replace('linear-gradient(160deg, ', '')
          : colors.cellBg,
        border: isTrending ? '1px solid rgba(45, 212, 191, 0.4)' : `1px solid ${colors.borderColor}`,
        boxShadow: isTrending 
          ? `0 4px 24px -4px rgba(20, 184, 166, 0.25), inset 0 1px 0 rgba(255,255,255,0.08)`
          : `0 4px 20px -4px ${colors.glowColor}, inset 0 1px 0 rgba(255,255,255,0.04)`,
      }}
    >
      {/* Glass morphism overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-50 group-hover:opacity-70 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%, rgba(0,0,0,0.08) 100%)',
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

      {/* Sparkline Background */}
      {sparkline.length >= 2 && (
        <svg 
          className="absolute inset-0 w-full h-full opacity-85 group-hover:opacity-100 transition-opacity duration-300"
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`sparkGrad-${ticker}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.sparklineFillTop} />
              <stop offset="60%" stopColor={colors.sparklineFillBottom} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <filter id={`sparkGlow-${ticker}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Fill area */}
          <path
            d={`${sparklinePath} L 100,100 L 0,100 Z`}
            fill={`url(#sparkGrad-${ticker})`}
          />
          {/* Glow line */}
          <path
            d={sparklinePath}
            fill="none"
            stroke={colors.sparklineGlow}
            strokeWidth={size === 'large' ? '5' : size === 'medium' ? '3.5' : '2.5'}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Main sparkline */}
          <path
            d={sparklinePath}
            fill="none"
            stroke={colors.sparkline}
            strokeWidth={size === 'large' ? '2' : size === 'medium' ? '1.5' : '1'}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            filter={size === 'large' ? `url(#sparkGlow-${ticker})` : undefined}
          />
        </svg>
      )}

      {/* Bottom gradient for depth */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />

      {/* Content - optimized for mobile */}
      <div className={cn(
        "relative z-10 flex flex-col justify-between h-full",
        size === 'large' ? 'p-2 sm:p-3' : size === 'medium' ? 'p-1.5 sm:p-2' : 'p-1 sm:p-1.5'
      )}>
        {/* Top section */}
        <div className="flex items-start justify-between gap-0.5 sm:gap-1">
          {/* Logo and ticker */}
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 flex-1">
            {(size === 'large' || size === 'medium') && (
              <div className="relative flex-shrink-0">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={ticker}
                    className={cn(
                      'rounded-full object-cover transition-transform duration-300 group-hover:scale-105',
                      'ring-1 ring-white/10 group-hover:ring-teal-400/30',
                      size === 'large' ? 'w-6 h-6 sm:w-9 sm:h-9' : 'w-4 h-4 sm:w-6 sm:h-6'
                    )}
                    style={{
                      boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                {/* Fallback avatar */}
                <div 
                  className={cn(
                    'items-center justify-center rounded-full ring-1 ring-white/10',
                    'bg-gradient-to-br from-teal-500/20 to-teal-600/10',
                    size === 'large' ? 'w-6 h-6 sm:w-9 sm:h-9' : 'w-4 h-4 sm:w-6 sm:h-6',
                    logoUrl ? 'hidden' : 'flex'
                  )}
                >
                  <span className={cn(
                    'font-bold text-teal-300/80',
                    size === 'large' ? 'text-[10px] sm:text-sm' : 'text-[7px] sm:text-[9px]'
                  )}>
                    {ticker.charAt(0)}
                  </span>
                </div>
              </div>
            )}
            {/* Ticker - truncate on mobile */}
            <span className={cn(
              'font-bold text-white tracking-tight truncate',
              'font-[\'Space_Grotesk\',sans-serif]',
              'max-w-[50px] sm:max-w-none',
              size === 'large' ? 'text-[10px] sm:text-sm' : size === 'medium' ? 'text-[9px] sm:text-xs' : 'text-[8px] sm:text-[10px]'
            )}>
              {ticker}
            </span>
          </div>

          {/* Badges - optimized for mobile */}
          <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0 overflow-hidden">
            {/* Trending badge - Ium Labs teal style */}
            {isTrending && (size === 'large' || size === 'medium') && (
              <span className={cn(
                'px-1 py-0.5 text-[6px] sm:text-[8px] font-semibold rounded',
                'bg-gradient-to-r from-teal-500/25 to-emerald-500/25',
                'text-teal-300 border border-teal-400/40',
                'flex items-center gap-0.5',
                'shadow-[0_0_10px_rgba(20,184,166,0.2)]'
              )}>
                <Flame className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                <span className="hidden sm:inline">HOT</span>
              </span>
            )}
            {/* Narrative badge */}
            {narrative && (size === 'large' || size === 'medium') && !isTrending && (
              <span className={cn(
                'px-1 py-0.5 text-[6px] sm:text-[7px] font-semibold rounded truncate max-w-[40px] sm:max-w-none',
                'border',
                narrativeColors[narrative]?.bg || 'bg-slate-500/15',
                narrativeColors[narrative]?.text || 'text-slate-300',
                narrativeColors[narrative]?.border || 'border-slate-400/30',
              )}>
                {narrative}
              </span>
            )}
            {/* Pre-TGE badge */}
            {isPreTge && size === 'large' && (
              <span className={cn(
                'px-1 py-0.5 text-[6px] sm:text-[8px] font-semibold rounded flex-shrink-0',
                'bg-gradient-to-r from-cyan-500/20 to-teal-500/20',
                'text-cyan-300 border border-cyan-400/30',
              )}>
                PRE
              </span>
            )}
          </div>
        </div>

        {/* Bottom section - Mindshare focused */}
        <div className="flex items-end justify-between">
          {/* Mindshare percentage + change + price */}
          <div className="flex flex-col gap-0">
            <div className="flex items-baseline gap-0.5">
              {/* Mindshare percentage - MOST PROMINENT */}
              <span className={cn(
                'font-extrabold tracking-tighter text-white',
                'font-[\'Space_Grotesk\',sans-serif]',
                size === 'large' ? 'text-lg sm:text-2xl' : size === 'medium' ? 'text-sm sm:text-lg' : size === 'small' ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-xs'
              )}>
                {mindshare.toFixed(size === 'tiny' ? 1 : 2)}
              </span>
              <span className={cn(
                'font-medium text-white/35',
                size === 'large' ? 'text-xs sm:text-sm' : size === 'medium' ? 'text-[10px] sm:text-xs' : 'text-[8px] sm:text-[9px]'
              )}>
                %
              </span>
            </div>
            
            {/* Price display OR bps emphasis based on price availability */}
            {size === 'large' && (
              <>
                {/* Case 1: Price exists - show price + 24h change */}
                {price && price > 0 ? (
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[8px] sm:text-[10px] font-medium text-white/50">
                      ${formatPrice(price)}
                    </span>
                    {change24h !== null && change24h !== undefined && (
                      <span className={cn(
                        'text-[7px] sm:text-[9px] font-medium',
                        change24h > 0 ? 'text-teal-400/70' : change24h < 0 ? 'text-rose-400/70' : 'text-white/30'
                      )}>
                        {change24h > 0 ? '+' : ''}{change24h.toFixed(1)}%
                      </span>
                    )}
                  </div>
                ) : (
                  /* Case 2: No price - emphasize bps change */
                  mindshareChange !== undefined && mindshareChange !== null && (
                    <div className={cn(
                      'flex items-center gap-1 mt-0.5 px-1 py-0.5 rounded',
                      mindshareChange > 0 ? 'bg-teal-500/15' : mindshareChange < 0 ? 'bg-rose-500/15' : 'bg-white/5'
                    )}>
                      <span className={cn(
                        'text-[8px] sm:text-[10px] font-semibold tabular-nums',
                        mindshareChange > 0 ? 'text-teal-400' : mindshareChange < 0 ? 'text-rose-400' : 'text-white/40'
                      )}>
                        {toBps(mindshareChange)} bps
                      </span>
                    </div>
                  )
                )}
                
                {/* Show bps under price if price exists */}
                {price && price > 0 && mindshareChange !== undefined && mindshareChange !== null && (
                  <span className={cn(
                    'text-[6px] sm:text-[8px] font-medium tabular-nums mt-0.5',
                    mindshareChange > 0 ? 'text-teal-400/50' : mindshareChange < 0 ? 'text-rose-400/50' : 'text-white/20'
                  )}>
                    {toBps(mindshareChange)} bps
                  </span>
                )}
              </>
            )}
            
            {/* Medium cells - simplified bps display */}
            {size === 'medium' && mindshareChange !== undefined && mindshareChange !== null && (
              <span className={cn(
                'text-[6px] sm:text-[8px] font-medium tabular-nums',
                mindshareChange > 0 ? 'text-teal-400/60' : mindshareChange < 0 ? 'text-rose-400/60' : 'text-white/25'
              )}>
                {toBps(mindshareChange)} bps
              </span>
            )}
          </div>

          {/* Trend icon - only on large cells */}
          {size === 'large' && TrendIcon && (
            <div className={cn(
              'p-0.5 sm:p-1 rounded transition-colors duration-200',
              colors.percentBg,
              'group-hover:bg-opacity-20'
            )}>
              <TrendIcon className={cn(
                'transition-transform duration-300 group-hover:scale-110',
                'w-2.5 h-2.5 sm:w-3.5 sm:h-3.5',
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