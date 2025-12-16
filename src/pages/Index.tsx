import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import ServicesSection from "@/components/ServicesSection";
import MediaPartnersSection from "@/components/MediaPartnersSection";
import CasesSection from "@/components/CasesSection";
import FilmstripGallerySection from "@/components/FilmstripGallerySection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import InsightsSection from "@/components/InsightsSection";
import CTASection from "@/components/CTASection";
import FloatingContactButton from "@/components/FloatingContactButton";
import useScrollReveal from "@/hooks/useScrollReveal";
const Index = () => {
  useScrollReveal();
  return <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-[#0A0A0A]" id="hero">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <HeroSection />
        </div>
      </main>
      
      {/* Process */}
      <section className="scroll-reveal bg-[#0A0A0A]" id="process">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">01</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Process</h2>
            </div>
            <span className="text-[10px] md:text-xs text-white/40 tracking-wider hidden sm:block">How We Work</span>
          </div>
          <ProcessSection />
        </div>
      </section>
      
      {/* Services */}
      <section className="scroll-reveal bg-[#0A0A0A]" id="services">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">02</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Services</h2>
            </div>
            <span className="text-[10px] md:text-xs text-white/40 tracking-wider hidden sm:block">What We Do</span>
          </div>
          <ServicesSection />
        </div>
      </section>
      
      {/* Media Partners - Marquee Bar */}
      <section className="scroll-reveal bg-[#0A0A0A]" id="media-partners">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">03</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Media Partners</h2>
            </div>
            <span className="text-[10px] md:text-xs text-white/40 tracking-wider hidden sm:block">As Featured In</span>
          </div>
          <MediaPartnersSection />
        </div>
      </section>
      
      {/* Cases */}
      <section className="scroll-reveal bg-[#0A0A0A]" id="cases">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">04</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Cases</h2>
            </div>
            <span className="text-[10px] md:text-xs text-white/40 tracking-wider hidden sm:block">Our Work</span>
          </div>
          <CasesSection />
        </div>
      </section>
      
      {/* Gallery */}
      <section className="scroll-reveal bg-[#0A0A0A]" id="gallery">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">05</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Gallery</h2>
            </div>
            <span className="text-[10px] md:text-xs text-white/40 tracking-wider hidden sm:block">Campaign Archive</span>
          </div>
          <FilmstripGallerySection />
        </div>
      </section>
      
      {/* About */}
      <section className="scroll-reveal bg-[#0A0A0A]" id="why-choose-us">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">06</span>
              <h2 className="text-lg md:text-xl font-medium text-white">About</h2>
            </div>
            <span className="text-[10px] md:text-xs text-white/40 tracking-wider hidden sm:block">Why CryptoBridge</span>
          </div>
          <WhyChooseUsSection />
        </div>
      </section>
      
      {/* Insights */}
      <section className="scroll-reveal bg-[#0A0A0A]" id="insights">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">07</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Insights</h2>
            </div>
            <span className="text-[10px] md:text-xs text-white/40 tracking-wider hidden sm:block">Research</span>
          </div>
          <InsightsSection />
        </div>
      </section>
      
      {/* Contact */}
      <section className="scroll-reveal bg-[#0A0A0A]" id="contact">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">08</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Contact</h2>
            </div>
            <span className="text-[10px] md:text-xs text-white/40 tracking-wider hidden sm:block">Get Started</span>
          </div>
          <CTASection />
        </div>
      </section>
      
      {/* Legal */}
      <section className="scroll-reveal bg-[#0A0A0A]" id="legal">
        <div className="border-t border-white/10">
          
          
          {/* Legal Content */}
          
        </div>
      </section>
      
      <FloatingContactButton />
    </div>;
};
export default Index;