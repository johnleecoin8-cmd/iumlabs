import { useState, useEffect } from "react";
import { TrendingUp, Shield, Coins, Zap, Check, Calendar, ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import CalendlyButton from "@/components/CalendlyButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import networkAbstract from "@/assets/network-abstract.jpg";

const defiServices = [
  {
    number: "01",
    icon: TrendingUp,
    title: "TVL Growth Strategies",
    description: "Liquidity provider acquisition, TVL growth campaigns, incentive programs",
  },
  {
    number: "02",
    icon: Shield,
    title: "Trust Building",
    description: "Audit report promotion, security communication, transparency marketing",
  },
  {
    number: "03",
    icon: Coins,
    title: "Token Marketing",
    description: "Token sale marketing, exchange listing support, tokenomics promotion",
  },
  {
    number: "04",
    icon: Zap,
    title: "Protocol Awareness",
    description: "Technical content creation, developer community, ecosystem expansion",
  },
];

const defiFeatures = [
  "DeFi-specialized Media PR",
  "Liquidity Mining Campaigns",
  "Token Sale & IDO/IEO Marketing",
  "Exchange Listing Consulting",
  "Technical Documentation & Tutorials",
  "Developer Community Building",
  "Partnership & Integration Promotion",
  "Protocol Update Communication",
];

const testimonials = [
  {
    quote: "CryptoBridge helped us achieve 300% TVL growth within 3 months of our Korean market entry.",
    author: "Protocol Lead",
    company: "Leading DeFi Protocol",
    metric: "+300% TVL",
  },
  {
    quote: "Their deep understanding of the Korean DeFi landscape was instrumental in our successful token launch.",
    author: "CEO",
    company: "DeFi Startup",
    metric: "$15M Raised",
  },
];

const floatingTags = [
  { label: "TVL Growth", top: "18%", left: "5%", mobileTop: "12%", mobileLeft: "3%" },
  { label: "Yield Farming", top: "28%", right: "8%", mobileTop: "15%", mobileRight: "3%" },
  { label: "Liquidity", top: "52%", left: "4%", mobileTop: "75%", mobileLeft: "3%" },
  { label: "Smart Contracts", bottom: "32%", right: "6%", mobileBottom: "18%", mobileRight: "3%" },
];

const DeFiService = () => {
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation();
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
        {/* Background with Ken Burns */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-kenburns"
            style={{ 
              backgroundImage: `url(${networkAbstract})`,
              filter: "brightness(0.3) saturate(1.3) hue-rotate(180deg)",
            }}
          />
          
          {/* Aurora light overlay */}
          <div className="absolute inset-0 animate-aurora">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-cyan-500/15" />
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/10 via-transparent to-blue-500/10" />
          </div>
          
          {/* Light sweep effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-light-sweep" />
          </div>
          
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.4)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
        </div>
        
        {/* Floating Tags with Parallax */}
        <div>
          {floatingTags.map((tag, index) => (
            <span
              key={tag.label}
              className="lunar-tag-dark absolute animate-float hidden sm:block"
              style={{
                top: tag.top,
                left: tag.left,
                right: tag.right,
                bottom: tag.bottom,
                animationDelay: `${index * 0.5}s`,
                transform: `translateY(${scrollY * 0.08}px)`,
              }}
            >
              {tag.label}
            </span>
          ))}
          {floatingTags.slice(0, 3).map((tag, index) => (
            <span
              key={`mobile-${tag.label}`}
              className="lunar-tag-dark absolute animate-float sm:hidden"
              style={{
                top: tag.mobileTop,
                left: tag.mobileLeft,
                right: tag.mobileRight,
                bottom: tag.mobileBottom,
                animationDelay: `${index * 0.5}s`,
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Content with Stagger Animation */}
        <div className="container mx-auto max-w-7xl px-4 relative z-10 pt-32 pb-24">
          <div className="mb-16">
            <span className="text-sm text-white/50 mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>[ DeFi Marketing ]</span>
            <h1 className="text-[12vw] md:text-[120px] lg:text-[150px] font-light text-white leading-[0.85] tracking-tight opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              De<span className="serif-italic text-primary">F</span>i
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-white/10 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <p className="text-lg text-white/60 max-w-xl">
              From TVL growth to exchange listings — strategic marketing partner for DeFi protocol growth.
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

      {/* Services Grid - Light Theme */}
      <section ref={servicesRef} className="section-light py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8">
            {defiServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.number}
                  className={`group bg-white border border-[hsl(var(--light-fg),0.1)] rounded-2xl p-8 hover:border-primary/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ${
                    servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-[hsl(var(--light-fg),0.4)]">[ {service.number} ]</span>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-[hsl(var(--light-fg))] mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[hsl(var(--light-fg),0.6)] text-sm">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features - Dark Theme with Aurora */}
      <section ref={featuresRef} className="relative section-dark py-24 px-4 overflow-hidden">
        {/* Aurora overlay for dark section */}
        <div className="absolute inset-0 animate-aurora pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-cyan-500/5" />
          <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/5 via-transparent to-blue-500/5" />
        </div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className={`mb-12 transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-sm text-white/50 mb-4 block">[ What's Included ]</span>
            <h2 className="text-4xl md:text-5xl font-light text-white">
              DeFi Marketing <span className="serif-italic">Services</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {defiFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`flex items-center gap-4 p-4 border border-white/10 rounded-xl hover:border-primary/40 hover:bg-white/5 transition-all duration-500 ${
                  featuresVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-white/80">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className={`mt-12 flex justify-center transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
            <Link to="/contact" className="lunar-btn-outline group">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - Light Theme */}
      <section ref={testimonialsRef} className="section-light py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className={`mb-12 transition-all duration-700 ${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-sm text-[hsl(var(--light-fg),0.4)] mb-4 block">[ Client Success ]</span>
            <h2 className="text-4xl md:text-5xl font-light text-[hsl(var(--light-fg))]">
              What Our <span className="serif-italic text-primary">Clients</span> Say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`relative bg-white border border-[hsl(var(--light-fg),0.1)] rounded-2xl p-8 transition-all duration-500 ${
                  testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
                <div className="mb-6">
                  <span className="text-3xl font-bold text-primary">{testimonial.metric}</span>
                </div>
                <p className="text-[hsl(var(--light-fg),0.7)] mb-6 italic">"{testimonial.quote}"</p>
                <div className="pt-4 border-t border-[hsl(var(--light-fg),0.1)]">
                  <p className="font-medium text-[hsl(var(--light-fg))]">{testimonial.author}</p>
                  <p className="text-sm text-[hsl(var(--light-fg),0.5)]">{testimonial.company}</p>
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

export default DeFiService;