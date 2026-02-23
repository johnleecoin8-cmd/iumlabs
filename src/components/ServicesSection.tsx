import { ArrowRight, Compass, Users, Search, Mic2, Newspaper, Rocket, Target, FileSearch } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useMemo } from "react";
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
    image: gtmImage,
    accentColor: "0 200 255",    // cyan
  },
  {
    number: "02",
    title: "Brand Identity & Web",
    description: "Strategic brand identity and high-performance websites for Web3 projects.",
    link: "/services/branding",
    icon: Compass,
    image: websiteImage,
    accentColor: "168 85 247",   // purple
  },
  {
    number: "03",
    title: "SEO / Paid Ads",
    description: "Search optimization and targeted advertising across crypto-native platforms.",
    link: "/services/seo-ads",
    icon: Search,
    image: seoAdsImage,
    accentColor: "34 197 94",    // green
  },
  {
    number: "04",
    title: "Offline Event",
    description: "End-to-end event planning and on-ground activation for Web3 experiences.",
    link: "/services/offline-event",
    icon: Target,
    image: eventsImage,
    accentColor: "251 146 60",   // orange
  },
  {
    number: "05",
    title: "Community Management",
    description: "Discord & Telegram community infrastructure for scalable growth.",
    link: "/services/community",
    icon: Users,
    image: communityImage,
    accentColor: "56 189 248",   // sky
  },
  {
    number: "06",
    title: "Deep Research",
    description: "Data-driven market intelligence and on-chain analytics insights.",
    link: "/services/deep-research",
    icon: FileSearch,
    image: deepResearchImage,
    accentColor: "244 63 94",    // rose
  },
  {
    number: "07",
    title: "Influencer / KOL",
    description: "Influencer campaigns powered by top Korean crypto voices.",
    link: "/services/influencer",
    icon: Mic2,
    image: kolImage,
    accentColor: "250 204 21",   // yellow
  },
  {
    number: "08",
    title: "PR",
    description: "Narrative development and media placements in Korean outlets.",
    link: "/services/pr",
    icon: Newspaper,
    image: prImage,
    accentColor: "139 92 246",   // violet
  }
];

const ServiceRow = ({ service, index }: { service: typeof services[0]; index: number }) => {
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
        {/* Hover glow background */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
          style={{
            background: `radial-gradient(ellipse at ${isEven ? '30%' : '70%'} 50%, rgba(${service.accentColor}, 0.06) 0%, transparent 70%)`
          }}
        />

        {/* Image side */}
        <div className="relative w-[45%] sm:w-[48%] md:w-[50%] flex-shrink-0 overflow-hidden z-[1]">
          <img
            src={service.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 group-hover:via-black/10 transition-all duration-500" />
          {/* Number overlay */}
          <div className={cn(
            "absolute bottom-3 sm:bottom-4 md:bottom-5 text-4xl sm:text-5xl md:text-6xl font-black leading-none text-white/[0.08] group-hover:text-white/[0.15] transition-colors duration-500 font-mono",
            isEven ? "right-3 sm:right-4 md:right-6" : "left-3 sm:left-4 md:left-6"
          )}>
            {service.number}
          </div>
        </div>

        {/* Vertical accent line */}
        <div
          className="w-[1px] flex-shrink-0 transition-all duration-500 z-[1]"
          style={{
            backgroundColor: `rgba(${service.accentColor}, 0.08)`,
          }}
        >
          <div
            className="w-full h-0 group-hover:h-full transition-all duration-700 ease-out"
            style={{ backgroundColor: `rgba(${service.accentColor}, 0.5)` }}
          />
        </div>

        {/* Content side */}
        <div className={cn(
          "flex-1 flex items-center transition-colors duration-500 bg-[#0A0A0A] group-hover:bg-[#111] z-[1]",
          "px-5 sm:px-6 md:px-10"
        )}>
          <div className="flex-1 flex flex-col justify-center gap-1.5 sm:gap-2 min-w-0">
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.08 + 0.3, duration: 0.5 }}
              className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/40 group-hover:text-primary/60 transition-colors duration-500"
            >
              Service {service.number}
            </motion.span>
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
          "absolute top-0 bottom-0 w-[3px] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top z-[2]",
          isEven ? "left-0" : "right-0"
        )} style={{ backgroundColor: `rgba(${service.accentColor}, 0.7)` }} />

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-[2]">
          <div
            className="h-full w-0 group-hover:w-full transition-all duration-700 ease-out"
            style={{ backgroundColor: `rgba(${service.accentColor}, 0.5)` }}
          />
        </div>
      </Link>
    </div>
  );
};

/* Floating particle for background */
const FloatingParticle = ({ delay, x, size }: { delay: number; x: number; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary/20 hidden md:block pointer-events-none"
    style={{ left: `${x}%`, width: size, height: size }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.15, 0.4, 0.15],
    }}
    transition={{
      duration: 5 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

const ServicesSection = () => {
  const particles = useMemo(() => [
    { delay: 0, x: 12, size: 3 },
    { delay: 1.5, x: 35, size: 2 },
    { delay: 0.8, x: 58, size: 4 },
    { delay: 2.2, x: 78, size: 2 },
    { delay: 1.0, x: 92, size: 3 },
  ], []);

  return (
    <section className="relative bg-background overflow-hidden">
      {/* Background effects layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Scanlines */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground) / 0.05) 2px, hsl(var(--foreground) / 0.05) 4px)',
          }}
        />
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,hsl(var(--primary)/0.04),transparent_70%)]" />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}
      </div>

      {/* Top edge gradient */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent z-[1] pointer-events-none" />

      {/* Content */}
      <div className="relative z-[1] flex flex-col">
        {services.map((service, index) => (
          <ServiceRow key={service.number} service={service} index={index} />
        ))}
      </div>

      {/* Bottom edge gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />
    </section>
  );
};

export default ServicesSection;
