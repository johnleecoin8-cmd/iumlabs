import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import TiltCard from "@/components/TiltCard";
import { ArrowUpRight, Calendar, Star, Quote, Filter, Layers, Zap, Trophy } from "lucide-react";
import CalendlyButton from "@/components/CalendlyButton";
import { Link } from "react-router-dom";
import Planet3D from "@/components/Planet3D";
import SectionBackground from "@/components/SectionBackground";
import FloatingSectionElements from "@/components/FloatingSectionElements";
import GiantSectionTitle from "@/components/GiantSectionTitle";
import GlowCard from "@/components/GlowCard";
import saturnRings from "@/assets/backgrounds/saturn-rings.jpg";

// Import logos
import bnbLogo from "@/assets/logos/bnb.svg";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import peaqLogo from "@/assets/logos/peaq.png";
import storyLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria.png";
import bybitLogo from "@/assets/logos/bybit.png";

// Import campaign images
import bnbCampaign from "@/assets/campaigns/bnb-event.jpg";
import kucoinCampaign from "@/assets/campaigns/kucoin-campaign.jpg";
import polygonCampaign from "@/assets/campaigns/polygon-hackathon.jpg";
import ondoCampaign from "@/assets/campaigns/ondo-seminar.jpg";
import peaqCampaign from "@/assets/campaigns/peaq-summit.jpg";
import storyCampaign from "@/assets/campaigns/story-workshop.jpg";
import megaethCampaign from "@/assets/campaigns/megaeth-launch.jpg";
import triaCampaign from "@/assets/campaigns/tria-launch.jpg";
import bybitCampaign from "@/assets/campaigns/bybit-competition.jpg";

const categories = ["All", "Infrastructure", "Exchange", "Layer 2", "RWA", "DePIN", "Wallet"];

const cases = [
  {
    name: "BNB Chain",
    logo: bnbLogo,
    image: bnbCampaign,
    slug: "bnb-chain",
    result: "+340% Korean Trading Volume",
    category: "Infrastructure",
    bgStyle: "bg-gradient-to-br from-[#F3BA2F] via-[#F0B90B] to-[#C99100]",
    decorations: "bnb",
    description: "Full Korean market entry including KOL campaigns, community setup, and comprehensive PR coverage.",
    services: ["KOL Marketing", "Community Building", "PR & Media"],
  },
  {
    name: "KuCoin",
    logo: kucoinLogo,
    image: kucoinCampaign,
    slug: "kucoin",
    result: "50K+ New Korean Users",
    category: "Exchange",
    bgStyle: "bg-gradient-to-br from-[#23AF91] via-[#1A9B7F] to-[#147A63]",
    decorations: "kucoin",
    description: "Successful market launch with Korean trader-focused campaigns and ambassador partnerships.",
    services: ["User Acquisition", "Ambassador Program", "Localization"],
  },
  {
    name: "Polygon",
    logo: polygonLogo,
    image: polygonCampaign,
    slug: "polygon",
    result: "$2M Korean TVL in 30 Days",
    category: "Layer 2",
    bgStyle: "bg-gradient-to-br from-[#8247E5] via-[#7B3FE4] to-[#5A2D9C]",
    decorations: "polygon",
    description: "Community growth from 0 to 50K Korean users with targeted developer relations and DeFi marketing.",
    services: ["Developer Relations", "DeFi Marketing", "Event Management"],
  },
  {
    name: "Ondo Finance",
    logo: ondoLogo,
    image: ondoCampaign,
    slug: "ondo",
    result: "100K+ Korean Community",
    category: "RWA",
    bgStyle: "bg-gradient-to-br from-[#0A1628] via-[#1E3A5F] to-[#0D1B2A]",
    decorations: "ondo",
    description: "RWA education campaign targeting both retail and institutional Korean investors.",
    services: ["Institutional Relations", "Content Marketing", "PR Strategy"],
  },
  {
    name: "Peaq",
    logo: peaqLogo,
    image: peaqCampaign,
    slug: "peaq",
    result: "#1 DePIN in Korea",
    category: "DePIN",
    bgStyle: "bg-gradient-to-br from-[#00E5A0] via-[#00D4AA] to-[#00A080]",
    decorations: "peaq",
    description: "Established thought leadership in DePIN space with IoT partnerships and developer community.",
    services: ["Brand Positioning", "Developer Relations", "Partnership Development"],
  },
  {
    name: "Story Protocol",
    logo: storyLogo,
    image: storyCampaign,
    slug: "story-protocol",
    result: "5K+ Korean Creators",
    category: "Infrastructure",
    bgStyle: "bg-gradient-to-br from-[#FF6B6B] via-[#E5484D] to-[#C92A2A]",
    decorations: "story",
    description: "Korean content creator onboarding for IP tokenization platform targeting webtoon and music artists.",
    services: ["Creator Relations", "Platform Marketing", "Ambassador Program"],
  },
  {
    name: "MegaETH",
    logo: megaethLogo,
    image: megaethCampaign,
    slug: "megaeth",
    result: "+500% Korean Engagement",
    category: "Layer 2",
    bgStyle: "bg-gradient-to-br from-[#1a1a2e] via-[#3C4DBB] to-[#627EEA]",
    decorations: "megaeth",
    description: "Pre-launch hype building and community engagement ahead of mainnet launch.",
    services: ["Pre-Launch Marketing", "Community Building", "Media Relations"],
  },
  {
    name: "Tria",
    logo: triaLogo,
    image: triaCampaign,
    slug: "tria",
    result: "30K+ Korean Wallets",
    category: "Wallet",
    bgStyle: "bg-gradient-to-br from-[#FF9500] via-[#FFB347] to-[#FF7F00]",
    decorations: "tria",
    description: "User acquisition campaign with simplified onboarding for Korean Web3 wallet users.",
    services: ["User Acquisition", "Product Marketing", "Partnership Development"],
  },
  {
    name: "Bybit",
    logo: bybitLogo,
    image: bybitCampaign,
    slug: "bybit",
    result: "#2 Korean Exchange Traffic",
    category: "Exchange",
    bgStyle: "bg-gradient-to-br from-[#F7A600] via-[#FFB800] to-[#E69500]",
    decorations: "bybit",
    description: "Multi-channel user acquisition and VIP program for Korean high-volume traders.",
    services: ["Market Entry Strategy", "User Acquisition", "VIP Relations"],
  },
];

const testimonials = [
  {
    name: "Alex Chen",
    role: "CEO, MetaVerse Korea",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content: "CryptoBridge helped us raise $12M and build a community of 50K+ members in just 3 months.",
    rating: 5,
  },
  {
    name: "Sarah Kim",
    role: "Founder, KimchiSwap",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    content: "The team's DeFi expertise helped us achieve $100M TVL within the first month of launch.",
    rating: 5,
  },
];

const stats = [
  { value: "$500M+", label: "Total Value Marketed" },
  { value: "200+", label: "Projects Launched" },
  { value: "500K+", label: "Community Members" },
];

const floatingTags = [
  { label: "DeFi", top: "18%", left: "5%", mobileTop: "12%", mobileLeft: "3%", color: "bg-purple-400 text-white" },
  { label: "Layer 1", top: "30%", left: "18%", mobileTop: "15%", mobileRight: "3%", color: "bg-pink-400 text-white" },
  { label: "GameFi", top: "48%", left: "4%", mobileTop: "75%", mobileLeft: "3%", color: "bg-fuchsia-400 text-white" },
  { label: "NFT", top: "52%", left: "22%", color: "bg-violet-300 text-black" },
  { label: "Infrastructure", top: "16%", right: "12%", color: "bg-purple-300 text-black" },
  { label: "Exchange", top: "30%", right: "5%", color: "bg-pink-300 text-black" },
  { label: "Layer 2", top: "48%", right: "8%", color: "bg-fuchsia-300 text-black" },
  { label: "DePIN", bottom: "28%", right: "15%", color: "bg-violet-500 text-white" },
  { label: "RWA", bottom: "32%", left: "12%", color: "bg-pink-500 text-white" },
];

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation();
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredCases = selectedCategory === "All" 
    ? cases 
    : cases.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background" id="main-content">
      <Navbar />
      
      {/* Hero - Full Screen with Ken Burns Background */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background - Saturn Rings */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-kenburns"
            style={{ 
              backgroundImage: `url(${saturnRings})`,
              filter: "brightness(0.7) saturate(1.2)",
            }}
          />
          
          {/* Aurora light overlay - Saturn purple/pink theme */}
          <div className="absolute inset-0 animate-aurora">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-transparent to-pink-500/20" />
            <div className="absolute inset-0 bg-gradient-to-bl from-violet-600/25 via-transparent to-fuchsia-500/15" />
          </div>
          
          {/* Light sweep effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent animate-light-sweep" />
          </div>
          
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.2)] via-transparent to-[hsl(0,0%,4%,0.9)]" />
          
          {/* 3D Planet */}
          <Planet3D type="saturn" className="opacity-70" />
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
          {floatingTags.slice(0, 4).map((tag, index) => (
            <span
              key={`mobile-${tag.label}-${index}`}
              className={`absolute animate-float sm:hidden px-3 py-1.5 rounded-md text-xs font-medium shadow-lg ${tag.color}`}
              style={{
                top: tag.mobileTop,
                left: tag.mobileLeft,
                right: tag.mobileRight,
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
            <span className="text-sm text-white/50 mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>[ Our Work ]</span>
            <h1 className="text-[12vw] md:text-[150px] lg:text-[180px] font-light text-white leading-[0.85] tracking-tight opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Ca<span className="serif-italic text-primary">s</span>es
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-white/10 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <p className="text-lg text-white/60 max-w-xl">
              Explore our portfolio of successful Web3 projects launched in the Korean market.
            </p>
            <CalendlyButton className="lunar-btn">
              <Calendar className="w-4 h-4" />
              <span>Start Your Project</span>
            </CalendlyButton>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10 opacity-0 animate-fade-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-background py-8 px-4 sticky top-0 z-30 border-b border-white/10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-2 text-white/40 shrink-0">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter:</span>
            </div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid - Saturn Theme with Enhanced Background */}
      <section ref={ref} className="section-saturn-dark py-16 px-4 relative">
        {/* Dynamic Background Effects */}
        <SectionBackground type="stars" theme="saturn" intensity={0.7} />
        <SectionBackground type="aurora" theme="saturn" intensity={0.4} />
        <SectionBackground type="particles" theme="saturn" intensity={0.5} />
        
        {/* Floating Elements */}
        <FloatingSectionElements
          scrollY={scrollY}
          parallaxMultiplier={0.03}
          elements={[
            { type: "icon", content: <Layers className="w-5 h-5" />, position: { top: "8%", left: "3%" }, color: "bg-purple-500/20 text-purple-400" },
            { type: "icon", content: <Zap className="w-5 h-5" />, position: { top: "25%", right: "4%" }, color: "bg-pink-500/20 text-pink-400" },
            { type: "icon", content: <Trophy className="w-5 h-5" />, position: { bottom: "30%", left: "5%" }, color: "bg-fuchsia-500/20 text-fuchsia-400" },
            { type: "tag", content: "200+", position: { top: "15%", right: "10%" }, color: "bg-purple-500/20 text-purple-300" },
            { type: "tag", content: "Success", position: { bottom: "20%", right: "3%" }, color: "bg-pink-500/20 text-pink-300" },
            { type: "shape", content: "◆", position: { top: "45%", left: "2%" }, color: "text-violet-400", size: "lg" },
          ]}
        />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((caseItem, index) => (
              <Link
                key={caseItem.name}
                to={`/projects/${caseItem.slug}`}
                className={`group cursor-pointer transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <TiltCard
                  className={`relative aspect-square rounded-3xl overflow-hidden ${caseItem.bgStyle}`}
                  max={12}
                  scale={1.03}
                  speed={300}
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                    style={{ backgroundImage: `url(${caseItem.image})` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col p-6 z-10">
                    {/* Category Badge */}
                    <div className="flex justify-between items-start">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                        {caseItem.category}
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                    
                    {/* Logo */}
                    <div className="flex-1 flex items-center justify-center">
                      <img
                        src={caseItem.logo}
                        alt={caseItem.name}
                        className="h-16 md:h-20 w-auto object-contain filter brightness-0 invert drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Bottom Info */}
                    <div>
                      <h3 className="text-white text-xl font-medium mb-2">{caseItem.name}</h3>
                      <p className="text-white/60 text-sm mb-3 line-clamp-2">{caseItem.description}</p>
                      
                      {/* Service Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {caseItem.services.slice(0, 3).map((service) => (
                          <span 
                            key={service}
                            className="px-2 py-0.5 bg-white/10 rounded text-xs text-white/70"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                      
                      {/* Result */}
                      <div className="text-primary font-semibold">{caseItem.result}</div>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredCases.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/50 text-lg">No projects found in this category.</p>
              <button 
                onClick={() => setSelectedCategory("All")}
                className="mt-4 text-primary hover:underline"
              >
                View all projects
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="section-saturn-light py-24 px-4">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className={`mb-12 transition-all duration-700 ${
            testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="text-[hsl(0,0%,40%)] text-sm font-mono mb-4 block">[ Client Success ]</span>
            <h2 className="text-4xl md:text-5xl font-light text-[hsl(0,0%,8%)]">
              What our <span className="serif-italic text-primary">clients</span> say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg border border-slate-100 transition-all duration-500 ${
                  testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                <p className="text-[hsl(0,0%,30%)] text-lg leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-[hsl(0,0%,8%)]">{testimonial.name}</div>
                    <div className="text-sm text-[hsl(0,0%,50%)]">{testimonial.role}</div>
                  </div>
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

export default Projects;
