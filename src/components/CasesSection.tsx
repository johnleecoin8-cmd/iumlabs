import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowUpRight, CornerDownRight } from "lucide-react";

const cases = [
  {
    id: 1,
    name: "DeFi Protocol",
    category: "DeFi",
    gradient: "case-gradient-polkadot",
    logo: "https://cryptologos.cc/logos/polkadot-new-dot-logo.svg",
    result: "+340% Korean Trading Volume",
  },
  {
    id: 2,
    name: "Layer 1 Network",
    category: "Infrastructure",
    gradient: "case-gradient-cardano",
    logo: "https://cryptologos.cc/logos/cardano-ada-logo.svg",
    logoStyle: "brightness-0",
    result: "50K+ Korean Holders",
  },
  {
    id: 3,
    name: "Web3 Platform",
    category: "Infrastructure",
    gradient: "case-gradient-icp",
    logo: "https://cryptologos.cc/logos/internet-computer-icp-logo.svg",
    result: "$2M Korean TVL in 30 Days",
  },
  {
    id: 4,
    name: "Move Ecosystem",
    category: "Layer 1",
    gradient: "case-gradient-aptos",
    logo: "https://cryptologos.cc/logos/aptos-apt-logo.svg",
    logoStyle: "brightness-0",
    result: "100K+ Korean Users",
  },
  {
    id: 5,
    name: "Smart Contract Platform",
    category: "Layer 1",
    gradient: "case-gradient-near",
    logo: "https://cryptologos.cc/logos/near-protocol-near-logo.svg",
    result: "5K+ Korean Developers",
  },
  {
    id: 6,
    name: "Payment Network",
    category: "Infrastructure",
    gradient: "case-gradient-xrp",
    logo: "https://cryptologos.cc/logos/xrp-xrp-logo.svg",
    result: "#1 Korean Remittance",
  },
];

const CasesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="section-header mb-4">Our Work</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground">
              Featured <span className="serif-italic">Cases</span>
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

        {/* Cases Grid - 3x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseItem, index) => (
            <Link
              key={caseItem.id}
              to={`/projects/${caseItem.id}`}
              className={`case-card group relative aspect-[4/5] rounded-3xl ${caseItem.gradient} p-6 flex flex-col justify-between overflow-hidden transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Arrow Icon - Top Right */}
              <div className="flex items-start justify-end">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Center - Logo */}
              <div className="flex items-center justify-center flex-1">
                <img 
                  src={caseItem.logo} 
                  alt={caseItem.name}
                  className={`w-28 h-28 md:w-32 md:h-32 object-contain ${caseItem.logoStyle || 'brightness-0 invert'} opacity-90 transition-transform duration-300 group-hover:scale-110`}
                />
              </div>

              {/* Bottom - Info (shows on hover) */}
              <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-xs text-white/70 uppercase tracking-wider block mb-1">
                  {caseItem.category}
                </span>
                <p className="text-lg font-medium text-white">{caseItem.result}</p>
              </div>

              {/* Category Badge - Always visible */}
              <div className="absolute top-6 left-6">
                <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white/80 uppercase tracking-wider">
                  {caseItem.category}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: View All Link */}
        <div className="mt-12 text-center">
          <Link to="/projects" className="lunar-btn">
            View All Cases
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
