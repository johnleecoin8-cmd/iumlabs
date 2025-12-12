import { useState, useEffect } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import CalendlyButton from "@/components/CalendlyButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ServiceDetailLayoutProps {
  tagline: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  aboutText: string;
  whatIncludesText: string;
  processSteps: ProcessStep[];
  floatingTags: Array<{
    label: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    mobileTop?: string;
    mobileLeft?: string;
    mobileRight?: string;
    mobileBottom?: string;
  }>;
  backgroundImage: string;
  accentColor?: string;
}

const ServiceDetailLayout = ({
  tagline,
  title,
  titleHighlight,
  subtitle,
  aboutText,
  whatIncludesText,
  processSteps,
  floatingTags,
  backgroundImage,
  accentColor = "primary",
}: ServiceDetailLayoutProps) => {
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollAnimation();
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero - Full Screen */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background with Ken Burns */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-kenburns"
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
              filter: "brightness(0.25) saturate(1.2)",
            }}
          />
          
          {/* Aurora light overlay */}
          <div className="absolute inset-0 animate-aurora">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-cyan-500/15" />
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/10 via-transparent to-primary/10" />
          </div>
          
          {/* Light sweep effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-light-sweep" />
          </div>
          
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.4)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
        </div>
        
        {/* Floating Tags with Parallax */}
        <div>
          {floatingTags.map((tag, index) => (
            <span
              key={tag.label}
              className="lunar-tag-dark absolute animate-float hidden sm:block"
              style={{
                top: tag.top,
                left: tag.left,
                right: tag.right,
                bottom: tag.bottom,
                animationDelay: `${index * 0.5}s`,
                transform: `translateY(${scrollY * 0.08}px)`,
              }}
            >
              {tag.label}
            </span>
          ))}
          {floatingTags.slice(0, 3).map((tag, index) => (
            <span
              key={`mobile-${tag.label}`}
              className="lunar-tag-dark absolute animate-float sm:hidden"
              style={{
                top: tag.mobileTop,
                left: tag.mobileLeft,
                right: tag.mobileRight,
                bottom: tag.mobileBottom,
                animationDelay: `${index * 0.5}s`,
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Hero Content */}
        <div className="container mx-auto max-w-7xl px-4 relative z-10 pt-32 pb-24">
          <div className="mb-16">
            <span className="text-sm text-white/50 mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              [ {tagline} ]
            </span>
            <h1 className="text-[10vw] md:text-[80px] lg:text-[120px] font-light text-white leading-[0.9] tracking-tight opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              {title}
              {titleHighlight && <span className="serif-italic text-primary">{titleHighlight}</span>}
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-white/10 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <p className="text-lg text-white/60 max-w-xl">
              {subtitle}
            </p>
            <CalendlyButton className="lunar-btn">
              <Calendar className="w-4 h-4" />
              <span>Book a Meeting</span>
            </CalendlyButton>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* About Section - Two Column */}
      <section ref={aboutRef} className="section-dark py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 animate-aurora pointer-events-none opacity-50">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-cyan-500/5" />
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - About */}
            <div className={`transition-all duration-700 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="text-sm text-white/50 mb-4 block">[ About ]</span>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
                What We <span className="serif-italic text-primary">Do</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                {aboutText}
              </p>
              <CalendlyButton className="lunar-btn-outline group">
                <span>Book a Meeting</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </CalendlyButton>
            </div>
            
            {/* Right - Open Hours Card */}
            <div className={`transition-all duration-700 delay-200 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full">
                <span className="text-sm text-white/50 mb-4 block">[ Open Hours ]</span>
                <div className="text-5xl md:text-6xl font-light text-white mb-4">
                  Mon-Fri
                </div>
                <div className="text-2xl text-white/60">
                  09:00 — 18:00
                </div>
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-white/50 text-sm">
                    Based in Seoul, South Korea. Available for meetings across all time zones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Includes Section */}
      <section className="section-light py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left - Title */}
            <div className="lg:col-span-4">
              <span className="text-sm text-[hsl(var(--light-fg),0.4)] mb-4 block">[ What Includes ]</span>
              <h2 className="text-3xl md:text-4xl font-light text-[hsl(var(--light-fg))] mb-6">
                Our <span className="serif-italic text-primary">Process</span>
              </h2>
              <p className="text-[hsl(var(--light-fg),0.6)] mb-8">
                {whatIncludesText}
              </p>
              <CalendlyButton className="inline-flex items-center gap-2 text-primary hover:underline">
                <span>[ book a meeting ]</span>
              </CalendlyButton>
            </div>
            
            {/* Right - Process Steps */}
            <div ref={processRef} className="lg:col-span-8">
              <div className="space-y-0">
                {processSteps.map((step, index) => (
                  <div 
                    key={step.number}
                    className={`group border-b border-[hsl(var(--light-fg),0.1)] py-8 first:pt-0 transition-all duration-500 ${
                      processVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="flex gap-8">
                      <div className="flex-shrink-0">
                        <span className="text-sm text-[hsl(var(--light-fg),0.3)] font-mono">
                          [ {step.number} ]
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-medium text-[hsl(var(--light-fg))] mb-3 group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-[hsl(var(--light-fg),0.6)] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default ServiceDetailLayout;
