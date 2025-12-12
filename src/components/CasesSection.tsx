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
    result: "500K+ Community Members",
    gradient: "from-[#F3BA2F]/20 to-[#F3BA2F]/5",
    borderColor: "border-[#F3BA2F]/30",
    hoverBorder: "hover:border-[#F3BA2F]/60",
    glowColor: "#F3BA2F",
  },
  {
    name: "KuCoin",
    logo: kucoinLogo,
    slug: "kucoin",
    category: "Exchange",
    result: "$2B+ Trading Volume",
    gradient: "from-[#23AF91]/20 to-[#23AF91]/5",
    borderColor: "border-[#23AF91]/30",
    hoverBorder: "hover:border-[#23AF91]/60",
    glowColor: "#23AF91",
  },
  {
    name: "Polygon",
    logo: polygonLogo,
    slug: "polygon",
    category: "Layer 2",
    result: "100+ Dapps Onboarded",
    gradient: "from-[#8247E5]/20 to-[#8247E5]/5",
    borderColor: "border-[#8247E5]/30",
    hoverBorder: "hover:border-[#8247E5]/60",
    glowColor: "#8247E5",
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
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${project.gradient} border ${project.borderColor} ${project.hoverBorder} p-8 transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* Intense Glow Effect on Hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, ${project.glowColor}40 0%, ${project.glowColor}20 30%, transparent 70%)`,
                  filter: 'blur(40px)',
                }}
              />
              <div 
                className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{
                  boxShadow: `0 0 60px 20px ${project.glowColor}30, 0 0 100px 40px ${project.glowColor}15`,
                }}
              />

              {/* Category Badge */}
              <div className="absolute top-6 right-6 z-10">
                <span className="text-xs text-white/40 uppercase tracking-wider group-hover:text-white/70 transition-colors">
                  {project.category}
                </span>
              </div>

              {/* Logo */}
              <div className="relative z-10 h-32 flex items-center justify-start mb-8">
                <img 
                  src={project.logo} 
                  alt={project.name}
                  className="h-16 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">{project.name}</h3>
                <p className="text-white/60 group-hover:text-white/80 transition-colors">{project.result}</p>
              </div>

              {/* Arrow */}
              <div className="absolute bottom-6 right-6 z-10 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:bg-white/10 group-hover:scale-110">
                <ArrowUpRight className="w-5 h-5 text-white" />
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
