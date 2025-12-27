import { motion } from "framer-motion";
import { ArrowRight, Compass, Users, Search, Mic2, MessageCircle, Newspaper, Rocket, Target } from "lucide-react";
import { Link } from "react-router-dom";

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
  const isRightColumn = (index % 4) >= 2;
  const isLastRow = index >= 4;
  const hasBorderRight = (index % 4) !== 3;
  const hasBorderBottom = index < 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={service.link}
        className={`group block p-5 sm:p-6 md:p-8 transition-all duration-300 hover:bg-secondary/50 active:bg-secondary/70 relative overflow-hidden ${
          hasBorderRight ? "lg:border-r border-border" : ""
        } ${hasBorderBottom ? "border-b border-border" : ""} ${
          (index % 2) === 0 ? "sm:border-r border-border lg:border-r-0" : ""
        } ${(index % 2) === 0 && hasBorderRight ? "lg:border-r" : ""}`}
      >
        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        </div>

        <motion.div
          className="relative z-10"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-8 h-8 sm:w-10 sm:h-10 mb-4 sm:mb-6 text-muted-foreground group-hover:text-foreground group-hover:drop-shadow-[0_0_12px_hsl(var(--foreground)/0.3)] transition-all duration-300" strokeWidth={1.5} />
        </motion.div>
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-foreground/90 transition-colors relative z-10">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 sm:mb-6 relative z-10 line-clamp-2">
          {service.description}
        </p>
        <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors text-sm min-h-[44px] sm:min-h-0 relative z-10">
          <span className="group-hover:underline underline-offset-4">Learn more</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </Link>
    </motion.div>
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
