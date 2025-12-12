import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutUsSection from "@/components/AboutUsSection";
import CasesSection from "@/components/CasesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import InsightsSection from "@/components/InsightsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SectionIndicator from "@/components/SectionIndicator";
import useScrollReveal from "@/hooks/useScrollReveal";

const Index = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SectionIndicator />
      
      <main className="screen-1" id="hero">
        <HeroSection />
      </main>
      
      <section className="scroll-reveal" id="about">
        <AboutUsSection />
      </section>
      
      <section className="scroll-reveal" id="cases">
        <CasesSection />
      </section>
      
      <section className="scroll-reveal" id="why-choose-us">
        <WhyChooseUsSection />
      </section>
      
      <section className="scroll-reveal" id="services">
        <ServicesSection />
      </section>
      
      <section className="scroll-reveal" id="testimonials">
        <TestimonialsSection />
      </section>
      
      <section className="scroll-reveal" id="insights">
        <InsightsSection />
      </section>
      
      <section className="screen-8 scroll-reveal" id="contact">
        <CTASection />
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
