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
    <div className="min-h-screen bg-white p-0.5 sm:p-1 md:p-2">
      <div className="min-h-screen bg-background rounded-xl sm:rounded-2xl overflow-hidden">
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

        {/* Floating Tags - lunar-tag-dark style */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          {themeConfig.floatingTags.map((tag, index) => (
            <div
              key={tag.label}
              className="absolute lunar-tag-dark text-xs whitespace-nowrap animate-float pointer-events-auto"
              style={{
                top: tag.top,
                left: tag.left,
                right: tag.right,
                bottom: tag.bottom,
                animationDelay: `${index * 0.5}s`,
                animationDuration: `${4 + index * 0.5}s`,
              }}
            >
              {tag.label}
            </div>
          ))}
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
              <CalendlyButton 
                className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: themeConfig.accentColor }}
              >
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
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.accentColor}99 0%, ${themeConfig.accentColorHover}80 50%, ${themeConfig.accentColor}70 100%)`,
                  }}
                />
                {/* Open Hours Card */}
                <div className="absolute bottom-8 left-8 right-8 lg:right-auto lg:max-w-xs bg-white/15 backdrop-blur-md rounded-xl px-6 py-5 border border-white/25">
                  <p className="text-white/70 text-sm uppercase tracking-wider mb-1">open hours</p>
                  <p className="text-white font-medium text-lg">Mon-Fri 09:00 — 18:00</p>
                </div>
              </div>
            ) : (
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.accentColor} 0%, ${themeConfig.accentColorHover} 100%)`,
                }}
              >
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
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeConfig.accentColor }} />
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeConfig.accentColor }} />
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeConfig.accentColor }} />
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
              <CalendlyButton 
                className="inline-flex items-center transition-colors group text-lg"
                style={{ color: themeConfig.accentColor }}
              >
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
                    <span 
                      className="text-sm whitespace-nowrap flex-shrink-0 px-3 py-1 rounded-full text-white font-medium"
                      style={{ backgroundColor: themeConfig.accentColor }}
                    >
                      {step.number}
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

      {/* Watch Also Section */}
      <section className="bg-white py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 scroll-reveal">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 tracking-tight">
              Watch
            </h2>
            <div className="flex items-center gap-4">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 tracking-tight">
                Also
              </h2>
              <ArrowDown className="w-8 h-8 text-slate-400" />
            </div>
          </div>

          {/* Divider */}
          <div className="border-b border-dashed border-slate-300 mb-4" />

          {/* Service Links */}
          {otherServices.map((service, index) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="block scroll-reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="py-8 border-b border-dashed border-slate-300 flex justify-between items-center group cursor-pointer hover:bg-slate-50 transition-colors duration-300 px-4 -mx-4 rounded-lg">
                {index % 2 === 0 ? (
                  <>
                    <h3 
                      className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 transition-colors duration-300 group-hover:translate-x-2 transform"
                      style={{ color: undefined }}
                      onMouseEnter={(e) => e.currentTarget.style.color = themeConfig.accentColor}
                      onMouseLeave={(e) => e.currentTarget.style.color = ''}
                    >
                      {service.title}
                    </h3>
                    <span 
                      className="text-slate-400 text-2xl md:text-3xl font-light transition-colors duration-300"
                      onMouseEnter={(e) => e.currentTarget.style.color = themeConfig.accentColor}
                      onMouseLeave={(e) => e.currentTarget.style.color = ''}
                    >
                      {service.number}
                    </span>
                  </>
                ) : (
                  <>
                    <span 
                      className="text-slate-400 text-2xl md:text-3xl font-light transition-colors duration-300"
                      onMouseEnter={(e) => e.currentTarget.style.color = themeConfig.accentColor}
                      onMouseLeave={(e) => e.currentTarget.style.color = ''}
                    >
                      {service.number}
                    </span>
                    <h3 
                      className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 transition-colors duration-300 group-hover:-translate-x-2 transform text-right"
                      onMouseEnter={(e) => e.currentTarget.style.color = themeConfig.accentColor}
                      onMouseLeave={(e) => e.currentTarget.style.color = ''}
                    >
                      {service.title}
                    </h3>
                  </>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
      </div>
    </div>
  );
};

export default ServiceDetailLayout;
