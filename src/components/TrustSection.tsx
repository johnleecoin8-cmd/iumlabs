import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const clientLogos = [
  { name: "BNB Chain", url: "https://bnbchain.org", logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg" },
  { name: "Peaq", url: "https://www.peaq.network" },
  { name: "Story Protocol", url: "https://www.story.foundation", logo: "https://cdn.sp-assets.net/images/brandkit/symbol.svg" },
  { name: "zkPass", url: "https://zkpass.org" },
  { name: "Falcon Finance", url: "https://falcon.finance" },
  { name: "Ondo Finance", url: "https://ondo.finance", logo: "https://cryptologos.cc/logos/ondo-finance-ondo-logo.svg" },
  { name: "MegaETH", url: "https://megaeth.systems" },
  { name: "Bybit", url: "https://www.bybit.com" },
  { name: "Abstract", url: "https://abs.xyz" },
  { name: "KuCoin", url: "https://www.kucoin.com", logo: "https://cryptologos.cc/logos/kucoin-token-kcs-logo.svg" },
];

// Media outlets
const mediaLogos = [
  { name: "Tokenpost", url: "https://www.tokenpost.kr" },
  { name: "Coinness", url: "https://coinness.com" },
  { name: "Blockmedia", url: "https://www.blockmedia.co.kr" },
  { name: "Bloomingbit", url: "https://bloomingbit.io" },
  { name: "이코노미스트", url: "https://economist.co.kr" },
  { name: "Cointelegraph", url: "https://cointelegraph.com" },
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
                  className="flex items-center justify-center h-10 w-28 md:w-36 opacity-50 hover:opacity-100 transition-opacity"
                  title={client.name}
                >
                  {client.logo ? (
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="h-8 md:h-10 w-auto object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <span className={`text-sm md:text-base font-bold text-foreground/80 tracking-wide ${client.logo ? 'hidden' : ''}`}>
                    {client.name}
                  </span>
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
                  className="flex items-center justify-center h-10 w-28 md:w-36 opacity-50 hover:opacity-100 transition-opacity"
                  title={client.name}
                >
                  {client.logo ? (
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="h-8 md:h-10 w-auto object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <span className={`text-sm md:text-base font-bold text-foreground/80 tracking-wide ${client.logo ? 'hidden' : ''}`}>
                    {client.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Media/Featured By Section - Text based for reliability */}
        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-xs text-muted-foreground text-center mb-6 uppercase tracking-[0.2em] font-medium">
            As Featured In
          </p>
          <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
            {mediaLogos.map((media) => (
              <a 
                key={media.name}
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base font-semibold text-muted-foreground/60 hover:text-foreground transition-colors tracking-wide"
                title={media.name}
              >
                {media.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
