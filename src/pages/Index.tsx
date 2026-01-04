import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import seoulMetroBillboard from "@/assets/campaigns/seoul-metro-billboard.jpeg";
import storyOriginSummit from "@/assets/campaigns/story-origin-summit.jpg";
import ondoSeminar from "@/assets/campaigns/ondo-seminar.jpg";
import synfuturesBillboard from "@/assets/campaigns/synfutures-billboard.jpg";
import peaqSummit from "@/assets/campaigns/peaq-summit.jpg";
const campaignImages = [{
  src: seoulMetroBillboard,
  alt: "Seoul Metro Billboard Campaign"
}, {
  src: storyOriginSummit,
  alt: "Story Origin Summit"
}, {
  src: ondoSeminar,
  alt: "Ondo Seminar"
}, {
  src: synfuturesBillboard,
  alt: "SynFutures Billboard"
}, {
  src: peaqSummit,
  alt: "Peaq Summit"
}];
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
import { AnimatedSection } from "@/components/AnimatedSection";
import { MessageSquare, FileText, Rocket, TrendingUp, Check, ArrowRight, ArrowDown } from "lucide-react";
const processPhases = [{
  title: "Share",
  icon: MessageSquare,
  description: "Tell us about your project vision, target audience, budget range, and success metrics",
  subPoints: ["Project goals & timeline", "Budget & resources", "Target KPIs"]
}, {
  title: "Propose",
  icon: FileText,
  description: "We analyze your needs and deliver a customized GTM strategy with clear milestones",
  subPoints: ["Market research", "Competitive analysis", "Custom GTM roadmap"]
}, {
  title: "Launch",
  icon: Rocket,
  description: "Execute your strategy with our network of media, KOLs, and community partners",
  subPoints: ["PR & media outreach", "KOL activation", "Community building"]
}, {
  title: "Scale",
  icon: TrendingUp,
  description: "Measure, optimize, and scale your presence based on real performance data",
  subPoints: ["Performance tracking", "Strategy optimization", "Growth acceleration"]
}];
const ProcessBillboardOverlay = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.2,
      rootMargin: '50px'
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  return <div ref={sectionRef} className="px-3 sm:px-4 md:px-8 lg:px-10 pt-3 sm:pt-4 md:pt-6 pb-3 sm:pb-4 md:pb-6">
      <div className="relative w-full h-[380px] sm:h-[320px] md:h-[340px] lg:h-[450px] rounded-lg md:rounded-xl overflow-hidden group">
        {/* Background Image - Fixed Billboard */}
        <img src={seoulMetroBillboard} alt="Seoul Metro Billboard Campaign" className="absolute inset-0 w-full h-full object-cover object-center" />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        
        {/* 4-Sector Grid Overlay - 모바일 2x2, 태블릿 2x2, 데스크톱 4열 */}
        <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {processPhases.map((phase, index) => {
          const Icon = phase.icon;
          const isHovered = hoveredIndex === index;
          const hasHover = hoveredIndex !== null;

          // 스텝 번호별 그라데이션 색상 (진행감 표현)
          const stepColors = ['text-white/50',
          // 01
          'text-white/60',
          // 02
          'text-white/70',
          // 03
          'text-white/90' // 04
          ];
          return <div key={index} className={`
                  relative flex flex-col items-center justify-center 
                  gap-1 p-3 sm:p-4 md:p-6
                  ${index === 0 || index === 2 ? 'border-r border-white/10' : ''}
                  ${index === 0 || index === 1 ? 'border-b border-white/10' : ''}
                  lg:border-r lg:border-b-0 lg:last:border-r-0
                  cursor-pointer
                  ${isHovered ? 'bg-white/10 backdrop-blur-sm' : hasHover ? 'bg-black/20' : 'bg-transparent'}
                `} style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.5s ease-out ${index * 100}ms, transform 0.5s ease-out ${index * 100}ms, background-color 0.5s ease-out`
          }} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}>
                {/* Step Number - 진행감 있는 색상 */}
                <span className={`
                  absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4
                  text-[10px] md:text-xs font-mono tracking-widest
                  transition-all duration-300
                  ${isHovered ? 'text-white' : stepColors[index]}
                `}>
                  0{index + 1}
                </span>
                
                {/* 연결 화살표 - 1→2 (오른쪽) */}
                {index === 0 && <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 lg:hidden">
                    <div className="w-5 h-5 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <ArrowRight className="w-3 h-3 text-white/70" />
                    </div>
                  </div>}
                
                {/* 연결 화살표 - 2→3 (아래로, 왼쪽 대각선 느낌) */}
                {index === 1 && <div className="absolute bottom-0 left-1/4 translate-y-1/2 z-20 lg:hidden">
                    <div className="w-5 h-5 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <ArrowDown className="w-3 h-3 text-white/70" />
                    </div>
                  </div>}
                
                {/* 연결 화살표 - 3→4 (오른쪽) */}
                {index === 2 && <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 lg:hidden">
                    <div className="w-5 h-5 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <ArrowRight className="w-3 h-3 text-white/70" />
                    </div>
                  </div>}
                
                {/* Icon */}
                <div className={`
                  w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex-shrink-0
                  flex items-center justify-center mb-1 md:mb-2 lg:mb-3
                  border transition-all duration-500
                  ${isHovered ? 'bg-white/20 border-white/40 scale-110' : 'bg-white/5 border-white/20'}
                `}>
                  <Icon className={`
                    w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-all duration-500
                    ${isHovered ? 'text-white rotate-[360deg]' : 'text-white/60 rotate-0'}
                  `} />
                </div>
                
                {/* Content */}
                <div className="text-center">
                  {/* Title */}
                  <h4 className={`
                    text-xs sm:text-sm md:text-sm lg:text-base font-medium
                    transition-all duration-300
                    ${isHovered ? 'text-white' : 'text-white/80'}
                  `}>
                    {phase.title}
                  </h4>
                  
                  {/* Description - 모바일에서 간략히, 호버 시 상세 */}
                  <div className={`
                    mt-1 md:mt-2 overflow-hidden
                    transition-all duration-500 ease-out
                    ${isHovered ? 'max-h-[100px] opacity-100' : 'max-h-[40px] opacity-80'}
                  `}>
                    <p className={`
                      text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs text-white/60 leading-relaxed
                      transition-all duration-500 line-clamp-2
                      ${isHovered ? 'opacity-100' : 'opacity-70'}
                    `}>
                      {phase.description}
                    </p>
                    
                    {/* Sub Points - 호버 시에만 */}
                    <div className={`
                      mt-1 sm:mt-2 space-y-0.5 transition-all duration-500 delay-100
                      ${isHovered ? 'opacity-100 max-h-[60px]' : 'opacity-0 max-h-0 overflow-hidden'}
                    `}>
                      {phase.subPoints.slice(0, 2).map((point, i) => <div key={i} className="flex items-center justify-center gap-1 text-[8px] sm:text-[9px] md:text-[10px] text-white/50">
                          <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-green-400 flex-shrink-0" />
                          <span className="line-clamp-1">{point}</span>
                        </div>)}
                    </div>
                  </div>
                </div>
                
                {/* Bottom Accent Line */}
                <div className={`
                  absolute bottom-0 left-1/2 -translate-x-1/2
                  h-[2px] bg-gradient-to-r from-transparent via-white to-transparent
                  transition-all duration-500
                  ${isHovered ? 'w-3/4 opacity-100' : 'w-0 opacity-0'}
                `} />
              </div>;
        })}
        </div>
        
        {/* Corner Decorations */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-2">
          <span className="text-[10px] md:text-xs text-white/50 font-mono tracking-wider">HOW WE WORK</span>
        </div>
        
        {/* Bottom CTA */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 md:bottom-4">
          
        </div>
      </div>
    </div>;
};
const Index = () => {
  usePageTitle("Korean Web3 Marketing & Research Agency");
  return <div className="min-h-screen bg-surface-base">
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
          <AnimatedSection>
            <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">01</span>
                <h2 className="text-lg md:text-xl font-medium text-white">About</h2>
              </div>
              <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Why ium Labs</span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <WhyChooseUsSection />
          </AnimatedSection>
        </div>
      </section>
      
      {/* Media Partners - 번호 없음, 헤더 없이 마키만 */}
      <section className="bg-surface-even" id="media-partners">
        <AnimatedSection direction="none">
          <MediaPartnersSection />
        </AnimatedSection>
      </section>
      
      {/* Services - 02 홀수 */}
      <section className="bg-surface-odd" id="services">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">02</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Services</h2>
              </div>
              <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">What We Do</span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <ServicesSection />
          </AnimatedSection>
        </div>
      </section>
      
      {/* Process - 03 짝수 */}
      <section className="bg-surface-even" id="process">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">03</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Process</h2>
              </div>
              <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">How We Work</span>
            </div>
          </AnimatedSection>
          
          {/* Featured Billboard Image with Process Overlay */}
          <AnimatedSection delay={100}>
            <ProcessBillboardOverlay />
          </AnimatedSection>
        </div>
      </section>
      
      {/* Cases - 04 홀수 */}
      <section className="bg-surface-odd" id="cases">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">04</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Cases</h2>
              </div>
              <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Our Work</span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <CasesSection />
          </AnimatedSection>
        </div>
      </section>
      
      {/* Gallery - 05 짝수 */}
      <section className="bg-surface-even" id="gallery">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">05</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Gallery</h2>
              </div>
              <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Campaign Archive</span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <FilmstripGallerySection />
          </AnimatedSection>
        </div>
      </section>
      
      {/* Insights - 06 홀수 */}
      <section className="bg-surface-odd" id="insights">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">06</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Insights</h2>
              </div>
              <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Research</span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <InsightsSection />
          </AnimatedSection>
        </div>
      </section>
      
      {/* Contact - 07 짝수 */}
      <section className="bg-surface-even" id="contact">
        <AnimatedSection>
          <ContactFormSection sectionNumber="07" />
        </AnimatedSection>
      </section>
      
      {/* CTA Banner */}
      <AnimatedSection direction="none">
        <CTABannerSection />
      </AnimatedSection>
      
      {/* Footer Links */}
      <FooterLinksSection />
      
      {/* Footer Brand */}
      <Footer />
      
      <FloatingContactButton />
    </div>;
};
export default Index;