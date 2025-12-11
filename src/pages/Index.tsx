import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutUsSection from "@/components/AboutUsSection";
import CasesSection from "@/components/CasesSection";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";

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
      
      <section className="scroll-reveal" id="about" style={{ backgroundColor: 'hsl(0 0% 6%)' }}>
        <AboutUsSection />
      </section>
      
      <section className="scroll-reveal" id="cases" style={{ backgroundColor: 'hsl(0 0% 4%)' }}>
        <CasesSection />
      </section>
      
      <section className="screen-4 scroll-reveal" id="services">
        <ServicesSection />
      </section>
      
      <section className="scroll-reveal" id="team" style={{ backgroundColor: '#F5F3EF' }}>
        <TeamSection />
      </section>
      
      <section className="scroll-reveal" id="blog" style={{ backgroundColor: '#FAFAFA' }}>
        <BlogPreviewSection />
      </section>
      
      
      <Footer />
    </div>
  );
};

export default Index;
