import { useState, useEffect, useMemo } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import TiltCard from "@/components/TiltCard";
import { ArrowUpRight, Calendar, ExternalLink, Filter, Sparkles } from "lucide-react";
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
    featured: true,
    metrics: { users: "1M+", growth: "+340%", campaigns: "25+" },
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
    featured: true,
    metrics: { users: "50K+", growth: "+280%", campaigns: "18+" },
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
    featured: false,
    metrics: { users: "50K+", growth: "+500%", campaigns: "12+" },
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
    featured: false,
    metrics: { users: "100K+", growth: "+420%", campaigns: "15+" },
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
    featured: false,
    metrics: { users: "35K+", growth: "+650%", campaigns: "10+" },
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
    featured: false,
    metrics: { users: "5K+", growth: "+380%", campaigns: "8+" },
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
    featured: false,
    metrics: { users: "80K+", growth: "+500%", campaigns: "20+" },
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
    featured: false,
    metrics: { users: "30K+", growth: "+320%", campaigns: "14+" },
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
    featured: false,
    metrics: { users: "120K+", growth: "+450%", campaigns: "22+" },
  },
];

// Category filter options
const categories = [
  { id: "all", label: "All Projects", color: "from-purple-500 to-pink-500", bgClass: "bg-gradient-to-r from-purple-500/20 to-pink-500/20" },
  { id: "Infrastructure", label: "Infrastructure", color: "from-yellow-500 to-orange-500", bgClass: "bg-gradient-to-r from-yellow-500/20 to-orange-500/20" },
  { id: "Exchange", label: "Exchange", color: "from-emerald-500 to-teal-500", bgClass: "bg-gradient-to-r from-emerald-500/20 to-teal-500/20" },
  { id: "Layer 2", label: "Layer 2", color: "from-purple-500 to-indigo-500", bgClass: "bg-gradient-to-r from-purple-500/20 to-indigo-500/20" },
  { id: "RWA", label: "RWA", color: "from-blue-500 to-cyan-500", bgClass: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20" },
  { id: "DePIN", label: "DePIN", color: "from-green-500 to-emerald-500", bgClass: "bg-gradient-to-r from-green-500/20 to-emerald-500/20" },
  { id: "IP Protocol", label: "IP Protocol", color: "from-red-500 to-pink-500", bgClass: "bg-gradient-to-r from-red-500/20 to-pink-500/20" },
  { id: "Wallet", label: "Wallet", color: "from-orange-500 to-amber-500", bgClass: "bg-gradient-to-r from-orange-500/20 to-amber-500/20" },
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
  { value: 500, suffix: "M+", prefix: "$", label: "Total Value Marketed" },
  { value: 200, suffix: "+", prefix: "", label: "Projects Launched" },
  { value: 500, suffix: "K+", prefix: "", label: "Community Members" },
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

// Count-up stat component
const StatCounter = ({ value, prefix, suffix, label, isVisible }: { value: number; prefix: string; suffix: string; label: string; isVisible: boolean }) => {
  const count = useCountUp({ end: value, duration: 2000, isVisible, prefix, suffix });
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
        {count}
      </div>
      <div className="text-sm text-white/50">{label}</div>
    </div>
  );
};

// Featured Project Card Component
const FeaturedProjectCard = ({ project, index }: { project: typeof cases[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group relative block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative overflow-hidden rounded-3xl ${project.bgStyle} transition-all duration-700 ease-out ${isHovered ? 'scale-[1.02]' : 'scale-100'}`}>
        <CardDecorations type={project.decorations} />
        
        {/* Featured Badge */}
        <div className="absolute top-6 left-6 z-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Featured Project
          </span>
        </div>
        
        {/* Main Content Grid */}
        <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12 min-h-[400px]">
          {/* Left - Logo & Title */}
          <div className="flex flex-col justify-center">
            <img
              src={project.logo}
              alt={project.name}
              className={`w-24 h-24 md:w-32 md:h-32 object-contain filter brightness-0 invert mb-6 transition-all duration-500 ${isHovered ? 'scale-110 rotate-3' : ''}`}
            />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {project.name}
            </h2>
            <p className="text-white/70 text-lg max-w-md">
              {project.description}
            </p>
            
            {/* Services Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {project.services.map((service) => (
                <span key={service} className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-sm">
                  {service}
                </span>
              ))}
            </div>
          </div>
          
          {/* Right - Metrics */}
          <div className="flex flex-col justify-center">
            <div className="grid grid-cols-3 gap-4">
              <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center transition-all duration-500 ${isHovered ? 'translate-y-[-8px]' : ''}`} style={{ transitionDelay: '0ms' }}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{project.metrics.users}</div>
                <div className="text-white/60 text-sm">Users</div>
              </div>
              <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center transition-all duration-500 ${isHovered ? 'translate-y-[-8px]' : ''}`} style={{ transitionDelay: '100ms' }}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{project.metrics.growth}</div>
                <div className="text-white/60 text-sm">Growth</div>
              </div>
              <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center transition-all duration-500 ${isHovered ? 'translate-y-[-8px]' : ''}`} style={{ transitionDelay: '200ms' }}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{project.metrics.campaigns}</div>
                <div className="text-white/60 text-sm">Campaigns</div>
              </div>
            </div>
            
            {/* Result Highlight */}
            <div className={`mt-6 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 transition-all duration-500 ${isHovered ? 'bg-white/10 border-white/20' : ''}`}>
              <div className="text-white/50 text-sm mb-2 uppercase tracking-wider">Key Result</div>
              <div className="text-2xl md:text-3xl font-bold text-white">{project.result}</div>
            </div>
          </div>
        </div>
        
        {/* Hover Arrow */}
        <div className={`absolute bottom-8 right-8 transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <div className="flex items-center gap-3 text-white">
            <span className="text-sm font-medium">View Case Study</span>
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Bento Grid Project Card
const BentoProjectCard = ({ project, index, size = "normal" }: { project: typeof cases[0]; index: number; size?: "normal" | "large" | "wide" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    normal: "col-span-1 row-span-1 aspect-square",
    large: "col-span-1 md:col-span-2 row-span-1 md:row-span-2",
    wide: "col-span-1 md:col-span-2 row-span-1",
  };
  
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`group block ${sizeClasses[size]}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      <TiltCard
        className={`relative h-full rounded-3xl overflow-hidden ${project.bgStyle}`}
        max={size === "large" ? 8 : 12}
        scale={1.02}
        speed={300}
      >
        <CardDecorations type={project.decorations} />
        
        {/* Default State - Logo & Name */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 z-10 transition-all duration-500 ${isHovered ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
          <img
            src={project.logo}
            alt={project.name}
            className={`${size === "large" ? "w-24 h-24 md:w-32 md:h-32" : "w-16 h-16 md:w-20 md:h-20"} object-contain filter brightness-0 invert mb-4`}
          />
          <h3 className={`text-white ${size === "large" ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"} font-bold text-center tracking-tight drop-shadow-lg`}>
            {project.name}
          </h3>
        </div>
        
        {/* Hover State - Full Preview */}
        <div className={`absolute inset-0 flex flex-col justify-between p-6 z-10 bg-black/40 backdrop-blur-sm transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {/* Top - Category */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-xs text-white uppercase tracking-wider">
              {project.category}
            </span>
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ExternalLink className="w-4 h-4 text-white" />
            </div>
          </div>
          
          {/* Middle - Info */}
          <div className="flex-1 flex flex-col justify-center">
            <img
              src={project.logo}
              alt={project.name}
              className="w-12 h-12 object-contain filter brightness-0 invert mb-4"
            />
            <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{project.name}</h3>
            <p className="text-white/70 text-sm line-clamp-2 mb-4">{project.description}</p>
            
            {/* Service Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.services.slice(0, 3).map((service) => (
                <span key={service} className="px-2 py-1 rounded-full bg-white/10 text-white/80 text-xs">
                  {service}
                </span>
              ))}
            </div>
          </div>
          
          {/* Bottom - Result */}
          <div className="pt-4 border-t border-white/20">
            <div className="text-white/50 text-xs mb-1 uppercase tracking-wider">Result</div>
            <div className="text-white font-semibold">{project.result}</div>
          </div>
        </div>
        
        {/* Category Badge (always visible) */}
        <div className={`absolute top-4 left-4 z-20 transition-all duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white/80 uppercase tracking-wider">
            {project.category}
          </span>
        </div>
      </TiltCard>
    </Link>
  );
};

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const [scrollY, setScrollY] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isFilterChanging, setIsFilterChanging] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return cases.filter(c => !c.featured);
    return cases.filter(c => c.category === activeFilter && !c.featured);
  }, [activeFilter]);

  // Get featured projects
  const featuredProjects = cases.filter(c => c.featured);

  // Handle filter change with animation
  const handleFilterChange = (filterId: string) => {
    if (filterId === activeFilter) return;
    setIsFilterChanging(true);
    setTimeout(() => {
      setActiveFilter(filterId);
      setIsFilterChanging(false);
    }, 300);
  };

  // Get current category background
  const currentCategoryBg = categories.find(c => c.id === activeFilter)?.bgClass || "";

  // Determine bento layout sizes
  const getBentoSize = (index: number): "normal" | "large" | "wide" => {
    if (index === 0) return "large";
    if (index === 3 || index === 5) return "wide";
    return "normal";
  };

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

          {/* Stats Row with Count-up */}
          <div ref={statsRef} className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10 opacity-0 animate-fade-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            {stats.map((stat, index) => (
              <StatCounter
                key={index}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label}
                isVisible={statsVisible}
              />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 px-4 bg-background relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[128px]" />
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Projects</h2>
          </div>
          
          <div className="grid gap-8">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Projects Grid Section */}
      <section ref={ref} className={`py-24 px-4 relative transition-all duration-700 ${currentCategoryBg}`}>
        {/* Dynamic Background based on filter */}
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Filter Tabs */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="w-5 h-5 text-white/50" />
              <span className="text-white/50 text-sm uppercase tracking-wider">Filter by Category</span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleFilterChange(category.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {category.label}
                  {activeFilter === category.id && (
                    <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                      {category.id === "all" ? cases.filter(c => !c.featured).length : cases.filter(c => c.category === category.id && !c.featured).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Bento Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 transition-all duration-500 ${isFilterChanging ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.slug}
                className={`transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ 
                  transitionDelay: `${index * 80}ms`,
                }}
              >
                <BentoProjectCard
                  project={project}
                  index={index}
                  size={getBentoSize(index)}
                />
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredProjects.length === 0 && !isFilterChanging && (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                <Filter className="w-8 h-8 text-white/30" />
              </div>
              <h3 className="text-xl text-white/70 mb-2">No projects in this category yet</h3>
              <p className="text-white/50">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      
      <Footer />
    </div>
  );
};

export default Projects;
