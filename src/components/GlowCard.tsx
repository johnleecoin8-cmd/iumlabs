import { useRef, useState, ReactNode, MouseEvent } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: "low" | "medium" | "high";
  tiltEnabled?: boolean;
  hoverScale?: number;
  borderGlow?: boolean;
}

const intensityConfig = {
  low: {
    glowOpacity: 0.1,
    shadowBlur: 40,
    borderOpacity: 0.1,
  },
  medium: {
    glowOpacity: 0.2,
    shadowBlur: 60,
    borderOpacity: 0.2,
  },
  high: {
    glowOpacity: 0.3,
    shadowBlur: 80,
    borderOpacity: 0.3,
  },
};

const GlowCard = ({
  children,
  className = "",
  glowColor = "hsl(217, 91%, 60%)",
  intensity = "medium",
  tiltEnabled = true,
  hoverScale = 1.02,
  borderGlow = true,
}: GlowCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [tiltStyle, setTiltStyle] = useState({});

  const config = intensityConfig[intensity];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });

    if (tiltEnabled) {
      const tiltX = (y - 0.5) * 10;
      const tiltY = (x - 0.5) * -10;
      
      setTiltStyle({
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${hoverScale})`,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
    });
  };

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-300 ease-out ${className}`}
      style={{
        ...tiltStyle,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect layer */}
      <div
        className="absolute inset-0 rounded-inherit pointer-events-none transition-opacity duration-300 -z-10"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${glowColor.replace(")", `, ${config.glowOpacity})`)}, transparent 60%)`,
          filter: `blur(${config.shadowBlur}px)`,
          opacity: isHovered ? 1 : 0,
          borderRadius: "inherit",
        }}
      />

      {/* Border glow layer */}
      {borderGlow && (
        <div
          className="absolute inset-0 rounded-inherit pointer-events-none transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${glowColor.replace(")", `, ${config.borderOpacity * (isHovered ? 2 : 0)})`)} 0%, transparent 50%, ${glowColor.replace(")", `, ${config.borderOpacity * (isHovered ? 1 : 0)})`)} 100%)`,
            padding: "1px",
            borderRadius: "inherit",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}

      {/* Shine sweep effect */}
      <div
        className="absolute inset-0 rounded-inherit overflow-hidden pointer-events-none"
        style={{ borderRadius: "inherit" }}
      >
        <div
          className="absolute inset-0 transition-transform duration-700"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${glowColor.replace(")", ", 0.1)")} 45%, ${glowColor.replace(")", ", 0.15)")} 50%, ${glowColor.replace(")", ", 0.1)")} 55%, transparent 60%)`,
            transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
          }}
        />
      </div>

      {/* Content */}
      {children}
    </div>
  );
};

export default GlowCard;
