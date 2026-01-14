import { cn } from '@/lib/utils';

export type RankRange = 'top20' | 'top21-50';

interface TopRankToggleProps {
  selected: RankRange;
  onChange: (range: RankRange) => void;
  className?: string;
}

const TopRankToggle = ({ selected, onChange, className }: TopRankToggleProps) => {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      <button
        onClick={() => onChange('top20')}
        className={cn(
          'px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1.5',
          selected === 'top20'
            ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
            : 'text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent'
        )}
      >
        <span className={cn(
          'w-1.5 h-1.5 rounded-full transition-colors',
          selected === 'top20' ? 'bg-teal-400' : 'bg-white/30'
        )} />
        Top 20
      </button>
      <button
        onClick={() => onChange('top21-50')}
        className={cn(
          'px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1.5',
          selected === 'top21-50'
            ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
            : 'text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent'
        )}
      >
        <span className={cn(
          'w-1.5 h-1.5 rounded-full transition-colors',
          selected === 'top21-50' ? 'bg-teal-400' : 'bg-white/30'
        )} />
        21-50
      </button>
    </div>
  );
};

export default TopRankToggle;
