import { useEffect } from "react";
import { Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import CalendlyButton from "@/components/CalendlyButton";

// Client logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.png";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import peaqLogo from "@/assets/logos/peaq.png";
import storyLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria.png";
import bybitLogo from "@/assets/logos/bybit.png";

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
  aboutImage?: string;
  floatingTags?: Array<{
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
  backgroundImage?: string;
}

const clientLogos = [
  { src: bnbLogo, alt: "BNB Chain" },
  { src: kucoinLogo, alt: "KuCoin" },
  { src: polygonLogo, alt: "Polygon" },
  { src: ondoLogo, alt: "Ondo Finance" },
  { src: peaqLogo, alt: "Peaq" },
  { src: storyLogo, alt: "Story Protocol" },
  { src: megaethLogo, alt: "MegaETH" },
  { src: triaLogo, alt: "Tria" },
  { src: bybitLogo, alt: "Bybit" },
];

const ServiceDetailLayout = ({
  title,
  titleHighlight,
  subtitle,
  aboutText,
  whatIncludesText,
  processSteps,
  aboutImage,
}: ServiceDetailLayoutProps) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - Blue Gradient */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#0891b2]">
        {/* Abstract 3D Shapes with Float Animation */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50%] h-[70%] opacity-70 pointer-events-none hidden lg:block">
          <div className="relative w-full h-full">
            {/* Large metallic sphere */}
            <div 
              className="absolute top-[5%] right-[15%] w-72 h-72 rounded-full bg-gradient-to-br from-white/40 via-white/20 to-transparent backdrop-blur-sm border border-white/30 shadow-2xl animate-float"
              style={{ animationDuration: "6s" }}
            />
            {/* Medium rounded rectangle */}
            <div 
              className="absolute top-[35%] right-[5%] w-56 h-56 rounded-[40px] bg-gradient-to-tr from-cyan-200/30 via-white/25 to-transparent backdrop-blur-md border border-white/40 rotate-12 shadow-xl animate-float"
              style={{ animationDuration: "8s", animationDelay: "1s" }} 
            />
            {/* Small accent shape */}
            <div 
              className="absolute top-[55%] right-[30%] w-40 h-40 rounded-3xl bg-gradient-to-bl from-blue-100/35 via-white/20 to-transparent backdrop-blur-lg border border-white/30 -rotate-6 shadow-lg animate-float"
              style={{ animationDuration: "7s", animationDelay: "2s" }} 
            />
            {/* Tiny floating orb */}
            <div 
              className="absolute top-[15%] right-[0%] w-20 h-20 rounded-full bg-gradient-to-r from-white/50 to-white/20 border border-white/30 shadow-md animate-float"
              style={{ animationDuration: "5s", animationDelay: "0.5s" }}
            />
            {/* Extra accent */}
            <div 
              className="absolute top-[70%] right-[20%] w-16 h-16 rounded-full bg-white/30 border border-white/20 animate-float"
              style={{ animationDuration: "9s", animationDelay: "3s" }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 lg:px-16 pt-32 pb-24 relative z-10">
          <div className="max-w-3xl">
            {/* Title */}
            <h1 className="text-white mb-8">
              <span className="block text-6xl md:text-7xl lg:text-[100px] font-light tracking-tight leading-[0.95]">
                {title}
              </span>
              {titleHighlight && (
                <span className="block text-6xl md:text-7xl lg:text-[100px] font-light tracking-tight leading-[0.95]">
                  {titleHighlight}
                </span>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed">
              {subtitle}
            </p>

            {/* CTA Button - Lime/Neon */}
            <CalendlyButton className="inline-flex items-center gap-3 bg-[#d4ff00] hover:bg-[#c4ef00] text-black px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#d4ff00]/30">
              <Calendar className="w-5 h-5" />
              Book a Meeting
            </CalendlyButton>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-28 right-8 flex flex-col items-center gap-2 text-white/50 z-20">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent animate-pulse" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>

        {/* Client Logo Marquee */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/20 py-6 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 md:h-10 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Light Gray */}
      <section className="bg-[#f5f5f5]">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Column - Text */}
          <div className="w-full lg:w-1/2 px-6 lg:px-16 py-20 lg:py-32 flex items-center">
            <div className="max-w-xl scroll-reveal">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 mb-8 tracking-tight">
                About
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                {aboutText}
              </p>
              <CalendlyButton className="inline-flex items-center gap-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:scale-105">
                <Calendar className="w-5 h-5" />
                Book a Meeting
              </CalendlyButton>
            </div>
          </div>

          {/* Right Column - Image/Pattern */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full">
            {aboutImage ? (
              <div className="absolute inset-0">
                <img 
                  src={aboutImage} 
                  alt="Service" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/60 via-[#3b82f6]/40 to-[#0891b2]/60" />
                {/* Open Hours Card */}
                <div className="absolute bottom-8 left-8 right-8 lg:right-auto lg:max-w-xs bg-white/15 backdrop-blur-md rounded-xl px-6 py-5 border border-white/25">
                  <p className="text-white/70 text-sm uppercase tracking-wider mb-1">open hours</p>
                  <p className="text-white font-medium text-lg">Mon-Fri 09:00 — 18:00</p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb] via-[#3b82f6] to-[#0891b2]">
                {/* Abstract pattern overlay */}
                <div className="absolute inset-0 opacity-40">
                  <div className="absolute top-[15%] left-[15%] w-40 h-40 rounded-full border-2 border-white/40" />
                  <div className="absolute top-[35%] left-[45%] w-64 h-64 rounded-full border border-white/25" />
                  <div className="absolute top-[55%] left-[25%] w-28 h-28 rounded-full border-2 border-white/50" />
                  <div className="absolute top-[20%] left-[60%] w-20 h-20 rounded-full bg-white/15" />
                  <div className="absolute top-[65%] left-[55%] w-32 h-32 rounded-full border border-white/30" />
                </div>
                {/* Open Hours Card */}
                <div className="absolute bottom-8 left-8 right-8 lg:right-auto lg:max-w-xs bg-white/15 backdrop-blur-md rounded-xl px-6 py-5 border border-white/25">
                  <p className="text-white/70 text-sm uppercase tracking-wider mb-1">open hours</p>
                  <p className="text-white font-medium text-lg">Mon-Fri 09:00 — 18:00</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What Includes Section */}
      <section className="bg-[#fafafa] py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 scroll-reveal gap-4">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 tracking-tight">
              What
            </h2>
            <div className="flex items-center gap-4">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 tracking-tight">
                Includes
              </h2>
              <div className="flex gap-1.5 ml-2">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span className="w-2 h-2 rounded-full bg-slate-400" />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-b border-dashed border-slate-300 mb-12" />

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Description */}
            <div className="scroll-reveal">
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {whatIncludesText}
              </p>
              <CalendlyButton className="inline-flex items-center text-slate-900 hover:text-[#2563eb] transition-colors group text-lg">
                <span className="text-slate-400 mr-2">[</span>
                <span className="font-medium">book a meeting</span>
                <span className="text-slate-400 ml-2">]</span>
              </CalendlyButton>
            </div>

            {/* Right - Process Steps */}
            <div className="space-y-0">
              {processSteps.map((step, index) => (
                <div
                  key={step.number}
                  className="scroll-reveal"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-start py-8 gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-slate-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-slate-500 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    <span className="text-slate-400 font-light text-sm whitespace-nowrap flex-shrink-0">
                      [ {step.number} ]
                    </span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="border-b border-dashed border-slate-300" />
                  )}
                </div>
              ))}
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
