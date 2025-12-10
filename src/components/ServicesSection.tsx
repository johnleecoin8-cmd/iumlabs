import { Blocks, Coins, Gamepad2, Image, ListChecks, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTilt } from "@/hooks/useTilt";

const services = [
  {
    icon: Blocks,
    title: "Web3 Marketing",
    description: "Comprehensive marketing strategies for blockchain projects, including community building, PR, and influencer campaigns.",
    size: "large",
    gradient: "from-primary to-accent",
  },
  {
    icon: Image,
    title: "NFT Marketing",
    description: "End-to-end NFT launch services from artwork strategy to marketplace listing and community engagement.",
    size: "medium",
    gradient: "from-gradient-pink to-gradient-orange",
  },
  {
    icon: Coins,
    title: "DeFi Marketing",
    description: "Specialized marketing for DeFi protocols including liquidity programs, yield farming campaigns, and TVL growth.",
    size: "medium",
    gradient: "from-gradient-cyan to-primary",
  },
  {
    icon: Gamepad2,
    title: "GameFi",
    description: "Gaming-focused marketing strategies for play-to-earn and GameFi projects targeting the Korean gaming market.",
    size: "small",
    gradient: "from-gradient-orange to-gradient-pink",
  },
  {
    icon: ListChecks,
    title: "Exchange Listing",
    description: "Professional assistance with Korean and international exchange listings including documentation and negotiations.",
    size: "small",
    gradient: "from-primary to-gradient-cyan",
  },
  {
    icon: Users,
    title: "Advisory",
    description: "Strategic consulting for tokenomics, go-to-market strategy, and regulatory compliance in the Korean market.",
    size: "large",
    gradient: "from-accent to-gradient-pink",
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const tilt = useTilt({ max: 10, scale: 1.02 });
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`scroll-animate ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={tilt.style}
        className={`group glass-card-hover p-8 h-full ${
          service.size === "large" ? "lg:col-span-1 lg:row-span-1" : ""
        }`}
      >
        {/* Icon with gradient background */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6`}>
          <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
            <service.icon className="w-6 h-6 text-foreground group-hover:text-primary-foreground transition-colors duration-300" />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold mb-3 group-hover:text-gradient transition-all duration-300">
          {service.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {service.description}
        </p>

        {/* Hover indicator */}
        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
          <span>Learn more</span>
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section id="services" className="py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="gradient-blob gradient-blob-purple w-[500px] h-[500px] top-0 right-0 opacity-30" />
        <div className="gradient-blob gradient-blob-cyan w-[400px] h-[400px] bottom-0 left-0 opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-20 scroll-animate ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <span className="text-sm font-medium text-primary">What We Do</span>
          </div>
          <h2 className="text-display-md md:text-display-lg max-w-3xl mx-auto">
            Full-service <span className="text-gradient">Web3 marketing</span> for the Korean market.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
