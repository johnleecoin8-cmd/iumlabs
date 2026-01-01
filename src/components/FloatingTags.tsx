interface FloatingTag {
  label: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  // Mobile positions (optional overrides)
  mobileTop?: string;
  mobileLeft?: string;
  mobileRight?: string;
  mobileBottom?: string;
}

interface FloatingTagsProps {
  tags: FloatingTag[];
}

const FloatingTags = ({ tags }: FloatingTagsProps) => {
  return (
    <>
      {tags.map((tag, index) => (
        <span
          key={tag.label}
          className="lunar-tag-dark absolute animate-float text-caption px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-md"
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
            bottom: tag.bottom,
            animationDelay: `${index * 0.5}s`,
          }}
        >
          {tag.label}
        </span>
      ))}
    </>
  );
};

export default FloatingTags;