import { Check, Zap, Rocket, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import CalendlyButton from "./CalendlyButton";

const pricingPlans = [
  {
    name: "Starter",
    description: "신규 프로젝트를 위한 기본 패키지",
    price: "문의",
    icon: Zap,
    features: [
      "소셜 미디어 셋업 (Twitter, Discord, Telegram)",
      "기본 커뮤니티 관리 (주 5일)",
      "월간 콘텐츠 10개",
      "기본 PR (2개 미디어)",
      "주간 리포트",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    description: "성장 단계 프로젝트를 위한 추천 패키지",
    price: "문의",
    icon: Rocket,
    features: [
      "Starter 패키지 모든 기능",
      "24/7 커뮤니티 관리",
      "월간 콘텐츠 30개",
      "인플루언서 마케팅 (5명)",
      "PR (10개 미디어)",
      "AMA 세션 2회",
      "한국 시장 현지화",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "대형 프로젝트를 위한 풀서비스",
    price: "문의",
    icon: Crown,
    features: [
      "Growth 패키지 모든 기능",
      "전담 어카운트 매니저",
      "맞춤형 마케팅 전략 수립",
      "대형 인플루언서 캠페인",
      "Tier 1 미디어 PR",
      "거래소 상장 지원",
      "이벤트 기획 및 운영",
      "무제한 수정",
    ],
    highlighted: false,
  },
];

const PricingSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-sm font-medium text-primary mb-4 block tracking-wider uppercase">
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">맞춤형 패키지</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            프로젝트 규모와 목표에 맞는 최적의 솔루션을 제안합니다
          </p>
        </div>

        <div className={`grid md:grid-cols-3 gap-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.highlighted 
                  ? 'glass-card border-2 border-primary shadow-lg shadow-primary/20' 
                  : 'glass-card border border-border/50 hover:border-primary/30'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                    추천
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  plan.highlighted ? 'bg-primary/20' : 'bg-muted'
                }`}>
                  <plan.icon className={`w-6 h-6 ${plan.highlighted ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold">{plan.price}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      plan.highlighted ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <CalendlyButton 
                variant={plan.highlighted ? "default" : "outline"}
                className="w-full"
              />
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-12">
          * 모든 패키지는 프로젝트 특성에 맞게 커스터마이징 가능합니다. 상담을 통해 최적의 솔루션을 제안해 드립니다.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
