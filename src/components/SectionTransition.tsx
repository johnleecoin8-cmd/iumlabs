interface SectionTransitionProps {
  fromColor: string;
  toColor: string;
  height?: string;
}

const SectionTransition = ({ fromColor, toColor, height = "h-16" }: SectionTransitionProps) => {
  return (
    <div 
      className={`${height} w-full`}
      style={{
        background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`
      }}
    />
  );
};

export default SectionTransition;
