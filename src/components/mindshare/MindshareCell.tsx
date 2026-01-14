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

  // Kaito-style colors based on trend
  const trendColors = {
    up: {
      bg: 'from-teal-500/10 via-teal-500/5 to-transparent',
      sparkline: 'rgba(20, 184, 166, 0.4)',
      sparklineFill: 'rgba(20, 184, 166, 0.08)',
      text: 'text-teal-400',
      icon: 'text-teal-400',
    },
    down: {
      bg: 'from-rose-500/10 via-rose-500/5 to-transparent',
      sparkline: 'rgba(244, 63, 94, 0.4)',
      sparklineFill: 'rgba(244, 63, 94, 0.08)',
      text: 'text-rose-400',
      icon: 'text-rose-400',
    },
    neutral: {
      bg: 'from-white/5 via-white/2 to-transparent',
      sparkline: 'rgba(255, 255, 255, 0.2)',
      sparklineFill: 'rgba(255, 255, 255, 0.03)',
      text: 'text-white/60',
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
        'bg-gradient-to-br',
        'border-[0.5px] border-white/[0.08] transition-colors duration-200',
        'hover:border-white/20 hover:brightness-110',
        colors.bg
      )}
      style={{ 
        background: 'linear-gradient(145deg, rgba(12,12,12,0.97) 0%, rgba(6,6,6,0.99) 100%)'
      }}
    >
      {/* Sparkline Background */}
      {sparkline.length >= 2 && (size === 'large' || size === 'medium') && (
        <svg 
          className="absolute inset-0 w-full h-full opacity-60"
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`sparkGrad-${ticker}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.sparklineFill} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d={sparklinePath}
            fill="none"
            stroke={colors.sparkline}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`${sparklinePath} L 100,100 L 0,100 Z`}
            fill={`url(#sparkGrad-${ticker})`}
          />
        </svg>
      )}

      {/* Gradient overlay */}
      <div className={cn(
        'absolute inset-0 bg-gradient-to-br',
        colors.bg
      )} />

      {/* Glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

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
