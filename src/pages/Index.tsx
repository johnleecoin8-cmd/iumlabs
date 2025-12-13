import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutUsSection from "@/components/AboutUsSection";
import CasesSection from "@/components/CasesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ProcessSection from "@/components/ProcessSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import InsightsSection from "@/components/InsightsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SectionIndicator from "@/components/SectionIndicator";
import FloatingContactButton from "@/components/FloatingContactButton";
import useScrollReveal from "@/hooks/useScrollReveal";

const Index = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <SectionIndicator />
      
      <main className="screen-1 p-0.5 sm:p-1 md:p-2" id="hero">
        <HeroSection />
      </main>
      
      <div className="p-0.5 sm:p-1 md:p-2" id="about">
        <section className="scroll-reveal rounded-xl sm:rounded-2xl overflow-hidden">
          <AboutUsSection />
        </section>
      </div>
      
      <div className="p-0.5 sm:p-1 md:p-2" id="cases">
        <section className="scroll-reveal rounded-xl sm:rounded-2xl overflow-hidden">
          <CasesSection />
        </section>
      </div>
      
      <div className="p-0.5 sm:p-1 md:p-2" id="why-choose-us">
        <section className="scroll-reveal rounded-xl sm:rounded-2xl overflow-hidden">
          <WhyChooseUsSection />
        </section>
      </div>
      
      <div className="p-0.5 sm:p-1 md:p-2" id="process">
        <section className="scroll-reveal rounded-xl sm:rounded-2xl overflow-hidden">
          <ProcessSection />
        </section>
      </div>
      
      <div className="p-0.5 sm:p-1 md:p-2" id="services">
        <section className="scroll-reveal rounded-xl sm:rounded-2xl overflow-hidden">
          <ServicesSection />
        </section>
      </div>
      
      <div className="p-0.5 sm:p-1 md:p-2" id="testimonials">
        <section className="scroll-reveal rounded-xl sm:rounded-2xl overflow-hidden">
          <TestimonialsSection />
        </section>
      </div>
      
      <div className="p-0.5 sm:p-1 md:p-2" id="insights">
        <section className="scroll-reveal rounded-xl sm:rounded-2xl overflow-hidden">
          <InsightsSection />
        </section>
      </div>
      
      <div className="p-0.5 sm:p-1 md:p-2" id="contact">
        <section className="screen-8 scroll-reveal rounded-xl sm:rounded-2xl overflow-hidden">
          <CTASection />
        </section>
      </div>
      
      <div className="p-0.5 sm:p-1 md:p-2">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <Footer />
        </div>
      </div>
      <FloatingContactButton />
    </div>
  );
};

export default Index;
