import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const clients = [
  { name: "Binance", logo: "https://cryptologos.cc/logos/binance-coin-bnb-logo.svg" },
  { name: "KuCoin", logo: "https://cryptologos.cc/logos/kucoin-token-kcs-logo.svg" },
  { name: "Chainlink", logo: "https://cryptologos.cc/logos/chainlink-link-logo.svg" },
  { name: "Polygon", logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg" },
  { name: "Arbitrum", logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg" },
  { name: "Optimism", logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg" },
  { name: "Avalanche", logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg" },
  { name: "Solana", logo: "https://cryptologos.cc/logos/solana-sol-logo.svg" },
];

const TrustSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-8 border-y border-border/30 bg-background overflow-hidden">
      <div 
        className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Gradient overlays */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="flex whitespace-nowrap">
            <div className="logo-marquee">
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center mx-8 shrink-0"
                >
                  <img 
                    src={client.logo} 
                    alt={client.name}
                    className="h-8 w-auto object-contain opacity-40 hover:opacity-80 transition-opacity brightness-0 invert"
                  />
                </div>
              ))}
            </div>
            <div className="logo-marquee" aria-hidden="true">
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center mx-8 shrink-0"
                >
                  <img 
                    src={client.logo} 
                    alt={client.name}
                    className="h-8 w-auto object-contain opacity-40 hover:opacity-80 transition-opacity brightness-0 invert"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;