import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import CalendlyButton from "./CalendlyButton";
import seoulBridgeNight from "@/assets/seoul-bridge-night.jpg";

// Import client logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.png";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import peaqLogo from "@/assets/logos/peaq.svg";
import storyProtocolLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria.png";

const serviceTags = [
  { label: "PR", position: "top-[20%] left-[6%]" },
  { label: "Social Media Marketing", position: "top-[15%] right-[10%]" },
  { label: "KOL Marketing", position: "top-[45%] left-[4%]" },
  { label: "Go-To-Market-Strategy", position: "bottom-[25%] right-[5%]" },
  { label: "Influencer Strategy", position: "bottom-[12%] left-[10%]" },
  { label: "Community", position: "top-[60%] right-[8%]" },
];

const clientLogos = [
  { name: "BNB", logo: bnbLogo },
  { name: "KuCoin", logo: kucoinLogo },
  { name: "Polygon", logo: polygonLogo },
  { name: "Ondo Finance", logo: ondoLogo },
  { name: "Bybit", logo: bybitLogo },
  { name: "Peaq", logo: peaqLogo },
  { name: "Story Protocol", logo: storyProtocolLogo },
  { name: "MegaETH", logo: megaethLogo },
  { name: "Tria", logo: triaLogo },
];

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-full min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background - Seoul Bridge Night with Ken Burns Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-kenburns"
          style={{ 
            backgroundImage: `url(${seoulBridgeNight})`,
            filter: "brightness(0.35)",
          }}
        />
        
        {/* Aurora light overlay */}
        <div className="absolute inset-0 animate-aurora">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-cyan-500/15" />
          <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/10 via-transparent to-blue-500/10" />
        </div>
        
        {/* Light sweep effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-light-sweep" />
        </div>
        
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
      </div>

      {/* Floating Service Tags - Desktop only */}
      {serviceTags.map((tag, index) => (
        <div
          key={index}
          className={`absolute ${tag.position} hidden xl:block animate-float z-10`}
          style={{ 
            animationDelay: `${index * 0.5}s`,
            transform: `translateY(${scrollY * 0.08}px)`
          }}
        >
          <span className="font-sans lunar-tag-dark text-xs whitespace-nowrap">
            {tag.label}
          </span>
        </div>
      ))}

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Headline - Unified Inter font with color contrast */}
          <h1 className="font-sans text-[12vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw] font-bold leading-[0.9] tracking-[-0.02em] mb-8 sm:mb-10 opacity-0 animate-fade-up">
            <span className="text-white">Your </span>
            <span className="text-white/60">Web 3.0</span>
            <br />
            <span className="text-white/60">Marketing </span>
            <span className="text-white">Agency</span>
          </h1>

          {/* Subtext - Larger and more prominent */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up stagger-2 font-light tracking-wide">
            We build the bridge for your project to enter the Korean market with <span className="text-white font-medium">Multi-channel marketing</span>.
          </p>

          {/* CTA Button - Gradient Style with subtle glow */}
          <div className="opacity-0 animate-fade-up stagger-3 mt-6 sm:mt-8 relative">
            {/* Very subtle glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/30 to-cyan-400/30 opacity-10 blur-2xl scale-105" style={{ animation: 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            
            <CalendlyButton className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 text-white text-base sm:text-lg px-10 sm:px-14 py-5 sm:py-6 rounded-2xl font-bold shadow-[0_20px_50px_rgba(59,130,246,0.4)] hover:shadow-[0_25px_60px_rgba(59,130,246,0.6)] transition-all duration-500 hover:scale-[1.02] border border-white/20">
              {/* Subtle shine sweep on hover only */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative flex items-center gap-4">
                {/* Bridge Icon */}
                <div className="relative">
                  <svg 
                    className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:scale-110 transition-transform duration-300" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 18h20" />
                    <path d="M5 18V9" />
                    <path d="M19 18V9" />
                    <path d="M5 9c0 0 3.5-5 7-5s7 5 7 5" />
                    <path d="M8 18v-5" />
                    <path d="M16 18v-5" />
                    <path d="M5 13h14" />
                  </svg>
                </div>
                <span className="relative tracking-tight drop-shadow-sm">Book a Free Consultation</span>
                <svg 
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-1.5 transition-all duration-300" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </div>
            </CalendlyButton>
          </div>
        </div>
      </div>

      {/* Client Logo Marquee - Dark Pill Cards Style */}
      <div className="relative z-10 border-t border-white/10 py-4 sm:py-6 overflow-hidden">
        {/* Section indicator */}
        <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white/40 text-xs sm:text-sm z-20">
          <span className="number-badge">01</span>
        </div>

        <div className="flex items-center logo-marquee-slow ml-16 sm:ml-20">
          {[...clientLogos, ...clientLogos].map((client, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 sm:gap-3 mx-2 sm:mx-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-zinc-900/80 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="h-5 w-5 sm:h-7 sm:w-7 object-contain brightness-0 invert opacity-80 flex-shrink-0"
              />
              <span className="text-white/70 text-xs sm:text-sm font-medium whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator - Bottom Right */}
      <div className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 z-10 flex items-center gap-2 sm:gap-3 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <span className="text-white/40 text-xs sm:text-sm font-medium">scroll</span>
        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-white/40 animate-bounce" />
      </div>
    </div>
  );
};

export default HeroSection;
