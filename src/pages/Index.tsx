import { lazy, Suspense, type ReactNode } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ContactFormSection from "@/components/ContactFormSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SelectedWorkShowcase = lazy(() => import("@/components/SelectedWorkShowcase"));
const EastAsiaMap = lazy(() => import("@/components/EastAsiaMap"));
const ProjectCardsSection = lazy(() => import("@/components/ProjectCardsSection"));
const BlogGridSection = lazy(() => import("@/components/BlogGridSection"));

const SectionLoader = () => <div className="h-64 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
  </div>;

// Sparse starfield for the "from orbit" coverage backdrop. Fixed positions so it
// renders identically every paint (no Math.random at module load).
const STARFIELD = [
  "radial-gradient(2px 2px at 18% 18%, rgba(255,255,255,0.85), transparent)",
  "radial-gradient(1.5px 1.5px at 32% 52%, rgba(255,255,255,0.55), transparent)",
  "radial-gradient(1.8px 1.8px at 46% 26%, rgba(199,222,255,0.7), transparent)",
  "radial-gradient(1.5px 1.5px at 58% 70%, rgba(255,255,255,0.5), transparent)",
  "radial-gradient(2.4px 2.4px at 67% 32%, rgba(255,255,255,0.8), transparent)",
  "radial-gradient(1.6px 1.6px at 76% 60%, rgba(199,222,255,0.6), transparent)",
  "radial-gradient(1.9px 1.9px at 84% 20%, rgba(255,255,255,0.7), transparent)",
  "radial-gradient(1.5px 1.5px at 90% 74%, rgba(255,255,255,0.5), transparent)",
  "radial-gradient(1.4px 1.4px at 62% 88%, rgba(255,255,255,0.45), transparent)",
  "radial-gradient(2px 2px at 72% 46%, rgba(255,255,255,0.65), transparent)",
  "radial-gradient(1.5px 1.5px at 88% 52%, rgba(199,222,255,0.55), transparent)",
  "radial-gradient(1.7px 1.7px at 94% 34%, rgba(255,255,255,0.6), transparent)",
  "radial-gradient(1.3px 1.3px at 55% 16%, rgba(255,255,255,0.5), transparent)",
  "radial-gradient(1.4px 1.4px at 80% 84%, rgba(255,255,255,0.45), transparent)",
].join(",");

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

      {/* Selected Work — proof reel + "how we work" manifesto, one section */}
      <section id="selected-work" className="border-t border-white/[0.07]">
        <Suspense fallback={<SectionLoader />}>
          <SelectedWorkShowcase />
        </Suspense>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-white/[0.07]">
        <SectionHeader index="01" heading="What we do" />
        <ServicesSection />
      </section>

      {/* Project Cards */}
      <section id="projects" className="border-t border-white/[0.07]">
        <SectionHeader
          index="02"
          heading={<>Selected <span className="text-white/40">work</span></>}
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
          heading={<>Latest <span className="text-white/40">insights</span></>}
          action={{ label: "View all", href: "/blog" }}
        />
        <Suspense fallback={<SectionLoader />}>
          <BlogGridSection />
        </Suspense>
      </section>

      {/* Coverage — cinematic "from orbit" backdrop: deep space, atmospheric
          bloom around the Korea light source, starfield, vignette. */}
      <section id="coverage" className="relative overflow-hidden border-t border-white/[0.07] bg-[#050608]">
        {/* space backdrop, behind content — starfield + distant glow + vignette */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0" style={{ backgroundImage: STARFIELD }} />
          <div className="absolute right-[8%] top-[26%] h-[560px] w-[560px] rounded-full blur-[160px]" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.10), transparent 68%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(135% 105% at 22% 58%, transparent 40%, rgba(0,0,0,0.62) 100%)" }} />
        </div>

        <div className="relative z-10">
        <SectionHeader
          index="04"
          heading={<>Korea-first <span className="text-white/40">Asia-wide</span></>}
        />
        <div className="px-5 sm:px-6 lg:px-10 pb-20 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start max-w-7xl">
            <div className="relative w-full max-w-lg lg:max-w-none mx-auto">
              {/* atmospheric halo hugging the map — the region reads as lit from orbit */}
              <div aria-hidden className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
                <div className="h-[92%] w-[92%] rounded-full blur-[110px]" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.24), rgba(96,165,250,0.07) 55%, transparent 76%)" }} />
                <div className="absolute left-1/2 top-[34%] h-[38%] w-[38%] -translate-x-1/2 rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, rgba(52,211,154,0.16), transparent 72%)" }} />
              </div>
              <div className="relative z-10">
                <Suspense fallback={<div className="aspect-square bg-white/[0.02] rounded-xl animate-pulse" />}>
                  <EastAsiaMap />
                </Suspense>
              </div>
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
