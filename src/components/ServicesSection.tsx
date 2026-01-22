import { ArrowRight, Compass, Users, Search, Mic2, MessageCircle, Newspaper, Rocket, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
// Import service images
import gtmImage from "@/assets/services/gtm-ecosystem.png";
import brandingImage from "@/assets/services/branding-website.png";
import eventsImage from "@/assets/services/events.jpg";
import communityImage from "@/assets/services/community-management.png";
import kolImage from "@/assets/services/kol-network.jpg";
import prImage from "@/assets/services/pr-media.jpg";
import yapImage from "@/assets/services/yap-network.png";
import seoAdsImage from "@/assets/services/seo-ads.jpg";

const services = [
  {
    number: "01",
    title: "GTM Strategy",
    description: "Strategic market entry planning and execution for Web3 projects launching in the Korean market.",
    link: "/services",
    icon: Rocket,
    image: gtmImage
  },
  {
    number: "02",
    title: "Branding/Website",
    description: "Distinctive brand identity and high-performance websites for Web3 projects. From logo design to custom development.",
    link: "/services/branding",
    icon: Compass,
    image: brandingImage
  },
  {
    number: "03",
    title: "SEO/Paid Ads",
    description: "Drive qualified traffic through search optimization and targeted advertising across Google, Twitter/X, and crypto-native platforms.",
    link: "/services/seo-ads",
    icon: Search,
    image: seoAdsImage
  },
  {
    number: "04",
    title: "Offline Event",
    description: "End-to-end event planning, venue coordination, and on-ground activation for impactful Web3 experiences.",
    link: "/services/offline-event",
    icon: Target,
    image: eventsImage
  },
  {
    number: "05",
    title: "Community Management",
    description: "Complete Discord & Telegram community infrastructure to build sticky, scalable and self-sustaining growth.",
    link: "/services/community",
    icon: Users,
    image: communityImage
  },
  {
    number: "06",
    title: "Influencer/KOL",
    description: "Influencer campaigns powered by top crypto voices aligned with your message and goals.",
    link: "/services/influencer",
    icon: Mic2,
    image: kolImage
  },
  {
    number: "07",
    title: "Yap Strategy",
    description: "Targeted campaigns through a 600+ creator network designed to drive awareness and traction across Crypto X.",
    link: "/services/yap",
    icon: MessageCircle,
    image: yapImage
  },
  {
    number: "08",
    title: "PR",
    description: "Narrative development and media placements to get your story published and seen in the right places.",
    link: "/services/pr",
    icon: Newspaper,
    image: prImage
  }
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const Icon = service.icon;
  const hasBorderRight = (index % 4) !== 3;
  const hasBorderBottom = index < 4;
  
  const { ref, isVisible } = useScrollAnimation({ 
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true 
  });

  return (
    <div 
      ref={ref}
      className={cn(
        "group relative overflow-hidden transition-all duration-500 ease-out will-change-transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 75}ms` }}
    >
      <Link
        to={service.link}
        className={`block h-full min-h-[180px] sm:min-h-[240px] md:min-h-[320px] lg:min-h-[360px] relative transition-all duration-300 active:scale-[0.98] ${
          hasBorderRight ? "lg:border-r border-border/40" : ""
        } ${hasBorderBottom ? "border-b border-border/40" : ""} ${
          (index % 2) === 0 ? "sm:border-r border-border/40 md:border-r lg:border-r-0" : ""
        } ${(index % 2) === 0 && hasBorderRight ? "lg:border-r" : ""} ${
          (index % 2) === 1 ? "md:border-r-0 lg:border-r" : ""
        }`}
      >
        {/* Background Layer */}
        <div className="absolute inset-0">
          {service.image ? (
            <>
              <img 
                src={service.image} 
                alt="" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/45 transition-colors duration-500" />
            </>
          ) : (
            <>
              {/* Gradient fallback for services without images */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary/50" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--primary)/0.15),_transparent_50%)]" />
              <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors duration-500" />
            </>
          )}
          {/* Bottom gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-6 md:p-9 lg:p-10">
          <div className="transform group-hover:-translate-y-3 transition-transform duration-500">
            <div className="mb-3 sm:mb-4 md:mb-7">
              <Icon 
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-11 md:h-11 text-white/85 group-hover:text-white group-hover:drop-shadow-[0_0_24px_rgba(255,255,255,0.45)] transition-all duration-500" 
                strokeWidth={1.5} 
              />
            </div>
            <h3 className="text-base sm:text-lg md:text-2xl font-bold text-white mb-1.5 sm:mb-2 md:mb-4 group-hover:text-white transition-colors tracking-tight">
              {service.title}
            </h3>
            <p className="text-white/75 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4 md:mb-7 line-clamp-2 group-hover:text-white/90 transition-colors">
              {service.description}
            </p>
            <div className="flex items-center gap-2 text-white/85 group-hover:text-white transition-colors text-sm font-medium min-h-[44px] sm:min-h-0">
              <span className="group-hover:underline underline-offset-4">Learn more</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Hover border glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 border border-white/25" />
        </div>
      </Link>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section className="bg-background">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <ServiceCard key={service.number} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
