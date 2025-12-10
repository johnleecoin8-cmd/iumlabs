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
    <section id="portfolio" className="py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <p className="text-primary text-sm font-medium tracking-wide mb-4">
              Our Work
            </p>
            <h2 className="text-display-md md:text-display-lg">
              Featured Projects
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all"
          >
            View All
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className="group relative p-8 rounded-2xl bg-secondary/50 hover:bg-secondary transition-all duration-300 cursor-pointer"
            >
              {/* Category Badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-foreground/5 text-sm mb-4">
                {project.category}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
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
                  <div className="text-xl font-semibold">
                    {project.raised}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-all">
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-background transition-colors" />
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
