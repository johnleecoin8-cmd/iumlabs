import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ContactFormSection from "@/components/ContactFormSection";

const CasesSection = lazy(() => import("@/components/CasesSection"));
const InsightsSection = lazy(() => import("@/components/InsightsSection"));
const MediaPartnersSection = lazy(() => import("@/components/MediaPartnersSection"));
const PerformanceSection = lazy(() => import("@/components/gtm/PerformanceSection"));

const SectionLoader = () => (
  <div className="h-64 flex items-center justify-center">
    <div className="w-5 h-5 border-2 border-white/10 border-t-white/50 rounded-full animate-spin" />
  </div>
);

import FooterLinksSection from "@/components/FooterLinksSection";
import Footer from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";

const SectionHeader = ({
  number,
  title,
  label,
}: {
  number: string;
  title: string;
  label: string;
}) => (
  <div className="flex items-center justify-between px-6 lg:px-10 py-4 border-b border-white/[0.06]">
    <div className="flex items-center gap-6 lg:gap-8">
      <span className="text-[10px] md:text-xs text-white/25 font-mono tracking-widest">
        {number}
      </span>
      <h2 className="text-base md:text-lg font-medium text-white">{title}</h2>
    </div>
    <span className="text-[11px] text-white/30 tracking-wider hidden sm:block">
      {label}
    </span>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Korea Web3 Marketing & Crypto Agency | ium Labs"
        description="ium Labs is Korea's #1 Web3 marketing and crypto agency. We provide full-stack GTM strategy, KOL marketing, community growth, and PR for global blockchain projects entering the Korean market."
        path="/"
        keywords={[
          "Korea Web3",
          "Korea Crypto",
          "Korea Web3 Marketing",
          "Korea Crypto Agency",
          "Web3 GTM Korea",
          "Korean Crypto Marketing",
          "Blockchain Marketing Korea",
          "Web3 Agency Seoul",
        ]}
      />

      <Navbar />

      {/* Hero */}
      <main id="hero">
        <HeroSection />
      </main>

      {/* About — 01 */}
      <section id="why-choose-us" className="border-t border-white/[0.06]">
        <AnimatedSection>
          <SectionHeader number="01" title="About" label="Why ium Labs" />
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <WhyChooseUsSection />
        </AnimatedSection>
        <AnimatedSection direction="none">
          <Suspense fallback={<SectionLoader />}>
            <MediaPartnersSection />
          </Suspense>
        </AnimatedSection>
      </section>

      {/* Services — 02 */}
      <section id="services" className="border-t border-white/[0.06]">
        <AnimatedSection>
          <SectionHeader number="02" title="Services" label="What We Do" />
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <ServicesSection />
        </AnimatedSection>
      </section>

      {/* Cases — 03 */}
      <section id="cases" className="border-t border-white/[0.06]">
        <AnimatedSection>
          <SectionHeader number="03" title="Cases" label="Portfolio" />
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <Suspense fallback={<SectionLoader />}>
            <PerformanceSection />
          </Suspense>
        </AnimatedSection>
      </section>

      {/* Insights — 04 */}
      <section id="insights" className="border-t border-white/[0.06]">
        <AnimatedSection>
          <SectionHeader number="04" title="Insights" label="Research" />
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <Suspense fallback={<SectionLoader />}>
            <InsightsSection />
          </Suspense>
        </AnimatedSection>
      </section>

      {/* Contact — 05 */}
      <section id="contact" className="border-t border-white/[0.06]">
        <AnimatedSection>
          <ContactFormSection sectionNumber="05" />
        </AnimatedSection>
      </section>

      <FooterLinksSection />
      <Footer />
    </div>
  );
};

export default Index;
