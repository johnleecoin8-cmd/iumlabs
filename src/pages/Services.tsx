import { useState, useEffect } from "react";
import { ArrowRight, Calendar, Star, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import CalendlyButton from "@/components/CalendlyButton";
import Planet3D from "@/components/Planet3D";
import cosmicNebula from "@/assets/backgrounds/cosmic-nebula.jpg";

// Service images
import gtmImage from "@/assets/services/gtm-strategy.jpg";
import communityImage from "@/assets/services/community-growth.jpg";
import socialImage from "@/assets/backgrounds/seoul-gangnam-night.jpg";
import kolImage from "@/assets/services/kol-network.jpg";
import yapImage from "@/assets/services/events.jpg";
import prImage from "@/assets/services/pr-media.jpg";

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

const Services = () => {
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation();
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero - Full Screen with Cosmic Nebula Background */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background - Cosmic Nebula */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-kenburns"
            style={{ 
              backgroundImage: `url(${cosmicNebula})`,
              filter: "brightness(0.7) saturate(1.2)",
            }}
          />
          
          {/* Aurora light overlay - Pink/Cyan cosmic theme */}
          <div className="absolute inset-0 animate-aurora">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/30 via-transparent to-cyan-500/25" />
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/30 via-transparent to-blue-500/20" />
          </div>
          
          {/* Twinkling stars effect */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                  opacity: 0.3 + Math.random() * 0.7,
                }}
              />
            ))}
          </div>
          
          {/* Light sweep effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent animate-light-sweep" />
          </div>
          
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.2)] via-transparent to-[hsl(0,0%,4%,0.85)]" />
          
          {/* 3D Planet */}
          <Planet3D type="sun" className="opacity-40" />
        </div>

        {/* Colorful Floating Tags - Cosmic themed */}
        <div className="absolute inset-0 z-10 hidden md:block">
          {/* Left side tags */}
          <div 
            className="absolute top-[12%] left-[5%] px-4 py-2 rounded-sm bg-cyan-400 text-black text-sm font-medium animate-float cursor-default hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 pointer-events-auto"
            style={{ animationDuration: '4s', animationDelay: '0s' }}
          >
            Strategy
          </div>
          <div 
            className="absolute top-[28%] left-[10%] px-4 py-2 rounded-sm bg-pink-500 text-white text-sm font-medium animate-float cursor-default hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 pointer-events-auto"
            style={{ animationDuration: '5s', animationDelay: '0.5s' }}
          >
            Growth
          </div>
          <div 
            className="absolute top-[45%] left-[3%] px-4 py-2 rounded-sm bg-purple-500 text-white text-sm font-medium animate-float cursor-default hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 pointer-events-auto"
            style={{ animationDuration: '4.5s', animationDelay: '1s' }}
          >
            Community
          </div>
          <div 
            className="absolute top-[60%] left-[8%] px-4 py-2 rounded-sm bg-blue-500 text-white text-sm font-medium animate-float cursor-default hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 pointer-events-auto"
            style={{ animationDuration: '5.5s', animationDelay: '1.5s' }}
          >
            Marketing
          </div>
          
          {/* Right side tags */}
          <div 
            className="absolute top-[15%] right-[6%] px-4 py-2 rounded-sm bg-cyan-500 text-black text-sm font-medium animate-float cursor-default hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 pointer-events-auto"
            style={{ animationDuration: '5s', animationDelay: '0.3s' }}
          >
            Influencers
          </div>
          <div 
            className="absolute top-[32%] right-[3%] px-4 py-2 rounded-sm bg-pink-400 text-white text-sm font-medium animate-float cursor-default hover:scale-110 hover:shadow-lg hover:shadow-pink-400/50 transition-all duration-300 pointer-events-auto"
            style={{ animationDuration: '4.5s', animationDelay: '0.8s' }}
          >
            PR & Media
          </div>
          <div 
            className="absolute top-[50%] right-[8%] px-4 py-2 rounded-sm border border-white/60 text-white text-sm font-medium animate-float cursor-default hover:scale-110 hover:bg-white/10 hover:border-white transition-all duration-300 pointer-events-auto"
            style={{ animationDuration: '5.5s', animationDelay: '1.3s' }}
          >
            Social Media
          </div>
          <div 
            className="absolute top-[68%] right-[4%] px-4 py-2 rounded-sm bg-purple-400 text-white text-sm font-medium animate-float cursor-default hover:scale-110 hover:shadow-lg hover:shadow-purple-400/50 transition-all duration-300 pointer-events-auto"
            style={{ animationDuration: '4s', animationDelay: '1.8s' }}
          >
            Exchange Listings
          </div>
        </div>

        {/* Content - Right aligned */}
        <div className="container mx-auto px-6 lg:px-16 pt-32 pb-24 relative z-10">
          <div className="flex flex-col items-end text-right">
            <h1 className="text-white mb-8">
              <span className="block text-7xl md:text-[120px] lg:text-[180px] font-light tracking-tight leading-[0.9]">
                Services
              </span>
            </h1>

            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
              As a Web3 Marketing Agency with a focus on customer satisfaction, 
              CryptoBridge Korea has tailor made the service offering to include 
              services that serve to build and grow your Web3 project.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/50 z-20">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent animate-pulse" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>
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
