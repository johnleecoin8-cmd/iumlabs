import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTilt } from "@/hooks/useTilt";
import portfolioMetaverse from "@/assets/portfolio-metaverse.png";
import portfolioDefi from "@/assets/portfolio-defi.png";
import portfolioDao from "@/assets/portfolio-dao.png";
import portfolioGamefi from "@/assets/portfolio-gamefi.png";

const projects = [
  {
    name: "MetaVerse Korea",
    category: "NFT",
    raised: "$12M",
    description: "Leading Korean metaverse platform with virtual real estate and social features.",
    gradient: "from-primary to-accent",
    accentColor: "primary",
    image: portfolioMetaverse,
  },
  {
    name: "KimchiSwap",
    category: "DeFi",
    raised: "$8.5M",
    description: "Korea's premier DEX with innovative AMM and yield farming protocols.",
    gradient: "from-gradient-cyan to-primary",
    accentColor: "gradient-cyan",
    image: portfolioDefi,
  },
  {
    name: "SeoulDAO",
    category: "Web3",
    raised: "$15M",
    description: "Decentralized autonomous organization for Korean Web3 ecosystem development.",
    gradient: "from-gradient-pink to-gradient-orange",
    accentColor: "gradient-pink",
    image: portfolioDao,
  },
  {
    name: "K-Play",
    category: "GameFi",
    raised: "$20M",
    description: "Play-to-earn gaming platform featuring top Korean game IPs.",
    gradient: "from-gradient-orange to-gradient-pink",
    accentColor: "gradient-orange",
    image: portfolioGamefi,
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const tilt = useTilt({ max: 8, scale: 1.02 });
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`scroll-animate ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={tilt.style}
        className="group relative glass-card-hover cursor-pointer overflow-hidden h-full"
      >
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-80`} />
          
          {/* Category Badge - positioned on image */}
          <div className={`absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r ${project.gradient} bg-opacity-10 text-sm backdrop-blur-sm`}>
            <span className="text-foreground/90 font-medium">{project.category}</span>
          </div>
        </div>
        
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Glare effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)',
          }}
        />

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-3 group-hover:text-gradient transition-all duration-300">
            {project.name}
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Funds Raised
              </div>
              <div className="text-xl font-semibold text-gradient">
                {project.raised}
              </div>
            </div>
            <div className={`w-12 h-12 rounded-full glass-card flex items-center justify-center group-hover:bg-gradient-to-br ${project.gradient} transition-all duration-300`}>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section id="portfolio" className="py-32 relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="gradient-blob gradient-blob-pink w-[400px] h-[400px] top-20 right-0 opacity-20" />
        <div className="gradient-blob gradient-blob-orange w-[300px] h-[300px] bottom-20 left-0 opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6 scroll-animate ${headerVisible ? 'is-visible' : ''}`}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <span className="text-sm font-medium text-primary">Our Work</span>
            </div>
            <h2 className="text-display-md md:text-display-lg">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all group"
          >
            View All
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;