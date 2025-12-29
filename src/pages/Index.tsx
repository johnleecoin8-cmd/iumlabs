import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import seoulMetroBillboard from "@/assets/campaigns/seoul-metro-billboard.jpeg";
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="px-4 md:px-10 pt-4 md:pt-6 pb-2 md:pb-4">
      <div className="relative w-full h-[280px] md:h-[350px] lg:h-[450px] rounded-lg md:rounded-xl overflow-hidden group">
        {/* Background Image */}
        <img 
          src={seoulMetroBillboard} 
          alt="Seoul Metro Billboard Campaign" 
          className="w-full h-full object-cover object-center"
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
        
        {/* 4-Sector Grid Overlay */}
        <div className="absolute inset-0 grid grid-cols-2 lg:grid-cols-4">
          {processPhases.map((phase, index) => {
            const Icon = phase.icon;
            const isHovered = hoveredIndex === index;
            const hasHover = hoveredIndex !== null;
            
            return (
              <div
                key={index}
                className={`
                  relative flex flex-col items-center justify-center p-4 md:p-6
                  border-r border-b border-white/10 last:border-r-0
                  lg:border-b-0 lg:[&:nth-child(2)]:border-r lg:[&:nth-child(4)]:border-r-0
                  cursor-pointer transition-all duration-500 ease-out
                  ${isHovered ? 'bg-white/10 backdrop-blur-sm' : hasHover ? 'bg-black/20' : 'bg-transparent'}
                `}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Step Number */}
                <span className={`
                  absolute top-3 left-3 md:top-4 md:left-4
                  text-[10px] md:text-xs font-mono tracking-widest
                  transition-all duration-300
                  ${isHovered ? 'text-white' : 'text-white/40'}
                `}>
                  0{index + 1}
                </span>
                
                {/* Icon */}
                <div className={`
                  w-12 h-12 md:w-16 md:h-16 rounded-full
                  flex items-center justify-center mb-3 md:mb-4
                  border transition-all duration-500
                  ${isHovered 
                    ? 'bg-white/20 border-white/40 scale-110' 
                    : 'bg-white/5 border-white/20'
                  }
                `}>
                  <Icon className={`
                    w-5 h-5 md:w-7 md:h-7 transition-all duration-300
                    ${isHovered ? 'text-white' : 'text-white/60'}
                  `} />
                </div>
                
                {/* Title */}
                <h4 className={`
                  text-sm md:text-base lg:text-lg font-medium text-center
                  transition-all duration-300
                  ${isHovered ? 'text-white' : 'text-white/80'}
                `}>
                  {phase.title}
                </h4>
                
                {/* Description - Only visible on hover */}
                <div className={`
                  mt-2 md:mt-3 text-center overflow-hidden
                  transition-all duration-500 ease-out
                  ${isHovered 
                    ? 'max-h-[100px] opacity-100 translate-y-0' 
                    : 'max-h-0 opacity-0 translate-y-2'
                  }
                `}>
                  <p className="text-[11px] md:text-xs lg:text-sm text-white/70 leading-relaxed px-1">
                    {phase.description}
                  </p>
                </div>
                
                {/* Bottom Accent Line */}
                <div className={`
                  absolute bottom-0 left-1/2 -translate-x-1/2
                  h-[2px] bg-gradient-to-r from-transparent via-white to-transparent
                  transition-all duration-500
                  ${isHovered ? 'w-3/4 opacity-100' : 'w-0 opacity-0'}
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
          
          <ProcessSection />
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