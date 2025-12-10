import { ArrowRight, Check, Coins, TrendingUp, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import FAQSection from "@/components/FAQSection";
import SpecialOfferForm from "@/components/SpecialOfferForm";
import CalendlyButton from "@/components/CalendlyButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const defiServices = [
  {
    icon: TrendingUp,
    title: "TVL 성장 전략",
    description: "유동성 공급자 유치, TVL 성장 캠페인, 인센티브 프로그램",
  },
  {
    icon: Shield,
    title: "신뢰성 구축",
    description: "감사 보고서 홍보, 보안 커뮤니케이션, 투명성 마케팅",
  },
  {
    icon: Coins,
    title: "토큰 마케팅",
    description: "토큰 세일 마케팅, 거래소 상장 지원, 토크노믹스 홍보",
  },
  {
    icon: Zap,
    title: "프로토콜 인지도",
    description: "기술 콘텐츠 제작, 개발자 커뮤니티, 에코시스템 확장",
  },
];

const defiFeatures = [
  "DeFi 전문 미디어 PR",
  "유동성 마이닝 캠페인",
  "토큰 세일 & IDO/IEO 마케팅",
  "거래소 상장 컨설팅",
  "기술 문서 & 튜토리얼 제작",
  "개발자 커뮤니티 빌딩",
  "파트너십 & 인테그레이션 홍보",
  "프로토콜 업데이트 커뮤니케이션",
];

const DeFiService = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageTransition>
        {/* Hero */}
        <section className="pt-32 pb-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container mx-auto max-w-4xl text-center relative">
            <span className="text-sm font-medium text-primary mb-4 block tracking-wider uppercase">
              DeFi Marketing
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">DeFi 마케팅</span> 전문 서비스
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              TVL 성장부터 거래소 상장까지,<br />
              DeFi 프로토콜의 성장을 위한 전략적 마케팅 파트너
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CalendlyButton size="lg" />
              <Link to="/contact">
                <button className="px-8 py-3 border border-primary/50 rounded-lg text-primary hover:bg-primary/10 transition-colors">
                  문의하기
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section ref={ref} className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {defiServices.map((service, index) => (
                <div 
                  key={index}
                  className="glass-card border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              DeFi 마케팅 <span className="text-gradient">상세 서비스</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {defiFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 glass-card rounded-xl"
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQSection />
        <SpecialOfferForm />
        <Footer />
      </PageTransition>
    </div>
  );
};

export default DeFiService;
