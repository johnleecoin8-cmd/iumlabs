import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
import GTMStrategyService from "./pages/GTMStrategyService";
import CommunityService from "./pages/CommunityService";
import SocialMediaService from "./pages/SocialMediaService";
import InfluencerService from "./pages/InfluencerService";
import YapService from "./pages/YapService";
import PRService from "./pages/PRService";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();

// Page transition wrapper with smooth animations
const PageTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<'enter' | 'exit'>('enter');

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitionStage('exit');
    }
  }, [children, displayChildren]);

  const handleTransitionEnd = () => {
    if (transitionStage === 'exit') {
      setDisplayChildren(children);
      setTransitionStage('enter');
      // Scroll to top on page change
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <div 
      className={`page-transition ${transitionStage === 'enter' ? 'page-enter' : 'page-exit'}`}
      onAnimationEnd={handleTransitionEnd}
    >
      {displayChildren}
    </div>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <PageTransitionWrapper key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/nft" element={<NFTService />} />
        <Route path="/services/defi" element={<DeFiService />} />
        <Route path="/services/gamefi" element={<GameFiService />} />
        <Route path="/services/gtm" element={<GTMStrategyService />} />
        <Route path="/services/community" element={<CommunityService />} />
        <Route path="/services/social-media" element={<SocialMediaService />} />
        <Route path="/services/influencer" element={<InfluencerService />} />
        <Route path="/services/yap" element={<YapService />} />
        <Route path="/services/pr" element={<PRService />} />
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
