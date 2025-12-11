import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const clientLogos = [
  { name: "BNB Chain", url: "https://bnbchain.org", logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg" },
  { name: "Peaq", url: "https://www.peaq.network", logo: "https://cdn.prod.website-files.com/66475ee97bcbe587a63b28c9/668f98a27bf3cb87584a950f_media-kit-logo.avif" },
  { name: "Story Protocol", url: "https://www.story.foundation", logo: "https://cdn.sp-assets.net/images/brandkit/symbol.svg" },
  { name: "zkPass", url: "https://zkpass.org", logo: "https://s2.coinmarketcap.com/static/img/coins/200x200/28883.png" },
  { name: "Falcon Finance", url: "https://falcon.finance", logo: "https://s2.coinmarketcap.com/static/img/coins/200x200/35533.png" },
  { name: "Ondo Finance", url: "https://ondo.finance", logo: "https://s2.coinmarketcap.com/static/img/coins/200x200/21159.png" },
  { name: "MegaETH", url: "https://megaeth.systems", logo: "https://www.megaeth.com/assets/img/brand-kit/logo-1.svg" },
  { name: "Bybit", url: "https://www.bybit.com", logo: "https://s2.coinmarketcap.com/static/img/exchanges/200x200/521.png" },
  { name: "Abstract", url: "https://abs.xyz", logo: "https://seeklogo.com/images/A/abstract-chain-logo-0B4FB9FEB4-seeklogo.com.png" },
  { name: "KuCoin", url: "https://www.kucoin.com", logo: "https://s2.coinmarketcap.com/static/img/exchanges/200x200/311.png" },
];

// Media outlets - using text-based approach for reliable display
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
                  className="flex items-center justify-center h-10 w-28 md:w-36 opacity-60 hover:opacity-100 transition-opacity"
                  title={client.name}
                >
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="h-8 md:h-10 w-auto object-contain"
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
                  className="flex items-center justify-center h-10 w-28 md:w-36 opacity-60 hover:opacity-100 transition-opacity"
                  title={client.name}
                >
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="h-8 md:h-10 w-auto object-contain"
                  />
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
