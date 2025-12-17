import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ArrowDown, Users, AtSign, Mic2, Compass, MessageCircle, Newspaper, Search, Target, Rocket, TrendingUp, LucideIcon } from "lucide-react";
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
  icon?: LucideIcon;
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
  { slug: "community", title: "Community Management", number: "01", icon: Users, description: "Complete Discord community infrastructure to build sticky, scalable and self-sustaining growth." },
  { slug: "social-media", title: "Social Media Marketing", number: "02", icon: AtSign, description: "Content strategy and execution on X to grow visibility and engage with your ecosystem." },
  { slug: "influencer", title: "Influencer Strategy", number: "03", icon: Mic2, description: "Influencer campaigns powered by top crypto voices aligned with your message and goals." },
  { slug: "gtm", title: "GTM Strategy", number: "04", icon: Compass, description: "Positioning, messaging, and audience clarity to launch with direction and narrative focus." },
  { slug: "yap", title: "Yap Strategy", number: "05", icon: MessageCircle, description: "Targeted campaigns through a 600+ creator network designed to drive awareness." },
  { slug: "pr", title: "PR & Media", number: "06", icon: Newspaper, description: "Narrative development and media placements to get your story published and seen." },
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

// Default icons for process steps
const defaultProcessIcons = [Search, Target, Rocket, TrendingUp];

const ServiceDetailLayout = ({
  title,
  titleHighlight,
  subtitle,
  aboutText,
  processSteps,
  aboutImage,
  currentServiceSlug,
  themeConfig,
}: ServiceDetailLayoutProps) => {
  // Filter out current service
  const otherServices = allServices.filter((service) => service.slug !== currentServiceSlug);

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

        {/* Hero Section - Simplified */}
        <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden">
          {/* Background - Simple Image with Dark Overlay */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${themeConfig.backgroundImage})`,
                filter: "brightness(0.4)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/50 via-transparent to-[#0A0A0A]" />
          </div>

          {/* Content */}
          <div className="container mx-auto px-6 lg:px-16 pt-32 pb-16 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-white mb-6">
                <span className="block text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[0.95]">
                  {title}
                </span>
                {titleHighlight && (
                  <span className="block text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[0.95]">
                    {titleHighlight}
                  </span>
                )}
              </h1>

              <p className="text-white/70 text-lg max-w-xl mb-8 font-light leading-relaxed">
                {subtitle}
              </p>

              <CalendlyButton 
                className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 font-medium text-sm transition-all duration-300 hover:bg-white/90"
              >
                <Calendar className="w-4 h-4" />
                Book a Meeting
              </CalendlyButton>
            </div>
          </div>

          {/* Client Logo Marquee */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-sm border-t border-white/10 py-5 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-6 md:h-8 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section - 50/50 Image + Content */}
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
            
            {/* Content - WhyChooseUsSection Style */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left - Image */}
              <div className="relative min-h-[300px] lg:min-h-[450px] lg:border-r border-white/10">
                {aboutImage ? (
                  <img 
                    src={aboutImage} 
                    alt="Service" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${themeConfig.backgroundImage})`,
                      filter: "brightness(0.6)",
                    }}
                  />
                )}
              </div>

              {/* Right - Content + Stats + CTA */}
              <div className="flex flex-col">
                <div className="p-8 md:p-12 flex-1 border-b border-white/10">
                  <p className="text-white/60 text-lg leading-relaxed">
                    {aboutText}
                  </p>
                </div>
                <div className="p-8 md:p-12">
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <p className="text-3xl font-bold text-white">120+</p>
                      <p className="text-white/50 text-sm">KOL Network</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">18+</p>
                      <p className="text-white/50 text-sm">Projects Launched</p>
                    </div>
                  </div>
                  <CalendlyButton 
                    className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors"
                  >
                    BOOK A MEETING
                    <ArrowRight className="w-4 h-4" />
                  </CalendlyButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section - 4-Column Grid */}
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
            
            {/* 4-Column Grid - ProcessSection Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => {
                const Icon = step.icon || defaultProcessIcons[index % defaultProcessIcons.length];
                const isLast = index === processSteps.length - 1;
                const isOdd = index % 2 === 1;
                
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className={`group p-8 md:p-10 transition-all duration-300 hover:bg-white/5 ${
                      !isLast ? "lg:border-r border-white/10" : ""
                    } ${isOdd ? "md:border-l lg:border-l-0 border-white/10" : ""} ${
                      index < 2 ? "border-b lg:border-b-0 border-white/10" : ""
                    }`}
                  >
                    <Icon className="w-8 h-8 mb-4 text-white/40 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300" strokeWidth={1.5} />
                    
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {step.title}
                    </h3>
                    
                    <p className="text-white/50 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* More Services Section - 2x3 Card Grid */}
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
            
            {/* Services Grid - ServicesSection Style */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {otherServices.map((service, index) => {
                const Icon = service.icon;
                const isLastRow = index >= otherServices.length - 2;
                const isRightColumn = index % 2 === 1;
                
                return (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <Link
                      to={`/services/${service.slug}`}
                      className={`group block p-8 md:p-10 transition-all duration-300 hover:bg-white/5 hover:shadow-lg hover:shadow-white/5 ${
                        !isRightColumn ? "md:border-r border-white/10" : ""
                      } ${!isLastRow ? "border-b border-white/10" : ""}`}
                    >
                      <Icon className="w-10 h-10 mb-6 text-white/40 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300" strokeWidth={1.5} />
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {service.title}
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors text-sm">
                        Learn more
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
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
