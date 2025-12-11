import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const cases = [
  {
    id: 1,
    name: "DeFi Protocol",
    gradient: "case-gradient-pink",
    logo: "DeFi",
  },
  {
    id: 2,
    name: "NFT Marketplace",
    gradient: "case-gradient-orange",
    logo: "NFT",
  },
  {
    id: 3,
    name: "Layer 2 Solution",
    gradient: "case-gradient-blue particles-bg",
    logo: "L2",
  },
  {
    id: 4,
    name: "GameFi Project",
    gradient: "case-gradient-purple",
    logo: "GameFi",
  },
  {
    id: 5,
    name: "DAO Platform",
    gradient: "case-gradient-teal",
    logo: "DAO",
  },
  {
    id: 6,
    name: "Infrastructure",
    gradient: "case-gradient-green",
    logo: "Infra",
  },
];

const CasesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="bg-background">
      {/* Section Header */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">01</span>
            <h2 className="text-2xl font-bold text-foreground">Cases</h2>
          </div>
          <Link 
            to="/projects" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <span>View All</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 3x2 Full Color Grid */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {cases.map((item, index) => (
          <Link
            key={item.id}
            to="/projects"
            className={`${item.gradient} aspect-[4/3] flex items-center justify-center group relative overflow-hidden transition-all duration-500`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {/* Logo/Text */}
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 group-hover:scale-110 transition-transform duration-500">
              {item.logo}
            </span>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

            {/* Arrow on hover */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight className="w-6 h-6 text-white" />
            </div>

            {/* Project name on hover */}
            <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-sm font-medium">{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CasesSection;
