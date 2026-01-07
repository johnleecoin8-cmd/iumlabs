import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { SidebarProvider } from "@/hooks/useSidebarState";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Research from "./pages/Research";
import ResearchDetail from "./pages/ResearchDetail";
import GTMService from "./pages/GTMService";
import BrandingService from "./pages/BrandingService";
import SEOAdsService from "./pages/SEOAdsService";
import OfflineEventService from "./pages/OfflineEventService";
import CommunityService from "./pages/CommunityService";
import DeepResearchService from "./pages/DeepResearchService";
import InfluencerService from "./pages/InfluencerService";
import YapService from "./pages/YapService";
import PRService from "./pages/PRService";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Transparency from "./pages/Transparency";
import Jobs from "./pages/Jobs";
import NotFound from "./pages/NotFound";
// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import ProjectForm from "./pages/admin/ProjectForm";
import AdminResearch from "./pages/admin/AdminResearch";
import ResearchForm from "./pages/admin/ResearchForm";
import AdminContacts from "./pages/admin/AdminContacts";
import Logo3D from "@/components/Logo3D";

const queryClient = new QueryClient();

// Scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

// Logo center pulse page transition
const PageTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [phase, setPhase] = useState<'idle' | 'fadeOut' | 'logo' | 'fadeIn'>('idle');
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    // Only animate if pathname actually changed
    if (prevPathname.current === location.pathname) {
      setDisplayChildren(children);
      return;
    }
    prevPathname.current = location.pathname;

    // Start transition sequence
    setPhase('fadeOut');

    const fadeOutTimer = setTimeout(() => {
      setPhase('logo');
    }, 250);

    const logoTimer = setTimeout(() => {
      setDisplayChildren(children);
      setPhase('fadeIn');
    }, 900);

    const fadeInTimer = setTimeout(() => {
      setPhase('idle');
    }, 1200);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(logoTimer);
      clearTimeout(fadeInTimer);
    };
  }, [location.pathname, children]);

  return (
    <>
      {/* Logo overlay */}
      {(phase === 'logo' || phase === 'fadeOut' || phase === 'fadeIn') && (
        <div 
          className={`fixed inset-0 z-[9999] bg-background flex items-center justify-center transition-opacity duration-150 ${
            phase === 'fadeIn' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div 
            className={`w-64 h-32 ${
              phase === 'logo' ? 'animate-logo-pulse' : 'opacity-0'
            }`}
          >
            <Logo3D />
          </div>
        </div>
      )}

      {/* Page content */}
      <div 
        className={`transition-opacity duration-150 ease-out ${
          phase === 'fadeOut' || phase === 'logo' 
            ? 'opacity-0' 
            : 'opacity-100'
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
    <PageTransitionWrapper>
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/gtm" element={<GTMService />} />
        <Route path="/services/branding" element={<BrandingService />} />
        <Route path="/services/seo-ads" element={<SEOAdsService />} />
        <Route path="/services/offline-event" element={<OfflineEventService />} />
        <Route path="/services/community" element={<CommunityService />} />
        <Route path="/services/deep-research" element={<DeepResearchService />} />
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
        <Route path="/jobs" element={<Jobs />} />
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
        <SidebarProvider>
          <ScrollToTop />
          <div className="flex w-full">
            <Sidebar />
            <div className="flex-1 min-w-0 pb-16 lg:pb-0">
              <AppRoutes />
            </div>
            <MobileBottomNav />
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;