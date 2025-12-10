import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const clientLogos = [
  "SOLANA", "POLKADOT", "COSMOS", "NEAR", "AVALANCHE", 
  "ARBITRUM", "OPTIMISM", "POLYGON", "BNB CHAIN", "BASE"
];

const mediaLogos = [
  "CoinDesk", "Cointelegraph", "The Block", "Decrypt", "Forbes"
];

const TrustSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-16 border-y border-border/30 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Client Logos - Marquee */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-xs text-muted-foreground text-center mb-6 uppercase tracking-[0.2em] font-medium">
            Trusted by Leading Web3 Projects
          </p>
          <div className="marquee">
            <div className="marquee-content">
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <span 
                  key={index} 
                  className="text-lg md:text-xl font-bold tracking-wider text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors whitespace-nowrap"
                >
                  {logo}
                </span>
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <span 
                  key={index} 
                  className="text-lg md:text-xl font-bold tracking-wider text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors whitespace-nowrap"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Media/Featured By Section */}
        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-xs text-muted-foreground text-center mb-6 uppercase tracking-[0.2em] font-medium">
            As Featured In
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            {mediaLogos.map((logo) => (
              <span 
                key={logo} 
                className="text-sm md:text-base font-medium tracking-wider text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
