import { Link, useLocation } from "react-router-dom";
import { Home, Briefcase, FolderOpen, FileText, Mail, Send, Linkedin } from "lucide-react";
import { brand, navigation } from "@/config/content";
import logoImage from "@/assets/logo.png";

interface NavItemProps {
  icon: React.ElementType;
  to: string;
  label: string;
  isActive: boolean;
}

const NavItem = ({ icon: Icon, to, label, isActive }: NavItemProps) => {
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
    <aside className="fixed left-0 top-0 h-screen w-52 bg-background/95 backdrop-blur-md border-r border-border z-50 hidden md:flex flex-col py-6 px-3">
      {/* Logo */}
      <Link 
        to="/" 
        className="flex items-center gap-3 px-4 mb-8 transition-all duration-300 hover:opacity-80"
      >
        <img 
          src={logoImage} 
          alt="Ium Labs Logo" 
          className="w-8 h-8 rounded-lg object-contain" 
        />
        <span className="text-lg font-bold tracking-tight">Ium Labs</span>
      </Link>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1">
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
      <div className="flex flex-col gap-1 mt-8 pt-4 border-t border-border">
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
      </div>
    </aside>
  );
};

export default Sidebar;
