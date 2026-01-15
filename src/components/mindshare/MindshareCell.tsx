import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

// Convert to percentage with clamping (max ±999%)
const toPercent = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '-';
  // Clamp to ±999%
  const clamped = Math.max(-999, Math.min(999, value));
  const formatted = Math.abs(clamped) >= 100 
    ? Math.round(clamped).toString()
    : clamped.toFixed(1);
  return clamped > 0 ? `+${formatted}` : formatted;
};

// Apply moving average to smooth sparkline data
const smoothSparkline = (data: number[], windowSize: number = 3): number[] => {
  if (data.length < windowSize) return data;
  
  const result: number[] = [];
  for (let i = 0; i < data.length; i++) {
    let sum = 0;
    let count = 0;
    for (let j = Math.max(0, i - Math.floor(windowSize / 2)); j <= Math.min(data.length - 1, i + Math.floor(windowSize / 2)); j++) {
      sum += data[j];
      count++;
    }
    result.push(sum / count);
  }
  return result;
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

// Narrative color mapping - Only show important signal tags
const narrativeColors: Record<string, { bg: string; text: string; border: string }> = {
  'AI': { bg: 'bg-violet-500/10', text: 'text-violet-300/70', border: 'border-violet-400/20' },
  'L2': { bg: 'bg-blue-500/10', text: 'text-blue-300/70', border: 'border-blue-400/20' },
  'DePIN': { bg: 'bg-orange-500/10', text: 'text-orange-300/70', border: 'border-orange-400/20' },
  'Meme': { bg: 'bg-pink-500/10', text: 'text-pink-300/70', border: 'border-pink-400/20' },
  'DeFi': { bg: 'bg-teal-500/10', text: 'text-teal-300/70', border: 'border-teal-400/20' },
  'Gaming': { bg: 'bg-yellow-500/10', text: 'text-yellow-300/70', border: 'border-yellow-400/20' },
  'Infra': { bg: 'bg-cyan-500/10', text: 'text-cyan-300/70', border: 'border-cyan-400/20' },
  'RWA': { bg: 'bg-amber-500/10', text: 'text-amber-300/70', border: 'border-amber-400/20' },
  'NFT': { bg: 'bg-fuchsia-500/10', text: 'text-fuchsia-300/70', border: 'border-fuchsia-400/20' },
  'CEX': { bg: 'bg-sky-500/10', text: 'text-sky-300/70', border: 'border-sky-400/20' },
};

// Format price for display
const formatPrice = (price: number): string => {
  if (price >= 1000) return `${(price / 1000).toFixed(1)}K`;
  if (price >= 1) return price.toFixed(2);
  if (price >= 0.01) return price.toFixed(3);
  if (price >= 0.0001) return price.toFixed(5);
  return price.toExponential(2);
};

// Generate smooth bezier curve path from points
const generateSmoothPath = (points: { x: number; y: number }[]): string => {
  if (points.length < 2) return '';
  
  let path = `M ${points[0].x},${points[0].y}`;
  
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const prev = points[i - 1] || current;
    const afterNext = points[i + 2] || next;
    
    // Calculate control points for smooth curve
    const tension = 0.3;
    const cp1x = current.x + (next.x - prev.x) * tension;
    const cp1y = current.y + (next.y - prev.y) * tension;
    const cp2x = next.x - (afterNext.x - current.x) * tension;
    const cp2y = next.y - (afterNext.y - current.y) * tension;
    
    path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
  }
  
  return path;
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
  // Generate smooth sparkline path with bezier curves + moving average
  const { sparklinePath, lastPoint } = useMemo(() => {
    if (!sparkline || sparkline.length < 2) return { sparklinePath: '', lastPoint: null };
    
    // Step 1: Apply moving average to smooth the "heart monitor" spikes
    // Use larger window for more data points
    const windowSize = sparkline.length > 20 ? 5 : sparkline.length > 10 ? 3 : 2;
    let smoothedData = smoothSparkline(sparkline, windowSize);
    
    // Step 2: Remove trailing near-zero or flatline data points
    const threshold = Math.max(...smoothedData) * 0.05;
    
    while (smoothedData.length > 3) {
      const lastVal = smoothedData[smoothedData.length - 1];
      const secondLast = smoothedData[smoothedData.length - 2];
      const thirdLast = smoothedData[smoothedData.length - 3];
      
      const isFlatline = Math.abs(lastVal - secondLast) < threshold && Math.abs(secondLast - thirdLast) < threshold;
      const isNearZero = lastVal < threshold;
      
      if (isFlatline || isNearZero) {
        smoothedData.pop();
      } else {
        break;
      }
    }
    
    if (smoothedData.length < 2) smoothedData = smoothSparkline(sparkline, 2).slice(0, Math.max(2, sparkline.length));
    
    // Step 3: Downsample if too many points (reduces noise further)
    if (smoothedData.length > 24) {
      const step = Math.ceil(smoothedData.length / 24);
      smoothedData = smoothedData.filter((_, i) => i % step === 0 || i === smoothedData.length - 1);
    }
    
    const min = Math.min(...smoothedData);
    const max = Math.max(...smoothedData);
    const range = max - min || 1;
    
    // Graph occupies bottom 65% of cell
    const graphTop = 35;
    const graphHeight = 55;
    
    const points = smoothedData.map((value, index) => ({
      x: (index / (smoothedData.length - 1)) * 100,
      y: graphTop + graphHeight - ((value - min) / range) * graphHeight
    }));
    
    const path = generateSmoothPath(points);
    const last = points[points.length - 1];
    
    return { sparklinePath: path, lastPoint: last };
  }, [sparkline]);

  // Ium Labs color system - SOFTER gradients (less aggressive)
  const trendColors = {
    up: {
      cellBg: 'linear-gradient(160deg, rgba(20, 83, 45, 0.35) 0%, rgba(22, 101, 52, 0.25) 50%, rgba(20, 83, 45, 0.3) 100%)', // Subtle green
      glowColor: 'rgba(34, 197, 94, 0.05)',
      borderColor: 'rgba(134, 239, 172, 0.25)',
      sparkline: 'rgba(134, 239, 172, 0.8)',
      sparklineGlow: 'rgba(134, 239, 172, 0.08)',
      sparklineFillTop: 'rgba(134, 239, 172, 0.08)',
      sparklineFillMid: 'rgba(134, 239, 172, 0.03)',
      sparklineFillBottom: 'rgba(134, 239, 172, 0)',
      accentText: 'text-green-400',
      percentBg: 'bg-green-500/10',
      dotColor: 'rgba(134, 239, 172, 0.9)',
      dotGlow: 'rgba(134, 239, 172, 0.2)',
    },
    down: {
      cellBg: 'linear-gradient(160deg, rgba(127, 29, 29, 0.35) 0%, rgba(153, 27, 27, 0.25) 50%, rgba(127, 29, 29, 0.3) 100%)', // Subtle red
      glowColor: 'rgba(248, 113, 113, 0.04)',
      borderColor: 'rgba(252, 165, 165, 0.25)',
      sparkline: 'rgba(252, 165, 165, 0.75)',
      sparklineGlow: 'rgba(252, 165, 165, 0.06)',
      sparklineFillTop: 'rgba(252, 165, 165, 0.06)',
      sparklineFillMid: 'rgba(252, 165, 165, 0.02)',
      sparklineFillBottom: 'rgba(252, 165, 165, 0)',
      accentText: 'text-red-400',
      percentBg: 'bg-red-500/10',
      dotColor: 'rgba(252, 165, 165, 0.9)',
      dotGlow: 'rgba(252, 165, 165, 0.15)',
    },
  };

  // Neutral style - Elegant slate
  const neutralColors = {
    cellBg: 'linear-gradient(160deg, rgba(30, 41, 59, 0.5) 0%, rgba(51, 65, 85, 0.4) 50%, rgba(30, 41, 59, 0.45) 100%)',
    glowColor: 'rgba(148, 163, 184, 0.03)',
    borderColor: 'rgba(148, 163, 184, 0.2)',
    sparkline: 'rgba(148, 163, 184, 0.55)',
    sparklineGlow: 'rgba(148, 163, 184, 0.05)',
    sparklineFillTop: 'rgba(148, 163, 184, 0.04)',
    sparklineFillMid: 'rgba(148, 163, 184, 0.01)',
    sparklineFillBottom: 'rgba(148, 163, 184, 0)',
    accentText: 'text-slate-400',
    percentBg: 'bg-slate-500/8',
    dotColor: 'rgba(148, 163, 184, 0.7)',
    dotGlow: 'rgba(148, 163, 184, 0.15)',
  };

  const colors = trend === 'up' ? trendColors.up : trend === 'down' ? trendColors.down : neutralColors;
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null;
  const isPreTge = tokenStatus === 'pre-tge';
  
  // Don't show "General" - it's meaningless
  const showNarrative = narrative && narrative !== 'General' && (size === 'large' || size === 'medium') && !isTrending;

  // Gold border for top 3 ranks
  const isTop3 = rank && rank <= 3;
  const getGoldBorder = () => {
    if (!isTop3) return colors.borderColor;
    if (rank === 1) return 'rgba(255, 215, 0, 0.8)'; // Gold
    if (rank === 2) return 'rgba(192, 192, 192, 0.7)'; // Silver
    return 'rgba(205, 127, 50, 0.7)'; // Bronze
  };
  const getGoldShadow = () => {
    if (!isTop3) return `0 2px 12px -4px ${colors.glowColor}, inset 0 1px 0 rgba(255,255,255,0.04)`;
    if (rank === 1) return `0 0 16px rgba(255, 215, 0, 0.35), 0 0 32px rgba(255, 215, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.15)`;
    if (rank === 2) return `0 0 12px rgba(192, 192, 192, 0.3), 0 0 24px rgba(192, 192, 192, 0.12), inset 0 1px 0 rgba(255,255,255,0.12)`;
    return `0 0 10px rgba(205, 127, 50, 0.3), 0 0 20px rgba(205, 127, 50, 0.12), inset 0 1px 0 rgba(255,255,255,0.1)`;
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative w-full h-full overflow-hidden cursor-pointer box-border',
        'rounded-lg sm:rounded-xl transition-all duration-300 ease-out',
        'hover:scale-[1.01] hover:z-20',
        isTrending && 'ring-1 sm:ring-2 ring-teal-400/40',
      )}
      style={{ 
        background: isTrending 
          ? 'linear-gradient(160deg, rgba(5, 150, 105, 0.9) 0%, rgba(4, 120, 87, 0.85) 100%)'
          : colors.cellBg,
        border: isTrending 
          ? '1px solid rgba(255, 255, 255, 0.2)' 
          : `2px solid ${getGoldBorder()}`,
        boxShadow: isTrending 
          ? `0 4px 20px -6px rgba(20, 184, 166, 0.3), inset 0 1px 0 rgba(255,255,255,0.08)`
          : getGoldShadow(),
      }}
    >
      {/* Enhanced diagonal shine overlay - Kaito style */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 30%, transparent 50%)',
        }}
      />

      {/* Animated glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 20% 30%, ${colors.glowColor} 0%, transparent 60%)`,
        }}
      />

      {/* Premium Sparkline - positioned in bottom 2/3 */}
      {sparkline.length >= 2 && sparklinePath && (
        <svg 
          className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500"
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <defs>
            {/* Multi-stop gradient that fades naturally */}
            <linearGradient id={`sparkGrad-${ticker}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.sparklineFillTop} />
              <stop offset="40%" stopColor={colors.sparklineFillMid} />
              <stop offset="80%" stopColor={colors.sparklineFillBottom} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            {/* Very subtle glow filter - reduced for elegance */}
            <filter id={`sparkGlow-${ticker}`} x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="0.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Dot glow filter - subtle */}
            <filter id={`dotGlow-${ticker}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Fill area - smooth curve to bottom */}
          <path
            d={`${sparklinePath} L 100,100 L 0,100 Z`}
            fill={`url(#sparkGrad-${ticker})`}
          />
          
          {/* Subtle outer glow line - much thinner */}
          <path
            d={sparklinePath}
            fill="none"
            stroke={colors.sparklineGlow}
            strokeWidth={size === 'large' ? '2.5' : size === 'medium' ? '2' : '1.5'}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Main sparkline - thin, crisp, elegant (2px target) */}
          <path
            d={sparklinePath}
            fill="none"
            stroke={colors.sparkline}
            strokeWidth={size === 'large' ? '1' : size === 'medium' ? '0.8' : '0.5'}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={size === 'large' ? `url(#sparkGlow-${ticker})` : undefined}
          />
          
          {/* Live dot at the end - subtle "alive" indicator */}
          {lastPoint && (size === 'large' || size === 'medium') && (
            <>
              {/* Outer glow - subtle */}
              <circle
                cx={lastPoint.x}
                cy={lastPoint.y}
                r={size === 'large' ? '2.5' : '2'}
                fill={colors.dotGlow}
                filter={`url(#dotGlow-${ticker})`}
                className="animate-pulse"
                style={{ animationDuration: '2.5s' }}
              />
              {/* Inner dot */}
              <circle
                cx={lastPoint.x}
                cy={lastPoint.y}
                r={size === 'large' ? '1.2' : '1'}
                fill={colors.dotColor}
              />
              {/* Bright center */}
              <circle
                cx={lastPoint.x}
                cy={lastPoint.y}
                r={size === 'large' ? '0.5' : '0.4'}
                fill="white"
                opacity="0.8"
              />
            </>
          )}
        </svg>
      )}

      {/* Content - better spacing with breathing room from edges */}
      <div className={cn(
        "relative z-10 flex flex-col justify-between h-full",
        size === 'large' ? 'p-4 sm:p-5' : size === 'medium' ? 'p-3 sm:p-4' : 'p-2 sm:p-2.5'
      )}>
        {/* Top section - Hero: Ticker + % */}
        <div className="flex items-start justify-between gap-1">
          {/* Logo and ticker - make it POP */}
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
            {(size === 'large' || size === 'medium') && (
              <div className="relative flex-shrink-0">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={ticker}
                    className={cn(
                      'rounded-full object-cover transition-all duration-300',
                      'ring-1 ring-white/15 group-hover:ring-white/25',
                      'shadow-lg',
                      size === 'large' ? 'w-7 h-7 sm:w-10 sm:h-10' : 'w-5 h-5 sm:w-7 sm:h-7'
                    )}
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
                    'items-center justify-center rounded-full',
                    'bg-gradient-to-br from-slate-700 to-slate-800 ring-1 ring-white/10',
                    size === 'large' ? 'w-7 h-7 sm:w-10 sm:h-10' : 'w-5 h-5 sm:w-7 sm:h-7',
                    logoUrl ? 'hidden' : 'flex'
                  )}
                >
                  <span className={cn(
                    'font-bold text-white/80',
                    size === 'large' ? 'text-xs sm:text-base' : 'text-[8px] sm:text-xs'
                  )}>
                    {ticker.charAt(0)}
                  </span>
                </div>
              </div>
            )}
            
            {/* Ticker - HERO element, bright white */}
            <div className="flex flex-col min-w-0">
              <span className={cn(
                'font-bold text-white tracking-tight truncate',
                'font-[\'JetBrains_Mono\',\'SF_Mono\',monospace]',
                size === 'large' ? 'text-sm sm:text-lg' : size === 'medium' ? 'text-xs sm:text-sm' : 'text-[9px] sm:text-xs'
              )}>
                {ticker}
              </span>
              {/* Top source hint - subtle */}
              {topSource && size === 'large' && (
                <span className="text-[7px] sm:text-[9px] text-white/25 truncate max-w-[80px] sm:max-w-[100px]">
                  via {topSource}
                </span>
              )}
            </div>
          </div>

          {/* Badges - much more subtle, only important signals */}
          <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
            {/* HOT badge - the only loud one */}
            {isTrending && (size === 'large' || size === 'medium') && (
              <span className={cn(
                'px-1.5 py-0.5 text-[7px] sm:text-[9px] font-bold rounded-md',
                'bg-gradient-to-r from-teal-500/30 to-emerald-500/25',
                'text-teal-300 border border-teal-400/40',
                'flex items-center gap-0.5',
                'shadow-[0_0_12px_rgba(20,184,166,0.25)]'
              )}>
                <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span className="hidden sm:inline">HOT</span>
              </span>
            )}
            {/* Narrative badge - very subtle */}
            {showNarrative && (
              <span className={cn(
                'px-1 py-0.5 text-[6px] sm:text-[7px] font-medium rounded opacity-60',
                'border',
                narrativeColors[narrative!]?.bg || 'bg-slate-500/10',
                narrativeColors[narrative!]?.text || 'text-slate-400',
                narrativeColors[narrative!]?.border || 'border-slate-500/20',
              )}>
                {narrative}
              </span>
            )}
            {/* Pre-TGE badge - subtle */}
            {isPreTge && size === 'large' && (
              <span className={cn(
                'px-1 py-0.5 text-[6px] sm:text-[8px] font-medium rounded opacity-70',
                'bg-cyan-500/15 text-cyan-300/70 border border-cyan-400/20',
              )}>
                PRE
              </span>
            )}
          </div>
        </div>

        {/* Bottom section - Mindshare % as HERO number */}
        <div className="flex items-end justify-between">
          {/* Mindshare percentage - HERO element */}
          <div className="flex flex-col gap-0.5">
            <div className="flex items-baseline gap-0.5">
              {/* The BIG number - tabular for alignment */}
              <span className={cn(
                'font-black tracking-tighter text-white',
                'font-[\'JetBrains_Mono\',\'SF_Mono\',monospace]',
                '[font-variant-numeric:tabular-nums]',
                size === 'large' ? 'text-xl sm:text-3xl' : size === 'medium' ? 'text-base sm:text-xl' : size === 'small' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
              )}>
                {mindshare.toFixed(size === 'tiny' ? 1 : 2)}
              </span>
              <span className={cn(
                'font-medium text-white/30',
                size === 'large' ? 'text-sm sm:text-lg' : size === 'medium' ? 'text-xs sm:text-sm' : 'text-[9px] sm:text-xs'
              )}>
                %
              </span>
            </div>
            
            {/* Secondary info - price or bps, much more subdued */}
            {size === 'large' && (
              <div className="flex items-center gap-1.5">
                {/* Price if exists */}
                {price && price > 0 ? (
                  <span className={cn(
                    'text-[8px] sm:text-[10px] font-medium text-white/35',
                    'font-[\'JetBrains_Mono\',monospace] [font-variant-numeric:tabular-nums]'
                  )}>
                    ${formatPrice(price)}
                    {change24h !== null && change24h !== undefined && (
                      <span className={cn(
                        'ml-1',
                        change24h > 0 ? 'text-teal-400/50' : change24h < 0 ? 'text-rose-400/50' : 'text-white/20'
                      )}>
                        {change24h > 0 ? '+' : ''}{change24h.toFixed(1)}%
                      </span>
                    )}
                  </span>
                ) : null}
                
                {/* % change - clamped to ±999% */}
                {mindshareChange !== undefined && mindshareChange !== null && (
                  <span className={cn(
                    'text-[8px] sm:text-[10px] font-medium',
                    'font-[\'JetBrains_Mono\',monospace] [font-variant-numeric:tabular-nums]',
                    mindshareChange > 0 ? 'text-teal-400/60' : mindshareChange < 0 ? 'text-rose-400/60' : 'text-white/25'
                  )}>
                    {toPercent(mindshareChange)}%
                  </span>
                )}
              </div>
            )}
            
            {/* Medium cells - simplified */}
            {size === 'medium' && mindshareChange !== undefined && mindshareChange !== null && (
              <span className={cn(
                'text-[7px] sm:text-[9px] font-medium',
                'font-[\'JetBrains_Mono\',monospace] [font-variant-numeric:tabular-nums]',
                mindshareChange > 0 ? 'text-teal-400/50' : mindshareChange < 0 ? 'text-rose-400/50' : 'text-white/20'
              )}>
                {toPercent(mindshareChange)}%
              </span>
            )}
          </div>

          {/* Trend icon - subtle, only on large */}
          {size === 'large' && TrendIcon && (
            <div className={cn(
              'p-1 sm:p-1.5 rounded-lg transition-all duration-300',
              'bg-white/[0.03] group-hover:bg-white/[0.06]',
              'border border-white/[0.06]'
            )}>
              <TrendIcon className={cn(
                'transition-transform duration-300 group-hover:scale-110',
                'w-3 h-3 sm:w-4 sm:h-4',
                colors.accentText,
                'opacity-70'
              )} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MindshareCell;