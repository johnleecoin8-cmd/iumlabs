export interface SectionHeaderProps {
  number?: string;
  title: string;
}

const SectionHeader = ({ number, title }: SectionHeaderProps) => {
  return (
    <div className="px-4 md:px-10 pt-6 md:pt-8 pb-4 md:pb-6">
      <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">
        {number && `${number} — `}{title}
      </span>
    </div>
  );
};

export default SectionHeader;
