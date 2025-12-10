const stats = [
  { value: "#1", label: "Web3 Agency in Korea" },
  { value: "200+", label: "Successful Projects" },
  { value: "$500M+", label: "Total Funds Raised" },
  { value: "5M+", label: "Community Members" },
];

const partners = [
  "CoinMarketCap",
  "CoinGecko",
  "Binance",
  "Upbit",
  "Bithumb",
  "Coinone",
];

const StatsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-gradient mb-3">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Partners Marquee */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-8">
            Trusted by leading platforms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partners.map((partner) => (
              <div
                key={partner}
                className="text-2xl md:text-3xl font-display font-bold text-muted-foreground/40 hover:text-primary/60 transition-colors cursor-default"
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
