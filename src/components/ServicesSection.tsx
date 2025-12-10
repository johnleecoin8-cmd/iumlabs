import { Blocks, Coins, Gamepad2, Image, ListChecks, Users } from "lucide-react";

const services = [
  {
    icon: Blocks,
    title: "Web3 Marketing",
    description: "Comprehensive marketing strategies for blockchain projects, including community building, PR, and influencer campaigns.",
    features: ["Community Management", "PR & Media", "KOL Partnerships"],
  },
  {
    icon: Image,
    title: "NFT Marketing",
    description: "End-to-end NFT launch services from artwork strategy to marketplace listing and community engagement.",
    features: ["Launch Strategy", "Marketplace Listing", "Community Building"],
  },
  {
    icon: Coins,
    title: "DeFi Marketing",
    description: "Specialized marketing for DeFi protocols including liquidity programs, yield farming campaigns, and TVL growth.",
    features: ["TVL Growth", "Liquidity Campaigns", "Protocol Marketing"],
  },
  {
    icon: Gamepad2,
    title: "GameFi / P2E",
    description: "Gaming-focused marketing strategies for play-to-earn and GameFi projects targeting the Korean gaming market.",
    features: ["Player Acquisition", "Guild Partnerships", "Esports Marketing"],
  },
  {
    icon: ListChecks,
    title: "Exchange Listing",
    description: "Professional assistance with Korean and international exchange listings including documentation and negotiations.",
    features: ["CEX Listings", "DEX Listings", "Market Making"],
  },
  {
    icon: Users,
    title: "Advisory Services",
    description: "Strategic consulting for tokenomics, go-to-market strategy, and regulatory compliance in the Korean market.",
    features: ["Tokenomics", "Legal Advisory", "Market Entry"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
            <span className="text-gradient">Our Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Full-spectrum Web3 marketing services tailored for the Korean and Asian markets
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group card-gradient rounded-xl p-6 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold uppercase tracking-wide mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
