import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Award, Star, Trophy, Medal } from "lucide-react";

const pressItems = [
  {
    quote: "한국 Web3 마케팅의 새로운 기준을 제시하는 에이전시",
    source: "CoinDesk Korea",
    icon: Award,
  },
  {
    quote: "100개 이상의 글로벌 프로젝트 성공적 런칭",
    source: "BlockMedia",
    icon: Trophy,
  },
  {
    quote: "아시아 시장 진출의 핵심 파트너",
    source: "CoinTelegraph",
    icon: Star,
  },
  {
    quote: "Web3 커뮤니티 빌딩 전문 에이전시",
    source: "Decrypt",
    icon: Medal,
  },
];

const badges = [
  { title: "Top 5", subtitle: "Web3 Marketing Agency", year: "2024" },
  { title: "Top 3", subtitle: "Korea Crypto Agency", year: "2024" },
  { title: "#1", subtitle: "NFT Marketing", year: "2023" },
];

const PressSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Badges */}
        <div className={`flex flex-wrap justify-center gap-8 mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {badges.map((badge, index) => (
            <div 
              key={index}
              className="glass-card border border-primary/30 rounded-2xl p-6 text-center min-w-[160px] hover:border-primary/60 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gradient mb-1">{badge.title}</div>
              <div className="text-sm text-muted-foreground">{badge.subtitle}</div>
              <div className="text-xs text-primary mt-2">{badge.year}</div>
            </div>
          ))}
        </div>

        {/* Press Quotes */}
        <div className={`text-center mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-sm font-medium text-primary mb-4 block tracking-wider uppercase">
            As Featured In
          </span>
          <h2 className="text-2xl md:text-3xl font-bold">
            신뢰받는 <span className="text-gradient">Web3 파트너</span>
          </h2>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {pressItems.map((item, index) => (
            <div 
              key={index}
              className="glass-card border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <item.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">{item.source}</span>
              </div>
              <p className="text-foreground/90 text-sm leading-relaxed italic">
                "{item.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* Partner Logos Placeholder */}
        <div className={`mt-16 flex flex-wrap justify-center items-center gap-8 opacity-50 transition-all duration-700 delay-400 ${isVisible ? 'opacity-50 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {['Binance', 'OKX', 'Bybit', 'Gate.io', 'MEXC', 'Kucoin'].map((name, i) => (
            <div key={i} className="text-lg font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressSection;
