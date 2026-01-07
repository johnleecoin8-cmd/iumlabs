import { ChevronDown, Send } from "lucide-react";
import { useEffect, useState, MouseEvent, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useCountUp } from "@/hooks/useCountUp";
import { useRipple } from "@/hooks/useRipple";

// Import client logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import peaqLogo from "@/assets/logos/peaq.svg";
import storyProtocolLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria-official.png";
import mantraLogo from "@/assets/logos/mantra.png";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import fogoLogo from "@/assets/logos/fogo.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";

// Project background images
import storyBg from '@/assets/projects/story-bg.jpg';
import saharaAiBg from '@/assets/projects/sahara-ai-bg.jpg';
import peaqBg from '@/assets/projects/peaq-bg.jpg';
import mantraBg from '@/assets/projects/mantra-featured-bg.jpg';
import openledgerHero from '@/assets/campaigns/openledger-hero-official.png';
import kucoinBg from '@/assets/projects/kucoin-bg.jpg';
import bybitBg from '@/assets/projects/bybit-bg.jpg';
import bnbBg from '@/assets/projects/bnb-bg.jpg';

// Desktop tags - 8 services
const serviceTags = [{
  label: "Deep Research",
  position: "top-[6%] left-[3%]"
}, {
  label: "GTM Strategy",
  position: "top-[24%] left-[2%]"
}, {
  label: "Community Growth",
  position: "top-[44%] left-[3%]"
}, {
  label: "Branding & Web",
  position: "top-[64%] left-[2%]"
}, {
  label: "KOL Marketing",
  position: "top-[8%] right-[3%]"
}, {
  label: "Media & PR",
  position: "top-[26%] right-[2%]"
}, {
  label: "SEO & Ads",
  position: "top-[46%] right-[3%]"
}, {
  label: "Offline Events",
  position: "top-[66%] right-[2%]"
}];

// Mobile tags
const mobileServiceTags = [{
  label: "Research",
  position: "top-[14%] left-[4%]"
}, {
  label: "GTM",
  position: "top-[14%] right-[4%]"
}, {
  label: "Marketing",
  position: "top-[23%] left-[3%]"
}, {
  label: "Events",
  position: "top-[23%] right-[3%]"
}];

const clientLogos = [{
  name: "BNB",
  logo: bnbLogo,
  noInvert: false
}, {
  name: "KuCoin",
  logo: kucoinLogo,
  noInvert: false
}, {
  name: "Polygon",
  logo: polygonLogo,
  noInvert: false
}, {
  name: "Ondo Finance",
  logo: ondoLogo,
  noInvert: false
}, {
  name: "Bybit",
  logo: bybitLogo,
  noInvert: false
}, {
  name: "Peaq",
  logo: peaqLogo,
  noInvert: false
}, {
  name: "Story Protocol",
  logo: storyProtocolLogo,
  noInvert: false
}, {
  name: "MegaETH",
  logo: megaethLogo,
  noInvert: false
}, {
  name: "Tria",
  logo: triaLogo,
  noInvert: true
}, {
  name: "Mantra",
  logo: mantraLogo,
  noInvert: true
}, {
  name: "Sahara AI",
  logo: saharaAiLogo,
  noInvert: true
}, {
  name: "FOGO",
  logo: fogoLogo,
  noInvert: true
}, {
  name: "SynFutures",
  logo: synfuturesLogo,
  noInvert: true
}];

const stats = [{
  value: 18,
  label: "Projects Launched",
  suffix: "+"
}, {
  value: 115,
  label: "KOL Network",
  suffix: "+"
}, {
  value: 6,
  label: "Token Sales",
  prefix: "$",
  suffix: "M"
}, {
  value: 42,
  label: "Events Hosted",
  suffix: "+"
}];

const projects = [
  { name: "Story Protocol", category: "IP Platform", result: "Korea #1", media: storyBg, video: "/videos/projects/story-hero.mp4", slug: "story-protocol" },
  { name: "MANTRA", category: "L1 Infrastructure", result: "500% Growth", media: mantraBg, video: "/videos/projects/mantra-hero.mp4", slug: "mantra" },
  { name: "Bybit", category: "Exchange", result: "#2 Traffic", media: bybitBg, video: "/videos/projects/bybit-hero.mp4", slug: "bybit" },
  { name: "BNB Chain", category: "Infrastructure", result: "+340% Volume", media: bnbBg, video: "/videos/projects/bnb-hero.mp4", slug: "bnb-chain" },
  { name: "peaq", category: "DePIN Entry", result: "First Branding", media: peaqBg, video: "/videos/projects/peaq-hero.mp4", slug: "peaq" },
  { name: "Sahara AI", category: "AI × Blockchain", result: "Community Built", media: saharaAiBg, video: "/videos/projects/sahara-hero.mp4", slug: "sahara-ai" },
  { name: "KuCoin", category: "Exchange Campaign", result: "Top Engagement", media: kucoinBg, video: "/videos/projects/kucoin-hero.mp4", slug: "kucoin" },
  { name: "OpenLedger", category: "Data Infrastructure", result: "Market Entry", media: openledgerHero, slug: "openledger" },
];

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const { createRipple } = useRipple();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate when not hovering
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div ref={ref} className="relative h-full min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Dynamic Background Media */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {projects[activeIndex].video ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={`${projects[activeIndex].video}#t=0.001`} type="video/mp4" />
            </video>
          ) : (
            <img
              src={projects[activeIndex].media}
              alt={projects[activeIndex].name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Bottom gradient for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(0,0%,4%,0.95)]" />

      {/* Floating Service Tags - Desktop */}
      {serviceTags.map((tag, index) => (
        <div 
          key={index} 
          className={`absolute ${tag.position} hidden lg:block z-10`} 
          style={{
            animation: `float-gentle ${3 + (index % 3) * 0.5}s ease-in-out infinite`,
            animationDelay: `${index * 0.3}s`
          }}
        >
          <span className="font-sans px-4 py-2 text-xs whitespace-nowrap rounded-lg bg-white/[0.04] border border-white/[0.12] text-white/65 hover:bg-white/[0.12] hover:border-primary/60 hover:text-white hover:shadow-[0_0_24px_rgba(255,255,255,0.15)] hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-default backdrop-blur-md">
            {tag.label}
          </span>
        </div>
      ))}

      {/* Floating Service Tags - Mobile */}
      {mobileServiceTags.map((tag, index) => (
        <div 
          key={`mobile-${index}`} 
          className={`absolute ${tag.position} lg:hidden z-10`} 
          style={{
            animation: `float-gentle ${3.5 + (index % 2) * 0.5}s ease-in-out infinite`,
            animationDelay: `${index * 0.4}s`
          }}
        >
          <span className="font-sans px-3 py-1.5 text-[11px] rounded-md bg-black/60 border border-white/25 text-white/90 whitespace-nowrap backdrop-blur-md shadow-lg">
            {tag.label}
          </span>
        </div>
      ))}

      {/* Main Content - Two Column Layout */}
      <div className="flex-1 flex items-center relative z-10 px-4 sm:px-8 pt-16 md:pt-0">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left - Project List */}
          <div 
            className="order-2 lg:order-1 flex flex-col justify-center"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="text-[10px] text-white/40 tracking-[0.4em] uppercase mb-4 md:mb-6"
            >
              Selected Work
            </motion.span>

            <div className="space-y-0">
              {projects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group block py-2 md:py-3 border-b border-white/10"
                    onMouseEnter={() => setActiveIndex(i)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2 md:gap-4">
                        <span className={`text-base md:text-xl lg:text-2xl font-bold transition-colors duration-300 ${
                          activeIndex === i ? 'text-white' : 'text-white/30'
                        }`}>
                          {project.name}
                        </span>
                        <span className={`hidden md:block text-[10px] transition-colors duration-300 ${
                          activeIndex === i ? 'text-violet-400' : 'text-white/20'
                        }`}>
                          {project.category}
                        </span>
                      </div>
                      <motion.svg 
                        className={`w-3 h-3 md:w-4 md:h-4 transition-all duration-300 ${
                          activeIndex === i ? 'text-white opacity-100 translate-x-0' : 'text-white/20 opacity-0 -translate-x-4'
                        }`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-4 md:mt-6"
            >
              <Link 
                to="/projects"
                className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors"
              >
                <span>View All Projects</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Right - Headline & CTA */}
          <div className="order-1 lg:order-2 flex flex-col justify-center text-center lg:text-left">
            {/* Main Headline */}
            <h1 className="font-sans text-[1.75rem] sm:text-display-xl md:text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em] mb-3 sm:mb-5">
              <span className="text-white font-sans leading-tight">Your Crypto Ecosystem Growth Agency</span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-body-base md:text-body-lg text-white/70 max-w-xl mx-auto lg:mx-0 mb-4 sm:mb-6 font-normal tracking-wide leading-relaxed">
              Bridging Global Web3 to Korea with <span className="text-white font-semibold">Data Intelligence</span>. We act as your <span className="text-white font-semibold">strategic gateway</span>.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <a 
                href="/contact#contact-form" 
                className="group primary-cta-dark inline-flex items-center gap-1.5 sm:gap-2 px-5 py-2.5 sm:px-6 sm:py-3 font-medium text-xs sm:text-sm rounded-full active:scale-[0.98] min-h-[44px] sm:min-h-[48px] border border-white/30"
                onClick={(e) => createRipple(e as unknown as MouseEvent<HTMLElement>)}
              >
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Get Your Free Proposal</span>
              </a>
            </div>
            
            {/* Micro-copy for trust */}
            <p className="mt-3 text-[10px] sm:text-xs text-white/50 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Free 30-min consultation • Response within 24h
              </span>
            </p>

            {/* Active Project Info - Desktop */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="hidden lg:block mt-8 text-left"
              >
                <span className="text-violet-400 text-sm font-medium">{projects[activeIndex].result}</span>
                <p className="text-white/50 text-xs mt-1 max-w-xs">
                  Successful Korean market entry with comprehensive GTM strategy.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 py-3 sm:py-6 md:py-8">
        <div className="container mx-auto px-3 sm:px-8 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <StatItem 
                key={index} 
                value={stat.value} 
                label={stat.label} 
                prefix={stat.prefix} 
                suffix={stat.suffix} 
                isVisible={isVisible} 
                delay={index * 100} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Client Logo Marquee */}
      <div className="relative z-10 border-t border-white/15 py-3 sm:py-4 overflow-hidden">
        <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white/50 text-label z-20">
          <span className="number-badge">01</span>
        </div>

        <div className="flex items-center logo-marquee-slow ml-12 sm:ml-20">
          {[...clientLogos, ...clientLogos].map((client, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 sm:gap-2.5 mx-1.5 sm:mx-2.5 px-3 sm:px-5 py-1.5 sm:py-2.5 bg-zinc-900/80 rounded-full border border-white/15 hover:border-white/25 transition-all duration-300"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className={`h-4 w-4 sm:h-5 sm:w-5 object-contain flex-shrink-0 ${client.noInvert ? 'opacity-90' : 'brightness-0 invert opacity-85'}`} 
              />
              <span className="text-white/75 text-caption font-medium whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-16 sm:bottom-24 right-3 sm:right-8 z-10 flex items-center gap-2 group cursor-pointer hover:scale-105 transition-transform" 
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
      >
        <span className="text-white/40 text-[10px] sm:text-sm font-medium group-hover:text-white/70 transition-colors duration-300">scroll</span>
        <div className="relative flex flex-col items-center">
          <div className="w-4 h-6 sm:w-6 sm:h-9 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300 flex justify-center pt-1">
            <div className="w-1 h-1 sm:w-1.5 sm:h-2 rounded-full bg-white/60 group-hover:bg-primary transition-colors duration-300 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Item Component
const StatItem = ({
  value,
  label,
  prefix = "",
  suffix = "",
  isVisible,
  delay
}: {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  isVisible: boolean;
  delay: number;
}) => {
  const count = useCountUp({
    end: value,
    isVisible,
    delay,
    duration: 2000
  });
  return (
    <div className="text-center group cursor-default hover:scale-105 transition-transform">
      <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5 sm:mb-1 stat-glow transition-all duration-300 group-hover:text-primary tracking-tight">
        {prefix}{count}{suffix}
      </div>
      <div className="text-[10px] sm:text-sm text-white/60 font-medium group-hover:text-white/75 transition-colors duration-300">
        {label}
      </div>
    </div>
  );
};

export default HeroSection;
