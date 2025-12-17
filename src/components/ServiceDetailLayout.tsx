import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Users, AtSign, Mic2, Compass, MessageCircle, Newspaper, Search, Target, Rocket, TrendingUp, LucideIcon } from "lucide-react";
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

interface Stat {
  value: string;
  label: string;
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
  stats?: Stat[];
}

const allServices = [
  { slug: "community", title: "Community Management", number: "01", icon: Users, description: "Complete Discord community infrastructure to build sticky, scalable and self-sustaining growth.", color: "#3B82F6" },
  { slug: "social-media", title: "Social Media Marketing", number: "02", icon: AtSign, description: "Content strategy and execution on X to grow visibility and engage with your ecosystem.", color: "#EC4899" },
  { slug: "influencer", title: "Influencer Strategy", number: "03", icon: Mic2, description: "Influencer campaigns powered by top crypto voices aligned with your message and goals.", color: "#F59E0B" },
  { slug: "gtm", title: "GTM Strategy", number: "04", icon: Compass, description: "Positioning, messaging, and audience clarity to launch with direction and narrative focus.", color: "#10B981" },
  { slug: "yap", title: "Yap Strategy", number: "05", icon: MessageCircle, description: "Targeted campaigns through a 600+ creator network designed to drive awareness.", color: "#22D3EE" },
  { slug: "pr", title: "PR & Media", number: "06", icon: Newspaper, description: "Narrative development and media placements to get your story published and seen.", color: "#8B5CF6" },
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

// Default stats
const defaultStats: Stat[] = [
  { value: "120+", label: "KOL Network" },
  { value: "18+", label: "Projects Launched" },
];

const ServiceDetailLayout = ({
  title,
  titleHighlight,
  subtitle,
  aboutText,
  processSteps,
  aboutImage,
  currentServiceSlug,
  themeConfig,
  stats = defaultStats,
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
      <div className="min-h-screen bg-[#0A0A0A] rounded-xl sm:rounded-2xl overflow-hidden relative">
        {/* Persistent Ambient Glow */}
        <div 
          className="fixed top-0 left-0 w-[50vw] h-[50vh] pointer-events-none z-0 opacity-15"
          style={{ background: `radial-gradient(ellipse at 0% 0%, ${themeConfig.accentColor} 0%, transparent 60%)` }}
        />
        <div 
          className="fixed bottom-0 right-0 w-[40vw] h-[40vh] pointer-events-none z-0 opacity-10"
          style={{ background: `radial-gradient(ellipse at 100% 100%, ${themeConfig.accentColor} 0%, transparent 60%)` }}
        />
        
        <Navbar />

        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-[-5%] bg-cover bg-center bg-no-repeat animate-kenburns"
              style={{ 
                backgroundImage: `url(${themeConfig.backgroundImage})`,
                filter: "brightness(0.35) saturate(1.2)",
              }}
            />
            {/* Color Tint Overlay */}
            <div 
              className="absolute inset-0 mix-blend-overlay opacity-25"
              style={{ backgroundColor: themeConfig.accentColor }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]" />
            {/* Stronger Accent Color Glow */}
            <div 
              className="absolute inset-0"
              style={{ 
                background: `radial-gradient(ellipse at 20% 40%, ${themeConfig.accentColor}40, transparent 50%), radial-gradient(ellipse at 80% 60%, ${themeConfig.accentColor}20, transparent 50%)` 
              }}
            />
            {/* Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(${themeConfig.accentColor} 1px, transparent 1px),
                  linear-gradient(90deg, ${themeConfig.accentColor} 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px'
              }}
            />
          </div>

          {/* Floating Tags */}
          {themeConfig.floatingTags.map((tag, index) => (
            <motion.span
              key={tag.label}
              className="absolute px-3 py-1.5 text-xs border rounded-full backdrop-blur-sm z-10 hidden md:block"
              style={{ 
                top: tag.top, 
                left: tag.left, 
                right: tag.right,
                borderColor: `${themeConfig.accentColor}40`,
                color: themeConfig.accentColor,
                backgroundColor: `${themeConfig.accentColor}10`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{ 
                opacity: { duration: 0.5, delay: index * 0.1 },
                y: { duration: 3, repeat: Infinity, delay: index * 0.5 }
              }}
            >
              {tag.label}
            </motion.span>
          ))}

          {/* Content */}
          <div className="container mx-auto px-6 lg:px-16 pt-32 pb-16 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-white mb-6">
                <span className="block text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[0.95]">
                  {title}
                </span>
                {titleHighlight && (
                  <span 
                    className="block text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[0.95]"
                    style={{ color: themeConfig.accentColor }}
                  >
                    {titleHighlight}
                  </span>
                )}
              </h1>

              <p className="text-white/70 text-lg max-w-xl mb-8 font-light leading-relaxed">
                {subtitle}
              </p>

              <CalendlyButton 
                className="inline-flex items-center gap-3 px-6 py-3 font-medium text-sm transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: themeConfig.accentColor,
                  color: '#fff',
                }}
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

        {/* About Section */}
        <section 
          className="relative"
          style={{ 
            background: `linear-gradient(to bottom, #0A0A0A, ${themeConfig.accentColor}10, #0A0A0A)` 
          }}
        >
          {/* Colored Top Border */}
          <div 
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(to right, transparent, ${themeConfig.accentColor}60, transparent)` }}
          />
          
          <div className="border-t border-transparent">
            {/* Section Header */}
            <div 
              className="flex items-baseline justify-between px-6 md:px-10 py-6"
              style={{ borderBottom: `1px solid ${themeConfig.accentColor}20` }}
            >
              <div className="flex items-baseline gap-6 md:gap-10">
                <span 
                  className="text-[10px] md:text-xs font-mono tracking-widest"
                  style={{ color: themeConfig.accentColor }}
                >01</span>
                <h2 className="text-lg md:text-xl font-medium text-white">About</h2>
              </div>
              <span 
                className="text-xs tracking-wider hidden sm:block px-3 py-1 rounded-full"
                style={{ 
                  borderWidth: 1,
                  borderColor: `${themeConfig.accentColor}50`,
                  color: themeConfig.accentColor,
                  backgroundColor: `${themeConfig.accentColor}10`,
                }}
              >
                Overview
              </span>
            </div>
            
            {/* Content */}
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
                    {stats.map((stat, index) => (
                      <div key={index}>
                        <p 
                          className="text-3xl font-bold"
                          style={{ color: themeConfig.accentColor }}
                        >
                          {stat.value}
                        </p>
                        <p className="text-white/50 text-sm">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <CalendlyButton 
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{ 
                      backgroundColor: themeConfig.accentColor,
                      color: '#fff',
                    }}
                  >
                    BOOK A MEETING
                    <ArrowRight className="w-4 h-4" />
                  </CalendlyButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-[#0A0A0A] relative overflow-hidden">
          {/* Background Glow */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] opacity-[0.03] pointer-events-none"
            style={{ background: `radial-gradient(ellipse at center, ${themeConfig.accentColor} 0%, transparent 70%)` }}
          />
          
          {/* Colored Top Border */}
          <div 
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(to right, transparent, ${themeConfig.accentColor}40, transparent)` }}
          />
          
          <div className="border-t border-transparent relative z-10">
            {/* Section Header */}
            <div 
              className="flex items-baseline justify-between px-6 md:px-10 py-6"
              style={{ borderBottom: `1px solid ${themeConfig.accentColor}20` }}
            >
              <div className="flex items-baseline gap-6 md:gap-10">
                <span 
                  className="text-[10px] md:text-xs font-mono tracking-widest"
                  style={{ color: themeConfig.accentColor }}
                >02</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Process</h2>
              </div>
              <span 
                className="text-xs tracking-wider hidden sm:block px-3 py-1 rounded-full"
                style={{ 
                  borderWidth: 1,
                  borderColor: `${themeConfig.accentColor}50`,
                  color: themeConfig.accentColor,
                  backgroundColor: `${themeConfig.accentColor}10`,
                }}
              >
                What's Included
              </span>
            </div>
            
            {/* 4-Column Grid */}
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
                    className={`group p-8 md:p-10 transition-all duration-300 relative overflow-hidden ${
                      !isLast ? "lg:border-r" : ""
                    } ${isOdd ? "md:border-l lg:border-l-0" : ""} ${
                      index < 2 ? "border-b lg:border-b-0" : ""
                    }`}
                    style={{ 
                      borderColor: `${themeConfig.accentColor}15`,
                    }}
                  >
                    {/* Hover Background */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: `${themeConfig.accentColor}08` }}
                    />
                    
                    {/* Step Number Watermark */}
                    <span 
                      className="absolute top-4 right-4 text-5xl font-bold opacity-[0.05] group-hover:opacity-[0.1] transition-opacity"
                      style={{ color: themeConfig.accentColor }}
                    >
                      {step.number}
                    </span>
                    
                    <div className="relative z-10">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                        style={{ 
                          backgroundColor: `${themeConfig.accentColor}15`,
                          border: `1px solid ${themeConfig.accentColor}30`,
                        }}
                      >
                        <Icon 
                          className="w-6 h-6 transition-all duration-300 group-hover:scale-110"
                          style={{ color: themeConfig.accentColor }}
                          strokeWidth={1.5} 
                        />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-white mb-3 group-hover:translate-x-1 transition-transform">
                        {step.title}
                      </h3>
                      
                      <p className="text-white/50 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* More Services Section */}
        <section className="bg-[#0A0A0A] relative">
          {/* Top Border */}
          <div 
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(to right, transparent, ${themeConfig.accentColor}30, transparent)` }}
          />
          
          <div className="border-t border-transparent">
            {/* Section Header */}
            <div 
              className="flex items-baseline justify-between px-6 md:px-10 py-6"
              style={{ borderBottom: `1px solid ${themeConfig.accentColor}15` }}
            >
              <div className="flex items-baseline gap-6 md:gap-10">
                <span 
                  className="text-[10px] md:text-xs font-mono tracking-widest"
                  style={{ color: themeConfig.accentColor }}
                >03</span>
                <h2 className="text-lg md:text-xl font-medium text-white">More Services</h2>
              </div>
              <span 
                className="text-xs tracking-wider hidden sm:block px-3 py-1 rounded-full"
                style={{ 
                  border: `1px solid ${themeConfig.accentColor}40`,
                  color: themeConfig.accentColor,
                }}
              >
                Explore
              </span>
            </div>
            
            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {otherServices.map((service, index) => {
                const Icon = service.icon;
                const isLastRow = index >= otherServices.length - 2;
                const isRightColumn = index % 2 === 1;
                const serviceColor = service.color;
                
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
                      className={`group block p-8 md:p-10 transition-all duration-300 relative overflow-hidden ${
                        !isRightColumn ? "md:border-r" : ""
                      } ${!isLastRow ? "border-b" : ""}`}
                      style={{ 
                        borderColor: `${themeConfig.accentColor}15`,
                      }}
                    >
                      {/* Hover Background with Service Color */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ backgroundColor: `${serviceColor}08` }}
                      />
                      
                      {/* Corner Accent on Hover */}
                      <div 
                        className="absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-300"
                        style={{ backgroundColor: serviceColor }}
                      />
                      
                      <div className="relative z-10">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                          style={{ 
                            backgroundColor: `${serviceColor}10`,
                            border: `1px solid ${serviceColor}20`,
                          }}
                        >
                          <Icon 
                            className="w-6 h-6 transition-all duration-300 group-hover:scale-110"
                            style={{ color: serviceColor }}
                            strokeWidth={1.5} 
                          />
                        </div>
                        <h3 
                          className="text-xl font-semibold text-white mb-3 group-hover:translate-x-1 transition-all duration-300"
                          style={{ '--service-color': serviceColor } as React.CSSProperties}
                        >
                          {service.title}
                        </h3>
                        <p className="text-white/50 text-sm leading-relaxed mb-6">
                          {service.description}
                        </p>
                        <div 
                          className="flex items-center gap-2 text-sm transition-colors"
                          style={{ color: serviceColor }}
                        >
                          Learn more
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
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
