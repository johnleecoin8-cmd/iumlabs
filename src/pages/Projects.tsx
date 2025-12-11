import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { ArrowUpRight, Calendar } from "lucide-react";
import CalendlyButton from "@/components/CalendlyButton";

const projects = [
  {
    id: 1,
    name: "DeFi Protocol",
    category: "DeFi",
    gradient: "case-gradient-blue",
    logo: "https://cryptologos.cc/logos/uniswap-uni-logo.svg",
    result: "+340% Korean Trading Volume",
    description: "Full Korean market entry including KOL campaigns, community setup, and comprehensive PR coverage.",
    services: ["KOL Marketing", "Community Building", "PR & Media"],
  },
  {
    id: 2,
    name: "NFT Marketplace",
    category: "NFT",
    gradient: "case-gradient-red",
    logo: "https://cryptologos.cc/logos/apecoin-ape-logo.svg",
    result: "50K+ Korean Holders",
    description: "Successful NFT collection launch with Korean artist collaborations and celebrity KOL partnerships.",
    services: ["KOL Marketing", "Community Growth", "Events"],
  },
  {
    id: 3,
    name: "Layer 2 Network",
    category: "Infrastructure",
    gradient: "case-gradient-blue",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg",
    result: "$2M Korean TVL in 30 Days",
    description: "Community growth from 0 to 50K Korean users with targeted influencer marketing and AMA sessions.",
    services: ["Community Growth", "KOL Marketing", "Event Management"],
  },
  {
    id: 4,
    name: "GameFi Project",
    category: "GameFi",
    gradient: "case-gradient-red",
    logo: "https://cryptologos.cc/logos/axie-infinity-axs-logo.svg",
    result: "100K+ Korean Players",
    description: "Gaming influencer campaigns and partnership with top Korean gaming guilds.",
    services: ["KOL Marketing", "Community Growth", "GTM Strategy"],
  },
  {
    id: 5,
    name: "DAO Platform",
    category: "DAO",
    gradient: "case-gradient-blue",
    logo: "https://cryptologos.cc/logos/maker-mkr-logo.svg",
    result: "5K+ Korean DAO Members",
    description: "Event management at Korea Blockchain Week and ongoing community operations.",
    services: ["Events", "Community Building", "PR & Media"],
  },
  {
    id: 6,
    name: "Metaverse World",
    category: "Metaverse",
    gradient: "case-gradient-red",
    logo: "https://cryptologos.cc/logos/decentraland-mana-logo.svg",
    result: "#1 Korean Metaverse Project",
    description: "TVL growth campaign with targeted yield farming promotions and strategic exchange listings.",
    services: ["GTM Strategy", "Exchange Listing", "PR & Media"],
  },
];

const stats = [
  { value: "$500M+", label: "Total Value Marketed" },
  { value: "200+", label: "Projects Launched" },
  { value: "500K+", label: "Community Members" },
];

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero - Dark Section */}
      <section className="section-dark pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="number-badge text-[hsl(var(--dark-fg))] opacity-60 mb-4 inline-block">Our Work</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-[hsl(var(--dark-fg))] leading-tight mb-6">
              Featured <span className="serif-italic">Cases</span>
            </h1>
            <p className="text-lg md:text-xl text-[hsl(var(--dark-fg))] opacity-60 max-w-2xl mx-auto mb-8">
              Explore our portfolio of successful Web3 projects launched in the Korean market.
            </p>
            <CalendlyButton className="lunar-btn">
              <Calendar className="w-4 h-4" />
              <span>Start Your Project</span>
            </CalendlyButton>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-[hsl(var(--dark-fg))] opacity-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[hsl(var(--dark-fg))] mb-2">{stat.value}</div>
                <div className="text-sm text-[hsl(var(--dark-fg))] opacity-60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid - Light */}
      <section ref={ref} className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`group cursor-pointer transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Card with gradient */}
                <div className={`case-card ${project.gradient} aspect-[4/5] rounded-2xl p-6 flex flex-col justify-between mb-4`}>
                  {/* Top - Category */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[hsl(var(--dark-fg))] opacity-70 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <div className="arrow-icon">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Center - Logo */}
                  <div className="flex items-center justify-center flex-1">
                    <img 
                      src={project.logo} 
                      alt={project.name}
                      className="w-20 h-20 object-contain brightness-0 invert opacity-90"
                    />
                  </div>

                  {/* Bottom - Result */}
                  <div>
                    <p className="text-sm text-[hsl(var(--dark-fg))] opacity-70 mb-1">{project.name}</p>
                    <p className="text-lg font-medium text-[hsl(var(--dark-fg))]">{project.result}</p>
                  </div>
                </div>

                {/* Content Below Card */}
                <div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span key={service} className="text-xs px-2 py-1 bg-muted/50 border border-border/50 rounded-full text-muted-foreground">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Projects;
