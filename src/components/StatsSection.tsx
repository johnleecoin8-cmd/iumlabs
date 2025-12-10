import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 200, label: "Projects Launched", suffix: "+" },
  { value: 500, label: "Funds Raised", prefix: "$", suffix: "M+" },
  { value: 50, label: "Exchange Partners", suffix: "+" },
  { value: 5, label: "Community Reach", suffix: "M+" },
];

const partners = [
  "Binance",
  "Upbit",
  "Bithumb",
  "Coinone",
  "CoinMarketCap",
  "CoinGecko",
];

const StatCard = ({ stat, index, isVisible }: { stat: typeof stats[0]; index: number; isVisible: boolean }) => {
  const displayValue = useCountUp({
    end: stat.value,
    duration: 2000,
    delay: index * 150,
    prefix: stat.prefix || '',
    suffix: stat.suffix || '',
    isVisible,
  });

  return (
    <div 
      className={`text-center glass-card p-8 hover:border-primary/30 transition-all duration-500 scroll-animate ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-4xl md:text-5xl font-bold mb-3 text-gradient">
        {displayValue}
      </div>
      <div className="text-sm text-muted-foreground">
        {stat.label}
      </div>
    </div>
  );
};

const StatsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        <div className="gradient-blob gradient-blob-purple w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
      </div>

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      {/* Bottom border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <StatCard 
              key={stat.label} 
              stat={stat} 
              index={index} 
              isVisible={isVisible} 
            />
          ))}
        </div>

        {/* Partners - Marquee */}
        <div className="text-center">
          <p className={`text-muted-foreground text-sm mb-10 scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '400ms' }}>
            Trusted by leading platforms
          </p>
          
          {/* Marquee Container */}
          <div className="marquee">
            <div className="marquee-content">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner}-${index}`}
                  className="text-2xl font-semibold text-muted-foreground/30 hover:text-gradient transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  {partner}
                </div>
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner}-dup-${index}`}
                  className="text-2xl font-semibold text-muted-foreground/30 hover:text-gradient transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
