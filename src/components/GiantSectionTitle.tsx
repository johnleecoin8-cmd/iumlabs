import { useEffect, useRef, useState } from "react";

interface GiantSectionTitleProps {
  title: string;
  accentWord?: string;
  accentPosition?: "start" | "middle" | "end";
  size?: "lg" | "xl" | "2xl";
  theme?: "light" | "dark";
  animation?: "fade" | "split" | "reveal";
  className?: string;
  subtitle?: string;
  badge?: string;
}

const sizeClasses = {
  lg: "text-[10vw] md:text-[80px] lg:text-[100px]",
  xl: "text-[12vw] md:text-[100px] lg:text-[130px]",
  "2xl": "text-[15vw] md:text-[130px] lg:text-[160px]",
};

const GiantSectionTitle = ({
  title,
  accentWord,
  accentPosition = "middle",
  size = "xl",
  theme = "dark",
  animation = "reveal",
  className = "",
  subtitle,
  badge,
}: GiantSectionTitleProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Split title into parts for accent word styling
  const renderTitle = () => {
    if (!accentWord) {
      return (
        <span className="inline-block overflow-hidden">
          <span
            className={`inline-block transition-transform duration-700 ${
              isVisible ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {title}
          </span>
        </span>
      );
    }

    const parts = title.split(accentWord);
    
    return (
      <>
        {parts[0] && (
          <span className="inline-block overflow-hidden">
            <span
              className={`inline-block transition-transform duration-700 delay-100 ${
                isVisible ? "translate-y-0" : "translate-y-full"
              }`}
            >
              {parts[0]}
            </span>
          </span>
        )}
        <span className="inline-block overflow-hidden">
          <span
            className={`inline-block serif-italic transition-transform duration-700 delay-200 ${
              theme === "dark" ? "text-primary" : "text-primary"
            } ${isVisible ? "translate-y-0" : "translate-y-full"}`}
          >
            {accentWord}
          </span>
        </span>
        {parts[1] && (
          <span className="inline-block overflow-hidden">
            <span
              className={`inline-block transition-transform duration-700 delay-300 ${
                isVisible ? "translate-y-0" : "translate-y-full"
              }`}
            >
              {parts[1]}
            </span>
          </span>
        )}
      </>
    );
  };

  const textColor = theme === "dark" ? "text-white" : "text-[hsl(0,0%,8%)]";
  const subtitleColor = theme === "dark" ? "text-white/40" : "text-[hsl(0,0%,8%)]/40";
  const badgeStyle = theme === "dark" 
    ? "border-white/15 text-white/60" 
    : "border-[hsl(0,0%,8%)]/15 text-[hsl(0,0%,8%)]/60";

  return (
    <div ref={ref} className={`mb-12 md:mb-20 ${className}`}>
      {/* Badge */}
      {badge && (
        <div 
          className={`mb-6 transition-all duration-500 delay-0 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className={`px-4 py-2 rounded-full border text-sm ${badgeStyle}`}>
            {badge}
          </span>
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <span 
          className={`text-sm font-mono mb-4 block ${subtitleColor} transition-all duration-500 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {subtitle}
        </span>
      )}

      {/* Giant Title */}
      <h2
        className={`${sizeClasses[size]} font-light leading-[0.9] tracking-tight ${textColor}`}
      >
        {renderTitle()}
      </h2>

      {/* Decorative underline */}
      <div 
        className={`mt-6 h-px bg-gradient-to-r transition-all duration-1000 delay-500 ${
          theme === "dark" 
            ? "from-transparent via-white/20 to-transparent" 
            : "from-transparent via-[hsl(0,0%,8%)]/10 to-transparent"
        } ${isVisible ? "w-full opacity-100" : "w-0 opacity-0"}`}
      />
    </div>
  );
};

export default GiantSectionTitle;
