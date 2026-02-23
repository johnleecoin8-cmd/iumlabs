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
const processBackgrounds = [seoulMetroBillboard, storyOriginSummit, ondoSeminar, peaqSummit];

const ProcessCardSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useMobileOptimization();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-advance (desktop only)
  useEffect(() => {
    if (!isVisible || isMobile) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex(prev => (prev + 1) % processPhases.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isVisible, isMobile]);

  const goTo = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div ref={sectionRef} className="px-3 sm:px-4 md:px-8 lg:px-10 py-4 md:py-8">
      {/* Main card area */}
      <div className="relative w-full aspect-[16/9] md:aspect-[2.4/1] rounded-xl md:rounded-2xl overflow-hidden">
        {/* Background image carousel */}
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <img
              src={processBackgrounds[activeIndex]}
              alt={processPhases[activeIndex].title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 sm:p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="max-w-lg"
            >
              {/* Step badge */}
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <span className="text-xs md:text-sm font-mono text-primary tracking-widest">
                  STEP 0{activeIndex + 1}
                </span>
                <div className="h-px flex-1 max-w-[60px] bg-primary/30" />
              </div>

              {/* Title */}
              <h4 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">
                {processPhases[activeIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-white/50 uppercase tracking-wider mb-4 md:mb-6">
                {processPhases[activeIndex].subtitle}
              </p>

              {/* Sub-points */}
              <div className="space-y-2">
                {processPhases[activeIndex].subPoints.map((point, i) => (
                  <motion.div
                    key={`${activeIndex}-${i}`}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-2.5"
                  >
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-white/70">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom nav: dots + arrows */}
          <div className="flex items-center justify-between mt-6 md:mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {processPhases.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === activeIndex ? 'w-8 bg-primary' : 'w-3 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => goTo((activeIndex - 1 + processPhases.length) % processPhases.length)}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
              <button
                onClick={() => goTo((activeIndex + 1) % processPhases.length)}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Top-right label */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
          <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest">
            {String(activeIndex + 1).padStart(2, '0')} / {String(processPhases.length).padStart(2, '0')}
          </span>
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
            <ProcessCardSlider />
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