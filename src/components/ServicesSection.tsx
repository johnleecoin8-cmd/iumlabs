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

const ServiceCard = ({ service, index, onOpenModal }: { 
  service: typeof servicesContent.items[0]; 
  index: number;
  onOpenModal: () => void;
}) => {
  const tilt = useTilt({ max: 8, scale: 1.02 });
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const Icon = iconMap[service.id as keyof typeof iconMap] || Blocks;

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
        className="group p-8 h-full cursor-pointer rounded-3xl border border-border/30 bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:bg-card/50 transition-all duration-500"
      >
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {service.description}
        </p>

        {/* Hover indicator */}
        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
          <span>{servicesContent.learnMore}</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-3xl border border-border/50 bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold text-foreground">{service.title}</DialogTitle>
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
                className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border/30"
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm text-foreground/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Button className="flex-1 rounded-full bg-primary hover:bg-primary/90 group">
            {servicesContent.modal.getStarted}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" onClick={onClose} className="rounded-full border-border/50 hover:bg-card">
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

  return (
    <section id="services" className="py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dot pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.3) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Number */}
        <div className={`mb-6 scroll-animate ${headerVisible ? 'is-visible' : ''}`}>
          <span className="text-primary font-mono text-sm tracking-wider">02.</span>
        </div>

        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-20 scroll-animate ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">{servicesContent.badge}</span>
          </div>
          <h2 className="text-4xl md:text-6xl tracking-tight max-w-3xl mx-auto">
            <span className="font-serif italic text-muted-foreground">Comprehensive</span>{" "}
            <span className="font-sans font-bold text-foreground">Web3 Solutions</span>
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