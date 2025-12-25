import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, Send, Linkedin } from "lucide-react";
import { brand, navigation } from "@/config/content";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSidebarState } from "@/hooks/useSidebarState";
import { cn } from "@/lib/utils";
import SimpleNavItem from "@/components/sidebar/SimpleNavItem";
import FloatingServicesMenu from "@/components/sidebar/FloatingServicesMenu";

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
  const [servicesOpen, setServicesOpen] = useState(() => {
    return currentPath.startsWith('/services/');
  });

  // Auto-open services menu when navigating to a service page
  useEffect(() => {
    if (currentPath.startsWith('/services/')) {
      setServicesOpen(true);
    }
  }, [currentPath]);

  // Scroll-based section detection
  useEffect(() => {
    const handleScroll = () => {
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
          
          {/* Content Container */}
          <div className={cn(
            "relative z-10 flex flex-col h-full py-8",
            isCollapsed ? "px-4 items-center" : "px-6"
          )}>
            {/* Logo Section - Text only */}
            <Link 
              to="/" 
              className={cn(
                "group mb-12 transition-all duration-300",
                isCollapsed ? "text-center" : ""
              )}
            >
              {isCollapsed ? (
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <span className="text-lg font-bold text-white/80 group-hover:text-white transition-colors cursor-pointer">
                      IL
                    </span>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="right" 
                    sideOffset={12}
                    className="bg-white text-black text-xs font-medium px-3 py-1.5 rounded-lg border-0"
                  >
                    Ium Labs
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div className="flex flex-col">
                  <span className="text-base font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                    Ium Labs
                  </span>
                  <span className="text-[9px] text-white/30 font-medium tracking-[0.25em] uppercase mt-0.5">
                    Web3 Agency
                  </span>
                </div>
              )}
            </Link>

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
                
                return (
                  <SimpleNavItem
                    key={link.href}
                    to={link.href}
                    label={link.name}
                    isActive={isActive}
                    isCollapsed={isCollapsed}
                  />
                );
              })}
            </nav>

            {/* Thin separator line */}
            <div className={cn("my-6", isCollapsed ? "w-6" : "w-8")}>
              <div className="h-px bg-white/10" />
            </div>

            {/* Social Links - Horizontal icons */}
            <div className={cn(
              "flex items-center gap-4",
              isCollapsed ? "flex-col gap-3" : ""
            )}>
              <a
                href={brand.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors duration-300"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={brand.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* Toggle Button - Icon only */}
            <div className="mt-6">
              <button
                onClick={toggleSidebar}
                className="text-white/20 hover:text-white/60 transition-colors duration-300"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <ChevronLeft className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  isCollapsed && "rotate-180"
                )} />
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