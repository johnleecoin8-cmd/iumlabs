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
import CTABannerSection from "@/components/CTABannerSection";
import Footer from "@/components/Footer";
import FloatingContactButton from "@/components/FloatingContactButton";
import useScrollReveal from "@/hooks/useScrollReveal";
import { usePageTitle } from "@/hooks/usePageTitle";

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
      <section className="scroll-reveal bg-[#0F0F0F]" id="services">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">01</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Services</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">What We Do</span>
          </div>
          <ServicesSection />
        </div>
      </section>
      
      {/* Process - 02 짝수 */}
      <section className="scroll-reveal bg-[#121212]" id="process">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">02</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Process</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">How We Work</span>
          </div>
          <ProcessSection />
        </div>
      </section>
      
      {/* Cases - 03 홀수 */}
      <section className="scroll-reveal bg-[#0F0F0F]" id="cases">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">03</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Cases</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Our Work</span>
          </div>
          <CasesSection />
        </div>
      </section>
      
      {/* About - 04 짝수 */}
      <section className="scroll-reveal bg-[#121212]" id="why-choose-us">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">04</span>
              <h2 className="text-lg md:text-xl font-medium text-white">About</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Why Ium Labs</span>
          </div>
          <WhyChooseUsSection />
        </div>
      </section>
      
      {/* Gallery - 05 홀수 */}
      <section className="scroll-reveal bg-[#0F0F0F]" id="gallery">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">05</span>
              <h2 className="text-lg md:text-xl font-medium text-white/50">Gallery</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Campaign Archive</span>
          </div>
          <FilmstripGallerySection />
        </div>
      </section>
      
      {/* Media Partners - 06 짝수 */}
      <section className="scroll-reveal bg-[#121212]" id="media-partners">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">06</span>
              <h2 className="text-lg md:text-xl font-medium text-white/50">Media Partners</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">As Featured In</span>
          </div>
          <MediaPartnersSection />
        </div>
      </section>
      
      {/* Insights - 07 홀수 */}
      <section className="scroll-reveal bg-[#0F0F0F]" id="insights">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">07</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Insights</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Research</span>
          </div>
          <InsightsSection />
        </div>
      </section>
      
      {/* Contact - 08 짝수 */}
      <section className="scroll-reveal bg-[#121212]" id="contact">
        <ContactFormSection sectionNumber="08" />
      </section>
      
      {/* CTA Banner */}
      <CTABannerSection />
      
      {/* Footer */}
      <div className="border-t border-white/10">
        <Footer />
      </div>
      
      <FloatingContactButton />
    </div>
  );
};

export default Index;
