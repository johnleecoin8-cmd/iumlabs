import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Research from "./pages/Research";
import ResearchDetail from "./pages/ResearchDetail";
import GTMStrategyService from "./pages/GTMStrategyService";
import CommunityService from "./pages/CommunityService";
import SocialMediaService from "./pages/SocialMediaService";
import InfluencerService from "./pages/InfluencerService";
import YapService from "./pages/YapService";
import PRService from "./pages/PRService";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Transparency from "./pages/Transparency";
import NotFound from "./pages/NotFound";
// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import ProjectForm from "./pages/admin/ProjectForm";
import AdminResearch from "./pages/admin/AdminResearch";
import ResearchForm from "./pages/admin/ResearchForm";
import AdminContacts from "./pages/admin/AdminContacts";

const queryClient = new QueryClient();

// Scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

// Enhanced page transition wrapper
const PageTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  useScrollReveal();

  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (children !== displayChildren) {
      setIsAnimating(true);
      
      // Quick exit animation
      const exitTimer = setTimeout(() => {
        setDisplayChildren(children);
        // Enter animation
        const enterTimer = setTimeout(() => {
          setIsAnimating(false);
        }, 50);
        return () => clearTimeout(enterTimer);
      }, 200);
      
      return () => clearTimeout(exitTimer);
    }
  }, [children, displayChildren]);

  return (
    <div 
      className={`transition-all duration-300 ease-out ${
        isAnimating 
          ? 'opacity-0 translate-y-4' 
          : 'opacity-100 translate-y-0'
      }`}
      style={{ willChange: 'opacity, transform' }}
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
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/transparency" element={<Transparency />} />
        {/* Hidden Admin Routes */}
        <Route path="/ium-admin" element={<AdminLogin />} />
        <Route path="/ium-admin/dashboard" element={<AdminDashboard />} />
        <Route path="/ium-admin/projects" element={<AdminProjects />} />
        <Route path="/ium-admin/projects/new" element={<ProjectForm />} />
        <Route path="/ium-admin/projects/:id/edit" element={<ProjectForm />} />
        <Route path="/ium-admin/research" element={<AdminResearch />} />
        <Route path="/ium-admin/research/new" element={<ResearchForm />} />
        <Route path="/ium-admin/research/:id/edit" element={<ResearchForm />} />
        <Route path="/ium-admin/contacts" element={<AdminContacts />} />
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
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
