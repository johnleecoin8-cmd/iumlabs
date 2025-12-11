import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const clientLogos = [
  { name: "Solana", url: "https://solana.com", logo: "https://cryptologos.cc/logos/solana-sol-logo.svg" },
  { name: "Polkadot", url: "https://polkadot.network", logo: "https://cryptologos.cc/logos/polkadot-new-dot-logo.svg" },
  { name: "Cosmos", url: "https://cosmos.network", logo: "https://cryptologos.cc/logos/cosmos-atom-logo.svg" },
  { name: "Near", url: "https://near.org", logo: "https://cryptologos.cc/logos/near-protocol-near-logo.svg" },
  { name: "Avalanche", url: "https://avax.network", logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg" },
  { name: "Arbitrum", url: "https://arbitrum.io", logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg" },
  { name: "Optimism", url: "https://optimism.io", logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg" },
  { name: "Polygon", url: "https://polygon.technology", logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg" },
  { name: "BNB Chain", url: "https://bnbchain.org", logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg" },
  { name: "Base", url: "https://base.org", logo: "https://avatars.githubusercontent.com/u/108554348?s=200&v=4" },
];

const mediaLogos = [
  { name: "CoinDesk", url: "https://coindesk.com", logo: "https://www.coindesk.com/resizer/fJ-PnHZDQBhShtBQNaZI-ut_xCo=/144x32/downloads.coindesk.com/arc/failsafe/feeds/coindesk-logo.png" },
  { name: "Cointelegraph", url: "https://cointelegraph.com", logo: "https://images.cointelegraph.com/cdn-cgi/image/format=auto,onerror=redirect,quality=90,width=180/https://cointelegraph.com/assets/images/CT_logo_white.svg" },
  { name: "The Block", url: "https://theblock.co", logo: "https://www.theblock.co/static/img/logo-white.svg" },
  { name: "Decrypt", url: "https://decrypt.co", logo: "https://decrypt.co/wp-content/themes/flavor/flavor/images/og-img/decrypt-logo-white.svg" },
  { name: "Forbes", url: "https://forbes.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Forbes_logo.svg/200px-Forbes_logo.svg.png" },
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
              {[...clientLogos, ...clientLogos].map((client, index) => (
                <a 
                  key={index}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-8 w-24 md:w-32 opacity-40 hover:opacity-80 transition-opacity grayscale hover:grayscale-0"
                  title={client.name}
                >
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="h-6 md:h-8 w-auto object-contain invert"
                  />
                </a>
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {[...clientLogos, ...clientLogos].map((client, index) => (
                <a 
                  key={index}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-8 w-24 md:w-32 opacity-40 hover:opacity-80 transition-opacity grayscale hover:grayscale-0"
                  title={client.name}
                >
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="h-6 md:h-8 w-auto object-contain invert"
                  />
                </a>
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
            {mediaLogos.map((media) => (
              <a 
                key={media.name}
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-6 md:h-8 opacity-50 hover:opacity-100 transition-opacity"
                title={media.name}
              >
                <img 
                  src={media.logo} 
                  alt={media.name} 
                  className="h-5 md:h-6 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
