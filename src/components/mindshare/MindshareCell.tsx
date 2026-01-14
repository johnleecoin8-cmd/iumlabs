import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MindshareCellProps {
  ticker: string;
  name: string;
  mindshare: number;
  trend: 'up' | 'down' | 'neutral';
  tokenStatus?: 'tge' | 'pre-tge';
  sparkline?: number[];
  logoUrl?: string | null;
  size: 'large' | 'medium' | 'small' | 'tiny';
  rank?: number;
  onClick?: () => void;
}

const MindshareCell = ({
  ticker,
  name,
  mindshare,
  trend,
  tokenStatus = 'tge',
  sparkline = [],
  logoUrl,
  size,
  rank,
  onClick,
}: MindshareCellProps) => {
  // Generate sparkline path for background
  const sparklinePath = useMemo(() => {
    if (!sparkline || sparkline.length < 2) return '';
    
    const min = Math.min(...sparkline);
    const max = Math.max(...sparkline);
    const range = max - min || 1;
    
    const points = sparkline.map((value, index) => {
      const x = (index / (sparkline.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 50;
      return `${x},${y}`;
    }).join(' ');
    
    return `M ${points.split(' ').join(' L ')}`;
  }, [sparkline]);

  // Kaito-style colors based on trend - subtle but visible
  const trendColors = {
    up: {
      bg: 'from-emerald-600/60 via-emerald-700/40 to-emerald-900/30',
      cellBg: 'rgba(20, 80, 60, 0.65)',
      sparkline: 'rgba(255, 255, 255, 0.45)',
      sparklineFill: 'rgba(255, 255, 255, 0.08)',
      text: 'text-white/90',
      icon: 'text-white/50',
    },
    down: {
      bg: 'from-rose-600/60 via-rose-700/40 to-rose-900/30',
      cellBg: 'rgba(120, 50, 55, 0.65)',
      sparkline: 'rgba(255, 255, 255, 0.45)',
      sparklineFill: 'rgba(255, 255, 255, 0.08)',
      text: 'text-white/90',
      icon: 'text-white/50',
    },
    neutral: {
      bg: 'from-slate-600/40 via-slate-700/30 to-slate-900/20',
      cellBg: 'rgba(40, 45, 55, 0.65)',
      sparkline: 'rgba(255, 255, 255, 0.35)',
      sparklineFill: 'rgba(255, 255, 255, 0.05)',
      text: 'text-white/70',
      icon: 'text-white/40',
    },
  };

  const colors = trendColors[trend];
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const isPreTge = tokenStatus === 'pre-tge';

  // Crown colors for top 3
  const crownColors: Record<number, string> = {
    1: '#FFD700', // Gold
    2: '#C0C0C0', // Silver
    3: '#CD7F32'  // Bronze
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative w-full h-full overflow-hidden cursor-pointer box-border',
        'border-[0.5px] border-white/[0.12] transition-all duration-200',
        'hover:border-white/30 hover:brightness-110',
      )}
      style={{ 
        background: colors.cellBg
      }}
    >
      {/* Lighter gradient overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)'
        }}
      />

      {/* Sparkline Background - more visible like Kaito */}
      {sparkline.length >= 2 && (size === 'large' || size === 'medium' || size === 'small') && (
        <svg 
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          style={{ opacity: 0.9 }}
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
          {/* Main sparkline stroke - thicker and more visible */}
          <path
            d={sparklinePath}
            fill="none"
            stroke={colors.sparkline}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}

      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

      {/* Crown for top 3 */}
      {rank && rank <= 3 && (
        <div className="absolute top-1.5 right-1.5 z-20">
          <Crown 
            className={cn(
              size === 'large' ? 'w-5 h-5' : size === 'medium' ? 'w-4 h-4' : 'w-3 h-3'
            )}
            style={{ 
              color: crownColors[rank], 
              filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.5))' 
            }}
            fill={crownColors[rank]}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-2">
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
                      'rounded-full bg-black/50 ring-1 ring-white/10 object-cover',
                      size === 'large' ? 'w-8 h-8' : 'w-5 h-5'
                    )}
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
                    'items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10',
                    size === 'large' ? 'w-8 h-8' : 'w-5 h-5',
                    logoUrl ? 'hidden' : 'flex'
                  )}
                >
                  <span className={cn(
                    'font-bold text-white/70',
                    size === 'large' ? 'text-xs' : 'text-[10px]'
                  )}>
                    {ticker.charAt(0)}
                  </span>
                </div>
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className={cn(
                'font-semibold text-white tracking-tight truncate',
                size === 'large' ? 'text-sm' : size === 'medium' ? 'text-xs' : 'text-[10px]'
              )}>
                {ticker}
              </span>
              {(size === 'large' || size === 'medium') && name && (
                <span className="text-[9px] text-white/35 truncate max-w-[70px]">
                  {name}
                </span>
              )}
            </div>
          </div>

          {/* Pre-TGE badge */}
          {isPreTge && (size === 'large' || size === 'medium') && (
            <span className="px-1 py-0.5 text-[8px] font-medium bg-cyan-500/15 text-cyan-400 rounded border border-cyan-500/25 flex-shrink-0">
              PRE
            </span>
          )}
        </div>

        {/* Bottom section */}
        <div className="flex items-end justify-between">
          {/* Mindshare percentage */}
          <span className={cn(
            'font-bold tracking-tight',
            size === 'large' ? 'text-xl' : size === 'medium' ? 'text-base' : size === 'small' ? 'text-sm' : 'text-[10px]',
            colors.text
          )}>
            {mindshare.toFixed(2)}%
          </span>

          {/* Trend icon */}
          {(size === 'large' || size === 'medium') && (
            <TrendIcon className={cn('w-3.5 h-3.5 flex-shrink-0', colors.icon)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MindshareCell;
