import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
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
      border: 'border-teal-500/20 hover:border-teal-500/40',
      glow: 'hover:shadow-[0_0_40px_rgba(20,184,166,0.12)]',
      sparkline: 'rgba(20, 184, 166, 0.4)',
      sparklineFill: 'rgba(20, 184, 166, 0.08)',
      text: 'text-teal-400',
      icon: 'text-teal-400',
    },
    down: {
      bg: 'from-rose-500/10 via-rose-500/5 to-transparent',
      border: 'border-rose-500/20 hover:border-rose-500/40',
      glow: 'hover:shadow-[0_0_40px_rgba(244,63,94,0.12)]',
      sparkline: 'rgba(244, 63, 94, 0.4)',
      sparklineFill: 'rgba(244, 63, 94, 0.08)',
      text: 'text-rose-400',
      icon: 'text-rose-400',
    },
    neutral: {
      bg: 'from-white/5 via-white/2 to-transparent',
      border: 'border-white/10 hover:border-white/20',
      glow: 'hover:shadow-[0_0_40px_rgba(255,255,255,0.04)]',
      sparkline: 'rgba(255, 255, 255, 0.2)',
      sparklineFill: 'rgba(255, 255, 255, 0.03)',
      text: 'text-white/60',
      icon: 'text-white/40',
    },
  };

  const colors = trendColors[trend];
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const isPreTge = tokenStatus === 'pre-tge';

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative w-full h-full rounded-xl overflow-hidden cursor-pointer',
        'bg-gradient-to-br backdrop-blur-sm',
        'border transition-all duration-300 ease-out',
        'hover:scale-[1.02] hover:-translate-y-0.5',
        colors.bg,
        colors.border,
        colors.glow
      )}
      style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(5,5,5,0.95) 100%)' }}
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

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-3">
        {/* Top section */}
        <div className="flex items-start justify-between gap-2">
          {/* Logo and ticker */}
          <div className="flex items-center gap-2">
            {(size === 'large' || size === 'medium') && (
              <div className="relative">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={ticker}
                    className={cn(
                      'rounded-full bg-black/50 ring-1 ring-white/10 object-cover',
                      size === 'large' ? 'w-10 h-10' : 'w-7 h-7'
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
                    size === 'large' ? 'w-10 h-10' : 'w-7 h-7',
                    logoUrl ? 'hidden' : 'flex'
                  )}
                >
                  <span className={cn(
                    'font-bold text-white/70',
                    size === 'large' ? 'text-sm' : 'text-xs'
                  )}>
                    {ticker.charAt(0)}
                  </span>
                </div>
                {/* Subtle glow behind logo */}
                <div className={cn(
                  'absolute inset-0 rounded-full blur-lg -z-10 opacity-30',
                  trend === 'up' && 'bg-teal-400',
                  trend === 'down' && 'bg-rose-400',
                  trend === 'neutral' && 'bg-white/20'
                )} />
              </div>
            )}
            <div className="flex flex-col">
              <span className={cn(
                'font-semibold text-white tracking-tight',
                size === 'large' ? 'text-base' : size === 'medium' ? 'text-sm' : 'text-xs'
              )}>
                {ticker}
              </span>
              {(size === 'large' || size === 'medium') && name && (
                <span className="text-[10px] text-white/35 truncate max-w-[80px]">
                  {name}
                </span>
              )}
            </div>
          </div>

          {/* Pre-TGE badge */}
          {isPreTge && (size === 'large' || size === 'medium') && (
            <span className="px-1.5 py-0.5 text-[9px] font-medium bg-cyan-500/15 text-cyan-400 rounded border border-cyan-500/25">
              PRE
            </span>
          )}
        </div>

        {/* Bottom section */}
        <div className="flex items-end justify-between">
          {/* Mindshare percentage */}
          <span className={cn(
            'font-bold tracking-tight',
            size === 'large' ? 'text-2xl' : size === 'medium' ? 'text-lg' : size === 'small' ? 'text-sm' : 'text-xs',
            colors.text
          )}>
            {mindshare.toFixed(2)}%
          </span>

          {/* Trend icon */}
          {size === 'large' && (
            <TrendIcon className={cn('w-4 h-4', colors.icon)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MindshareCell;
