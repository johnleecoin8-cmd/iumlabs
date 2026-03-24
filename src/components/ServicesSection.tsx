import { ArrowRight, Compass, Users, Search, Mic2, Newspaper, Rocket, Target, FileSearch } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import gtmImage from "@/assets/services/gtm-strategy.webp";
import websiteImage from "@/assets/services/website-creative.webp";
import eventsImage from "@/assets/services/offline-event.webp";
import communityImage from "@/assets/services/community-management.png";
import kolImage from "@/assets/services/kol-avatars.webp";
import prImage from "@/assets/services/pr-coindesk.png";
import seoAdsImage from "@/assets/services/seo-ads.webp";
import deepResearchImage from "@/assets/services/deep-research.png";

const services = [
  { number: "01", title: "GTM Strategy", description: "Strategic market entry planning and execution for the Korean market.", link: "/services", icon: Rocket, image: gtmImage, tag: "STRATEGY" },
  { number: "02", title: "Brand Identity & Web", description: "Strategic brand identity and high-performance websites for Web3 projects.", link: "/services/branding", icon: Compass, image: websiteImage, tag: "CREATIVE" },
  { number: "03", title: "SEO / Paid Ads", description: "Search optimization and targeted advertising across crypto-native platforms.", link: "/services/seo-ads", icon: Search, image: seoAdsImage, tag: "GROWTH" },
  { number: "04", title: "Offline Event", description: "End-to-end event planning and on-ground activation for Web3 experiences.", link: "/services/offline-event", icon: Target, image: eventsImage, tag: "ACTIVATION" },
  { number: "05", title: "Community Management", description: "Discord & Telegram community infrastructure for scalable growth.", link: "/services/community", icon: Users, image: communityImage, tag: "COMMUNITY" },
  { number: "06", title: "Deep Research", description: "Data-driven market intelligence and on-chain analytics insights.", link: "/services/deep-research", icon: FileSearch, image: deepResearchImage, tag: "RESEARCH" },
  { number: "07", title: "Influencer / KOL", description: "Influencer campaigns powered by top Korean crypto voices.", link: "/services/influencer", icon: Mic2, image: kolImage, tag: "INFLUENCE" },
  { number: "08", title: "PR", description: "Narrative development and media placements in Korean outlets.", link: "/services/pr", icon: Newspaper, image: prImage, tag: "MEDIA" },
];

const ServiceRow = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const Icon = service.icon;
  const isEven = index % 2 === 0;

  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.15,
    rootMargin: "30px",
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <Link
        to={service.link}
        className={cn(
          "relative flex items-stretch overflow-hidden border-b border-white/[0.06] transition-all duration-300 h-[160px] sm:h-[180px] md:h-[200px] group",
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
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
          {/* Number watermark */}
          <div
            className={cn(
              "absolute bottom-3 sm:bottom-4 font-bold leading-none font-mono text-5xl sm:text-6xl md:text-7xl text-white/[0.06]",
              isEven ? "right-4 sm:right-6" : "left-4 sm:left-6"
            )}
          >
            {service.number}
          </div>
          {/* Icon */}
          <div
            className={cn(
              "absolute top-3 sm:top-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white/[0.08] border border-white/[0.1] backdrop-blur-sm",
              isEven ? "left-3 sm:left-4" : "right-3 sm:right-4"
            )}
          >
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60" />
          </div>
        </div>

        {/* Separator */}
        <div className="w-px flex-shrink-0 bg-white/[0.06]" />

        {/* Content side */}
        <div className="flex-1 flex items-center bg-black group-hover:bg-white/[0.02] transition-colors duration-300 px-5 sm:px-6 md:px-10">
          <div className="flex-1 flex flex-col justify-center gap-2 min-w-0">
            {/* Tag */}
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-mono font-semibold uppercase tracking-[0.12em] bg-white/[0.05] text-white/40 border border-white/[0.06]">
                {service.tag}
              </span>
              <span className="text-[10px] font-mono text-white/20">
                {service.number}/08
              </span>
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
              {service.title}
            </h3>

            <p className="hidden sm:block text-xs md:text-sm text-white/30 group-hover:text-white/45 transition-colors duration-300 line-clamp-2 max-w-md">
              {service.description}
            </p>
          </div>

          {/* Arrow */}
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ml-4 border border-white/[0.08] group-hover:border-white/[0.15] transition-all duration-300">
            <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-300" />
          </div>
        </div>
      </Link>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section className="relative bg-black">
      {/* Subtle tech dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 0.5px, transparent 0.5px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative flex flex-col">
        {services.map((service, index) => (
          <ServiceRow key={service.number} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
