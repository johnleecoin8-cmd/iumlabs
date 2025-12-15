import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import ServicesSection from "@/components/ServicesSection";
import CasesSection from "@/components/CasesSection";
import FilmstripGallerySection from "@/components/FilmstripGallerySection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import InsightsSection from "@/components/InsightsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FloatingContactButton from "@/components/FloatingContactButton";
import useScrollReveal from "@/hooks/useScrollReveal";

const Index = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero - Dark */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-white" id="hero">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <HeroSection />
        </div>
      </main>
      
      {/* Process - White with header */}
      <section className="scroll-reveal bg-white" id="process">
        <div className="border-t border-gray-200">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-gray-200">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-gray-300 font-mono tracking-widest">01</span>
              <h2 className="text-lg md:text-xl font-medium text-gray-900">Process</h2>
            </div>
            <span className="text-[10px] md:text-xs text-gray-400 tracking-wider hidden sm:block">How We Work</span>
          </div>
          <ProcessSection />
        </div>
      </section>
      
      {/* Services - White with header */}
      <section className="scroll-reveal bg-white" id="services">
        <div className="border-t border-gray-200">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-gray-200">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-gray-300 font-mono tracking-widest">02</span>
              <h2 className="text-lg md:text-xl font-medium text-gray-900">Services</h2>
            </div>
            <span className="text-[10px] md:text-xs text-gray-400 tracking-wider hidden sm:block">What We Do</span>
          </div>
          <ServicesSection />
        </div>
      </section>
      
      {/* Cases - White with header */}
      <section className="scroll-reveal bg-white" id="cases">
        <div className="border-t border-gray-200">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-gray-200">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-gray-300 font-mono tracking-widest">03</span>
              <h2 className="text-lg md:text-xl font-medium text-gray-900">Cases</h2>
            </div>
            <span className="text-[10px] md:text-xs text-gray-400 tracking-wider hidden sm:block">Our Work</span>
          </div>
          <CasesSection />
        </div>
      </section>
      
      {/* Gallery - White with header */}
      <section className="scroll-reveal bg-white" id="gallery">
        <div className="border-t border-gray-200">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-gray-200">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-gray-300 font-mono tracking-widest">04</span>
              <h2 className="text-lg md:text-xl font-medium text-gray-900">Gallery</h2>
            </div>
            <span className="text-[10px] md:text-xs text-gray-400 tracking-wider hidden sm:block">Campaign Archive</span>
          </div>
          <FilmstripGallerySection />
        </div>
      </section>
      
      {/* Why Choose Us - White with header */}
      <section className="scroll-reveal bg-white" id="why-choose-us">
        <div className="border-t border-gray-200">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-gray-200">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-gray-300 font-mono tracking-widest">05</span>
              <h2 className="text-lg md:text-xl font-medium text-gray-900">About</h2>
            </div>
            <span className="text-[10px] md:text-xs text-gray-400 tracking-wider hidden sm:block">Why CryptoBridge</span>
          </div>
          <WhyChooseUsSection />
        </div>
      </section>
      
      {/* Insights - White with header */}
      <section className="scroll-reveal bg-white" id="insights">
        <div className="border-t border-gray-200">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-gray-200">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-gray-300 font-mono tracking-widest">06</span>
              <h2 className="text-lg md:text-xl font-medium text-gray-900">Insights</h2>
            </div>
            <span className="text-[10px] md:text-xs text-gray-400 tracking-wider hidden sm:block">Research</span>
          </div>
          <InsightsSection />
        </div>
      </section>
      
      {/* CTA - White with header */}
      <section className="scroll-reveal bg-white" id="contact">
        <div className="border-t border-gray-200">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-gray-200">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-gray-300 font-mono tracking-widest">07</span>
              <h2 className="text-lg md:text-xl font-medium text-gray-900">Contact</h2>
            </div>
            <span className="text-[10px] md:text-xs text-gray-400 tracking-wider hidden sm:block">Get Started</span>
          </div>
          <CTASection />
        </div>
      </section>
      
      {/* Footer - Dark */}
      <div className="border-t border-gray-200">
        <Footer />
      </div>
      
      <FloatingContactButton />
    </div>
  );
};

export default Index;
