import { ArrowRight, Compass, Users, Search, Mic2, Newspaper, Rocket, Target, FileSearch } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useMemo } from "react";
import gtmImage from "@/assets/services/gtm-strategy.webp";
import websiteImage from "@/assets/services/website-creative.webp";
import eventsImage from "@/assets/services/offline-event.webp";
import communityImage from "@/assets/services/community-management.png";
import kolImage from "@/assets/services/kol-avatars.webp";
import prImage from "@/assets/services/pr-coindesk.png";
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
    accent: "0, 200, 255",       // cyan
    tag: "STRATEGY",
  },
  {
    number: "02",
    title: "Brand Identity & Web",
    description: "Strategic brand identity and high-performance websites for Web3 projects.",
    link: "/services/branding",
    icon: Compass,
    image: websiteImage,
    accent: "168, 85, 247",      // purple
    tag: "CREATIVE",
  },
  {
    number: "03",
    title: "SEO / Paid Ads",
    description: "Search optimization and targeted advertising across crypto-native platforms.",
    link: "/services/seo-ads",
    icon: Search,
    image: seoAdsImage,
    accent: "34, 197, 94",       // green
    tag: "GROWTH",
  },
  {
    number: "04",
    title: "Offline Event",
    description: "End-to-end event planning and on-ground activation for Web3 experiences.",
    link: "/services/offline-event",
    icon: Target,
    image: eventsImage,
    accent: "251, 146, 60",      // orange
    tag: "ACTIVATION",
  },
  {
    number: "05",
    title: "Community Management",
    description: "Discord & Telegram community infrastructure for scalable growth.",
    link: "/services/community",
    icon: Users,
    image: communityImage,
    accent: "56, 189, 248",      // sky
    tag: "COMMUNITY",
  },
  {
    number: "06",
    title: "Deep Research",
    description: "Data-driven market intelligence and on-chain analytics insights.",
    link: "/services/deep-research",
    icon: FileSearch,
    image: deepResearchImage,
    accent: "244, 63, 94",       // rose
    tag: "RESEARCH",
  },
  {
    number: "07",
    title: "Influencer / KOL",
    description: "Influencer campaigns powered by top Korean crypto voices.",
    link: "/services/influencer",
    icon: Mic2,
    image: kolImage,
    accent: "250, 204, 21",      // yellow
    tag: "INFLUENCE",
  },
  {
    number: "08",
    title: "PR",
    description: "Narrative development and media placements in Korean outlets.",
    link: "/services/pr",
    icon: Newspaper,
    image: prImage,
    accent: "139, 92, 246",      // violet
    tag: "MEDIA",
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

  const accentRgb = service.accent;

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
          "relative flex items-stretch overflow-hidden border-b border-white/[0.06] transition-all duration-500 active:scale-[0.995] h-[160px] sm:h-[180px] md:h-[200px]",
          isEven ? "flex-row" : "flex-row-reverse"
        )}
      >
        {/* Hover glow - radial from image side */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
          style={{
            background: `radial-gradient(ellipse at ${isEven ? '25%' : '75%'} 50%, rgba(${accentRgb}, 0.08) 0%, transparent 65%)`
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
          {/* Color-tinted overlay */}
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              background: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(${accentRgb}, 0.08) 50%, rgba(0,0,0,0.3) 100%)`
            }}
          />
          {/* Large number watermark */}
          <div className={cn(
            "absolute bottom-2 sm:bottom-3 md:bottom-4 font-black leading-none font-mono transition-all duration-500",
            "text-5xl sm:text-6xl md:text-7xl",
            isEven ? "right-3 sm:right-4 md:right-6" : "left-3 sm:left-4 md:left-6"
          )}
            style={{ color: `rgba(${accentRgb}, 0.15)` }}
          >
            {service.number}
          </div>
          {/* Icon badge floating on image */}
          <div
            className={cn(
              "absolute top-3 sm:top-4 md:top-5 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center backdrop-blur-md border transition-all duration-500 group-hover:scale-110",
              isEven ? "left-3 sm:left-4 md:left-5" : "right-3 sm:right-4 md:right-5"
            )}
            style={{
              backgroundColor: `rgba(${accentRgb}, 0.15)`,
              borderColor: `rgba(${accentRgb}, 0.3)`,
            }}
          >
            <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" style={{ color: `rgb(${accentRgb})` }} />
          </div>
        </div>

        {/* Colored separator line */}
        <div
          className="w-[2px] flex-shrink-0 z-[1] relative overflow-hidden"
          style={{ backgroundColor: `rgba(${accentRgb}, 0.1)` }}
        >
          <motion.div
            className="absolute inset-x-0 top-0 w-full"
            initial={{ height: '0%' }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 0.8, delay: index * 0.08 + 0.2 }}
            style={{ backgroundColor: `rgba(${accentRgb}, 0.5)` }}
          />
        </div>

        {/* Content side */}
        <div className={cn(
          "flex-1 flex items-center transition-colors duration-500 bg-[#0A0A0A] group-hover:bg-[#0F0F0F] z-[1]",
          "px-5 sm:px-6 md:px-10"
        )}>
          <div className="flex-1 flex flex-col justify-center gap-2 sm:gap-2.5 min-w-0">
            {/* Tag badge */}
            <div className="flex items-center gap-2.5">
              <span
                className="inline-flex items-center px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-[0.15em]"
                style={{
                  backgroundColor: `rgba(${accentRgb}, 0.1)`,
                  color: `rgb(${accentRgb})`,
                  border: `1px solid rgba(${accentRgb}, 0.2)`,
                }}
              >
                {service.tag}
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-muted-foreground/30">
                {service.number}/08
              </span>
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-foreground transition-colors duration-500 tracking-tight">
              {service.title}
            </h3>

            <p className="hidden sm:block text-xs md:text-sm text-muted-foreground/50 group-hover:text-muted-foreground/70 transition-colors duration-500 line-clamp-2 max-w-md">
              {service.description}
            </p>

            {/* Mini metric bar */}
            <div className="hidden md:flex items-center gap-2 mt-1">
              <div className="h-[3px] w-16 rounded-full overflow-hidden" style={{ backgroundColor: `rgba(${accentRgb}, 0.1)` }}>
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: '0%' }}
                  whileInView={{ width: `${60 + index * 5}%` }}
                  transition={{ duration: 1, delay: index * 0.08 + 0.4 }}
                  style={{ backgroundColor: `rgb(${accentRgb})` }}
                />
              </div>
              <span className="text-[9px] font-mono" style={{ color: `rgba(${accentRgb}, 0.6)` }}>
                Core Service
              </span>
            </div>
          </div>

          {/* Arrow with accent ring */}
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-500 group-hover:scale-110"
            style={{
              border: `1px solid rgba(${accentRgb}, 0.15)`,
              backgroundColor: `rgba(${accentRgb}, 0.05)`,
            }}
          >
            <ArrowRight
              className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-0.5 transition-all duration-300"
              style={{ color: `rgba(${accentRgb}, 0.6)` }}
            />
          </div>
        </div>

        {/* Colored accent edge */}
        <div className={cn(
          "absolute top-0 bottom-0 w-[3px] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top z-[2]",
          isEven ? "left-0" : "right-0"
        )} style={{ backgroundColor: `rgb(${accentRgb})` }} />

        {/* Bottom progress bar on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-[2]">
          <div
            className="h-full w-0 group-hover:w-full transition-all duration-700 ease-out"
            style={{ backgroundColor: `rgba(${accentRgb}, 0.5)` }}
          />
        </div>
      </Link>
    </div>
  );
};

/* Floating particle */
const FloatingParticle = ({ delay, x, size, color }: { delay: number; x: number; size: number; color: string }) => (
  <motion.div
    className="absolute rounded-full hidden md:block pointer-events-none"
    style={{ left: `${x}%`, width: size, height: size, backgroundColor: color }}
    animate={{
      y: [0, -40, 0],
      opacity: [0.1, 0.35, 0.1],
    }}
    transition={{
      duration: 6 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

const ServicesSection = () => {
  const particles = useMemo(() => [
    { delay: 0, x: 10, size: 3, color: 'rgba(0, 200, 255, 0.4)' },
    { delay: 1.8, x: 30, size: 2, color: 'rgba(168, 85, 247, 0.3)' },
    { delay: 0.6, x: 55, size: 4, color: 'rgba(34, 197, 94, 0.3)' },
    { delay: 2.5, x: 75, size: 2, color: 'rgba(251, 146, 60, 0.3)' },
    { delay: 1.2, x: 90, size: 3, color: 'rgba(244, 63, 94, 0.3)' },
  ], []);

  return (
    <section className="relative bg-background overflow-hidden">
      {/* Background effects */}
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
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(var(--foreground) / 0.04) 3px, hsl(var(--foreground) / 0.04) 4px)',
          }}
        />
        {/* Dual radial glows */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 20% 30%, rgba(0, 200, 255, 0.02), transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(168, 85, 247, 0.02), transparent 50%)'
        }} />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}
      </div>

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent z-[1] pointer-events-none" />

      {/* Content */}
      <div className="relative z-[1] flex flex-col">
        {services.map((service, index) => (
          <ServiceRow key={service.number} service={service} index={index} />
        ))}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />
    </section>
  );
};

export default ServicesSection;
