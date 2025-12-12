import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Research from "./pages/Research";
import ResearchDetail from "./pages/ResearchDetail";
import NFTService from "./pages/NFTService";
import DeFiService from "./pages/DeFiService";
import GameFiService from "./pages/GameFiService";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Enhanced Page Transition Wrapper with smooth animations
const PageTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<'enter' | 'exit' | 'idle'>('idle');
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      // Start exit animation
      setTransitionStage('exit');
      
      // After exit animation, update content and start enter
      const exitTimer = setTimeout(() => {
        setDisplayChildren(children);
        window.scrollTo({ top: 0, behavior: 'instant' });
        setTransitionStage('enter');
        
        // Reset to idle after enter animation
        const enterTimer = setTimeout(() => {
          setTransitionStage('idle');
        }, 500);
        
        return () => clearTimeout(enterTimer);
      }, 300);
      
      prevPathRef.current = location.pathname;
      return () => clearTimeout(exitTimer);
    }
  }, [location.pathname, children]);

  // Initial mount
  useEffect(() => {
    setTransitionStage('enter');
    const timer = setTimeout(() => setTransitionStage('idle'), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Transition overlay */}
      <div 
        className={`fixed inset-0 z-[9999] pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] bg-[hsl(0,0%,4%)] ${
          transitionStage === 'exit' 
            ? 'translate-y-0' 
            : transitionStage === 'enter'
            ? '-translate-y-full'
            : '-translate-y-full'
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
      
      {/* Page content */}
      <div 
        className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          transitionStage === 'exit' 
            ? 'opacity-0 scale-[0.98] blur-sm' 
            : transitionStage === 'enter'
            ? 'opacity-100 scale-100 blur-0'
            : 'opacity-100 scale-100 blur-0'
        }`}
      >
        {displayChildren}
      </div>
    </>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <PageTransitionWrapper key={location.key}>
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/nft" element={<NFTService />} />
        <Route path="/services/defi" element={<DeFiService />} />
        <Route path="/services/gamefi" element={<GameFiService />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/research" element={<Research />} />
        <Route path="/research/:slug" element={<ResearchDetail />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransitionWrapper>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
