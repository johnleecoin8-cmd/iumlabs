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
    pattern: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(0,0,0,0.1) 0%, transparent 40%)",
  },
  {
    name: "KuCoin",
    logo: kucoinLogo,
    slug: "kucoin",
    result: "50K+ New Korean Users",
    category: "Exchange",
    bgStyle: "bg-gradient-to-br from-[#23AF91] via-[#1A9B7F] to-[#147A63]",
    pattern: "linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(225deg, rgba(255,255,255,0.1) 25%, transparent 25%)",
  },
  {
    name: "Polygon",
    logo: polygonLogo,
    slug: "polygon",
    result: "$2M Korean TVL in 30 Days",
    category: "Layer 2",
    bgStyle: "bg-gradient-to-br from-[#8247E5] via-[#7B3FE4] to-[#5A2D9C]",
    pattern: "radial-gradient(ellipse at top right, rgba(255,255,255,0.15) 0%, transparent 50%)",
  },
  {
    name: "Ondo Finance",
    logo: ondoLogo,
    slug: "ondo",
    result: "100K+ Korean Community",
    category: "RWA",
    bgStyle: "bg-gradient-to-br from-[#0A1628] via-[#1E3A5F] to-[#0D1B2A]",
    pattern: "radial-gradient(circle at 90% 10%, rgba(59,130,246,0.3) 0%, transparent 40%), radial-gradient(circle at 10% 90%, rgba(59,130,246,0.2) 0%, transparent 30%)",
  },
  {
    name: "Peaq",
    logo: peaqLogo,
    slug: "peaq",
    result: "#1 DePIN in Korea",
    category: "DePIN",
    bgStyle: "bg-gradient-to-br from-[#00E5A0] via-[#00D4AA] to-[#00A080]",
    pattern: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)",
  },
  {
    name: "Story Protocol",
    logo: storyLogo,
    slug: "story-protocol",
    result: "5K+ Korean Creators",
    category: "IP Protocol",
    bgStyle: "bg-gradient-to-br from-[#FF6B6B] via-[#E5484D] to-[#C92A2A]",
    pattern: "radial-gradient(circle at 30% 70%, rgba(255,200,200,0.3) 0%, transparent 40%), radial-gradient(circle at 70% 30%, rgba(255,100,100,0.2) 0%, transparent 40%)",
  },
  {
    name: "MegaETH",
    logo: megaethLogo,
    slug: "megaeth",
    result: "+500% Korean Engagement",
    category: "Layer 2",
    bgStyle: "bg-gradient-to-br from-[#1a1a2e] via-[#3C4DBB] to-[#627EEA]",
    pattern: "linear-gradient(180deg, rgba(98,126,234,0.2) 0%, transparent 50%), radial-gradient(circle at 50% 100%, rgba(98,126,234,0.3) 0%, transparent 60%)",
  },
  {
    name: "Tria",
    logo: triaLogo,
    slug: "tria",
    result: "30K+ Korean Wallets",
    category: "Wallet",
    bgStyle: "bg-gradient-to-br from-[#FF9500] via-[#FFB347] to-[#FF7F00]",
    pattern: "repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 16px)",
  },
  {
    name: "Bybit",
    logo: bybitLogo,
    slug: "bybit",
    result: "#2 Korean Exchange Traffic",
    category: "Exchange",
    bgStyle: "bg-gradient-to-br from-[#F7A600] via-[#FFB800] to-[#E69500]",
    pattern: "radial-gradient(ellipse at bottom left, rgba(255,255,255,0.2) 0%, transparent 50%)",
  },
];

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
              {/* Pattern Overlay */}
              <div 
                className="absolute inset-0 z-0" 
                style={{ background: caseItem.pattern }}
              />

              {/* Decorative Elements */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Random decorative circles */}
                <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-black/10" />
                <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full bg-white/10" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
                {/* Logo */}
                <img
                  src={caseItem.logo}
                  alt={caseItem.name}
                  className="w-16 h-16 md:w-20 md:h-20 object-contain filter brightness-0 invert mb-4 group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Project Name */}
                <h3 className="text-white text-2xl md:text-3xl font-bold text-center tracking-tight">
                  {caseItem.name}
                </h3>
              </div>

              {/* Bottom Info - Result */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white/90 text-sm font-medium text-center">
                  {caseItem.result}
                </p>
                <p className="text-white/60 text-xs text-center mt-1">
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
