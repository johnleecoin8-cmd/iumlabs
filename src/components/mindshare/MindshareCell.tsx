import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MindshareCellProps {
  ticker: string;
  name: string;
  mindshare: number;
  trend: 'up' | 'down' | 'neutral';
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
      const y = 100 - ((value - min) / range) * 60; // 60% height for sparkline
      return `${x},${y}`;
    }).join(' ');
    
    return `M ${points.split(' ').join(' L ')}`;
  }, [sparkline]);

  const trendColor = trend === 'up' 
    ? 'from-emerald-500/30 to-emerald-500/5' 
    : trend === 'down' 
      ? 'from-red-500/30 to-red-500/5'
      : 'from-white/10 to-white/5';

  const borderColor = trend === 'up'
    ? 'border-emerald-500/30 hover:border-emerald-500/50'
    : trend === 'down'
      ? 'border-red-500/30 hover:border-red-500/50'
      : 'border-white/10 hover:border-white/20';

  const sparklineColor = trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : '#6b7280';

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-lg border cursor-pointer transition-all duration-300',
        'bg-gradient-to-b hover:scale-[1.02] hover:z-10',
        trendColor,
        borderColor,
        'flex flex-col items-center justify-center p-2 group'
      )}
    >
      {/* Sparkline Background */}
      {sparkline.length >= 2 && (
        <svg 
          className="absolute inset-0 w-full h-full opacity-20 group-hover:opacity-40 transition-opacity"
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <path
            d={sparklinePath}
            fill="none"
            stroke={sparklineColor}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`${sparklinePath} L 100,100 L 0,100 Z`}
            fill={sparklineColor}
            opacity="0.1"
          />
        </svg>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-1 text-center w-full">
        {/* Logo */}
        {(size === 'large' || size === 'medium') && logoUrl && (
          <img
            src={logoUrl}
            alt={name}
            className={cn(
              'rounded-full bg-white/10 object-cover',
              size === 'large' ? 'w-10 h-10' : 'w-6 h-6'
            )}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}

        {/* Ticker */}
        <span className={cn(
          'font-bold text-white tracking-tight',
          size === 'large' ? 'text-lg' : size === 'medium' ? 'text-sm' : size === 'small' ? 'text-xs' : 'text-[10px]'
        )}>
          {ticker}
        </span>

        {/* Mindshare Percentage */}
        <span className={cn(
          'font-medium',
          trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-white/60',
          size === 'large' ? 'text-base' : size === 'medium' ? 'text-xs' : 'text-[10px]'
        )}>
          {mindshare.toFixed(2)}%
        </span>

        {/* Trend Icon (only for large cells) */}
        {size === 'large' && (
          <div className={cn(
            'flex items-center gap-1 mt-1',
            trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-white/40'
          )}>
            {trend === 'up' ? (
              <TrendingUp className="w-3 h-3" />
            ) : trend === 'down' ? (
              <TrendingDown className="w-3 h-3" />
            ) : (
              <Minus className="w-3 h-3" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MindshareCell;
