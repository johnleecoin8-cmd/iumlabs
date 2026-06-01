import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ContactFormSection from "@/components/ContactFormSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import Footer from "@/components/Footer";
import CalendlyButton from "@/components/CalendlyButton";
import { Link } from "react-router-dom";
import ctaBgImage from "@/assets/campaigns/event-fisheye.jpg";

const SelectedWorkShowcase = lazy(() => import("@/components/SelectedWorkShowcase"));
const InsightsSection = lazy(() => import("@/components/InsightsSection"));

const SectionLoader = () => <div className="h-64 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
  </div>;


const Index = () => {
  return <div className="min-h-screen bg-[#0A0A0A] md:snap-y md:snap-proximity md:overflow-y-auto md:h-screen scrollbar-hide">
      <SEOHead title="ium Labs — Korea Crypto Marketing Agency | Web3 GTM, KOL, Community" description="Korea's #1 crypto marketing agency for Web3 market entry. End-to-end GTM, KOL campaigns, community growth, and PR — trusted by 25+ global blockchain projects including BNB Chain, KuCoin, and Aptos." path="/" keywords={['ium Labs', 'ium labs', 'iumlabs', 'Korea crypto marketing agency', 'Web3 ecosystem partner Korea', 'crypto GTM Seoul', 'Korea market entry crypto', 'Korean KOL marketing', 'influencer campaigns Korea', 'blockchain agency Seoul', 'crypto PR Korea']} />
      
      <Navbar />
      
      {/* Hero - Full Bleed */}
      <main id="hero" className="sm:px-4 sm:pt-3 snap-start">
        <div className="sm:rounded-3xl overflow-hidden">
          <HeroSection />
        </div>
      </main>

      {/* About */}
      <section className="sm:px-4 sm:pt-3 snap-start" id="why-choose-us">
        <div className="sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06]">
          <WhyChooseUsSection />
        </div>
      </section>

      {/* Selected Work */}
      <section className="sm:px-4 sm:pt-3 snap-start" id="selected-work">
        <div className="sm:rounded-3xl overflow-hidden">
          <Suspense fallback={<SectionLoader />}>
            <SelectedWorkShowcase />
          </Suspense>
        </div>
      </section>

      {/* Services */}
      <section className="sm:px-4 sm:pt-3 snap-start" id="services">
        <div className="sm:rounded-3xl overflow-hidden bg-[#0D0D0D] border border-white/[0.06]">
          <div className="px-5 sm:px-6 lg:px-10 pt-10 sm:pt-12">
            <h2 className="text-lg sm:text-xl font-semibold text-white tracking-[-0.01em] mb-1">Our Services</h2>
            <p className="text-[12px] sm:text-[13px] text-white/45 font-light">End-to-end capabilities for Korea market entry.</p>
          </div>
          <ServicesSection />
        </div>
      </section>

      {/* Insights */}
      <section className="sm:px-4 sm:pt-3 snap-start" id="insights">
        <div className="sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06]">
          <div className="px-5 sm:px-6 lg:px-10 pt-8 sm:pt-10">
            <h2 className="text-lg sm:text-xl font-semibold text-white tracking-[-0.01em]">Blog</h2>
          </div>
          <Suspense fallback={<SectionLoader />}>
            <InsightsSection />
          </Suspense>
        </div>
      </section>

      {/* Launch CTA */}
      <section className="sm:px-4 sm:pt-3 snap-start">
        <div className="sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06] relative">
          <img src={ctaBgImage} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-[0.45]" width={1200} height={800} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/70 to-[#111]/40" />
          <div className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-28">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[9px] sm:text-[11px] text-white/40 uppercase tracking-[0.3em] mb-4 sm:mb-5 font-mono">Seoul · Singapore</p>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-white leading-[1.1] tracking-[-0.03em] mb-4 sm:mb-6">
                Ready to land <span className="bg-gradient-to-r from-[#b48cde] to-[#c084fc] bg-clip-text text-transparent">in Korea?</span>
              </h2>
              <p className="text-[13px] sm:text-[15px] text-white/45 max-w-md mx-auto mb-10 sm:mb-12 leading-relaxed font-light">
                From strategy to execution. One call to get started.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <CalendlyButton className="inline-flex items-center px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-white text-black text-[13px] sm:text-sm font-semibold hover:bg-white/90 hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center">
                  Book a Meeting
                </CalendlyButton>
                <Link to="/contact" className="inline-flex items-center px-7 py-3.5 sm:px-8 sm:py-4 rounded-full border border-white/[0.1] text-white/50 text-[13px] sm:text-sm font-medium hover:border-white/[0.2] hover:text-white/80 transition-all w-full sm:w-auto justify-center">
                  Send a Message
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact - 05 */}
      <section className="sm:px-4 sm:pt-3 snap-start" id="contact">
        <div className="sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06]">
          <ContactFormSection />
        </div>
      </section>

      {/* Footer Links */}
      <div className="sm:px-4 sm:pt-3">
        <div className="sm:rounded-3xl overflow-hidden">
          <FooterLinksSection />
        </div>
      </div>

      {/* Footer Brand */}
      <div className="sm:px-4 sm:py-3">
        <div className="sm:rounded-3xl overflow-hidden">
          <Footer />
        </div>
      </div>
    </div>;
};
export default Index;