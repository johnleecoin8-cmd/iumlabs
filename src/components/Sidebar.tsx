import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Briefcase, FolderOpen, FileText, Mail, Send, Linkedin, ChevronLeft, AtSign } from "lucide-react";
import { brand, navigation } from "@/config/content";
import logoImage from "@/assets/logo.png";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSidebarState } from "@/hooks/useSidebarState";
import { cn } from "@/lib/utils";
import SimpleNavItem from "@/components/sidebar/SimpleNavItem";
import FloatingServicesMenu from "@/components/sidebar/FloatingServicesMenu";
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

// Enhanced Social Link Component with glow effects
const SocialLink = ({ 
  href, 
  icon: Icon, 
  label, 
  isCollapsed 
}: { 
  href: string; 
  icon: React.ElementType; 
  label: string; 
  isCollapsed: boolean;
}) => {
  const content = (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex items-center rounded-2xl transition-all duration-300 overflow-hidden",
        isCollapsed ? "w-12 h-12 justify-center" : "w-full px-4 py-3 gap-3",
        "text-muted-foreground hover:text-foreground"
      )}
    >
      {/* Hover background with glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-secondary/60 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-primary/10" />
      
      {/* Icon with glow effect */}
      <div className="relative z-10">
        <div className="absolute inset-0 bg-primary/30 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150" />
        <Icon 
          className={cn(
            "relative transition-all duration-500 group-hover:scale-110 group-hover:text-primary",
            isCollapsed ? "w-5 h-5" : "w-[18px] h-[18px]"
          )}
        />
      </div>
      
      {!isCollapsed && (
        <span className="relative z-10 text-sm font-medium transition-all duration-300 group-hover:translate-x-0.5">
          {label}
        </span>
      )}
      
      {/* Right edge glow line */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-gradient-to-b from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 group-hover:h-1/2 transition-all duration-500" />
    </a>
  );

  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent 
          side="right" 
          sideOffset={16} 
          className="bg-foreground text-background text-xs font-medium px-3 py-1.5 rounded-xl shadow-xl border-0"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
};

// Enhanced Connect Link Component with glow effects
const ConnectLink = ({ 
  to, 
  icon: Icon, 
  label, 
  isCollapsed 
}: { 
  to: string; 
  icon: React.ElementType; 
  label: string; 
  isCollapsed: boolean;
}) => {
  const content = (
    <Link
      to={to}
      className={cn(
        "group relative flex items-center rounded-2xl transition-all duration-300 overflow-hidden",
        isCollapsed ? "w-12 h-12 justify-center" : "w-full px-4 py-3 gap-3",
        "text-muted-foreground hover:text-foreground"
      )}
    >
      {/* Hover background with glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-secondary/60 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-primary/10" />
      
      {/* Icon with glow effect */}
      <div className="relative z-10">
        <div className="absolute inset-0 bg-primary/30 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150" />
        <Icon 
          className={cn(
            "relative transition-all duration-500 group-hover:scale-110 group-hover:text-primary",
            isCollapsed ? "w-5 h-5" : "w-[18px] h-[18px]"
          )}
        />
      </div>
      
      {!isCollapsed && (
        <span className="relative z-10 text-sm font-medium transition-all duration-300 group-hover:translate-x-0.5">
          {label}
        </span>
      )}
      
      {/* Right edge glow line */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-gradient-to-b from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 group-hover:h-1/2 transition-all duration-500" />
    </Link>
  );

  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent 
          side="right" 
          sideOffset={16} 
          className="bg-foreground text-background text-xs font-medium px-3 py-1.5 rounded-xl shadow-xl border-0"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
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
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

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
          "fixed left-0 top-0 h-screen z-50 hidden md:flex flex-col p-3",
          "transition-all duration-500 ease-out",
          isCollapsed ? "w-[89px]" : "w-60"
        )}
      >
        {/* Floating Island Container */}
        <div className="relative flex flex-col h-full rounded-3xl overflow-hidden">
          {/* Main island background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/85 backdrop-blur-2xl rounded-3xl" />
          
          {/* Glass border effect */}
          <div className="absolute inset-0 rounded-3xl border border-border/30 shadow-[0_8px_40px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.08)]" />
          
          {/* Top highlight line */}
          <div className="absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          
          {/* Scroll Progress Bar */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-border/10 rounded-l-3xl overflow-hidden">
            <div 
              className="w-full bg-gradient-to-b from-primary via-primary to-primary/50 transition-all duration-150 ease-out"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>
          
          {/* Content Container */}
          <div className={cn(
            "relative z-10 flex flex-col h-full py-6",
            isCollapsed ? "px-4 items-center" : "px-5"
          )}>
            {/* Logo Section - Enhanced with 3D rotation and multi-layer glow */}
            <Link 
              to="/" 
              className={cn(
                "group flex items-center gap-3 mb-10 transition-all duration-300",
                isCollapsed ? "justify-center" : "px-1"
              )}
            >
              <div className="relative" style={{ perspective: '1000px' }}>
                {/* Outer glow layer - largest, most diffused */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/40 via-[rgba(var(--gold-rgb),0.3)] to-primary/40 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-logo-glow-pulse" />
                
                {/* Middle glow layer */}
                <div className="absolute -inset-2 bg-gradient-to-br from-primary/50 to-[rgba(var(--gold-rgb),0.4)] blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Inner glow layer - sharpest */}
                <div className="absolute -inset-1 bg-primary/40 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-400" />
                
                {/* Rotating border ring */}
                <div className="absolute -inset-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-[conic-gradient(from_0deg,hsl(var(--primary)),rgba(var(--gold-rgb),0.8),hsl(var(--primary)),rgba(var(--gold-rgb),0.6),hsl(var(--primary)))] group-hover:animate-logo-ring-rotate"
                  />
                  <div className="absolute inset-[2px] bg-background rounded-lg" />
                </div>
                
                {/* Main logo image with 3D rotation */}
                <img 
                  src={logoImage} 
                  alt="Ium Labs Logo" 
                  className={cn(
                    "relative w-10 h-10 rounded-lg object-cover bg-white p-1 z-10",
                    "transition-all duration-700 ease-out",
                    "group-hover:scale-115 group-hover:[transform:rotateY(360deg)]",
                    "group-hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.5),0_0_50px_rgba(var(--primary-rgb),0.3),0_0_75px_rgba(var(--gold-rgb),0.2)]"
                  )}
                  style={{ transformStyle: 'preserve-3d' }}
                />
                
                {/* Particle effects on hover */}
                <div className="absolute top-0 left-0 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-logo-particle-burst" style={{ animationDelay: '0ms' }} />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[rgba(var(--gold-rgb),1)] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-logo-particle-burst" style={{ animationDelay: '100ms' }} />
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-[rgba(var(--gold-rgb),1)] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-logo-particle-burst" style={{ animationDelay: '200ms' }} />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-logo-particle-burst" style={{ animationDelay: '150ms' }} />
                
                {/* Center ping effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping z-20" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col transition-all duration-500 group-hover:translate-x-1">
                  <span className="text-base font-bold tracking-tight text-foreground transition-all duration-300 group-hover:text-primary">
                    Ium Labs
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase transition-all duration-300 group-hover:text-primary/70">
                    Web3 Agency
                  </span>
                </div>
              )}
            </Link>

            {/* Navigation Section */}
            <div className={cn("mb-4", isCollapsed ? "" : "px-1")}>
              {!isCollapsed && (
                <span className="text-[10px] text-muted-foreground/50 font-medium tracking-[0.2em] uppercase">
                  Navigation
                </span>
              )}
            </div>
            
            <nav className={cn("flex-1 flex flex-col gap-1.5", isCollapsed ? "items-center" : "")}>
              {navigation.links.map((link, index) => {
                const Icon = getIconForLabel(link.name);
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
                    icon={Icon}
                    to={link.href}
                    label={link.name}
                    isActive={isActive}
                    isCollapsed={isCollapsed}
                  />
                );
              })}
            </nav>

            {/* Divider */}
            <div className={cn("my-5", isCollapsed ? "w-8" : "mx-1")}>
              <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            </div>

            {/* Connect Section */}
            {!isCollapsed && (
              <div className="px-1 mb-3">
                <span className="text-[10px] text-muted-foreground/50 font-medium tracking-[0.2em] uppercase">
                  Connect
                </span>
              </div>
            )}
            
            <div className={cn("flex flex-col gap-1.5", isCollapsed ? "items-center" : "")}>
              <ConnectLink
                to="/contact"
                icon={Mail}
                label="Contact"
                isCollapsed={isCollapsed}
              />
              <SocialLink
                href={`mailto:${brand.email}`}
                icon={AtSign}
                label="Email"
                isCollapsed={isCollapsed}
              />
              <SocialLink
                href={brand.telegramLink}
                icon={Send}
                label="Telegram"
                isCollapsed={isCollapsed}
              />
              <SocialLink
                href={brand.linkedin}
                icon={Linkedin}
                label="LinkedIn"
                isCollapsed={isCollapsed}
              />
            </div>

            {/* Toggle Button */}
            <div className={cn("mt-6", isCollapsed ? "" : "px-1")}>
              <button
                onClick={toggleSidebar}
                className={cn(
                  "group relative flex items-center justify-center rounded-2xl",
                  "transition-all duration-300 overflow-hidden",
                  isCollapsed ? "w-12 h-12" : "w-full h-12 gap-2"
                )}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {/* Button background with hover glow */}
                <div className="absolute inset-0 bg-secondary/40 group-hover:bg-secondary/70 transition-all duration-300 rounded-2xl" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl shadow-[0_0_20px_hsl(var(--primary)/0.1)]" />
                
                {/* Icon with rotation animation */}
                <div className={cn(
                  "relative z-10 flex items-center justify-center",
                  "transition-transform duration-500",
                  isCollapsed ? "rotate-0" : "rotate-180"
                )}>
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
        </div>
      </aside>

      {/* Dynamic margin spacer for content */}
      <div className={cn(
        "hidden md:block flex-shrink-0 transition-all duration-500",
        isCollapsed ? "w-[89px]" : "w-60"
      )} />
    </>
  );
};

export default Sidebar;
