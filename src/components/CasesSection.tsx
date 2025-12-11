import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowUpRight, CornerDownRight } from "lucide-react";

const cases = [
  {
    id: 1,
    name: "DeFi Protocol",
    category: "DeFi",
    gradient: "case-gradient-blue",
    logo: "https://cryptologos.cc/logos/uniswap-uni-logo.svg",
    result: "+340% Korean Trading Volume",
  },
  {
    id: 2,
    name: "NFT Marketplace",
    category: "NFT",
    gradient: "case-gradient-purple",
    logo: "https://cryptologos.cc/logos/apecoin-ape-logo.svg",
    result: "50K+ Korean Holders",
  },
  {
    id: 3,
    name: "Layer 2 Network",
    category: "Infrastructure",
    gradient: "case-gradient-cyan",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg",
    result: "$2M Korean TVL in 30 Days",
  },
  {
    id: 4,
    name: "GameFi Project",
    category: "GameFi",
    gradient: "case-gradient-orange",
    logo: "https://cryptologos.cc/logos/axie-infinity-axs-logo.svg",
    result: "100K+ Korean Players",
  },
  {
    id: 5,
    name: "DAO Platform",
    category: "DAO",
    gradient: "case-gradient-green",
    logo: "https://cryptologos.cc/logos/maker-mkr-logo.svg",
    result: "5K+ Korean DAO Members",
  },
  {
    id: 6,
    name: "Metaverse World",
    category: "Metaverse",
    gradient: "case-gradient-pink",
    logo: "https://cryptologos.cc/logos/decentraland-mana-logo.svg",
    result: "#1 Korean Metaverse Project",
  },
];

const CasesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-foreground">
              Featured Cases <span className="text-muted-foreground">//</span>
            </h2>
          </div>
          <Link 
            to="/projects" 
            className="bracket-link group"
          >
            <CornerDownRight className="w-4 h-4" />
            <span>All Cases</span>
          </Link>
        </div>

        {/* Cases Horizontal Scroll */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-6" style={{ minWidth: 'max-content' }}>
            {cases.map((caseItem, index) => (
              <Link
                key={caseItem.id}
                to={`/projects/${caseItem.id}`}
                className={`case-card group flex-shrink-0 w-[320px] aspect-[4/5] rounded-2xl ${caseItem.gradient} p-6 flex flex-col justify-between transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Top - Category */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[hsl(var(--dark-fg))] opacity-70 uppercase tracking-wider">
                    {caseItem.category}
                  </span>
                  <div className="arrow-icon">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Center - Logo */}
                <div className="flex items-center justify-center flex-1">
                  <img 
                    src={caseItem.logo} 
                    alt={caseItem.name}
                    className="w-24 h-24 object-contain brightness-0 invert opacity-90"
                  />
                </div>

                {/* Bottom - Result */}
                <div>
                  <p className="text-sm text-[hsl(var(--dark-fg))] opacity-70 mb-1">{caseItem.name}</p>
                  <p className="text-lg font-medium text-[hsl(var(--dark-fg))]">{caseItem.result}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile: View All Link */}
        <div className="mt-8 text-center md:hidden">
          <Link to="/projects" className="lunar-btn-outline">
            View All Cases
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
