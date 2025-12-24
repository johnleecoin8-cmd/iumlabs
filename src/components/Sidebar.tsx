import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Briefcase, FolderOpen, FileText, Mail, Send, Linkedin, ChevronLeft, ChevronRight } from "lucide-react";
import { brand, navigation } from "@/config/content";
import logoImage from "@/assets/logo.png";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSidebarState } from "@/hooks/useSidebarState";
import { useState } from "react";

interface NavItemProps {
  icon: React.ElementType;
  to: string;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const NavItem = ({ icon: Icon, to, label, isActive, isCollapsed }: NavItemProps) => {
  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link
            to={to}
            className={`
              relative flex items-center justify-center w-10 h-10 rounded-lg
              transition-all duration-300 group
              ${isActive 
                ? 'bg-primary/20 text-primary' 
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }
            `}
          >
            <Icon className="w-5 h-5" />
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r" />
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-foreground text-background text-xs">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Link
      to={to}
      className={`
        relative flex items-center gap-3 w-full px-4 py-2.5 rounded-lg
        transition-all duration-300 group
        ${isActive 
          ? 'bg-primary/20 text-primary' 
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
        }
      `}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium">{label}</span>
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r" />
      )}
    </Link>
  );
};

// Map navigation labels to icons
const getIconForLabel = (label: string) => {
  const iconMap: Record<string, React.ElementType> = {
    Home: Home,
    Services: Briefcase,
    Projects: FolderOpen,
    Research: FileText,
    Contact: Mail,
  };
  return iconMap[label] || Home;
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

  // Scroll-based section detection (only on homepage)
  useEffect(() => {
    if (currentPath !== '/') return;

    const handleScroll = () => {
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
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  // Check if current path is admin page
  const isAdminPage = currentPath.startsWith('/ium-admin');
  
  // Hide sidebar on admin pages
  if (isAdminPage) {
    return null;
  }

  // Determine active state based on route or scroll position
  const getIsActive = (linkName: string, linkHref: string) => {
    // On homepage, use scroll-based detection
    if (currentPath === '/') {
      const activeLinkName = sectionToNavMap[activeSection] || 'Home';
      return linkName === activeLinkName;
    }
    // On other pages, use route-based detection
    return currentPath === linkHref || 
      (linkHref !== '/' && currentPath.startsWith(linkHref));
  };

  return (
    <>
      <aside 
        className={`fixed left-0 top-0 h-screen bg-background/95 backdrop-blur-md border-r border-border z-50 hidden md:flex flex-col py-6 transition-all duration-300 ${
          isCollapsed ? 'w-16 px-2 items-center' : 'w-52 px-3'
        }`}
      >
        {/* Logo */}
        <Link 
          to="/" 
          className={`flex items-center gap-3 mb-8 transition-all duration-300 hover:opacity-80 ${
            isCollapsed ? 'justify-center' : 'px-4'
          }`}
        >
          <img 
            src={logoImage} 
            alt="Ium Labs Logo" 
            className="w-8 h-8 rounded-lg object-contain flex-shrink-0" 
          />
          {!isCollapsed && (
            <span className="text-lg font-bold tracking-tight">Ium Labs</span>
          )}
        </Link>

        {/* Navigation Links */}
        <nav className={`flex-1 flex flex-col gap-1 ${isCollapsed ? 'items-center' : ''}`}>
          {navigation.links.map((link) => {
            const Icon = getIconForLabel(link.name);
            const isActive = getIsActive(link.name, link.href);
            
            return (
              <NavItem
                key={link.href}
                icon={Icon}
                to={link.href}
                label={link.name}
                isActive={isActive}
                isCollapsed={isCollapsed}
              />
            );
          })}
        </nav>

        {/* Social Links */}
        <div className={`flex flex-col gap-1 mt-8 pt-4 border-t border-border ${isCollapsed ? 'items-center' : ''}`}>
          {isCollapsed ? (
            <>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <a
                    href={brand.telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300"
                  >
                    <Send className="w-4 h-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-foreground text-background text-xs">
                  Telegram
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <a
                    href={brand.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-foreground text-background text-xs">
                  LinkedIn
                </TooltipContent>
              </Tooltip>
            </>
          ) : (
            <>
              <a
                href={brand.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300"
              >
                <Send className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">Telegram</span>
              </a>

              <a
                href={brand.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300"
              >
                <Linkedin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="mt-4 flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-300 self-center"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </aside>

      {/* Dynamic margin spacer for content */}
      <div className={`hidden md:block flex-shrink-0 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-52'}`} />
    </>
  );
};

export default Sidebar;