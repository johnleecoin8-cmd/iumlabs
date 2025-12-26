import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
    <Link to={to} className="block w-full">
      <motion.div
        className={cn(
          "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300",
          isActive 
            ? "bg-white/[0.06] border border-white/[0.1]" 
            : "bg-transparent border border-transparent hover:bg-white/[0.04] hover:border-white/[0.06]",
          isCollapsed && "justify-center px-2"
        )}
        whileHover={{ scale: 1.02, x: isCollapsed ? 0 : 2 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Icon - Always visible */}
        {Icon && (
          <Icon className={cn(
            "w-4 h-4 transition-all duration-300 flex-shrink-0",
            isActive 
              ? "text-primary" 
              : "text-white/40 group-hover:text-white/80"
          )} />
        )}
        
        {/* Label - Only when expanded */}
        {!isCollapsed && (
          <span className={cn(
            "text-sm font-medium transition-all duration-300",
            isActive 
              ? "text-white" 
              : "text-white/50 group-hover:text-white"
          )}>
            {label}
          </span>
        )}
        
        {/* Arrow indicator - appears on hover/active (only when expanded) */}
        {!isCollapsed && (
          <span className={cn(
            "text-xs transition-all duration-300 ml-auto",
            isActive 
              ? "opacity-100 translate-x-0 text-primary/60" 
              : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-white/40"
          )}>
            →
          </span>
        )}
        
        {/* Active glow effect */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-primary/5"
            layoutId="activeNavGlow"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </motion.div>
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
          className="bg-black/80 backdrop-blur-xl text-white text-xs font-medium px-3 py-1.5 rounded-xl border border-white/10"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
};

export default SimpleNavItem;