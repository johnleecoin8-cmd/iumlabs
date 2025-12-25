import { useState } from "react";
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
  
  const hasActiveSubItem = servicesSubMenu.some(item => currentPath === item.href);
  const isServicesActive = isActive || hasActiveSubItem;

  // Collapsed view with popover
  if (isCollapsed) {
    return (
      <div 
        className="relative"
        onMouseEnter={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
      >
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button
              className={cn(
                "group relative flex items-center justify-center w-12 h-12 rounded-2xl overflow-hidden transition-all duration-200",
                isServicesActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                !isServicesActive && "hover:bg-secondary/60"
              )}
            >
              {isServicesActive && (
                <>
                  <div className="absolute inset-0 bg-primary/15 rounded-2xl" />
                </>
              )}
              {isServicesActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full" />
              )}
              <Briefcase 
                className={cn(
                  "relative z-10 w-5 h-5 transition-colors duration-200",
                  isServicesActive && "text-primary"
                )}
              />
              {isServicesActive && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
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
          "shadow-[0_8px_40px_rgba(0,0,0,0.25)]",
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
                    "w-4 h-4 transition-colors duration-200",
                    isItemActive && "text-primary"
                  )} />
                  <span className="text-[13px] font-medium">{item.name}</span>
                  {isItemActive && (
                    <span className="absolute right-2 w-1.5 h-1.5 bg-primary rounded-full" />
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
    <div className="w-full">
      <button
        onClick={onToggle}
        className={cn(
          "group relative flex items-center w-full px-4 py-3 gap-3 rounded-2xl overflow-hidden transition-all duration-200",
          isServicesActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          !isServicesActive && "hover:bg-secondary/60"
        )}
      >
        {isServicesActive && (
          <div className="absolute inset-0 bg-primary/15 rounded-2xl" />
        )}
        {isServicesActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full" />
        )}
        
        <div 
          className={cn(
            "relative z-10 flex items-center justify-center w-5 h-5 transition-colors duration-200",
            isServicesActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
          )}
        >
          <Briefcase className="w-[18px] h-[18px]" />
        </div>
        
        <span className={cn(
          "relative z-10 flex-1 text-left text-sm font-medium tracking-wide transition-colors duration-200",
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
                  "w-4 h-4 transition-colors duration-200",
                  isItemActive && "text-primary"
                )} />
                <span className="text-[13px] font-medium">{item.name}</span>
                {isItemActive && (
                  <span className="absolute right-2 w-1.5 h-1.5 bg-primary rounded-full" />
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
