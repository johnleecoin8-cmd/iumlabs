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

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
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
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">09</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Legal</h2>
            </div>
            <span className="text-[10px] md:text-xs text-white/40 tracking-wider hidden sm:block">Policies & Info</span>
          </div>
          
          {/* Legal Content */}
          <div className="py-12 md:py-16 px-6 md:px-10">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-8">
              <Link to="/terms" className="text-white/60 hover:text-white transition-colors flex items-center gap-1 group">
                Terms of Service
                <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
              <Link to="/privacy" className="text-white/60 hover:text-white transition-colors flex items-center gap-1 group">
                Privacy Policy
                <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
              <Link to="/transparency" className="text-white/60 hover:text-white transition-colors flex items-center gap-1 group">
                Transparency
                <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
            </div>
            
            {/* External Links */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
              <a href="https://www.linkedin.com/company/cryptobridge" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors flex items-center gap-1 group">
                LinkedIn
                <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </div>
            
            {/* Copyright */}
            <p className="text-center text-white/40 text-sm mb-12">
              © {new Date().getFullYear()} CryptoBridge Korea. All rights reserved.
            </p>
            
            {/* Giant Brand Name */}
            <div className="overflow-hidden">
              <h2 className="text-[3rem] md:text-[6rem] lg:text-[10rem] font-light leading-none tracking-tight text-center whitespace-nowrap">
                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>
                  CRYPTOBRIDGE KOREA
                </span>
              </h2>
            </div>
          </div>
        </div>
      </section>
      
      <FloatingContactButton />
    </div>
  );
};

export default Index;
