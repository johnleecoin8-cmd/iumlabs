import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { HelmetProvider } from "react-helmet-async";
// Sidebar and MobileBottomNav removed — using top Navbar for all breakpoints
import PageIntro from "@/components/PageIntro";
import Index from "./pages/Index";

import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Blog from "./pages/Research";
import BlogDetail from "./pages/ResearchDetail";
import GTMService from "./pages/GTMService";
import BrandingService from "./pages/BrandingService";
import SEOAdsService from "./pages/SEOAdsService";
import OfflineEventService from "./pages/OfflineEventService";
import CommunityService from "./pages/CommunityService";
import DeepResearchService from "./pages/DeepResearchService";
import InfluencerService from "./pages/InfluencerService";
import PRService from "./pages/PRService";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Transparency from "./pages/Transparency";
import Jobs from "./pages/Jobs";
import KInfluenceGrid from "./pages/KInfluenceGrid";
import MobileServicesPage from "./pages/MobileServicesPage";
import NotFound from "./pages/NotFound";
// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import ProjectForm from "./pages/admin/ProjectForm";
import AdminBlog from "./pages/admin/AdminResearch";
import BlogForm from "./pages/admin/ResearchForm";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminJobApplications from "./pages/admin/AdminJobApplications";
import logo from "@/assets/logo.png";

const queryClient = new QueryClient();

// Scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

// Simple fade page transition — story.foundation style
const PageTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [opacity, setOpacity] = useState(1);
  const isFirstMount = useRef(true);
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (prevPathname.current === location.pathname) return;
    prevPathname.current = location.pathname;

    setOpacity(0);
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setOpacity(1);
    }, 250);
    return () => clearTimeout(timer);
  }, [location.pathname, children]);

  useEffect(() => {
    if (opacity === 1 && children !== displayChildren) {
      setDisplayChildren(children);
    }
  }, [children, displayChildren, opacity]);

  return (
    <div
      className="transition-opacity duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]"
      style={{ opacity }}
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
        <Route path="/services/all" element={<MobileServicesPage />} />
        <Route path="/services/gtm" element={<GTMService />} />
        <Route path="/services/branding" element={<BrandingService />} />
        <Route path="/services/seo-ads" element={<SEOAdsService />} />
        <Route path="/services/offline-event" element={<OfflineEventService />} />
        <Route path="/services/community" element={<CommunityService />} />
        <Route path="/services/deep-research" element={<DeepResearchService />} />
        <Route path="/services/influencer" element={<InfluencerService />} />
        <Route path="/services/pr" element={<PRService />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/transparency" element={<Transparency />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/k-leaderboard" element={<KInfluenceGrid />} />
        {/* Hidden Admin Routes */}
        <Route path="/ium-admin" element={<AdminLogin />} />
        <Route path="/ium-admin/dashboard" element={<AdminDashboard />} />
        <Route path="/ium-admin/projects" element={<AdminProjects />} />
        <Route path="/ium-admin/projects/new" element={<ProjectForm />} />
        <Route path="/ium-admin/projects/:id/edit" element={<ProjectForm />} />
        <Route path="/ium-admin/blog" element={<AdminBlog />} />
        <Route path="/ium-admin/blog/new" element={<BlogForm />} />
        <Route path="/ium-admin/blog/:id/edit" element={<BlogForm />} />
        <Route path="/ium-admin/contacts" element={<AdminContacts />} />
        <Route path="/ium-admin/jobs" element={<AdminJobApplications />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransitionWrapper>
  );
};

// Main App component with intro handling
const AppContent = () => {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(() => {
    // Only show intro on first visit in session and on home page
    if (typeof window === 'undefined') return false;
    const hasSeenIntro = sessionStorage.getItem('ium_intro_seen');
    return !hasSeenIntro && window.location.pathname === '/';
  });

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('ium_intro_seen', 'true');
    setShowIntro(false);
  }, []);

  return (
    <>
      {showIntro && <PageIntro onComplete={handleIntroComplete} />}
      <ScrollToTop />
      <div className="w-full">
        <AppRoutes />
      </div>
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
