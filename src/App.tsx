import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { HelmetProvider } from "react-helmet-async";
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
import AMAService from "./pages/AMAService";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Transparency from "./pages/Transparency";
import Jobs from "./pages/Jobs";
import KInfluenceGrid from "./pages/KInfluenceGrid";
import MobileServicesPage from "./pages/MobileServicesPage";
import CryptoMarketingKorea from "./pages/CryptoMarketingKorea";
import KOLMarketingKorea from "./pages/KOLMarketingKorea";
import KoreaWeb3Guide from "./pages/KoreaWeb3Guide";
import BookMeeting from "./pages/BookMeeting";
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

// Logo center pulse page transition
const PageTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [phase, setPhase] = useState<'idle' | 'fadeOut' | 'logo' | 'fadeIn'>('idle');
  const isFirstMount = useRef(true);
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    // Skip animation on first mount
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    // Only animate if pathname actually changed
    if (prevPathname.current === location.pathname) {
      return;
    }
    prevPathname.current = location.pathname;

    // Start transition sequence
    setPhase('fadeOut');

    const fadeOutTimer = setTimeout(() => {
      setPhase('logo');
    }, 200);

    const logoTimer = setTimeout(() => {
      setDisplayChildren(children);
      setPhase('fadeIn');
    }, 600);

    const fadeInTimer = setTimeout(() => {
      setPhase('idle');
    }, 850);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(logoTimer);
      clearTimeout(fadeInTimer);
    };
  }, [location.pathname, children]);

  // Update children immediately when not transitioning
  useEffect(() => {
    if (phase === 'idle' && children !== displayChildren) {
      setDisplayChildren(children);
    }
  }, [children, displayChildren, phase]);

  return (
    <>
      {/* Logo overlay */}
      {(phase === 'logo' || phase === 'fadeOut') && (
        <div 
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
          style={{ willChange: 'opacity' }}
        >
          <img 
            src={logo} 
            alt="ium Labs" 
            className={`w-16 h-16 object-contain rounded-xl ${
              phase === 'logo' ? 'animate-logo-pulse' : 'opacity-0'
            }`}
            style={{ willChange: 'opacity, transform' }}
          />
        </div>
      )}

      {/* Page content */}
      <div 
        className={`transition-opacity duration-200 ease-out ${
          phase === 'fadeOut' || phase === 'logo' 
            ? 'opacity-0' 
            : 'opacity-100'
        }`}
        style={{ willChange: 'opacity' }}
      >
        {displayChildren}
      </div>
    </>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <PageTransitionWrapper key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Navigate to="/services/gtm" replace />} />
        <Route path="/services/all" element={<MobileServicesPage />} />
        <Route path="/services/gtm" element={<GTMService />} />
        <Route path="/services/compliance" element={<BrandingService />} />
        <Route path="/services/branding" element={<Navigate to="/services/compliance" replace />} />
        <Route path="/services/seo-ads" element={<SEOAdsService />} />
        <Route path="/services/offline-event" element={<OfflineEventService />} />
        <Route path="/services/community" element={<CommunityService />} />
        <Route path="/services/deep-research" element={<DeepResearchService />} />
        <Route path="/services/influencer" element={<InfluencerService />} />
        <Route path="/services/pr" element={<PRService />} />
        <Route path="/services/ama" element={<AMAService />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-a-meeting" element={<BookMeeting />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/research" element={<Navigate to="/blog" replace />} />
        <Route path="/research/:slug" element={<Navigate to="/blog" replace />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/transparency" element={<Transparency />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/k-leaderboard" element={<KInfluenceGrid />} />
        <Route path="/crypto-marketing-korea" element={<CryptoMarketingKorea />} />
        <Route path="/kol-marketing-korea" element={<KOLMarketingKorea />} />
        <Route path="/korea-web3-guide" element={<KoreaWeb3Guide />} />
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
      <AppRoutes />
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
