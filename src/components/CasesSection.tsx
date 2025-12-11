import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const cases = [
  {
    id: 1,
    name: "DeFi Protocol",
    category: "DeFi",
    gradient: "case-gradient-pink",
    logo: "DeFi",
    result: "+450% Community Growth",
  },
  {
    id: 2,
    name: "NFT Marketplace",
    category: "NFT",
    gradient: "case-gradient-orange",
    logo: "NFT",
    result: "+$2.5M Trading Volume",
  },
  {
    id: 3,
    name: "Layer 2 Solution",
    category: "Infrastructure",
    gradient: "case-gradient-blue particles-bg",
    logo: "L2",
    result: "+120K Korean Users",
  },
  {
    id: 4,
    name: "GameFi Project",
    category: "Gaming",
    gradient: "case-gradient-purple",
    logo: "GameFi",
    result: "+85% DAU Increase",
  },
  {
    id: 5,
    name: "DAO Platform",
    category: "DAO",
    gradient: "case-gradient-teal",
    logo: "DAO",
    result: "+15K Token Holders",
  },
  {
    id: 6,
    name: "Infrastructure",
    category: "Infra",
    gradient: "case-gradient-green",
    logo: "Infra",
    result: "+300% Brand Awareness",
  },
];

const CasesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 bg-background">
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured Cases <span className="text-muted-foreground">///</span>
            </h2>
          </div>
          <Link 
            to="/projects" 
            className="hidden md:flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
          >
            <span>All Cases</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="container mx-auto px-6">
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {cases.map((item, index) => (
            <Link
              key={item.id}
              to="/projects"
              className={`${item.gradient} aspect-[4/3] rounded-2xl flex flex-col justify-between p-6 group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-xl`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Category Tag */}
              <div className="flex items-start justify-between">
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-sm">
                  {item.category}
                </span>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-4">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Logo/Text */}
              <div>
                <span className="text-4xl md:text-5xl font-bold text-white/90 group-hover:text-white transition-colors">
                  {item.logo}
                </span>
                <p className="text-white/70 text-sm mt-2 group-hover:text-white/90 transition-colors">
                  {item.result}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 md:hidden text-center">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
          >
            <span>View All Cases</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
