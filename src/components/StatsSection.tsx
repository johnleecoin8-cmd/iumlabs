const stats = [
  { value: "200+", label: "Projects Launched" },
  { value: "$500M+", label: "Funds Raised" },
  { value: "50+", label: "Exchange Partners" },
  { value: "5M+", label: "Community Reach" },
];

const partners = [
  "Binance",
  "Upbit",
  "Bithumb",
  "Coinone",
  "CoinMarketCap",
  "CoinGecko",
];

const StatsSection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
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
            <div 
              key={stat.label} 
              className="text-center glass-card p-8 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold mb-3 text-gradient">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Partners */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-10">
            Trusted by leading platforms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {partners.map((partner, index) => (
              <div
                key={partner}
                className="text-2xl font-semibold text-muted-foreground/30 hover:text-muted-foreground/60 hover:text-gradient transition-all duration-300 cursor-pointer"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;