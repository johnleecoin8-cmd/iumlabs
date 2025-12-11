import { Calendar, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import CalendlyButton from "./CalendlyButton";
import seoulBridgeNight from "@/assets/seoul-bridge-night.jpg";

const serviceTags = [
  { label: "PR", position: "top-[18%] left-[8%]" },
  { label: "Social Media", position: "top-[12%] right-[15%]" },
  { label: "KOL Marketing", position: "top-[40%] left-[3%]" },
  { label: "Community", position: "bottom-[30%] right-[6%]" },
  { label: "Go-To-Market", position: "bottom-[15%] left-[12%]" },
  { label: "Events", position: "top-[55%] right-[10%]" },
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
      {/* Background - Seoul Bridge Night Image - Grayscale & Dark */}
      <div className="absolute inset-0">
        {/* Bridge background image with parallax - Clean grayscale */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ 
            backgroundImage: `url(${seoulBridgeNight})`,
            filter: "brightness(0.12) grayscale(1)",
            transform: `translateY(${scrollY * 0.3}px) scale(1.1)`
          }}
        />
        
        {/* Dark overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.6)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
      </div>

      {/* Floating Service Tags - Clean white outline */}
      {serviceTags.map((tag, index) => (
        <div
          key={index}
          className={`absolute ${tag.position} hidden lg:block animate-float z-10`}
          style={{ 
            animationDelay: `${index * 0.5}s`,
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        >
          <span className="lunar-tag-dark">
            {tag.label}
          </span>
        </div>
      ))}

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-32 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Headline - Clean, Large Typography */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-light leading-[0.9] tracking-tight mb-8">
            <span className="text-white">Your </span>
            <span className="serif-italic text-white">Bridge</span>
            <br />
            <span className="text-white">to </span>
            <span className="serif-italic text-white">Korea</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12">
            Since 2023, we've connected <span className="text-primary font-medium">200+</span> global Web3 projects 
            with the Korean crypto market through strategic marketing and community building.
          </p>

          {/* CTA Button - Clean Blue */}
          <CalendlyButton className="lunar-btn text-lg px-8 py-4">
            <Calendar className="w-5 h-5" />
            <span>Book a Free Consultation</span>
          </CalendlyButton>
        </div>
      </div>

      {/* Client Logo Marquee - Clean style */}
      <div className="relative z-10 border-t border-white/10 py-8 mt-auto overflow-hidden">
        <div className="flex items-center logo-marquee">
          {[...clientLogos, ...clientLogos].map((client, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center mx-12 min-w-[100px]"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="h-10 w-auto opacity-40 hover:opacity-70 transition-opacity grayscale brightness-200"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown className="w-6 h-6 text-white/40 animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
