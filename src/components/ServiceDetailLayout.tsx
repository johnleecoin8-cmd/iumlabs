import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowDown, ArrowRight } from "lucide-react";
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
      <div className="min-h-screen bg-[#0A0A0B] rounded-xl sm:rounded-2xl overflow-hidden">
        <Navbar />

      {/* Hero Section - Dark Theme with Green Accents */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background - Service-Specific Image */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-kenburns"
            style={{ 
              backgroundImage: `url(${themeConfig.backgroundImage})`,
              filter: "brightness(0.4) saturate(1.1)",
            }}
          />
          
          {/* Green/Emerald gradient overlay - Unified */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/15 via-transparent to-teal-500/10" />
          
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
        </div>


        {/* Content */}
        <div className="container mx-auto px-6 lg:px-16 pt-32 pb-24 relative z-10">
          <div className="max-w-3xl">
            {/* Glass pill tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] backdrop-blur-md rounded-full border border-white/[0.1] text-sm text-white/70 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Service Detail
            </div>

            {/* Title */}
            <h1 className="text-white mb-8">
              <span className="block text-5xl md:text-6xl lg:text-[80px] font-bold tracking-tight leading-[0.95]">
                {title}
              </span>
              {titleHighlight && (
                <span className="block text-5xl md:text-6xl lg:text-[80px] font-bold tracking-tight leading-[0.95] bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  {titleHighlight}
                </span>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed">
              {subtitle}
            </p>

            {/* CTA Button - Green Accent */}
            <CalendlyButton 
              className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400"
              style={{ 
                boxShadow: `0 15px 50px rgba(16, 185, 129, 0.3)`,
              }}
            >
              <Calendar className="w-5 h-5" />
              Book a Meeting
            </CalendlyButton>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-28 right-8 flex flex-col items-center gap-2 text-white/50 z-20">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-emerald-400/40 to-transparent animate-pulse" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>

        {/* Client Logo Marquee - Glass Style */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/[0.04] backdrop-blur-xl border-t border-white/[0.08] py-6 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10" />
          <div className="flex animate-marquee whitespace-nowrap">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-4 px-6 py-3 bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/[0.08] hover:bg-white/[0.08] hover:border-emerald-400/20 transition-all duration-300"
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

      {/* About Section - Dark Theme */}
      <section className="bg-[#0A0A0B] border-t border-white/[0.08]">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Column - Text */}
          <div className="w-full lg:w-1/2 px-6 lg:px-16 py-20 lg:py-32 flex items-center">
            <div className="max-w-xl scroll-reveal">
              {/* Option B Header */}
              <div className="relative mb-8">
                <span className="absolute -top-6 left-0 text-[100px] md:text-[140px] font-black text-white/[0.03] leading-none pointer-events-none select-none">
                  01
                </span>
                <h2 className="relative text-4xl md:text-5xl font-bold tracking-tight">
                  <span className="text-white/50">About</span>{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    This Service
                  </span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mt-4" />
              </div>
              
              <p className="text-white/60 text-lg leading-relaxed mb-10">
                {aboutText}
              </p>
              <CalendlyButton 
                className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400"
              >
                <Calendar className="w-5 h-5" />
                Book a Meeting
              </CalendlyButton>
            </div>
          </div>

          {/* Right Column - Image/Pattern */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full overflow-hidden rounded-tl-3xl rounded-bl-3xl">
            {aboutImage ? (
              <div className="absolute inset-0">
                <img 
                  src={aboutImage} 
                  alt="Service" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/60 via-teal-500/50 to-cyan-600/40" />
                {/* Open Hours Card - Glass Style */}
                <div className="absolute bottom-8 left-8 right-8 lg:right-auto lg:max-w-xs bg-white/[0.08] backdrop-blur-xl rounded-2xl px-6 py-5 border border-white/[0.15] shadow-2xl">
                  <p className="text-white/60 text-sm uppercase tracking-wider mb-1">open hours</p>
                  <p className="text-white font-medium text-lg">Mon-Fri 09:00 — 18:00</p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-600">
                {/* Abstract pattern overlay */}
                <div className="absolute inset-0 opacity-40">
                  <div className="absolute top-[15%] left-[15%] w-40 h-40 rounded-full border-2 border-white/40" />
                  <div className="absolute top-[35%] left-[45%] w-64 h-64 rounded-full border border-white/25" />
                  <div className="absolute top-[55%] left-[25%] w-28 h-28 rounded-full border-2 border-white/50" />
                  <div className="absolute top-[20%] left-[60%] w-20 h-20 rounded-full bg-white/15" />
                  <div className="absolute top-[65%] left-[55%] w-32 h-32 rounded-full border border-white/30" />
                </div>
                {/* Open Hours Card */}
                <div className="absolute bottom-8 left-8 right-8 lg:right-auto lg:max-w-xs bg-white/[0.12] backdrop-blur-xl rounded-2xl px-6 py-5 border border-white/[0.2] shadow-2xl">
                  <p className="text-white/70 text-sm uppercase tracking-wider mb-1">open hours</p>
                  <p className="text-white font-medium text-lg">Mon-Fri 09:00 — 18:00</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What Includes Section - Dark Theme */}
      <section className="bg-[#0A0A0B] py-20 lg:py-32 border-t border-white/[0.08]">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Header - Option B Style */}
          <div className="relative mb-16 scroll-reveal">
            <span className="absolute -top-8 md:-top-10 left-0 text-[100px] md:text-[160px] font-black text-white/[0.03] leading-none pointer-events-none select-none">
              02
            </span>
            <div className="relative">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-white/50">What</span>{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Includes
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mt-4" />
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Description */}
            <div className="scroll-reveal">
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                {whatIncludesText}
              </p>
              <CalendlyButton 
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group text-lg"
              >
                <span className="text-white/30">[</span>
                <span className="font-medium">book a meeting</span>
                <span className="text-white/30">]</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </CalendlyButton>
            </div>

            {/* Right - Process Steps */}
            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <div
                  key={step.number}
                  className="scroll-reveal bg-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.08] hover:border-emerald-400/20 hover:bg-white/[0.04] transition-all duration-300 group"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-start gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-white mb-3 group-hover:text-emerald-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-white/50 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    <span className="text-sm whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 text-emerald-400 font-medium">
                      {step.number}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Watch Also Section - Dark Theme */}
      <section className="bg-[#0A0A0B] py-20 lg:py-32 border-t border-white/[0.08]">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Header - Option B Style */}
          <div className="relative mb-12 scroll-reveal">
            <span className="absolute -top-8 md:-top-10 left-0 text-[100px] md:text-[160px] font-black text-white/[0.03] leading-none pointer-events-none select-none">
              03
            </span>
            <div className="relative flex justify-between items-end">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="text-white/50">Watch</span>{" "}
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    Also
                  </span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mt-4" />
              </div>
              <ArrowDown className="w-8 h-8 text-white/30 hidden md:block" />
            </div>
          </div>

          {/* Service Links - Glass Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {otherServices.map((service, index) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="block scroll-reveal group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-6 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/[0.08] hover:border-emerald-400/30 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10">
                <span className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 mb-4">
                  {service.number}
                </span>
                <h3 className="text-xl md:text-2xl font-medium text-white group-hover:text-emerald-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <div className="flex items-center gap-2 text-white/40 group-hover:text-emerald-400 mt-4 text-sm transition-colors">
                  View service
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
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
