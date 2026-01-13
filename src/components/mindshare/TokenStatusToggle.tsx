import { cn } from '@/lib/utils';

export type TokenStatus = 'all' | 'tge' | 'pre-tge';

interface TokenStatusToggleProps {
  selected: TokenStatus;
  onChange: (status: TokenStatus) => void;
  className?: string;
}

const TokenStatusToggle = ({ selected, onChange, className }: TokenStatusToggleProps) => {
  return (
    <div className={cn('flex items-center gap-1 p-1 bg-white/5 rounded-lg', className)}>
      <button
        onClick={() => onChange('all')}
        className={cn(
          'px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200',
          selected === 'all'
            ? 'bg-white/10 text-white shadow-sm'
            : 'text-white/50 hover:text-white hover:bg-white/5'
        )}
      >
        All
      </button>
      <button
        onClick={() => onChange('tge')}
        className={cn(
          'px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 flex items-center gap-1.5',
          selected === 'tge'
            ? 'bg-emerald-500/20 text-emerald-400 shadow-sm border border-emerald-500/30'
            : 'text-white/50 hover:text-white hover:bg-white/5'
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        TGE
      </button>
      <button
        onClick={() => onChange('pre-tge')}
        className={cn(
          'px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 flex items-center gap-1.5',
          selected === 'pre-tge'
            ? 'bg-amber-500/20 text-amber-400 shadow-sm border border-amber-500/30'
            : 'text-white/50 hover:text-white hover:bg-white/5'
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        Pre-TGE
      </button>
    </div>
  );
};

export default TokenStatusToggle;
