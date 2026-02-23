import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";

import seoulMetroBillboard from "@/assets/campaigns/seoul-metro-billboard.jpeg";
import storyOriginSummit from "@/assets/campaigns/story-origin-summit.jpg";
import ondoSeminar from "@/assets/campaigns/ondo-seminar.jpg";
import synfuturesBillboard from "@/assets/campaigns/synfutures-billboard.jpg";
import peaqSummit from "@/assets/campaigns/peaq-summit.jpg";
const campaignImages = [{
  src: seoulMetroBillboard,
  alt: "Seoul Metro Billboard Campaign for Web3 project marketing in Korea"
}, {
  src: ondoSeminar,
  alt: "Ondo Finance Korean market seminar hosted by ium Labs"
}, {
  src: synfuturesBillboard,
  alt: "SynFutures Gangnam billboard advertising campaign in Seoul"
}, {
  src: peaqSummit,
  alt: "Peaq Network Korean summit and community event"
}];
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ContactFormSection from "@/components/ContactFormSection";

// Lazy load heavy components for faster initial page load
const CasesSection = lazy(() => import("@/components/CasesSection"));
const SelectedWorkShowcase = lazy(() => import("@/components/SelectedWorkShowcase"));
const InsightsSection = lazy(() => import("@/components/InsightsSection"));
const MediaPartnersSection = lazy(() => import("@/components/MediaPartnersSection"));
const PerformanceSection = lazy(() => import("@/components/gtm/PerformanceSection"));

// Loading fallback for lazy components
const SectionLoader = () => <div className="h-64 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
  </div>;

const TrustBadgesSection = lazy(() => import("@/components/TrustBadgesSection"));
import FooterLinksSection from "@/components/FooterLinksSection";
import Footer from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Search, LayoutGrid, Megaphone, TrendingUp, Check, ArrowRight } from "lucide-react";
const processPhases = [{
  title: "Inquiry",
  subtitle: "Discovery",
  icon: Search,
  subPoints: ["Deep Market Research", "Competitor Analysis", "Project Fit Assessment"],
  quote: ''
}, {
  title: "Strategy",
  subtitle: "Planning",
  icon: LayoutGrid,
  subPoints: ["Community Architecture", "KOL Network Mapping", "Content Localization"],
  quote: ''
}, {
  title: "Amplify",
  subtitle: "Launch",
  icon: Megaphone,
  subPoints: ["Viral Marketing & Amplification", "Tier-1 PR Blast", "Cross-Community AMAs"],
  quote: ''
}, {
  title: "Growth",
  subtitle: "Scale",
  icon: TrendingUp,
  subPoints: ["On-chain Events & Campaigns", "Holder Retention Programs", "Sustainable Growth"],
  quote: ''
}];
const ProcessBillboardOverlay = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const {
    isMobile,
    shouldDisableHeavyAnimations
  } = useMobileOptimization();

  // Auto-cycle through phases - COMPLETELY DISABLED on mobile for performance
  useEffect(() => {
    // Skip auto-cycling entirely on mobile to prevent battery drain
    if (!isVisible || isPaused || isMobile || shouldDisableHeavyAnimations) return;
    const interval = setInterval(() => {
      setHoveredIndex(prev => prev === null ? 0 : (prev + 1) % processPhases.length);
    }, 3000); // 3초마다 (데스크톱에서만)

    return () => clearInterval(interval);
  }, [isVisible, isPaused, isMobile, shouldDisableHeavyAnimations]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.2,
      rootMargin: '50px'
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  return <div ref={sectionRef} className="px-3 sm:px-4 md:px-8 lg:px-10 pt-3 sm:pt-4 md:pt-6 pb-3 sm:pb-4 md:pb-6">
      <div className="relative w-full rounded-lg md:rounded-xl overflow-hidden">
        {/* Background Image - Fixed Billboard */}
        <img src={seoulMetroBillboard} alt="Seoul Metro Billboard Campaign" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-center" />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/70 to-black/50" />
        
        {/* Corner Decoration */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-2 z-10">
          <span className="text-[10px] md:text-xs text-white/50 font-mono tracking-wider">HOW WE WORK</span>
        </div>
        
        {/* Mobile: Full-width vertical list / Desktop: 4-column grid */}
        <div className="relative z-10">
          {/* Desktop Layout - 4-column grid */}
          <div className="hidden lg:grid lg:grid-cols-4 h-[450px]">
            {processPhases.map((phase, index) => {
              const Icon = phase.icon;
              const isHovered = hoveredIndex === index;
              const hasHover = hoveredIndex !== null;
              
              return (
                <div 
                  key={index} 
                  className={`
                    relative flex flex-col items-center justify-center text-center gap-2 p-6
                    border-r last:border-r-0 border-white/10
                    cursor-pointer transition-all duration-500
                    ${isHovered ? 'bg-white/10' : hasHover ? 'bg-black/20' : 'bg-transparent'}
                  `}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s ease-out ${index * 100}ms, transform 0.5s ease-out ${index * 100}ms, background-color 0.5s ease-out`
                  }}
                  onMouseEnter={() => {
                    setIsPaused(true);
                    setHoveredIndex(index);
                  }}
                  onMouseLeave={() => setIsPaused(false)}
                  onClick={() => setHoveredIndex(index)}
                >
                  {/* Step Number */}
                  <span className={`text-sm font-mono tracking-widest mb-2 ${isHovered ? 'text-white/80' : 'text-white/40'} transition-colors`}>
                    0{index + 1}
                  </span>
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 border bg-white/5 border-white/20 ${isHovered ? 'bg-white/20 border-white/40 scale-110' : ''} transition-all duration-500`}>
                    <Icon className={`w-6 h-6 ${isHovered ? 'text-white' : 'text-white/60'}`} />
                  </div>
                  
                  {/* Title & Subtitle */}
                  <h4 className="text-lg font-medium text-white">{phase.title}</h4>
                  <p className="text-sm text-white/40 uppercase tracking-wide">{phase.subtitle}</p>
                  
                  {/* Sub Points - visible on hover */}
                  <div className={`space-y-1 mt-3 transition-all duration-500 ${isHovered ? 'opacity-100 max-h-[100px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                    {phase.subPoints.map((point, i) => (
                      <div key={i} className="text-xs text-white/60">{point}</div>
                    ))}
                  </div>
                  
                  {/* Bottom Accent Line */}
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-500 ${isHovered ? 'w-3/4 opacity-100' : 'w-0 opacity-0'}`} />
                </div>
              );
            })}
          </div>
          
          {/* Mobile/Tablet: Card style grid with center alignment */}
          <div className="lg:hidden py-6 px-4 sm:px-6 grid grid-cols-2 gap-3">
            {processPhases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div 
                  key={index}
                  className="flex flex-col items-center text-center p-4 rounded-xl bg-black/40 border border-white/10"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s ease-out ${index * 100}ms, transform 0.5s ease-out ${index * 100}ms`
                  }}
                >
                  {/* Number */}
                  <span className="text-xs font-mono text-white/40 mb-2">0{index + 1}</span>
                  
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-white/70" />
                  </div>
                  
                  {/* Title & Subtitle */}
                  <h4 className="text-sm font-medium text-white mb-1">{phase.title}</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-wide mb-3">{phase.subtitle}</p>
                  
                  {/* Sub Points */}
                  <div className="space-y-1">
                    {phase.subPoints.map((point, i) => (
                      <div key={i} className="text-[10px] text-white/50 leading-relaxed">
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>;
};
const Index = () => {
  return <div className="min-h-screen bg-surface-base">
      <SEOHead title="ium Labs | Korea Web3 Marketing & GTM Agency" description="ium Labs is the premier Korea Web3 Marketing partner for global projects. We specialize in localized GTM strategy, crypto growth, and community management in South Korea." path="/" keywords={['Korea Web3 Marketing', 'Korean Crypto Marketing', 'Web3 GTM Korea', 'Blockchain Marketing Korea']} />
      
      <Navbar />
      
      {/* Hero - Full Bleed */}
      <main id="hero" className="bg-surface-base">
        <HeroSection />
      </main>
      
      {/* Trust Badges - As Featured In */}
      <Suspense fallback={<SectionLoader />}>
        <TrustBadgesSection />
      </Suspense>
      
      {/* About - 01 */}
      <section className="bg-surface-base" id="why-choose-us">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="bg-[#1A1A1A] flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest w-6">01</span>
                <h2 className="text-lg md:text-xl font-medium text-white">About</h2>
              </div>
              <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Why ium Labs</span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <WhyChooseUsSection />
          </AnimatedSection>
        </div>
      </section>
      
      {/* Selected Work moved below Cases */}
      
      
      {/* Services - 02 */}
      <section className="bg-surface-base" id="services">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="bg-[#1A1A1A] flex items-center justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-center gap-4 md:gap-6">
                <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest w-6">02</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Services</h2>
              </div>
              <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">What We Do</span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <ServicesSection />
          </AnimatedSection>
        </div>
      </section>
      
      {/* Process - 03 */}
      <section className="bg-surface-base" id="process">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="bg-[#1A1A1A] flex items-center justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-center gap-4 md:gap-6">
                <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest w-6">03</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Process</h2>
              </div>
              <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">How We Work</span>
            </div>
          </AnimatedSection>
          
          {/* Featured Billboard Image with Process Overlay */}
          <AnimatedSection delay={100}>
            <ProcessBillboardOverlay />
          </AnimatedSection>
        </div>
      </section>
      
      {/* Cases (Portfolio) - 04 */}
      <section className="bg-surface-base" id="cases">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="bg-[#1A1A1A] flex items-center justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-center gap-4 md:gap-6">
                <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest w-6">04</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Cases</h2>
              </div>
              <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Portfolio</span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <Suspense fallback={<SectionLoader />}>
              <PerformanceSection />
            </Suspense>
          </AnimatedSection>
        </div>
      </section>
      
      
      {/* Insights - 05 */}
      <section className="bg-surface-base" id="insights">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="bg-[#1A1A1A] flex items-center justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-center gap-4 md:gap-6">
                <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest w-6">05</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Insights</h2>
              </div>
              <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Research</span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <Suspense fallback={<SectionLoader />}>
              <InsightsSection />
            </Suspense>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Media Partners - 번호 없음, 헤더 없이 마키만 */}
      <section className="bg-surface-base" id="media-partners">
        <AnimatedSection direction="none">
          <Suspense fallback={<SectionLoader />}>
            <MediaPartnersSection />
          </Suspense>
        </AnimatedSection>
      </section>
      
      {/* Contact - 06 */}
      <section className="bg-surface-base" id="contact">
        <AnimatedSection>
          <ContactFormSection sectionNumber="06" />
        </AnimatedSection>
      </section>
      
      
      {/* Footer Links */}
      <FooterLinksSection />
      
      {/* Footer Brand */}
      <Footer />
      
      
    </div>;
};
export default Index;