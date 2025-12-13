import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

// Import logos
import bnbLogo from "@/assets/logos/bnb.svg";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import peaqLogo from "@/assets/logos/peaq.svg";
import storyLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria-official.png";
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

// Floating tags
const serviceTags = [
  { label: "DeFi", position: "top-[15%] left-[5%]" },
  { label: "Layer 1", position: "top-[35%] left-[4%]" },
  { label: "GameFi", position: "top-[55%] left-[6%]" },
  { label: "Infrastructure", position: "top-[18%] right-[6%]" },
  { label: "Exchange", position: "top-[42%] right-[5%]" },
  { label: "Layer 2", position: "top-[66%] right-[7%]" },
];

const mobileServiceTags = [
  { label: "DeFi", position: "top-[8%] left-[3%]" },
  { label: "Layer 2", position: "top-[12%] right-[3%]" },
  { label: "Exchange", position: "bottom-[38%] left-[2%]" },
  { label: "GameFi", position: "bottom-[42%] right-[2%]" },
];

const clientLogos = [
  { name: "BNB", logo: bnbLogo },
  { name: "KuCoin", logo: kucoinLogo },
  { name: "Polygon", logo: polygonLogo },
  { name: "Ondo Finance", logo: ondoLogo },
  { name: "Bybit", logo: bybitLogo },
  { name: "Peaq", logo: peaqLogo },
  { name: "Story Protocol", logo: storyLogo },
  { name: "MegaETH", logo: megaethLogo },
  { name: "Tria", logo: triaLogo },
];

const stats = [
  { value: 17, label: "Projects Launched", suffix: "+" },
  { value: 115, label: "KOL Network", suffix: "+" },
  { value: 6, label: "Token Sales", prefix: "$", suffix: "M+" },
  { value: 48, label: "AMA Hosting", suffix: "+" },
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

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();
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
            <source src="/videos/projects-background.mp4" type="video/mp4" />
          </video>
          
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
            <span className="font-sans px-4 py-2 text-xs whitespace-nowrap rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/70 hover:bg-white/[0.06] hover:border-primary/40 hover:text-white transition-all duration-300">
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
            <span className="font-sans px-2 py-1 text-[10px] rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/60 whitespace-nowrap">
              {tag.label}
            </span>
          </div>
        ))}

        {/* Main Content - Centered */}
        <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            {/* Main Headline */}
            <motion.h1 
              className="font-sans text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] font-bold leading-[0.9] tracking-[-0.02em] mb-8 sm:mb-10 mt-16 sm:mt-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-white">Our </span>
              <span className="text-white/90">Projects</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-10 font-light tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              These case studies walk through the challenge, our approach, and the outcomes across services like <span className="text-white font-medium">GTM, KOLs, PR, and social media</span>.
            </motion.p>
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
                    {/* Logo - Hide for Tria since logo is integrated in background */}
                    {caseItem.slug !== 'tria' && (
                      <img
                        src={caseItem.logo}
                        alt={caseItem.name}
                        className="w-16 h-16 md:w-20 md:h-20 object-contain mb-4 group-hover:scale-110 transition-transform duration-300"
                        style={{ filter: `drop-shadow(0 0 20px ${caseItem.glowColor}80)` }}
                      />
                    )}
                    
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