import { ArrowRight, Check, Palette, Users, Megaphone, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import FAQSection from "@/components/FAQSection";
import SpecialOfferForm from "@/components/SpecialOfferForm";
import CalendlyButton from "@/components/CalendlyButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const nftServices = [
  {
    icon: Palette,
    title: "아트 & 컬렉션 전략",
    description: "NFT 아트워크 방향성, 로드맵 설계, 유틸리티 기획",
  },
  {
    icon: Users,
    title: "커뮤니티 빌딩",
    description: "Discord/Twitter 셋업, 화이트리스트 관리, 커뮤니티 이벤트",
  },
  {
    icon: Megaphone,
    title: "인플루언서 마케팅",
    description: "NFT/크립토 KOL 협업, 콜라보레이션, 바이럴 캠페인",
  },
  {
    icon: BarChart3,
    title: "민팅 & 세컨더리",
    description: "민팅 전략, 가격 책정, 세컨더리 마켓 관리",
  },
];

const nftFeatures = [
  "화이트리스트 캠페인 기획 및 운영",
  "Discord 서버 셋업 및 24/7 관리",
  "Twitter Spaces & AMA 세션",
  "크립토 미디어 PR (국내/해외)",
  "NFT 마켓플레이스 리스팅 지원",
  "콜라보레이션 & 파트너십",
  "민팅 웹사이트 제작",
  "세컨더리 마켓 프로모션",
];

const NFTService = () => {
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
              NFT Marketing
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">NFT 마케팅</span> 전문 서비스
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              성공적인 NFT 컬렉션 런칭부터 장기적인 커뮤니티 성장까지,<br />
              NFT 프로젝트를 위한 풀서비스 마케팅 솔루션
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
              {nftServices.map((service, index) => (
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
              NFT 마케팅 <span className="text-gradient">상세 서비스</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {nftFeatures.map((feature, index) => (
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

export default NFTService;
