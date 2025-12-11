import { Calendar, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import CalendlyButton from "./CalendlyButton";
import seoulBridgeNight from "@/assets/seoul-bridge-night.jpg";

const serviceTags = [
  { label: "PR", position: "top-[18%] left-[8%]", color: "pink" },
  { label: "Social Media", position: "top-[12%] right-[15%]", color: "blue" },
  { label: "KOL Marketing", position: "top-[40%] left-[3%]", color: "green" },
  { label: "Community", position: "bottom-[30%] right-[6%]", color: "purple" },
  { label: "Go-To-Market", position: "bottom-[15%] left-[12%]", color: "orange" },
  { label: "Events", position: "top-[55%] right-[10%]", color: "yellow" },
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
            filter: "brightness(0.25) grayscale(0.3)",
            transform: `translateY(${scrollY * 0.3}px) scale(1.1)`
          }}
        />
        {/* Dark overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,20%,6%,0.7)] via-[hsl(220,20%,6%,0.3)] to-[hsl(220,20%,6%,0.8)]" />
        
        {/* Glowing Data Flow Lines Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Line 1 */}
          <div className="absolute bottom-[35%] left-0 right-0 h-[2px] overflow-hidden">
            <div className="data-flow-line h-full w-full bg-gradient-to-r from-transparent via-[hsl(217,91%,60%,0.8)] to-transparent" 
                 style={{ animationDelay: "0s" }} />
          </div>
          {/* Line 2 */}
          <div className="absolute bottom-[38%] left-0 right-0 h-[1px] overflow-hidden">
            <div className="data-flow-line h-full w-full bg-gradient-to-r from-transparent via-[hsl(190,80%,60%,0.6)] to-transparent"
                 style={{ animationDelay: "1.5s" }} />
          </div>
          {/* Line 3 */}
          <div className="absolute bottom-[32%] left-0 right-0 h-[1px] overflow-hidden">
            <div className="data-flow-line h-full w-full bg-gradient-to-r from-transparent via-[hsl(270,70%,60%,0.5)] to-transparent"
                 style={{ animationDelay: "3s" }} />
          </div>
          {/* Vertical glow particles */}
          <div className="absolute bottom-[30%] left-[20%] w-1 h-20 bg-gradient-to-t from-transparent via-[hsl(217,91%,60%,0.4)] to-transparent animate-pulse" />
          <div className="absolute bottom-[30%] left-[40%] w-1 h-16 bg-gradient-to-t from-transparent via-[hsl(190,80%,60%,0.3)] to-transparent animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-[30%] left-[60%] w-1 h-24 bg-gradient-to-t from-transparent via-[hsl(217,91%,60%,0.5)] to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-[30%] left-[80%] w-1 h-12 bg-gradient-to-t from-transparent via-[hsl(270,70%,60%,0.4)] to-transparent animate-pulse" style={{ animationDelay: "1.5s" }} />
        </div>
        
        {/* Subtle glow effect on bridge */}
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gradient-radial from-[hsl(217,91%,60%,0.1)] via-transparent to-transparent blur-3xl" />
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
            <span className="text-[hsl(var(--dark-fg))]">Your </span>
            <span className="serif-italic text-[hsl(var(--dark-fg))]">Bridge</span>
            <br />
            <span className="text-[hsl(var(--dark-fg))]">to </span>
            <span className="serif-italic text-[hsl(var(--dark-fg))]">Korea</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-[hsl(var(--dark-fg),0.6)] max-w-2xl mx-auto mb-12">
            Since 2023, we've connected <span className="text-[hsl(var(--dark-fg))]">200+</span> global Web3 projects 
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
      <div className="relative z-10 border-t border-[hsl(var(--dark-fg),0.1)] py-8 mt-auto overflow-hidden">
        <div className="flex items-center logo-marquee">
          {[...clientLogos, ...clientLogos].map((client, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center mx-12 min-w-[100px]"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="h-8 w-auto opacity-50 hover:opacity-80 transition-opacity grayscale brightness-200"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown className="w-6 h-6 text-[hsl(var(--dark-fg),0.4)] animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;