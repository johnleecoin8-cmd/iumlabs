import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { 
  Megaphone, 
  Users, 
  TrendingUp, 
  Calendar, 
  Building2, 
  Globe,
  ArrowRight,
  X
} from "lucide-react";
import CalendlyButton from "./CalendlyButton";

const services = [
  {
    number: "01",
    title: "KOL Marketing",
    shortDesc: "Connect with 1,000+ Korean crypto influencers",
    fullDesc: "Leverage our extensive network of over 1,000 Korean crypto influencers and opinion leaders to amplify your project's reach in the Korean market.",
    features: ["Influencer matching", "Campaign management", "Performance tracking", "Content strategy"],
    icon: Megaphone,
    color: "pink",
  },
  {
    number: "02",
    title: "Community Building",
    shortDesc: "Build engaged Korean communities",
    fullDesc: "Establish and grow vibrant Korean communities across KakaoTalk, Telegram, and Discord with native community managers.",
    features: ["KakaoTalk management", "Telegram growth", "Discord setup", "24/7 moderation"],
    icon: Users,
    color: "green",
  },
  {
    number: "03",
    title: "PR & Media",
    shortDesc: "Featured in top Korean crypto media",
    fullDesc: "Get your project featured in leading Korean crypto publications and mainstream media outlets.",
    features: ["Press releases", "Media outreach", "Interview coordination", "Crisis management"],
    icon: TrendingUp,
    color: "blue",
  },
  {
    number: "04",
    title: "Events & Conferences",
    shortDesc: "Korea Blockchain Week & beyond",
    fullDesc: "Strategic presence at major Korean blockchain events including Korea Blockchain Week, side events, and exclusive meetups.",
    features: ["Event sponsorship", "Speaking slots", "Booth design", "Networking events"],
    icon: Calendar,
    color: "orange",
  },
  {
    number: "05",
    title: "Exchange Listing",
    shortDesc: "Navigate Korean exchange listings",
    fullDesc: "Expert guidance through the complex Korean exchange listing process including VASP compliance and regulatory requirements.",
    features: ["Exchange introductions", "VASP compliance", "Due diligence prep", "Listing strategy"],
    icon: Building2,
    color: "purple",
  },
  {
    number: "06",
    title: "Go-To-Market",
    shortDesc: "Complete market entry strategy",
    fullDesc: "Comprehensive go-to-market strategy tailored for the Korean crypto market, from initial research to full market penetration.",
    features: ["Market research", "Competitor analysis", "Launch planning", "Growth strategy"],
    icon: Globe,
    color: "yellow",
  },
];

const serviceTags = [
  { label: "All Services", color: "blue" },
  { label: "Marketing", color: "pink" },
  { label: "Community", color: "green" },
  { label: "Events", color: "orange" },
  { label: "Institutional", color: "purple" },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <section ref={ref} className="py-24 px-4 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
                Our <span className="serif-italic">Services</span>
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Comprehensive Web3 marketing solutions tailored for the Korean market
              </p>
            </div>

            {/* Service Tags Navigation */}
            <div className="flex flex-wrap gap-2">
              {serviceTags.map((tag) => (
                <button
                  key={tag.label}
                  className={`service-tag service-tag-${tag.color}`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.number}
                onClick={() => setSelectedService(service)}
                className={`group bg-card border border-border/50 rounded-2xl p-6 cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Number Badge + Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="number-badge">{service.number}</span>
                  <div className={`service-icon service-icon-${service.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-muted-foreground text-sm mb-4">
                  {service.shortDesc}
                </p>

                {/* Learn More Link */}
                <button className="inline-flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Modal */}
      {selectedService && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="bg-card border border-border rounded-2xl p-8 max-w-lg w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`service-icon service-icon-${selectedService.color}`}>
                <selectedService.icon className="w-6 h-6" />
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-2xl font-medium text-foreground mb-4">
              {selectedService.title}
            </h3>

            <p className="text-muted-foreground mb-6">
              {selectedService.fullDesc}
            </p>

            <div className="mb-8">
              <h4 className="text-sm font-medium text-foreground mb-3">What's included:</h4>
              <ul className="space-y-2">
                {selectedService.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <CalendlyButton className="lunar-btn w-full">
              Get Started
            </CalendlyButton>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesSection;
