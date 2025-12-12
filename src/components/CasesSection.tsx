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

const categoryTags = [
  { label: "Infrastructure", color: "border-yellow-400/50 text-yellow-400" },
  { label: "Exchange", color: "border-green-400/50 text-green-400" },
  { label: "Layer 2", color: "border-purple-400/50 text-purple-400" },
  { label: "RWA", color: "border-blue-400/50 text-blue-400" },
  { label: "DePIN", color: "border-cyan-400/50 text-cyan-400" },
];

const GlowingOrbs = () => (
  <>
    <div 
      className="glowing-orb glowing-orb-purple w-[350px] h-[350px] top-20 -right-20"
      style={{ animationDelay: '0s' }}
    />
    <div 
      className="glowing-orb glowing-orb-blue w-[400px] h-[400px] -bottom-20 left-20"
      style={{ animationDelay: '-7s' }}
    />
    <div 
      className="glowing-orb glowing-orb-green w-[300px] h-[300px] top-1/2 left-1/4"
      style={{ animationDelay: '-3s' }}
    />
  </>
);

const CasesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="py-24 px-4 flex-1 bg-[hsl(0,0%,4%)] relative overflow-hidden">
      {/* Glowing Orbs */}
      <GlowingOrbs />

      {/* Floating Category Tags */}
      <div className="absolute top-8 left-0 right-0 hidden lg:flex justify-center gap-4 z-20">
        {categoryTags.map((tag, index) => (
          <span
            key={tag.label}
            className={`floating-tag px-4 py-2 text-xs rounded-full border bg-black/40 backdrop-blur-sm ${tag.color}`}
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            {tag.label}
          </span>
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className={`flex flex-col md:flex-row items-start md:items-center justify-between mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span className="number-badge text-white/50 badge-glow glass-card px-3 py-1.5 rounded-full">200+ Clients</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-center text-white flex-1">
            Featured <span className="serif-italic text-glow">Cases</span>
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
              style={{ 
                animationDelay: `${index * 100}ms`,
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <TiltCard
                className={`relative aspect-square rounded-3xl overflow-hidden ${caseItem.bgStyle} cursor-pointer mb-4 glow-border card-shine`}
                max={12}
                scale={1.03}
                speed={300}
              >
                {/* Animated glow ring */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-[-2px] rounded-3xl bg-gradient-to-r from-white/20 via-white/40 to-white/20 blur-sm" />
                </div>

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
              <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${index * 150 + 200}ms` }}>
                <h4 className="text-lg font-medium text-white mb-2">{caseItem.name}</h4>
                <p className="text-sm text-white/50 mb-3 line-clamp-2">
                  {caseItem.result}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 glass-card rounded-full text-white/70">
                    {caseItem.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className={`flex justify-center mt-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link
            to="/projects"
            className="lunar-btn-outline border-white/30 text-white hover:bg-white/10 glow-border"
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
