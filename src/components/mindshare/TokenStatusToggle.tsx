import { cn } from '@/lib/utils';

export type TokenStatus = 'all' | 'tge' | 'pre-tge';

interface TokenStatusToggleProps {
  selected: TokenStatus;
  onChange: (status: TokenStatus) => void;
  className?: string;
}

const TokenStatusToggle = ({ selected, onChange, className }: TokenStatusToggleProps) => {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      <button
        onClick={() => onChange('all')}
        className={cn(
          'px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1 sm:gap-1.5',
          selected === 'all'
            ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
            : 'text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent'
        )}
      >
        <span className={cn(
          'w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-colors',
          selected === 'all' ? 'bg-teal-400' : 'bg-white/30'
        )} />
        All
      </button>
      <button
        onClick={() => onChange('tge')}
        className={cn(
          'px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1 sm:gap-1.5',
          selected === 'tge'
            ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
            : 'text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent'
        )}
      >
        <span className={cn(
          'w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-colors',
          selected === 'tge' ? 'bg-teal-400' : 'bg-white/30'
        )} />
        TGE
      </button>
      <button
        onClick={() => onChange('pre-tge')}
        className={cn(
          'px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1 sm:gap-1.5',
          selected === 'pre-tge'
            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
            : 'text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent'
        )}
      >
        <span className={cn(
          'w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-colors',
          selected === 'pre-tge' ? 'bg-cyan-400' : 'bg-white/30'
        )} />
        Pre
      </button>
    </div>
  );
};

export default TokenStatusToggle;