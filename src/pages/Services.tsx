import { useState, useEffect } from "react";
import { ArrowRight, Calendar, Star, Quote, Shield, ExternalLink, Mail, Send, Phone, Lightbulb, Rocket, Target, Globe } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CalendlyButton from "@/components/CalendlyButton";
import Planet3D from "@/components/Planet3D";
import TeamContactCard from "@/components/TeamContactCard";
import ClientLogoMarquee from "@/components/ClientLogoMarquee";
import SectionBackground from "@/components/SectionBackground";
import FloatingSectionElements from "@/components/FloatingSectionElements";
import GiantSectionTitle from "@/components/GiantSectionTitle";
import GlowCard from "@/components/GlowCard";
import { brand } from "@/config/content";
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
    link: "https://www.trustpilot.com",
  },
  {
    name: "Sarah Kim",
    role: "Founder, KimchiSwap",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    content: "The team's DeFi expertise and KOL network helped us achieve $100M TVL within the first month of launch. Highly recommend!",
    rating: 5,
    source: "Ethos",
    link: "https://www.ethos.io",
  },
  {
    name: "Michael Park",
    role: "CMO, Seoul DAO",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    content: "Professional, responsive, and results-driven. They know exactly how to position Web3 projects for the Korean audience.",
    rating: 5,
    source: "Trustpilot",
    link: "https://www.trustpilot.com",
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

const teamMembers = [
  {
    name: "James",
    role: "Co-Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    telegram: "https://t.me/cryptobridgekorea",
    linkedin: "https://www.linkedin.com/in/james-l-13a998251/",
    email: "james@cryptobridgekorea.com",
  },
  {
    name: "David",
    role: "Co-Founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    telegram: "https://t.me/cryptobridgekorea",
    linkedin: "https://www.linkedin.com/company/cryptobridge",
    email: "david@cryptobridgekorea.com",
  },
];

const Services = () => {
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation();
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation();
  const { ref: contactRef, isVisible: contactVisible } = useScrollAnimation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background" id="main-content">
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

      {/* Services List - Sun Theme with Enhanced Background */}
      <section ref={servicesRef} className="section-sun-light py-24 relative">
        {/* Dynamic Background Effects */}
        <SectionBackground type="gradient-mesh" theme="sun" intensity={0.6} />
        <SectionBackground type="glow-orbs" theme="sun" intensity={0.4} />
        
        {/* Floating Elements */}
        <FloatingSectionElements
          scrollY={scrollY}
          parallaxMultiplier={0.03}
          elements={[
            { type: "icon", content: <Lightbulb className="w-5 h-5" />, position: { top: "10%", left: "3%" }, color: "bg-amber-100/80 text-amber-600" },
            { type: "icon", content: <Rocket className="w-5 h-5" />, position: { top: "30%", right: "4%" }, color: "bg-orange-100/80 text-orange-600" },
            { type: "icon", content: <Target className="w-5 h-5" />, position: { bottom: "25%", left: "5%" }, color: "bg-yellow-100/80 text-yellow-600" },
            { type: "tag", content: "Growth", position: { top: "20%", right: "10%" }, color: "bg-amber-50/90 text-amber-700" },
            { type: "tag", content: "Strategy", position: { bottom: "35%", right: "3%" }, color: "bg-orange-50/90 text-orange-700" },
            { type: "tag", content: "Results", position: { top: "50%", left: "2%" }, color: "bg-yellow-50/90 text-yellow-700" },
          ]}
        />
        
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
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
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
                        <CalendlyButton className="hidden md:flex shrink-0 items-center gap-2 text-sm text-[hsl(0,0%,40%)] hover:text-primary transition-colors group/link">
                          <span>Learn more</span>
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
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

      {/* Testimonials Section - with Enhanced Background */}
      <section ref={testimonialsRef} className="section-sun-dark py-24 relative">
        {/* Dynamic Background Effects */}
        <SectionBackground type="stars" theme="sun" intensity={0.8} />
        <SectionBackground type="aurora" theme="sun" intensity={0.5} />
        <SectionBackground type="glow-orbs" theme="sun" intensity={0.3} />
        
        {/* Floating Elements */}
        <FloatingSectionElements
          scrollY={scrollY}
          parallaxMultiplier={0.04}
          elements={[
            { type: "icon", content: <Star className="w-5 h-5 fill-current" />, position: { top: "12%", left: "5%" }, color: "bg-amber-500/20 text-amber-400", delay: 0 },
            { type: "icon", content: <Quote className="w-5 h-5" />, position: { top: "18%", right: "8%" }, color: "bg-yellow-500/20 text-yellow-400", delay: 0.5 },
            { type: "shape", content: "★", position: { top: "45%", left: "2%" }, color: "text-amber-400", size: "lg", delay: 1 },
            { type: "tag", content: "5★ Rated", position: { bottom: "20%", right: "5%" }, color: "bg-amber-500/20 text-amber-300", delay: 1.5 },
            { type: "shape", content: "✦", position: { bottom: "30%", left: "8%" }, color: "text-yellow-400", size: "md", delay: 2 },
          ]}
        />
        
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          {/* Giant Section Title */}
          <GiantSectionTitle
            title="+250 Satisfied Clients"
            accentWord="Satisfied"
            size="xl"
            theme="dark"
            subtitle="[ Testimonials ]"
          />
          
          {/* Trust Badges */}
          <div className="flex items-center gap-4 mb-12">
            <a 
              href="https://www.trustpilot.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#00b67a]/20 border border-[#00b67a]/30 rounded-xl hover:bg-[#00b67a]/30 transition-colors"
            >
              <Shield className="w-5 h-5 text-[#00b67a]" />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#00b67a] fill-[#00b67a]" />
                ))}
              </div>
              <span className="text-white text-sm font-medium">Trustpilot</span>
              <ExternalLink className="w-3 h-3 text-white/50" />
            </a>
          </div>

          {/* Testimonials Grid with GlowCard */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <GlowCard
                key={index}
                className="rounded-2xl"
                glowColor="hsl(45, 100%, 50%)"
                intensity="medium"
                tiltEnabled={true}
                hoverScale={1.02}
              >
                <a
                  href={testimonial.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block testimonial-card-premium cursor-pointer h-full ${
                    testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Quote Icon Enhanced */}
                  <div className="quote-icon-enhanced">
                    <Quote className="w-5 h-5" />
                  </div>
                  
                  {/* Content */}
                  <p className="text-white/70 text-lg leading-relaxed mb-8 mt-4">
                    "{testimonial.content}"
                  </p>

                  {/* Rating Enhanced */}
                  <div className="rating-stars-enhanced mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="transition-transform group-hover:scale-110" style={{ transitionDelay: `${i * 50}ms` }} />
                    ))}
                  </div>

                  {/* Author with Avatar Ring Enhanced */}
                  <div className="flex items-center gap-4">
                    <div className="avatar-ring-enhanced">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-white">{testimonial.name}</div>
                      <div className="text-sm text-white/50">{testimonial.role}</div>
                    </div>
                  </div>

                  {/* Source */}
                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="tag-pill-enhanced">
                      Reviewed on {testimonial.source}
                    </span>
                    <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-amber-400 transition-colors" />
                  </div>
                </a>
              </GlowCard>
            ))}
          </div>

          {/* See All Reviews */}
          <div className="mt-12 text-center">
            <a 
              href="https://www.trustpilot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/60 hover:text-amber-400 transition-colors"
            >
              <span>See all reviews</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="section-sun-light py-24">
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className={`grid lg:grid-cols-2 gap-16 transition-all duration-700 ${
            contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            {/* Left - Info */}
            <div>
              <span className="text-[hsl(0,0%,40%)] text-sm font-mono mb-4 block">[ Get in Touch ]</span>
              <h2 className="text-4xl md:text-5xl font-light text-[hsl(0,0%,8%)] mb-6">
                Ready to grow in <span className="serif-italic text-primary">Korea</span>?
              </h2>
              <p className="text-[hsl(0,0%,40%)] text-lg mb-8 max-w-md">
                Talk directly with our founders and get a customized strategy for your project.
              </p>

              {/* Team Cards */}
              <div className="space-y-4 mb-8">
                {teamMembers.map((member) => (
                  <div 
                    key={member.name}
                    className="bg-[hsl(0,0%,8%)] rounded-2xl p-6"
                  >
                    <TeamContactCard {...member} />
                  </div>
                ))}
              </div>

              {/* Direct Contact */}
              <div className="space-y-3">
                <a 
                  href={`mailto:${brand.email}`}
                  className="flex items-center gap-3 text-[hsl(0,0%,40%)] hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{brand.email}</span>
                </a>
                <a 
                  href={brand.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[hsl(0,0%,40%)] hover:text-primary transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>{brand.telegram}</span>
                </a>
                <a 
                  href={`tel:${brand.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-[hsl(0,0%,40%)] hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{brand.phone}</span>
                </a>
              </div>
            </div>

            {/* Right - CTA */}
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-10 text-white w-full">
                <h3 className="text-3xl font-light mb-4">
                  Book a <span className="serif-italic">Free</span> Consultation
                </h3>
                <p className="text-white/80 mb-8">
                  Get a 30-minute strategy session with our team. We'll analyze your project and provide actionable insights for the Korean market.
                </p>
                <CalendlyButton className="w-full bg-white text-primary hover:bg-white/90 py-4 px-8 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                  <Calendar className="w-5 h-5" />
                  <span>Schedule a Call</span>
                </CalendlyButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="bg-background py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-7xl">
          <ClientLogoMarquee variant="dark" speed="slow" showLabel={true} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
