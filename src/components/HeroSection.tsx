import { Calendar, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import CalendlyButton from "./CalendlyButton";
import seoulBridgeNight from "@/assets/seoul-bridge-night.jpg";

const serviceTags = [
  { label: "PR", position: "top-[18%] left-[8%]", color: "cyan" },
  { label: "Social Media", position: "top-[12%] right-[15%]", color: "purple" },
  { label: "KOL Marketing", position: "top-[40%] left-[3%]", color: "white" },
  { label: "Community", position: "bottom-[30%] right-[6%]", color: "green" },
  { label: "Go-To-Market", position: "bottom-[15%] left-[12%]", color: "pink" },
  { label: "Events", position: "top-[55%] right-[10%]", color: "blue" },
];

const clientLogos = [
  { name: "Binance", logo: "https://cryptologos.cc/logos/binance-coin-bnb-logo.svg" },
  { name: "KuCoin", logo: "https://cryptologos.cc/logos/kucoin-token-kcs-logo.svg" },
  { name: "Chainlink", logo: "https://cryptologos.cc/logos/chainlink-link-logo.svg" },
  { name: "Polygon", logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg" },
  { name: "Arbitrum", logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg" },
  { name: "Solana", logo: "https://cryptologos.cc/logos/solana-sol-logo.svg" },
  { name: "Avalanche", logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg" },
  { name: "Optimism", logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg" },
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
      {/* Background - Seoul Bridge Night Image with Parallax */}
      <div className="absolute inset-0">
        {/* Bridge background image with parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ 
            backgroundImage: `url(${seoulBridgeNight})`,
            filter: "brightness(0.15) saturate(0.3)",
            transform: `translateY(${scrollY * 0.3}px) scale(1.1)`
          }}
        />
        
        {/* Dark overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,2%,0.7)] via-[hsl(0,0%,2%,0.3)] to-[hsl(0,0%,2%,0.95)]" />
        
        {/* Neon Bridge Cable Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Main horizontal neon flow - Cyan */}
          <div className="absolute bottom-[35%] left-0 right-0 h-[2px] overflow-hidden">
            <div className="data-flow-line h-full w-full bg-gradient-to-r from-transparent via-[hsl(180,100%,50%,0.9)] to-transparent" 
                 style={{ animationDelay: "0s" }} />
          </div>
          
          {/* Secondary flow - Purple */}
          <div className="absolute bottom-[38%] left-0 right-0 h-[1.5px] overflow-hidden">
            <div className="data-flow-line h-full w-full bg-gradient-to-r from-transparent via-[hsl(265,100%,63%,0.8)] to-transparent"
                 style={{ animationDelay: "1.5s" }} />
          </div>
          
          {/* Tertiary flow - Cyan light */}
          <div className="absolute bottom-[32%] left-0 right-0 h-[1px] overflow-hidden">
            <div className="data-flow-line h-full w-full bg-gradient-to-r from-transparent via-[hsl(180,100%,70%,0.5)] to-transparent"
                 style={{ animationDelay: "3s" }} />
          </div>

          {/* Bridge Pillar Vertical Glows - Neon */}
          <div className="absolute bottom-[28%] left-[15%] w-[2px] h-36 bg-gradient-to-t from-[hsl(180,100%,50%,0.7)] via-[hsl(180,100%,50%,0.3)] to-transparent animate-neon-pulse" />
          <div className="absolute bottom-[28%] left-[30%] w-[2px] h-28 bg-gradient-to-t from-[hsl(265,100%,63%,0.6)] via-[hsl(265,100%,63%,0.2)] to-transparent animate-neon-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-[28%] left-[50%] w-[3px] h-44 bg-gradient-to-t from-[hsl(180,100%,50%,0.8)] via-[hsl(180,100%,50%,0.4)] to-transparent animate-neon-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-[28%] left-[70%] w-[2px] h-32 bg-gradient-to-t from-[hsl(265,100%,63%,0.6)] via-[hsl(265,100%,63%,0.2)] to-transparent animate-neon-pulse" style={{ animationDelay: "1.5s" }} />
          <div className="absolute bottom-[28%] left-[85%] w-[2px] h-24 bg-gradient-to-t from-[hsl(180,100%,50%,0.5)] via-[hsl(180,100%,50%,0.2)] to-transparent animate-neon-pulse" style={{ animationDelay: "2s" }} />

          {/* Diagonal Cable Lines - Simulating bridge cables */}
          <div className="absolute bottom-[32%] left-[48%] w-[1px] h-48 bg-gradient-to-t from-[hsl(180,100%,50%,0.4)] to-transparent rotate-[15deg] origin-bottom animate-cable-glow" />
          <div className="absolute bottom-[32%] left-[52%] w-[1px] h-48 bg-gradient-to-t from-[hsl(180,100%,50%,0.4)] to-transparent rotate-[-15deg] origin-bottom animate-cable-glow" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-[32%] left-[46%] w-[1px] h-40 bg-gradient-to-t from-[hsl(265,100%,63%,0.3)] to-transparent rotate-[25deg] origin-bottom animate-cable-glow" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-[32%] left-[54%] w-[1px] h-40 bg-gradient-to-t from-[hsl(265,100%,63%,0.3)] to-transparent rotate-[-25deg] origin-bottom animate-cable-glow" style={{ animationDelay: "1.5s" }} />
        </div>
        
        {/* Water Reflection Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-[150px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(180,100%,50%,0.08)] via-[hsl(265,100%,63%,0.04)] to-transparent" />
          {/* Shimmer effect on water */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(180,100%,50%,0.15)] to-transparent animate-water-shimmer" />
          </div>
        </div>
        
        {/* Subtle glow effect on bridge center - Neon Cyan/Purple */}
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gradient-radial from-[hsl(180,100%,50%,0.1)] via-[hsl(265,100%,63%,0.05)] to-transparent blur-3xl" />
      </div>

      {/* Floating Service Tags */}
      {serviceTags.map((tag, index) => (
        <div
          key={index}
          className={`absolute ${tag.position} hidden lg:block animate-float z-10`}
          style={{ 
            animationDelay: `${index * 0.5}s`,
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        >
          <span className={`service-tag service-tag-${tag.color}`}>
            {tag.label}
          </span>
        </div>
      ))}

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-32 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-light leading-[0.9] tracking-tight mb-8">
            <span className="text-[hsl(var(--dark-fg))] neon-text-white">Your </span>
            <span className="serif-italic neon-text-cyan">Bridge</span>
            <br />
            <span className="text-[hsl(var(--dark-fg))] neon-text-white">to </span>
            <span className="serif-italic neon-text-purple">Korea</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-[hsl(var(--dark-fg),0.6)] max-w-2xl mx-auto mb-12">
            Since 2023, we've connected <span className="text-[hsl(180,100%,50%)]">200+</span> global Web3 projects 
            with the Korean crypto market through strategic marketing and community building.
          </p>

          {/* CTA Button */}
          <CalendlyButton className="lunar-btn text-lg px-8 py-4">
            <Calendar className="w-5 h-5" />
            <span>Book a Free Consultation</span>
          </CalendlyButton>
        </div>
      </div>

      {/* Client Logo Marquee */}
      <div className="relative z-10 border-t border-[hsl(180,100%,50%,0.15)] py-8 mt-auto overflow-hidden">
        <div className="flex items-center logo-marquee">
          {[...clientLogos, ...clientLogos].map((client, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center mx-12 min-w-[100px]"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="h-8 w-auto opacity-50 hover:opacity-80 transition-opacity grayscale brightness-200 hover:drop-shadow-[0_0_8px_hsl(180,100%,50%,0.5)]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown className="w-6 h-6 text-[hsl(180,100%,50%,0.6)] animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;