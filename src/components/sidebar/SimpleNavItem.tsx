import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SimpleNavItemProps {
  icon: React.ElementType;
  to: string;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SimpleNavItem = ({ icon: Icon, to, label, isActive, isCollapsed }: SimpleNavItemProps) => {
  const content = (
    <Link
      to={to}
      className={cn(
        "group relative flex items-center rounded-2xl overflow-hidden",
        "transition-all duration-200",
        isCollapsed ? "w-12 h-12 justify-center" : "w-full px-4 py-3 gap-3",
        !isActive && "hover:bg-secondary/60"
      )}
    >
      {/* Active Background Glow */}
      {isActive && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/25 via-primary/15 to-transparent rounded-2xl" />
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_hsl(var(--primary)/0.15)]" />
        </>
      )}
      
      {/* Active Indicator Line */}
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
            isActive && "drop-shadow-[0_0_8px_hsl(var(--primary))]"
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
    </Link>
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

export default SimpleNavItem;