import { lazy, Suspense } from "react";
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

import ctaBgImage from "@/assets/campaigns/event-fisheye.jpg";
import { ArrowRight } from "lucide-react";
import { projectsData } from "@/data/projectsData";

import bnbHanokEventImg from "@/assets/campaigns/bnb-hanok-event.jpg";
import kucoinPartyEventImg from "@/assets/campaigns/kucoin-party-event.jpg";
import aptosSeoulEventImg from "@/assets/campaigns/aptos-seoul-event.jpg";
import saharaAiEventImg from "@/assets/campaigns/sahara-ai-event.jpg";


const Index = () => {
  return <div className="min-h-screen bg-[#0A0A0A] sm:snap-y sm:snap-proximity sm:overflow-y-auto sm:h-screen scrollbar-hide">
      <SEOHead title="ium Labs | Korea Web3 Marketing & Crypto Agency" description="Seoul's leading Web3 growth agency since 2022. Full-stack GTM strategy, KOL marketing, community growth, and PR — 22+ projects launched including BNB, Bybit, and Mantra. One partner, full execution." path="/" keywords={['Korea Web3', 'Korea Crypto', 'Korea Web3 Marketing', 'Korea Crypto Agency', 'Web3 GTM Korea', 'Korean Crypto Marketing', 'Blockchain Marketing Korea', 'Web3 Agency Seoul']} />
      
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
          <AnimatedSection delay={100}>
            <WhyChooseUsSection />
          </AnimatedSection>
        </div>
      </section>

      {/* Client Segments */}
      <section className="sm:px-4 sm:pt-3 snap-start">
        <div className="sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06]">
          <div className="px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Our Clients</h2>
            <p className="text-xs sm:text-sm text-white/35 mt-2">Five categories of projects we specialize in.</p>
          </div>
          <div className="p-3 sm:p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-xl overflow-hidden">
              {[
                { num: "01", title: "Global L1/L2 Protocols", desc: "Technically proven chains that need Korean community firepower and retail awareness.", need: "Developer ecosystem, exchange listing prep, mass retail holder acquisition.", clients: "BNB Chain, Aptos, Polygon" },
                { num: "02", title: "AI & DePIN Innovators", desc: "Complex tech stacks that need to be communicated in a way that's accessible and compelling to Korean retail.", need: "Deep Research narrative building, early narrative capture, tech-focused KOL partnerships.", clients: "Sahara AI, Kite AI" },
                { num: "03", title: "High-Liquidity DeFi & RWA", desc: "Finance-oriented protocols targeting Korea's high-net-worth and sophisticated investor base.", need: "On-chain data-driven marketing, regulatory compliance, high-trust media exposure.", clients: "Ondo Finance, SynFutures" },
                { num: "04", title: "Global CEXs", desc: "Our team's exchange background (Binance, KuCoin, Upbit) makes this our strongest domain.", need: "Korean user acquisition, local community ops, offline event planning.", clients: "Bybit, KuCoin" },
                { num: "05", title: "Web2-to-Web3 Enterprise", desc: "Korean corporates and mid-size IT firms launching blockchain businesses.", need: "GTM strategy, global project partnership matching, initial community building.", clients: "Enterprise clients" },
              ].map((seg) => (
                <div key={seg.num} className="bg-[#0A0A0A] p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] text-white/20 font-mono">{seg.num}</span>
                    <h3 className="text-sm sm:text-base font-semibold text-white">{seg.title}</h3>
                  </div>
                  <p className="text-white/40 text-xs sm:text-sm leading-relaxed mb-3">{seg.desc}</p>
                  <p className="text-white/25 text-[10px] sm:text-xs leading-relaxed mb-3">{seg.need}</p>
                  <p className="text-white/50 text-[10px] sm:text-xs font-medium">{seg.clients}</p>
                </div>
              ))}
            </div>
          </div>
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
        <div className="sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06]">
          <div className="px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Our Services</h2>
          </div>
          <AnimatedSection delay={100}>
            <ServicesSection />
          </AnimatedSection>
        </div>
      </section>

      {/* Insights */}
      <section className="sm:px-4 sm:pt-3 snap-start" id="insights">
        <div className="sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06]">
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
      


      

      {/* Launch CTA */}
      <section className="sm:px-4 sm:pt-3 snap-start">
        <div className="sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06] relative">
          <img src={ctaBgImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.55]" width={1200} height={800} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/70 to-[#111]/50" />
          <div className="relative px-4 sm:px-6 lg:px-10 py-12 sm:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[9px] sm:text-xs text-white/25 uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-3 sm:mb-4">22+ projects launched in Korea</p>
              <h2 className="text-2xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-3 sm:mb-4">
                Be the next<br />
                <span className="text-white/40">success story.</span>
              </h2>
              <p className="text-[13px] sm:text-base text-white/30 max-w-lg mx-auto mb-8 sm:mb-10 leading-relaxed">
                From market analysis to launch day — one partner, full execution.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
                <CalendlyButton className="inline-flex items-center px-6 py-3 sm:px-7 sm:py-3.5 rounded-full bg-white text-black text-[13px] sm:text-sm font-semibold hover:bg-white/90 hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center">
                  Book a Meeting
                </CalendlyButton>
                <Link to="/contact" className="inline-flex items-center px-6 py-3 sm:px-7 sm:py-3.5 rounded-full border border-white/[0.1] text-white/50 text-[13px] sm:text-sm font-medium hover:border-white/[0.2] hover:text-white transition-all w-full sm:w-auto justify-center">
                  Send a Message
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact - 05 */}
      <section className="sm:px-4 sm:pt-3 snap-start" id="contact">
        <div className="sm:rounded-3xl overflow-hidden">
          <AnimatedSection>
            <ContactFormSection />
          </AnimatedSection>
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