import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import seoulMetroBillboard from "@/assets/campaigns/seoul-metro-billboard.jpeg";
import storyOriginSummit from "@/assets/campaigns/story-origin-summit.jpg";
import ondoSeminar from "@/assets/campaigns/ondo-seminar.jpg";
import synfuturesBillboard from "@/assets/campaigns/synfutures-billboard.jpg";
import peaqSummit from "@/assets/campaigns/peaq-summit.jpg";

const campaignImages = [
  { src: seoulMetroBillboard, alt: "Seoul Metro Billboard Campaign" },
  { src: storyOriginSummit, alt: "Story Origin Summit" },
  { src: ondoSeminar, alt: "Ondo Seminar" },
  { src: synfuturesBillboard, alt: "SynFutures Billboard" },
  { src: peaqSummit, alt: "Peaq Summit" },
];
import ServicesSection from "@/components/ServicesSection";
import MediaPartnersSection from "@/components/MediaPartnersSection";
import CasesSection from "@/components/CasesSection";
import FilmstripGallerySection from "@/components/FilmstripGallerySection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import InsightsSection from "@/components/InsightsSection";
import ContactFormSection from "@/components/ContactFormSection";
import CTABannerSection from "@/components/CTABannerSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import Footer from "@/components/Footer";
import FloatingContactButton from "@/components/FloatingContactButton";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Search, Target, Rocket, TrendingUp } from "lucide-react";

const processPhases = [
  {
    title: "Discovery",
    icon: Search,
    description: "Deep market research and competitor analysis to understand your positioning in Korea"
  },
  {
    title: "Strategy",
    icon: Target,
    description: "Custom GTM roadmap with KPI-driven milestones and localized messaging"
  },
  {
    title: "Launch",
    icon: Rocket,
    description: "Multi-channel execution across KOLs, PR, events, and community activation"
  },
  {
    title: "Scale",
    icon: TrendingUp,
    description: "Performance optimization and sustainable growth through data-driven iteration"
  }
];

const ProcessBillboardOverlay = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % campaignImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="px-4 md:px-10 pt-4 md:pt-6 pb-4 md:pb-6">
      <div className="relative w-full h-[420px] sm:h-[350px] md:h-[380px] lg:h-[450px] rounded-lg md:rounded-xl overflow-hidden group">
        {/* Background Images - Auto Sliding */}
        {campaignImages.map((image, index) => (
          <img 
            key={index}
            src={image.src} 
            alt={image.alt} 
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {campaignImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white w-4' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        
        {/* 4-Sector Grid Overlay - 모바일은 세로 스택 */}
        <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {processPhases.map((phase, index) => {
            const Icon = phase.icon;
            const isHovered = hoveredIndex === index;
            const hasHover = hoveredIndex !== null;
            
            return (
              <div
                key={index}
                className={`
                  relative flex flex-row sm:flex-col items-center sm:justify-center 
                  gap-3 sm:gap-0 p-3 sm:p-4 md:p-6
                  border-b sm:border-r sm:border-b border-white/10 
                  last:border-b-0 sm:last:border-r-0
                  sm:[&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r
                  sm:[&:nth-child(3)]:border-b-0 sm:[&:nth-child(4)]:border-b-0
                  lg:border-b-0
                  cursor-pointer transition-all duration-500 ease-out
                  ${isHovered ? 'bg-white/10 backdrop-blur-sm' : hasHover ? 'bg-black/20' : 'bg-transparent'}
                `}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
              >
                {/* Step Number */}
                <span className={`
                  absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4
                  text-[10px] md:text-xs font-mono tracking-widest
                  transition-all duration-300
                  ${isHovered ? 'text-white' : 'text-white/40'}
                `}>
                  0{index + 1}
                </span>
                
                {/* Icon */}
                <div className={`
                  w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex-shrink-0
                  flex items-center justify-center sm:mb-2 md:mb-3
                  border transition-all duration-500
                  ${isHovered 
                    ? 'bg-white/20 border-white/40 scale-110' 
                    : 'bg-white/5 border-white/20'
                  }
                `}>
                  <Icon className={`
                    w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-all duration-300
                    ${isHovered ? 'text-white' : 'text-white/60'}
                  `} />
                </div>
                
                {/* Content */}
                <div className="flex-1 sm:flex-none sm:text-center">
                  {/* Title */}
                  <h4 className={`
                    text-sm sm:text-sm md:text-base lg:text-lg font-medium
                    transition-all duration-300
                    ${isHovered ? 'text-white' : 'text-white/80'}
                  `}>
                    {phase.title}
                  </h4>
                  
                  {/* Description - 모바일에서 항상 표시, 태블릿/데스크톱은 호버 시 */}
                  <div className={`
                    sm:mt-2 md:mt-3 overflow-hidden
                    transition-all duration-500 ease-out
                    max-h-[60px] opacity-100
                    sm:${isHovered 
                      ? 'sm:max-h-[100px] sm:opacity-100 sm:translate-y-0' 
                      : 'sm:max-h-0 sm:opacity-0 sm:translate-y-2'
                    }
                  `}>
                    <p className={`
                      text-[11px] sm:text-[11px] md:text-xs lg:text-sm text-white/60 leading-relaxed
                      transition-all duration-500
                      ${isHovered ? 'sm:opacity-100' : 'sm:opacity-0'}
                    `}>
                      {phase.description}
                    </p>
                  </div>
                </div>
                
                {/* Bottom Accent Line - 데스크톱만 */}
                <div className={`
                  absolute bottom-0 left-1/2 -translate-x-1/2
                  h-[2px] bg-gradient-to-r from-transparent via-white to-transparent
                  transition-all duration-500 hidden sm:block
                  ${isHovered ? 'w-3/4 opacity-100' : 'w-0 opacity-0'}
                `} />
                
                {/* Right Accent Line - 모바일만 */}
                <div className={`
                  absolute right-0 top-1/2 -translate-y-1/2
                  w-[2px] bg-gradient-to-b from-transparent via-white to-transparent
                  transition-all duration-500 sm:hidden
                  ${isHovered ? 'h-1/2 opacity-100' : 'h-0 opacity-0'}
                `} />
              </div>
            );
          })}
        </div>
        
        {/* Corner Decorations */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-2">
          <span className="text-[10px] md:text-xs text-white/50 font-mono tracking-wider">HOW WE WORK</span>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  usePageTitle("Web3 Research & GTM Strategy Group");

  return (
    <div className="min-h-screen bg-surface-base">
      <Navbar />
      
      {/* Hero */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-surface-base" id="hero">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <HeroSection />
        </div>
      </main>
      
      {/* About - 01 홀수 */}
      <section className="bg-surface-odd" id="why-choose-us">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">01</span>
              <h2 className="text-lg md:text-xl font-medium text-white">About</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Why Ium Labs</span>
          </div>
          <WhyChooseUsSection />
        </div>
      </section>
      
      {/* Services - 02 짝수 */}
      <section className="bg-surface-even" id="services">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">02</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Services</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">What We Do</span>
          </div>
          <ServicesSection />
        </div>
      </section>
      
      {/* Process - 03 홀수 */}
      <section className="bg-surface-odd" id="process">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">03</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Process</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">How We Work</span>
          </div>
          
          {/* Featured Billboard Image with Process Overlay */}
          <ProcessBillboardOverlay />
        </div>
      </section>
      
      {/* Cases - 04 짝수 */}
      <section className="bg-surface-even" id="cases">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">04</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Cases</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Our Work</span>
          </div>
          <CasesSection />
        </div>
      </section>
      
      {/* Gallery - 05 홀수 */}
      <section className="bg-surface-odd" id="gallery">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">05</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Gallery</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Campaign Archive</span>
          </div>
          <FilmstripGallerySection />
        </div>
      </section>
      
      {/* Media Partners - 06 짝수 */}
      <section className="bg-surface-even" id="media-partners">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">06</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Media Partners</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">As Featured In</span>
          </div>
          <MediaPartnersSection />
        </div>
      </section>
      
      {/* Insights - 07 홀수 */}
      <section className="bg-surface-odd" id="insights">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">07</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Insights</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Research</span>
          </div>
          <InsightsSection />
        </div>
      </section>
      
      {/* Contact - 08 짝수 */}
      <section className="bg-surface-even" id="contact">
        <ContactFormSection sectionNumber="08" />
      </section>
      
      {/* CTA Banner */}
      <CTABannerSection />
      
      {/* Footer Links */}
      <FooterLinksSection />
      
      {/* Footer Brand */}
      <Footer />
      
      <FloatingContactButton />
    </div>
  );
};

export default Index;