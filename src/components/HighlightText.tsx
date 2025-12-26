import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HighlightTextProps {
  children: React.ReactNode;
  variant?: "sweep" | "underline" | "both";
  delay?: number;
  className?: string;
  highlightColor?: string;
}

const HighlightText = ({
  children,
  variant = "both",
  delay = 0,
  className,
  highlightColor,
}: HighlightTextProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "-50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const variantClasses = {
    sweep: "highlight-sweep",
    underline: "highlight-underline",
    both: "highlight-sweep highlight-underline",
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block",
        variantClasses[variant],
        isVisible && "is-visible",
        className
      )}
      style={highlightColor ? { "--highlight-color": highlightColor } as React.CSSProperties : undefined}
    >
      {children}
    </span>
  );
};

export default HighlightText;
