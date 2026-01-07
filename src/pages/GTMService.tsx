import { Rocket, Target, Compass, TrendingUp, CheckCircle, FileSearch, ArrowRight, Users, BarChart3, Globe, Zap, Shield, Award, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/ContactFormSection";
import CTABannerSection from "@/components/CTABannerSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import CalendlyButton from "@/components/CalendlyButton";
import SectionHeader from "@/components/SectionHeader";
import { usePageMeta } from "@/hooks/usePageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";
import { useCountUp } from "@/hooks/useCountUp";
import { useEffect, useState } from "react";

// Import client logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import peaqLogo from "@/assets/logos/peaq.svg";
import storyProtocolLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria-official.png";
import mantraLogo from "@/assets/logos/mantra.png";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import fogoLogo from "@/assets/logos/fogo.png";

const ACCENT_COLOR = "#10B981";

const breadcrumbItems = [
  { name: "Home", url: "https://iumlabs.io" },
  { name: "Services", url: "https://iumlabs.io/services" },
  { name: "GTM Strategy", url: "https://iumlabs.io/services/gtm" }
];

const clientLogos = [
  { name: "BNB Chain", logo: bnbLogo },
  { name: "KuCoin", logo: kucoinLogo },
  { name: "Polygon", logo: polygonLogo },
  { name: "Ondo", logo: ondoLogo },
  { name: "Bybit", logo: bybitLogo },
  { name: "Peaq", logo: peaqLogo },
  { name: "Story Protocol", logo: storyProtocolLogo },
  { name: "MegaETH", logo: megaethLogo },
  { name: "Tria", logo: triaLogo, noInvert: true },
  { name: "Mantra", logo: mantraLogo, noInvert: true },
  { name: "Sahara AI", logo: saharaAiLogo, noInvert: true },
  { name: "FOGO", logo: fogoLogo, noInvert: true },
];

// Timeline Process Steps
const processSteps = [
  {
    week: "Week 1",
    title: "Discovery",
    icon: FileSearch,
    description: "Deep dive into your project, goals, and Korean market opportunity.",
    deliverable: "Project Assessment"
  },
  {
    week: "Week 1-2",
    title: "Research",
    icon: Compass,
    description: "Competitive analysis, market sizing, and regulatory review.",
    deliverable: "Market Report"
  },
  {
    week: "Week 2",
    title: "Strategy",
    icon: Target,
    description: "Custom GTM roadmap with channel mix and budget allocation.",
    deliverable: "Strategy Deck"
  },
  {
    week: "Ongoing",
    title: "Execute",
    icon: Rocket,
    description: "Launch campaigns, manage communities, and scale presence.",
    deliverable: "Growth Partnership"
  }
];

// What We Deliver
const deliverables = [
  {
    icon: BarChart3,
    title: "Strategy Deck",
    description: "Custom GTM roadmap with clear milestones, KPIs, and success metrics"
  },
  {
    icon: Clock,
    title: "Execution Plan",
    description: "Detailed timeline, budget breakdown, and resource allocation"
  },
  {
    icon: TrendingUp,
    title: "Performance Framework",
    description: "Tracking dashboard with real-time metrics and optimization insights"
  }
];

// Why Choose Us
const differentiators = [
  {
    icon: Globe,
    title: "Local Expertise",
    description: "Native Korean team with deep market & cultural knowledge"
  },
  {
    icon: Zap,
    title: "Full-Service",
    description: "From strategy to execution, everything under one roof"
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "30+ successful Web3 project launches in Korea"
  },
  {
    icon: Shield,
    title: "Custom Solutions",
    description: "Tailored approach for every project's unique needs"
  }
];

// Available Services
const services = [
  { name: "Community", slug: "community", icon: Users },
  { name: "PR & Media", slug: "pr", icon: BarChart3 },
  { name: "KOL/Influencer", slug: "influencer", icon: Award },
  { name: "Offline Events", slug: "offline-event", icon: Globe },
  { name: "SEO & Ads", slug: "seo-ads", icon: TrendingUp },
  { name: "Branding", slug: "branding", icon: Zap },
  { name: "Deep Research", slug: "deep-research", icon: FileSearch },
  { name: "Yap Strategy", slug: "yap", icon: Compass },
];

// Stats
const stats = [
  { value: 30, suffix: "+", label: "Projects Launched" },
  { value: 95, suffix: "%", label: "Success Rate" },
  { value: 2, suffix: " Weeks", label: "Strategy Delivery" },
  { value: 500, suffix: "M+", label: "Impressions Generated" },
];

// Stat Component
const StatItem = ({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  const count = useCountUp({ end: value, isVisible, delay, duration: 2000 });
  
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1">
        {count}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-white/50">{label}</div>
    </div>
  );
};

const GTMService = () => {
  usePageMeta(
    "Korean Web3 GTM Strategy | ium Labs",
    "Launch in Korea, scale globally. End-to-end GTM strategy for Web3 projects entering the Korean market.",
    "/services/gtm"
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.3)" }}
          >
            <source src="/videos/gtm-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]" />
          <div 
            className="absolute inset-0 opacity-20"
            style={{ background: `radial-gradient(ellipse at 50% 30%, ${ACCENT_COLOR} 0%, transparent 50%)` }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-6"
            >
              <Rocket className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">Go-To-Market Strategy</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
            >
              <span className="text-white">Launch in Korea.</span>
              <br />
              <span className="text-emerald-400">Scale Globally.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-8"
            >
              End-to-end GTM strategy tailored for Web3 projects entering the Korean market. 
              From research to execution, we've got you covered.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <CalendlyButton className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5">
                <span>Book a Strategy Call</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </CalendlyButton>
              <Link 
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-4 text-white/70 hover:text-white font-medium transition-colors"
              >
                <span>View Case Studies</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 pt-16 border-t border-white/10"
            >
              {stats.map((stat, index) => (
                <StatItem key={index} {...stat} delay={index * 100} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Trusted By Marquee */}
        <div className="relative z-10 border-t border-white/10 py-4 overflow-hidden">
          <div className="flex items-center gap-4 px-6 mb-3">
            <span className="text-xs text-white/40 uppercase tracking-wider">Trusted by</span>
          </div>
          <div className="flex items-center logo-marquee-slow">
            {[...clientLogos, ...clientLogos].map((client, index) => (
              <div key={index} className="flex items-center gap-2 mx-4 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className={`h-5 w-5 object-contain ${client.noInvert ? '' : 'brightness-0 invert'} opacity-70`}
                />
                <span className="text-xs text-white/60 whitespace-nowrap">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Timeline */}
      <section className="py-20 sm:py-24 bg-[#0A0A0A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Strategy to Execution in <span className="text-emerald-400">2 Weeks</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Our streamlined process gets you from zero to market-ready faster than anyone else.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Step Card */}
                    <div className="group p-5 sm:p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300">
                      {/* Week Badge */}
                      <div className="text-xs font-medium text-emerald-400 mb-3">{step.week}</div>
                      
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                      
                      {/* Description */}
                      <p className="text-sm text-white/50 mb-4">{step.description}</p>
                      
                      {/* Deliverable */}
                      <div className="flex items-center gap-2 text-xs text-emerald-400">
                        <CheckCircle className="w-4 h-4" />
                        <span>{step.deliverable}</span>
                      </div>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="hidden md:flex absolute -bottom-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-[#0A0A0A]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="py-20 sm:py-24 bg-[#0F0F0F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
              Deliverables
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What You Get
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Tangible outputs that drive real results for your Korean market entry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {deliverables.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-emerald-500/30 transition-all text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/50">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 sm:py-24 bg-[#0A0A0A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
                Why ium Labs
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Your Korean Market <span className="text-emerald-400">Partner</span>
              </h2>
              <p className="text-white/60 mb-8">
                We're not just consultants—we're your execution team on the ground. 
                Native expertise, proven frameworks, and relentless drive to make your project succeed in Korea.
              </p>
              
              <CalendlyButton className="group inline-flex items-center gap-3 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-full transition-all duration-300">
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </CalendlyButton>
            </div>

            {/* Right - Differentiators Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {differentiators.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-5 bg-white/5 border border-white/10 rounded-xl hover:border-emerald-500/20 transition-all"
                  >
                    <Icon className="w-8 h-8 text-emerald-400 mb-3" />
                    <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-white/50">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Available Services Grid */}
      <section className="py-20 sm:py-24 bg-[#0F0F0F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
              Full-Service
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Build Your Custom Package
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Mix and match services to create the perfect GTM strategy for your project.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group p-4 sm:p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5 text-white/40 group-hover:text-emerald-400 transition-colors" />
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all ml-auto" />
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {service.name}
                  </h4>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-[#0A0A0A] to-[#0F1F17]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to <span className="text-emerald-400">Launch in Korea?</span>
            </h2>
            <p className="text-lg text-white/60 mb-8">
              Book a free strategy call and get a custom roadmap for your Korean market entry.
            </p>
            <CalendlyButton className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5">
              <span>Book a Free Strategy Call</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </CalendlyButton>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactFormSection />
      <FooterLinksSection />
      <Footer />

      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema 
        name="Korean Web3 GTM Strategy"
        description="End-to-end GTM strategy for Web3 projects entering the Korean market. From research to execution."
        url="/services/gtm"
        serviceType={["GTM Strategy", "Web3 Marketing", "Korea Market Entry"]}
      />
    </div>
  );
};

export default GTMService;
