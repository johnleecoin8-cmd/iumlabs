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
    glowColor: "primary",
    image: portfolioMetaverse,
  },
  {
    name: "KimchiSwap",
    category: "DeFi",
    raised: "$8.5M",
    description: "Korea's premier DEX with innovative AMM and yield farming protocols.",
    gradient: "from-gradient-cyan to-primary",
    glowColor: "gradient-cyan",
    image: portfolioDefi,
  },
  {
    name: "SeoulDAO",
    category: "Web3",
    raised: "$15M",
    description: "Decentralized autonomous organization for Korean Web3 ecosystem development.",
    gradient: "from-gradient-pink to-gradient-orange",
    glowColor: "gradient-pink",
    image: portfolioDao,
  },
  {
    name: "K-Play",
    category: "GameFi",
    raised: "$20M",
    description: "Play-to-earn gaming platform featuring top Korean game IPs.",
    gradient: "from-gradient-orange to-gradient-pink",
    glowColor: "gradient-orange",
    image: portfolioGamefi,
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const tilt = useTilt({ max: 12, scale: 1.03 });
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
        className="group relative cursor-pointer overflow-hidden rounded-2xl"
      >
        {/* Outer glow effect - visible on hover */}
        <div className={`absolute -inset-2 bg-gradient-to-r ${project.gradient} rounded-3xl opacity-0 blur-xl transition-all duration-500 group-hover:opacity-60 group-hover:blur-2xl group-hover:-inset-4`} />
        
        {/* Card container */}
        <div className="relative glass-card-hover overflow-hidden">
          {/* Project Image with enhanced hover */}
          <div className="relative h-56 overflow-hidden">
            {/* Image glow layer */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-10`} />
            
            <img 
              src={project.image} 
              alt={project.name}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
            />
            
            {/* Shine sweep effect */}
            <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
            </div>
            
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent opacity-90 z-10`} />
            
            {/* Category Badge - positioned on image */}
            <div className={`absolute top-4 left-4 z-30 inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r ${project.gradient} text-sm backdrop-blur-sm shadow-lg transition-transform duration-300 group-hover:scale-110`}>
              <span className="text-primary-foreground font-medium">{project.category}</span>
            </div>
            
            {/* Floating stats badge */}
            <div className="absolute top-4 right-4 z-30 glass-card px-3 py-1.5 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <span className="text-xs font-medium text-green-400">● Active</span>
            </div>
          </div>
          
          {/* Glare effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 55%, transparent 60%)',
            }}
          />

          {/* Content */}
          <div className="relative p-6 z-20">
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
              <div className={`w-12 h-12 rounded-full glass-card flex items-center justify-center group-hover:bg-gradient-to-br ${project.gradient} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
              </div>
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
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;