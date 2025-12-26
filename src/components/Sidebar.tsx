import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, Send, Linkedin, Home, Briefcase, FolderOpen, BookOpen, Mail, AtSign } from "lucide-react";
import { brand, navigation } from "@/config/content";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSidebarState } from "@/hooks/useSidebarState";
import { cn } from "@/lib/utils";
import SimpleNavItem from "@/components/sidebar/SimpleNavItem";
import FloatingServicesMenu from "@/components/sidebar/FloatingServicesMenu";
import logoImage from "@/assets/logo.png";

// Icon mapping for navigation items
const navIconMap: Record<string, React.ElementType> = {
  'Home': Home,
  'Services': Briefcase,
  'Projects': FolderOpen,
  'Research': BookOpen,
  'Contact': Mail,
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
  'contact': 'Contact',
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isCollapsed, toggleSidebar } = useSidebarState();
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
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Section detection only on homepage
      if (currentPath !== '/') return;

      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
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
    return currentPath === linkHref || 
      (linkHref !== '/' && currentPath.startsWith(linkHref));
  };

  return (
    <>
      <aside 
        className={cn(
          "fixed left-0 top-0 h-screen z-50 hidden md:flex flex-col",
          "transition-all duration-500 ease-out",
          isCollapsed ? "w-[72px]" : "w-56"
        )}
      >
        {/* Minimal Container - only right border */}
        <div className="relative flex flex-col h-full border-r border-white/[0.08]">
          
          {/* Scroll Progress Indicator - Brand color with glow */}
          <div className="absolute right-0 top-0 w-px h-full bg-primary/10">
            <div 
              className="w-full bg-gradient-to-b from-primary via-primary/60 to-primary/20 transition-all duration-150 ease-out relative"
              style={{ height: `${scrollProgress}%` }}
            >
              {/* Glow effect at the bottom of progress */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-10 bg-primary/50 blur-lg rounded-full" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-5 bg-primary blur-sm rounded-full" />
            </div>
          </div>
          
          {/* Content Container */}
          <div className={cn(
            "relative z-10 flex flex-col h-full py-8",
            isCollapsed ? "px-4 items-center" : "px-6"
          )}>
            {/* Logo Section - Image logo */}
            {isCollapsed ? (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSidebar();
                    }}
                    className="group mb-12 transition-all duration-300"
                  >
                    <img 
                      src={logoImage} 
                      alt="Ium Labs" 
                      className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent 
                  side="right" 
                  sideOffset={12}
                  className="bg-white text-black text-xs font-medium px-3 py-1.5 rounded-lg border-0"
                >
                  Click to expand
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link 
                to="/" 
                className="group mb-12 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={logoImage} 
                    alt="Ium Labs" 
                    className="w-9 h-9 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="flex flex-col">
                    <span className="text-base font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                      Ium Labs
                    </span>
                    <span className="text-[9px] text-white/30 font-medium tracking-[0.25em] uppercase">
                      Web3 Agency
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Thin separator line */}
            {!isCollapsed && (
              <div className="w-8 h-px bg-white/10 mb-8" />
            )}
            
            {/* Navigation Section */}
            <nav className={cn("flex-1 flex flex-col gap-0.5", isCollapsed ? "items-center" : "")}>
              {navigation.links.map((link) => {
                const isActive = getIsActive(link.name, link.href);
                
                // Render Services with floating submenu
                if (link.name === 'Services') {
                  return (
                    <FloatingServicesMenu
                      key={link.href}
                      isActive={isActive}
                      isCollapsed={isCollapsed}
                      isOpen={servicesOpen}
                      onToggle={() => setServicesOpen(!servicesOpen)}
                      currentPath={currentPath}
                    />
                  );
                }
                
                const NavIcon = navIconMap[link.name];
                return (
                  <SimpleNavItem
                    key={link.href}
                    to={link.href}
                    label={link.name}
                    icon={NavIcon}
                    isActive={isActive}
                    isCollapsed={isCollapsed}
                  />
                );
              })}
            </nav>

            {/* Bottom Section - Social Links & Toggle */}
            <div className={cn(
              "mt-auto pt-6 border-t border-white/[0.06]",
              isCollapsed ? "w-full flex flex-col items-center" : ""
            )}>
              {/* Contact Info - Only when expanded */}
              {!isCollapsed && (
                <div className="mb-6">
                  <span className="text-[9px] text-white/30 font-medium tracking-[0.2em] uppercase block mb-3">
                    Connect
                  </span>
                  <a 
                    href={`mailto:${brand.email}`}
                    className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300 mb-2"
                  >
                    <AtSign className="w-3.5 h-3.5" />
                    <span className="text-xs">{brand.email}</span>
                  </a>
                </div>
              )}

              {/* Social Icons Row */}
              <div className={cn(
                "flex items-center",
                isCollapsed ? "flex-col gap-4" : "gap-3 mb-6"
              )}>
                <a
                  href={brand.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2 rounded-lg text-white/30 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                </a>
                <a
                  href={brand.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2 rounded-lg text-white/30 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${brand.email}`}
                  className="group relative p-2 rounded-lg text-white/30 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              {/* Toggle Button */}
              <button
                onClick={toggleSidebar}
                className={cn(
                  "flex items-center justify-center p-2 rounded-lg text-white/20 hover:text-white/60 hover:bg-white/5 transition-all duration-300",
                  isCollapsed ? "w-full" : ""
                )}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <ChevronLeft className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  isCollapsed && "rotate-180"
                )} />
                {!isCollapsed && (
                  <span className="text-[10px] text-white/30 ml-2">Collapse</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Dynamic margin spacer for content */}
      <div className={cn(
        "hidden md:block flex-shrink-0 transition-all duration-500",
        isCollapsed ? "w-[72px]" : "w-56"
      )} />
    </>
  );
};

export default Sidebar;