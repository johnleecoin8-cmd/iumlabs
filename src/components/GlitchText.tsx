import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  glitchEnabled?: boolean;
}

const GlitchText = ({ 
  text, 
  className, 
  as: Component = 'span',
  glitchEnabled = true 
}: GlitchTextProps) => {
  if (!glitchEnabled) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component 
      className={cn("glitch-text", className)} 
      data-text={text}
    >
      {text}
    </Component>
  );
};

export default GlitchText;
