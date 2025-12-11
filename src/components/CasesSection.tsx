import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

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
  },
  {
    name: "KuCoin",
    logo: kucoinLogo,
    slug: "kucoin",
    result: "50K+ New Korean Users",
    category: "Exchange",
    bgStyle: "bg-gradient-to-br from-[#23AF91] via-[#1A9B7F] to-[#147A63]",
    decorations: "kucoin",
  },
  {
    name: "Polygon",
    logo: polygonLogo,
    slug: "polygon",
    result: "$2M Korean TVL in 30 Days",
    category: "Layer 2",
    bgStyle: "bg-gradient-to-br from-[#8247E5] via-[#7B3FE4] to-[#5A2D9C]",
    decorations: "polygon",
  },
  {
    name: "Ondo Finance",
    logo: ondoLogo,
    slug: "ondo",
    result: "100K+ Korean Community",
    category: "RWA",
    bgStyle: "bg-gradient-to-br from-[#0A1628] via-[#1E3A5F] to-[#0D1B2A]",
    decorations: "ondo",
  },
  {
    name: "Peaq",
    logo: peaqLogo,
    slug: "peaq",
    result: "#1 DePIN in Korea",
    category: "DePIN",
    bgStyle: "bg-gradient-to-br from-[#00E5A0] via-[#00D4AA] to-[#00A080]",
    decorations: "peaq",
  },
  {
    name: "Story Protocol",
    logo: storyLogo,
    slug: "story-protocol",
    result: "5K+ Korean Creators",
    category: "IP Protocol",
    bgStyle: "bg-gradient-to-br from-[#FF6B6B] via-[#E5484D] to-[#C92A2A]",
    decorations: "story",
  },
  {
    name: "MegaETH",
    logo: megaethLogo,
    slug: "megaeth",
    result: "+500% Korean Engagement",
    category: "Layer 2",
    bgStyle: "bg-gradient-to-br from-[#1a1a2e] via-[#3C4DBB] to-[#627EEA]",
    decorations: "megaeth",
  },
  {
    name: "Tria",
    logo: triaLogo,
    slug: "tria",
    result: "30K+ Korean Wallets",
    category: "Wallet",
    bgStyle: "bg-gradient-to-br from-[#FF9500] via-[#FFB347] to-[#FF7F00]",
    decorations: "tria",
  },
  {
    name: "Bybit",
    logo: bybitLogo,
    slug: "bybit",
    result: "#2 Korean Exchange Traffic",
    category: "Exchange",
    bgStyle: "bg-gradient-to-br from-[#F7A600] via-[#FFB800] to-[#E69500]",
    decorations: "bybit",
  },
];

// Unique decorative elements for each card
const CardDecorations = ({ type }: { type: string }) => {
  switch (type) {
    case "bnb":
      return (
        <>
          {/* Hexagon grid pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="hexagons" width="20" height="17.32" patternUnits="userSpaceOnUse">
                  <polygon points="10,0 20,5 20,15 10,17.32 0,15 0,5" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#hexagons)" />
            </svg>
          </div>
          {/* Gold glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-radial from-yellow-200/40 to-transparent blur-2xl" />
          <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full border-2 border-white/20" />
          <div className="absolute top-20 left-20 w-4 h-4 rotate-45 bg-white/30" />
        </>
      );
    case "kucoin":
      return (
        <>
          {/* Wave lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,30 50,50 T100,50" stroke="white" strokeWidth="0.5" fill="none" />
            <path d="M0,60 Q25,40 50,60 T100,60" stroke="white" strokeWidth="0.5" fill="none" />
            <path d="M0,70 Q25,50 50,70 T100,70" stroke="white" strokeWidth="0.5" fill="none" />
          </svg>
          {/* Big mint circle */}
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-t from-emerald-300/30 to-transparent" />
          {/* Dots pattern */}
          <div className="absolute top-8 right-8 grid grid-cols-4 gap-2 opacity-30">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
            ))}
          </div>
          <div className="absolute bottom-16 left-8 w-20 h-20 rounded-full border border-dashed border-white/30" />
        </>
      );
    case "polygon":
      return (
        <>
          {/* Diamond shapes */}
          <div className="absolute top-10 right-10 w-16 h-16 rotate-45 border-2 border-white/30" />
          <div className="absolute bottom-20 left-16 w-12 h-12 rotate-45 bg-white/10" />
          <div className="absolute top-1/2 right-1/4 w-8 h-8 rotate-45 border border-purple-300/50" />
          {/* Purple neon glow */}
          <div className="absolute -top-10 left-1/3 w-40 h-40 rounded-full bg-purple-400/30 blur-3xl" />
          {/* Triangles */}
          <svg className="absolute bottom-0 left-0 w-full h-24 opacity-20" viewBox="0 0 100 30" preserveAspectRatio="none">
            <polygon points="0,30 10,0 20,30" fill="white" />
            <polygon points="30,30 40,10 50,30" fill="white" />
            <polygon points="60,30 70,5 80,30" fill="white" />
          </svg>
        </>
      );
    case "ondo":
      return (
        <>
          {/* Chart lines */}
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,80 L20,70 L40,75 L60,50 L80,55 L100,30" stroke="#3B82F6" strokeWidth="1" fill="none" />
            <path d="M0,90 L20,85 L40,88 L60,70 L80,72 L100,50" stroke="#60A5FA" strokeWidth="0.5" fill="none" />
          </svg>
          {/* Blue grid background */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{ 
              backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />
          </div>
          {/* Data points */}
          <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-blue-400 shadow-lg shadow-blue-500/50" />
          <div className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-blue-300" />
          <div className="absolute bottom-1/3 right-1/3 w-4 h-4 rounded-full border-2 border-blue-400/50" />
        </>
      );
    case "peaq":
      return (
        <>
          {/* Node network */}
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
            <circle cx="20" cy="30" r="3" fill="#00FF9D" />
            <circle cx="80" cy="20" r="2" fill="#00FF9D" />
            <circle cx="60" cy="70" r="4" fill="#00FF9D" />
            <circle cx="30" cy="80" r="2" fill="#00FF9D" />
            <line x1="20" y1="30" x2="80" y2="20" stroke="#00FF9D" strokeWidth="0.5" />
            <line x1="20" y1="30" x2="60" y2="70" stroke="#00FF9D" strokeWidth="0.5" />
            <line x1="60" y1="70" x2="30" y2="80" stroke="#00FF9D" strokeWidth="0.5" />
            <line x1="80" y1="20" x2="60" y2="70" stroke="#00FF9D" strokeWidth="0.5" />
          </svg>
          {/* Green glow lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-300/40 to-transparent" />
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-300/30 to-transparent" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-green-400/20 blur-3xl" />
        </>
      );
    case "story":
      return (
        <>
          {/* Page/document shapes */}
          <div className="absolute top-8 right-8 w-20 h-28 bg-white/10 rounded-sm transform rotate-6" />
          <div className="absolute top-10 right-10 w-20 h-28 bg-white/15 rounded-sm transform rotate-3" />
          {/* Red accent circles */}
          <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-gradient-to-r from-red-300/40 to-pink-300/30" />
          <div className="absolute top-1/3 left-1/4 w-6 h-6 rounded-full bg-red-200/50" />
          {/* Lines */}
          <div className="absolute bottom-1/4 right-0 w-1/2 h-px bg-white/20" />
          <div className="absolute bottom-1/4 right-0 w-1/3 h-px bg-white/20 translate-y-3" />
        </>
      );
    case "megaeth":
      return (
        <>
          {/* Speed lines */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-blue-400/60 via-transparent to-transparent transform -rotate-2" />
          <div className="absolute top-1/3 left-0 w-3/4 h-px bg-gradient-to-r from-blue-300/40 via-transparent to-transparent" />
          <div className="absolute top-2/5 left-0 w-1/2 h-px bg-gradient-to-r from-blue-200/30 via-transparent to-transparent transform rotate-1" />
          {/* Blue flare */}
          <div className="absolute -top-20 right-0 w-60 h-60 bg-gradient-to-bl from-blue-400/40 to-transparent blur-2xl" />
          {/* Speed stripes */}
          <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-20" style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
          }} />
          <div className="absolute bottom-20 right-20 w-12 h-2 bg-blue-400/50 rounded-full blur-sm" />
        </>
      );
    case "tria":
      return (
        <>
          {/* Radial burst lines */}
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
          {/* Orange gradient circles */}
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-gradient-to-t from-orange-300/40 to-amber-200/20" />
          <div className="absolute top-10 right-16 w-12 h-12 rounded-full border-2 border-white/30" />
          <div className="absolute top-1/2 left-10 w-6 h-6 bg-white/20 rounded-full" />
        </>
      );
    case "bybit":
      return (
        <>
          {/* Rising chart line */}
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,90 L30,70 L50,75 L70,40 L100,20" stroke="#FFD700" strokeWidth="2" fill="none" />
            <path d="M0,90 L30,70 L50,75 L70,40 L100,20 L100,100 L0,100 Z" fill="url(#goldGradient)" />
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,215,0,0.3)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{ 
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
              backgroundSize: '25px 25px'
            }} />
          </div>
          {/* Gold sparks */}
          <div className="absolute top-10 right-20 w-2 h-2 bg-yellow-200 rounded-full shadow-lg shadow-yellow-300/50" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-amber-200 rounded-full shadow-lg shadow-amber-300/50" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-yellow-100 rounded-full" />
        </>
      );
    default:
      return null;
  }
};

const CasesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="py-24 px-4 flex-1 bg-[hsl(0,0%,96%)]">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className={`flex flex-col md:flex-row items-start md:items-center justify-between mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span className="number-badge text-[hsl(0,0%,40%)]">200+ Clients</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-center text-[hsl(0,0%,8%)] flex-1">
            Featured <span className="serif-italic">Cases</span>
          </h2>
          
          <div className="text-[hsl(0,0%,60%)] text-2xl font-light hidden md:block">///</div>
        </div>

        {/* Cases Grid - 3x3 */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {cases.map((caseItem, index) => (
            <Link
              key={caseItem.name}
              to={`/projects/${caseItem.slug}`}
              className={`group relative aspect-square rounded-3xl overflow-hidden ${caseItem.bgStyle} transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}
              style={{ animationDelay: `${index * 100}ms` }}
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
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className={`flex justify-center mt-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link
            to="/projects"
            className="lunar-btn-outline border-[hsl(0,0%,20%)] text-[hsl(0,0%,20%)] hover:bg-[hsl(0,0%,20%)] hover:text-white"
          >
            <span>View All Cases</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CasesSection;
