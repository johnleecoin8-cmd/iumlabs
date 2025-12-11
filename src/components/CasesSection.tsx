import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { images } from "@/config/content";

const cases = [
  {
    id: "metaverse-korea",
    name: "Metaverse Korea",
    category: "NFT / Metaverse",
    description: "Full Korean market entry including KOL campaigns, community setup, and PR coverage.",
    result: "$12M Raised",
    image: images.portfolio.metaverse,
    color: "bg-purple-100 text-purple-700",
    borderColor: "border-purple-200",
  },
  {
    id: "kimchiswap",
    name: "KimchiSwap",
    category: "DeFi",
    description: "Community growth from 0 to 50K Korean users with targeted influencer marketing.",
    result: "$8.5M TVL",
    image: images.portfolio.defi,
    color: "bg-blue-100 text-blue-700",
    borderColor: "border-blue-200",
  },
  {
    id: "seoul-dao",
    name: "Seoul DAO",
    category: "DAO / Governance",
    description: "Event management at Korea Blockchain Week and ongoing community operations.",
    result: "15K Members",
    image: images.portfolio.dao,
    color: "bg-green-100 text-green-700",
    borderColor: "border-green-200",
  },
  {
    id: "k-play",
    name: "K-Play Games",
    category: "GameFi",
    description: "Gaming influencer campaigns and partnership with top Korean gaming guilds.",
    result: "$20M Raised",
    image: images.portfolio.gamefi,
    color: "bg-orange-100 text-orange-700",
    borderColor: "border-orange-200",
  },
];

const CasesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`flex items-end justify-between mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="text-sm font-medium text-purple-600 tracking-wider mb-4 block">FEATURED CASES</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Our Work
            </h2>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all shadow-sm"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all shadow-sm"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Cases */}
        <div 
          ref={scrollRef}
          className={`flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {cases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="flex-shrink-0 w-[320px] md:w-[380px] group cursor-pointer"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Image */}
              <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-card border ${caseItem.borderColor} group-hover:shadow-lg transition-all`}>
                <img 
                  src={caseItem.image} 
                  alt={caseItem.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                {/* Result Badge */}
                <div className={`absolute bottom-4 left-4 px-3 py-1.5 ${caseItem.color} text-sm font-medium rounded-full`}>
                  {caseItem.result}
                </div>
              </div>

              {/* Content */}
              <div>
                <span className={`text-xs font-medium ${caseItem.color} px-2 py-1 rounded-full`}>{caseItem.category}</span>
                <h3 className="text-xl font-semibold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors">
                  {caseItem.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {caseItem.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className={`mt-10 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Link 
            to="/projects"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
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
