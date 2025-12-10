import { useState } from "react";
import { Link } from "react-router-dom";
import { Blocks, Coins, Gamepad2, Image, ListChecks, Users, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTilt } from "@/hooks/useTilt";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { services as servicesContent } from "@/config/content";

const serviceRoutes: Record<string, string> = {
  "nft-marketing": "/services/nft",
  "defi-marketing": "/services/defi",
  "gamefi": "/services/gamefi",
};

const iconMap = {
  "web3-marketing": Blocks,
  "nft-marketing": Image,
  "defi-marketing": Coins,
  "gamefi": Gamepad2,
  "exchange-listing": ListChecks,
  "advisory": Users,
};

const gradients = [
  "from-primary to-accent",
  "from-gradient-pink to-gradient-orange",
  "from-gradient-cyan to-primary",
  "from-gradient-orange to-gradient-pink",
  "from-primary to-gradient-cyan",
  "from-accent to-gradient-pink",
];

const ServiceCard = ({ service, index, onOpenModal }: { 
  service: typeof servicesContent.items[0]; 
  index: number;
  onOpenModal: () => void;
}) => {
  const tilt = useTilt({ max: 10, scale: 1.02 });
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const Icon = iconMap[service.id as keyof typeof iconMap] || Blocks;
  const gradient = gradients[index % gradients.length];

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
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} p-0.5 mb-6`}>
          <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center group-hover:bg-transparent transition-colors duration-300 overflow-hidden">
            <Icon className="w-6 h-6 text-foreground group-hover:text-primary-foreground transition-colors duration-300" />
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
          <span>{servicesContent.learnMore}</span>
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </div>
  );
};

const ServiceModal = ({ 
  service, 
  isOpen, 
  onClose,
  index 
}: { 
  service: typeof servicesContent.items[0] | null; 
  isOpen: boolean;
  onClose: () => void;
  index: number;
}) => {
  if (!service) return null;
  const Icon = iconMap[service.id as keyof typeof iconMap] || Blocks;
  const gradient = gradients[index % gradients.length];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass-card border-border/50 bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} p-0.5 mb-4`}>
            <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
              <Icon className="w-8 h-8 text-foreground" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-gradient">{service.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground text-base leading-relaxed mt-2">
            {service.fullDescription}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-foreground mb-4">{servicesContent.modal.includedLabel}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.features.map((feature, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/30"
              >
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient}`} />
                <span className="text-sm text-foreground/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Button variant="gradient" className="flex-1 group">
            {servicesContent.modal.getStarted}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="glass" onClick={onClose}>
            {servicesContent.modal.close}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ServicesSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index: number) => {
    setSelectedServiceIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedServiceIndex(null), 200);
  };

  // Parse headline with highlight
  const headlineParts = servicesContent.headline.split(/<highlight>|<\/highlight>/);

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
            <span className="text-sm font-medium text-primary">{servicesContent.badge}</span>
          </div>
          <h2 className="text-display-md md:text-display-lg max-w-3xl mx-auto">
            {headlineParts[0]}<span className="text-gradient">{headlineParts[1]}</span>{headlineParts[2]}
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesContent.items.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index}
              onOpenModal={() => openModal(index)}
            />
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceModal 
        service={selectedServiceIndex !== null ? servicesContent.items[selectedServiceIndex] : null}
        isOpen={isModalOpen}
        onClose={closeModal}
        index={selectedServiceIndex || 0}
      />
    </section>
  );
};

export default ServicesSection;
