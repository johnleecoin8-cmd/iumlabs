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
import CalendlyButton from "@/components/CalendlyButton";
import { Link } from "react-router-dom";

import ctaBgImage from "@/assets/campaigns/event-fisheye.png";

const Index = () => {
  return <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead title="ium Labs | Korea Web3 Marketing & Crypto Agency" description="The fastest way to enter Korea's crypto market. Full-stack GTM strategy, KOL marketing, community growth, and PR — 19+ projects launched. One partner, full execution." path="/" keywords={['Korea Web3', 'Korea Crypto', 'Korea Web3 Marketing', 'Korea Crypto Agency', 'Web3 GTM Korea', 'Korean Crypto Marketing', 'Blockchain Marketing Korea', 'Web3 Agency Seoul']} />
      
      <Navbar />
      
      {/* Hero - Full Bleed */}
      <main id="hero" className="px-3 sm:px-4 pt-2 sm:pt-3">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden">
          <HeroSection />
        </div>
      </main>

      {/* About */}
      <section className="px-3 sm:px-4 pt-2 sm:pt-3" id="why-choose-us">
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
      <section className="px-3 sm:px-4 pt-2 sm:pt-3" id="services">
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
      <section className="px-3 sm:px-4 pt-2 sm:pt-3" id="cases">
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
      <section className="px-3 sm:px-4 pt-2 sm:pt-3" id="insights">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06]">
          <div className="px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Blog</h2>
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

      {/* Launch CTA */}
      <section className="px-3 sm:px-4 pt-2 sm:pt-3">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06] relative">
          {/* Background image */}
          <img src={ctaBgImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.55]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/70 to-[#111]/50" />
          <div className="relative px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[10px] sm:text-xs text-white/25 uppercase tracking-[0.3em] mb-4">19+ projects launched in Korea</p>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-4">
                Be the next<br />
                <span className="text-white/40">success story.</span>
              </h2>
              <p className="text-sm sm:text-base text-white/30 max-w-lg mx-auto mb-10">
                From market analysis to launch day — one partner, full execution.
              </p>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <CalendlyButton className="inline-flex items-center px-7 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 hover:-translate-y-0.5 transition-all">
                  Book a Meeting
                </CalendlyButton>
                <Link to="/contact" className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/[0.1] text-white/50 text-sm font-medium hover:border-white/[0.2] hover:text-white transition-all">
                  Send a Message
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact - 05 */}
      <section className="px-3 sm:px-4 pt-2 sm:pt-3" id="contact">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden">
          <AnimatedSection>
            <ContactFormSection />
          </AnimatedSection>
        </div>
      </section>

      {/* Footer Links */}
      <div className="px-3 sm:px-4 pt-2 sm:pt-3">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden">
          <FooterLinksSection />
        </div>
      </div>

      {/* Footer Brand */}
      <div className="px-3 sm:px-4 py-2 sm:py-3">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden">
          <Footer />
        </div>
      </div>
    </div>;
};
export default Index;