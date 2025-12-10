import { TrendingUp, Users, Globe } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import CaseStudyCard, { CaseStudy } from "./CaseStudyCard";
import portfolioDao from "@/assets/portfolio-dao.png";
import portfolioDefi from "@/assets/portfolio-defi.png";
import portfolioGamefi from "@/assets/portfolio-gamefi.png";
import portfolioMetaverse from "@/assets/portfolio-metaverse.png";

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "DeFi Protocol Launch",
    category: "DeFi",
    image: portfolioDefi,
    description: "글로벌 DeFi 프로토콜의 한국 시장 진출을 위한 풀서비스 마케팅 캠페인",
    stats: [
      { label: "TVL 증가", value: "+340%", icon: TrendingUp },
      { label: "커뮤니티", value: "50K+", icon: Users },
      { label: "국가", value: "15+", icon: Globe },
    ],
    tags: ["커뮤니티 빌딩", "PR", "인플루언서"],
  },
  {
    id: "2",
    title: "NFT Collection Drop",
    category: "NFT",
    image: portfolioDao,
    description: "10,000개 NFT 컬렉션의 성공적인 민팅을 위한 종합 마케팅 전략",
    stats: [
      { label: "민팅 완판", value: "100%", icon: TrendingUp },
      { label: "홀더 수", value: "8.5K", icon: Users },
      { label: "바닥가", value: "2.5x", icon: Globe },
    ],
    tags: ["화이트리스트", "디스코드", "트위터"],
  },
  {
    id: "3",
    title: "GameFi Global Launch",
    category: "GameFi",
    image: portfolioGamefi,
    description: "P2E 게임의 글로벌 런칭 및 아시아 시장 확장 캠페인",
    stats: [
      { label: "DAU", value: "120K", icon: TrendingUp },
      { label: "다운로드", value: "1M+", icon: Users },
      { label: "파트너십", value: "20+", icon: Globe },
    ],
    tags: ["게임 길드", "스트리머", "이벤트"],
  },
  {
    id: "4",
    title: "Metaverse Platform",
    category: "Metaverse",
    image: portfolioMetaverse,
    description: "메타버스 플랫폼의 브랜드 인지도 및 사용자 확보 캠페인",
    stats: [
      { label: "사용자", value: "500K", icon: TrendingUp },
      { label: "랜드세일", value: "95%", icon: Users },
      { label: "브랜드", value: "30+", icon: Globe },
    ],
    tags: ["브랜드 협업", "VR 이벤트", "PR"],
  },
];

const CaseStudiesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-sm font-medium text-primary mb-4 block tracking-wider uppercase">
            Case Studies
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">성공 사례</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            다양한 Web3 프로젝트와 함께 달성한 실제 성과를 확인하세요
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
