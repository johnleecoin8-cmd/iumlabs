import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import React, { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import PageIntro from "@/components/PageIntro";
import CustomCursor from '@/components/CustomCursor';
import RouteProgressBar from "@/components/RouteProgressBar";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

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
const LiquidityService = React.lazy(() => import("./pages/LiquidityService"));
const ListingService = React.lazy(() => import("./pages/ListingService"));
const ExchangeMarketingService = React.lazy(() => import("./pages/ExchangeMarketingService"));
const CapitalService = React.lazy(() => import("./pages/CapitalService"));
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

// Static research articles now served by ResearchDetail via static-research-posts.ts

// Lazy-loaded admin pages
const AdminLogin = React.lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProjects = React.lazy(() => import("./pages/admin/AdminProjects"));
const ProjectForm = React.lazy(() => import("./pages/admin/ProjectForm"));
const AdminBlog = React.lazy(() => import("./pages/admin/AdminResearch"));
const BlogForm = React.lazy(() => import("./pages/admin/ResearchForm"));
const AdminContacts = React.lazy(() => import("./pages/admin/AdminContacts"));
const AdminJobApplications = React.lazy(() => import("./pages/admin/AdminJobApplications"));
const AdminGSC = React.lazy(() => import("./pages/admin/AdminGSC"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return null;
};

// Lightweight page transition, quick fade/rise on route change (keyed remount in AppRoutes)
const PageTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="animate-page-in">{children}</div>
  );
};

// Route-level loading: a thin indeterminate top bar instead of a blank black screen.
const RouteLoading = () => (
  <div className="min-h-screen bg-[#0A0A0A]">
    <div className="fixed inset-x-0 top-0 z-[100] h-[2px] overflow-hidden bg-white/5">
      <div
        className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
        style={{ animation: "routebar 1.1s ease-in-out infinite" }}
      />
    </div>
    <style>{"@keyframes routebar{0%{transform:translateX(-120%)}100%{transform:translateX(420%)}}"}</style>
  </div>
);

const AppRoutes = () => {
  const location = useLocation();

  return (
    <PageTransitionWrapper key={location.pathname}>
      <Suspense fallback={<RouteLoading />}>
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
        <Route path="/services/liquidity" element={<LiquidityService />} />
        <Route path="/services/listing" element={<ListingService />} />
        <Route path="/services/exchange-marketing" element={<ExchangeMarketingService />} />
        <Route path="/services/tokenomics" element={<Navigate to="/services/exchange-marketing" replace />} />
        <Route path="/services/capital" element={<CapitalService />} />
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
        {/* Static research articles now handled by /blog/:slug via ResearchDetail + static-research-posts.ts */}
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
        <Route path="/ium-admin/gsc" element={<AdminGSC />} />
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
    // iOS Safari decodes only a few inline videos at once. Only ever play the
    // ones currently on screen, and pause the rest, so a visible video always
    // has a free decoder slot (otherwise some videos never start on mobile).
    // React doesn't reliably reflect the JSX `muted` prop onto the DOM element,
    // so Safari treats the video as unmuted and blocks autoplay (poster + a play
    // button show instead). Force muted + inline imperatively before every play.
    const ensurePlayable = (v: HTMLVideoElement) => {
      v.muted = true;
      v.defaultMuted = true;
      v.setAttribute("muted", "");
      v.playsInline = true;
      v.setAttribute("playsinline", "");
    };
    const syncPlayback = () => {
      document.querySelectorAll<HTMLVideoElement>("video[autoplay]").forEach(v => {
        const r = v.getBoundingClientRect();
        const onScreen = r.bottom > 0 && r.top < window.innerHeight;
        if (onScreen) {
          if (v.paused) { ensurePlayable(v); v.play().catch(() => {}); }
        } else if (!v.paused) {
          v.pause();
        }
      });
    };
    const playAll = syncPlayback;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting) {
          if (v.paused) { ensurePlayable(v); v.play().catch(() => {}); }
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { threshold: 0.1 });
    const observe = () => {
      document.querySelectorAll<HTMLVideoElement>("video[autoplay]").forEach(v => io.observe(v));
    };
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    const events = ["touchstart", "click", "scroll", "mousemove"] as const;
    const kick = () => { playAll(); };
    events.forEach(e => document.addEventListener(e, kick, { passive: true }));
    return () => { io.disconnect(); mo.disconnect(); events.forEach(e => document.removeEventListener(e, kick)); };
  }, []);
};

const AppContent = () => {
  useGlobalAutoplay();
  useSmoothScroll();
  // Prefetch the heavy/common route chunks while the browser is idle, so navigating
  // to Projects / case studies / blog doesn't pay a cold JS-download cost on click.
  useEffect(() => {
    const prefetch = () => {
      [
        () => import("./pages/Projects"),
        () => import("./pages/ProjectDetail"),
        () => import("./pages/Research"),
        () => import("./pages/ResearchDetail"),
        () => import("./pages/Contact"),
        () => import("./pages/Jobs"),
        () => import("./pages/KInfluenceGrid"),
        () => import("./pages/BookMeeting"),
        () => import("./pages/PitchDeck"),
        () => import("./pages/GTMService"),
        () => import("./pages/BrandingService"),
        () => import("./pages/SEOAdsService"),
        () => import("./pages/OfflineEventService"),
        () => import("./pages/CommunityService"),
        () => import("./pages/DeepResearchService"),
        () => import("./pages/InfluencerService"),
        () => import("./pages/PRService"),
        () => import("./pages/AMAService"),
        () => import("./pages/LiquidityService"),
        () => import("./pages/ListingService"),
        () => import("./pages/ExchangeMarketingService"),
        () => import("./pages/CapitalService"),
        () => import("./pages/CryptoMarketingKorea"),
        () => import("./pages/KOLMarketingKorea"),
        () => import("./pages/KoreaWeb3Guide"),
      ].forEach((load) => load());
    };
    const w = window as typeof window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(prefetch);
    else setTimeout(prefetch, 1500);
  }, []);
  const location = useLocation();
  // The home page is video-heavy, so its loader must run every time the user
  // lands on "/", not just on first visit, and must fully preload before reveal.
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.location.pathname === '/';
  });
  const prevPath = useRef(location.pathname);

  // Re-trigger the intro loader whenever we navigate INTO the home page.
  useEffect(() => {
    const from = prevPath.current;
    prevPath.current = location.pathname;
    if (location.pathname === '/' && from !== '/') {
      setShowIntro(true);
    }
  }, [location.pathname]);

  // Gate for CSS entrance choreography (hero line-mask reveal): the
  // .intro-done class flips the moment the loader is gone, so transitions
  // start exactly when the page becomes visible instead of behind the loader.
  useEffect(() => {
    document.body.classList.toggle('intro-done', !showIntro);
  }, [showIntro]);

  // activetheory.net fading scrollbar: thumb appears while scrolling
  // (--baropacity), decays ~700ms after the last scroll event.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const root = document.documentElement;
    const onScroll = () => {
      root.style.setProperty('--baropacity', '0.35');
      clearTimeout(timer);
      timer = setTimeout(() => root.style.setProperty('--baropacity', '0'), 700);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(timer); };
  }, []);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.querySelectorAll<HTMLVideoElement>("video[autoplay]").forEach(v => {
          if (v.paused) {
            v.muted = true;
            v.play().catch(() => {});
          }
        });
      }, 200);
    });
  }, []);

  return (
    <>
      {showIntro && <PageIntro onComplete={handleIntroComplete} />}
      <CustomCursor />
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
