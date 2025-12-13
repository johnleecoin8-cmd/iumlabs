import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

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
import triaBg from "@/assets/projects/tria-bg.jpg";

const featuredCases = [
  {
    name: "BNB Chain",
    logo: bnbLogo,
    bgImage: bnbBg,
    slug: "bnb-chain",
    category: "Infrastructure",
    result: "+340% Korean Trading Volume",
    description: "Full Korean market entry including KOL campaigns, community setup, and comprehensive PR coverage.",
    glowColor: "#F3BA2F",
  },
  {
    name: "KuCoin",
    logo: kucoinLogo,
    bgImage: kucoinBg,
    slug: "kucoin",
    category: "Exchange",
    result: "50K+ New Korean Users",
    description: "Successful market launch with Korean trader-focused campaigns and ambassador partnerships.",
    glowColor: "#23AF91",
  },
  {
    name: "Polygon",
    logo: polygonLogo,
    bgImage: polygonBg,
    slug: "polygon",
    category: "Layer 2",
    result: "$2M Korean TVL in 30 Days",
    description: "Community growth from 0 to 50K Korean users with targeted developer relations and DeFi marketing.",
    glowColor: "#8247E5",
  },
  {
    name: "Ondo Finance",
    logo: ondoLogo,
    bgImage: ondoBg,
    slug: "ondo",
    category: "RWA",
    result: "100K+ Korean Community",
    description: "RWA education campaign targeting both retail and institutional Korean investors.",
    glowColor: "#3B82F6",
  },
  {
    name: "Peaq",
    logo: peaqLogo,
    bgImage: peaqBg,
    slug: "peaq",
    category: "DePIN",
    result: "#1 DePIN in Korea",
    description: "Established thought leadership in DePIN space with IoT partnerships and developer community.",
    glowColor: "#00CED1",
  },
  {
    name: "Tria",
    logo: triaLogo,
    bgImage: triaBg,
    slug: "tria",
    category: "Wallet",
    result: "30K+ Korean Wallets",
    description: "User acquisition campaign with simplified onboarding for Korean Web3 wallet users.",
    glowColor: "#FF7F50",
  },
];

const clientLogos = [
  { name: "Story Protocol", logo: storyLogo },
  { name: "MegaETH", logo: megaethLogo },
  { name: "Bybit", logo: bybitLogo },
];

const CasesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="bg-black px-4 py-24">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="text-xs font-medium text-primary mb-4 block tracking-widest uppercase">
              Featured Cases
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Success <span className="bg-gradient-to-r from-[#1DB954] via-[#00D4FF] to-[#E040FB] bg-clip-text text-transparent">Stories</span>
            </h2>
          </div>
          <Link to="/projects" className="group flex items-center gap-2 text-white/60 hover:text-[#00D4FF] transition-colors">
            View all projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Cases Grid - Enhanced Glow Effects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuredCases.map((caseItem, index) => (
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
                className="relative aspect-square rounded-3xl overflow-hidden mb-4 transition-all duration-500 hover:-translate-y-3"
                style={{ boxShadow: `0 4px 40px ${caseItem.glowColor}40` }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 15px 80px ${caseItem.glowColor}70, 0 0 120px ${caseItem.glowColor}40`}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 4px 40px ${caseItem.glowColor}40`}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${caseItem.bgImage})` }}
                />
                
                {/* Gradient Overlay with Project Color */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to top, ${caseItem.glowColor}80 0%, ${caseItem.glowColor}20 40%, transparent 70%)`,
                  }}
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                
                {/* Project Color Glow Effect on Hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 50%, ${caseItem.glowColor}50 0%, transparent 70%)`,
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
                      style={{ filter: `drop-shadow(0 0 30px ${caseItem.glowColor})` }}
                    />
                  )}
                  
                  {/* Project Name */}
                  <h3 className="text-white text-2xl md:text-3xl font-bold text-center tracking-tight drop-shadow-lg">
                    {caseItem.name}
                  </h3>
                </div>

                {/* Bottom Info - Result with Project Color */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-bold text-center drop-shadow-lg" style={{ color: caseItem.glowColor }}>
                    {caseItem.result}
                  </p>
                  <p className="text-white/80 text-xs text-center mt-1 uppercase tracking-wider">
                    {caseItem.category}
                  </p>
                </div>

                {/* Hover Arrow with Project Color */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md"
                    style={{ backgroundColor: `${caseItem.glowColor}50` }}
                  >
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Category Badge with Project Color Border */}
                <div className="absolute top-4 left-4">
                  <span 
                    className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white uppercase tracking-wider font-medium"
                    style={{ border: `2px solid ${caseItem.glowColor}60` }}
                  >
                    {caseItem.category}
                  </span>
                </div>
              </div>

              {/* Text Below Card */}
              <div className="px-2">
                <h3 
                  className="text-xl font-medium text-white mb-1 transition-colors"
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

        {/* Client Logos */}
        <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-center text-white/40 text-sm mb-8 uppercase tracking-widest">
            And More...
          </p>
          <div className="flex items-center justify-center flex-wrap gap-8 md:gap-12">
            {clientLogos.map((client, index) => (
              <div key={index} className="opacity-40 hover:opacity-80 transition-opacity">
                <img src={client.logo} alt={client.name} className="h-8 w-auto object-contain brightness-0 invert" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasesSection;
