import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const clientLogos = [
  { name: "BNB Chain", url: "https://bnbchain.org", logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg" },
  { name: "Peaq", url: "https://www.peaq.network", logo: "https://assets.coingecko.com/coins/images/29870/large/peaq-logo.png" },
  { name: "Story Protocol", url: "https://www.story.foundation", logo: "https://assets.coingecko.com/coins/images/51999/large/story_protocol.jpg" },
  { name: "zkPass", url: "https://zkpass.org", logo: "https://assets.coingecko.com/coins/images/38263/large/zkpass.png" },
  { name: "Falcon", url: "https://falcon.finance", logo: "https://pbs.twimg.com/profile_images/1907055587992961026/cQLCR2n0_400x400.jpg" },
  { name: "Ondo", url: "https://ondo.finance", logo: "https://cryptologos.cc/logos/ondo-finance-ondo-logo.svg" },
  { name: "MegaETH", url: "https://megaeth.systems", logo: "https://pbs.twimg.com/profile_images/1803473821882028032/x6E8AIAU_400x400.jpg" },
  { name: "Bybit", url: "https://www.bybit.com", logo: "https://cryptologos.cc/logos/bybit-bit-logo.svg" },
  { name: "Abstract", url: "https://abs.xyz", logo: "https://pbs.twimg.com/profile_images/1879227015043588096/ZayrZyEZ_400x400.jpg" },
  { name: "KuCoin", url: "https://www.kucoin.com", logo: "https://cryptologos.cc/logos/kucoin-token-kcs-logo.svg" },
];

const mediaLogos = [
  { name: "Tokenpost", url: "https://www.tokenpost.kr", logo: "https://www.tokenpost.kr/resources/images/logo-share.png" },
  { name: "Coinness", url: "https://coinness.com", logo: "https://coinness.com/static/media/coinness-logo-white.svg" },
  { name: "Blockmedia", url: "https://www.blockmedia.co.kr", logo: "https://www.blockmedia.co.kr/wp-content/uploads/2023/01/blockmedia_logo_white.png" },
  { name: "Bloomingbit", url: "https://bloomingbit.io", logo: "https://bloomingbit.io/logo-white.svg" },
  { name: "Economics", url: "https://www.etoday.co.kr", logo: "https://www.etoday.co.kr/images/logo/logo_etoday.png" },
  { name: "Cointelegraph", url: "https://cointelegraph.com", logo: "https://images.cointelegraph.com/cdn-cgi/image/format=auto,onerror=redirect,quality=90,width=180/https://cointelegraph.com/assets/images/CT_logo_white.svg" },
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
