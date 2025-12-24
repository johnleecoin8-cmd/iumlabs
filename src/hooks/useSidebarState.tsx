import { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(prev => !prev);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarState = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebarState must be used within a SidebarProvider');
  }
  return context;
};

// Hook to get sidebar width class
export const useSidebarWidth = () => {
  const { isCollapsed } = useSidebarState();
  return {
    sidebarWidth: isCollapsed ? 'w-16' : 'w-52',
    contentMargin: isCollapsed ? 'md:ml-16' : 'md:ml-52',
    navbarLeft: isCollapsed ? 'md:left-20' : 'md:left-56',
  };
};