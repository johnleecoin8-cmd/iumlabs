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
    gradient: "bg-gradient-to-br from-[#F3BA2F] to-[#C99100]",
    slug: "bnb-chain",
    result: "+340% Korean Trading Volume",
    category: "Infrastructure",
  },
  {
    name: "KuCoin",
    logo: kucoinLogo,
    gradient: "bg-gradient-to-br from-[#23AF91] to-[#1A7F6A]",
    slug: "kucoin",
    result: "50K+ New Korean Users",
    category: "Exchange",
  },
  {
    name: "Polygon",
    logo: polygonLogo,
    gradient: "bg-gradient-to-br from-[#8247E5] to-[#5A2D9C]",
    slug: "polygon",
    result: "$2M Korean TVL in 30 Days",
    category: "Layer 2",
  },
  {
    name: "Ondo Finance",
    logo: ondoLogo,
    gradient: "bg-gradient-to-br from-[#1E3A5F] to-[#0D1B2A]",
    slug: "ondo",
    result: "100K+ Korean Community",
    category: "RWA",
  },
  {
    name: "Peaq",
    logo: peaqLogo,
    gradient: "bg-gradient-to-br from-[#00D4AA] to-[#00A080]",
    slug: "peaq",
    result: "#1 DePIN in Korea",
    category: "DePIN",
  },
  {
    name: "Story Protocol",
    logo: storyLogo,
    gradient: "bg-gradient-to-br from-[#FF6B6B] to-[#C92A2A]",
    slug: "story-protocol",
    result: "5K+ Korean Creators",
    category: "IP Protocol",
  },
  {
    name: "MegaETH",
    logo: megaethLogo,
    gradient: "bg-gradient-to-br from-[#627EEA] to-[#3C4DBB]",
    slug: "megaeth",
    result: "+500% Korean Engagement",
    category: "Layer 2",
  },
  {
    name: "Tria",
    logo: triaLogo,
    gradient: "bg-gradient-to-br from-[#FF9500] to-[#CC7700]",
    slug: "tria",
    result: "30K+ Korean Wallets",
    category: "Wallet",
  },
  {
    name: "Bybit",
    logo: bybitLogo,
    gradient: "bg-gradient-to-br from-[#F7A600] to-[#C48400]",
    slug: "bybit",
    result: "#2 Korean Exchange Traffic",
    category: "Exchange",
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
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {cases.map((caseItem, index) => (
            <Link
              key={caseItem.name}
              to={`/projects/${caseItem.slug}`}
              className={`group relative aspect-[4/3] rounded-2xl overflow-hidden ${caseItem.gradient} transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                  {caseItem.category}
                </span>
              </div>

              {/* Logo centered */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <img
                  src={caseItem.logo}
                  alt={caseItem.name}
                  className="max-w-[50%] max-h-[50%] object-contain filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Result Badge - Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-sm font-medium text-center">
                  {caseItem.result}
                </p>
              </div>

              {/* Hover overlay with arrow */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-end p-4">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
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
