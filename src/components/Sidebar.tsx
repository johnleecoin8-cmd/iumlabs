import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Briefcase, FolderOpen, FileText, Mail, Send, Linkedin, ChevronLeft, ChevronDown, Target, Users, Share2, Mic2, Megaphone, Newspaper } from "lucide-react";
import { brand, navigation } from "@/config/content";
import logoImage from "@/assets/logo.png";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSidebarState } from "@/hooks/useSidebarState";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ElementType;
  to: string;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  index: number;
}

// Services submenu data
const servicesSubMenu = [
  { name: "GTM Strategy", href: "/services/gtm", icon: Target },
  { name: "Community", href: "/services/community", icon: Users },
  { name: "Social Media", href: "/services/social-media", icon: Share2 },
  { name: "Influencer", href: "/services/influencer", icon: Mic2 },
  { name: "Yap Service", href: "/services/yap", icon: Megaphone },
  { name: "PR/Media", href: "/services/pr", icon: Newspaper },
];

const NavItem = ({ icon: Icon, to, label, isActive, isCollapsed, index }: NavItemProps) => {
  const content = (
    <Link
      to={to}
      className={`
        group relative flex items-center rounded-xl overflow-hidden
        transition-all duration-300 ease-out
        ${isCollapsed 
          ? 'w-11 h-11 justify-center' 
          : 'w-full px-4 py-3 gap-3'
        }
        ${isActive 
          ? 'text-foreground' 
          : 'text-muted-foreground hover:text-foreground'
        }
      `}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Active Background Glow */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-xl" />
      )}
      
      {/* Hover Background */}
      <div className={`
        absolute inset-0 rounded-xl transition-all duration-300
        ${isActive ? '' : 'bg-secondary/0 group-hover:bg-secondary/50'}
      `} />
      
      {/* Active Indicator Line */}
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full shadow-[0_0_12px_hsl(var(--primary))]" />
      )}
      
      {/* Icon Container */}
      <div className={`
        relative z-10 flex items-center justify-center transition-all duration-300
        ${isCollapsed ? '' : 'w-5 h-5'}
        ${isActive 
          ? 'text-primary' 
          : 'text-muted-foreground group-hover:text-foreground'
        }
      `}>
        <Icon className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'} ${isCollapsed ? 'w-5 h-5' : 'w-[18px] h-[18px]'}`} />
      </div>
      
      {/* Label */}
      {!isCollapsed && (
        <span className={`
          relative z-10 text-sm font-medium tracking-wide transition-all duration-300
          ${isActive ? 'text-foreground' : ''}
        `}>
          {label}
        </span>
      )}
      
      {/* Active dot indicator for collapsed */}
      {isCollapsed && isActive && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))]" />
      )}
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
          className="bg-foreground text-background text-xs font-medium px-3 py-1.5 rounded-lg shadow-xl"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
};

// Submenu item component
interface SubMenuItemProps {
  icon: React.ElementType;
  to: string;
  label: string;
  isActive: boolean;
}

const SubMenuItem = ({ icon: Icon, to, label, isActive }: SubMenuItemProps) => (
  <Link
    to={to}
    className={cn(
      "group relative flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200",
      isActive 
        ? "text-primary bg-primary/10" 
        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
    )}
  >
    <Icon className={cn(
      "w-4 h-4 transition-transform duration-200",
      isActive ? "text-primary" : "group-hover:scale-105"
    )} />
    <span className="text-[13px] font-medium">{label}</span>
    {isActive && (
      <span className="absolute right-2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))]" />
    )}
  </Link>
);

// Services NavItem with Submenu
interface ServicesNavItemProps {
  isActive: boolean;
  isCollapsed: boolean;
  isOpen: boolean;
  onToggle: () => void;
  currentPath: string;
}

const ServicesNavItem = ({ isActive, isCollapsed, isOpen, onToggle, currentPath }: ServicesNavItemProps) => {
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
            <button
              className={cn(
                "group relative flex items-center justify-center w-11 h-11 rounded-xl overflow-hidden transition-all duration-300 ease-out",
                isServicesActive 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {isServicesActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-xl" />
              )}
              <div className={cn(
                "absolute inset-0 rounded-xl transition-all duration-300",
                !isServicesActive && 'bg-secondary/0 group-hover:bg-secondary/50'
              )} />
              {isServicesActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full shadow-[0_0_12px_hsl(var(--primary))]" />
              )}
              <Briefcase className={cn(
                "relative z-10 w-5 h-5 transition-transform duration-300",
                isServicesActive ? "text-primary scale-110" : "group-hover:scale-105"
              )} />
              {isServicesActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))]" />
              )}
            </button>
          </TooltipTrigger>
          {!showPopover && (
            <TooltipContent 
              side="right" 
              sideOffset={12}
              className="bg-foreground text-background text-xs font-medium px-3 py-1.5 rounded-lg shadow-xl"
            >
              Services
            </TooltipContent>
          )}
        </Tooltip>

        {/* Popover submenu for collapsed state */}
        <div className={cn(
          "absolute left-full top-0 ml-3 w-48 py-2 px-2 rounded-xl",
          "bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl",
          "transition-all duration-200 origin-left",
          showPopover 
            ? "opacity-100 scale-100 translate-x-0" 
            : "opacity-0 scale-95 -translate-x-2 pointer-events-none"
        )}>
          <div className="mb-2 px-2">
            <span className="text-[10px] text-muted-foreground/60 font-medium tracking-[0.15em] uppercase">
              Services
            </span>
          </div>
          <div className="space-y-0.5">
            {servicesSubMenu.map((item) => (
              <SubMenuItem
                key={item.href}
                icon={item.icon}
                to={item.href}
                label={item.name}
                isActive={currentPath === item.href}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Expanded view with dropdown
  return (
    <div className="w-full">
      <button
        onClick={onToggle}
        className={cn(
          "group relative flex items-center w-full px-4 py-3 gap-3 rounded-xl overflow-hidden transition-all duration-300 ease-out",
          isServicesActive 
            ? 'text-foreground' 
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        {isServicesActive && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-xl" />
        )}
        <div className={cn(
          "absolute inset-0 rounded-xl transition-all duration-300",
          !isServicesActive && 'bg-secondary/0 group-hover:bg-secondary/50'
        )} />
        {isServicesActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full shadow-[0_0_12px_hsl(var(--primary))]" />
        )}
        
        <div className={cn(
          "relative z-10 flex items-center justify-center w-5 h-5 transition-all duration-300",
          isServicesActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
        )}>
          <Briefcase className={cn(
            "w-[18px] h-[18px] transition-transform duration-300",
            isServicesActive ? 'scale-110' : 'group-hover:scale-105'
          )} />
        </div>
        
        <span className={cn(
          "relative z-10 flex-1 text-left text-sm font-medium tracking-wide transition-all duration-300",
          isServicesActive && 'text-foreground'
        )}>
          Services
        </span>
        
        <ChevronDown className={cn(
          "relative z-10 w-4 h-4 text-muted-foreground transition-transform duration-300",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Dropdown submenu */}
      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-out",
        isOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
      )}>
        <div className="ml-4 pl-3 border-l border-border/30 space-y-0.5 py-1">
          {servicesSubMenu.map((item) => (
            <SubMenuItem
              key={item.href}
              icon={item.icon}
              to={item.href}
              label={item.name}
              isActive={currentPath === item.href}
            />
          ))}
        </div>
      </div>
    </div>
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
  const [servicesOpen, setServicesOpen] = useState(() => {
    // Auto-open if on a services subpage
    return currentPath.startsWith('/services/');
  });

  // Auto-open services menu when navigating to a service page
  useEffect(() => {
    if (currentPath.startsWith('/services/')) {
      setServicesOpen(true);
    }
  }, [currentPath]);

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
    // For Services, only highlight main /services page, not subpages
    if (linkName === 'Services') {
      return currentPath === '/services';
    }
    return currentPath === linkHref || 
      (linkHref !== '/' && currentPath.startsWith(linkHref));
  };

  return (
    <>
      <aside 
        className={`
          fixed left-0 top-0 h-screen z-50 hidden md:flex flex-col
          transition-all duration-500 ease-out
          ${isCollapsed ? 'w-[72px]' : 'w-56'}
        `}
      >
        {/* Background with blur and gradient */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent pointer-events-none" />
        
        {/* Right border with gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-border/50 via-border to-border/50" />
        
        {/* Content Container */}
        <div className={`
          relative z-10 flex flex-col h-full py-6
          ${isCollapsed ? 'px-3 items-center' : 'px-4'}
        `}>
          {/* Logo Section */}
          <Link 
            to="/" 
            className={`
              group flex items-center gap-3 mb-10 transition-all duration-300
              ${isCollapsed ? 'justify-center' : 'px-2'}
            `}
          >
            <div className="relative">
              {/* Logo glow effect */}
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src={logoImage} 
                alt="Ium Labs Logo" 
                className="relative w-9 h-9 rounded-xl object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-foreground">
                  Ium Labs
                </span>
                <span className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase">
                  Web3 Agency
                </span>
              </div>
            )}
          </Link>

          {/* Navigation Section */}
          <div className={`mb-4 ${isCollapsed ? '' : 'px-2'}`}>
            {!isCollapsed && (
              <span className="text-[10px] text-muted-foreground/60 font-medium tracking-[0.2em] uppercase">
                Navigation
              </span>
            )}
          </div>
          
          <nav className={`flex-1 flex flex-col gap-1 ${isCollapsed ? 'items-center' : ''}`}>
            {navigation.links.map((link, index) => {
              const Icon = getIconForLabel(link.name);
              const isActive = getIsActive(link.name, link.href);
              
              // Render Services with submenu
              if (link.name === 'Services') {
                return (
                  <ServicesNavItem
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
                <NavItem
                  key={link.href}
                  icon={Icon}
                  to={link.href}
                  label={link.name}
                  isActive={isActive}
                  isCollapsed={isCollapsed}
                  index={index}
                />
              );
            })}
          </nav>

          {/* Divider */}
          <div className={`my-4 ${isCollapsed ? 'w-8' : 'mx-2'}`}>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          {/* Social Links Section */}
          {!isCollapsed && (
            <div className="px-2 mb-3">
              <span className="text-[10px] text-muted-foreground/60 font-medium tracking-[0.2em] uppercase">
                Connect
              </span>
            </div>
          )}
          
          <div className={`flex flex-col gap-1 ${isCollapsed ? 'items-center' : ''}`}>
            {isCollapsed ? (
              <>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <a
                      href={brand.telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-center w-11 h-11 rounded-xl text-muted-foreground hover:text-foreground transition-all duration-300"
                    >
                      <div className="absolute inset-0 rounded-xl bg-secondary/0 group-hover:bg-secondary/50 transition-all duration-300" />
                      <Send className="relative z-10 w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-105" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={12} className="bg-foreground text-background text-xs font-medium px-3 py-1.5 rounded-lg">
                    Telegram
                  </TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <a
                      href={brand.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-center w-11 h-11 rounded-xl text-muted-foreground hover:text-foreground transition-all duration-300"
                    >
                      <div className="absolute inset-0 rounded-xl bg-secondary/0 group-hover:bg-secondary/50 transition-all duration-300" />
                      <Linkedin className="relative z-10 w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-105" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={12} className="bg-foreground text-background text-xs font-medium px-3 py-1.5 rounded-lg">
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
                  className="group relative flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-xl bg-secondary/0 group-hover:bg-secondary/50 transition-all duration-300" />
                  <Send className="relative z-10 w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-105" />
                  <span className="relative z-10 text-sm font-medium">Telegram</span>
                </a>

                <a
                  href={brand.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-xl bg-secondary/0 group-hover:bg-secondary/50 transition-all duration-300" />
                  <Linkedin className="relative z-10 w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-105" />
                  <span className="relative z-10 text-sm font-medium">LinkedIn</span>
                </a>
              </>
            )}
          </div>

          {/* Toggle Button */}
          <div className={`mt-6 ${isCollapsed ? '' : 'px-2'}`}>
            <button
              onClick={toggleSidebar}
              className={`
                group relative flex items-center justify-center rounded-xl
                transition-all duration-300 overflow-hidden
                ${isCollapsed ? 'w-11 h-11' : 'w-full h-11 gap-2'}
              `}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {/* Button background */}
              <div className="absolute inset-0 bg-secondary/50 group-hover:bg-secondary transition-all duration-300 rounded-xl" />
              
              {/* Icon with rotation animation */}
              <div className={`
                relative z-10 flex items-center justify-center
                transition-transform duration-500
                ${isCollapsed ? 'rotate-0' : 'rotate-180'}
              `}>
                <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
              </div>
              
              {!isCollapsed && (
                <span className="relative z-10 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  Collapse
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Dynamic margin spacer for content */}
      <div className={`hidden md:block flex-shrink-0 transition-all duration-500 ${isCollapsed ? 'w-[72px]' : 'w-56'}`} />
    </>
  );
};

export default Sidebar;