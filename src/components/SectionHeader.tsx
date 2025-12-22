import { motion } from "framer-motion";

interface SectionHeaderProps {
  number: string;
  title: string;
  badge?: string;
  accentColor?: string;
}

const SectionHeader = ({ number, title, badge, accentColor }: SectionHeaderProps) => {
  return (
    <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
      <div className="flex items-baseline gap-6 md:gap-10">
        <span 
          className="text-[10px] md:text-xs font-mono tracking-widest"
          style={{ color: accentColor ? accentColor : 'rgba(255,255,255,0.3)' }}
        >
          {number}
        </span>
        <h2 className="text-lg md:text-xl font-medium text-white">{title}</h2>
      </div>
      {badge && (
        <span 
          className="text-xs tracking-wider hidden sm:block px-3 py-1 border rounded-full"
          style={{ 
            color: accentColor ? accentColor : 'rgba(255,255,255,0.5)',
            borderColor: accentColor ? `${accentColor}40` : 'rgba(255,255,255,0.2)'
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
};

export default SectionHeader;
