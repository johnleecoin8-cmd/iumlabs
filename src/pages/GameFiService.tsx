import { ArrowRight, Check, Gamepad2, Users, Trophy, Video } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import FAQSection from "@/components/FAQSection";
import SpecialOfferForm from "@/components/SpecialOfferForm";
import CalendlyButton from "@/components/CalendlyButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const gamefiServices = [
  {
    icon: Gamepad2,
    title: "게임 길드 파트너십",
    description: "YGG, Merit Circle 등 주요 길드와의 협업 및 스칼라십 프로그램",
  },
  {
    icon: Video,
    title: "스트리머 마케팅",
    description: "게임 스트리머, 유튜버 협업, 라이브 스트리밍 이벤트",
  },
  {
    icon: Trophy,
    title: "e스포츠 & 대회",
    description: "게임 토너먼트 기획, e스포츠 팀 스폰서십, 대회 운영",
  },
  {
    icon: Users,
    title: "플레이어 커뮤니티",
    description: "게이머 커뮤니티 빌딩, 피드백 관리, 업데이트 커뮤니케이션",
  },
];

const gamefiFeatures = [
  "게임 길드 파트너십 & 스칼라십",
  "트위치/유튜브 스트리머 협업",
  "게임 토너먼트 기획 및 운영",
  "게임 미디어 PR",
  "앱스토어 최적화 (ASO)",
  "사전등록 캠페인",
  "인게임 이벤트 기획",
  "플레이어 리텐션 전략",
];

const GameFiService = () => {
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
              GameFi Marketing
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">GameFi 마케팅</span> 전문 서비스
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              P2E 게임의 글로벌 런칭부터 지속적인 플레이어 확보까지,<br />
              GameFi 프로젝트를 위한 종합 마케팅 솔루션
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
              {gamefiServices.map((service, index) => (
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
              GameFi 마케팅 <span className="text-gradient">상세 서비스</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {gamefiFeatures.map((feature, index) => (
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

export default GameFiService;
