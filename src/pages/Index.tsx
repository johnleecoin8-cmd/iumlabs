import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ContactFormSection from "@/components/ContactFormSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import { useIsMobile } from "@/hooks/use-mobile";

const SelectedWorkShowcase = lazy(() => import("@/components/SelectedWorkShowcase"));
const EastAsiaMap = lazy(() => import("@/components/EastAsiaMap"));
const ProjectCardsSection = lazy(() => import("@/components/ProjectCardsSection"));
const InsightsSection = lazy(() => import("@/components/InsightsSection"));

const SectionLoader = () => <div className="h-64 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
  </div>;

const MobileDeferredSection = ({ children, minHeight = "60vh" }: { children: ReactNode; minHeight?: string }) => {
  const isMobile = useIsMobile();
  const [shouldRender, setShouldRender] = useState(!isMobile);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile) {
      setShouldRender(true);
      return;
    }

    const el = mountRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "220px 0px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <div ref={mountRef} style={isMobile && !shouldRender ? { minHeight } : undefined}>
      {shouldRender ? children : null}
    </div>
  );
};

// Consistent section eyebrow used across the homepage
const Eyebrow = ({ index, label }: { index: string; label: string }) => (
  <div className="flex items-baseline gap-4">
    <span className="font-mono text-xs text-white/30">{index}</span>
    <span className="text-xs uppercase tracking-[0.25em] text-white/40">{label}</span>
  </div>
);

const Index = () => {
  return <div className="min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      <SEOHead title="Korea Crypto Marketing Agency & Web3 GTM | ium Labs" description="Korea's Web3 & crypto marketing agency. Full-stack Go-To-Market (GTM): KOL/influencer, PR, community, and digital marketing for global blockchain projects entering the Korean market." path="/" keywords={['ium Labs', 'ium labs', 'iumlabs', 'Korea crypto marketing agency', 'crypto marketing agency', 'Web3 marketing agency', 'blockchain marketing agency', 'crypto GTM agency', 'Web3 go-to-market agency', 'crypto digital marketing agency', 'Web3 digital marketing', 'Korean KOL marketing', 'crypto influencer marketing Korea', 'crypto PR Korea', 'DePIN marketing agency', 'RWA marketing agency', 'AI crypto marketing', 'Korea market entry crypto', 'Web3 GTM Seoul']} />

      <Navbar />

      {/* SEO H1 — visually hidden, matches document title for semantic alignment */}
      <h1 className="sr-only">Korea Crypto Marketing Agency &amp; Web3 GTM | ium Labs</h1>

      {/* Hero - Full Bleed */}
      <main id="hero">
        <HeroSection />
      </main>

      {/* About */}
      <section id="why-choose-us">
        <MobileDeferredSection minHeight="90vh">
          <WhyChooseUsSection />
        </MobileDeferredSection>
      </section>

      {/* Selected Work */}
      <section id="selected-work" className="border-t border-white/[0.07]">
        <MobileDeferredSection minHeight="70vh">
          <Suspense fallback={<SectionLoader />}>
            <SelectedWorkShowcase />
          </Suspense>
        </MobileDeferredSection>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-white/[0.07]">
        <div className="mx-auto max-w-7xl px-6 md:px-10 pt-20 md:pt-28">
          <Eyebrow index="01" label="Services" />
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
            End-to-end capabilities <span className="text-white/40">for Korea market entry.</span>
          </h2>
        </div>
        <ServicesSection />
      </section>

      {/* Project Cards */}
      <section id="projects" className="border-t border-white/[0.07]">
        <Suspense fallback={<SectionLoader />}>
          <ProjectCardsSection />
        </Suspense>
      </section>

      {/* Insights */}
      <section id="insights" className="border-t border-white/[0.07]">
        <div className="mx-auto max-w-7xl px-6 md:px-10 pt-20 md:pt-28">
          <Eyebrow index="02" label="Insights" />
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
            From the <span className="text-white/40">blog.</span>
          </h2>
        </div>
        <Suspense fallback={<SectionLoader />}>
          <InsightsSection />
        </Suspense>
      </section>

      {/* Coverage */}
      <section id="coverage" className="border-t border-white/[0.07]">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
          <Eyebrow index="03" label="Coverage" />
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-12 sm:mb-16">
            Korea-first. <span className="font-semibold">Asia-wide.</span>
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
                <div key={c.name} className="py-5 border-t border-white/[0.08] first:border-t-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-base sm:text-lg font-medium text-white">{c.name}</span>
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
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-white/[0.07]">
        <ContactFormSection />
      </section>

      {/* Footer */}
      <FooterLinksSection />
    </div>;
};
export default Index;
