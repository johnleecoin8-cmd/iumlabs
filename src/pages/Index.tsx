import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
const ProcessInteractiveNumbers = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useMobileOptimization();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activePhase = processPhases[activeIndex];
  const ActiveIcon = activePhase.icon;

  return (
    <div ref={sectionRef} className="px-3 sm:px-4 md:px-8 lg:px-10 py-8 md:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Desktop: Numbers left + Detail right */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center min-h-[400px]">
          {/* Left: Large interactive numbers */}
          <div className="flex flex-col gap-2">
            {processPhases.map((phase, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`group relative flex items-center gap-6 px-6 py-5 rounded-2xl text-left transition-all duration-500 ${
                    isActive
                      ? 'bg-white/[0.06] border border-white/[0.12]'
                      : 'bg-transparent border border-transparent hover:bg-white/[0.03]'
                  }`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                    transition: `opacity 0.6s ease-out ${index * 120}ms, transform 0.6s ease-out ${index * 120}ms`
                  }}
                >
                  {/* Large Number */}
                  <span className={`text-5xl font-bold font-mono transition-colors duration-500 ${
                    isActive ? 'text-primary' : 'text-white/15 group-hover:text-white/30'
                  }`}>
                    0{index + 1}
                  </span>

                  {/* Title + Subtitle */}
                  <div className="flex flex-col">
                    <span className={`text-lg font-semibold transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                    }`}>
                      {phase.title}
                    </span>
                    <span className={`text-xs uppercase tracking-wider transition-colors duration-300 ${
                      isActive ? 'text-white/50' : 'text-white/20'
                    }`}>
                      {phase.subtitle}
                    </span>
                  </div>

                  {/* Active indicator line */}
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full bg-primary"
                    initial={false}
                    animate={{ height: isActive ? '60%' : '0%', opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Right: Detail panel with slide animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative p-8 md:p-10 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm"
            >
              {/* Background glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10">
                {/* Icon + Phase label */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <ActiveIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white">{activePhase.title}</h4>
                    <p className="text-sm text-white/40 uppercase tracking-wider">{activePhase.subtitle}</p>
                  </div>
                </div>

                {/* Sub-points with stagger */}
                <div className="space-y-3">
                  {activePhase.subPoints.map((point, i) => (
                    <motion.div
                      key={`${activeIndex}-${i}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                      <span className="text-sm text-white/70 leading-relaxed">{point}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Step progress indicator */}
                <div className="flex gap-2 mt-8">
                  {processPhases.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === activeIndex ? 'w-8 bg-primary' : 'w-3 bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile: Vertical accordion style */}
        <div className="lg:hidden space-y-3">
          {processPhases.map((phase, index) => {
            const Icon = phase.icon;
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                className={`rounded-xl border transition-all duration-400 overflow-hidden ${
                  isActive
                    ? 'bg-white/[0.05] border-white/[0.12]'
                    : 'bg-transparent border-white/[0.06]'
                }`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease-out ${index * 100}ms, transform 0.5s ease-out ${index * 100}ms`
                }}
              >
                <button
                  onClick={() => setActiveIndex(index)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left"
                >
                  <span className={`text-2xl font-bold font-mono transition-colors duration-300 ${
                    isActive ? 'text-primary' : 'text-white/15'
                  }`}>
                    0{index + 1}
                  </span>
                  <div className="flex-1">
                    <h4 className={`text-sm font-semibold transition-colors ${isActive ? 'text-white' : 'text-white/50'}`}>
                      {phase.title}
                    </h4>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider">{phase.subtitle}</p>
                  </div>
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-primary' : 'text-white/20'}`} />
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 space-y-2 border-t border-white/[0.06] pt-3 ml-12">
                        {phase.subPoints.map((point, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="mt-1.5 w-1 h-1 rounded-full bg-primary/50 flex-shrink-0" />
                            <span className="text-xs text-white/60">{point}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
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
            <ProcessInteractiveNumbers />
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