import { Blocks, Coins, Gamepad2, Image, ListChecks, Users } from "lucide-react";

const services = [
  {
    icon: Blocks,
    title: "Web3 Marketing",
    description: "Comprehensive marketing strategies for blockchain projects, including community building, PR, and influencer campaigns.",
  },
  {
    icon: Image,
    title: "NFT Marketing",
    description: "End-to-end NFT launch services from artwork strategy to marketplace listing and community engagement.",
  },
  {
    icon: Coins,
    title: "DeFi Marketing",
    description: "Specialized marketing for DeFi protocols including liquidity programs, yield farming campaigns, and TVL growth.",
  },
  {
    icon: Gamepad2,
    title: "GameFi",
    description: "Gaming-focused marketing strategies for play-to-earn and GameFi projects targeting the Korean gaming market.",
  },
  {
    icon: ListChecks,
    title: "Exchange Listing",
    description: "Professional assistance with Korean and international exchange listings including documentation and negotiations.",
  },
  {
    icon: Users,
    title: "Advisory",
    description: "Strategic consulting for tokenomics, go-to-market strategy, and regulatory compliance in the Korean market.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-primary text-sm font-medium tracking-wide mb-4">
            What We Do
          </p>
          <h2 className="text-display-md md:text-display-lg max-w-3xl mx-auto">
            Full-service Web3 marketing for the Korean market.
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-8 rounded-2xl bg-secondary/50 hover:bg-secondary transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <service.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
