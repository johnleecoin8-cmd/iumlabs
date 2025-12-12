import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { ArrowUpRight, Calendar } from "lucide-react";
import CalendlyButton from "@/components/CalendlyButton";
import { Link } from "react-router-dom";
import seoulHanriverTwilight from "@/assets/backgrounds/seoul-hanriver-twilight.jpg";

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

// Import background images
import bnbBg from "@/assets/projects/bnb-bg.jpg";
import kucoinBg from "@/assets/projects/kucoin-bg.jpg";
import polygonBg from "@/assets/projects/polygon-bg.jpg";
import ondoBg from "@/assets/projects/ondo-bg.jpg";
import peaqBg from "@/assets/projects/peaq-bg.jpg";
import storyBg from "@/assets/projects/story-bg.jpg";
import megaethBg from "@/assets/projects/megaeth-bg.jpg";
import triaBg from "@/assets/projects/tria-bg.jpg";
import bybitBg from "@/assets/projects/bybit-bg.jpg";

const cases = [
  {
    name: "BNB Chain",
    logo: bnbLogo,
    bgImage: bnbBg,
    slug: "bnb-chain",
    result: "+340% Korean Trading Volume",
    category: "Infrastructure",
    glowColor: "#F3BA2F",
    description: "Full Korean market entry including KOL campaigns, community setup, and comprehensive PR coverage.",
    services: ["KOL Marketing", "Community Building", "PR & Media"],
  },
  {
    name: "KuCoin",
    logo: kucoinLogo,
    bgImage: kucoinBg,
    slug: "kucoin",
    result: "50K+ New Korean Users",
    category: "Exchange",
    glowColor: "#23AF91",
    description: "Successful market launch with Korean trader-focused campaigns and ambassador partnerships.",
    services: ["User Acquisition", "Ambassador Program", "Localization"],
  },
  {
    name: "Polygon",
    logo: polygonLogo,
    bgImage: polygonBg,
    slug: "polygon",
    result: "$2M Korean TVL in 30 Days",
    category: "Layer 2",
    glowColor: "#8247E5",
    description: "Community growth from 0 to 50K Korean users with targeted developer relations and DeFi marketing.",
    services: ["Developer Relations", "DeFi Marketing", "Event Management"],
  },
  {
    name: "Ondo Finance",
    logo: ondoLogo,
    bgImage: ondoBg,
    slug: "ondo",
    result: "100K+ Korean Community",
    category: "RWA",
    glowColor: "#3B82F6",
    description: "RWA education campaign targeting both retail and institutional Korean investors.",
    services: ["Institutional Relations", "Content Marketing", "PR Strategy"],
  },
  {
    name: "Peaq",
    logo: peaqLogo,
    bgImage: peaqBg,
    slug: "peaq",
    result: "#1 DePIN in Korea",
    category: "DePIN",
    glowColor: "#00CED1",
    description: "Established thought leadership in DePIN space with IoT partnerships and developer community.",
    services: ["Brand Positioning", "Developer Relations", "Partnership Development"],
  },
  {
    name: "Story Protocol",
    logo: storyLogo,
    bgImage: storyBg,
    slug: "story-protocol",
    result: "5K+ Korean Creators",
    category: "IP Protocol",
    glowColor: "#FF6B9D",
    description: "Korean content creator onboarding for IP tokenization platform targeting webtoon and music artists.",
    services: ["Creator Relations", "Platform Marketing", "Ambassador Program"],
  },
  {
    name: "MegaETH",
    logo: megaethLogo,
    bgImage: megaethBg,
    slug: "megaeth",
    result: "+500% Korean Engagement",
    category: "Layer 2",
    glowColor: "#4169E1",
    description: "Pre-launch hype building and community engagement ahead of mainnet launch.",
    services: ["Pre-Launch Marketing", "Community Building", "Media Relations"],
  },
  {
    name: "Tria",
    logo: triaLogo,
    bgImage: triaBg,
    slug: "tria",
    result: "30K+ Korean Wallets",
    category: "Wallet",
    glowColor: "#FF7F50",
    description: "User acquisition campaign with simplified onboarding for Korean Web3 wallet users.",
    services: ["User Acquisition", "Product Marketing", "Partnership Development"],
  },
  {
    name: "Bybit",
    logo: bybitLogo,
    bgImage: bybitBg,
    slug: "bybit",
    result: "#2 Korean Exchange Traffic",
    category: "Exchange",
    glowColor: "#F7931A",
    description: "Multi-channel user acquisition and VIP program for Korean high-volume traders.",
    services: ["Market Entry Strategy", "User Acquisition", "VIP Relations"],
  },
];

const stats = [
  { value: "$500M+", label: "Total Value Marketed" },
  { value: "200+", label: "Projects Launched" },
  { value: "500K+", label: "Community Members" },
];

const floatingTags = [
  { label: "DeFi", top: "16%", left: "5%" },
  { label: "Layer 1", top: "28%", left: "16%" },
  { label: "GameFi", top: "46%", left: "4%" },
  { label: "NFT", top: "56%", left: "12%" },
  { label: "Infrastructure", top: "14%", right: "10%" },
  { label: "Exchange", top: "28%", right: "5%" },
  { label: "Layer 2", top: "46%", right: "8%" },
  { label: "DePIN", top: "60%", right: "14%" },
  { label: "RWA", top: "38%", left: "8%" },
];

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();
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
        {/* Background - Seoul Hanriver Twilight */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-kenburns"
            style={{ 
              backgroundImage: `url(${seoulHanriverTwilight})`,
              filter: "brightness(0.5) saturate(1.2)",
            }}
          />
          
          {/* Aurora light overlay - Blue/Cyan river theme */}
          <div className="absolute inset-0 animate-aurora">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/25 via-transparent to-cyan-500/20" />
            <div className="absolute inset-0 bg-gradient-to-bl from-indigo-600/20 via-transparent to-sky-500/15" />
          </div>
          
          {/* Light sweep effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent animate-light-sweep" />
          </div>
          
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.2)] via-transparent to-[hsl(0,0%,4%,0.9)]" />
        </div>
        
        {/* Floating Tags - lunar-tag-dark style */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          {floatingTags.map((tag, index) => (
            <div
              key={tag.label}
              className="absolute lunar-tag-dark text-xs whitespace-nowrap animate-float pointer-events-auto cursor-default hover:bg-white/10 transition-colors"
              style={{
                top: tag.top,
                left: tag.left,
                right: tag.right,
                animationDelay: `${index * 0.3}s`,
                animationDuration: `${4 + index * 0.5}s`,
              }}
            >
              {tag.label}
            </div>
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
          
          <div className="pt-8 border-t border-white/10 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <p className="text-lg text-white/60 max-w-xl">
              These case studies walk through the challenge, our approach, and the outcomes across services like GTM, KOLs, PR, and social media.
            </p>
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

      {/* Projects Grid */}
      <section ref={ref} className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((caseItem, index) => (
              <Link
                key={caseItem.name}
                to={`/projects/${caseItem.slug}`}
                onClick={() => window.scrollTo(0, 0)}
                className={`group cursor-pointer transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div 
                  className="relative aspect-square rounded-3xl overflow-hidden mb-4 transition-all duration-500 hover:-translate-y-2"
                  style={{ boxShadow: `0 4px 30px ${caseItem.glowColor}20` }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 10px 60px ${caseItem.glowColor}50, 0 0 100px ${caseItem.glowColor}30`}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 4px 30px ${caseItem.glowColor}20`}
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${caseItem.bgImage})` }}
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Project Color Glow Effect on Hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at 50% 50%, ${caseItem.glowColor}30 0%, transparent 70%)`,
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
                    {/* Logo */}
                    <img
                      src={caseItem.logo}
                      alt={caseItem.name}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain filter brightness-0 invert mb-4 group-hover:scale-110 transition-transform duration-300"
                      style={{ filter: `brightness(0) invert(1) drop-shadow(0 0 20px ${caseItem.glowColor}80)` }}
                    />
                    
                    {/* Project Name */}
                    <h3 className="text-white text-2xl md:text-3xl font-bold text-center tracking-tight drop-shadow-lg">
                      {caseItem.name}
                    </h3>
                  </div>

                  {/* Bottom Info - Result with Project Color */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-semibold text-center" style={{ color: caseItem.glowColor }}>
                      {caseItem.result}
                    </p>
                    <p className="text-white/70 text-xs text-center mt-1 uppercase tracking-wider">
                      {caseItem.category}
                    </p>
                  </div>

                  {/* Hover Arrow with Project Color */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${caseItem.glowColor}30`, backdropFilter: 'blur(8px)' }}
                    >
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Category Badge with Project Color Border */}
                  <div className="absolute top-4 left-4">
                    <span 
                      className="px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm text-xs text-white/80 uppercase tracking-wider"
                      style={{ border: `1px solid ${caseItem.glowColor}40` }}
                    >
                      {caseItem.category}
                    </span>
                  </div>
                </div>

                {/* Text Below Card */}
                <div className="px-2">
                  <h3 
                    className="text-xl font-medium text-white mb-1 transition-colors"
                    style={{ '--hover-color': caseItem.glowColor } as React.CSSProperties}
                    onMouseEnter={(e) => e.currentTarget.style.color = caseItem.glowColor}
                    onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  >
                    {caseItem.name}
                  </h3>
                  <p className="text-white/50 text-sm line-clamp-2">
                    {caseItem.description}
                  </p>
                </div>
              </Link>
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