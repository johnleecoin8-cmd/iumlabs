import { ArrowRight, Compass, Users, Search, Mic2, MessageCircle, Newspaper, Rocket, Target } from "lucide-react";
import { Link } from "react-router-dom";

// Service colors for unique accent per service
const serviceColors = {
  "01": { color: "hsl(var(--accent-cyan))", hover: "group-hover:text-[hsl(var(--accent-cyan))]", glow: "group-hover:drop-shadow-[0_0_20px_hsl(var(--accent-cyan)/0.5)]" },
  "02": { color: "hsl(var(--accent-violet))", hover: "group-hover:text-[hsl(var(--accent-violet))]", glow: "group-hover:drop-shadow-[0_0_20px_hsl(var(--accent-violet)/0.5)]" },
  "03": { color: "hsl(var(--accent-orange))", hover: "group-hover:text-[hsl(var(--accent-orange))]", glow: "group-hover:drop-shadow-[0_0_20px_hsl(var(--accent-orange)/0.5)]" },
  "04": { color: "hsl(var(--accent-rose))", hover: "group-hover:text-[hsl(var(--accent-rose))]", glow: "group-hover:drop-shadow-[0_0_20px_hsl(var(--accent-rose)/0.5)]" },
  "05": { color: "hsl(var(--accent-emerald))", hover: "group-hover:text-[hsl(var(--accent-emerald))]", glow: "group-hover:drop-shadow-[0_0_20px_hsl(var(--accent-emerald)/0.5)]" },
  "06": { color: "hsl(var(--accent-cyan))", hover: "group-hover:text-[hsl(var(--accent-cyan))]", glow: "group-hover:drop-shadow-[0_0_20px_hsl(var(--accent-cyan)/0.5)]" },
  "07": { color: "hsl(var(--accent-violet))", hover: "group-hover:text-[hsl(var(--accent-violet))]", glow: "group-hover:drop-shadow-[0_0_20px_hsl(var(--accent-violet)/0.5)]" },
  "08": { color: "hsl(217 91% 60%)", hover: "group-hover:text-primary", glow: "group-hover:drop-shadow-[0_0_20px_hsl(217_91%_60%/0.5)]" },
};

const services = [
  {
    number: "01",
    title: "GTM Strategy",
    description: "Strategic market entry planning and execution for Web3 projects launching in the Korean market.",
    link: "/services/gtm",
    icon: Rocket
  },
  {
    number: "02",
    title: "Branding/Website",
    description: "Distinctive brand identity and high-performance websites for Web3 projects. From logo design to custom development.",
    link: "/services/branding",
    icon: Compass
  },
  {
    number: "03",
    title: "SEO/Paid Ads",
    description: "Drive qualified traffic through search optimization and targeted advertising across Google, Twitter/X, and crypto-native platforms.",
    link: "/services/seo-ads",
    icon: Search
  },
  {
    number: "04",
    title: "Offline Event",
    description: "End-to-end event planning, venue coordination, and on-ground activation for impactful Web3 experiences.",
    link: "/services/offline-event",
    icon: Target
  },
  {
    number: "05",
    title: "Community Management",
    description: "Complete Discord & Telegram community infrastructure to build sticky, scalable and self-sustaining growth.",
    link: "/services/community",
    icon: Users
  },
  {
    number: "06",
    title: "Influencer/KOL",
    description: "Influencer campaigns powered by top crypto voices aligned with your message and goals.",
    link: "/services/influencer",
    icon: Mic2
  },
  {
    number: "07",
    title: "Yap Strategy",
    description: "Targeted campaigns through a 600+ creator network designed to drive awareness and traction across Crypto X.",
    link: "/services/yap",
    icon: MessageCircle
  },
  {
    number: "08",
    title: "PR",
    description: "Narrative development and media placements to get your story published and seen in the right places.",
    link: "/services/pr",
    icon: Newspaper
  }
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const Icon = service.icon;
  const colorConfig = serviceColors[service.number as keyof typeof serviceColors];
  const hasBorderRight = (index % 4) !== 3;
  const hasBorderBottom = index < 4;

  return (
    <div className="hover:-translate-y-1 active:scale-[0.98] transition-transform duration-300">
      <Link
        to={service.link}
        className={`group block p-4 sm:p-6 md:p-8 transition-all duration-300 hover:bg-secondary/50 active:bg-secondary/70 relative overflow-hidden ${
          hasBorderRight ? "lg:border-r border-border" : ""
        } ${hasBorderBottom ? "border-b border-border" : ""} ${
          (index % 2) === 0 ? "sm:border-r border-border lg:border-r-0" : ""
        } ${(index % 2) === 0 && hasBorderRight ? "lg:border-r" : ""}`}
      >
        {/* Hover glow effect - unique color per service */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div 
            className="absolute inset-0 bg-gradient-to-br to-transparent" 
            style={{ background: `linear-gradient(135deg, ${colorConfig.color}10, transparent)` }}
          />
        </div>

        <div className="relative z-10 group-hover:scale-105 transition-transform duration-300">
          <Icon 
            className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mb-4 sm:mb-6 text-muted-foreground ${colorConfig.hover} ${colorConfig.glow} transition-all duration-300`} 
            strokeWidth={1.5} 
          />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-foreground/90 transition-colors relative z-10">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 sm:mb-6 relative z-10 line-clamp-2">
          {service.description}
        </p>
        <div className={`flex items-center gap-2 text-muted-foreground ${colorConfig.hover} transition-colors text-sm min-h-[44px] sm:min-h-0 relative z-10`}>
          <span className="group-hover:underline underline-offset-4">Learn more</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </Link>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section className="bg-background">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <ServiceCard key={service.number} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
