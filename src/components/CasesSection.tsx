import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "@/components/TiltCard";

// Import logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.png";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import peaqLogo from "@/assets/logos/peaq.png";
import storyLogo from "@/assets/logos/story-protocol.png";

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
                <pattern id="hexagons" width="20" height="17.32" patternUnits="userSpaceOnUse">
                  <polygon points="10,0 20,5 20,15 10,17.32 0,15 0,5" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#hexagons)" />
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
          <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-blue-400 shadow-lg shadow-blue-500/50" />
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
          <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-gradient-to-r from-red-300/40 to-pink-300/30" />
        </>
      );
    default:
      return null;
  }
};

const CasesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="py-24 px-4 flex-1 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #1a1040 0%, #2d1b69 40%, #1e3a5f 100%)'
    }}>
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className={`flex flex-col md:flex-row items-start md:items-center justify-between mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm font-medium">
              200+ Clients
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-center text-white flex-1">
            Featured <span className="serif-italic text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-amber-300">Cases</span>
          </h2>
          
          <div className="text-white/30 text-2xl font-light hidden md:block">///</div>
        </div>

        {/* Cases Grid - 3x3 */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {cases.map((caseItem, index) => (
            <Link
              key={caseItem.name}
              to={`/projects/${caseItem.slug}`}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TiltCard
                className={`relative aspect-square rounded-3xl overflow-hidden ${caseItem.bgStyle} cursor-pointer mb-4`}
                max={12}
                scale={1.03}
                speed={300}
              >
                {/* Unique Decorations */}
                <CardDecorations type={caseItem.decorations} />

                {/* Content - Logo Centered */}
                <div className="absolute inset-0 flex items-center justify-center p-6 z-10">
                  <img
                    src={caseItem.logo}
                    alt={caseItem.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                  />
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

              {/* Content Below Card */}
              <div>
                <h4 className="text-lg font-medium text-white mb-2">{caseItem.name}</h4>
                <p className="text-sm text-white/60 mb-3 line-clamp-2">
                  {caseItem.result}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-white/10 border border-white/10 rounded-full text-white/60">
                    {caseItem.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className={`flex justify-center mt-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #F4D03F, #D4AF37)'
            }}
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