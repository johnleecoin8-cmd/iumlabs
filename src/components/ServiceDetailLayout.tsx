import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, ArrowLeft, ArrowRight, Sparkles, Rocket, Users, Globe, Megaphone, TrendingUp, FileText } from "lucide-react";
import { motion } from "framer-motion";
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
  { slug: "community", title: "Community Management", number: "01", icon: Users },
  { slug: "social-media", title: "Social Media Marketing", number: "02", icon: Globe },
  { slug: "influencer", title: "Influencer Strategy", number: "03", icon: Megaphone },
  { slug: "gtm-strategy", title: "GTM Strategy", number: "04", icon: Rocket },
  { slug: "yap", title: "Yap Strategy", number: "05", icon: TrendingUp },
  { slug: "pr", title: "PR & Media", number: "06", icon: FileText },
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
  const navigate = useNavigate();
  
  // Filter out current service and get others
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
    <div className="min-h-screen bg-[#0A0A0B]">
      <Navbar />

      {/* Hero Section - Minimal a41 Style */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${themeConfig.backgroundImage})`,
              filter: "brightness(0.25)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-transparent to-[#0A0A0B]" />
        </div>

        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/services')}
          className="absolute top-28 left-6 z-30 flex items-center gap-2 px-4 py-2.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </motion.button>

        {/* Content */}
        <div className="relative z-10 w-full pb-20 pt-48">
          <div className="container mx-auto px-6 lg:px-16">
            {/* Service badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-sm font-mono text-gray-500">/ SERVICE</span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="max-w-4xl mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="block text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[0.95]">
                {title}
              </span>
              {titleHighlight && (
                <span className="block text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-500 leading-[0.95]">
                  {titleHighlight}
                </span>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="max-w-2xl text-lg md:text-xl text-white/40 font-light leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {subtitle}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <CalendlyButton 
                className="group inline-flex items-center gap-3 px-6 py-3 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                <Calendar className="w-4 h-4" />
                Book a Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </CalendlyButton>
            </motion.div>
          </div>

          {/* Client logos bar */}
          <div className="mt-16 border-t border-white/[0.08] pt-6">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="flex items-center gap-8 overflow-x-auto pb-2 scrollbar-hide">
                <span className="text-white/30 text-xs font-mono whitespace-nowrap">TRUSTED BY</span>
                {clientLogos.slice(0, 6).map((logo, index) => (
                  <img
                    key={index}
                    src={logo.src}
                    alt={logo.alt}
                    className="h-5 w-auto object-contain brightness-0 invert opacity-30 hover:opacity-60 transition-opacity flex-shrink-0"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Clean 2-Column */}
      <section className="bg-[#0A0A0B] py-20 md:py-28 border-t border-white/[0.08]">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - About */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-mono text-gray-500 mb-4 block">/ ABOUT</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                What we <span className="text-gray-500">do</span>
              </h2>
              <p className="text-white/40 text-lg leading-relaxed">
                {aboutText}
              </p>
            </motion.div>

            {/* Right - Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="p-6 border border-white/[0.08] rounded-2xl text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">18+</div>
                <div className="text-white/40 text-sm">Projects</div>
              </div>
              <div className="p-6 border border-white/[0.08] rounded-2xl text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">$6M+</div>
                <div className="text-white/40 text-sm">Raised</div>
              </div>
              <div className="p-6 border border-white/[0.08] rounded-2xl text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">120+</div>
                <div className="text-white/40 text-sm">KOLs</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section - Line Grid Style */}
      <section className="bg-[#0A0A0B] py-20 md:py-28 border-t border-white/[0.08]">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Header */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-mono text-gray-500 mb-4 block">/ PROCESS</span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
                How we <span className="text-gray-500">work</span>
              </h2>
              <p className="text-white/40 max-w-xl text-sm leading-relaxed">
                {whatIncludesText}
              </p>
            </div>
          </motion.div>

          {/* Process Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-8 border-white/[0.08] ${
                  index > 0 ? 'lg:border-l' : ''
                } ${index >= 2 ? 'md:border-l' : ''} ${index % 2 === 1 && index < 2 ? 'md:border-l' : ''}`}
              >
                {/* Number */}
                <span className="text-xs font-mono text-gray-600 mb-4 block">
                  [{step.number}]
                </span>

                {/* Title */}
                <h4 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h4>

                {/* Description */}
                <p className="text-white/40 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services Section - Line Grid */}
      <section className="bg-[#0A0A0B] py-20 md:py-28 border-t border-white/[0.08]">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-mono text-gray-500 mb-4 block">/ OTHER SERVICES</span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
                Explore <span className="text-gray-500">More</span>
              </h2>
              <Link 
                to="/services"
                className="inline-flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors group"
              >
                VIEW ALL
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Services Grid - 2x3 Line Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {otherServices.slice(0, 6).map((service, index) => {
              const Icon = service.icon;
              const isTopRow = index < 3;
              const isLeftColumn = index % 3 === 0;
              
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link 
                    to={`/services/${service.slug}`}
                    className={`group block h-full p-8 md:p-10 transition-all duration-300 hover:bg-white/[0.03]
                      ${!isTopRow ? 'border-t border-white/[0.08]' : ''}
                      ${!isLeftColumn ? 'lg:border-l border-white/[0.08]' : ''}
                      ${index >= 3 && index < 6 && 'md:border-t'}
                      ${index % 2 === 1 ? 'md:border-l lg:border-l-0' : ''}
                      ${index === 3 || index === 4 || index === 5 ? 'lg:border-t' : ''}
                    `}
                  >
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                      <Icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                    </div>

                    {/* Number */}
                    <span className="text-xs font-mono text-gray-600 mb-3 block">
                      [{service.number}]
                    </span>

                    {/* Title */}
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-6 group-hover:text-white/90 transition-colors">
                      {service.title}
                    </h4>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-white/30 group-hover:text-white transition-colors">
                      <span className="text-sm">Learn more</span>
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
  );
};

export default ServiceDetailLayout;
