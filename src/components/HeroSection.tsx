import { ChevronDown, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { brand } from "@/config/content";

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

// Desktop tags - 8 services
const serviceTags = [{
  label: "Deep Research",
  position: "top-[12%] left-[5%]"
}, {
  label: "GTM Strategy",
  position: "top-[28%] left-[4%]"
}, {
  label: "Community Growth",
  position: "top-[44%] left-[6%]"
}, {
  label: "Branding & Web",
  position: "top-[60%] left-[5%]"
}, {
  label: "KOL Marketing",
  position: "top-[14%] right-[6%]"
}, {
  label: "Media & PR",
  position: "top-[30%] right-[5%]"
}, {
  label: "SEO & Ads",
  position: "top-[46%] right-[7%]"
}, {
  label: "Offline Events",
  position: "top-[62%] right-[6%]"
}];

// Mobile tags (fewer, repositioned for small screens)
const mobileServiceTags = [{
  label: "Research",
  position: "top-[8%] left-[3%]"
}, {
  label: "GTM",
  position: "top-[14%] right-[3%]"
}, {
  label: "Marketing",
  position: "bottom-[40%] left-[2%]"
}, {
  label: "Events",
  position: "bottom-[34%] right-[2%]"
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
  value: 4,
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
  useEffect(() => {
    // Trigger count-up animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);
  return <div className="relative h-full min-h-[calc(100vh-2rem)] flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl">
      {/* Background Layer - Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{
        filter: "brightness(0.35)"
      }} onLoadedMetadata={e => {
        e.currentTarget.currentTime = 0;
      }}>
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
      </div>

      {/* Floating Service Tags - Desktop - Enhanced */}
      {serviceTags.map((tag, index) => <div key={index} className={`absolute ${tag.position} hidden lg:block z-10`}>
          <span className="font-sans px-5 py-2.5 text-sm whitespace-nowrap rounded-xl bg-white/[0.04] border border-white/[0.12] text-white/75 hover:bg-white/[0.12] hover:border-primary/60 hover:text-white hover:shadow-[0_0_24px_rgba(255,255,255,0.15)] hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-default backdrop-blur-md">
            {tag.label}
          </span>
        </div>)}

      {/* Floating Service Tags - Mobile - Enhanced */}
      {mobileServiceTags.map((tag, index) => <div key={`mobile-${index}`} className={`absolute ${tag.position} lg:hidden z-10`}>
          <span className="font-sans px-3 py-1.5 text-xs rounded-lg bg-white/[0.04] border border-white/[0.12] text-white/65 whitespace-nowrap backdrop-blur-sm">
            {tag.label}
          </span>
        </div>)}

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Headline - Premium Display Typography with Syne */}
          <h1 className="font-display text-display-xl sm:text-display-2xl md:text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] mb-4 sm:mb-5 md:mb-6 mt-4 sm:mt-6 md:mt-8">
            <span className="text-white font-sans text-5xl">Bridge Your Web3 Project
to Korea's Crypto Ecosystem</span>
            <br />
            
          </h1>

          {/* Subtext - Enhanced readability */}
          <p className="text-body-base text-white/70 max-w-3xl mx-auto mb-5 sm:mb-6 md:mb-8 font-normal tracking-wide leading-relaxed px-2 md:text-body-xl">
            We combine <span className="text-white font-semibold">deep-dive research labs</span> with <span className="text-white font-semibold">high-impact marketing execution</span> to ensure your project thrives in the Korean market.
          </p>

          {/* CTA Button - Enhanced */}
          <a href="/contact#contact-form" className="group relative inline-flex items-center gap-2 py-2.5 sm:px-6 sm:py-3 bg-white text-black font-medium text-sm rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] min-h-[40px] sm:min-h-[44px] px-[22px]">
            {/* Shine sweep effect */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
            <Send className="w-4 h-4" />
            <span>Get Your Free Proposal</span>
          </a>
        </div>
      </div>

      {/* Stats Section - Enhanced */}
      <div className="relative z-10 py-5 sm:py-6 md:py-8">
        <div className="container mx-auto px-4 sm:px-8 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => <StatItem key={index} value={stat.value} label={stat.label} prefix={stat.prefix} suffix={stat.suffix} isVisible={isVisible} delay={index * 100} />)}
          </div>
        </div>
      </div>

      {/* Client Logo Marquee - Enhanced */}
      <div className="relative z-10 border-t border-white/15 py-3 sm:py-4 overflow-hidden">
        {/* Section indicator */}
        <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white/50 text-label z-20">
          <span className="number-badge">01</span>
        </div>

        <div className="flex items-center logo-marquee-slow ml-12 sm:ml-20">
          {[...clientLogos, ...clientLogos].map((client, index) => <div key={index} className="flex items-center gap-2 sm:gap-2.5 mx-1.5 sm:mx-2.5 px-3 sm:px-5 py-1.5 sm:py-2.5 bg-zinc-900/80 rounded-full border border-white/15 hover:border-white/25 transition-all duration-300">
              <img src={client.logo} alt={client.name} className={`h-4 w-4 sm:h-5 sm:w-5 object-contain flex-shrink-0 ${client.noInvert ? 'opacity-90' : 'brightness-0 invert opacity-85'}`} />
              <span className="text-white/75 text-caption font-medium whitespace-nowrap">
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
      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 stat-glow transition-all duration-300 group-hover:text-primary tracking-tight">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-white/60 font-medium group-hover:text-white/75 transition-colors duration-300">
        {label}
      </div>
    </div>;
};
export default HeroSection;