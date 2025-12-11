import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import AboutUsSection from "@/components/AboutUsSection";
import CasesSection from "@/components/CasesSection";
import ProcessSection from "@/components/ProcessSection";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <AboutUsSection />
      <CasesSection />
      <ProcessSection />
      <ServicesSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
