import { lazy, Suspense } from "react";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ContactFormSection from "@/components/ContactFormSection";

// Lazy load heavy components for faster initial page load
const CasesSection = lazy(() => import("@/components/CasesSection"));
const SelectedWorkShowcase = lazy(() => import("@/components/SelectedWorkShowcase"));
const InsightsSection = lazy(() => import("@/components/InsightsSection"));
const MediaPartnersSection = lazy(() => import("@/components/MediaPartnersSection"));
const PerformanceSection = lazy(() => import("@/components/gtm/PerformanceSection"));
const PartnerCTASection = lazy(() => import("@/components/PartnerCTASection"));

// Loading fallback for lazy components
const SectionLoader = () => <div className="h-64 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
  </div>;

import FooterLinksSection from "@/components/FooterLinksSection";
import Footer from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";

const Index = () => {
  return <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead title="Korea Web3 Marketing & Crypto Agency | ium Labs" description="ium Labs is Korea's #1 Web3 marketing and crypto agency. We provide full-stack GTM strategy, KOL marketing, community growth, and PR for global blockchain projects entering the Korean market." path="/" keywords={['Korea Web3', 'Korea Crypto', 'Korea Web3 Marketing', 'Korea Crypto Agency', 'Web3 GTM Korea', 'Korean Crypto Marketing', 'Blockchain Marketing Korea', 'Web3 Agency Seoul']} />
      
      <Navbar />
      
      {/* Hero - Full Bleed */}
      <main id="hero" className="px-2 sm:px-3 pt-2 sm:pt-3">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden">
          <HeroSection />
        </div>
      </main>

      {/* About */}
      <section className="px-2 sm:px-3 pt-2 sm:pt-3" id="why-choose-us">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06]">
          <AnimatedSection delay={100}>
            <WhyChooseUsSection />
          </AnimatedSection>
          <AnimatedSection direction="none">
            <Suspense fallback={<SectionLoader />}>
              <MediaPartnersSection />
            </Suspense>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Services */}
      <section className="px-2 sm:px-3 pt-2 sm:pt-3" id="services">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06]">
          <div className="px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Our Services</h2>
          </div>
          <AnimatedSection delay={100}>
            <ServicesSection />
          </AnimatedSection>
        </div>
      </section>
      
      {/* Cases */}
      <section className="px-2 sm:px-3 pt-2 sm:pt-3" id="cases">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06]">
          <div className="px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Case Studies</h2>
          </div>
          <AnimatedSection delay={100}>
            <Suspense fallback={<SectionLoader />}>
              <PerformanceSection />
            </Suspense>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Insights */}
      <section className="px-2 sm:px-3 pt-2 sm:pt-3" id="insights">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06]">
          <div className="px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Insights</h2>
          </div>
          <AnimatedSection delay={100}>
            <Suspense fallback={<SectionLoader />}>
              <InsightsSection />
            </Suspense>
          </AnimatedSection>
        </div>
      </section>
      


      
      {/* Partner CTA - Impact Block */}
      <Suspense fallback={<SectionLoader />}>
        
      </Suspense>

      {/* Contact - 05 */}
      <section className="px-2 sm:px-3 pt-2 sm:pt-3" id="contact">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden">
          <AnimatedSection>
            <ContactFormSection />
          </AnimatedSection>
        </div>
      </section>

      {/* Footer Links */}
      <div className="px-2 sm:px-3 pt-2 sm:pt-3">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden">
          <FooterLinksSection />
        </div>
      </div>

      {/* Footer Brand */}
      <div className="px-2 sm:px-3 py-2 sm:py-3">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden">
          <Footer />
        </div>
      </div>
    </div>;
};
export default Index;