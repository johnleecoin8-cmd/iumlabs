import { Link, useLocation } from "react-router-dom";
import { Home, Briefcase, FolderOpen, FileText, Mail, Send, Linkedin } from "lucide-react";
import { brand, navigation } from "@/config/content";
import logoImage from "@/assets/logo.png";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItemProps {
  icon: React.ElementType;
  to: string;
  label: string;
  isActive: boolean;
}

const NavItem = ({ icon: Icon, to, label, isActive }: NavItemProps) => {
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

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Check if current path is admin page
  const isAdminPage = currentPath.startsWith('/ium-admin');
  
  // Hide sidebar on admin pages
  if (isAdminPage) {
    return null;
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 md:w-20 bg-background/95 backdrop-blur-md border-r border-border z-50 hidden md:flex flex-col items-center py-6">
      {/* Logo */}
      <Link 
        to="/" 
        className="mb-8 transition-all duration-300 hover:scale-110"
      >
        <img 
          src={logoImage} 
          alt="Ium Labs Logo" 
          className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-contain" 
        />
      </Link>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col items-center justify-center gap-3">
        {navigation.links.map((link) => {
          const Icon = getIconForLabel(link.name);
          const isActive = currentPath === link.href || 
            (link.href !== '/' && currentPath.startsWith(link.href));
          
          return (
            <NavItem
              key={link.href}
              icon={Icon}
              to={link.href}
              label={link.name}
              isActive={isActive}
            />
          );
        })}
      </nav>

      {/* Social Links */}
      <div className="flex flex-col items-center gap-3 mt-8">
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
      </div>

      {/* Decorative line */}
      <div className="w-6 h-px bg-border mt-6" />
    </aside>
  );
};

export default Sidebar;
