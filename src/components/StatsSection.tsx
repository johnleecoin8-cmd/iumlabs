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
    <section className="py-32 section-dark">
      <div className="container mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">
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
          <p className="text-muted-foreground text-sm mb-8">
            Trusted by leading platforms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {partners.map((partner) => (
              <div
                key={partner}
                className="text-2xl font-semibold text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors"
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
