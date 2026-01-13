import { cn } from '@/lib/utils';

export type RankRange = 'top20' | 'top21-50';

interface TopRankToggleProps {
  selected: RankRange;
  onChange: (range: RankRange) => void;
  className?: string;
}

const TopRankToggle = ({ selected, onChange, className }: TopRankToggleProps) => {
  return (
    <div className={cn('flex items-center gap-1 p-1 bg-white/5 rounded-lg', className)}>
      <button
        onClick={() => onChange('top20')}
        className={cn(
          'px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200',
          selected === 'top20'
            ? 'bg-white/10 text-white shadow-sm'
            : 'text-white/50 hover:text-white hover:bg-white/5'
        )}
      >
        Top 20
      </button>
      <button
        onClick={() => onChange('top21-50')}
        className={cn(
          'px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200',
          selected === 'top21-50'
            ? 'bg-white/10 text-white shadow-sm'
            : 'text-white/50 hover:text-white hover:bg-white/5'
        )}
      >
        21-50
      </button>
    </div>
  );
};

export default TopRankToggle;
