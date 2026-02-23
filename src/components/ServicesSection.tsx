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
  const isEven = index % 2 === 0;

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
            ? "opacity-0 -translate-x-8"
            : "opacity-0 translate-x-8"
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <Link
        to={service.link}
        className={cn(
          "relative flex items-stretch overflow-hidden border-b border-white/[0.06] transition-all duration-500 active:scale-[0.995] h-[140px] sm:h-[160px] md:h-[180px]",
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
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 group-hover:via-black/10 transition-all duration-500" />
          {/* Number overlay - positioned near content edge */}
          <div className={cn(
            "absolute bottom-3 sm:bottom-4 md:bottom-5 text-4xl sm:text-5xl md:text-6xl font-black leading-none text-white/[0.08] group-hover:text-white/[0.15] transition-colors duration-500 font-mono",
            isEven ? "right-3 sm:right-4 md:right-6" : "left-3 sm:left-4 md:left-6"
          )}>
            {service.number}
          </div>
        </div>

        {/* Vertical accent line between image and content */}
        <div className="w-[1px] bg-white/[0.06] group-hover:bg-primary/40 transition-colors duration-500 flex-shrink-0" />

        {/* Content side - always left-aligned */}
        <div className={cn(
          "flex-1 flex items-center transition-colors duration-500 bg-[#0A0A0A] group-hover:bg-[#111]",
          "px-5 sm:px-6 md:px-10"
        )}>
          <div className="flex-1 flex flex-col justify-center gap-1.5 sm:gap-2 min-w-0">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/40 group-hover:text-primary/60 transition-colors duration-500">
              Service {service.number}
            </span>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-foreground transition-colors duration-500 tracking-tight">
              {service.title}
            </h3>
            <p className="hidden sm:block text-xs md:text-sm text-muted-foreground/50 group-hover:text-muted-foreground/80 transition-colors duration-500 line-clamp-2">
              {service.description}
            </p>
          </div>

          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-4" />
        </div>

        {/* Hover accent line on outer edge */}
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
