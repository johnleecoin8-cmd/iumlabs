import { useState, useEffect } from "react";
import { Palette, Users, Megaphone, BarChart3, Check, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import CalendlyButton from "@/components/CalendlyButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import constellationSpace from "@/assets/constellation-space.jpg";

const nftServices = [
  {
    number: "01",
    icon: Palette,
    title: "Art & Collection Strategy",
    description: "NFT artwork direction, roadmap design, utility planning",
  },
  {
    number: "02",
    icon: Users,
    title: "Community Building",
    description: "Discord/Twitter setup, whitelist management, community events",
  },
  {
    number: "03",
    icon: Megaphone,
    title: "Influencer Marketing",
    description: "NFT/Crypto KOL collaboration, partnerships, viral campaigns",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Minting & Secondary",
    description: "Minting strategy, pricing, secondary market management",
  },
];

const nftFeatures = [
  "Whitelist Campaign Planning & Management",
  "Discord Server Setup & 24/7 Management",
  "Twitter Spaces & AMA Sessions",
  "Crypto Media PR (Local/Global)",
  "NFT Marketplace Listing Support",
  "Collaborations & Partnerships",
  "Minting Website Development",
  "Secondary Market Promotion",
];

const floatingTags = [
  { label: "PFP Collection", top: "18%", left: "5%", mobileTop: "12%", mobileLeft: "3%" },
  { label: "Whitelist", top: "28%", right: "8%", mobileTop: "15%", mobileRight: "3%" },
  { label: "Discord", top: "52%", left: "4%", mobileTop: "75%", mobileLeft: "3%" },
  { label: "OpenSea", bottom: "32%", right: "6%", mobileBottom: "18%", mobileRight: "3%" },
];

const NFTService = () => {
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero - Full Screen with Parallax Background */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
          style={{ 
            backgroundImage: `url(${constellationSpace})`,
            filter: "brightness(0.35) saturate(1.2)",
            transform: `translateY(${scrollY * 0.3}px) scale(1.1)`
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.4)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
        
        {/* Floating Tags */}
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

        {/* Content */}
        <div className="container mx-auto max-w-7xl px-4 relative z-10 pt-32 pb-24">
          <div className="mb-16">
            <span className="text-sm text-white/50 mb-4 block">[ NFT Marketing ]</span>
            <h1 className="text-[12vw] md:text-[120px] lg:text-[150px] font-light text-white leading-[0.85] tracking-tight">
              NF<span className="serif-italic text-primary">T</span>s
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-white/10">
            <p className="text-lg text-white/60 max-w-xl">
              From successful NFT collection launches to long-term community growth — full-service marketing for NFT projects.
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
            {nftServices.map((service, index) => {
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

      {/* Features - Dark Theme */}
      <section ref={featuresRef} className="section-dark py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className={`mb-12 transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-sm text-white/50 mb-4 block">[ What's Included ]</span>
            <h2 className="text-4xl md:text-5xl font-light text-white">
              NFT Marketing <span className="serif-italic">Services</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {nftFeatures.map((feature, index) => (
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

      <CTASection />
      <Footer />
    </div>
  );
};

export default NFTService;
