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

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FooterLinksSection from "@/components/FooterLinksSection";
import Footer from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { projectsData } from "@/data/projectsData";

// Row 1 projects (scroll left)
const projectShowcase = [
  { slug: "bnb-chain", name: "BNB Chain", result: "+420% Volume", image: projectsData["bnb-chain"]?.bgImage },
  { slug: "bybit", name: "Bybit", result: "#2 Exchange", image: projectsData["bybit"]?.bgImage },
  { slug: "mantra", name: "Mantra", result: "$50M+ Pipeline", image: projectsData["mantra"]?.bgImage },
  { slug: "story-protocol", name: "Story Protocol", result: "500+ Creators", image: projectsData["story-protocol"]?.bgImage },
  { slug: "sahara-ai", name: "Sahara AI", result: "400+ Attendees", image: projectsData["sahara-ai"]?.bgImage },
].filter(p => p.image);

// Row 2 projects (scroll right)
const projectShowcase2 = [
  { slug: "kucoin", name: "KuCoin", result: "$550M+ TVL", image: projectsData["kucoin"]?.bgImage },
  { slug: "polygon", name: "Polygon", result: "200+ Developers", image: projectsData["polygon"]?.bgImage },
  { slug: "peaq", name: "Peaq", result: "#1 Machine Economy", image: projectsData["peaq"]?.bgImage },
  { slug: "megaeth", name: "MegaETH", result: "2M+ Impressions", image: projectsData["megaeth"]?.bgImage },
  { slug: "fogo", name: "FOGO", result: "250+ Attendees", image: projectsData["fogo"]?.bgImage },
].filter(p => p.image);

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
      
      {/* Cases — auto-scroll showcase */}
      <section className="px-3 sm:px-4 pt-2 sm:pt-3" id="cases">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06] py-10 sm:py-14">
          {/* Header */}
          <div className="px-4 sm:px-6 lg:px-10 mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Be Our Next Project</h2>
              <p className="text-sm text-white/40">19+ ecosystems launched into Korea. Here's what we've done.</p>
            </div>
            <Link to="/projects" className="hidden sm:flex items-center gap-1.5 text-sm text-white/30 hover:text-white transition-colors flex-shrink-0">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Auto-scroll marquee — row 1 (left) */}
          <div className="overflow-hidden mb-3">
            <div className="flex gap-3 logo-marquee-slow">
              {[...projectShowcase, ...projectShowcase].map((p, i) => (
                <Link key={`r1-${i}`} to={`/projects/${p.slug}`} className="group block relative flex-shrink-0 w-[280px] sm:w-[340px] rounded-xl overflow-hidden aspect-[16/10]">
                  <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-lg font-bold text-white">{p.result}</div>
                    <p className="text-xs text-white/50">{p.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Auto-scroll marquee — row 2 (right, reversed) */}
          <div className="overflow-hidden">
            <div className="flex gap-3 logo-marquee-reverse">
              {[...projectShowcase2, ...projectShowcase2].map((p, i) => (
                <Link key={`r2-${i}`} to={`/projects/${p.slug}`} className="group block relative flex-shrink-0 w-[280px] sm:w-[340px] rounded-xl overflow-hidden aspect-[16/10]">
                  <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-lg font-bold text-white">{p.result}</div>
                    <p className="text-xs text-white/50">{p.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile view all */}
          <div className="px-4 mt-6 sm:hidden">
            <Link to="/projects" className="flex items-center gap-1.5 text-sm text-white/30 hover:text-white transition-colors">
              View all projects <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Insights */}
      <section className="px-3 sm:px-4 pt-2 sm:pt-3" id="insights">
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