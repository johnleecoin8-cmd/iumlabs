import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import React, { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import PageIntro from "@/components/PageIntro";
import RouteProgressBar from "@/components/RouteProgressBar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import logo from "@/assets/logo.png";

// Lazy-loaded page components
const Projects = React.lazy(() => import("./pages/Projects"));
const ProjectDetail = React.lazy(() => import("./pages/ProjectDetail"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Blog = React.lazy(() => import("./pages/Research"));
const BlogDetail = React.lazy(() => import("./pages/ResearchDetail"));
const GTMService = React.lazy(() => import("./pages/GTMService"));
const BrandingService = React.lazy(() => import("./pages/BrandingService"));
const SEOAdsService = React.lazy(() => import("./pages/SEOAdsService"));
const OfflineEventService = React.lazy(() => import("./pages/OfflineEventService"));
const CommunityService = React.lazy(() => import("./pages/CommunityService"));
const DeepResearchService = React.lazy(() => import("./pages/DeepResearchService"));
const InfluencerService = React.lazy(() => import("./pages/InfluencerService"));
const PRService = React.lazy(() => import("./pages/PRService"));
const AMAService = React.lazy(() => import("./pages/AMAService"));
const Terms = React.lazy(() => import("./pages/Terms"));
const Privacy = React.lazy(() => import("./pages/Privacy"));
const Transparency = React.lazy(() => import("./pages/Transparency"));
const Jobs = React.lazy(() => import("./pages/Jobs"));
const KInfluenceGrid = React.lazy(() => import("./pages/KInfluenceGrid"));
const MobileServicesPage = React.lazy(() => import("./pages/MobileServicesPage"));
const CryptoMarketingKorea = React.lazy(() => import("./pages/CryptoMarketingKorea"));
const KOLMarketingKorea = React.lazy(() => import("./pages/KOLMarketingKorea"));
const KoreaWeb3Guide = React.lazy(() => import("./pages/KoreaWeb3Guide"));
const KoreaCommunityManagement = React.lazy(() => import("./pages/seo-landing/KoreaCommunityManagement"));
const KoreaPRMedia = React.lazy(() => import("./pages/seo-landing/KoreaPRMedia"));
const KoreaEventMarketing = React.lazy(() => import("./pages/seo-landing/KoreaEventMarketing"));
const KoreaSEONaver = React.lazy(() => import("./pages/seo-landing/KoreaSEONaver"));
const KoreaExchangeListing = React.lazy(() => import("./pages/seo-landing/KoreaExchangeListing"));
const BookMeeting = React.lazy(() => import("./pages/BookMeeting"));
const PitchDeck = React.lazy(() => import("./pages/PitchDeck"));

// SEO Article Pages
const HowToLaunchTokenInKorea = React.lazy(() => import("./pages/seo-articles/how-to-launch-token-in-korea"));
const KoreanCryptoKOLMarketingGuide = React.lazy(() => import("./pages/seo-articles/korean-crypto-kol-marketing-guide"));
const NaverSEOForCryptoProjects = React.lazy(() => import("./pages/seo-articles/naver-seo-for-crypto-projects"));
const KoreaCryptoCommunityBuilding = React.lazy(() => import("./pages/seo-articles/korea-crypto-community-building"));
const Web3EventMarketingKorea = React.lazy(() => import("./pages/seo-articles/web3-event-marketing-korea"));
const KoreaCryptoPRMediaGuide = React.lazy(() => import("./pages/seo-articles/korea-crypto-pr-media-guide"));
const UnderstandingKoreanCryptoInvestors = React.lazy(() => import("./pages/seo-articles/understanding-korean-crypto-investors"));

// Static research articles (no Supabase)
const StablecoinSiege = React.lazy(() => import("./pages/research-static/stablecoin-siege"));
const KoreaDefiParadox = React.lazy(() => import("./pages/research-static/korea-defi-paradox"));
const KoreaMemecoinParadox = React.lazy(() => import("./pages/research-static/korea-memecoin-paradox"));
const UpbitDominanceTokenEconomics = React.lazy(() => import("./pages/research-static/upbit-dominance-token-economics"));
const AiCryptoKoreaDepin = React.lazy(() => import("./pages/research-static/ai-crypto-korea-depin"));

// Lazy-loaded admin pages
const AdminLogin = React.lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProjects = React.lazy(() => import("./pages/admin/AdminProjects"));
const ProjectForm = React.lazy(() => import("./pages/admin/ProjectForm"));
const AdminBlog = React.lazy(() => import("./pages/admin/AdminResearch"));
const BlogForm = React.lazy(() => import("./pages/admin/ResearchForm"));
const AdminContacts = React.lazy(() => import("./pages/admin/AdminContacts"));
const AdminJobApplications = React.lazy(() => import("./pages/admin/AdminJobApplications"));

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
      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Navigate to="/services/gtm" replace />} />
        <Route path="/services/all" element={<Navigate to="/services/gtm" replace />} />
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
        {/* SEO Article Pages (static routes before dynamic :slug) */}
        <Route path="/blog/how-to-launch-token-in-korea" element={<HowToLaunchTokenInKorea />} />
        <Route path="/blog/korean-crypto-kol-marketing-guide" element={<KoreanCryptoKOLMarketingGuide />} />
        <Route path="/blog/naver-seo-for-crypto-projects" element={<NaverSEOForCryptoProjects />} />
        <Route path="/blog/korea-crypto-community-building" element={<KoreaCryptoCommunityBuilding />} />
        <Route path="/blog/web3-event-marketing-korea" element={<Web3EventMarketingKorea />} />
        <Route path="/blog/korea-crypto-pr-media-guide" element={<KoreaCryptoPRMediaGuide />} />
        <Route path="/blog/understanding-korean-crypto-investors" element={<UnderstandingKoreanCryptoInvestors />} />
        <Route path="/blog/the-stablecoin-siege-usdt-vs-usdc-in-asia" element={<StablecoinSiege />} />
        <Route path="/blog/korea-defi-paradox-why-active-traders-wont-touch-onchain" element={<KoreaDefiParadox />} />
        <Route path="/blog/korea-memecoin-paradox-4-7b-volume-zero-organic-projects" element={<KoreaMemecoinParadox />} />
        <Route path="/blog/upbit-dominance-how-78-percent-market-share-reshapes-token-economics" element={<UpbitDominanceTokenEconomics />} />
        <Route path="/blog/ai-crypto-korea-why-800m-depin-narrative-hasnt-landed" element={<AiCryptoKoreaDepin />} />
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
        <Route path="/korea-community-management" element={<KoreaCommunityManagement />} />
        <Route path="/korea-pr-media" element={<KoreaPRMedia />} />
        <Route path="/korea-event-marketing" element={<KoreaEventMarketing />} />
        <Route path="/korea-seo-naver" element={<KoreaSEONaver />} />
        <Route path="/korea-exchange-listing" element={<KoreaExchangeListing />} />
        <Route path="/deck" element={<PitchDeck />} />
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
      </Suspense>
    </PageTransitionWrapper>
  );
};

// Main App component with intro handling
const useGlobalAutoplay = () => {
  useEffect(() => {
    const playAll = () => {
      document.querySelectorAll<HTMLVideoElement>("video[autoplay]").forEach(v => {
        if (v.paused) v.play().catch(() => {});
      });
    };
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting && v.paused) v.play().catch(() => {});
      });
    }, { threshold: 0.1 });
    const observe = () => {
      document.querySelectorAll<HTMLVideoElement>("video[autoplay]").forEach(v => io.observe(v));
    };
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    const events = ["touchstart", "click", "scroll", "mousemove"] as const;
    const kick = () => { playAll(); events.forEach(e => document.removeEventListener(e, kick)); };
    events.forEach(e => document.addEventListener(e, kick, { once: true, passive: true }));
    return () => { io.disconnect(); mo.disconnect(); events.forEach(e => document.removeEventListener(e, kick)); };
  }, []);
};

const AppContent = () => {
  useGlobalAutoplay();
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
      <RouteProgressBar />
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
