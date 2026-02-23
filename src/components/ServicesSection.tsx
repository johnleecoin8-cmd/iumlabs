import { ArrowRight, Compass, Users, Search, Mic2, Newspaper, Rocket, Target, FileSearch } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
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
  const isEven = index % 2 === 0; // 좌, 우 교차

  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.15,
    rootMargin: '30px',
    triggerOnce: true
  });

  return (
    <div
      ref={ref}
      className={cn(
        "group transition-all duration-600 ease-out will-change-transform",
        isVisible
          ? "opacity-100 translate-x-0"
          : isEven
            ? "opacity-0 -translate-x-12"
            : "opacity-0 translate-x-12"
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <Link
        to={service.link}
        className={cn(
          "relative flex items-stretch overflow-hidden border-b border-border/20 transition-all duration-500 active:scale-[0.995] min-h-[120px] sm:min-h-[140px] md:min-h-[160px]",
          isEven ? "flex-row" : "flex-row-reverse"
        )}
      >
        {/* Image side */}
        <div className="relative w-[45%] sm:w-[48%] md:w-[50%] flex-shrink-0 overflow-hidden">
          <img
            src={service.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
          {/* Number overlay */}
          <div className={cn(
            "absolute bottom-3 sm:bottom-4 text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-black leading-none text-white/10 group-hover:text-white/20 transition-colors duration-500",
            isEven ? "right-3 sm:right-4" : "left-3 sm:left-4"
          )}>
            {service.number}
          </div>
        </div>

        {/* Content side */}
        <div className={cn(
          "flex-1 flex flex-col justify-center py-5 sm:py-6 md:py-8 transition-colors duration-500 bg-background group-hover:bg-secondary/30",
          isEven ? "pl-5 sm:pl-8 md:pl-12 pr-4 sm:pr-6 md:pr-10" : "pr-5 sm:pr-8 md:pr-12 pl-4 sm:pl-6 md:pl-10"
        )}>
          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <Icon
              className="w-4 h-4 sm:w-5 sm:h-5 text-primary/70 group-hover:text-primary transition-colors duration-500"
              strokeWidth={1.5}
            />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/50 group-hover:text-muted-foreground/80 transition-colors duration-500">
              Service {service.number}
            </span>
          </div>

          <h3 className={cn(
            "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground group-hover:text-foreground transition-colors duration-500 tracking-tight mb-1.5 sm:mb-2",
            isEven ? "text-left" : "text-right"
          )}>
            {service.title}
          </h3>

          <p className={cn(
            "text-xs sm:text-sm md:text-base text-muted-foreground/60 group-hover:text-muted-foreground/90 transition-colors duration-500 leading-relaxed max-w-md",
            isEven ? "text-left" : "text-right ml-auto"
          )}>
            {service.description}
          </p>

          {/* Arrow indicator */}
          <div className={cn(
            "mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground/40 group-hover:text-primary transition-all duration-300",
            isEven ? "justify-start" : "justify-end"
          )}>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
              Learn more
            </span>
            <ArrowRight className={cn(
              "w-4 h-4 transition-transform duration-300",
              isEven
                ? "group-hover:translate-x-1.5"
                : "rotate-180 group-hover:-translate-x-1.5"
            )} />
          </div>
        </div>

        {/* Hover accent line */}
        <div className={cn(
          "absolute top-0 bottom-0 w-[3px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top",
          isEven ? "left-0" : "right-0"
        )} />
      </Link>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section className="bg-background">
      <div className="flex flex-col">
        {services.map((service, index) => (
          <ServiceRow key={service.number} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
