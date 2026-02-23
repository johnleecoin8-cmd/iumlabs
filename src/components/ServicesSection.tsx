import { ArrowRight, Compass, Users, Search, Mic2, Newspaper, Rocket, Target, FileSearch } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
// Import service images
import gtmImage from "@/assets/services/gtm-strategy.webp";
import websiteImage from "@/assets/services/website-creative.webp";
import eventsImage from "@/assets/services/offline-event.webp";
import communityImage from "@/assets/services/community-management.webp";
import kolImage from "@/assets/services/kol-avatars.webp";
import prImage from "@/assets/services/pr-media.webp";
import seoAdsImage from "@/assets/services/seo-ads.webp";
import deepResearchImage from "@/assets/services/deep-research.png";

const services = [
  {
    number: "01",
    title: "GTM Strategy",
    description: "Strategic market entry planning and execution for the Korean market.",
    link: "/services",
    icon: Rocket,
    image: gtmImage
  },
  {
    number: "02",
    title: "Brand Identity & Web",
    description: "Strategic brand identity and high-performance websites for Web3 projects.",
    link: "/services/branding",
    icon: Compass,
    image: websiteImage
  },
  {
    number: "03",
    title: "SEO / Paid Ads",
    description: "Search optimization and targeted advertising across crypto-native platforms.",
    link: "/services/seo-ads",
    icon: Search,
    image: seoAdsImage
  },
  {
    number: "04",
    title: "Offline Event",
    description: "End-to-end event planning and on-ground activation for Web3 experiences.",
    link: "/services/offline-event",
    icon: Target,
    image: eventsImage
  },
  {
    number: "05",
    title: "Community Management",
    description: "Discord & Telegram community infrastructure for scalable growth.",
    link: "/services/community",
    icon: Users,
    image: communityImage
  },
  {
    number: "06",
    title: "Deep Research",
    description: "Data-driven market intelligence and on-chain analytics insights.",
    link: "/services/deep-research",
    icon: FileSearch,
    image: deepResearchImage
  },
  {
    number: "07",
    title: "Influencer / KOL",
    description: "Influencer campaigns powered by top Korean crypto voices.",
    link: "/services/influencer",
    icon: Mic2,
    image: kolImage
  },
  {
    number: "08",
    title: "PR",
    description: "Narrative development and media placements in Korean outlets.",
    link: "/services/pr",
    icon: Newspaper,
    image: prImage
  }
];

const ServiceRow = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const Icon = service.icon;

  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '30px',
    triggerOnce: true
  });

  return (
    <div
      ref={ref}
      className={cn(
        "group transition-all duration-500 ease-out will-change-transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <Link
        to={service.link}
        className="relative flex items-center gap-4 sm:gap-6 md:gap-10 px-4 sm:px-8 md:px-12 lg:px-16 py-5 sm:py-6 md:py-7 border-b border-border/30 overflow-hidden transition-all duration-500 active:scale-[0.995]"
      >
        {/* Hover background image reveal */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          {service.image && (
            <img
              src={service.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
            />
          )}
          <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors duration-500" />
        </div>

        {/* Number */}
        <span className="relative z-10 text-xs sm:text-sm font-mono text-muted-foreground/50 group-hover:text-white/50 transition-colors duration-500 w-6 sm:w-8 flex-shrink-0">
          {service.number}
        </span>

        {/* Icon */}
        <div className="relative z-10 flex-shrink-0">
          <Icon
            className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/60 group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all duration-500"
            strokeWidth={1.5}
          />
        </div>

        {/* Title */}
        <h3 className="relative z-10 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-foreground group-hover:text-white transition-colors duration-500 tracking-tight flex-shrink-0">
          {service.title}
        </h3>

        {/* Description - hidden on mobile, shown on md+ */}
        <p className="relative z-10 hidden md:block text-sm lg:text-base text-muted-foreground/60 group-hover:text-white/70 transition-colors duration-500 flex-1 min-w-0 truncate">
          {service.description}
        </p>

        {/* Arrow */}
        <div className="relative z-10 flex-shrink-0 ml-auto">
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground/40 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300" />
        </div>
      </Link>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section className="bg-background">
      <div className="flex flex-col border-t border-border/30">
        {services.map((service, index) => (
          <ServiceRow key={service.number} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
