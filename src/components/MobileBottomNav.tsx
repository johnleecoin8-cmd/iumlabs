import { Link, useLocation } from "react-router-dom";
import { Home, Briefcase, FolderOpen, BookOpen, Mail, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Briefcase, label: "Services", path: "/services/all" },
  { icon: FolderOpen, label: "Projects", path: "/projects" },
  { icon: BookOpen, label: "Blog", path: "/blog" },
  { icon: Mail, label: "Contact", path: "/contact" },
];

const MobileBottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show when scrolling down, hide when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Hide on admin pages
  if (currentPath.startsWith('/ium-admin')) {
    return null;
  }

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden" 
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
      {/* Glassmorphism background with gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-background via-background/98 to-background/90 backdrop-blur-2xl border-t border-border/30"
      />
      
      {/* Subtle top highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      
      {/* Navigation content */}
      <div 
        className="relative flex items-center justify-around px-1 py-1"
      >
      {navItems.map((item) => {
          const active = isActive(item.path);
          
          const handleClick = () => {
            // Haptic feedback for mobile devices
            if ('vibrate' in navigator) {
              navigator.vibrate(10);
            }
          };
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleClick}
              className={cn(
                "relative flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-300 min-w-[56px] will-change-transform",
                "active:scale-90",
                active 
                  ? "text-foreground" 
                  : "text-muted-foreground/70 hover:text-foreground/80"
              )}
            >
              {/* Active pill indicator */}
              {active && (
                <motion.div
                  layoutId="mobile-nav-pill"
                  className="absolute inset-x-1.5 -top-0.5 h-0.5 bg-gradient-to-r from-primary/80 via-primary to-primary/80 rounded-full will-change-transform"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              
              {/* Icon with glow effect when active */}
              <div className="relative">
                {active && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-primary/20 blur-md rounded-full will-change-transform"
                  />
                )}
                <item.icon className={cn(
                  "relative z-10 w-[18px] h-[18px] transition-all duration-300",
                  active ? "stroke-[2.5]" : "stroke-[1.5]"
                )} />
              </div>
              
              {/* Label with better typography */}
              <span className={cn(
                "relative z-10 text-[10px] tracking-wide transition-all duration-300",
                active ? "font-semibold opacity-100" : "font-medium opacity-60"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default MobileBottomNav;
