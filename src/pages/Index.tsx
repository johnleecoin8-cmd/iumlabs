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
import { MessageSquare, FileText, Rocket, TrendingUp, Check } from "lucide-react";

const processPhases = [
  {
    title: "Share",
    icon: MessageSquare,
    description: "Tell us about your project vision, target audience, budget range, and success metrics",
    subPoints: ["Project goals & timeline", "Budget & resources", "Target KPIs"]
  },
  {
    title: "Propose",
    icon: FileText,
    description: "We analyze your needs and deliver a customized GTM strategy with clear milestones",
    subPoints: ["Market research", "Competitive analysis", "Custom GTM roadmap"]
  },
  {
    title: "Launch",
    icon: Rocket,
    description: "Execute your strategy with our network of media, KOLs, and community partners",
    subPoints: ["PR & media outreach", "KOL activation", "Community building"]
  },
  {
    title: "Scale",
    icon: TrendingUp,
    description: "Measure, optimize, and scale your presence based on real performance data",
    subPoints: ["Performance tracking", "Strategy optimization", "Growth acceleration"]
  }
];

const ProcessBillboardOverlay = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
      <div className="px-3 sm:px-4 md:px-8 lg:px-10 pt-3 sm:pt-4 md:pt-6 pb-3 sm:pb-4 md:pb-6">
      <div className="relative w-full h-[320px] sm:h-[320px] md:h-[340px] lg:h-[450px] rounded-lg md:rounded-xl overflow-hidden group">
        {/* Background Image - Fixed Billboard */}
        <img 
          src={seoulMetroBillboard} 
          alt="Seoul Metro Billboard Campaign" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        
        {/* 4-Sector Grid Overlay - 모바일은 1열, 태블릿은 2x2 */}
        <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
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
                  w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex-shrink-0
                  flex items-center justify-center sm:mb-1 md:mb-2 lg:mb-3
                  border transition-all duration-500
                  ${isHovered 
                    ? 'bg-white/20 border-white/40 scale-110' 
                    : 'bg-white/5 border-white/20'
                  }
                `}>
                  <Icon className={`
                    w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-all duration-500
                    ${isHovered ? 'text-white rotate-[360deg]' : 'text-white/60 rotate-0'}
                  `} />
                </div>
                
                {/* Content */}
                <div className="flex-1 sm:flex-none sm:text-center">
                  {/* Title */}
                  <h4 className={`
                    text-xs sm:text-sm md:text-sm lg:text-base font-medium
                    transition-all duration-300
                    ${isHovered ? 'text-white' : 'text-white/80'}
                  `}>
                    {phase.title}
                  </h4>
                  
                  {/* Description - 모바일에서 항상 표시, 태블릿/데스크톱은 호버 시 */}
                  <div className={`
                    sm:mt-1 md:mt-2 overflow-hidden
                    transition-all duration-500 ease-out
                    max-h-[80px] opacity-100
                    sm:${isHovered 
                      ? 'sm:max-h-[100px] sm:opacity-100 sm:translate-y-0' 
                      : 'sm:max-h-0 sm:opacity-0 sm:translate-y-2'
                    }
                  `}>
                    <p className={`
                      text-[10px] sm:text-[10px] md:text-[11px] lg:text-xs text-white/60 leading-relaxed
                      transition-all duration-500 line-clamp-2 sm:line-clamp-none
                      ${isHovered ? 'sm:opacity-100' : 'sm:opacity-0'}
                    `}>
                      {phase.description}
                    </p>
                    
                    {/* Sub Points - 모바일에서 항상 표시 */}
                    <div className={`
                      mt-1.5 sm:mt-2 space-y-0.5 sm:space-y-1 transition-all duration-500 delay-100
                      opacity-100 sm:${isHovered ? 'opacity-100' : 'opacity-0'}
                    `}>
                      {phase.subPoints.map((point, i) => (
                        <div key={i} className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] md:text-[11px] text-white/50">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-400 flex-shrink-0" />
                          <span className="line-clamp-1">{point}</span>
                        </div>
                      ))}
                    </div>
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
          <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">01</span>
              <h2 className="text-lg md:text-xl font-medium text-white">About</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Why ium Labs</span>
          </div>
          <WhyChooseUsSection />
        </div>
      </section>
      
      {/* Media Partners - 번호 없음, 헤더 없이 마키만 */}
      <section className="bg-surface-even" id="media-partners">
        <MediaPartnersSection />
      </section>
      
      {/* Services - 02 홀수 */}
      <section className="bg-surface-odd" id="services">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">02</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Services</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">What We Do</span>
          </div>
          <ServicesSection />
        </div>
      </section>
      
      {/* Process - 03 짝수 */}
      <section className="bg-surface-even" id="process">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
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
      
      {/* Cases - 04 홀수 */}
      <section className="bg-surface-odd" id="cases">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">04</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Cases</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Our Work</span>
          </div>
          <CasesSection />
        </div>
      </section>
      
      {/* Gallery - 05 짝수 */}
      <section className="bg-surface-even" id="gallery">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">05</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Gallery</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Campaign Archive</span>
          </div>
          <FilmstripGallerySection />
        </div>
      </section>
      
      {/* Insights - 06 홀수 */}
      <section className="bg-surface-odd" id="insights">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">06</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Insights</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Research</span>
          </div>
          <InsightsSection />
        </div>
      </section>
      
      {/* Contact - 07 짝수 */}
      <section className="bg-surface-even" id="contact">
        <ContactFormSection sectionNumber="07" />
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