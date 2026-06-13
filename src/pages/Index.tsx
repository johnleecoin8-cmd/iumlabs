import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ContactFormSection from "@/components/ContactFormSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import { Link } from "react-router-dom";

const SelectedWorkShowcase = lazy(() => import("@/components/SelectedWorkShowcase"));
const EastAsiaMap = lazy(() => import("@/components/EastAsiaMap"));
const ProjectCardsSection = lazy(() => import("@/components/ProjectCardsSection"));
const InsightsSection = lazy(() => import("@/components/InsightsSection"));

const SectionLoader = () => <div className="h-64 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
  </div>;


const Index = () => {
  return <div className="min-h-screen bg-[#0A0A0A] md:snap-y md:snap-proximity md:overflow-y-auto md:h-screen scrollbar-hide">
      <SEOHead title="Korea Crypto Marketing Agency & Web3 GTM | ium Labs" description="Korea's Web3 & crypto marketing agency. Full-stack Go-To-Market (GTM): KOL/influencer, PR, community, and digital marketing for global blockchain projects entering the Korean market." path="/" keywords={['ium Labs', 'ium labs', 'iumlabs', 'Korea crypto marketing agency', 'crypto marketing agency', 'Web3 marketing agency', 'blockchain marketing agency', 'crypto GTM agency', 'Web3 go-to-market agency', 'crypto digital marketing agency', 'Web3 digital marketing', 'Korean KOL marketing', 'crypto influencer marketing Korea', 'crypto PR Korea', 'DePIN marketing agency', 'RWA marketing agency', 'AI crypto marketing', 'Korea market entry crypto', 'Web3 GTM Seoul']} />
      
      <Navbar />

      {/* SEO H1 — visually hidden, matches document title for semantic alignment */}
      <h1 className="sr-only">Korea Crypto Marketing Agency &amp; Web3 GTM | ium Labs</h1>
      
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

      {/* Project Cards */}
      <section className="sm:px-4 sm:pt-3 snap-start" id="projects">
        <div className="sm:rounded-3xl overflow-hidden bg-[#0D0D0D] border border-white/[0.06]">
          <Suspense fallback={<SectionLoader />}>
            <ProjectCardsSection />
          </Suspense>
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

      {/* Coverage */}
      <section className="sm:px-4 sm:pt-3 snap-start" id="coverage">
        <div className="sm:rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/[0.06]">
          <div className="px-5 sm:px-6 lg:px-10 pt-12 pb-0 sm:py-20">
            <span className="text-[10px] sm:text-[11px] text-white/25 uppercase tracking-[0.25em] font-medium block mb-3">Coverage</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-12 sm:mb-16">
              Korea-first. <span className="font-bold">Asia-wide.</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <div className="w-full max-w-lg lg:max-w-none mx-auto">
                <Suspense fallback={<div className="aspect-square bg-white/[0.02] rounded-xl animate-pulse" />}>
                  <EastAsiaMap />
                </Suspense>
              </div>

              <div className="space-y-0">
                {[
                  { name: "South Korea", tag: "HOME", desc: "KOL & Influencer, Naver SEO, Kakao Community, PR & Media, Instagram Viral, Offline Events" },
                  { name: "Japan", tag: "ACTIVE", desc: "LINE Ecosystem, KOL Network, Regulated Exchange Entry, PR & Media Placement" },
                  { name: "Taiwan", tag: "ACTIVE", desc: "Local KOL Campaigns, Exchange Partnerships, Community Management, Mandarin PR" },
                  { name: "China", tag: "ACTIVE", desc: "WeChat & Weibo Marketing, Institutional BD, Mainland KOL Network, Bilibili Content" },
                ].map(c => (
                  <div key={c.name} className="py-5 border-b border-white/[0.06] last:border-b-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-sm sm:text-lg font-semibold text-white">{c.name}</span>
                      <span className={`text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                        c.tag === "HOME"
                          ? "bg-blue-600 text-white"
                          : "bg-white/[0.08] text-white/50"
                      }`}>{c.tag}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/40">{c.desc}</p>
                  </div>
                ))}
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

      {/* Footer */}
      <div className="sm:px-4 sm:pt-3 sm:pb-3">
        <div className="sm:rounded-3xl overflow-hidden">
          <FooterLinksSection />
        </div>
      </div>
    </div>;
};
export default Index;