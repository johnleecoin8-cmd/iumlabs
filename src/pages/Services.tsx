import { useState, useEffect } from "react";
import { ArrowRight, Star, Quote, ChevronDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { useCountUp } from "@/hooks/useCountUp";

// Client logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import peaqLogo from "@/assets/logos/peaq.svg";
import storyProtocolLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria.png";

// Service images
import gtmImage from "@/assets/services/gtm-strategy.jpg";
import communityImage from "@/assets/services/community-growth.jpg";
import socialImage from "@/assets/backgrounds/seoul-gangnam-night.jpg";
import kolImage from "@/assets/services/kol-network.jpg";
import yapImage from "@/assets/services/events.jpg";
import prImage from "@/assets/services/pr-media.jpg";

// Floating tags for Services
const serviceTags = [
  { label: "KOL Marketing", position: "top-[15%] left-[5%]" },
  { label: "Community", position: "top-[35%] left-[4%]" },
  { label: "GTM Strategy", position: "top-[55%] left-[6%]" },
  { label: "PR & Media", position: "top-[18%] right-[6%]" },
  { label: "Social Media", position: "top-[42%] right-[5%]" },
  { label: "Influencers", position: "top-[66%] right-[7%]" },
];

const mobileServiceTags = [
  { label: "KOL", position: "top-[8%] left-[3%]" },
  { label: "Community", position: "top-[12%] right-[3%]" },
  { label: "Media", position: "bottom-[38%] left-[2%]" },
  { label: "Strategy", position: "bottom-[42%] right-[2%]" },
];

const clientLogos = [
  { name: "BNB", logo: bnbLogo },
  { name: "KuCoin", logo: kucoinLogo },
  { name: "Polygon", logo: polygonLogo },
  { name: "Ondo Finance", logo: ondoLogo },
  { name: "Bybit", logo: bybitLogo },
  { name: "Peaq", logo: peaqLogo },
  { name: "Story Protocol", logo: storyProtocolLogo },
  { name: "MegaETH", logo: megaethLogo },
  { name: "Tria", logo: triaLogo },
];

const stats = [
  { value: 17, label: "Projects Launched", suffix: "+" },
  { value: 115, label: "KOL Network", suffix: "+" },
  { value: 6, label: "Token Sales", prefix: "$", suffix: "M+" },
  { value: 48, label: "AMA Hosting", suffix: "+" },
];

const services = [
  {
    number: "01",
    title: "Go-To-Market Strategy",
    description: "Positioning, messaging, and audience clarity to launch with direction and narrative focus.",
    image: gtmImage,
    link: "/services/gtm",
  },
  {
    number: "02",
    title: "Community Management",
    description: "Complete Discord community infrastructure to build sticky, scalable and self-sustaining growth.",
    image: communityImage,
    link: "/services/community",
  },
  {
    number: "03",
    title: "Social Media Marketing",
    description: "Content strategy and execution on X to grow visibility and engage with your ecosystem in real time.",
    image: socialImage,
    link: "/services/social-media",
  },
  {
    number: "04",
    title: "Influencer Strategy",
    description: "Influencer campaigns powered by top crypto voices aligned with your message and goals.",
    image: kolImage,
    link: "/services/influencer",
  },
  {
    number: "05",
    title: "Yap Strategy",
    description: "Targeted campaigns through a 600+ creator network designed to drive awareness and traction across Crypto X.",
    image: yapImage,
    link: "/services/yap",
  },
  {
    number: "06",
    title: "PR",
    description: "Narrative development and media placements to get your story published and seen in the right places.",
    image: prImage,
    link: "/services/pr",
  },
];

const testimonials = [
  {
    name: "Alex Chen",
    role: "CEO, MetaVerse Korea",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content: "CryptoBridge helped us raise $12M and build a community of 50K+ members in just 3 months. Their understanding of the Korean market is unmatched.",
    rating: 5,
    source: "Trustpilot",
  },
  {
    name: "Sarah Kim",
    role: "Founder, KimchiSwap",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    content: "The team's DeFi expertise and KOL network helped us achieve $100M TVL within the first month of launch. Highly recommend!",
    rating: 5,
    source: "Ethos",
  },
  {
    name: "Michael Park",
    role: "CMO, Seoul DAO",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    content: "Professional, responsive, and results-driven. They know exactly how to position Web3 projects for the Korean audience.",
    rating: 5,
    source: "Trustpilot",
  },
];

// Stat Item Component
const StatItem = ({ 
  value, 
  label, 
  prefix = "", 
  suffix = "",
  isVisible,
  delay 
}: { 
  value: number; 
  label: string; 
  prefix?: string; 
  suffix?: string;
  isVisible: boolean;
  delay: number;
}) => {
  const count = useCountUp({
    end: value,
    isVisible,
    delay,
    duration: 2000,
  });
  
  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (delay + 600) / 1000, duration: 0.5 }}
    >
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-white/50 font-light">
        {label}
      </div>
    </motion.div>
  );
};

const Services = () => {
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation();
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation();
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsStatsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero - Matching Homepage Style with Video Background */}
      <section className="relative h-full min-h-screen flex flex-col justify-between overflow-hidden">
        {/* Background Layer - Video */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.35)" }}
            onLoadedMetadata={(e) => {
              e.currentTarget.currentTime = 0;
            }}
          >
            <source src="/videos/services-background.mp4" type="video/mp4" />
          </video>
          
          {/* Purple/Cyan gradient overlay - Services theme */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-cyan-500/15" />
          
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
        </div>

        {/* Floating Service Tags - Desktop */}
        {serviceTags.map((tag, index) => (
          <motion.div
            key={index}
            className={`absolute ${tag.position} hidden lg:block z-10`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
          >
            <span className="font-sans px-4 py-2 text-xs whitespace-nowrap rounded-xl bg-purple-500/10 border border-purple-400/20 text-white/70 hover:bg-purple-500/20 hover:border-purple-400/40 hover:text-white transition-all duration-300">
              {tag.label}
            </span>
          </motion.div>
        ))}

        {/* Floating Service Tags - Mobile */}
        {mobileServiceTags.map((tag, index) => (
          <div
            key={`mobile-${index}`}
            className={`absolute ${tag.position} lg:hidden z-10`}
          >
            <span className="font-sans px-2 py-1 text-[10px] rounded-lg bg-purple-500/10 border border-purple-400/20 text-white/60 whitespace-nowrap">
              {tag.label}
            </span>
          </div>
        ))}

        {/* Main Content - Left aligned for Services */}
        <div className="flex-1 flex items-center relative z-10 px-4 sm:px-6 lg:px-16">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div>
              {/* Main Headline */}
              <motion.h1 
                className="font-sans text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] font-bold leading-[0.9] tracking-[-0.02em] mb-6 sm:mb-8 mt-16 sm:mt-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-white">Our </span>
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Services</span>
              </motion.h1>

              {/* Subtext */}
              <motion.p 
                className="text-lg sm:text-xl text-white/50 max-w-xl mb-8 font-light tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                As a Web3 Marketing Agency with a focus on customer satisfaction, 
                CryptoBridge Korea delivers tailor-made services to build and grow your <span className="text-purple-300 font-medium">Web3 project</span>.
              </motion.p>
            </div>

            {/* Right side - Service Icons Grid */}
            <motion.div 
              className="hidden lg:grid grid-cols-3 gap-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {services.slice(0, 6).map((service, index) => (
                <Link
                  key={service.number}
                  to={service.link}
                  className="group relative aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-purple-400/40 transition-all duration-300 hover:scale-105"
                >
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="text-xs text-purple-300 font-medium">[{service.number}]</span>
                    <p className="text-white text-sm font-medium truncate">{service.title}</p>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative z-10 py-4 sm:py-6">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {stats.map((stat, index) => (
                <StatItem 
                  key={index}
                  value={stat.value}
                  label={stat.label}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  isVisible={isStatsVisible}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Client Logo Marquee */}
        <div className="relative z-10 border-t border-white/10 py-3 sm:py-4 overflow-hidden">
          <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white/40 text-[10px] sm:text-xs z-20">
            <span className="number-badge">01</span>
          </div>

          <div className="flex items-center logo-marquee-slow ml-14 sm:ml-16">
            {[...clientLogos, ...clientLogos].map((client, index) => (
              <div 
                key={index} 
                className="flex items-center gap-1.5 sm:gap-2 mx-1.5 sm:mx-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-zinc-900/80 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="h-4 w-4 sm:h-5 sm:w-5 object-contain brightness-0 invert opacity-80 flex-shrink-0"
                />
                <span className="text-white/70 text-[10px] sm:text-xs font-medium whitespace-nowrap">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 z-10 flex items-center gap-2 sm:gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-white/40 text-xs sm:text-sm font-medium">scroll</span>
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-white/40 animate-bounce" />
        </motion.div>
      </section>

      {/* Services List - Lunar Strategy Horizontal Layout */}
      <section ref={servicesRef} className="bg-[#fafafa] py-24">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 tracking-tight">
              What
            </h2>
            <div className="flex items-center gap-4">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 tracking-tight">
                We Do
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

          {/* Service Items - Horizontal List */}
          <div className="space-y-0">
            {services.map((service, index) => (
              <Link
                key={service.number}
                to={service.link}
                className={`group flex flex-col lg:flex-row items-stretch gap-0 transition-all duration-500 ${
                  servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative w-full lg:w-72 h-48 lg:h-auto flex-shrink-0 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Blue overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-cyan-500/30 to-blue-800/50 group-hover:opacity-0 transition-opacity duration-700" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col lg:flex-row items-start lg:items-center justify-between py-8 lg:py-12 px-0 lg:px-12 border-b border-dashed border-slate-300">
                  <div className="flex-1 mb-4 lg:mb-0">
                    <h3 className="text-2xl md:text-3xl font-medium text-slate-900 mb-3 group-hover:text-[#2563eb] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed max-w-xl">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-8">
                    <span className="text-slate-400 font-light text-sm whitespace-nowrap">
                      [ {service.number} ]
                    </span>
                    <span className="inline-flex items-center gap-2 text-slate-900 group-hover:text-[#2563eb] transition-colors">
                      <span className="font-medium">Learn more</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="bg-[#f5f5f5] py-24">
        <div className="container mx-auto max-w-7xl px-6 lg:px-16">
          {/* Header */}
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 transition-all duration-700 ${
            testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 tracking-tight">
                +250 Satisfied Clients
              </h2>
            </div>
            <div className="flex gap-2">
              <span className="text-4xl">✌️</span>
              <span className="text-4xl">✌️</span>
              <span className="text-4xl">✌️</span>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 border border-slate-200 hover:border-[#2563eb]/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ${
                  testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-[#2563eb]/30 mb-6" />
                
                {/* Content */}
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  "{testimonial.content}"
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-slate-100"
                  />
                  <div>
                    <div className="font-medium text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>

                {/* Source */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <span className="text-xs text-[#2563eb] uppercase tracking-wider font-medium">
                    Reviewed on {testimonial.source}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Services;
