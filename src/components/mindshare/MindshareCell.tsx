import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Flame, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ensureSparkline, hashSeed } from '@/lib/sparkline';

// Convert to percentage with clamping (max ±999%)
const toPercent = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '-';
  const clamped = Math.max(-999, Math.min(999, value));
  // If huge change (>100%), no decimals. Small change, 1 decimal.
  const formatted = Math.abs(clamped) >= 100 
    ? Math.round(clamped).toString()
    : clamped.toFixed(1);
  return clamped > 0 ? `+${formatted}%` : `${formatted}%`;
};

// Advanced Smoothing (Catmull-Rom like spline)
const getControlPoint = (current: {x:number, y:number}, previous: {x:number, y:number} | undefined, next: {x:number, y:number} | undefined, reverse: boolean) => {
    const p = previous || current;
    const n = next || current;
    const smoothing = 0.2;
    const o = {
        x: n.x - p.x,
        y: n.y - p.y
    };
    const x = current.x + (reverse ? -1 : 1) * o.x * smoothing;
    const y = current.y + (reverse ? -1 : 1) * o.y * smoothing;
    return { x, y };
};

const generateElegantPath = (points: { x: number; y: number }[]): string => {
  if (points.length < 2) return '';
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
      const cp1 = getControlPoint(points[i], points[i - 1], points[i + 1], false);
      const cp2 = getControlPoint(points[i + 1], points[i], points[i + 2], true);
      d += ` C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${points[i + 1].x},${points[i + 1].y}`;
  }
  return d;
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
  price?: number | null;
  change24h?: number | null;
  topSource?: string | null;
  periodsFound?: string[];
  startDate?: string | null;
}

// Narrative badges (Softer pastel tones)
const narrativeColors: Record<string, { bg: string; text: string; border: string }> = {
  'AI': { bg: 'bg-indigo-500/10', text: 'text-indigo-200', border: 'border-indigo-500/20' },
  'L2': { bg: 'bg-sky-500/10', text: 'text-sky-200', border: 'border-sky-500/20' },
  'DePIN': { bg: 'bg-orange-500/10', text: 'text-orange-200', border: 'border-orange-500/20' },
  'Meme': { bg: 'bg-pink-500/10', text: 'text-pink-200', border: 'border-pink-500/20' },
  'DeFi': { bg: 'bg-emerald-500/10', text: 'text-emerald-200', border: 'border-emerald-500/20' },
  'Gaming': { bg: 'bg-purple-500/10', text: 'text-purple-200', border: 'border-purple-500/20' },
  'RWA': { bg: 'bg-amber-500/10', text: 'text-amber-200', border: 'border-amber-500/20' },
  'General': { bg: 'bg-slate-500/10', text: 'text-slate-300', border: 'border-slate-500/20' },
};

const formatPrice = (price: number): string => {
  if (price === 0) return '0.00';
  if (price >= 1000) return `${(price / 1000).toFixed(1)}K`;
  if (price >= 1) return price.toFixed(2);
  if (price >= 0.01) return price.toFixed(4);
  return price.toFixed(6);
};

const MindshareCell = ({
  ticker, name, mindshare, mindshareChange, narrative, trend,
  tokenStatus = 'tge', sparkline = [], logoUrl, size, rank,
  onClick, isTrending = false, price, change24h, topSource,
  periodsFound = [], startDate,
}: MindshareCellProps) => {
  
  // Project is "new" if it only appears in 1-2 periods OR has a recent start_date
  const isNewProject = useMemo(() => {
    if (periodsFound.length > 0 && periodsFound.length <= 2) return true;
    if (startDate) {
      const start = new Date(startDate);
      const now = new Date();
      const daysSinceStart = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return daysSinceStart <= 14; // New if started within last 14 days
    }
    return false;
  }, [periodsFound, startDate]);

  // Generate sparkline with 0-padding for new projects based on start_date
  const effectiveSparkline = useMemo(() => {
    const POINTS = 14;
    
    // If project has start_date, pad with zeros before that date
    if (startDate) {
      const start = new Date(startDate);
      const now = new Date();
      const daysSinceStart = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      const activePoints = Math.min(POINTS, Math.max(1, daysSinceStart + 1));
      const zeroPoints = POINTS - activePoints;
      
      if (zeroPoints > 0) {
        // Create zeros for before start_date, then ramp up to current value
        const zeros = Array(zeroPoints).fill(0);
        const base = mindshare || 1;
        const ramp = Array.from({ length: activePoints }, (_, i) => {
          const t = (i + 1) / activePoints;
          return Math.round(base * t * 100) / 100;
        });
        ramp[activePoints - 1] = base; // Anchor last point
        return [...zeros, ...ramp];
      }
    }
    
    // Fallback to existing sparkline or generated one
    return ensureSparkline(sparkline, {
      base: mindshare,
      trend,
      seed: hashSeed(ticker),
      points: POINTS,
    });
  }, [sparkline, mindshare, trend, ticker, startDate]);
  
  // Refined Sparkline Logic
  const { sparklinePath, fillPath, lastPoint } = useMemo(() => {
    if (!effectiveSparkline || effectiveSparkline.length < 2) return { sparklinePath: '', fillPath: '', lastPoint: null };
    
    // Trim trailing zeros for cleaner look
    let data = [...effectiveSparkline];
    while(data.length > 5 && data[data.length-1] === 0 && data[data.length-2] === 0) {
        data.pop();
    }
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    // Graph takes up bottom 50% of the card
    const graphTop = 45; 
    const graphHeight = 55;
    
    const points = data.map((val, i) => ({
      x: (i / (data.length - 1)) * 100,
      y: graphTop + graphHeight - ((val - min) / range) * graphHeight
    }));

    const path = generateElegantPath(points);
    const fill = `${path} L 100,100 L 0,100 Z`;
    
    return { sparklinePath: path, fillPath: fill, lastPoint: points[points.length - 1] };
  }, [effectiveSparkline]);

  // Premium Color Palette (Glassmorphism)
  const theme = {
    up: {
      bg: 'bg-gradient-to-b from-emerald-900/20 to-emerald-950/40',
      border: 'border-emerald-500/20 hover:border-emerald-400/40',
      line: '#34d399', // emerald-400
      fillFrom: 'rgba(16, 185, 129, 0.15)', // emerald-500
      fillTo: 'rgba(16, 185, 129, 0)',
      text: 'text-emerald-400',
      glow: 'shadow-[0_0_20px_-5px_rgba(16,185,129,0.15)]'
    },
    down: {
      bg: 'bg-gradient-to-b from-rose-900/15 to-rose-950/40',
      border: 'border-rose-500/20 hover:border-rose-400/40',
      line: '#fb7185', // rose-400
      fillFrom: 'rgba(244, 63, 94, 0.12)', // rose-500
      fillTo: 'rgba(244, 63, 94, 0)',
      text: 'text-rose-400',
      glow: 'shadow-[0_0_20px_-5px_rgba(244,63,94,0.15)]'
    },
    neutral: {
      bg: 'bg-gradient-to-b from-slate-800/30 to-slate-900/50',
      border: 'border-slate-600/30 hover:border-slate-500/40',
      line: '#94a3b8', // slate-400
      fillFrom: 'rgba(148, 163, 184, 0.1)', 
      fillTo: 'rgba(148, 163, 184, 0)',
      text: 'text-slate-400',
      glow: ''
    }
  };

  const style = trend === 'up' ? theme.up : trend === 'down' ? theme.down : theme.neutral;
  const isPreTge = tokenStatus === 'pre-tge';
  const displayNarrative = narrative || 'General';
  const badgeStyle = narrativeColors[displayNarrative] || narrativeColors['General'];

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative w-full h-full overflow-hidden cursor-pointer',
        'rounded-xl border transition-all duration-300 ease-out',
        'backdrop-blur-sm',
        style.bg,
        style.border,
        style.glow,
        'hover:scale-[1.02] hover:z-20',
        isTrending && 'ring-1 ring-teal-400/50',
      )}
    >
      {/* Sparkline Layer */}
      {effectiveSparkline.length >= 2 && sparklinePath && (
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`fill-${ticker}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={style.fillFrom} />
              <stop offset="100%" stopColor={style.fillTo} />
            </linearGradient>
          </defs>
          <path d={fillPath} fill={`url(#fill-${ticker})`} />
          <path 
            d={sparklinePath} 
            fill="none" 
            stroke={style.line} 
            strokeWidth={size === 'large' ? '1.5' : '1'}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-80"
          />
        </svg>
      )}

      {/* Content Layer */}
      <div className={cn(
        "relative z-10 flex flex-col justify-between h-full",
        size === 'large' ? 'p-4' : size === 'medium' ? 'p-3' : 'p-2'
      )}>
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {/* Rank / Logo */}
            <div className="relative flex-shrink-0">
               {logoUrl ? (
                 <img
                   src={logoUrl}
                   alt={ticker}
                   className={cn(
                     'rounded-full object-cover ring-1 ring-white/10',
                     size === 'large' ? 'w-9 h-9' : size === 'medium' ? 'w-7 h-7' : 'w-5 h-5'
                   )}
                   onError={(e) => {
                     (e.target as HTMLImageElement).style.display = 'none';
                   }}
                 />
               ) : (
                 <div className={cn(
                   'flex items-center justify-center rounded-full bg-slate-700/50 ring-1 ring-white/10',
                   size === 'large' ? 'w-9 h-9' : size === 'medium' ? 'w-7 h-7' : 'w-5 h-5'
                 )}>
                   <span className="text-white/70 font-bold text-xs">{ticker[0]}</span>
                 </div>
               )}
               {rank && rank <= 3 && (
                 <div className={cn(
                   "absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold",
                   rank === 1 && "bg-yellow-500 text-yellow-900",
                   rank === 2 && "bg-slate-300 text-slate-700",
                   rank === 3 && "bg-amber-600 text-amber-100"
                 )}>
                   {rank}
                 </div>
               )}
            </div>

            {/* Title Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className={cn(
                  'font-bold text-white truncate',
                  size === 'large' ? 'text-base' : size === 'medium' ? 'text-sm' : 'text-xs'
                )}>
                  {ticker}
                </span>
                {isNewProject && (
                  <span className="px-1 py-0.5 text-[8px] font-bold rounded bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white animate-pulse">
                    NEW
                  </span>
                )}
                {isTrending && <Zap className="w-3.5 h-3.5 text-teal-400 fill-teal-400/50" />}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className={cn(
                  'px-1.5 py-0.5 text-[9px] font-medium rounded-md border',
                  badgeStyle.bg, badgeStyle.text, badgeStyle.border
                )}>
                  {displayNarrative}
                </span>
                {isPreTge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-medium rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/20">
                    PRE
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Top Source (Only Large) */}
          {size === 'large' && topSource && (
            <div className="flex items-center gap-1 text-[10px] text-white/30">
              <Flame className="w-3 h-3" />
              <span className="truncate max-w-[60px]">{topSource}</span>
            </div>
          )}
        </div>

        {/* Footer: Stats */}
        <div className="mt-auto pt-2">
          <div className="flex items-end justify-between">
            <div className={cn(
              'font-black tracking-tighter text-white',
              size === 'large' ? 'text-2xl' : size === 'medium' ? 'text-xl' : size === 'small' ? 'text-base' : 'text-sm'
            )}>
              {mindshare.toFixed(1)}
              <span className="text-white/40 font-medium text-[0.6em]">%</span>
            </div>
            
            <div className={cn(
              'flex flex-col items-end gap-0.5 text-right',
              size === 'large' ? 'text-xs' : 'text-[10px]'
            )}>
              {price && price > 0 && (
                <span className="text-white/40 font-mono">${formatPrice(price)}</span>
              )}
              {mindshareChange !== undefined && mindshareChange !== null && (
                <span className={cn("font-semibold", mindshareChange > 0 ? "text-emerald-400" : mindshareChange < 0 ? "text-rose-400" : "text-slate-400")}>
                  {toPercent(mindshareChange)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindshareCell;
