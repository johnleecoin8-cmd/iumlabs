import { ArrowRight, Compass, Users, Search, Mic2, MessageCircle, Newspaper, Rocket, Target } from "lucide-react";
import { Link } from "react-router-dom";

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
    link: "/services/gtm",
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

  return (
    <div className="group relative overflow-hidden">
      <Link
        to={service.link}
        className={`block h-full min-h-[280px] sm:min-h-[320px] relative transition-all duration-300 ${
          hasBorderRight ? "lg:border-r border-border/30" : ""
        } ${hasBorderBottom ? "border-b border-border/30" : ""} ${
          (index % 2) === 0 ? "sm:border-r border-border/30 lg:border-r-0" : ""
        } ${(index % 2) === 0 && hasBorderRight ? "lg:border-r" : ""}`}
      >
        {/* Background Layer */}
        <div className="absolute inset-0">
          {service.image ? (
            <>
              <img 
                src={service.image} 
                alt="" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/65 group-hover:bg-black/50 transition-colors duration-500" />
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8">
          <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
            <div className="mb-4 sm:mb-6">
              <Icon 
                className="w-8 h-8 sm:w-10 sm:h-10 text-white/80 group-hover:text-white group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-500" 
                strokeWidth={1.5} 
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-white transition-colors">
              {service.title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-2 group-hover:text-white/90 transition-colors">
              {service.description}
            </p>
            <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors text-sm">
              <span className="group-hover:underline underline-offset-4">Learn more</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Hover border glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 border border-white/20" />
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
