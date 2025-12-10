import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "MetaVerse Korea",
    category: "NFT",
    raised: "$12M",
    description: "Leading Korean metaverse platform with virtual real estate and social features.",
  },
  {
    name: "KimchiSwap",
    category: "DeFi",
    raised: "$8.5M",
    description: "Korea's premier DEX with innovative AMM and yield farming protocols.",
  },
  {
    name: "SeoulDAO",
    category: "Web3",
    raised: "$15M",
    description: "Decentralized autonomous organization for Korean Web3 ecosystem development.",
  },
  {
    name: "K-Play",
    category: "GameFi",
    raised: "$20M",
    description: "Play-to-earn gaming platform featuring top Korean game IPs.",
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
              <span className="text-gradient">Featured Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              A selection of successful Web3 projects we've helped launch and grow
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-display uppercase tracking-wider text-sm hover:gap-4 transition-all"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className="group relative card-gradient rounded-xl p-8 overflow-hidden hover:border-primary/50 transition-all duration-500 cursor-pointer"
            >
              {/* Category Badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-display uppercase tracking-wider mb-4">
                {project.category}
              </div>

              {/* Content */}
              <h3 className="font-display text-2xl md:text-3xl font-bold uppercase mb-3 group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Funds Raised
                  </div>
                  <div className="text-2xl font-display font-bold text-gradient">
                    {project.raised}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                </div>
              </div>

              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
