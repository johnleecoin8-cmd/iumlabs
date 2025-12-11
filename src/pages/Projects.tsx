import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { images } from "@/config/content";
import { ArrowUpRight } from "lucide-react";
import CalendlyButton from "@/components/CalendlyButton";

const projects = [
  {
    id: "metaverse-korea",
    name: "Metaverse Korea",
    category: "NFT / Metaverse",
    description: "Full Korean market entry including KOL campaigns, community setup, and comprehensive PR coverage across major crypto media outlets.",
    result: "$12M Raised",
    image: images.portfolio.metaverse,
    services: ["KOL Marketing", "Community Building", "PR & Media"],
    gradient: "from-purple-600 via-pink-500 to-red-500",
  },
  {
    id: "kimchiswap",
    name: "KimchiSwap",
    category: "DeFi",
    description: "Community growth from 0 to 50K Korean users with targeted influencer marketing, AMA sessions, and yield farming campaigns.",
    result: "$8.5M TVL",
    image: images.portfolio.defi,
    services: ["Community Growth", "KOL Marketing", "Event Management"],
    gradient: "from-blue-600 via-cyan-500 to-teal-500",
  },
  {
    id: "seoul-dao",
    name: "Seoul DAO",
    category: "DAO / Governance",
    description: "Event management at Korea Blockchain Week and ongoing community operations with 24/7 Korean moderation support.",
    result: "15K Members",
    image: images.portfolio.dao,
    services: ["Events", "Community Building", "PR & Media"],
    gradient: "from-green-600 via-emerald-500 to-teal-500",
  },
  {
    id: "k-play",
    name: "K-Play Games",
    category: "GameFi",
    description: "Gaming influencer campaigns and partnership with top Korean gaming guilds, resulting in massive user acquisition.",
    result: "$20M Raised",
    image: images.portfolio.gamefi,
    services: ["KOL Marketing", "Community Growth", "GTM Strategy"],
    gradient: "from-orange-600 via-amber-500 to-yellow-500",
  },
  {
    id: "defi-protocol-x",
    name: "DeFi Protocol X",
    category: "DeFi",
    description: "TVL growth campaign with targeted yield farming promotions and strategic exchange listings on Korean CEXs.",
    result: "$45M TVL",
    image: images.portfolio.defi,
    services: ["GTM Strategy", "Exchange Listing", "PR & Media"],
    gradient: "from-indigo-600 via-purple-500 to-pink-500",
  },
  {
    id: "nft-collection-y",
    name: "K-Art NFT",
    category: "NFT",
    description: "Successful NFT collection launch with Korean artist collaborations and celebrity KOL partnerships.",
    result: "10K Minted",
    image: images.portfolio.metaverse,
    services: ["KOL Marketing", "Community Building", "Events"],
    gradient: "from-rose-600 via-pink-500 to-fuchsia-500",
  },
];

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - What */}
            <div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-foreground mb-8">
                Cases
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Explore our portfolio of successful Web3 projects launched in the Korean market. Real results, real growth.
              </p>
              <CalendlyButton 
                variant="outline" 
                className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                [ book a meeting ]
              </CalendlyButton>
            </div>

            {/* Right - Stats */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Results
              </h2>
              <div className="space-y-4">
                <div className="flex items-baseline justify-between py-4 border-b border-dashed border-border/50">
                  <span className="text-muted-foreground">Total Funds Raised</span>
                  <span className="text-3xl font-bold text-foreground">[ $100M+ ]</span>
                </div>
                <div className="flex items-baseline justify-between py-4 border-b border-dashed border-border/50">
                  <span className="text-muted-foreground">Projects Launched</span>
                  <span className="text-3xl font-bold text-foreground">[ 50+ ]</span>
                </div>
                <div className="flex items-baseline justify-between py-4 border-b border-dashed border-border/50">
                  <span className="text-muted-foreground">Community Members</span>
                  <span className="text-3xl font-bold text-foreground">[ 500K+ ]</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={ref} className="py-16 px-4 border-t border-border/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`group cursor-pointer transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${100 + index * 100}ms` }}
              >
                {/* Image with gradient overlay */}
                <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gradient-to-br ${project.gradient}`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Result Badge */}
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium rounded-full">
                    {project.result}
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <span className="text-xs font-mono text-primary px-2 py-1 border border-primary/30 rounded-full">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mt-3 mb-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Services Tags */}
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