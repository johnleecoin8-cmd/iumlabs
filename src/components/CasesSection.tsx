import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

// Import logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.png";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import peaqLogo from "@/assets/logos/peaq.png";
import storyLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria.png";
import bybitLogo from "@/assets/logos/bybit.png";

const featuredCases = [
  {
    name: "BNB Chain",
    logo: bnbLogo,
    slug: "bnb-chain",
    category: "Infrastructure",
    result: "500K+",
    resultLabel: "Community Members",
    description: "Full-service marketing campaign for Korea market entry",
    gradient: "from-[#F3BA2F]/30 via-[#F3BA2F]/15 to-transparent",
    bgColor: "bg-[#F3BA2F]/5",
    borderColor: "border-[#F3BA2F]/20",
    hoverBorder: "hover:border-[#F3BA2F]/60",
    glowColor: "#F3BA2F",
    accentColor: "text-[#F3BA2F]",
  },
  {
    name: "KuCoin",
    logo: kucoinLogo,
    slug: "kucoin",
    category: "Exchange",
    result: "$2B+",
    resultLabel: "Trading Volume",
    description: "Community growth and influencer marketing strategy",
    gradient: "from-[#23AF91]/30 via-[#23AF91]/15 to-transparent",
    bgColor: "bg-[#23AF91]/5",
    borderColor: "border-[#23AF91]/20",
    hoverBorder: "hover:border-[#23AF91]/60",
    glowColor: "#23AF91",
    accentColor: "text-[#23AF91]",
  },
  {
    name: "Polygon",
    logo: polygonLogo,
    slug: "polygon",
    category: "Layer 2",
    result: "100+",
    resultLabel: "Dapps Onboarded",
    description: "Developer outreach and ecosystem expansion",
    gradient: "from-[#8247E5]/30 via-[#8247E5]/15 to-transparent",
    bgColor: "bg-[#8247E5]/5",
    borderColor: "border-[#8247E5]/20",
    hoverBorder: "hover:border-[#8247E5]/60",
    glowColor: "#8247E5",
    accentColor: "text-[#8247E5]",
  },
];

const clientLogos = [
  { name: "Ondo", logo: ondoLogo },
  { name: "Peaq", logo: peaqLogo },
  { name: "Story Protocol", logo: storyLogo },
  { name: "MegaETH", logo: megaethLogo },
  { name: "Tria", logo: triaLogo },
  { name: "Bybit", logo: bybitLogo },
];

const CasesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="py-32 px-4 bg-[hsl(0,0%,5%)]">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="text-xs font-medium text-primary mb-4 block tracking-widest uppercase">
              Featured Cases
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Success <span className="text-primary">Stories</span>
            </h2>
          </div>
          <Link 
            to="/projects" 
            className="group flex items-center gap-2 text-white/60 hover:text-primary transition-colors"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Cases Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {featuredCases.map((project, index) => (
            <Link
              key={index}
              to={`/projects/${project.slug}`}
              className={`group relative overflow-hidden rounded-3xl ${project.bgColor} border ${project.borderColor} ${project.hoverBorder} min-h-[380px] flex flex-col transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} pointer-events-none`} />
              
              {/* Intense Glow Effect on Hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 50%, ${project.glowColor}50 0%, ${project.glowColor}25 40%, transparent 70%)`,
                }}
              />
              <div 
                className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                style={{
                  boxShadow: `0 0 80px 30px ${project.glowColor}40, 0 0 120px 60px ${project.glowColor}20`,
                }}
              />

              {/* Top Section - Category & Logo */}
              <div className="relative z-10 p-8 flex-1 flex flex-col">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-8">
                  <span className={`text-xs font-medium uppercase tracking-widest ${project.accentColor} opacity-80`}>
                    {project.category}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110 group-hover:rotate-12">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Logo - Centered and Large */}
                <div className="flex-1 flex items-center justify-center">
                  <img 
                    src={project.logo} 
                    alt={project.name}
                    className="h-20 md:h-24 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Bottom Section - Stats & Description */}
              <div className="relative z-10 p-8 pt-0">
                {/* Description - Hidden by default, shown on hover */}
                <p className="text-sm text-white/50 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {project.description}
                </p>
                
                {/* Stats Row */}
                <div className="flex items-end justify-between border-t border-white/10 pt-6">
                  <div>
                    <span className={`text-4xl md:text-5xl font-bold ${project.accentColor}`}>
                      {project.result}
                    </span>
                    <p className="text-sm text-white/50 mt-1">{project.resultLabel}</p>
                  </div>
                  <span className="text-lg font-semibold text-white opacity-60 group-hover:opacity-100 transition-opacity">
                    {project.name}
                  </span>
                </div>
              </div>

              {/* View Case Study Button - Appears on Hover */}
              <div className="absolute bottom-8 left-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-20">
                <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Client Logos Marquee */}
        <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-center text-white/40 text-sm mb-8 uppercase tracking-widest">
            Trusted by 200+ Web3 Projects
          </p>
          <div className="flex items-center justify-center flex-wrap gap-8 md:gap-12">
            {clientLogos.map((client, index) => (
              <div 
                key={index}
                className="opacity-40 hover:opacity-80 transition-opacity"
              >
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="h-8 w-auto object-contain brightness-0 invert"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasesSection;
