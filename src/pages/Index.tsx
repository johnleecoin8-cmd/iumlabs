import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import AnnouncementBar from "@/components/AnnouncementBar";
import seoulMetroBillboard from "@/assets/campaigns/seoul-metro-billboard.jpeg";
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
import { PhoneOutgoing, FileCheck, CreditCard, Rocket, ChevronRight } from "lucide-react";

const processPhases = [
  {
    title: "Inquiry / Meeting",
    icon: PhoneOutgoing,
    subPoints: ["Project Analysis", "Feasibility Consultation"]
  },
  {
    title: "Proposal / Confirm",
    icon: FileCheck,
    subPoints: ["Custom GTM Deck Delivery", "KPI & Scope Confirmation"]
  },
  {
    title: "Payment",
    icon: CreditCard,
    subPoints: ["Service Agreement Signing", "Invoice Settlement"]
  },
  {
    title: "Execution",
    icon: Rocket,
    subPoints: ["Dedicated TF Deployment", "Campaign Launch"]
  }
];

// Arrow connector component
const ArrowConnector = () => (
  <div className="hidden lg:flex items-center justify-center text-white/20">
    <div className="flex items-center gap-0.5">
      <div className="w-[2px] h-8 bg-white/20" />
      <div className="w-[2px] h-8 bg-white/20" />
      <ChevronRight className="w-5 h-5 -ml-1" />
    </div>
  </div>
);

const ProcessSection = () => {
  return (
    <div className="px-3 sm:px-4 md:px-8 lg:px-10 py-4 md:py-6">
      <div className="relative w-full rounded-lg md:rounded-xl overflow-hidden">
        {/* Background Image - Seoul Metro Billboard */}
        <img 
          src={seoulMetroBillboard} 
          alt="Seoul Metro Billboard Campaign" 
          loading="lazy" 
          decoding="async" 
          className="absolute inset-0 w-full h-full object-cover object-center" 
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/75 to-black/60" />
        
        {/* Content */}
        <div className="relative z-10 py-10 md:py-16 px-4 sm:px-6 md:px-10">
          {/* Desktop: 4-column with arrows */}
          <div className="hidden lg:flex items-stretch justify-center gap-4 max-w-6xl mx-auto">
            {processPhases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div key={index} className="contents">
                  {/* Card */}
                  <div className="flex-1 flex flex-col items-center text-center p-8 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/50 hover:border-white/20 transition-all duration-300">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-full border border-white/30 bg-white/10 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-lg font-medium text-white mb-4">{phase.title}</h4>
                    
                    {/* Sub Points */}
                    <ul className="space-y-2">
                      {phase.subPoints.map((point, i) => (
                        <li key={i} className="text-sm text-white/60 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-white/40" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Arrow between cards (not after last) */}
                  {index < processPhases.length - 1 && <ArrowConnector />}
                </div>
              );
            })}
          </div>
          
          {/* Tablet: 2x2 grid */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-4 max-w-2xl mx-auto">
            {processPhases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center p-6 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10"
                >
                  {/* Step Number */}
                  <span className="text-xs font-mono text-white/40 mb-3">0{index + 1}</span>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-white/90" strokeWidth={1.5} />
                  </div>
                  
                  {/* Title */}
                  <h4 className="text-base font-medium text-white mb-3">{phase.title}</h4>
                  
                  {/* Sub Points */}
                  <ul className="space-y-1.5">
                    {phase.subPoints.map((point, i) => (
                      <li key={i} className="text-xs text-white/60">• {point}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          
          {/* Mobile: Single column list */}
          <div className="md:hidden space-y-3">
            {processPhases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 flex-shrink-0 rounded-full border border-white/30 bg-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white/90" strokeWidth={1.5} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono text-white/40">0{index + 1}</span>
                      <h4 className="text-sm font-medium text-white">{phase.title}</h4>
                    </div>
                    <ul className="space-y-1">
                      {phase.subPoints.map((point, i) => (
                        <li key={i} className="text-xs text-white/60">• {point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
const Index = () => {
  return (
    <div className="min-h-screen bg-surface-base">
      <SEOHead title="ium Labs | Korea Web3 Marketing & GTM Agency" description="ium Labs is the premier Korea Web3 Marketing partner for global projects. We specialize in localized GTM strategy, crypto growth, and community management in South Korea." path="/" keywords={['Korea Web3 Marketing', 'Korean Crypto Marketing', 'Web3 GTM Korea', 'Blockchain Marketing Korea']} />
      <AnnouncementBar />
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
          
          {/* Process Cards Section */}
          <AnimatedSection delay={100}>
            <ProcessSection />
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
      
      
    </div>
  );
};
export default Index;