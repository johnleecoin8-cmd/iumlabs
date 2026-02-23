import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";

import seoulMetroBillboard from "@/assets/campaigns/seoul-metro-billboard.jpeg";
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
const ProcessIconSteps = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="px-3 sm:px-4 md:px-8 lg:px-10 py-8 md:py-16">
      {/* Desktop: horizontal steps */}
      <div className="hidden md:block">
        {/* Step indicators */}
        <div className="grid grid-cols-4 gap-0 mb-12 relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-white/10" />
          <motion.div 
            className="absolute top-8 left-[12.5%] h-px bg-primary/60"
            initial={{ width: 0 }}
            animate={isVisible ? { width: `${(activeIndex / 3) * 75}%` } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          {processPhases.map((phase, i) => {
            const Icon = phase.icon;
            const isActive = i === activeIndex;
            const isPast = i < activeIndex;
            return (
              <motion.button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="flex flex-col items-center gap-3 relative z-10 group"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-110' 
                    : isPast 
                      ? 'bg-primary/15 text-primary border border-primary/30'
                      : 'bg-white/5 text-white/40 border border-white/10 group-hover:border-white/20 group-hover:text-white/60'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <span className={`text-[10px] font-mono tracking-widest block mb-1 ${
                    isActive ? 'text-primary' : 'text-white/30'
                  }`}>
                    0{i + 1}
                  </span>
                  <span className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-white/50'
                  }`}>
                    {phase.title}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-10"
          >
            <div className="flex items-start gap-8">
              <div className="flex-1">
                <p className="text-xs text-primary font-mono tracking-widest mb-2">
                  STEP 0{activeIndex + 1} — {processPhases[activeIndex].subtitle.toUpperCase()}
                </p>
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  {processPhases[activeIndex].title}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {processPhases[activeIndex].subPoints.map((point, i) => (
                    <motion.div
                      key={`${activeIndex}-${i}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.15 + i * 0.08 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5"
                    >
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white/70">{point}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile: vertical steps */}
      <div className="md:hidden space-y-3">
        {processPhases.map((phase, i) => {
          const Icon = phase.icon;
          const isActive = i === activeIndex;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <button
                onClick={() => setActiveIndex(isActive ? -1 : i)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary/10 border border-primary/30' 
                    : 'bg-white/[0.03] border border-white/5'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isActive ? 'bg-primary text-primary-foreground' : 'bg-white/5 text-white/40'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left flex-1">
                  <span className={`text-[10px] font-mono tracking-widest ${isActive ? 'text-primary' : 'text-white/30'}`}>
                    0{i + 1}
                  </span>
                  <h4 className={`text-sm font-medium ${isActive ? 'text-white' : 'text-white/60'}`}>
                    {phase.title}
                  </h4>
                </div>
                <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                  isActive ? 'rotate-90 text-primary' : 'text-white/20'
                }`} />
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
                    <div className="pt-2 pl-14 pb-2 space-y-2">
                      {phase.subPoints.map((point, j) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: j * 0.08 }}
                          className="flex items-center gap-2"
                        >
                          <Check className="w-3 h-3 text-primary flex-shrink-0" />
                          <span className="text-xs text-white/60">{point}</span>
                        </motion.div>
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
            <ProcessIconSteps />
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