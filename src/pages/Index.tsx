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
      <HeroSection />
      <AboutUsSection />
      <CasesSection />
      <ServicesSection />
      <TeamSection />
      <GuidesSection />
      <BlogPreviewSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
