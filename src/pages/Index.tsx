import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutUsSection from "@/components/AboutUsSection";
import CasesSection from "@/components/CasesSection";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import GuidesSection from "@/components/GuidesSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";
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
      
      <section className="screen-2 scroll-reveal" id="about">
        <AboutUsSection />
      </section>
      
      <section className="screen-3 scroll-reveal" id="cases">
        <CasesSection />
      </section>
      
      <section className="screen-4 scroll-reveal" id="services">
        <ServicesSection />
      </section>
      
      <section className="screen-5 scroll-reveal" id="team">
        <TeamSection />
      </section>
      
      <section className="screen-6 scroll-reveal" id="guides">
        <GuidesSection />
      </section>
      
      <section className="screen-7 scroll-reveal" id="blog">
        <BlogPreviewSection />
      </section>
      
      <section className="screen-8 scroll-reveal" id="contact">
        <CTASection />
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
