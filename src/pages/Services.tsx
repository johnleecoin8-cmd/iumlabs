import { useState, useEffect } from "react";
import { ArrowRight, Calendar, Star, Quote, Users, Megaphone, Building2, Mic2, Newspaper, MapPin, ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import CalendlyButton from "@/components/CalendlyButton";
import Planet3D from "@/components/Planet3D";
import sunCorona from "@/assets/backgrounds/sun-corona.jpg";


const services = [
  {
    icon: Users,
    title: "KOL Marketing",
    description: "Access 1000+ vetted Korean crypto influencers across YouTube, Twitter, and Telegram",
    stat: "1,000+",
    statLabel: "Verified KOLs",
    size: "large",
    color: "from-primary/20 to-primary/5",
    borderColor: "border-primary/20 hover:border-primary/40",
  },
  {
    icon: Megaphone,
    title: "Community Operation",
    description: "24/7 Korean community management with native speakers",
    stat: "500K+",
    statLabel: "Members Managed",
    size: "normal",
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
  },
  {
    icon: Building2,
    title: "Exchange Support",
    description: "VASP compliance and CEX/DEX listing support",
    stat: "100%",
    statLabel: "Success Rate",
    size: "normal",
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/20 hover:border-purple-500/40",
  },
  {
    icon: Newspaper,
    title: "Media & PR",
    description: "Coverage in top Korean crypto media outlets",
    stat: "50+",
    statLabel: "Publications",
    size: "normal",
    color: "from-orange-500/20 to-orange-500/5",
    borderColor: "border-orange-500/20 hover:border-orange-500/40",
  },
  {
    icon: Mic2,
    title: "AMA Hosting",
    description: "Live AMAs with Korean communities",
    stat: "200+",
    statLabel: "AMAs Hosted",
    size: "normal",
    color: "from-cyan-500/20 to-cyan-500/5",
    borderColor: "border-cyan-500/20 hover:border-cyan-500/40",
  },
  {
    icon: MapPin,
    title: "Offline Events",
    description: "Side events, meetups, and conference presence in Seoul",
    stat: "20+",
    statLabel: "Events Per Year",
    size: "large",
    color: "from-rose-500/20 to-rose-500/5",
    borderColor: "border-rose-500/20 hover:border-rose-500/40",
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

const floatingTags = [
  { label: "Responsible", top: "22%", left: "6%", mobileTop: "12%", mobileLeft: "3%", color: "bg-orange-400 text-white" },
  { label: "Creative", top: "32%", left: "22%", mobileTop: "15%", mobileRight: "3%", color: "bg-yellow-400 text-black" },
  { label: "Innovation-Oriented", top: "42%", left: "2%", mobileTop: "75%", mobileLeft: "3%", color: "bg-amber-300 text-black" },
  { label: "Resourceful", top: "48%", left: "28%", mobileBottom: "18%", mobileRight: "3%", color: "bg-red-400 text-white" },
  { label: "Strategic", bottom: "28%", left: "25%", mobileBottom: "10%", mobileLeft: "3%", color: "bg-orange-300 text-black" },
  { label: "Trusted", top: "20%", right: "15%", color: "bg-yellow-300 text-black" },
  { label: "Attention to Detail", top: "30%", right: "5%", color: "bg-amber-400 text-black" },
  { label: "Innovative", top: "48%", right: "8%", color: "bg-orange-500 text-white" },
  { label: "Result-Driven Mindset", bottom: "22%", right: "18%", color: "bg-yellow-500 text-black" },
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
        
        {/* Floating Tags with Parallax - Colorful */}
        <div>
          {floatingTags.map((tag, index) => (
            <span
              key={`${tag.label}-${index}`}
              className={`absolute animate-float hidden sm:block px-4 py-2 rounded-md text-sm font-medium shadow-lg ${tag.color}`}
              style={{
                top: tag.top,
                left: tag.left,
                right: tag.right,
                bottom: tag.bottom,
                animationDelay: `${index * 0.3}s`,
                transform: `translateY(${scrollY * 0.05}px)`,
              }}
            >
              {tag.label}
            </span>
          ))}
          {/* Mobile floating tags */}
          {floatingTags.slice(0, 4).map((tag, index) => (
            <span
              key={`mobile-${tag.label}-${index}`}
              className={`absolute animate-float sm:hidden px-3 py-1.5 rounded-md text-xs font-medium shadow-lg ${tag.color}`}
              style={{
                top: tag.mobileTop,
                left: tag.mobileLeft,
                right: tag.mobileRight,
                bottom: tag.mobileBottom,
                animationDelay: `${index * 0.3}s`,
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

      {/* Services List - Bento Grid Style */}
      <section ref={servicesRef} className="py-32 px-4 bg-[hsl(0,0%,4%)]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left - Vertical Title */}
            <div className={`lg:col-span-3 transition-all duration-700 ${servicesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="lg:sticky lg:top-32">
                <span className="text-xs font-medium text-primary mb-4 block tracking-widest uppercase">
                  What We Do
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Our <span className="text-primary">Services</span>
                </h2>
                <p className="text-white/50 mb-8 max-w-sm">
                  End-to-end Web3 marketing solutions tailored for the Korean market
                </p>
                <Link 
                  to="/services" 
                  className="group inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  Explore all services
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right - Bento Grid */}
            <div className="lg:col-span-9">
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`group relative p-8 rounded-2xl bg-gradient-to-br ${service.color} border ${service.borderColor} transition-all duration-500 hover:-translate-y-1 ${
                      service.size === 'large' ? 'md:col-span-2' : ''
                    } ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <service.icon className="w-7 h-7 text-white transition-all duration-300 group-hover:scale-110 group-hover:text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-white/50 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Stat */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">{service.stat}</span>
                      <span className="text-white/40 text-sm">{service.statLabel}</span>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-5 h-5 text-white/40" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Dark Theme */}
      <section ref={testimonialsRef} className="bg-[hsl(0,0%,6%)] py-24">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 transition-all duration-700 ${
            testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div>
              <span className="text-white/40 text-sm font-mono mb-4 block">[ Testimonials ]</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white">
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
                className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/30 hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 ${
                  testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-primary/30 mb-6" />
                
                {/* Content */}
                <p className="text-white/70 text-lg leading-relaxed mb-8">
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
                    className="w-14 h-14 rounded-full object-cover border-2 border-white/10"
                  />
                  <div>
                    <div className="font-medium text-white">{testimonial.name}</div>
                    <div className="text-sm text-white/50">{testimonial.role}</div>
                  </div>
                </div>

                {/* Source */}
                <div className="mt-6 pt-6 border-t border-white/10">
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