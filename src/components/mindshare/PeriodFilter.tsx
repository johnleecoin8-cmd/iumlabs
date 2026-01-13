import { cn } from '@/lib/utils';

export type DateRange = '24H' | '7D' | '14D' | '30D' | '90D';

interface PeriodFilterProps {
  selected: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

const periods: { value: DateRange; label: string }[] = [
  { value: '24H', label: '24H' },
  { value: '7D', label: '7D' },
  { value: '14D', label: '14D' },
  { value: '30D', label: '30D' },
  { value: '90D', label: '90D' },
];

const PeriodFilter = ({ selected, onChange, className }: PeriodFilterProps) => {
  return (
    <div className={cn('flex items-center gap-1 p-1 bg-white/5 rounded-lg', className)}>
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => onChange(period.value)}
          className={cn(
            'px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200',
            selected === period.value
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-white/50 hover:text-white hover:bg-white/10'
          )}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
};

export default PeriodFilter;
