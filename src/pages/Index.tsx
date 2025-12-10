import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import CTASection from "@/components/CTASection";
import SpecialOfferForm from "@/components/SpecialOfferForm";
import Footer from "@/components/Footer";
import PageIntro from "@/components/PageIntro";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Intro Animation */}
      {!introComplete && <PageIntro onComplete={handleIntroComplete} />}
      
      {/* Noise texture overlay */}
      <div className="noise-overlay" />
      
      <Navbar />
      <main className={`transition-opacity duration-500 ${introComplete ? 'opacity-100' : 'opacity-0'}`}>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <PortfolioSection />
        <CTASection />
        <SpecialOfferForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
