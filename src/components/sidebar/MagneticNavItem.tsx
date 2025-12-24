import { useState, useCallback, useRef, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface MagneticNavItemProps {
  icon: React.ElementType;
  to: string;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  index: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

const MagneticNavItem = ({ icon: Icon, to, label, isActive, isCollapsed, index }: MagneticNavItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showRipple, setShowRipple] = useState(false);
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleClick = useCallback((e: MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Trigger ripple
    setRipplePos({ x, y });
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);
    
    // Create particles
    const newParticles: Particle[] = [];
    for (let i = 0; i < 6; i++) {
      newParticles.push({
        id: particleIdRef.current++,
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
    
    // Clean up particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 600);
  }, []);

  const content = (
    <div
      ref={containerRef}
      className="relative"
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ 
        animationDelay: `${index * 80}ms`,
      }}
    >
      <Link
        to={to}
        onClick={handleClick}
        className={cn(
          "group relative flex items-center rounded-2xl overflow-hidden",
          "transition-all duration-200",
          isCollapsed ? "w-12 h-12 justify-center" : "w-full px-4 py-3 gap-3"
        )}
        style={{
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform 0.2s ease-out',
        }}
      >
        {/* Active Background Glow with neon pulse */}
        {isActive && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/25 via-primary/15 to-transparent rounded-2xl animate-neon-pulse" />
            <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_hsl(var(--primary)/0.15)]" />
          </>
        )}
        
        {/* Hover Background */}
        <div className={cn(
          "absolute inset-0 rounded-2xl transition-all duration-300",
          !isActive && "bg-transparent",
          isHovered && !isActive && "bg-secondary/60 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
        )} />
        
        {/* Active Indicator Line with glow */}
        {isActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full shadow-[0_0_15px_hsl(var(--primary)),0_0_30px_hsl(var(--primary)/0.5)]" />
        )}
        
        {/* Icon Container */}
        <div 
          className={cn(
            "relative z-10 flex items-center justify-center transition-all duration-300",
            isCollapsed ? "" : "w-5 h-5",
            isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
          )}
        >
          <Icon 
            className={cn(
              "transition-all duration-300",
              isCollapsed ? "w-5 h-5" : "w-[18px] h-[18px]",
              isActive && "drop-shadow-[0_0_8px_hsl(var(--primary))]",
              isHovered && "scale-110"
            )} 
          />
        </div>
        
        {/* Label */}
        {!isCollapsed && (
          <span className={cn(
            "relative z-10 text-sm font-medium tracking-wide transition-all duration-300",
            isActive ? "text-foreground" : "group-hover:text-foreground"
          )}>
            {label}
          </span>
        )}
        
        {/* Active dot indicator for collapsed */}
        {isCollapsed && isActive && (
          <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_hsl(var(--primary)),0_0_20px_hsl(var(--primary)/0.5)]" />
        )}

        {/* Ripple effect */}
        {showRipple && (
          <span
            className="absolute rounded-full bg-primary/30 animate-ripple-out pointer-events-none"
            style={{
              left: ripplePos.x - 10,
              top: ripplePos.y - 10,
              width: 20,
              height: 20,
            }}
          />
        )}

        {/* Particles */}
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="absolute w-1.5 h-1.5 bg-primary rounded-full animate-particle-float pointer-events-none"
            style={{
              left: particle.x,
              top: particle.y,
            }}
          />
        ))}
      </Link>
    </div>
  );

  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent 
          side="right" 
          sideOffset={16}
          className="bg-foreground text-background text-xs font-medium px-3 py-1.5 rounded-xl shadow-xl border-0"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
};

export default MagneticNavItem;
