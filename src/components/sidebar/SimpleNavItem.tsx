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
        "transition-all duration-300",
        isCollapsed ? "w-12 h-12 justify-center" : "w-full px-4 py-3 gap-3"
      )}
    >
      {/* Multi-layer glow background on hover */}
      <div className={cn(
        "absolute -inset-2 transition-all duration-700 rounded-2xl blur-2xl",
        isActive 
          ? "bg-gradient-to-r from-primary/30 via-[rgba(var(--gold-rgb),0.2)] to-primary/30 opacity-100" 
          : "bg-gradient-to-r from-primary/40 via-[rgba(var(--gold-rgb),0.3)] to-primary/40 opacity-0 group-hover:opacity-100"
      )} />
      
      {/* Inner glow layer */}
      <div className={cn(
        "absolute inset-0 transition-all duration-500 rounded-2xl blur-xl",
        isActive 
          ? "bg-primary/20 opacity-100" 
          : "bg-primary/30 opacity-0 group-hover:opacity-100"
      )} />
      
      {/* Hover background with gradient glow */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-500",
        isActive 
          ? "bg-primary/15 opacity-100" 
          : "bg-gradient-to-r from-secondary/0 via-secondary/60 to-secondary/0 opacity-0 group-hover:opacity-100"
      )} />
      
      {/* Active Indicator Line with enhanced glow */}
      {isActive && (
        <>
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full shadow-[0_0_12px_hsl(var(--primary)/0.6),0_0_24px_hsl(var(--primary)/0.4)]" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-6 bg-primary/40 blur-md" />
        </>
      )}
      
      {/* Icon Container with multi-layer glow effect */}
      <div 
        className={cn(
          "relative z-10 flex items-center justify-center transition-all duration-500",
          isCollapsed ? "" : "w-5 h-5"
        )}
      >
        {/* Outer icon glow */}
        <div className={cn(
          "absolute -inset-3 blur-xl scale-150 transition-all duration-700",
          isActive 
            ? "bg-gradient-to-r from-primary/50 to-[rgba(var(--gold-rgb),0.4)] opacity-100" 
            : "bg-gradient-to-r from-primary/50 to-[rgba(var(--gold-rgb),0.4)] opacity-0 group-hover:opacity-100"
        )} />
        
        {/* Inner icon glow */}
        <div className={cn(
          "absolute -inset-1 blur-lg transition-all duration-500",
          isActive 
            ? "bg-primary/60 opacity-100" 
            : "bg-primary/50 opacity-0 group-hover:opacity-100"
        )} />
        
        <Icon 
          className={cn(
            "relative transition-all duration-500",
            isCollapsed ? "w-5 h-5" : "w-[18px] h-[18px]",
            isActive 
              ? "text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.8)]" 
              : "text-muted-foreground group-hover:text-primary group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]"
          )} 
        />
      </div>
      
      {/* Label with slide effect and glow */}
      {!isCollapsed && (
        <span className={cn(
          "relative z-10 text-sm font-medium tracking-wide transition-all duration-300",
          isActive 
            ? "text-foreground drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" 
            : "text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5"
        )}>
          {label}
        </span>
      )}
      
      {/* Right edge glow line on hover - enhanced */}
      {!isActive && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 group-hover:h-1/2 transition-all duration-500 blur-[1px]" />
      )}
      
      {/* Active dot indicator for collapsed with enhanced glow */}
      {isCollapsed && isActive && (
        <>
          <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary)/0.8),0_0_16px_hsl(var(--primary)/0.6)]" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-3 bg-primary/40 blur-lg" />
        </>
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