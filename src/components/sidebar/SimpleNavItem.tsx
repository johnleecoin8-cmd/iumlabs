import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ElementType } from "react";

interface SimpleNavItemProps {
  to: string;
  label: string;
  icon?: ElementType;
  isActive: boolean;
  isCollapsed: boolean;
}

const SimpleNavItem = ({ to, label, icon: Icon, isActive, isCollapsed }: SimpleNavItemProps) => {
  const content = (
    <Link
      to={to}
      className={cn(
        "group relative flex items-center gap-3 py-2.5 transition-all duration-300",
        isCollapsed ? "justify-center px-2" : "px-0"
      )}
    >
      {/* Icon for collapsed state, Text for expanded */}
      {isCollapsed ? (
        Icon && (
          <Icon className={cn(
            "w-4 h-4 transition-all duration-300",
            isActive 
              ? "text-white" 
              : "text-white/40 group-hover:text-white"
          )} />
        )
      ) : (
        <span className={cn(
          "text-sm font-medium transition-all duration-300",
          isActive 
            ? "text-white" 
            : "text-white/40 group-hover:text-white"
        )}>
          {label}
        </span>
      )}
      
      {/* Arrow indicator - appears on hover/active (only when expanded) */}
      {!isCollapsed && (
        <span className={cn(
          "text-xs transition-all duration-300",
          isActive 
            ? "opacity-100 translate-x-0 text-white/60" 
            : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-white/40"
        )}>
          →
        </span>
      )}
      
      {/* Underline animation */}
      <span className={cn(
        "absolute bottom-1.5 h-px bg-white/60 transition-all duration-300 origin-left",
        isCollapsed ? "left-1/2 -translate-x-1/2" : "left-0",
        isActive 
          ? isCollapsed ? "w-4" : "w-6"
          : isCollapsed ? "w-0 group-hover:w-4" : "w-0 group-hover:w-8"
      )} />
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
          sideOffset={12}
          className="bg-white text-black text-xs font-medium px-3 py-1.5 rounded-lg border-0"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
};

export default SimpleNavItem;