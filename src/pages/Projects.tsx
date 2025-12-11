import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import TiltCard from "@/components/TiltCard";
import { ArrowUpRight, Calendar } from "lucide-react";
import CalendlyButton from "@/components/CalendlyButton";
import { Link } from "react-router-dom";
import Planet3D from "@/components/Planet3D";
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

const cases = [
  {
    name: "BNB Chain",
    logo: bnbLogo,
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
    slug: "story-protocol",
    result: "5K+ Korean Creators",
    category: "IP Protocol",
    bgStyle: "bg-gradient-to-br from-[#FF6B6B] via-[#E5484D] to-[#C92A2A]",
    decorations: "story",
    description: "Korean content creator onboarding for IP tokenization platform targeting webtoon and music artists.",
    services: ["Creator Relations", "Platform Marketing", "Ambassador Program"],
  },
  {
    name: "MegaETH",
    logo: megaethLogo,
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
    slug: "bybit",
    result: "#2 Korean Exchange Traffic",
    category: "Exchange",
    bgStyle: "bg-gradient-to-br from-[#F7A600] via-[#FFB800] to-[#E69500]",
    decorations: "bybit",
    description: "Multi-channel user acquisition and VIP program for Korean high-volume traders.",
    services: ["Market Entry Strategy", "User Acquisition", "VIP Relations"],
  },
];

// Unique decorative elements for each card
const CardDecorations = ({ type }: { type: string }) => {
  switch (type) {
    case "bnb":
      return (
        <>
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="hexagons-projects" width="20" height="17.32" patternUnits="userSpaceOnUse">
                  <polygon points="10,0 20,5 20,15 10,17.32 0,15 0,5" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#hexagons-projects)" />
            </svg>
          </div>
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-radial from-yellow-200/40 to-transparent blur-2xl" />
        </>
      );
    case "kucoin":
      return (
        <>
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,30 50,50 T100,50" stroke="white" strokeWidth="0.5" fill="none" />
            <path d="M0,60 Q25,40 50,60 T100,60" stroke="white" strokeWidth="0.5" fill="none" />
          </svg>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-t from-emerald-300/30 to-transparent" />
        </>
      );
    case "polygon":
      return (
        <>
          <div className="absolute top-10 right-10 w-16 h-16 rotate-45 border-2 border-white/30" />
          <div className="absolute bottom-20 left-16 w-12 h-12 rotate-45 bg-white/10" />
          <div className="absolute -top-10 left-1/3 w-40 h-40 rounded-full bg-purple-400/30 blur-3xl" />
        </>
      );
    case "ondo":
      return (
        <>
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,80 L20,70 L40,75 L60,50 L80,55 L100,30" stroke="#3B82F6" strokeWidth="1" fill="none" />
          </svg>
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{ 
              backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />
          </div>
        </>
      );
    case "peaq":
      return (
        <>
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
            <circle cx="20" cy="30" r="3" fill="#00FF9D" />
            <circle cx="80" cy="20" r="2" fill="#00FF9D" />
            <circle cx="60" cy="70" r="4" fill="#00FF9D" />
            <line x1="20" y1="30" x2="80" y2="20" stroke="#00FF9D" strokeWidth="0.5" />
            <line x1="20" y1="30" x2="60" y2="70" stroke="#00FF9D" strokeWidth="0.5" />
          </svg>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-green-400/20 blur-3xl" />
        </>
      );
    case "story":
      return (
        <>
          <div className="absolute top-8 right-8 w-20 h-28 bg-white/10 rounded-sm transform rotate-6" />
          <div className="absolute top-10 right-10 w-20 h-28 bg-white/15 rounded-sm transform rotate-3" />
          <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-gradient-to-r from-red-300/40 to-pink-300/30" />
        </>
      );
    case "megaeth":
      return (
        <>
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-blue-400/60 via-transparent to-transparent transform -rotate-2" />
          <div className="absolute top-1/3 left-0 w-3/4 h-px bg-gradient-to-r from-blue-300/40 via-transparent to-transparent" />
          <div className="absolute -top-20 right-0 w-60 h-60 bg-gradient-to-bl from-blue-400/40 to-transparent blur-2xl" />
        </>
      );
    case "tria":
      return (
        <>
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 45 * Math.cos((i * 30 * Math.PI) / 180)}
                y2={50 + 45 * Math.sin((i * 30 * Math.PI) / 180)}
                stroke="white"
                strokeWidth="0.5"
              />
            ))}
          </svg>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-gradient-to-t from-orange-300/40 to-amber-200/20" />
        </>
      );
    case "bybit":
      return (
        <>
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,90 L30,70 L50,75 L70,40 L100,20" stroke="#FFD700" strokeWidth="2" fill="none" />
            <path d="M0,90 L30,70 L50,75 L70,40 L100,20 L100,100 L0,100 Z" fill="url(#goldGradient-projects)" />
            <defs>
              <linearGradient id="goldGradient-projects" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,215,0,0.3)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </>
      );
    default:
      return null;
  }
};

const stats = [
  { value: "$500M+", label: "Total Value Marketed" },
  { value: "200+", label: "Projects Launched" },
  { value: "500K+", label: "Community Members" },
];

// Cluster tags with polar coordinates (angle in degrees, distance in viewport units)
const clusterTags = [
  { label: "DeFi", angle: 0, distance: 28, color: "bg-purple-500", glowColor: "#a855f7" },
  { label: "Layer 1", angle: 40, distance: 35, color: "bg-pink-400", glowColor: "#f472b6" },
  { label: "GameFi", angle: 80, distance: 30, color: "bg-fuchsia-500", glowColor: "#d946ef" },
  { label: "NFT", angle: 120, distance: 38, color: "bg-violet-400", glowColor: "#a78bfa" },
  { label: "Infrastructure", angle: 160, distance: 32, color: "bg-purple-400", glowColor: "#c084fc" },
  { label: "Exchange", angle: 200, distance: 36, color: "bg-pink-500", glowColor: "#ec4899" },
  { label: "Layer 2", angle: 240, distance: 28, color: "bg-fuchsia-400", glowColor: "#e879f9" },
  { label: "DePIN", angle: 280, distance: 34, color: "bg-violet-500", glowColor: "#8b5cf6" },
  { label: "RWA", angle: 320, distance: 30, color: "bg-pink-400", glowColor: "#f472b6" },
];

// Mobile floating tags (simplified)
const mobileFloatingTags = [
  { label: "DeFi", top: "12%", left: "3%", color: "bg-purple-500" },
  { label: "Layer 1", top: "15%", right: "3%", color: "bg-pink-400" },
  { label: "GameFi", top: "75%", left: "3%", color: "bg-fuchsia-500" },
  { label: "NFT", top: "78%", right: "3%", color: "bg-violet-400" },
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
        
        {/* Cluster Universe System - Desktop */}
        <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none">
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              {clusterTags.map((tag, index) => (
                <linearGradient 
                  key={`gradient-${index}`} 
                  id={`lineGradient-${index}`}
                  x1="0%" y1="0%" x2="100%" y2="100%"
                >
                  <stop offset="0%" stopColor={tag.glowColor} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={tag.glowColor} stopOpacity="0.1" />
                </linearGradient>
              ))}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Animated connection lines from center to each tag */}
            {clusterTags.map((tag, index) => {
              const centerX = 50; // percentage
              const centerY = 50;
              const endX = centerX + tag.distance * Math.cos(tag.angle * Math.PI / 180);
              const endY = centerY + tag.distance * Math.sin(tag.angle * Math.PI / 180);
              
              return (
                <g key={`line-${index}`}>
                  {/* Glow line background */}
                  <line
                    x1={`${centerX}%`}
                    y1={`${centerY}%`}
                    x2={`${endX}%`}
                    y2={`${endY}%`}
                    stroke={tag.glowColor}
                    strokeWidth="4"
                    strokeOpacity="0.3"
                    filter="url(#glow)"
                    className="animate-pulse"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  />
                  {/* Main line */}
                  <line
                    x1={`${centerX}%`}
                    y1={`${centerY}%`}
                    x2={`${endX}%`}
                    y2={`${endY}%`}
                    stroke={`url(#lineGradient-${index})`}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  {/* Animated pulse dot traveling along line */}
                  <circle r="3" fill={tag.glowColor} filter="url(#glow)">
                    <animateMotion
                      dur={`${2 + index * 0.3}s`}
                      repeatCount="indefinite"
                      path={`M${centerX * window.innerWidth / 100},${centerY * window.innerHeight / 100} L${endX * window.innerWidth / 100},${endY * window.innerHeight / 100}`}
                    />
                  </circle>
                </g>
              );
            })}
          </svg>
          
          {/* Central hub glow */}
          <div 
            className="absolute w-32 h-32 rounded-full animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(236,72,153,0.2) 40%, transparent 70%)',
              boxShadow: '0 0 60px rgba(168,85,247,0.5), 0 0 100px rgba(236,72,153,0.3)',
            }}
          />
          
          {/* Cluster Tags */}
          {clusterTags.map((tag, index) => {
            const x = 50 + tag.distance * Math.cos(tag.angle * Math.PI / 180);
            const y = 50 + tag.distance * Math.sin(tag.angle * Math.PI / 180);
            
            return (
              <span
                key={`cluster-${tag.label}`}
                className={`absolute px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg animate-float ${tag.color}`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${index * 0.3}s`,
                  boxShadow: `0 0 20px ${tag.glowColor}50, 0 4px 15px rgba(0,0,0,0.3)`,
                }}
              >
                {tag.label}
              </span>
            );
          })}
        </div>
        
        {/* Mobile floating tags - simplified */}
        <div className="lg:hidden">
          {mobileFloatingTags.map((tag, index) => (
            <span
              key={`mobile-${tag.label}`}
              className={`absolute animate-float px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-lg ${tag.color}`}
              style={{
                top: tag.top,
                left: tag.left,
                right: tag.right,
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

      {/* Projects Grid */}
      <section ref={ref} className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((caseItem, index) => (
              <Link
                key={caseItem.name}
                to={`/projects/${caseItem.slug}`}
                className={`group cursor-pointer transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <TiltCard
                  className={`relative aspect-square rounded-3xl overflow-hidden ${caseItem.bgStyle} mb-4`}
                  max={12}
                  scale={1.03}
                  speed={300}
                >
                  {/* Unique Decorations */}
                  <CardDecorations type={caseItem.decorations} />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
                    {/* Logo */}
                    <img
                      src={caseItem.logo}
                      alt={caseItem.name}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain filter brightness-0 invert mb-4 group-hover:scale-110 transition-transform duration-300"
                    />
                    
                    {/* Project Name */}
                    <h3 className="text-white text-2xl md:text-3xl font-bold text-center tracking-tight drop-shadow-lg">
                      {caseItem.name}
                    </h3>
                  </div>

                  {/* Bottom Info - Result */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold text-center">
                      {caseItem.result}
                    </p>
                    <p className="text-white/70 text-xs text-center mt-1 uppercase tracking-wider">
                      {caseItem.category}
                    </p>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white/80 uppercase tracking-wider">
                      {caseItem.category}
                    </span>
                  </div>
                </TiltCard>

                {/* Text Below Card */}
                <div className="px-2">
                  <h3 className="text-xl font-medium text-white mb-1 group-hover:text-primary transition-colors">
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

      
      <Footer />
    </div>
  );
};

export default Projects;