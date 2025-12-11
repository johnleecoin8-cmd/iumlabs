import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { images } from "@/config/content";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "metaverse-korea",
    name: "Metaverse Korea",
    category: "NFT / Metaverse",
    description: "Full Korean market entry including KOL campaigns, community setup, and comprehensive PR coverage across major crypto media outlets.",
    result: "$12M Raised",
    image: images.portfolio.metaverse,
    services: ["KOL Marketing", "Community Building", "PR & Media"],
    color: "bg-purple-100 text-purple-700",
    borderColor: "border-purple-200 hover:border-purple-400",
  },
  {
    id: "kimchiswap",
    name: "KimchiSwap",
    category: "DeFi",
    description: "Community growth from 0 to 50K Korean users with targeted influencer marketing, AMA sessions, and yield farming campaigns.",
    result: "$8.5M TVL",
    image: images.portfolio.defi,
    services: ["Community Growth", "KOL Marketing", "Event Management"],
    color: "bg-blue-100 text-blue-700",
    borderColor: "border-blue-200 hover:border-blue-400",
  },
  {
    id: "seoul-dao",
    name: "Seoul DAO",
    category: "DAO / Governance",
    description: "Event management at Korea Blockchain Week and ongoing community operations with 24/7 Korean moderation support.",
    result: "15K Members",
    image: images.portfolio.dao,
    services: ["Events", "Community Building", "PR & Media"],
    color: "bg-green-100 text-green-700",
    borderColor: "border-green-200 hover:border-green-400",
  },
  {
    id: "k-play",
    name: "K-Play Games",
    category: "GameFi",
    description: "Gaming influencer campaigns and partnership with top Korean gaming guilds, resulting in massive user acquisition.",
    result: "$20M Raised",
    image: images.portfolio.gamefi,
    services: ["KOL Marketing", "Community Growth", "GTM Strategy"],
    color: "bg-orange-100 text-orange-700",
    borderColor: "border-orange-200 hover:border-orange-400",
  },
  {
    id: "defi-protocol-x",
    name: "DeFi Protocol X",
    category: "DeFi",
    description: "TVL growth campaign with targeted yield farming promotions and strategic exchange listings on Korean CEXs.",
    result: "$45M TVL",
    image: images.portfolio.defi,
    services: ["GTM Strategy", "Exchange Listing", "PR & Media"],
    color: "bg-teal-100 text-teal-700",
    borderColor: "border-teal-200 hover:border-teal-400",
  },
  {
    id: "nft-collection-y",
    name: "K-Art NFT",
    category: "NFT",
    description: "Successful NFT collection launch with Korean artist collaborations and celebrity KOL partnerships.",
    result: "10K Minted",
    image: images.portfolio.metaverse,
    services: ["KOL Marketing", "Community Building", "Events"],
    color: "bg-pink-100 text-pink-700",
    borderColor: "border-pink-200 hover:border-pink-400",
  },
];

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="text-sm font-medium text-purple-600 tracking-wider mb-4 block">CASE STUDIES</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Our <span className="text-gradient">Work</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of successful Web3 projects launched in the Korean market.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={ref} className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`group cursor-pointer transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${100 + index * 100}ms` }}
              >
                {/* Image */}
                <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-card border-2 ${project.borderColor} group-hover:shadow-lg transition-all`}>
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Result Badge */}
                  <div className={`absolute bottom-4 left-4 px-3 py-1.5 ${project.color} text-sm font-medium rounded-full`}>
                    {project.result}
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <span className={`text-xs font-medium ${project.color} px-2 py-1 rounded-full`}>
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Services Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span key={service} className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
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
