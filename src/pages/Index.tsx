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
    <div className="min-h-screen bg-background">
      <Navbar />
      <SectionIndicator />
      
      <main className="screen-1 p-0.5 sm:p-1 md:p-2 bg-white" id="hero">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <HeroSection />
        </div>
      </main>
      
      <section className="scroll-reveal p-0.5 sm:p-1 md:p-2 bg-white" id="about">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <AboutUsSection />
        </div>
      </section>
      
      <section className="scroll-reveal p-0.5 sm:p-1 md:p-2 bg-white" id="cases">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <CasesSection />
        </div>
      </section>
      
      <section className="scroll-reveal p-0.5 sm:p-1 md:p-2 bg-white" id="why-choose-us">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <WhyChooseUsSection />
        </div>
      </section>
      
      <section className="scroll-reveal p-0.5 sm:p-1 md:p-2 bg-white" id="process">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <ProcessSection />
        </div>
      </section>
      
      <section className="scroll-reveal p-0.5 sm:p-1 md:p-2 bg-white" id="services">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <ServicesSection />
        </div>
      </section>
      
      <section className="scroll-reveal p-0.5 sm:p-1 md:p-2 bg-white" id="testimonials">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <TestimonialsSection />
        </div>
      </section>
      
      <section className="scroll-reveal p-0.5 sm:p-1 md:p-2 bg-white" id="insights">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <InsightsSection />
        </div>
      </section>
      
      <section className="screen-8 scroll-reveal p-0.5 sm:p-1 md:p-2 bg-white" id="contact">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <CTASection />
        </div>
      </section>
      
      <div className="p-0.5 sm:p-1 md:p-2 bg-white">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <Footer />
        </div>
      </div>
      <FloatingContactButton />
    </div>
  );
};

export default Index;
