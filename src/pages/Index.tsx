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
  src: storyOriginSummit,
  alt: "Story Protocol Origin Summit event organized by ium Labs in Seoul"
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
import CTABannerSection from "@/components/CTABannerSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import Footer from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { MessageSquare, FileText, Rocket, TrendingUp, Check, ArrowRight } from "lucide-react";
const processPhases = [{
  title: "ANALYZE",
  subtitle: "Intelligence",
  icon: MessageSquare,
  subPoints: ["Deep Market Research", "Competitor Landscape Analysis", "Narrative Localization"],
  quote: '"We don\'t guess. We analyze."'
}, {
  title: "BUILD",
  subtitle: "Foundation & Community",
  icon: FileText,
  subPoints: ["KOL & Alpha Group Onboarding", "Community Architecture", "Localized Content Creation"],
  quote: '"Cultivating the core audience before the noise."'
}, {
  title: "IGNITE",
  subtitle: "Launch & Viral",
  icon: Rocket,
  subPoints: ["Viral Marketing & Amplification", "Cross-Community AMAs", "Tier-1 PR & Media Blast"],
  quote: '"Sparking the flame. Maximum impact, zero friction."'
}, {
  title: "SCALE",
  subtitle: "Growth & Sustainability",
  icon: TrendingUp,
  subPoints: ["On-chain Events & Campaigns", "Liquidity Initiatives", "Holder Retention Programs"],
  quote: '"Turning hype into sustainable retention."'
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
      <div className="relative w-full h-[420px] sm:h-[400px] md:h-[420px] lg:h-[450px] rounded-lg md:rounded-xl overflow-hidden group">
        {/* Background Image - Fixed Billboard */}
        <img src={seoulMetroBillboard} alt="Seoul Metro Billboard Campaign" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-center" />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        
        {/* 4-Sector Grid Overlay - 모바일 2x2, 태블릿 2x2, 데스크톱 4열 */}
        <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {processPhases.map((phase, index) => {
          const Icon = phase.icon;
          const isHovered = hoveredIndex === index;
          const hasHover = hoveredIndex !== null;

          // 스텝 번호별 그라데이션 색상 (진행감 표현)
          const stepColors = ['text-white/50',
          // 01
          'text-white/60',
          // 02
          'text-white/70',
          // 03
          'text-white/90' // 04
          ];
          return <div key={index} className={`
                  relative flex flex-col items-center justify-center 
                  gap-0.5 sm:gap-1 p-2 sm:p-3 md:p-6
                  ${index === 0 || index === 2 ? 'border-r border-white/10' : ''}
                  ${index === 0 || index === 1 ? 'border-b border-white/10' : ''}
                  lg:border-r lg:border-b-0 lg:last:border-r-0
                  cursor-pointer active:scale-[0.97] transition-transform will-change-transform
                  ${isHovered ? 'bg-white/10 backdrop-blur-sm' : hasHover ? 'bg-black/20' : 'bg-transparent'}
                `} style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.5s ease-out ${index * 100}ms, transform 0.5s ease-out ${index * 100}ms, background-color 0.5s ease-out`
          }} onMouseEnter={() => {
            setIsPaused(true);
            setHoveredIndex(index);
          }} onMouseLeave={() => {
            setIsPaused(false);
          }} onClick={() => {
            setHoveredIndex(index);
          }}>
                {/* Step Number - 진행감 있는 색상 */}
                <span className={`
                  absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4
                  text-xs md:text-sm font-mono tracking-widest
                  transition-all duration-300
                  ${isHovered ? 'text-white' : stepColors[index]}
                `}>
                  0{index + 1}
                </span>
                
                {/* 연결 화살표 - 1→2 (오른쪽) */}
                {index === 0 && <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 lg:hidden">
                    <div className="w-5 h-5 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <ArrowRight className="w-3 h-3 text-white/70" />
                    </div>
                  </div>}
                
                {/* 연결 화살표 - 2→3 (아래로) */}
                {index === 1 && <div className="absolute bottom-0 right-1/4 translate-y-1/2 z-20 lg:hidden">
                    
                  </div>}
                
                {/* 연결 화살표 - 3→4 (오른쪽) */}
                {index === 2 && <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 lg:hidden">
                    <div className="w-5 h-5 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <ArrowRight className="w-3 h-3 text-white/70" />
                    </div>
                  </div>}
                
                {/* Icon */}
                <div className={`
                  w-8 h-8 sm:w-9 sm:h-9 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex-shrink-0
                  flex items-center justify-center mb-0.5 sm:mb-1 md:mb-2 lg:mb-3
                  border transition-all duration-500
                  ${isHovered ? 'bg-white/20 border-white/40 scale-110' : 'bg-white/5 border-white/20'}
                `}>
                  <Icon className={`
                    w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-all duration-500
                    ${isHovered ? 'text-white rotate-[360deg]' : 'text-white/60 rotate-0'}
                  `} />
                </div>
                
                {/* Content */}
                <div className="text-center">
                  {/* Title */}
                  <h4 className={`
                    text-[10px] sm:text-xs md:text-sm lg:text-lg font-medium
                    transition-all duration-300
                    ${isHovered ? 'text-white' : 'text-white/80'}
                  `}>
                    {phase.title}
                  </h4>
                  
                  {/* Description - 모바일에서 간략히, 호버 시 상세 */}
                  <div className={`
                    mt-0.5 sm:mt-1 md:mt-2 overflow-hidden
                    transition-all duration-500 ease-out
                    ${isHovered ? 'max-h-[80px] sm:max-h-[100px] opacity-100' : 'max-h-[32px] sm:max-h-[40px] opacity-80'}
                  `}>
                    <p className={`
                      text-[8px] sm:text-[9px] md:text-xs lg:text-sm text-white/40 uppercase tracking-wide
                      transition-all duration-500 mb-1 line-clamp-2
                      ${isHovered ? 'opacity-100' : 'opacity-70'}
                    `}>
                      {phase.subtitle}
                    </p>
                    
                    {/* Sub Points - 호버 시에만 */}
                    <div className={`
                      space-y-0.5 transition-all duration-500 delay-100
                      ${isHovered ? 'opacity-100 max-h-[80px]' : 'opacity-0 max-h-0 overflow-hidden'}
                    `}>
                      {phase.subPoints.map((point, i) => <div key={i} className="flex items-center justify-center gap-1 text-[9px] sm:text-[10px] md:text-xs text-white/60">
                          <span className="line-clamp-1">{point}</span>
                        </div>)}
                      <p className="text-[8px] sm:text-[9px] md:text-[10px] text-primary/80 italic mt-1">{phase.quote}</p>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Accent Line */}
                <div className={`
                  absolute bottom-0 left-1/2 -translate-x-1/2
                  h-[2px] bg-gradient-to-r from-transparent via-white to-transparent
                  transition-all duration-500
                  ${isHovered ? 'w-3/4 opacity-100' : 'w-0 opacity-0'}
                `} />
              </div>;
        })}
        </div>
        
        {/* Corner Decorations */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-2">
          <span className="text-[10px] md:text-xs text-white/50 font-mono tracking-wider">HOW WE WORK</span>
        </div>
        
        {/* Bottom CTA */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 md:bottom-4">
          
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
                <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest w-6">01</span>
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
                <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest w-6">02</span>
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
      
      {/* Cases (Portfolio) - 03 */}
      <section className="bg-surface-base" id="cases">
        <div className="border-t border-white/10">
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
                <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest w-6">04</span>
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
          <ContactFormSection sectionNumber="05" />
        </AnimatedSection>
      </section>
      
      {/* CTA Banner */}
      <CTABannerSection />
      
      {/* Footer Links */}
      <FooterLinksSection />
      
      {/* Footer Brand */}
      <Footer />
      
      
    </div>;
};
export default Index;