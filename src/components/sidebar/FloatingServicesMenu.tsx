import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Briefcase } from "lucide-react";
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
            <motion.button
              className={cn(
                "group relative flex items-center justify-center p-2.5 rounded-xl transition-all duration-300",
                isServicesActive 
                  ? "bg-white/[0.06] border border-white/[0.1] text-primary" 
                  : "bg-transparent border border-transparent hover:bg-white/[0.04] hover:border-white/[0.06] text-white/40 hover:text-white/80"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Briefcase className="w-4 h-4" />
              
              {/* Active glow */}
              {isServicesActive && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-primary/5"
                  layoutId="activeNavGlow"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          </TooltipTrigger>
          {!showPopover && (
            <TooltipContent 
              side="right" 
              sideOffset={12}
              className="bg-black/80 backdrop-blur-xl text-white text-xs font-medium px-3 py-1.5 rounded-xl border border-white/10"
            >
              Services
            </TooltipContent>
          )}
        </Tooltip>

        {/* Floating Popover submenu - Glass card style */}
        <AnimatePresence>
          {showPopover && (
            <motion.div 
              className="absolute left-full top-0 ml-6 w-48 py-4 px-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/[0.08]"
              initial={{ opacity: 0, scale: 0.95, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="mb-3">
                <span className="text-[9px] text-white/30 font-medium tracking-[0.2em] uppercase">
                  Services
                </span>
              </div>
              <div className="space-y-1">
                {servicesSubMenu.map((item, index) => {
                  const isItemActive = currentPath === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                    >
                      <Link
                        to={item.href}
                        className={cn(
                          "group/item relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300",
                          isItemActive 
                            ? "bg-white/[0.06] border border-white/[0.08] text-white" 
                            : "border border-transparent text-white/50 hover:text-white hover:bg-white/[0.04] hover:border-white/[0.06]"
                        )}
                      >
                        <span className="text-[13px] font-medium">
                          {item.name}
                        </span>
                        
                        {/* Arrow on hover */}
                        <span className={cn(
                          "text-[10px] transition-all duration-300 ml-auto",
                          isItemActive 
                            ? "opacity-100 text-primary/60" 
                            : "opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                        )}>
                          →
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Expanded view with dropdown
  return (
    <div className="w-full">
      <motion.button
        onClick={onToggle}
        className={cn(
          "group relative flex items-center w-full gap-3 px-3 py-2.5 rounded-xl transition-all duration-300",
          isServicesActive 
            ? "bg-white/[0.06] border border-white/[0.1]" 
            : "bg-transparent border border-transparent hover:bg-white/[0.04] hover:border-white/[0.06]"
        )}
        whileHover={{ scale: 1.02, x: 2 }}
        whileTap={{ scale: 0.98 }}
      >
        <Briefcase className={cn(
          "w-4 h-4 flex-shrink-0 transition-colors duration-300",
          isServicesActive ? "text-primary" : "text-white/40 group-hover:text-white/80"
        )} />
        
        <span className={cn(
          "text-sm font-medium transition-colors duration-300",
          isServicesActive ? "text-white" : "text-white/50 group-hover:text-white"
        )}>
          Services
        </span>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-auto"
        >
          <ChevronDown className={cn(
            "w-3.5 h-3.5 transition-colors duration-300",
            isServicesActive ? "text-white/50" : "text-white/30 group-hover:text-white/60"
          )} />
        </motion.div>
        
        {/* Active glow */}
        {isServicesActive && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-primary/5"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </motion.button>

      {/* Dropdown submenu - Glass style */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="overflow-hidden mt-2 ml-2 pl-3 border-l border-white/[0.08]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="space-y-1 py-1">
              {servicesSubMenu.map((item, index) => {
                const isItemActive = currentPath === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                  >
                    <Link
                      to={item.href}
                      className={cn(
                        "group/item relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300",
                        isItemActive 
                          ? "bg-white/[0.06] border border-white/[0.08] text-white" 
                          : "border border-transparent text-white/50 hover:text-white hover:bg-white/[0.04] hover:border-white/[0.06]"
                      )}
                    >
                      <span className="text-[13px] font-medium">
                        {item.name}
                      </span>
                      
                      {/* Arrow on hover */}
                      <span className={cn(
                        "text-[10px] transition-all duration-300 ml-auto",
                        isItemActive 
                          ? "opacity-100 text-primary/60" 
                          : "opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                      )}>
                        →
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingServicesMenu;