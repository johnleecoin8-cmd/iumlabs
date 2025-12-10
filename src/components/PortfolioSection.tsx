import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTilt } from "@/hooks/useTilt";
import { Link } from "react-router-dom";
import portfolioMetaverse from "@/assets/portfolio-metaverse.png";
import portfolioDefi from "@/assets/portfolio-defi.png";
import portfolioDao from "@/assets/portfolio-dao.png";
import portfolioGamefi from "@/assets/portfolio-gamefi.png";
import { portfolio } from "@/config/content";

const imageMap: Record<string, string> = {
  "metaverse-korea": portfolioMetaverse,
  "kimchiswap": portfolioDefi,
  "seoul-dao": portfolioDao,
  "k-play": portfolioGamefi,
};

const ProjectCard = ({ project, index }: { project: typeof portfolio.projects[0]; index: number }) => {
  const tilt = useTilt({ max: 8, scale: 1.02 });
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const image = imageMap[project.id] || portfolioMetaverse;

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
        className="group relative cursor-pointer overflow-hidden rounded-3xl border border-border/30 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-500"
      >
        {/* Project Image */}
        <div className="relative h-56 overflow-hidden">
          <img 
            src={image} 
            alt={project.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10 inline-flex items-center px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
            <span className="text-sm font-medium text-primary">{project.category}</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6">
          <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-2 text-sm">
            {project.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                {portfolio.fundsRaised}
              </div>
              <div className="text-xl font-bold text-foreground">
                {project.raised}
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
              <ArrowUpRight className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
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
        {/* Dot pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.3) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6 scroll-animate ${headerVisible ? 'is-visible' : ''}`}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">{portfolio.badge}</span>
            </div>
            <h2 className="text-4xl md:text-6xl tracking-tight">
              <span className="font-serif italic text-muted-foreground">Featured</span>{" "}
              <span className="font-sans font-bold text-foreground">Projects</span>
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-all group"
          >
            {portfolio.viewAll}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {portfolio.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;