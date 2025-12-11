import { useMemo } from "react";

interface SectionBackgroundProps {
  type: "gradient-mesh" | "stars" | "aurora" | "particles" | "glow-orbs" | "grid";
  theme: "sun" | "saturn" | "earth" | "mars" | "nebula" | "neutral";
  intensity?: number;
  animated?: boolean;
  className?: string;
}

const themeColors = {
  sun: {
    primary: "hsl(35, 100%, 50%)",
    secondary: "hsl(45, 100%, 60%)",
    tertiary: "hsl(25, 90%, 45%)",
    glow: "hsl(40, 100%, 55%)",
  },
  saturn: {
    primary: "hsl(280, 70%, 55%)",
    secondary: "hsl(300, 60%, 50%)",
    tertiary: "hsl(260, 80%, 60%)",
    glow: "hsl(270, 75%, 60%)",
  },
  earth: {
    primary: "hsl(200, 80%, 50%)",
    secondary: "hsl(180, 70%, 45%)",
    tertiary: "hsl(220, 75%, 55%)",
    glow: "hsl(195, 85%, 50%)",
  },
  mars: {
    primary: "hsl(15, 85%, 50%)",
    secondary: "hsl(25, 80%, 55%)",
    tertiary: "hsl(5, 75%, 45%)",
    glow: "hsl(20, 90%, 55%)",
  },
  nebula: {
    primary: "hsl(300, 70%, 55%)",
    secondary: "hsl(180, 70%, 50%)",
    tertiary: "hsl(330, 65%, 50%)",
    glow: "hsl(270, 75%, 60%)",
  },
  neutral: {
    primary: "hsl(217, 91%, 60%)",
    secondary: "hsl(220, 80%, 55%)",
    tertiary: "hsl(210, 70%, 50%)",
    glow: "hsl(217, 85%, 65%)",
  },
};

const SectionBackground = ({
  type,
  theme,
  intensity = 0.5,
  animated = true,
  className = "",
}: SectionBackgroundProps) => {
  const colors = themeColors[theme];
  const opacityMultiplier = intensity;

  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    }));
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 30 + 10,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 8,
      shape: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)],
    }));
  }, []);

  const glowOrbs = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      size: 100 + Math.random() * 200,
      delay: Math.random() * 4,
    }));
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Gradient Mesh Background */}
      {type === "gradient-mesh" && (
        <div 
          className={`absolute inset-0 ${animated ? "animate-gradient-mesh" : ""}`}
          style={{
            background: `
              radial-gradient(ellipse at 20% 20%, ${colors.primary.replace(")", `, ${0.15 * opacityMultiplier})`)} 0%, transparent 50%),
              radial-gradient(ellipse at 80% 30%, ${colors.secondary.replace(")", `, ${0.12 * opacityMultiplier})`)} 0%, transparent 45%),
              radial-gradient(ellipse at 40% 80%, ${colors.tertiary.replace(")", `, ${0.1 * opacityMultiplier})`)} 0%, transparent 55%),
              radial-gradient(ellipse at 90% 90%, ${colors.primary.replace(")", `, ${0.08 * opacityMultiplier})`)} 0%, transparent 40%)
            `,
            backgroundSize: "200% 200%",
          }}
        />
      )}

      {/* Stars */}
      {type === "stars" && (
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className={`absolute rounded-full bg-white ${animated ? "animate-twinkle" : ""}`}
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                opacity: 0.3 * opacityMultiplier,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Aurora */}
      {type === "aurora" && (
        <div className={`absolute inset-0 ${animated ? "animate-aurora-bg" : ""}`}>
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(45deg, ${colors.primary.replace(")", `, ${0.15 * opacityMultiplier})`)} 0%, transparent 50%)`,
            }}
          />
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, transparent 50%, ${colors.secondary.replace(")", `, ${0.12 * opacityMultiplier})`)} 100%)`,
            }}
          />
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(225deg, ${colors.tertiary.replace(")", `, ${0.1 * opacityMultiplier})`)} 0%, transparent 60%)`,
            }}
          />
        </div>
      )}

      {/* Floating Particles */}
      {type === "particles" && (
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className={`absolute ${animated ? "animate-particle-float" : ""}`}
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                opacity: 0.1 * opacityMultiplier,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            >
              {particle.shape === "circle" && (
                <div 
                  className="w-full h-full rounded-full"
                  style={{ border: `1px solid ${colors.primary.replace(")", ", 0.3)")}` }}
                />
              )}
              {particle.shape === "square" && (
                <div 
                  className="w-full h-full rotate-45"
                  style={{ border: `1px solid ${colors.secondary.replace(")", ", 0.3)")}` }}
                />
              )}
              {particle.shape === "triangle" && (
                <div 
                  className="w-0 h-0"
                  style={{ 
                    borderLeft: `${particle.size / 2}px solid transparent`,
                    borderRight: `${particle.size / 2}px solid transparent`,
                    borderBottom: `${particle.size}px solid ${colors.tertiary.replace(")", ", 0.2)")}`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Glow Orbs */}
      {type === "glow-orbs" && (
        <div className="absolute inset-0">
          {glowOrbs.map((orb) => (
            <div
              key={orb.id}
              className={`absolute rounded-full blur-3xl ${animated ? "animate-glow-pulse" : ""}`}
              style={{
                left: orb.left,
                top: orb.top,
                width: orb.size,
                height: orb.size,
                background: colors.glow.replace(")", `, ${0.15 * opacityMultiplier})`),
                transform: "translate(-50%, -50%)",
                animationDelay: `${orb.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Grid Pattern */}
      {type === "grid" && (
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(${colors.primary.replace(")", `, ${0.03 * opacityMultiplier})`)} 1px, transparent 1px),
              linear-gradient(90deg, ${colors.primary.replace(")", `, ${0.03 * opacityMultiplier})`)} 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      )}
    </div>
  );
};

export default SectionBackground;
