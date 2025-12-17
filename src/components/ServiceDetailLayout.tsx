import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowDown } from "lucide-react";
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

interface ThemeConfig {
  backgroundImage: string;
  auroraColors: {
    primary: string;
    secondary: string;
    tertiary?: string;
  };
  accentColor: string;
  accentColorHover: string;
  floatingTags: Array<{
    label: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  }>;
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
  currentServiceSlug: string;
  themeConfig: ThemeConfig;
}

const allServices = [
  { slug: "community", title: "Community Management", number: "01" },
  { slug: "social-media", title: "Social Media Marketing", number: "02" },
  { slug: "influencer", title: "Influencer Strategy", number: "03" },
  { slug: "gtm", title: "GTM Strategy", number: "04" },
  { slug: "yap", title: "Yap Strategy", number: "05" },
  { slug: "pr", title: "PR & Media", number: "06" },
];

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
  currentServiceSlug,
  themeConfig,
}: ServiceDetailLayoutProps) => {
  // Filter out current service and get top 3
  const otherServices = allServices
    .filter((service) => service.slug !== currentServiceSlug)
    .slice(0, 3);

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
    <div className="min-h-screen bg-[#0A0A0A] p-0.5 sm:p-1 md:p-2">
      <div className="min-h-screen bg-[#0A0A0A] rounded-xl sm:rounded-2xl overflow-hidden">
        <Navbar />

      {/* Hero Section - Service-Specific Theme */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background - Service-Specific Image */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-kenburns"
            style={{ 
              backgroundImage: `url(${themeConfig.backgroundImage})`,
              filter: "brightness(0.5) saturate(1.1)",
            }}
          />
          
          {/* Aurora light overlay - Service-Specific Colors */}
          <div className="absolute inset-0 animate-aurora">
            <div className={`absolute inset-0 bg-gradient-to-tr ${themeConfig.auroraColors.primary} via-transparent ${themeConfig.auroraColors.secondary}`} />
            {themeConfig.auroraColors.tertiary && (
              <div className={`absolute inset-0 bg-gradient-to-bl ${themeConfig.auroraColors.tertiary} via-transparent to-transparent`} />
            )}
          </div>
          
          {/* Twinkling stars effect */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                  opacity: 0.2 + Math.random() * 0.5,
                }}
              />
            ))}
          </div>
          
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.9)]" />
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

            {/* CTA Button - Service Accent Color */}
            <CalendlyButton 
              className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ 
                backgroundColor: themeConfig.accentColor,
                boxShadow: `0 10px 40px ${themeConfig.accentColor}40`,
              }}
            >
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

      {/* About Section */}
      <section className="bg-[#0A0A0A]">
        <div className="border-t border-white/10">
          {/* Section Header */}
          <div className="flex items-baseline justify-between px-6 md:px-10 py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">01</span>
              <h2 className="text-lg md:text-xl font-medium text-white">About</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Overview</span>
          </div>
          
          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column - Text */}
            <div className="px-6 lg:px-10 py-12 lg:py-16 flex items-center border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="max-w-xl scroll-reveal">
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  {aboutText}
                </p>
                <CalendlyButton 
                  className="inline-flex items-center gap-3 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: themeConfig.accentColor }}
                >
                  <Calendar className="w-5 h-5" />
                  Book a Meeting
                </CalendlyButton>
              </div>
            </div>

            {/* Right Column - Image/Info */}
            <div className="relative min-h-[300px] lg:min-h-[400px]">
              {aboutImage ? (
                <div className="absolute inset-0">
                  <img 
                    src={aboutImage} 
                    alt="Service" 
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${themeConfig.accentColor}80 0%, ${themeConfig.accentColorHover}60 100%)`,
                    }}
                  />
                  <div className="absolute bottom-6 left-6 right-6 lg:right-auto lg:max-w-xs bg-black/40 backdrop-blur-md rounded-lg px-5 py-4 border border-white/20">
                    <p className="text-white/70 text-xs uppercase tracking-wider mb-1">open hours</p>
                    <p className="text-white font-medium">Mon-Fri 09:00 — 18:00</p>
                  </div>
                </div>
              ) : (
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.accentColor} 0%, ${themeConfig.accentColorHover} 100%)`,
                  }}
                >
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-[15%] left-[15%] w-32 h-32 rounded-full border-2 border-white/40" />
                    <div className="absolute top-[35%] left-[45%] w-48 h-48 rounded-full border border-white/25" />
                    <div className="absolute top-[55%] left-[25%] w-20 h-20 rounded-full border-2 border-white/50" />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 lg:right-auto lg:max-w-xs bg-black/40 backdrop-blur-md rounded-lg px-5 py-4 border border-white/20">
                    <p className="text-white/70 text-xs uppercase tracking-wider mb-1">open hours</p>
                    <p className="text-white font-medium">Mon-Fri 09:00 — 18:00</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-[#0A0A0A]">
        <div className="border-t border-white/10">
          {/* Section Header */}
          <div className="flex items-baseline justify-between px-6 md:px-10 py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">02</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Process</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">What's Included</span>
          </div>
          
          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left - Description */}
            <div className="px-6 lg:px-10 py-12 lg:py-16 border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="scroll-reveal">
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  {whatIncludesText}
                </p>
                <CalendlyButton 
                  className="inline-flex items-center transition-colors group text-lg"
                  style={{ color: themeConfig.accentColor }}
                >
                  <span className="text-white/40 mr-2">[</span>
                  <span className="font-medium">book a meeting</span>
                  <span className="text-white/40 ml-2">]</span>
                </CalendlyButton>
              </div>
            </div>

            {/* Right - Process Steps */}
            <div className="px-6 lg:px-10 py-12 lg:py-16">
              <div className="space-y-0">
                {processSteps.map((step, index) => (
                  <div
                    key={step.number}
                    className="scroll-reveal"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-start py-6 gap-6">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-white/50 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      <span 
                        className="text-xs whitespace-nowrap flex-shrink-0 px-3 py-1 rounded-full text-white font-medium"
                        style={{ backgroundColor: themeConfig.accentColor }}
                      >
                        {step.number}
                      </span>
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="border-b border-white/10" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Services Section */}
      <section className="bg-[#0A0A0A]">
        <div className="border-t border-white/10">
          {/* Section Header */}
          <div className="flex items-baseline justify-between px-6 md:px-10 py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">03</span>
              <h2 className="text-lg md:text-xl font-medium text-white">More Services</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Explore</span>
          </div>
          
          {/* Service Links */}
          <div className="px-6 lg:px-10">
            {otherServices.map((service, index) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="block scroll-reveal"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="py-6 border-b border-white/10 flex justify-between items-center group cursor-pointer hover:bg-white/[0.02] transition-all duration-300 px-4 -mx-4 rounded-lg">
                  <div className="flex items-center gap-6">
                    <span className="text-white/30 text-xs font-mono">{service.number}</span>
                    <h3 className="text-xl md:text-2xl font-medium text-white transition-colors duration-300 group-hover:text-white/80">
                      {service.title}
                    </h3>
                  </div>
                  <span 
                    className="text-sm transition-colors duration-300"
                    style={{ color: themeConfig.accentColor }}
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
      </div>
    </div>
  );
};

export default ServiceDetailLayout;
