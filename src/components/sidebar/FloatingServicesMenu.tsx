import { useState, useCallback, useRef, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Briefcase, ChevronDown, Target, Users, Share2, Mic2, Megaphone, Newspaper } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// Services submenu data
const servicesSubMenu = [
  { name: "GTM Strategy", href: "/services/gtm", icon: Target },
  { name: "Community", href: "/services/community", icon: Users },
  { name: "Social Media", href: "/services/social-media", icon: Share2 },
  { name: "Influencer", href: "/services/influencer", icon: Mic2 },
  { name: "Yap Service", href: "/services/yap", icon: Megaphone },
  { name: "PR/Media", href: "/services/pr", icon: Newspaper },
];

interface FloatingServicesMenuProps {
  isActive: boolean;
  isCollapsed: boolean;
  isOpen: boolean;
  onToggle: () => void;
  currentPath: string;
}

const FloatingServicesMenu = ({ isActive, isCollapsed, isOpen, onToggle, currentPath }: FloatingServicesMenuProps) => {
  const [showPopover, setShowPopover] = useState(false);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const hasActiveSubItem = servicesSubMenu.some(item => currentPath === item.href);
  const isServicesActive = isActive || hasActiveSubItem;

  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.35;
    const deltaY = (e.clientY - centerY) * 0.35;
    
    setMagneticOffset({ x: deltaX, y: deltaY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMagneticOffset({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  // Collapsed view with popover
  if (isCollapsed) {
    return (
      <div 
        ref={containerRef}
        className="relative"
        onMouseEnter={() => { setShowPopover(true); setIsHovered(true); }}
        onMouseLeave={() => { setShowPopover(false); handleMouseLeave(); }}
        onMouseMove={handleMouseMove}
      >
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button
              className={cn(
                "group relative flex items-center justify-center w-12 h-12 rounded-2xl overflow-hidden transition-all duration-200",
                isServicesActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
              style={{
                transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px) ${isHovered ? 'scale(1.02)' : 'scale(1)'}`,
                transition: isHovered 
                  ? 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
                  : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              {isServicesActive && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/25 via-primary/15 to-transparent rounded-2xl animate-neon-pulse" />
                  <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_hsl(var(--primary)/0.15)]" />
                </>
              )}
              <div className={cn(
                "absolute inset-0 rounded-2xl transition-all duration-300",
                !isServicesActive && "bg-transparent",
                isHovered && !isServicesActive && "bg-secondary/60 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
              )} />
              {isServicesActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full shadow-[0_0_15px_hsl(var(--primary)),0_0_30px_hsl(var(--primary)/0.5)]" />
              )}
              <Briefcase 
                className={cn(
                  "relative z-10 w-5 h-5 transition-all duration-300",
                  isServicesActive && "text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]",
                  isHovered && "scale-110"
                )}
                style={{
                  transform: isHovered ? `perspective(500px) rotateX(${magneticOffset.y * -0.3}deg) rotateY(${magneticOffset.x * 0.3}deg)` : 'none',
                }}
              />
              {isServicesActive && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_hsl(var(--primary)),0_0_20px_hsl(var(--primary)/0.5)]" />
              )}
            </button>
          </TooltipTrigger>
          {!showPopover && (
            <TooltipContent 
              side="right" 
              sideOffset={16}
              className="bg-foreground text-background text-xs font-medium px-3 py-1.5 rounded-xl shadow-xl border-0"
            >
              Services
            </TooltipContent>
          )}
        </Tooltip>

        {/* Floating Popover submenu */}
        <div className={cn(
          "absolute left-full top-0 ml-4 w-52 py-3 px-2 rounded-2xl",
          "bg-background/90 backdrop-blur-2xl border border-border/30",
          "shadow-[0_8px_40px_rgba(0,0,0,0.25),0_0_60px_hsl(var(--primary)/0.08)]",
          "transition-all duration-300 origin-left",
          showPopover 
            ? "opacity-100 scale-100 translate-x-0" 
            : "opacity-0 scale-95 -translate-x-3 pointer-events-none"
        )}>
          {/* Top highlight line */}
          <div className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          
          <div className="mb-2 px-3">
            <span className="text-[10px] text-muted-foreground/60 font-medium tracking-[0.15em] uppercase">
              Services
            </span>
          </div>
          <div className="space-y-1">
            {servicesSubMenu.map((item) => {
              const isItemActive = currentPath === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                    isItemActive 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <item.icon className={cn(
                    "w-4 h-4 transition-all duration-200",
                    isItemActive ? "text-primary drop-shadow-[0_0_6px_hsl(var(--primary))]" : "group-hover:scale-105"
                  )} />
                  <span className="text-[13px] font-medium">{item.name}</span>
                  {isItemActive && (
                    <span className="absolute right-2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))]" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Expanded view with dropdown
  return (
    <div 
      ref={containerRef}
      className="w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      <button
        onClick={onToggle}
        className={cn(
          "group relative flex items-center w-full px-4 py-3 gap-3 rounded-2xl overflow-hidden transition-all duration-200",
          isServicesActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
        style={{
          transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px) ${isHovered ? 'scale(1.01)' : 'scale(1)'}`,
          transition: isHovered 
            ? 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
            : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {isServicesActive && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/25 via-primary/15 to-transparent rounded-2xl animate-neon-pulse" />
            <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_hsl(var(--primary)/0.15)]" />
          </>
        )}
        <div className={cn(
          "absolute inset-0 rounded-2xl transition-all duration-300",
          !isServicesActive && "bg-transparent",
          isHovered && !isServicesActive && "bg-secondary/60 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
        )} />
        {isServicesActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full shadow-[0_0_15px_hsl(var(--primary)),0_0_30px_hsl(var(--primary)/0.5)]" />
        )}
        
        <div 
          className={cn(
            "relative z-10 flex items-center justify-center w-5 h-5 transition-all duration-300",
            isServicesActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
          )}
          style={{
            transform: isHovered ? `perspective(500px) rotateX(${magneticOffset.y * -0.3}deg) rotateY(${magneticOffset.x * 0.3}deg)` : 'none',
          }}
        >
          <Briefcase className={cn(
            "w-[18px] h-[18px] transition-all duration-300",
            isServicesActive && "drop-shadow-[0_0_8px_hsl(var(--primary))]",
            isHovered && "scale-110"
          )} />
        </div>
        
        <span className={cn(
          "relative z-10 flex-1 text-left text-sm font-medium tracking-wide transition-all duration-300",
          isServicesActive && "text-foreground"
        )}>
          Services
        </span>
        
        <ChevronDown className={cn(
          "relative z-10 w-4 h-4 text-muted-foreground transition-transform duration-300",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Dropdown submenu */}
      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-out",
        isOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
      )}>
        <div className="ml-4 pl-4 border-l border-primary/20 space-y-1 py-1">
          {servicesSubMenu.map((item) => {
            const isItemActive = currentPath === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200",
                  isItemActive 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                )}
              >
                <item.icon className={cn(
                  "w-4 h-4 transition-all duration-200",
                  isItemActive ? "text-primary drop-shadow-[0_0_6px_hsl(var(--primary))]" : "group-hover:scale-105"
                )} />
                <span className="text-[13px] font-medium">{item.name}</span>
                {isItemActive && (
                  <span className="absolute right-2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))]" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FloatingServicesMenu;
