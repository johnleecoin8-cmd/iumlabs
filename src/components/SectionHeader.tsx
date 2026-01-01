import TextMorphNumber from "./TextMorphNumber";

interface SectionHeaderProps {
  number: string;
  title: string;
  badge?: string;
  accentColor?: string;
  enableMorph?: boolean;
}

const SectionHeader = ({ number, title, badge, accentColor, enableMorph = true }: SectionHeaderProps) => {
  return (
    <div className="flex items-baseline justify-between p-6 md:px-10 lg:px-12 md:py-7 border-b border-white/15">
      <div className="flex items-baseline gap-6 md:gap-10">
        {enableMorph ? (
          <TextMorphNumber 
            number={number}
            className="text-label font-mono tracking-widest"
            style={{ color: accentColor ? accentColor : 'rgba(255,255,255,0.4)' }}
          />
        ) : (
          <span 
            className="text-label font-mono tracking-widest"
            style={{ color: accentColor ? accentColor : 'rgba(255,255,255,0.4)' }}
          >
            {number}
          </span>
        )}
        <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight">{title}</h2>
      </div>
      {badge && (
        <span 
          className="text-caption tracking-wider hidden sm:block px-4 py-1.5 border rounded-full font-medium"
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
