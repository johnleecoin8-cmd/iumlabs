import { Rocket, Target, Compass, TrendingUp, CheckCircle, Lightbulb, FileSearch, PresentationIcon, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ServicePageLayout, { ServiceStat, ServiceTag, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageMeta } from "@/hooks/usePageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";

const ACCENT_COLOR = "#10B981";

const breadcrumbItems = [
  { name: "Home", url: "https://iumlabs.io" },
  { name: "Services", url: "https://iumlabs.io/services" },
  { name: "GTM Strategy", url: "https://iumlabs.io/services/gtm" }
];

// Consulting Approach Steps
const approachSteps = [
  {
    step: "Step 1",
    title: "Discovery",
    icon: FileSearch,
    activities: [
      "프로젝트 비전과 목표 파악",
      "현재 마케팅 현황 분석",
      "타겟 오디언스 정의",
      "한국 시장 진입 타당성 검토"
    ],
    outcome: "프로젝트 현황 분석 리포트"
  },
  {
    step: "Step 2",
    title: "Analysis",
    icon: Compass,
    activities: [
      "한국 시장 적합성 평가",
      "경쟁 환경 및 포지셔닝 분석",
      "기회 영역 및 리스크 도출",
      "규제 환경 검토"
    ],
    outcome: "시장 분석 및 기회 리포트"
  },
  {
    step: "Step 3",
    title: "Strategy",
    icon: Target,
    activities: [
      "맞춤형 서비스 조합 설계",
      "채널 및 캠페인 우선순위 제안",
      "단계별 실행 로드맵 수립",
      "예상 성과 지표 설정"
    ],
    outcome: "맞춤형 전략 프레임워크"
  },
  {
    step: "Step 4",
    title: "Proposal",
    icon: PresentationIcon,
    activities: [
      "상세 제안서 작성",
      "예상 타임라인 제시",
      "투자 비용 및 ROI 분석",
      "실행 파트너십 논의"
    ],
    outcome: "맞춤형 GTM 제안서"
  }
];

// Available Services for linking
const availableServices = [
  { name: "Community Management", slug: "community", description: "카카오톡/텔레그램 커뮤니티 운영" },
  { name: "PR & Media", slug: "pr", description: "한국 미디어 노출 및 보도자료" },
  { name: "Influencer/KOL", slug: "influencer", description: "한국 KOL 네트워크 활용" },
  { name: "Offline Events", slug: "offline-event", description: "밋업, 컨퍼런스, 파티 기획" },
  { name: "SEO & Ads", slug: "seo-ads", description: "네이버/구글 최적화 및 광고" },
  { name: "Branding", slug: "branding", description: "한국화 브랜딩 및 웹사이트" },
  { name: "Deep Research", slug: "deep-research", description: "심층 시장 분석 리포트" },
  { name: "Yap Strategy", slug: "yap", description: "Yapper 네트워크 마케팅" },
];

const serviceTags: ServiceTag[] = [
  { label: "Market Analysis" },
  { label: "Custom Strategy" },
  { label: "Tailored Solutions" },
  { label: "Full-Service Package" },
];

const stats: ServiceStat[] = [
  { value: 30, label: "Projects Consulted", suffix: "+" },
  { value: 95, label: "Client Satisfaction", suffix: "%" },
  { value: 2, label: "Avg Strategy Delivery", suffix: " weeks" },
  { value: 100, label: "Custom Solutions", suffix: "%" },
];

const deliverables: Deliverable[] = [
  {
    title: "Discovery Report",
    items: [
      "프로젝트 현황 분석",
      "한국 시장 진입 가능성 평가",
      "초기 기회 및 리스크 요약",
      "권장 접근 방식 제안",
    ],
  },
  {
    title: "Custom Strategy Deck",
    items: [
      "맞춤형 서비스 조합 제안",
      "채널별 실행 전략",
      "예상 성과 지표 (KPIs)",
      "경쟁 포지셔닝 전략",
    ],
  },
  {
    title: "Execution Roadmap",
    items: [
      "단계별 실행 계획",
      "예상 타임라인",
      "마일스톤 및 체크포인트",
      "투자 비용 및 ROI 분석",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "GTM 서비스는 어떤 방식으로 진행되나요?",
    answer: "Discovery(발견) → Analysis(분석) → Strategy(전략) → Proposal(제안)의 4단계 컨설팅 프로세스로 진행됩니다. 약 2주 내에 프로젝트에 최적화된 맞춤형 제안서를 받아보실 수 있습니다.",
  },
  {
    question: "어떤 서비스들을 조합할 수 있나요?",
    answer: "커뮤니티 관리, PR/미디어, 인플루언서/KOL, 오프라인 이벤트, SEO & 광고, 브랜딩, 딥 리서치, Yap 전략 등 다양한 서비스를 프로젝트 특성에 맞게 조합합니다. 각 서비스 페이지에서 상세 내용을 확인하실 수 있습니다.",
  },
  {
    question: "프로젝트 규모에 따라 다른 접근이 가능한가요?",
    answer: "네, 스타트업부터 대형 프로젝트까지 규모와 예산에 맞는 맞춤형 솔루션을 제안합니다. 최소 필수 서비스부터 풀 패키지까지 유연하게 구성 가능합니다.",
  },
  {
    question: "기존에 마케팅을 진행 중인 프로젝트도 가능한가요?",
    answer: "물론입니다. 현재 마케팅 현황을 분석하여 개선점을 도출하고, 추가로 필요한 서비스나 전략 조정을 제안합니다. 기존 활동과의 시너지를 극대화하는 방향으로 설계합니다.",
  },
  {
    question: "제안서를 받은 후 진행 여부는 어떻게 되나요?",
    answer: "제안서 검토 후 원하시는 서비스와 범위를 선택하시면 됩니다. 부분 진행도 가능하며, 단계별로 확장해 나가는 것도 좋은 방법입니다.",
  },
];

const GTMService = () => {
  usePageMeta(
    "Korean Web3 GTM Strategy",
    "한국 Web3 시장 진출을 위한 맞춤형 GTM 전략 컨설팅. 프로젝트 분석부터 맞춤형 서비스 제안까지.",
    "/services/gtm"
  );
  const [activeStep, setActiveStep] = useState(0);

  return (
    <ServicePageLayout
      serviceName="GTM Strategy"
      serviceTitle="Go-To-Market"
      serviceSubtitle="Strategy"
      serviceDescription="한국 Web3 시장 진출을 위한 맞춤형 전략 수립. 프로젝트의 특성과 목표를 분석하여 최적의 서비스 조합과 실행 로드맵을 제안합니다."
      serviceIcon={Rocket}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      videoSrc="/videos/gtm-hero.mp4"
      posterSrc="/images/posters/gtm-hero.jpg"
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="gtm"
    >
      {/* Our Approach Section */}
      <section className="scroll-reveal">
        <div className="border-t border-white/10">
          <SectionHeader title="Our Approach" badge="Consulting Process" />
          
          <div className="py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-3 sm:px-6 lg:px-16">
              {/* Intro Text */}
              <div className="mb-6 sm:mb-10 max-w-2xl">
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  고객의 니즈를 파악하고 최적의 솔루션을 제안하는 4단계 컨설팅 프로세스입니다. 
                  약 2주 내에 프로젝트에 맞춤화된 GTM 제안서를 받아보실 수 있습니다.
                </p>
              </div>
              
              {/* Approach Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 items-start">
                {/* Left - Step Navigation */}
                <div>
                  <div className="space-y-1.5 sm:space-y-2">
                    {approachSteps.map((phase, index) => {
                      const Icon = phase.icon;
                      const isActive = activeStep === index;
                      
                      return (
                        <button
                          key={phase.step}
                          onClick={() => setActiveStep(index)}
                          className={`w-full text-left p-2.5 sm:p-4 rounded-lg sm:rounded-xl border transition-all duration-300 hover:translate-x-1 active:scale-[0.98] ${
                            isActive 
                              ? 'bg-emerald-500/10 border-emerald-500/30' 
                              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center ${
                              isActive ? 'bg-emerald-500/20' : 'bg-white/10'
                            }`}>
                              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-emerald-400' : 'text-white/60'}`} />
                            </div>
                            <div>
                              <span className={`text-[10px] sm:text-xs font-medium ${isActive ? 'text-emerald-400' : 'text-white/40'}`}>
                                {phase.step}
                              </span>
                              <h4 className={`text-xs sm:text-sm font-semibold ${isActive ? 'text-white' : 'text-white/70'}`}>
                                {phase.title}
                              </h4>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right - Step Details */}
                <div
                  key={activeStep}
                  className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 md:p-6"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      {(() => {
                        const Icon = approachSteps[activeStep].icon;
                        return <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />;
                      })()}
                    </div>
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-emerald-400 font-medium">{approachSteps[activeStep].step}</span>
                      <h3 className="text-sm sm:text-base font-bold text-white">{approachSteps[activeStep].title}</h3>
                    </div>
                  </div>

                  <div className="mb-4 sm:mb-5">
                    <h4 className="text-[10px] sm:text-xs font-medium text-white/50 uppercase tracking-wider mb-1.5 sm:mb-2">What We Do</h4>
                    <ul className="space-y-1 sm:space-y-1.5">
                      {approachSteps[activeStep].activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 sm:gap-2 text-white/70">
                          <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 sm:pt-5 border-t border-white/10">
                    <h4 className="text-[10px] sm:text-xs font-medium text-white/50 uppercase tracking-wider mb-1.5 sm:mb-2">Outcome</h4>
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-medium text-white">{approachSteps[activeStep].outcome}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Services Section */}
      <section className="scroll-reveal">
        <div className="border-t border-white/10">
          <SectionHeader title="Available Services" badge="선택 가능한 서비스" />
          
          <div className="py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-3 sm:px-6 lg:px-16">
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                GTM 컨설팅을 통해 아래 서비스들을 프로젝트 특성에 맞게 조합하여 제안합니다. 
                각 서비스의 상세 내용은 개별 페이지에서 확인하실 수 있습니다.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                {availableServices.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="group p-3 sm:p-4 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {service.name}
                      </h4>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-[10px] sm:text-xs text-white/50 group-hover:text-white/70 transition-colors">
                      {service.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema 
        name="Korean Web3 GTM Strategy"
        description="한국 Web3 시장 진출을 위한 맞춤형 GTM 전략 컨설팅. 프로젝트 분석부터 맞춤형 서비스 제안까지."
        url="/services/gtm"
        serviceType={["GTM Strategy", "Web3 Consulting", "Market Entry Strategy", "Korea Marketing"]}
      />
    </ServicePageLayout>
  );
};

export default GTMService;
