import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import PressSection from "@/components/PressSection";
import ProcessSection from "@/components/ProcessSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TeamPreviewSection from "@/components/TeamPreviewSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
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
      
      {/* Announcement Bar */}
      {introComplete && <AnnouncementBar />}
      
      <Navbar />
      <main className={`transition-opacity duration-500 ${introComplete ? 'opacity-100' : 'opacity-0'}`}>
        <HeroSection />
        <PressSection />
        <StatsSection />
        <ServicesSection />
        <ProcessSection />
        <CaseStudiesSection />
        <TestimonialsSection />
        <TeamPreviewSection />
        <BlogPreviewSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
        <SpecialOfferForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
