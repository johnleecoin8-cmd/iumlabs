import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export type DateRange = '24H' | '7D' | '14D' | '30D' | '90D';

interface PeriodFilterProps {
  selected: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

const periods: { value: DateRange; label: string }[] = [
  { value: '24H', label: '24H' },
  { value: '7D', label: '7D' },
  { value: '30D', label: '30D' },
  { value: '90D', label: '3M' },
];

const PeriodFilter = ({ selected, onChange, className }: PeriodFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => onChange(period.value)}
          className={cn(
            'px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200',
            selected === period.value
              ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
              : 'text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent'
          )}
        >
          {period.label}
        </button>
      ))}
      
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1',
            'text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent'
          )}
        >
          Other
          <ChevronDown className={cn('w-3 h-3 transition-transform duration-200', isOpen && 'rotate-180')} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full right-0 mt-1 py-1 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-xl z-50 min-w-[100px] backdrop-blur-xl">
            <button
              onClick={() => {
                onChange('14D');
                setIsOpen(false);
              }}
              className={cn(
                "w-full px-3 py-2 text-xs text-left transition-colors",
                selected === '14D' 
                  ? 'text-teal-400 bg-teal-500/10' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              )}
            >
              14 Days
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeriodFilter;
