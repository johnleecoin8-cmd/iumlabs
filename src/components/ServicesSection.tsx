import { useState } from "react";
import { Blocks, Coins, Gamepad2, Image, ListChecks, Users, X, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTilt } from "@/hooks/useTilt";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Blocks,
    title: "Web3 Marketing",
    description: "Comprehensive marketing strategies for blockchain projects, including community building, PR, and influencer campaigns.",
    fullDescription: "Our Web3 marketing services provide end-to-end solutions for blockchain projects looking to establish a strong presence in the Korean market. We combine deep industry knowledge with proven marketing strategies to help your project reach its target audience effectively.",
    features: ["Community Building & Management", "KOL/Influencer Partnerships", "PR & Media Relations", "Social Media Strategy", "Content Marketing", "Event Planning & Execution"],
    gradient: "from-primary to-accent",
    iconAnimation: "icon-float",
  },
  {
    icon: Image,
    title: "NFT Marketing",
    description: "End-to-end NFT launch services from artwork strategy to marketplace listing and community engagement.",
    fullDescription: "Launch your NFT collection with maximum impact. Our NFT marketing expertise covers everything from pre-launch hype building to post-mint community engagement, ensuring your collection stands out in the competitive Korean NFT market.",
    features: ["Collection Strategy & Positioning", "Whitelist Campaign Management", "Discord & Community Setup", "Marketplace Optimization", "Secondary Sales Strategy", "Holder Benefits Program"],
    gradient: "from-gradient-pink to-gradient-orange",
    iconAnimation: "icon-bounce",
  },
  {
    icon: Coins,
    title: "DeFi Marketing",
    description: "Specialized marketing for DeFi protocols including liquidity programs, yield farming campaigns, and TVL growth.",
    fullDescription: "DeFi protocols require specialized marketing approaches. We help DeFi projects attract liquidity, grow TVL, and build engaged communities of power users through targeted campaigns and strategic partnerships.",
    features: ["TVL Growth Campaigns", "Yield Farming Promotions", "Liquidity Mining Programs", "Protocol Education Content", "DeFi Aggregator Listings", "Security Audit Marketing"],
    gradient: "from-gradient-cyan to-primary",
    iconAnimation: "icon-spin",
  },
  {
    icon: Gamepad2,
    title: "GameFi",
    description: "Gaming-focused marketing strategies for play-to-earn and GameFi projects targeting the Korean gaming market.",
    fullDescription: "Korea is one of the world's largest gaming markets. Our GameFi marketing services help blockchain games tap into this lucrative market with culturally-adapted campaigns and partnerships with Korean gaming influencers.",
    features: ["Gaming Influencer Campaigns", "Esports Partnerships", "Play-to-Earn Community Building", "Guild Partnerships", "Game Review Placements", "Beta Testing Campaigns"],
    gradient: "from-gradient-orange to-gradient-pink",
    iconAnimation: "icon-shake",
  },
  {
    icon: ListChecks,
    title: "Exchange Listing",
    description: "Professional assistance with Korean and international exchange listings including documentation and negotiations.",
    fullDescription: "Navigate the complex process of listing on Korean and international exchanges. Our team has established relationships with major exchanges and can guide your project through compliance requirements and negotiations.",
    features: ["Exchange Application Support", "Documentation Preparation", "Compliance Consulting", "Market Making Partnerships", "Listing Announcements", "Post-Listing Support"],
    gradient: "from-primary to-gradient-cyan",
    iconAnimation: "icon-pulse",
  },
  {
    icon: Users,
    title: "Advisory",
    description: "Strategic consulting for tokenomics, go-to-market strategy, and regulatory compliance in the Korean market.",
    fullDescription: "Get strategic guidance from industry veterans. Our advisory services help projects navigate the Korean crypto landscape, from regulatory considerations to tokenomics design and go-to-market strategy.",
    features: ["Tokenomics Consulting", "Go-to-Market Strategy", "Regulatory Guidance", "Partnership Introductions", "Investor Relations", "Crisis Management"],
    gradient: "from-accent to-gradient-pink",
    iconAnimation: "icon-wave",
  },
];

const ServiceCard = ({ service, index, onOpenModal }: { 
  service: typeof services[0]; 
  index: number;
  onOpenModal: () => void;
}) => {
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
        onClick={onOpenModal}
        className="group glass-card-hover p-8 h-full cursor-pointer"
      >
        {/* Icon with gradient background and animation */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6`}>
          <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center group-hover:bg-transparent transition-colors duration-300 overflow-hidden">
            <service.icon className={`w-6 h-6 text-foreground group-hover:text-primary-foreground transition-colors duration-300 group-hover:${service.iconAnimation}`} />
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

const ServiceModal = ({ 
  service, 
  isOpen, 
  onClose 
}: { 
  service: typeof services[0] | null; 
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass-card border-border/50 bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 mb-4`}>
            <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
              <service.icon className="w-8 h-8 text-foreground" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-gradient">{service.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground text-base leading-relaxed mt-2">
            {service.fullDescription}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-foreground mb-4">What's Included</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.features.map((feature, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/30"
              >
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`} />
                <span className="text-sm text-foreground/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Button variant="gradient" className="flex-1 group">
            Get Started
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="glass" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ServicesSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 200);
  };

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
            <ServiceCard 
              key={service.title} 
              service={service} 
              index={index}
              onOpenModal={() => openModal(service)}
            />
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceModal 
        service={selectedService}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default ServicesSection;