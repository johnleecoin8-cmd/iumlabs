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
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-400 mb-1">
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
      <main className="p-0.5 sm:p-1 md:p-2 bg-white">
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden rounded-xl sm:rounded-2xl">
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
          
          {/* Green/Emerald gradient overlay - Matching Homepage */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/15 via-transparent to-teal-500/10" />
          
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
        </div>


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
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Services</span>
              </motion.h1>

              {/* Subtext */}
              <motion.p 
                className="text-lg sm:text-xl text-white/50 max-w-xl mb-8 font-light tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                As a Web3 Marketing Agency with a focus on customer satisfaction, 
                CryptoBridge Korea delivers tailor-made services to build and grow your <span className="text-emerald-400 font-medium">Web3 project</span>.
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
                  className="group relative aspect-square rounded-2xl overflow-hidden border border-white/[0.08] hover:border-emerald-400/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/10"
                >
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover brightness-50 group-hover:brightness-75 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-xs text-emerald-400 font-medium">[{service.number}]</span>
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

        {/* Client Logo Marquee - Glass Pills */}
        <div className="relative z-10 border-t border-white/[0.08] py-4 sm:py-5 overflow-hidden bg-gradient-to-t from-black/20 to-transparent">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[hsl(0,0%,4%)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[hsl(0,0%,4%)] to-transparent z-10 pointer-events-none" />

          <div className="flex items-center logo-marquee-slow hover:[animation-play-state:paused]">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 sm:gap-2.5 mx-2 sm:mx-2.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/[0.08] hover:bg-white/[0.08] hover:border-emerald-400/20 transition-all duration-300 cursor-default"
              >
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="h-5 w-5 sm:h-6 sm:w-6 object-contain opacity-90 flex-shrink-0"
                />
                <span className="text-white/80 text-[11px] sm:text-xs font-medium whitespace-nowrap">
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
      </main>

      {/* Services List - Dark Theme Matching Homepage */}
      <section ref={servicesRef} className="bg-[#0A0A0B] py-24">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Header - Option B Style */}
          <div className="relative mb-16 md:mb-20">
            {/* Large background number */}
            <span className="absolute -top-8 md:-top-12 left-0 text-[120px] md:text-[180px] lg:text-[220px] font-black text-white/[0.03] leading-none pointer-events-none select-none">
              01
            </span>
            
            {/* Title */}
            <div className="relative">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                <span className="text-white/50">What We</span>{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Do
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mt-4" />
            </div>
          </div>

          {/* Service Grid - Cases Style */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <Link
                key={service.number}
                to={service.link}
                className={`group block relative h-[320px] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-emerald-400/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10 ${
                  servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover brightness-[0.4] group-hover:brightness-[0.5] group-hover:scale-110 transition-all duration-700"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  {/* Green tint on hover */}
                  <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-colors duration-500" />
                </div>

                {/* Glass pill tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.08] backdrop-blur-md rounded-full border border-white/[0.15] text-xs text-white/80">
                    <span className="text-emerald-400">[{service.number}]</span>
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2 group-hover:text-white/70 transition-colors">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Dark Theme */}
      <section ref={testimonialsRef} className="bg-[#0A0A0B] py-24 border-t border-white/[0.08]">
        <div className="container mx-auto max-w-7xl px-6 lg:px-16">
          {/* Header - Option B Style */}
          <div className="relative mb-16 md:mb-20">
            {/* Large background number */}
            <span className="absolute -top-8 md:-top-12 left-0 text-[120px] md:text-[180px] lg:text-[220px] font-black text-white/[0.03] leading-none pointer-events-none select-none">
              02
            </span>
            
            {/* Title */}
            <div className={`relative transition-all duration-700 ${
              testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                <span className="text-white/50">+250</span>{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Satisfied Clients
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mt-4" />
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.08] hover:border-emerald-400/20 hover:bg-white/[0.04] hover:-translate-y-2 transition-all duration-500 ${
                  testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-emerald-400/30 mb-6" />
                
                {/* Content */}
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  "{testimonial.content}"
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white/[0.1]"
                  />
                  <div>
                    <div className="font-medium text-white">{testimonial.name}</div>
                    <div className="text-sm text-white/50">{testimonial.role}</div>
                  </div>
                </div>

                {/* Source */}
                <div className="mt-6 pt-6 border-t border-white/[0.08]">
                  <span className="text-xs text-emerald-400 uppercase tracking-wider font-medium">
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
