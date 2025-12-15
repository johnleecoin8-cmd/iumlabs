import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
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
  { slug: "community", title: "Community", number: "01" },
  { slug: "social-media", title: "Social Media", number: "02" },
  { slug: "influencer", title: "Influencer", number: "03" },
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
    <div className="min-h-screen bg-[#030303]">
      <Navbar />

      {/* Hero Section - Full Immersive */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${themeConfig.backgroundImage})`,
              filter: "brightness(0.3) saturate(1.2)",
            }}
          />
          {/* Gradient mesh overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-transparent to-cyan-900/20" />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Back Button - Fixed Top Left */}
        <motion.button
          onClick={() => navigate('/services')}
          className="absolute top-28 left-6 z-30 flex items-center gap-2 px-4 py-2.5 bg-black/30 backdrop-blur-xl rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-black/50 hover:border-white/20 transition-all duration-300 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </motion.button>

        {/* Content */}
        <div className="relative z-10 w-full pb-32 pt-48">
          <div className="container mx-auto px-6 lg:px-16">
            {/* Service badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 backdrop-blur-sm rounded-full border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Service
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="max-w-4xl mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="block text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.9]">
                {title}
              </span>
              {titleHighlight && (
                <span className="block text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent leading-[0.9]">
                  {titleHighlight}
                </span>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="max-w-2xl text-xl md:text-2xl text-white/50 font-light leading-relaxed mb-12"
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
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-emerald-400 hover:scale-105 transition-all duration-300 shadow-2xl shadow-white/10"
              >
                <Calendar className="w-5 h-5" />
                Book a Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </CalendlyButton>
            </motion.div>
          </div>

          {/* Client logos bar */}
          <div className="mt-20 border-t border-white/5 pt-8">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="flex items-center gap-8 overflow-x-auto pb-4 scrollbar-hide">
                <span className="text-white/30 text-sm whitespace-nowrap">Trusted by</span>
                {clientLogos.slice(0, 6).map((logo, index) => (
                  <img
                    key={index}
                    src={logo.src}
                    alt={logo.alt}
                    className="h-6 w-auto object-contain brightness-0 invert opacity-40 hover:opacity-70 transition-opacity flex-shrink-0"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
        </motion.div>
      </section>

      {/* About Section - Bento Style */}
      <section className="bg-[#030303] py-32">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Main text block */}
            <motion.div 
              className="lg:col-span-7 scroll-reveal"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="h-full p-10 md:p-14 rounded-[2rem] bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] backdrop-blur-sm">
                <span className="inline-block px-3 py-1 bg-emerald-500/10 rounded-full text-emerald-400 text-xs font-medium mb-6">
                  About this service
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                  What we <span className="text-emerald-400">do</span>
                </h2>
                <p className="text-lg text-white/60 leading-relaxed">
                  {aboutText}
                </p>
              </div>
            </motion.div>

            {/* Image block */}
            <motion.div 
              className="lg:col-span-5 scroll-reveal"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="h-full min-h-[400px] rounded-[2rem] overflow-hidden relative group">
                {aboutImage ? (
                  <>
                    <img 
                      src={aboutImage} 
                      alt="Service" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-transparent" />
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-600" />
                )}
                {/* Floating card */}
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Available</p>
                  <p className="text-white font-semibold">Mon-Fri, 09:00 — 18:00 KST</p>
                </div>
              </div>
            </motion.div>

            {/* CTA block */}
            <motion.div 
              className="lg:col-span-5 scroll-reveal"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="h-full p-8 rounded-[2rem] bg-gradient-to-br from-emerald-600/20 to-cyan-600/20 border border-emerald-500/20 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to start?</h3>
                <p className="text-white/60 mb-6">Let's discuss how we can help your project succeed in Korea.</p>
                <CalendlyButton className="w-fit px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-emerald-400 transition-all">
                  Schedule a call
                </CalendlyButton>
              </div>
            </motion.div>

            {/* Stats block */}
            <motion.div 
              className="lg:col-span-7 scroll-reveal"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="h-full p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.06]">
                <div className="grid grid-cols-3 gap-6 h-full items-center">
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">18+</div>
                    <div className="text-white/40 text-sm">Projects</div>
                  </div>
                  <div className="text-center border-x border-white/[0.06]">
                    <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">$6M+</div>
                    <div className="text-white/40 text-sm">Raised</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">120+</div>
                    <div className="text-white/40 text-sm">KOLs</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section - Timeline Style */}
      <section className="bg-[#030303] py-32 border-t border-white/[0.04]">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Header */}
          <motion.div 
            className="max-w-3xl mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-white/50 text-xs font-medium mb-6">
              Our Process
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              How we <span className="text-emerald-400">work</span>
            </h2>
            <p className="text-lg text-white/50">
              {whatIncludesText}
            </p>
          </motion.div>

          {/* Process steps */}
          <div className="space-y-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                className="scroll-reveal group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-6 p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-emerald-500/20 transition-all duration-500 group-hover:translate-x-2">
                  {/* Number */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <span className="text-2xl font-bold text-emerald-400">{step.number}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-white/50 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-6 h-6 text-white/20 group-hover:text-emerald-400 group-hover:translate-x-2 transition-all flex-shrink-0 mt-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services Section */}
      <section className="bg-[#030303] py-32 border-t border-white/[0.04]">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div 
            className="flex items-end justify-between mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-white/50 text-xs font-medium mb-4">
                Explore More
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Other <span className="text-emerald-400">services</span>
              </h2>
            </div>
            <Link 
              to="/services" 
              className="hidden md:flex items-center gap-2 text-white/50 hover:text-emerald-400 transition-colors group"
            >
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Service cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherServices.slice(0, 3).map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="group block p-8 h-full rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-emerald-500/20 transition-all duration-300"
                >
                  <span className="inline-block px-3 py-1 bg-emerald-500/10 rounded-full text-emerald-400 text-xs font-medium mb-6">
                    {service.number}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/40 group-hover:text-emerald-400 transition-colors">
                    <span className="text-sm">Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default ServiceDetailLayout;
