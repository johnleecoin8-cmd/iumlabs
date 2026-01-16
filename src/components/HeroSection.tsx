import { ChevronDown, Send } from "lucide-react";
import { useEffect, useState, MouseEvent } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { useRipple } from "@/hooks/useRipple";
import { brand } from "@/config/content";

// Import client logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import peaqLogo from "@/assets/logos/peaq.svg";
import storyProtocolLogo from "@/assets/logos/story-protocol.png";
import selaNetworkLogo from "@/assets/logos/sela-network.png";
import ai16zLogo from "@/assets/logos/ai16z.png";
import triaLogo from "@/assets/logos/tria-official.png";
import mantraLogo from "@/assets/logos/mantra.png";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import fogoLogo from "@/assets/logos/fogo.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";

// Desktop tags - 8 services (positioned at edges with good spacing)
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

// Mobile tags - repositioned for better visual distribution
const mobileServiceTags = [{
  label: "Research",
  position: "top-[12%] left-[5%]"
}, {
  label: "GTM",
  position: "top-[18%] right-[6%]"
}, {
  label: "Marketing",
  position: "top-[32%] left-[4%]"
}, {
  label: "Events",
  position: "top-[38%] right-[5%]"
}, {
  label: "Media",
  position: "top-[52%] left-[6%]"
}, {
  label: "KOL",
  position: "top-[58%] right-[4%]"
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
  name: "Sela Network",
  logo: selaNetworkLogo,
  noInvert: true
}, {
  name: "ai16z",
  logo: ai16zLogo,
  noInvert: true
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
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { createRipple } = useRipple();
  
  useEffect(() => {
    // Trigger count-up animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);
  return <div className="relative h-full min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background Layer - Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-background.mp4#t=0.001" type="video/mp4" />
        </video>
      </div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Bottom gradient for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(0,0%,4%,0.95)]" />

      {/* Floating Service Tags - Desktop - Enhanced with floating animation */}
      {serviceTags.map((tag, index) => <div key={index} className={`absolute ${tag.position} hidden lg:block z-10`} style={{
          animation: `float-gentle ${3 + (index % 3) * 0.5}s ease-in-out infinite`,
          animationDelay: `${index * 0.3}s`
        }}>
          <span className="font-sans px-4 py-2 text-xs whitespace-nowrap rounded-lg bg-white/[0.04] border border-white/[0.12] text-white/65 hover:bg-white/[0.12] hover:border-primary/60 hover:text-white hover:shadow-[0_0_24px_rgba(255,255,255,0.15)] hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-default backdrop-blur-md">
            {tag.label}
          </span>
        </div>)}

      {/* Floating Service Tags - Mobile - Enhanced visibility */}
      {mobileServiceTags.map((tag, index) => <div key={`mobile-${index}`} className={`absolute ${tag.position} lg:hidden z-10`} style={{
          animation: `float-gentle ${3.5 + (index % 2) * 0.5}s ease-in-out infinite`,
          animationDelay: `${index * 0.4}s`
        }}>
          <span className="font-sans px-3 py-1.5 text-[11px] rounded-md bg-black/60 border border-white/25 text-white/90 whitespace-nowrap backdrop-blur-md shadow-lg">
            {tag.label}
          </span>
        </div>)}

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Headline - Premium Display Typography - Mobile optimized */}
          <h1 className="font-sans text-[1.75rem] sm:text-display-xl md:text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.02em] mb-3 sm:mb-5 md:mb-6 mt-2 sm:mt-6 md:mt-8">
            <span className="text-white font-sans text-[1.5rem] sm:text-display-hero leading-tight">Korea Web3 Marketing & Crypto GTM Partner</span>
          </h1>

          {/* Subtext - Enhanced readability - Mobile optimized */}
          <p className="text-sm sm:text-body-base md:text-body-xl text-white/70 max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 font-normal tracking-wide leading-relaxed px-1 sm:px-2">
            Bridging Global Web3 to Korea with <span className="text-white font-semibold">Data Intelligence</span>. We act as your <span className="text-white font-semibold">strategic gateway</span>.
          </p>

          {/* CTA Button - Enhanced - Mobile optimized */}
          <a 
            href="/contact#contact-form" 
            className="group primary-cta-dark inline-flex items-center gap-1.5 sm:gap-2 px-5 py-2.5 sm:px-6 sm:py-3 font-medium text-xs sm:text-sm rounded-full active:scale-[0.98] min-h-[44px] sm:min-h-[48px] border border-white/30"
            onClick={(e) => createRipple(e as unknown as MouseEvent<HTMLElement>)}
          >
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Get Your Free Proposal</span>
          </a>
          
          {/* Micro-copy for trust */}
          <p className="mt-3 text-[10px] sm:text-xs text-white/50">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Free 30-min consultation • Response within 24h
            </span>
          </p>
        </div>
      </div>

      {/* Stats Section - Enhanced - Mobile optimized */}
      <div className="relative z-10 py-3 sm:py-6 md:py-8">
        <div className="container mx-auto px-3 sm:px-8 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => <StatItem key={index} value={stat.value} label={stat.label} prefix={stat.prefix} suffix={stat.suffix} isVisible={isVisible} delay={index * 100} />)}
          </div>
        </div>
      </div>

      {/* Client Logo Marquee - Full Width */}
      <div className="relative z-10 py-3 sm:py-4 overflow-hidden">
        <div className="flex items-center logo-marquee-slow">
          {[...clientLogos, ...clientLogos].map((client, index) => <div key={index} className="flex items-center gap-1.5 sm:gap-2.5 mx-1 sm:mx-2.5 px-2 sm:px-5 py-1.5 sm:py-2.5 bg-zinc-900/80 rounded-full border border-white/15 hover:border-white/25 transition-all duration-300 max-w-[140px] sm:max-w-none">
              <img src={client.logo} alt={client.name} className={`h-4 w-4 sm:h-5 sm:w-5 object-contain flex-shrink-0 ${client.noInvert ? 'opacity-90' : 'brightness-0 invert opacity-85'}`} />
              <span className="text-white/75 text-[10px] sm:text-caption font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                {client.name}
              </span>
            </div>)}
        </div>
      </div>

      {/* Enhanced Scroll Indicator - Bottom Right */}
      <div className="absolute bottom-16 sm:bottom-24 right-3 sm:right-8 z-10 flex items-center gap-2 group cursor-pointer hover:scale-105 transition-transform" onClick={() => window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    })}>
        <span className="text-white/40 text-[10px] sm:text-sm font-medium group-hover:text-white/70 transition-colors duration-300">scroll</span>
        <div className="relative flex flex-col items-center">
          <div className="w-4 h-6 sm:w-6 sm:h-9 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300 flex justify-center pt-1">
            <div className="w-1 h-1 sm:w-1.5 sm:h-2 rounded-full bg-white/60 group-hover:bg-primary transition-colors duration-300 animate-bounce" />
          </div>
        </div>
      </div>
    </div>;
};

// Stat Item Component with Count-Up Animation
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
  return <div className="text-center group cursor-default hover:scale-105 transition-transform">
      <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5 sm:mb-1 stat-glow transition-all duration-300 group-hover:text-primary tracking-tight">
        {prefix}{count}{suffix}
      </div>
      <div className="text-[10px] sm:text-sm text-white/60 font-medium group-hover:text-white/75 transition-colors duration-300">
        {label}
      </div>
    </div>;
};
export default HeroSection;