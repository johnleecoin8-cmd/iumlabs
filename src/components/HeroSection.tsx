import { Calendar, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import CalendlyButton from "./CalendlyButton";
import moonBackground from "@/assets/moon-background.jpg";

const serviceTags = [
  { label: "PR", position: "top-[20%] left-[6%]" },
  { label: "Social Media Marketing", position: "top-[15%] right-[10%]" },
  { label: "KOL Marketing", position: "top-[45%] left-[4%]" },
  { label: "Go-To-Market-Strategy", position: "bottom-[25%] right-[5%]" },
  { label: "Influencer Strategy", position: "bottom-[12%] left-[10%]" },
  { label: "Community", position: "top-[60%] right-[8%]" },
];

const clientLogos = [
  { name: "Solana", logo: "https://cryptologos.cc/logos/solana-sol-logo.svg" },
  { name: "Polygon", logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg" },
  { name: "Chainlink", logo: "https://cryptologos.cc/logos/chainlink-link-logo.svg" },
  { name: "Avalanche", logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg" },
  { name: "Arbitrum", logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg" },
  { name: "Optimism", logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg" },
  { name: "Binance", logo: "https://cryptologos.cc/logos/binance-coin-bnb-logo.svg" },
  { name: "KuCoin", logo: "https://cryptologos.cc/logos/kucoin-token-kcs-logo.svg" },
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
    <section className="section-dark relative h-screen flex flex-col justify-between overflow-hidden">
      {/* Background - Moon/Planet Image */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${moonBackground})`,
            filter: "brightness(0.3) grayscale(0.5)",
            transform: `translateY(${scrollY * 0.2}px) scale(1.1)`
          }}
        />
        
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.4)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
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
          <span className="lunar-tag-dark text-xs whitespace-nowrap">
            {tag.label}
          </span>
        </div>
      ))}

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Headline - Adjusted size to fit viewport */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.9] tracking-tight mb-6 sm:mb-8 opacity-0 animate-fade-up">
            <span className="text-white">Your</span>
            <span className="serif-italic text-white"> Crypto</span>
            <br />
            <span className="text-white">Ecosystem</span>
            <span className="serif-italic text-white"> Growth</span>
            <br />
            <span className="text-white">Agency</span>
          </h1>

          {/* Subtext - Lunar Strategy style */}
          <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto mb-8 opacity-0 animate-fade-up stagger-2">
            Since 2023, we've worked together with <span className="text-white font-medium">200+ ecosystems</span> and projects in the Korean Crypto space.
          </p>

          {/* CTA Button */}
          <div className="opacity-0 animate-fade-up stagger-3 mt-4 sm:mt-6">
            <CalendlyButton className="lunar-btn text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 hover-glow">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Book a Free Consultation</span>
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
              className="flex items-center gap-2 sm:gap-3 mx-2 sm:mx-3 px-3 sm:px-5 py-2 sm:py-2.5 bg-zinc-900/80 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="h-4 w-4 sm:h-6 sm:w-6 object-contain brightness-0 invert opacity-80"
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
    </section>
  );
};

export default HeroSection;
