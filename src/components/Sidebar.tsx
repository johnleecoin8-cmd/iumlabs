import { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, Send, Linkedin, Home, Briefcase, FolderOpen, BookOpen, Mail } from "lucide-react";
import { brand, navigation } from "@/config/content";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSidebarState } from "@/hooks/useSidebarState";
import { cn } from "@/lib/utils";
import SimpleNavItem from "@/components/sidebar/SimpleNavItem";
import FloatingServicesMenu from "@/components/sidebar/FloatingServicesMenu";
import logoImage from "@/assets/logo.png";

// Constants
const NAV_ICON_MAP: Record<string, React.ElementType> = {
  'Home': Home,
  'Services': Briefcase,
  'Projects': FolderOpen,
  'Research': BookOpen,
  'Contact': Mail,
};

const SECTION_IDS = ['hero', 'services', 'process', 'cases', 'why-choose-us', 'gallery', 'media-partners', 'insights', 'contact'];

const SECTION_TO_NAV_MAP: Record<string, string> = {
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

// Page name mapping for breadcrumb
const PATH_TO_PAGE_NAME: Record<string, string> = {
  '/': 'Home',
  '/services': 'Services',
  '/services/gtm': 'GTM Strategy',
  '/services/community': 'Community',
  '/services/social-media': 'Social Media',
  '/services/influencer': 'Influencer',
  '/services/yap': 'Yap Service',
  '/services/pr': 'PR/Media',
  '/projects': 'Projects',
  '/research': 'Research',
  '/contact': 'Contact',
};

// Social links config
const SOCIAL_LINKS = [
  { href: brand.telegramLink, icon: Send, label: 'Telegram', external: true },
  { href: brand.linkedin, icon: Linkedin, label: 'LinkedIn', external: true },
  { href: `mailto:${brand.email}`, icon: Mail, label: 'Email', external: false },
];

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isCollapsed, toggleSidebar } = useSidebarState();
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [servicesOpen, setServicesOpen] = useState(() => currentPath.startsWith('/services/'));

  // Get current page name for breadcrumb
  const currentPageName = useMemo(() => {
    if (currentPath === '/') {
      return SECTION_TO_NAV_MAP[activeSection] || 'Home';
    }
    return PATH_TO_PAGE_NAME[currentPath] || currentPath.split('/').pop()?.replace(/-/g, ' ') || 'Page';
  }, [currentPath, activeSection]);

  // Auto-open services menu
  useEffect(() => {
    if (currentPath.startsWith('/services/')) {
      setServicesOpen(true);
    }
  }, [currentPath]);

  // Optimized scroll handler with requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
          setScrollProgress(Math.min(100, Math.max(0, progress)));

          if (currentPath === '/') {
            const scrollPosition = window.scrollY + window.innerHeight / 3;
            for (const sectionId of SECTION_IDS) {
              const element = document.getElementById(sectionId);
              if (element) {
                const { offsetTop, offsetHeight } = element;
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                  setActiveSection(sectionId);
                  break;
                }
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  // Memoized active check function
  const getIsActive = useCallback((linkName: string, linkHref: string) => {
    if (currentPath === '/') {
      return linkName === (SECTION_TO_NAV_MAP[activeSection] || 'Home');
    }
    if (linkName === 'Services') {
      return currentPath === '/services';
    }
    return currentPath === linkHref || (linkHref !== '/' && currentPath.startsWith(linkHref));
  }, [currentPath, activeSection]);

  // Hide on admin pages
  if (currentPath.startsWith('/ium-admin')) {
    return null;
  }

  return (
    <>
      <aside 
        className={cn(
          "fixed left-0 top-0 h-screen z-50 hidden md:flex flex-col",
          "transition-all duration-500 ease-out will-change-[width]",
          isCollapsed ? "w-[72px]" : "w-56"
        )}
      >
        <div className="relative flex flex-col h-full border-r border-white/[0.08]">
          
          {/* Scroll Progress Indicator */}
          <div className="absolute right-0 top-0 w-px h-full bg-primary/10">
            <div 
              className="w-full bg-gradient-to-b from-primary via-primary/60 to-primary/20 transition-[height] duration-100 ease-out relative will-change-[height]"
              style={{ height: `${scrollProgress}%` }}
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-10 bg-primary/50 blur-lg rounded-full" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-5 bg-primary blur-sm rounded-full" />
            </div>
          </div>
          
          {/* Content */}
          <div className={cn(
            "relative z-10 flex flex-col h-full py-8",
            isCollapsed ? "px-4 items-center" : "px-6"
          )}>
            
            {/* Logo */}
            {isCollapsed ? (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleSidebar}
                    className="group mb-8 transition-all duration-300"
                  >
                    <img 
                      src={logoImage} 
                      alt="Ium Labs" 
                      className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={12} className="bg-white text-black text-xs font-medium px-3 py-1.5 rounded-lg border-0">
                  Expand sidebar
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link to="/" className="group mb-6 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <img 
                    src={logoImage} 
                    alt="Ium Labs" 
                    className="w-9 h-9 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="flex flex-col">
                    <span className="text-base font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors">
                      Ium Labs
                    </span>
                    <span className="text-[9px] text-white/30 font-medium tracking-[0.25em] uppercase">
                      Web3 Agency
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Breadcrumb - Current Page */}
            {!isCollapsed && (
              <div className="mb-8">
                <div className="flex items-center gap-2 text-[10px] text-white/30">
                  <span className="text-white/20">/</span>
                  <span className="text-primary/80 font-medium capitalize">{currentPageName}</span>
                </div>
                <div className="w-8 h-px bg-white/10 mt-3" />
              </div>
            )}
            
            {/* Navigation */}
            <nav className={cn("flex-1 flex flex-col gap-0.5", isCollapsed && "items-center")}>
              {navigation.links.map((link) => {
                const isActive = getIsActive(link.name, link.href);
                
                if (link.name === 'Services') {
                  return (
                    <FloatingServicesMenu
                      key={link.href}
                      isActive={isActive}
                      isCollapsed={isCollapsed}
                      isOpen={servicesOpen}
                      onToggle={() => setServicesOpen(prev => !prev)}
                      currentPath={currentPath}
                    />
                  );
                }
                
                return (
                  <SimpleNavItem
                    key={link.href}
                    to={link.href}
                    label={link.name}
                    icon={NAV_ICON_MAP[link.name]}
                    isActive={isActive}
                    isCollapsed={isCollapsed}
                  />
                );
              })}
            </nav>

            {/* Bottom Section */}
            <div className={cn(
              "mt-auto pt-6 border-t border-white/[0.06]",
              isCollapsed && "w-full flex flex-col items-center"
            )}>
              
              {/* Social Icons with Tooltips */}
              <div className={cn(
                "flex items-center",
                isCollapsed ? "flex-col gap-3 mb-4" : "gap-2 mb-6"
              )}>
                {SOCIAL_LINKS.map(({ href, icon: Icon, label, external }) => (
                  <Tooltip key={label} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <a
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="p-2 rounded-lg text-white/30 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent 
                      side={isCollapsed ? "right" : "top"} 
                      sideOffset={8}
                      className="bg-white text-black text-xs font-medium px-2.5 py-1 rounded-md border-0"
                    >
                      {label}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>

              {/* Toggle Button */}
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleSidebar}
                    className={cn(
                      "flex items-center justify-center p-2 rounded-lg text-white/20 hover:text-white/60 hover:bg-white/5 transition-all duration-300",
                      isCollapsed && "w-full"
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
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" sideOffset={8} className="bg-white text-black text-xs font-medium px-2.5 py-1 rounded-md border-0">
                    Expand
                  </TooltipContent>
                )}
              </Tooltip>
            </div>
          </div>
        </div>
      </aside>

      {/* Spacer */}
      <div className={cn(
        "hidden md:block flex-shrink-0 transition-all duration-500",
        isCollapsed ? "w-[72px]" : "w-56"
      )} />
    </>
  );
};

export default Sidebar;
