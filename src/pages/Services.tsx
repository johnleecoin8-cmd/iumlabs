import { useState, useEffect } from "react";
import { ArrowRight, Calendar, Star, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import CalendlyButton from "@/components/CalendlyButton";
import Planet3D from "@/components/Planet3D";
import sunCorona from "@/assets/backgrounds/sun-corona.jpg";

// Service images
import kolNetworkImg from "@/assets/services/kol-network.jpg";
import communityGrowthImg from "@/assets/services/community-growth.jpg";
import prMediaImg from "@/assets/services/pr-media.jpg";
import gtmStrategyImg from "@/assets/services/gtm-strategy.jpg";
import vaspComplianceImg from "@/assets/services/vasp-compliance.jpg";
import eventsImg from "@/assets/services/events.jpg";

const services = [
  {
    id: "kol-marketing",
    number: "01",
    title: "KOL & Influence Network",
    description: "Partner with Korea's top crypto influencers to amplify your project's reach. We manage relationships with 1,000+ verified KOLs across Twitter, YouTube, and Korean platforms like Naver.",
    image: kolNetworkImg,
    stat: "1,000+",
    statLabel: "Verified KOLs",
  },
  {
    id: "community-building",
    number: "02",
    title: "Community Growth",
    description: "Build a thriving Korean community from scratch or enhance your existing presence. We handle everything from platform setup to 24/7 Korean moderation across Telegram, Discord, and KakaoTalk.",
    image: communityGrowthImg,
    stat: "500K+",
    statLabel: "Members Managed",
  },
  {
    id: "pr-media",
    number: "03",
    title: "PR & Media Relations",
    description: "Secure coverage in leading Korean crypto publications and mainstream media. From press releases to exclusive interviews, we handle your complete Korean media strategy.",
    image: prMediaImg,
    stat: "50+",
    statLabel: "Publications",
  },
  {
    id: "gtm-strategy",
    number: "04",
    title: "Go-To-Market Strategy",
    description: "Launch successfully in Korea with data-driven strategies that account for local market dynamics, competitive landscape, and user behavior patterns.",
    image: gtmStrategyImg,
    stat: "200+",
    statLabel: "Successful Launches",
  },
  {
    id: "vasp-compliance",
    number: "05",
    title: "VASP & Compliance",
    description: "Get compliant in Korea's regulated crypto market. We guide you through VASP registration, AML/KYC requirements, and ongoing compliance obligations.",
    image: vaspComplianceImg,
    stat: "100%",
    statLabel: "Success Rate",
  },
  {
    id: "events",
    number: "06",
    title: "Events & Conferences",
    description: "Make an impact at major Korean blockchain events or host your own. We manage everything from booth setup to VIP networking events and speaker placements.",
    image: eventsImg,
    stat: "20+",
    statLabel: "Events Per Year",
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

// Orbital tags - planets orbiting the central sun
const orbitalTags = [
  { label: "Responsible", orbitRadius: 140, duration: 20, startAngle: 0, color: "bg-orange-400 text-white" },
  { label: "Creative", orbitRadius: 180, duration: 26, startAngle: 40, color: "bg-yellow-400 text-black" },
  { label: "Innovation", orbitRadius: 220, duration: 32, startAngle: 80, color: "bg-amber-300 text-black" },
  { label: "Resourceful", orbitRadius: 260, duration: 38, startAngle: 120, color: "bg-red-400 text-white" },
  { label: "Strategic", orbitRadius: 300, duration: 44, startAngle: 160, color: "bg-orange-300 text-black" },
  { label: "Trusted", orbitRadius: 340, duration: 50, startAngle: 200, color: "bg-yellow-300 text-black" },
  { label: "Detail-Oriented", orbitRadius: 380, duration: 56, startAngle: 240, color: "bg-amber-400 text-black" },
  { label: "Innovative", orbitRadius: 420, duration: 62, startAngle: 280, color: "bg-orange-500 text-white" },
  { label: "Result-Driven", orbitRadius: 460, duration: 68, startAngle: 320, color: "bg-yellow-500 text-black" },
];

// Mobile tags (simplified)
const mobileFloatingTags = [
  { label: "Trusted", top: "18%", left: "5%", color: "bg-yellow-300 text-black" },
  { label: "Creative", top: "22%", right: "5%", color: "bg-yellow-400 text-black" },
  { label: "Strategic", bottom: "28%", left: "5%", color: "bg-orange-300 text-black" },
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
      
      {/* Hero - Full Screen with Ken Burns Background */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background - Sun Corona */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-kenburns"
            style={{ 
              backgroundImage: `url(${sunCorona})`,
              filter: "brightness(0.6) saturate(1.3)",
            }}
          />
          
          {/* Aurora light overlay - Solar/Gold theme */}
          <div className="absolute inset-0 animate-aurora">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/30 via-transparent to-yellow-500/20" />
            <div className="absolute inset-0 bg-gradient-to-bl from-amber-600/25 via-transparent to-red-500/15" />
          </div>
          
          {/* Light sweep effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent animate-light-sweep" />
          </div>
          
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.9)]" />
          
          {/* 3D Planet */}
          <Planet3D type="sun" className="opacity-60" />
        </div>
        
        {/* Orbital Tags System - Desktop: Tags orbit around the central sun */}
        <div 
          className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none overflow-hidden"
          style={{
            perspective: '1200px',
            perspectiveOrigin: 'center center',
          }}
        >
          {/* 3D tilted orbital plane */}
          <div
            className="relative"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(65deg) rotateZ(-15deg)',
            }}
          >
            {/* Orbit path lines with glow effect */}
            {[140, 220, 300, 380, 460].map((radius, i) => (
              <div
                key={`orbit-path-${i}`}
                className="absolute rounded-full"
                style={{
                  width: radius * 2,
                  height: radius * 2,
                  left: -radius,
                  top: -radius,
                  border: '1px solid rgba(255, 180, 100, 0.15)',
                  boxShadow: `
                    0 0 ${10 + i * 3}px rgba(255, 150, 50, 0.1),
                    inset 0 0 ${8 + i * 2}px rgba(255, 180, 100, 0.05)
                  `,
                }}
              />
            ))}
            
            {/* Orbiting tags - each rotates around the screen center */}
            {orbitalTags.map((tag, index) => (
              <div
                key={`orbit-wrapper-${index}`}
                className="orbit-wrapper"
                style={{
                  width: tag.orbitRadius * 2,
                  height: tag.orbitRadius * 2,
                  marginLeft: -tag.orbitRadius,
                  marginTop: -tag.orbitRadius,
                  animation: `orbit ${tag.duration}s linear infinite`,
                  animationDelay: `-${(tag.startAngle / 360) * tag.duration}s`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* The tag positioned at the edge of the orbit circle */}
                <span
                  className={`orbit-tag px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg ${tag.color}`}
                  style={{
                    top: '50%',
                    right: 0,
                    transform: 'translateY(-50%) rotateX(-65deg) rotateZ(15deg)',
                    animation: `counter-orbit ${tag.duration}s linear infinite`,
                    animationDelay: `-${(tag.startAngle / 360) * tag.duration}s`,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 200, 100, 0.2)',
                  }}
                >
                  {tag.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile floating tags - simplified static version */}
        <div className="lg:hidden">
          {mobileFloatingTags.map((tag, index) => (
            <span
              key={`mobile-${index}`}
              className={`absolute animate-float px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg ${tag.color}`}
              style={{
                top: tag.top,
                left: tag.left,
                right: tag.right,
                bottom: tag.bottom,
                animationDelay: `${index * 0.4}s`,
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Content with Stagger Animation */}
        <div className="container mx-auto max-w-7xl px-4 relative z-10 pt-32 pb-24">
          <div className="mb-16">
            <span className="text-sm text-white/50 mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>[ Our Services ]</span>
            <h1 className="text-[12vw] md:text-[150px] lg:text-[180px] font-light text-white leading-[0.85] tracking-tight opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Ser<span className="serif-italic text-primary">v</span>ices
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-white/10 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <p className="text-lg text-white/60 max-w-xl">
              Everything you need to successfully enter and grow in Korea's vibrant crypto market.
            </p>
            <CalendlyButton className="lunar-btn">
              <Calendar className="w-4 h-4" />
              <span>Book a Consultation</span>
            </CalendlyButton>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* Services List - Lunar Strategy Style */}
      <section ref={servicesRef} className="bg-[hsl(0,0%,96%)] py-24">
        <div className="container mx-auto max-w-7xl px-4">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group py-12 transition-all duration-700 ${
                servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Dotted Line */}
              <div className="dotted-line-light mb-12" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Image */}
                <div className="lg:col-span-4">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    {/* Number */}
                    <span className="text-[hsl(0,0%,40%)] text-sm font-mono">[ {service.number} ]</span>
                    
                    {/* Title + Learn More */}
                    <div className="flex-1 md:pl-8">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-[hsl(0,0%,8%)] group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                        <CalendlyButton className="hidden md:flex shrink-0 items-center gap-2 text-sm text-[hsl(0,0%,40%)] hover:text-primary transition-colors">
                          <span>Learn more</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </CalendlyButton>
                      </div>
                      
                      {/* Description */}
                      <p className="text-[hsl(0,0%,40%)] text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
                        {service.description}
                      </p>

                      {/* Stat */}
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl md:text-5xl font-bold text-primary">{service.stat}</span>
                        <span className="text-[hsl(0,0%,40%)] text-sm">{service.statLabel}</span>
                      </div>

                      {/* Mobile Learn More */}
                      <CalendlyButton className="md:hidden mt-6 flex items-center gap-2 text-sm text-[hsl(0,0%,40%)] hover:text-primary transition-colors">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4" />
                      </CalendlyButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Last Dotted Line */}
          <div className="dotted-line-light mt-12" />
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="bg-[hsl(0,0%,96%)] py-24">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 transition-all duration-700 ${
            testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div>
              <span className="text-[hsl(0,0%,40%)] text-sm font-mono mb-4 block">[ Testimonials ]</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[hsl(0,0%,8%)]">
                +250 <span className="serif-italic text-primary">Satisfied</span> Clients
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
                className={`bg-white rounded-2xl p-8 border border-[hsl(0,0%,90%)] hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ${
                  testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-primary/20 mb-6" />
                
                {/* Content */}
                <p className="text-[hsl(0,0%,30%)] text-lg leading-relaxed mb-8">
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
                    className="w-14 h-14 rounded-full object-cover border-2 border-[hsl(0,0%,90%)]"
                  />
                  <div>
                    <div className="font-medium text-[hsl(0,0%,8%)]">{testimonial.name}</div>
                    <div className="text-sm text-[hsl(0,0%,50%)]">{testimonial.role}</div>
                  </div>
                </div>

                {/* Source */}
                <div className="mt-6 pt-6 border-t border-[hsl(0,0%,90%)]">
                  <span className="text-xs text-primary uppercase tracking-wider font-medium">
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