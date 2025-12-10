import { TrendingUp, Users, Globe, ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import portfolioDao from "@/assets/portfolio-dao.png";
import portfolioDefi from "@/assets/portfolio-defi.png";
import portfolioGamefi from "@/assets/portfolio-gamefi.png";
import portfolioMetaverse from "@/assets/portfolio-metaverse.png";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  stats: { label: string; value: string }[];
  tags: string[];
}

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "DeFi Protocol Launch",
    category: "DeFi",
    image: portfolioDefi,
    description: "Full-service marketing campaign for global DeFi protocol entering Korean market",
    stats: [
      { label: "TVL Growth", value: "+340%" },
      { label: "Community", value: "50K+" },
      { label: "Countries", value: "15+" },
    ],
    tags: ["Community", "PR", "Influencer"],
  },
  {
    id: "2",
    title: "NFT Collection Drop",
    category: "NFT",
    image: portfolioDao,
    description: "Comprehensive marketing strategy for successful 10,000 NFT collection mint",
    stats: [
      { label: "Sold Out", value: "100%" },
      { label: "Holders", value: "8.5K" },
      { label: "Floor", value: "2.5x" },
    ],
    tags: ["Whitelist", "Discord", "Twitter"],
  },
  {
    id: "3",
    title: "GameFi Global Launch",
    category: "GameFi",
    image: portfolioGamefi,
    description: "P2E game global launch and Asian market expansion campaign",
    stats: [
      { label: "DAU", value: "120K" },
      { label: "Downloads", value: "1M+" },
      { label: "Partners", value: "20+" },
    ],
    tags: ["Guilds", "Streamers", "Events"],
  },
  {
    id: "4",
    title: "Metaverse Platform",
    category: "Metaverse",
    image: portfolioMetaverse,
    description: "Brand awareness and user acquisition campaign for metaverse platform",
    stats: [
      { label: "Users", value: "500K" },
      { label: "Land Sale", value: "95%" },
      { label: "Brands", value: "30+" },
    ],
    tags: ["Brand Collab", "VR Events", "PR"],
  },
];

const CaseStudiesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-4 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-xs font-medium text-primary mb-4 block tracking-widest uppercase">
            Case Studies
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-tight">
            Success <span className="text-gradient">Stories</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real results from our Web3 marketing campaigns
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className="group bg-card border border-border/30 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={study.image} 
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-semibold text-primary bg-primary/20 px-3 py-1 rounded uppercase tracking-wider">
                    {study.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 uppercase tracking-tight group-hover:text-gradient transition-all">
                  {study.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {study.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {study.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-lg font-bold text-gradient">{stat.value}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all uppercase tracking-wider">
                  View Details
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
