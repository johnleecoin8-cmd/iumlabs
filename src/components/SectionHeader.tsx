import TextMorphNumber from "./TextMorphNumber";

export interface SectionHeaderProps {
  number?: string;
  title: string;
  badge?: string;
  accentColor?: string;
  enableMorph?: boolean;
}

const SectionHeader = ({ number, title, badge, accentColor, enableMorph = true }: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-3 py-3 sm:p-4 md:px-8 lg:px-10 md:py-5 border-b border-white/15">
      <div className="flex items-center gap-3 sm:gap-6 md:gap-10">
        {number && (
          enableMorph ? (
            <TextMorphNumber 
              number={number}
              className="text-[10px] sm:text-label font-mono tracking-widest"
              style={{ color: accentColor ? accentColor : 'rgba(255,255,255,0.4)' }}
            />
          ) : (
            <span 
              className="text-[10px] sm:text-label font-mono tracking-widest"
              style={{ color: accentColor ? accentColor : 'rgba(255,255,255,0.4)' }}
            >
              {number}
            </span>
          )
        )}
        <h2 className="text-base sm:text-xl md:text-2xl font-semibold text-white tracking-tight">{title}</h2>
      </div>
      {badge && (
        <span 
          className="text-[9px] sm:text-caption tracking-wider hidden sm:block px-2.5 sm:px-4 py-1 sm:py-1.5 border rounded-full font-medium"
          style={{ 
            color: accentColor ? accentColor : 'rgba(255,255,255,0.6)',
            borderColor: accentColor ? `${accentColor}50` : 'rgba(255,255,255,0.25)'
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
};

export default SectionHeader;
