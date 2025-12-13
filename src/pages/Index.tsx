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
    <div className="min-h-screen bg-[hsl(0,0%,2%)]">
      <Navbar />
      <SectionIndicator />
      
      {/* Hero Section - Rounded corners */}
      <main className="screen-1 mx-2 md:mx-4 rounded-3xl overflow-hidden" id="hero">
        <HeroSection />
      </main>
      
      {/* About Section */}
      <section className="scroll-reveal mx-2 md:mx-4 mt-4 rounded-3xl overflow-hidden" id="about">
        <AboutUsSection />
      </section>
      
      {/* Cases Section */}
      <section className="scroll-reveal mx-2 md:mx-4 mt-4 rounded-3xl overflow-hidden" id="cases">
        <CasesSection />
      </section>
      
      {/* Why Choose Us Section */}
      <section className="scroll-reveal mx-2 md:mx-4 mt-4 rounded-3xl overflow-hidden" id="why-choose-us">
        <WhyChooseUsSection />
      </section>
      
      {/* Process Section */}
      <section className="scroll-reveal mx-2 md:mx-4 mt-4 rounded-3xl overflow-hidden" id="process">
        <ProcessSection />
      </section>
      
      {/* Services Section */}
      <section className="scroll-reveal mx-2 md:mx-4 mt-4 rounded-3xl overflow-hidden" id="services">
        <ServicesSection />
      </section>
      
      {/* Testimonials Section */}
      <section className="scroll-reveal mx-2 md:mx-4 mt-4 rounded-3xl overflow-hidden" id="testimonials">
        <TestimonialsSection />
      </section>
      
      {/* Insights Section */}
      <section className="scroll-reveal mx-2 md:mx-4 mt-4 rounded-3xl overflow-hidden" id="insights">
        <InsightsSection />
      </section>
      
      {/* CTA Section */}
      <section className="screen-8 scroll-reveal mx-2 md:mx-4 mt-4 rounded-3xl overflow-hidden" id="contact">
        <CTASection />
      </section>
      
      {/* Footer */}
      <div className="mx-2 md:mx-4 mt-4 mb-4 rounded-3xl overflow-hidden">
        <Footer />
      </div>
      
      <FloatingContactButton />
    </div>
  );
};

export default Index;
