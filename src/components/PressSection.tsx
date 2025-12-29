import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ExternalLink } from "lucide-react";

// Real media outlet style badges
const mediaFeatures = [
  {
    name: "Forbes",
    title: "Best Growth Agency",
    logo: "Forbes",
    link: "#",
  },
  {
    name: "CoinDesk",
    title: "Top Crypto Marketing",
    logo: "CoinDesk",
    link: "#",
  },
  {
    name: "CoinTelegraph",
    title: "Leading Web3 Marketing Partner",
    logo: "Cointelegraph",
    link: "#",
  },
  {
    name: "Decrypt",
    title: "Best NFT Marketing",
    logo: "Decrypt",
    link: "#",
  },
];

// Client logos - text-based for now (replace with actual logos)
const clientLogos = [
  "Binance", "OKX", "Bybit", "Gate.io", "MEXC", "Kucoin", 
  "Upbit", "Bithumb", "Coinone", "Korbit"
];

const PressSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-16 bg-card/50 border-y border-border/30">
      <div className="container mx-auto px-4">
        {/* Media Features */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mediaFeatures.map((feature, index) => (
              <a
                key={index}
                href={feature.link}
                className="group flex flex-col items-center p-6 border border-border/30 rounded-xl bg-background/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight group-hover:text-gradient transition-all">
                  {feature.logo}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider text-center">
                  {feature.title}
                </div>
                <ExternalLink className="w-3 h-3 text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>

        {/* Client Logo Marquee */}
        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-6">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              Trusted by Leading Exchanges & Projects
            </span>
          </div>
          
          <div className="marquee">
            <div className="marquee-content">
              {clientLogos.map((logo, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-center min-w-[120px] px-6 py-3 border border-border/20 rounded-lg bg-card/30 hover:border-primary/30 transition-colors"
                >
                  <span className="text-lg font-semibold text-muted-foreground/70 hover:text-foreground transition-colors">
                    {logo}
                  </span>
                </div>
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {clientLogos.map((logo, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-center min-w-[120px] px-6 py-3 border border-border/20 rounded-lg bg-card/30"
                >
                  <span className="text-lg font-semibold text-muted-foreground/70">
                    {logo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressSection;
