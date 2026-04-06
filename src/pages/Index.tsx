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
import { ArrowRight } from "lucide-react";
import { projectsData } from "@/data/projectsData";

import bnbHanokEventImg from "@/assets/campaigns/bnb-hanok-event.png";
import kucoinPartyEventImg from "@/assets/campaigns/kucoin-party-event.png";
import peaqBoothEventImg from "@/assets/campaigns/peaq-booth-event.png";
import aptosSeoulEventImg from "@/assets/campaigns/aptos-seoul-event.png";
import saharaAiEventImg from "@/assets/campaigns/sahara-ai-event.png";
import seoulSkylineImg from "@/assets/campaigns/seoul-skyline.png";

// Team photos
import teamDavid from "@/assets/team/david-ceo.png";
import teamBennet from "@/assets/team/rachel-design.png";
import teamJ from "@/assets/team/j-cmo.png";
import teamKevin from "@/assets/team/suki-partner.png";
import teamLewis from "@/assets/team/lewis-pr.png";
import teamRachel from "@/assets/team/bennet-coo.png";
import teamSuki from "@/assets/team/kevin-bd.png";
import teamHyukjae from "@/assets/team/hyukjae-bdm.png";
import teamHelen from "@/assets/team/helen-cm.png";

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

      {/* Team Section */}
      <section className="sm:px-4 sm:pt-3 snap-start">
        <div className="sm:rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/[0.06] relative" style={{ minHeight: 4200 }}>
          <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none z-[1]">
            <span className="font-sans font-extrabold text-white/[0.04] select-none" style={{ fontSize: "clamp(5rem,16vw,16rem)", letterSpacing: "-.05em", lineHeight: ".85" }}>Our Team</span>
          </div>
          <div className="absolute top-4 left-0 right-0 text-center z-10">
            <span className="font-mono text-[11px] text-white/20 tracking-[0.15em] uppercase">[ Team of 10+ Operators ]</span>
          </div>
          <div className="relative z-[5] -mt-[100vh] max-w-[1400px] mx-auto px-4 sm:px-8" style={{ minHeight: 4200 }}>
            {[
              { name: "David", role: "CEO", img: teamHelen, top: 40, left: "5%", w: 340 },
              { name: "Bennet", role: "COO", img: teamBennet, top: 300, left: "60%", w: 260 },
              { name: "J", role: "CMO", img: teamJ, top: 700, left: "28%", w: 400 },
              { name: "Kevin", role: "Head of BD", img: teamKevin, top: 1100, left: "2%", w: 220 },
              { name: "Lewis", role: "PR Manager", img: teamLewis, top: 1200, left: "55%", w: 320 },
              { name: "Rachel", role: "Designer", img: teamRachel, top: 1700, left: "12%", w: 280 },
              { name: "Suki", role: "Managing Partner", img: teamSuki, top: 1800, left: "52%", w: 360 },
              { name: "Hyukjae", role: "BD Manager", img: teamHyukjae, top: 2400, left: "20%", w: 300 },
              { name: "Helen", role: "Community Moderator", img: teamDavid, top: 2600, left: "58%", w: 260 },
            ].map(m => (
              <div key={m.name} className="absolute rounded-2xl overflow-hidden border border-white/[0.06] shadow-lg bg-[#0A0A0A]" style={{ top: m.top, left: m.left, width: m.w }}>
                <div className="px-3 py-2">
                  <h4 className="font-bold text-sm text-white/80">{m.name}</h4>
                  <span className="text-[11px] text-blue-400 font-semibold">{m.role}</span>
                </div>
                <div className="w-full relative" style={{ aspectRatio: "1/1.15" }}>
                  <img src={m.img} alt={m.name} loading="lazy" className="w-full h-full object-cover grayscale" style={{ mixBlendMode: "luminosity" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 25%, rgba(45,91,255,.35) 100%)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Launch CTA - Top */}
      <section className="sm:px-4 sm:pt-3 snap-start">
        <div className="sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06]">
          <div className="px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[10px] sm:text-xs text-white/20 uppercase tracking-[0.3em] mb-4">22+ projects launched in Korea</p>
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

      {/* About */}
      <section className="sm:px-4 sm:pt-3 snap-start" id="why-choose-us">
        <div className="sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06]">
          <AnimatedSection delay={100}>
            <WhyChooseUsSection />
          </AnimatedSection>
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
      
      {/* Cases */}
      <section className="sm:px-4 sm:pt-3 snap-start" id="cases">
        <div className="sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06]">
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
      


      
      {/* ===== Project Cards Grid ===== */}
      <section className="sm:px-4 sm:pt-3 snap-start">
        <div className="sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06]">
          <div className="px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Real Campaign, and Next?</h2>
              <Link to="/projects" className="text-xs text-white/30 hover:text-white transition-colors">
                View all <ArrowRight className="w-3 h-3 inline" />
              </Link>
            </div>
          </div>
          <div className="p-3 sm:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-xl overflow-hidden">
              {[
                { slug: "bnb-chain", category: "Infrastructure", customImg: bnbHanokEventImg },
                { slug: "kucoin", category: "Exchange", customImg: kucoinPartyEventImg },
                { slug: "peaq", category: "DePIN", customImg: peaqBoothEventImg },
                { slug: "aptos", category: "Layer 1", customImg: aptosSeoulEventImg },
                { slug: "sahara-ai", category: "AI", customImg: saharaAiEventImg },
              ].map((cs) => {
                const project = projectsData[cs.slug];
                const cardImage = cs.customImg || project?.bgImage || '';
                return (
                  <Link
                    key={cs.slug}
                    to={`/projects/${cs.slug}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="group block bg-[#0A0A0A] p-2.5 sm:p-4 transition-all duration-300 hover:bg-white/[0.03]"
                  >
                    <div className="w-full aspect-[16/9] rounded-lg overflow-hidden mb-2.5 sm:mb-3">
                      <img src={cardImage} alt={project?.name || ''} loading="eager" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-white/30 text-[8px] sm:text-[10px] uppercase tracking-wider">{cs.category}</span>
                      <h3 className="text-xs sm:text-base font-semibold text-white group-hover:text-white/80 transition-colors line-clamp-1">
                        {project?.name}
                      </h3>
                      <p className="text-white/35 text-[10px] sm:text-xs leading-relaxed line-clamp-2 hidden sm:block">
                        {project?.description?.slice(0, 100)}...
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5 sm:mt-2 text-white/30 group-hover:text-white/60 transition-colors text-[9px] sm:text-xs">
                        <span className="group-hover:underline underline-offset-4">View case</span>
                        <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}

              {/* 6th card — ? CTA */}
              <div className="block bg-[#0A0A0A] p-2.5 sm:p-4">
                <div className="w-full aspect-[16/9] rounded-lg overflow-hidden mb-2.5 sm:mb-3 bg-white/[0.03] border border-dashed border-white/[0.1] flex items-center justify-center">
                  <span className="text-4xl sm:text-6xl font-bold text-white/10">?</span>
                </div>
                <div className="space-y-1">
                  <span className="text-white/30 text-[8px] sm:text-[10px] uppercase tracking-wider">Next</span>
                  <h3 className="text-xs sm:text-base font-semibold text-white/50">
                    Your Project
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Launch CTA */}
      <section className="sm:px-4 sm:pt-3 snap-start">
        <div className="sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06] relative">
          <img src={ctaBgImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.55]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/70 to-[#111]/50" />
          <div className="relative px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[10px] sm:text-xs text-white/25 uppercase tracking-[0.3em] mb-4">22+ projects launched in Korea</p>
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