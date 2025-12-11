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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="screen-1" id="hero">
        <HeroSection />
      </main>
      
      <section className="screen-2" id="about">
        <AboutUsSection />
      </section>
      
      <section className="screen-3" id="cases">
        <CasesSection />
      </section>
      
      <section className="screen-4" id="services">
        <ServicesSection />
      </section>
      
      <section className="screen-5" id="team">
        <TeamSection />
      </section>
      
      <section className="screen-6" id="guides">
        <GuidesSection />
      </section>
      
      <section className="screen-7" id="blog">
        <BlogPreviewSection />
      </section>
      
      <section className="screen-8" id="contact">
        <CTASection />
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
