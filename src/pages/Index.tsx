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
          <div className="p-6 md:p-8 border-b border-gray-200">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">01 / How We Work</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Process</h2>
          </div>
          <ProcessSection />
        </div>
      </section>
      
      {/* Services - White with header */}
      <section className="scroll-reveal bg-white" id="services">
        <div className="border-t border-gray-200">
          <div className="p-6 md:p-8 border-b border-gray-200">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">02 / What We Do</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Services</h2>
          </div>
          <ServicesSection />
        </div>
      </section>
      
      {/* Cases - White with header */}
      <section className="scroll-reveal bg-white" id="cases">
        <div className="border-t border-gray-200">
          <div className="p-6 md:p-8 border-b border-gray-200">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">03 / Our Work</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Cases</h2>
          </div>
          <CasesSection />
        </div>
      </section>
      
      {/* Gallery - White with header */}
      <section className="scroll-reveal bg-white" id="gallery">
        <div className="border-t border-gray-200">
          <div className="p-6 md:p-8 border-b border-gray-200">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">04 / Campaign Archive</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Gallery</h2>
          </div>
          <FilmstripGallerySection />
        </div>
      </section>
      
      {/* Why Choose Us - White with header */}
      <section className="scroll-reveal bg-white" id="why-choose-us">
        <div className="border-t border-gray-200">
          <div className="p-6 md:p-8 border-b border-gray-200">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">05 / About Us</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why CryptoBridge</h2>
          </div>
          <WhyChooseUsSection />
        </div>
      </section>
      
      {/* Insights - White with header */}
      <section className="scroll-reveal bg-white" id="insights">
        <div className="border-t border-gray-200">
          <div className="p-6 md:p-8 border-b border-gray-200">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">06 / Research</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Latest Insights</h2>
          </div>
          <InsightsSection />
        </div>
      </section>
      
      {/* CTA - White with header */}
      <section className="scroll-reveal bg-white" id="contact">
        <div className="border-t border-gray-200">
          <div className="p-6 md:p-8 border-b border-gray-200">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">07 / Get Started</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Contact Us</h2>
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
