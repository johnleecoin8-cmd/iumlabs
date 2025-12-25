import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// Services submenu data
const servicesSubMenu = [
  { name: "GTM Strategy", href: "/services/gtm" },
  { name: "Community", href: "/services/community" },
  { name: "Social Media", href: "/services/social-media" },
  { name: "Influencer", href: "/services/influencer" },
  { name: "Yap Service", href: "/services/yap" },
  { name: "PR/Media", href: "/services/pr" },
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
                "group relative flex items-center justify-center py-2.5 px-2 transition-all duration-300",
                isServicesActive ? "text-white" : "text-white/40 hover:text-white"
              )}
            >
              <span className="text-sm font-medium">S</span>
              
              {/* Underline for active */}
              {isServicesActive && (
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-px bg-white/60" />
              )}
            </button>
          </TooltipTrigger>
          {!showPopover && (
            <TooltipContent 
              side="right" 
              sideOffset={12}
              className="bg-white text-black text-xs font-medium px-3 py-1.5 rounded-lg border-0"
            >
              Services
            </TooltipContent>
          )}
        </Tooltip>

        {/* Floating Popover submenu */}
        <div className={cn(
          "absolute left-full top-0 ml-6 w-44 py-4 px-4 rounded-xl",
          "bg-black/90 backdrop-blur-xl border border-white/10",
          "transition-all duration-300 origin-left",
          showPopover 
            ? "opacity-100 scale-100 translate-x-0" 
            : "opacity-0 scale-95 -translate-x-2 pointer-events-none"
        )}>
          <div className="mb-3">
            <span className="text-[9px] text-white/30 font-medium tracking-[0.2em] uppercase">
              Services
            </span>
          </div>
          <div className="space-y-0.5">
            {servicesSubMenu.map((item) => {
              const isItemActive = currentPath === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "group/item relative flex items-center gap-2 py-2 transition-all duration-300",
                    isItemActive 
                      ? "text-white" 
                      : "text-white/40 hover:text-white"
                  )}
                >
                  <span className="text-[13px] font-medium">
                    {item.name}
                  </span>
                  
                  {/* Arrow on hover */}
                  <span className={cn(
                    "text-[10px] transition-all duration-300",
                    isItemActive 
                      ? "opacity-100 text-white/50" 
                      : "opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                  )}>
                    →
                  </span>
                  
                  {/* Underline */}
                  <span className={cn(
                    "absolute bottom-1 left-0 h-px bg-white/50 transition-all duration-300 origin-left",
                    isItemActive ? "w-5" : "w-0 group-hover/item:w-6"
                  )} />
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
          "group relative flex items-center w-full py-2.5 gap-2 transition-all duration-300",
          isServicesActive ? "text-white" : "text-white/40 hover:text-white"
        )}
      >
        <span className="text-sm font-medium">
          Services
        </span>
        
        <ChevronDown className={cn(
          "w-3.5 h-3.5 text-white/30 transition-all duration-300",
          isOpen && "rotate-180",
          "group-hover:text-white/60"
        )} />
        
        {/* Arrow indicator */}
        <span className={cn(
          "text-xs transition-all duration-300 ml-auto",
          isServicesActive 
            ? "opacity-100 text-white/60" 
            : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-white/40"
        )}>
          →
        </span>
        
        {/* Underline animation */}
        <span className={cn(
          "absolute bottom-1.5 left-0 h-px bg-white/60 transition-all duration-300 origin-left",
          isServicesActive 
            ? "w-6" 
            : "w-0 group-hover:w-8"
        )} />
      </button>

      {/* Dropdown submenu */}
      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-out",
        isOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
      )}>
        <div className="pl-4 border-l border-white/10 space-y-0.5 py-1">
          {servicesSubMenu.map((item) => {
            const isItemActive = currentPath === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "group/item relative flex items-center gap-2 py-2 transition-all duration-300",
                  isItemActive 
                    ? "text-white" 
                    : "text-white/40 hover:text-white"
                )}
              >
                <span className="text-[13px] font-medium">
                  {item.name}
                </span>
                
                {/* Arrow on hover */}
                <span className={cn(
                  "text-[10px] transition-all duration-300",
                  isItemActive 
                    ? "opacity-100 text-white/50" 
                    : "opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                )}>
                  →
                </span>
                
                {/* Underline */}
                <span className={cn(
                  "absolute bottom-1 left-0 h-px bg-white/50 transition-all duration-300 origin-left",
                  isItemActive ? "w-4" : "w-0 group-hover/item:w-5"
                )} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FloatingServicesMenu;