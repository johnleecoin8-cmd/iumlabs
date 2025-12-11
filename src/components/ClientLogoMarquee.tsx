import { useRef, useEffect } from "react";

// Import logos
import bnbLogo from "@/assets/logos/bnb.svg";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import peaqLogo from "@/assets/logos/peaq.png";
import storyLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria.png";
import bybitLogo from "@/assets/logos/bybit.png";

const clients = [
  { name: "BNB Chain", logo: bnbLogo, url: "https://www.bnbchain.org" },
  { name: "KuCoin", logo: kucoinLogo, url: "https://www.kucoin.com" },
  { name: "Polygon", logo: polygonLogo, url: "https://polygon.technology" },
  { name: "Ondo Finance", logo: ondoLogo, url: "https://ondo.finance" },
  { name: "Peaq", logo: peaqLogo, url: "https://www.peaq.network" },
  { name: "Story Protocol", logo: storyLogo, url: "https://www.story.foundation" },
  { name: "MegaETH", logo: megaethLogo, url: "https://megaeth.systems" },
  { name: "Tria", logo: triaLogo, url: "https://tria.so" },
  { name: "Bybit", logo: bybitLogo, url: "https://www.bybit.com" },
];

interface ClientLogoMarqueeProps {
  variant?: "dark" | "light";
  speed?: "slow" | "normal" | "fast";
  showLabel?: boolean;
}

const ClientLogoMarquee = ({ 
  variant = "dark", 
  speed = "normal",
  showLabel = true 
}: ClientLogoMarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const speedClasses = {
    slow: "logo-marquee-slow",
    normal: "logo-marquee",
    fast: "logo-marquee-fast",
  };

  const logoFilter = variant === "dark" 
    ? "brightness-0 invert opacity-60 hover:opacity-100" 
    : "brightness-0 opacity-50 hover:opacity-80";

  return (
    <div className="w-full overflow-hidden">
      {showLabel && (
        <p className={`text-center text-sm mb-6 ${variant === "dark" ? "text-white/40" : "text-black/40"}`}>
          Trusted by Leading Web3 Projects
        </p>
      )}
      
      <div 
        ref={containerRef}
        className="marquee-container relative"
        role="region"
        aria-label="Client logos"
      >
        {/* Gradient Masks */}
        <div className={`absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none ${
          variant === "dark" 
            ? "bg-gradient-to-r from-background to-transparent" 
            : "bg-gradient-to-r from-[hsl(var(--light-bg))] to-transparent"
        }`} />
        <div className={`absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none ${
          variant === "dark" 
            ? "bg-gradient-to-l from-background to-transparent" 
            : "bg-gradient-to-l from-[hsl(var(--light-bg))] to-transparent"
        }`} />
        
        {/* Scrolling Logos */}
        <div className={`flex items-center gap-12 ${speedClasses[speed]}`}>
          {[...clients, ...clients].map((client, index) => (
            <a
              key={`${client.name}-${index}`}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 transition-all duration-300 hover:scale-110"
              aria-label={`Visit ${client.name}`}
            >
              <img
                src={client.logo}
                alt={client.name}
                className={`h-8 md:h-10 w-auto object-contain transition-all duration-300 ${logoFilter}`}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientLogoMarquee;
