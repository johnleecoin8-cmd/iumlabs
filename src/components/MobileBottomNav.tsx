import { Link, useLocation } from "react-router-dom";
import { Home, Briefcase, FolderOpen, BookOpen, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Briefcase, label: "Services", path: "/services" },
  { icon: FolderOpen, label: "Projects", path: "/projects" },
  { icon: BookOpen, label: "Research", path: "/research" },
  { icon: Mail, label: "Contact", path: "/contact" },
];

const MobileBottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Hide on admin pages
  if (currentPath.startsWith('/ium-admin')) {
    return null;
  }

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Safe area background */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-xl border-t border-border/50" 
           style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
      
      {/* Navigation content */}
      <div className="relative flex items-center justify-around px-2 py-2"
           style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200",
                active 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {/* Active indicator */}
              {active && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              
              <item.icon className={cn(
                "relative z-10 w-5 h-5 transition-transform duration-200",
                active && "scale-110"
              )} />
              <span className={cn(
                "relative z-10 text-[10px] font-medium transition-opacity duration-200",
                active ? "opacity-100" : "opacity-70"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
