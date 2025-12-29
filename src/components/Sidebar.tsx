import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, Home, Briefcase, FolderOpen, BookOpen, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { navigation } from "@/config/content";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSidebarState } from "@/hooks/useSidebarState";
import { cn } from "@/lib/utils";
import SimpleNavItem from "@/components/sidebar/SimpleNavItem";
import FloatingServicesMenu from "@/components/sidebar/FloatingServicesMenu";
import ConnectSection from "@/components/sidebar/ConnectSection";
import SeoulTimeDisplay from "@/components/sidebar/SeoulTimeDisplay";
import logoImage from "@/assets/logo.png";

// Icon mapping for navigation items
const navIconMap: Record<string, React.ElementType> = {
  'Home': Home,
  'Services': Briefcase,
  'Projects': FolderOpen,
  'Research': BookOpen,
  'Contact': Mail
};
// Section IDs for scroll-based highlighting on homepage
const sectionIds = ['hero', 'services', 'process', 'cases', 'why-choose-us', 'gallery', 'media-partners', 'insights', 'contact'];

// Map section IDs to navigation labels
const sectionToNavMap: Record<string, string> = {
  'hero': 'Home',
  'services': 'Services',
  'process': 'Services',
  'cases': 'Projects',
  'why-choose-us': 'Home',
  'gallery': 'Projects',
  'media-partners': 'Home',
  'insights': 'Research',
  'contact': 'Contact'
};
const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const {
    isCollapsed,
    toggleSidebar
  } = useSidebarState();
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [servicesOpen, setServicesOpen] = useState(() => {
    return currentPath.startsWith('/services/');
  });
  // Auto-open services menu when navigating to a service page
  useEffect(() => {
    if (currentPath.startsWith('/services/')) {
      setServicesOpen(true);
    }
  }, [currentPath]);

  // Scroll-based section detection and progress
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Section detection only on homepage
      if (currentPath !== '/') return;
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const {
            offsetTop,
            offsetHeight
          } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  // Check if current path is admin page
  const isAdminPage = currentPath.startsWith('/ium-admin');
  if (isAdminPage) {
    return null;
  }
  const getIsActive = (linkName: string, linkHref: string) => {
    if (currentPath === '/') {
      const activeLinkName = sectionToNavMap[activeSection] || 'Home';
      return linkName === activeLinkName;
    }
    if (linkName === 'Services') {
      return currentPath === '/services';
    }
    return currentPath === linkHref || linkHref !== '/' && currentPath.startsWith(linkHref);
  };
  return <>
      <aside className={cn("fixed left-0 top-0 h-screen z-50 hidden md:flex flex-col", "transition-all duration-500 ease-out", isCollapsed ? "w-[72px]" : "w-60")}>
        {/* Glassmorphism Container */}
        <div className="relative flex flex-col h-full">
          {/* Glass background layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-white/[0.02] backdrop-blur-sm" />
          
          {/* Gradient border on right */}
          <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-white/[0.15] via-white/[0.06] to-white/[0.15]" />
          
          {/* Scroll Progress Indicator - Enhanced with pulse */}
          <div className="absolute right-0 top-0 w-px h-full bg-primary/5">
            <motion.div className="w-full bg-gradient-to-b from-primary via-primary/60 to-primary/20 relative" style={{
            height: `${scrollProgress}%`
          }} initial={false} animate={{
            height: `${scrollProgress}%`
          }} transition={{
            duration: 0.15,
            ease: "easeOut"
          }}>
              {/* Glow effect at the bottom of progress */}
              <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-12 bg-primary/40 blur-xl rounded-full" animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }} />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-6 bg-primary blur-sm rounded-full" />
            </motion.div>
          </div>
          
          {/* Content Container */}
          <div className={cn("relative z-10 flex flex-col h-full py-8", isCollapsed ? "px-4 items-center" : "px-6")}>
            {/* Logo Section - With Motion */}
            {isCollapsed ? <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <motion.button onClick={e => {
                e.preventDefault();
                toggleSidebar();
              }} className="group mb-12 transition-all duration-300" whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                    <img src={logoImage} alt="Ium Labs" className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={12} className="bg-black/80 backdrop-blur-xl text-white text-xs font-medium px-3 py-1.5 rounded-xl border border-white/10">
                  Click to expand
                </TooltipContent>
              </Tooltip> : <motion.div initial={{
            opacity: 0,
            y: -10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            ease: "easeOut"
          }}>
                <Link to="/" className="group mb-12 block transition-all duration-300">
                  <motion.div className="flex items-center gap-3" whileHover={{
                scale: 1.02
              }}>
                    <img src={logoImage} alt="Ium Labs" className="w-9 h-9 object-contain opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
                    <div className="flex flex-col">
                      <span className="text-base font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">ium Labs</span>
                      <span className="text-xs text-white/40">Web3 Marketing & Research</span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>}

            {/* Section: Navigate */}
            {!isCollapsed && <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.3,
            delay: 0.2
          }}>
                <span className="text-[9px] text-white/25 font-medium tracking-[0.15em] uppercase block mb-3 ml-1">
                  Navigate
                </span>
              </motion.div>}
            
            {/* Navigation Section */}
            <nav className={cn("flex-1 flex flex-col gap-1", isCollapsed ? "items-center" : "")}>
              {navigation.links.map((link, index) => {
              const isActive = getIsActive(link.name, link.href);

              // Render Services with floating submenu
              if (link.name === 'Services') {
                return <motion.div key={link.href} initial={{
                  opacity: 0,
                  x: -20
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  duration: 0.3,
                  delay: index * 0.05
                }}>
                      <FloatingServicesMenu isActive={isActive} isCollapsed={isCollapsed} isOpen={servicesOpen} onToggle={() => setServicesOpen(!servicesOpen)} currentPath={currentPath} />
                    </motion.div>;
              }
              const NavIcon = navIconMap[link.name];
              return <motion.div key={link.href} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.3,
                delay: index * 0.05
              }}>
                    <SimpleNavItem to={link.href} label={link.name} icon={NavIcon} isActive={isActive} isCollapsed={isCollapsed} />
                  </motion.div>;
            })}
            </nav>

            {/* Bottom Section - Status, Connect & Toggle */}
            <div className={cn("mt-auto pt-4 border-t border-white/[0.05]", isCollapsed ? "w-full flex flex-col items-center gap-3" : "space-y-4")}>
              {/* Seoul Time Status */}
              <SeoulTimeDisplay isCollapsed={isCollapsed} />
              
              {/* Divider between sections */}
              {!isCollapsed && <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />}
              
              <ConnectSection isCollapsed={isCollapsed} />

              {/* Toggle Button - Pill style */}
              <motion.button onClick={toggleSidebar} className={cn("flex items-center justify-center gap-2 px-3 py-2 rounded-xl", "bg-white/[0.02] border border-white/[0.06]", "text-white/20 hover:text-white/60 hover:bg-white/[0.06] hover:border-white/[0.12]", "transition-all duration-300", isCollapsed ? "w-full" : "")} whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
                <motion.div animate={{
                rotate: isCollapsed ? 180 : 0
              }} transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}>
                  <ChevronLeft className="w-4 h-4" />
                </motion.div>
                {!isCollapsed && <span className="text-[10px] text-white/30">Collapse</span>}
              </motion.button>
            </div>
          </div>
        </div>
      </aside>

      {/* Dynamic margin spacer for content */}
      <div className={cn("hidden md:block flex-shrink-0 transition-all duration-500", isCollapsed ? "w-[72px]" : "w-60")} />
    </>;
};
export default Sidebar;