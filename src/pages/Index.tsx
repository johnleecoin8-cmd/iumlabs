import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ContactFormSection from "@/components/ContactFormSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SelectedWorkShowcase = lazy(() => import("@/components/SelectedWorkShowcase"));
const EastAsiaMap = lazy(() => import("@/components/EastAsiaMap"));
const ProjectCardsSection = lazy(() => import("@/components/ProjectCardsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const BlogGridSection = lazy(() => import("@/components/BlogGridSection"));
const TeamStripSection = lazy(() => import("@/components/TeamStripSection"));

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

// One shared header for every homepage section: a small number index plus a single heading
const SectionHeader = ({
  index,
  heading,
  subtitle,
  action,
}: {
  index: string;
  heading: ReactNode;
  subtitle?: string;
  action?: { label: string; href: string };
}) => (
  <div className="px-5 sm:px-6 lg:px-10 pt-10 md:pt-14 pb-6 sm:pb-8">
    <div className="flex items-end justify-between gap-6">
      <div>
        <span className="font-mono text-xs text-white/30">{index}</span>
        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
          {heading}
        </h2>
        {subtitle && <p className="mt-3 text-xs sm:text-sm text-white/45">{subtitle}</p>}
      </div>
      {action && (
        <Link
          to={action.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
        >
          <span className="link-sweep">{action.label}</span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  </div>
);

const Index = () => {
  return <div className="min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      <SEOHead title="Korea Crypto Marketing Agency & Web3 GTM | ium Labs" description="Korea's Web3 & crypto marketing agency. Full-stack Go-To-Market (GTM): KOL/influencer, PR, community, and digital marketing for global blockchain projects entering the Korean market." path="/" keywords={['ium Labs', 'ium labs', 'iumlabs', 'Korea crypto marketing agency', 'crypto marketing agency', 'Web3 marketing agency', 'blockchain marketing agency', 'crypto GTM agency', 'Web3 go-to-market agency', 'crypto digital marketing agency', 'Web3 digital marketing', 'Korean KOL marketing', 'crypto influencer marketing Korea', 'crypto PR Korea', 'DePIN marketing agency', 'RWA marketing agency', 'AI crypto marketing', 'Korea market entry crypto', 'Web3 GTM Seoul']} />

      <Navbar />

      {/* SEO H1, visually hidden, matches document title for semantic alignment */}
      <h1 className="sr-only">Korea Crypto Marketing Agency &amp; Web3 GTM | ium Labs</h1>

      {/* Hero - Full Bleed */}
      <main id="hero">
        <HeroSection />
      </main>

      {/* About — must mount immediately so the background video starts loading
          during PageIntro instead of waiting for scroll-into-view. */}
      <section id="why-choose-us">
        <WhyChooseUsSection />
      </section>

      {/* Selected Work */}
      <section id="selected-work" className="border-t border-white/[0.07]">
        <Suspense fallback={<SectionLoader />}>
          <SelectedWorkShowcase />
        </Suspense>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-white/[0.07]">
        <SectionHeader index="01" heading="What we do." />
        <ServicesSection />
      </section>

      {/* Project Cards */}
      <section id="projects" className="border-t border-white/[0.07]">
        <SectionHeader
          index="02"
          heading={<>Selected <span className="text-white/40">work.</span></>}
          action={{ label: "View all", href: "/projects" }}
        />
        <Suspense fallback={<SectionLoader />}>
          <ProjectCardsSection />
        </Suspense>
      </section>

      {/* Blog */}
      <section id="blog" className="border-t border-white/[0.07]">
        <SectionHeader
          index="03"
          heading={<>Latest <span className="text-white/40">insights.</span></>}
          action={{ label: "View all", href: "/blog" }}
        />
        <Suspense fallback={<SectionLoader />}>
          <BlogGridSection />
        </Suspense>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="border-t border-white/[0.07]">
        <SectionHeader
          index="04"
          heading={<>Partners are <span className="text-white/40">yappin&rsquo;.</span></>}
        />
        <MobileDeferredSection minHeight="60vh">
          <Suspense fallback={<SectionLoader />}>
            <TestimonialsSection />
          </Suspense>
        </MobileDeferredSection>
      </section>

      {/* Team */}
      <section id="team" className="border-t border-white/[0.07]">
        <SectionHeader
          index="05"
          heading={<>The <span className="text-white/40">operators.</span></>}
          subtitle="Binance, KuCoin, Upbit alumni. Real people, embedded in your team."
        />
        <Suspense fallback={<SectionLoader />}>
          <TeamStripSection />
        </Suspense>
      </section>

      {/* Coverage — vercel.com dot-grid section background */}
      <section id="coverage" className="border-t border-white/[0.07] bg-dots">
        <SectionHeader
          index="06"
          heading={<>Korea-first. <span className="text-white/40">Asia-wide.</span></>}
        />
        <div className="px-5 sm:px-6 lg:px-10 pb-20 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start max-w-7xl">
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
                        ? "bg-primary text-white"
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
