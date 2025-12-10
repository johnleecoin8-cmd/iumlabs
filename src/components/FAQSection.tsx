import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    question: "Web3 마케팅이란 무엇인가요?",
    answer: "Web3 마케팅은 블록체인, 암호화폐, NFT, DeFi 프로젝트를 위한 전문 마케팅입니다. 커뮤니티 빌딩, 인플루언서 마케팅, PR, 소셜 미디어 관리 등 Web3 생태계에 특화된 전략을 활용합니다."
  },
  {
    question: "마케팅 캠페인은 얼마나 걸리나요?",
    answer: "프로젝트 규모와 목표에 따라 다르지만, 일반적으로 초기 셋업에 1-2주, 본격적인 캠페인 진행에 1-3개월이 소요됩니다. 장기적인 커뮤니티 성장을 위해 6개월 이상의 파트너십을 권장합니다."
  },
  {
    question: "어떤 프로젝트와 작업하시나요?",
    answer: "NFT 컬렉션, DeFi 프로토콜, GameFi/P2E 게임, 레이어1/레이어2 블록체인, 암호화폐 거래소, DAO 등 모든 Web3 프로젝트와 협업합니다. 한국 시장 진출을 원하는 글로벌 프로젝트도 환영합니다."
  },
  {
    question: "마케팅 비용은 어떻게 되나요?",
    answer: "프로젝트 규모, 목표, 필요한 서비스에 따라 맞춤 견적을 제공합니다. 무료 상담을 통해 프로젝트를 분석한 후 최적의 패키지를 제안해 드립니다."
  },
  {
    question: "성과 측정은 어떻게 하나요?",
    answer: "커뮤니티 성장률, 소셜 미디어 참여도, 웹사이트 트래픽, 전환율, PR 노출도 등 정량적 지표를 통해 성과를 측정합니다. 주간/월간 리포트를 통해 투명하게 결과를 공유합니다."
  },
  {
    question: "한국 시장에 특화된 서비스가 있나요?",
    answer: "네, 한국 최대 커뮤니티 플랫폼인 카카오톡, 네이버 블로그, 한국 크립토 미디어, 국내 KOL 네트워크를 활용한 현지화 마케팅을 제공합니다. 한국어 커뮤니티 관리도 지원합니다."
  }
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-sm font-medium text-primary mb-4 block tracking-wider uppercase">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">자주 묻는 질문</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Web3 마케팅에 대해 궁금한 점을 확인하세요
          </p>
        </div>

        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass-card border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
