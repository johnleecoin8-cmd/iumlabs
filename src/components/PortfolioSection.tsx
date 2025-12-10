import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import portfolioMetaverse from "@/assets/portfolio-metaverse.png";
import portfolioDefi from "@/assets/portfolio-defi.png";
import portfolioDao from "@/assets/portfolio-dao.png";
import portfolioGamefi from "@/assets/portfolio-gamefi.png";

const projects = [
  {
    id: "metaverse-korea",
    name: "Metaverse Korea",
    category: "Metaverse",
    description: "Led Korean market entry for a leading metaverse platform, achieving 500K+ registered users in 3 months.",
    raised: "$15M",
    growth: "+340%",
    image: portfolioMetaverse,
  },
  {
    id: "kimchiswap",
    name: "KimchiSwap",
    category: "DeFi",
    description: "Full-service marketing for Korea's first DEX aggregator, from launch to $100M TVL milestone.",
    raised: "$8M",
    growth: "+520%",
    image: portfolioDefi,
  },
  {
    id: "seoul-dao",
    name: "Seoul DAO",
    category: "DAO",
    description: "Built Korea's largest Web3 governance community with 50K+ active members and $2M treasury.",
    raised: "$5M",
    growth: "+280%",
    image: portfolioDao,
  },
  {
    id: "k-play",
    name: "K-Play Games",
    category: "GameFi",
    description: "P2E game marketing campaign that topped Korean app store charts for 2 consecutive weeks.",
    raised: "$12M",
    growth: "+450%",
    image: portfolioGamefi,
  },
];

const PortfolioSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} id="portfolio" className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-card/30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="text-primary font-mono text-sm tracking-wider mb-4 block">02. PORTFOLIO</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl tracking-tight">
              <span className="font-serif italic text-muted-foreground">Featured</span>{" "}
              <span className="font-sans font-bold text-foreground">Case Studies</span>
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-all group"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Projects Grid - Bento Style */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`group relative overflow-hidden rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
                  <span className="text-xs font-medium text-primary">{project.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">
                  {project.description}
                </p>

                {/* Stats Row */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-6">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Raised</div>
                      <div className="text-lg font-bold text-foreground">{project.raised}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Growth</div>
                      <div className="text-lg font-bold text-primary">{project.growth}</div>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                    <ArrowUpRight className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
