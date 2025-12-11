import { Calendar, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import CalendlyButton from "./CalendlyButton";
import moonBackground from "@/assets/moon-background.jpg";

const serviceTags = [
  { label: "PR", position: "top-[15%] left-[5%]" },
  { label: "Social Media Marketing", position: "top-[8%] right-[8%]" },
  { label: "KOL Marketing", position: "top-[35%] left-[2%]" },
  { label: "Go-To-Market-Strategy", position: "bottom-[35%] right-[3%]" },
  { label: "Influencer Strategy", position: "bottom-[20%] left-[8%]" },
  { label: "Community", position: "top-[50%] right-[5%]" },
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
    <section className="section-dark relative min-h-screen flex flex-col justify-center overflow-hidden">
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

      {/* Floating Service Tags */}
      {serviceTags.map((tag, index) => (
        <div
          key={index}
          className={`absolute ${tag.position} hidden lg:block animate-float z-10`}
          style={{ 
            animationDelay: `${index * 0.5}s`,
            transform: `translateY(${scrollY * 0.08}px)`
          }}
        >
          <span className="lunar-tag-dark text-xs md:text-sm whitespace-nowrap">
            {tag.label}
          </span>
        </div>
      ))}

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-32 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Headline - MASSIVE Typography like Lunar Strategy */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[11rem] xl:text-[14rem] 2xl:text-[16rem] font-light leading-[0.85] tracking-tight mb-8 opacity-0 animate-fade-up">
            <span className="text-white">Your</span>
            <br className="hidden sm:block" />
            <span className="serif-italic text-white"> Crypto</span>
            <br />
            <span className="text-white">Ecosystem</span>
            <br className="hidden sm:block" />
            <span className="serif-italic text-white"> Growth</span>
            <br />
            <span className="text-white">Agency</span>
          </h1>

          {/* CTA Button */}
          <div className="opacity-0 animate-fade-up stagger-2 mt-12">
            <CalendlyButton className="lunar-btn text-base px-8 py-4 hover-glow">
              <Calendar className="w-5 h-5" />
              <span>Book a Free Consultation</span>
            </CalendlyButton>
          </div>
        </div>
      </div>

      {/* Client Logo Marquee - Dark Pill Cards Style */}
      <div className="relative z-10 border-t border-white/10 py-6 mt-auto overflow-hidden">
        {/* Section indicator */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white/40 text-sm z-20">
          <span className="number-badge">01</span>
        </div>

        <div className="flex items-center logo-marquee-slow ml-20">
          {[...clientLogos, ...clientLogos].map((client, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 mx-3 px-5 py-2.5 bg-zinc-900/80 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="h-6 w-6 object-contain brightness-0 invert opacity-80"
              />
              <span className="text-white/70 text-sm font-medium whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Page Indicator - Bottom Right */}
      <div className="absolute bottom-8 right-8 z-10 flex items-center gap-3 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <span className="text-white/40 text-sm font-medium">scroll</span>
        <ChevronDown className="w-4 h-4 text-white/40 animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
