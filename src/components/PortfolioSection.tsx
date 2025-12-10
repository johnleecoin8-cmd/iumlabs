import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "MetaVerse Korea",
    category: "NFT",
    raised: "$12M",
    description: "Leading Korean metaverse platform with virtual real estate and social features.",
    gradient: "from-primary to-accent",
    accentColor: "primary",
  },
  {
    name: "KimchiSwap",
    category: "DeFi",
    raised: "$8.5M",
    description: "Korea's premier DEX with innovative AMM and yield farming protocols.",
    gradient: "from-gradient-cyan to-primary",
    accentColor: "gradient-cyan",
  },
  {
    name: "SeoulDAO",
    category: "Web3",
    raised: "$15M",
    description: "Decentralized autonomous organization for Korean Web3 ecosystem development.",
    gradient: "from-gradient-pink to-gradient-orange",
    accentColor: "gradient-pink",
  },
  {
    name: "K-Play",
    category: "GameFi",
    raised: "$20M",
    description: "Play-to-earn gaming platform featuring top Korean game IPs.",
    gradient: "from-gradient-orange to-gradient-pink",
    accentColor: "gradient-orange",
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-32 relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="gradient-blob gradient-blob-pink w-[400px] h-[400px] top-20 right-0 opacity-20" />
        <div className="gradient-blob gradient-blob-orange w-[300px] h-[300px] bottom-20 left-0 opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
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
          {projects.map((project) => (
            <div
              key={project.name}
              className="group relative glass-card-hover p-8 cursor-pointer overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Category Badge */}
              <div className={`inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r ${project.gradient} bg-opacity-10 text-sm mb-4`}>
                <span className="text-foreground/80">{project.category}</span>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-semibold mb-3 group-hover:text-gradient transition-all duration-300">
                {project.name}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;