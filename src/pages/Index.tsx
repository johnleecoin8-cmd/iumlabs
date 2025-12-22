import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import ServicesSection from "@/components/ServicesSection";
import MediaPartnersSection from "@/components/MediaPartnersSection";
import CasesSection from "@/components/CasesSection";
import FilmstripGallerySection from "@/components/FilmstripGallerySection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import InsightsSection from "@/components/InsightsSection";
import ContactFormSection from "@/components/ContactFormSection";
import Footer from "@/components/Footer";
import FloatingContactButton from "@/components/FloatingContactButton";
import useScrollReveal from "@/hooks/useScrollReveal";
import { usePageTitle } from "@/hooks/usePageTitle";

// 섹션 배경색 정의
const SECTION_COLORS = {
  odd: "#0F0F0F",   // 홀수 섹션
  even: "#121212",  // 짝수 섹션
  base: "#0A0A0A",  // 기본
};

const Index = () => {
  useScrollReveal();
  usePageTitle("Web3 Research & GTM Strategy Group");

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-[#0A0A0A]" id="hero">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <HeroSection />
        </div>
      </main>
      
      {/* Services - 01 홀수 */}
      <section className="scroll-reveal" style={{ backgroundColor: SECTION_COLORS.odd }} id="services">
        <div className="border-t border-white/5">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/5">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">01</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Services</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/10 rounded-full">What We Do</span>
          </div>
          <ServicesSection bgColor={SECTION_COLORS.odd} />
        </div>
      </section>
      
      {/* Process - 02 짝수 */}
      <section className="scroll-reveal" style={{ backgroundColor: SECTION_COLORS.even }} id="process">
        <div className="border-t border-white/5">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/5">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">02</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Process</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/10 rounded-full">How We Work</span>
          </div>
          <ProcessSection bgColor={SECTION_COLORS.even} />
        </div>
      </section>
      
      {/* Cases - 03 홀수 */}
      <section className="scroll-reveal" style={{ backgroundColor: SECTION_COLORS.odd }} id="cases">
        <div className="border-t border-white/5">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/5">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">03</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Cases</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/10 rounded-full">Our Work</span>
          </div>
          <CasesSection bgColor={SECTION_COLORS.odd} />
        </div>
      </section>
      
      {/* About - 04 짝수 */}
      <section className="scroll-reveal" style={{ backgroundColor: SECTION_COLORS.even }} id="why-choose-us">
        <div className="border-t border-white/5">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/5">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">04</span>
              <h2 className="text-lg md:text-xl font-medium text-white">About</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/10 rounded-full">Why Ium Labs</span>
          </div>
          <WhyChooseUsSection bgColor={SECTION_COLORS.even} />
        </div>
      </section>
      
      {/* Gallery - 05 홀수 */}
      <section className="scroll-reveal" style={{ backgroundColor: SECTION_COLORS.odd }} id="gallery">
        <div className="border-t border-white/5">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/5">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">05</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Gallery</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/10 rounded-full">Campaign Archive</span>
          </div>
          <FilmstripGallerySection bgColor={SECTION_COLORS.odd} />
        </div>
      </section>
      
      {/* Media Partners - 06 짝수 */}
      <section className="scroll-reveal" style={{ backgroundColor: SECTION_COLORS.even }} id="media-partners">
        <div className="border-t border-white/5">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/5">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">06</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Media Partners</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/10 rounded-full">As Featured In</span>
          </div>
          <MediaPartnersSection bgColor={SECTION_COLORS.even} />
        </div>
      </section>
      
      {/* Insights - 07 홀수 */}
      <section className="scroll-reveal" style={{ backgroundColor: SECTION_COLORS.odd }} id="insights">
        <div className="border-t border-white/5">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/5">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">07</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Insights</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/10 rounded-full">Research</span>
          </div>
          <InsightsSection bgColor={SECTION_COLORS.odd} />
        </div>
      </section>
      
      {/* Contact - 08 짝수 */}
      <section className="scroll-reveal" style={{ backgroundColor: SECTION_COLORS.even }} id="contact">
        <ContactFormSection sectionNumber="08" bgColor={SECTION_COLORS.even} />
      </section>
      
      {/* Footer */}
      <div className="border-t border-white/5">
        <Footer />
      </div>
      
      <FloatingContactButton />
    </div>
  );
};

export default Index;
