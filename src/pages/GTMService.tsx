import { Rocket, Target, Compass, LineChart, Users, TrendingUp, Calendar, FileText, Zap, CheckCircle, Building2, Shield, Scale, Landmark } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageTitle } from "@/hooks/usePageTitle";

const ACCENT_COLOR = "#10B981";

// Korean Exchange & Regulatory Data
const koreanExchanges = [
  { name: "Upbit", tier: "Tier 1", volume: "60%+ KRW Volume", color: "#093687" },
  { name: "Bithumb", tier: "Tier 1", volume: "Major CEX", color: "#F37321" },
  { name: "Coinone", tier: "Tier 2", volume: "Established", color: "#0066FF" },
  { name: "Korbit", tier: "Tier 2", volume: "Institutional Focus", color: "#1E88E5" },
  { name: "Gopax", tier: "Tier 2", volume: "Retail Friendly", color: "#00D1C1" },
];

const regulatoryFramework = [
  {
    title: "VASP 등록",
    description: "가상자산사업자 신고 및 라이선스 요건",
    icon: Shield,
    details: ["FIU 신고 필수", "실명 계좌 연동", "AML/KYC 준수"]
  },
  {
    title: "특금법 준수",
    description: "특정금융정보법 가이드라인 이해",
    icon: Scale,
    details: ["자금세탁 방지", "고객 확인 의무", "거래 보고 체계"]
  },
  {
    title: "세금 정책",
    description: "가상자산 과세 정책 및 신고 방법",
    icon: Landmark,
    details: ["양도소득세", "신고 기준", "세율 이해"]
  },
  {
    title: "상장 요건",
    description: "한국 거래소별 상장 심사 기준",
    icon: Building2,
    details: ["기술 검토", "법적 적격성", "유동성 요건"]
  }
];

// 4-Week Program Journey
const journeyPhases = [
  {
    week: "Week 1",
    title: "Market Analysis",
    icon: Compass,
    activities: [
      "Korean market landscape research",
      "Competitor analysis & positioning",
      "한국 거래소 상장 가능성 분석",
      "규제 환경 및 VASP 요건 검토"
    ],
    deliverables: ["Market Entry Report", "Regulatory Checklist"]
  },
  {
    week: "Week 2",
    title: "Strategy Development",
    icon: Target,
    activities: [
      "GTM roadmap creation",
      "한국 거래소 상장 전략 수립",
      "특금법 준수 계획 수립",
      "KPI definition & tracking setup"
    ],
    deliverables: ["GTM Strategy Deck", "Exchange Listing Plan"]
  },
  {
    week: "Week 3",
    title: "Launch Preparation",
    icon: Rocket,
    activities: [
      "한국 파트너십 & KOL 아웃리치",
      "한국어 콘텐츠 로컬라이제이션",
      "KakaoTalk/Naver 커뮤니티 구축",
      "한국 미디어 PR 준비"
    ],
    deliverables: ["Launch Timeline", "Korean Asset Library"]
  },
  {
    week: "Week 4",
    title: "Execution & Optimization",
    icon: TrendingUp,
    activities: [
      "Campaign activation",
      "한국 커뮤니티 성과 모니터링",
      "Real-time optimization",
      "거래소 상장 후속 지원"
    ],
    deliverables: ["Performance Report", "Exchange Roadmap"]
  }
];

const serviceTags: ServiceTag[] = [
  { label: "한국 거래소 상장" },
  { label: "VASP 컨설팅" },
  { label: "특금법 준수" },
  { label: "Tokenomics Review" },
  { label: "Korea Localization" },
  { label: "규제 대응" },
];

const stats: ServiceStat[] = [
  { value: 18, label: "Projects Launched", suffix: "+" },
  { value: 500, label: "TGE Support", prefix: "$", suffix: "M+" },
  { value: 4, label: "Avg Launch Timeline", suffix: " weeks" },
  { value: 95, label: "Client Retention", suffix: "%" },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep-dive into your project, tokenomics, target audience, and Korean market fit assessment.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Strategy",
    description: "Build comprehensive GTM roadmap with channel mix, messaging framework, and launch timeline.",
    icon: Target,
  },
  {
    number: "03",
    title: "Preparation",
    description: "Set up partnerships, localize content, build community infrastructure, and prepare media outreach.",
    icon: FileText,
  },
  {
    number: "04",
    title: "Launch",
    description: "Execute coordinated campaign across all channels with real-time monitoring and optimization.",
    icon: Rocket,
  },
];

const deliverables: Deliverable[] = [
  {
    title: "규제 & 상장 분석",
    items: [
      "한국 거래소 상장 가능성 리포트",
      "VASP 등록 요건 체크리스트",
      "특금법 준수 가이드",
      "규제 리스크 분석 보고서",
    ],
  },
  {
    title: "시장 & 전략 문서",
    items: [
      "한국 시장 진입 전략 덱",
      "거래소별 상장 로드맵",
      "한국 타겟 메시징 프레임워크",
      "KPI 대시보드 설정",
    ],
  },
  {
    title: "실행 자산",
    items: [
      "한국어 콘텐츠 라이브러리",
      "KakaoTalk/Naver 커뮤니티 셋업 가이드",
      "한국 파트너십 아웃리치 키트",
      "거래소 상장 체크리스트",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "한국 거래소 상장은 어떻게 진행되나요?",
    answer: "한국 주요 거래소(업비트, 빗썸, 코인원 등)별 상장 요건을 분석하고, 기술 검토, 법적 적격성, 유동성 요건을 충족하기 위한 전략을 수립합니다. 상장 프로세스 전반에 걸쳐 거래소 담당자와의 커뮤니케이션을 지원합니다.",
  },
  {
    question: "VASP 등록과 특금법 준수는 어떻게 지원하나요?",
    answer: "금융정보분석원(FIU) 신고 요건, 실명 계좌 연동, AML/KYC 정책 수립 등 특정금융정보법 준수를 위한 컨설팅을 제공합니다. 필요시 법률 자문 파트너와 연계해 드립니다.",
  },
  {
    question: "GTM Strategy 서비스에는 무엇이 포함되나요?",
    answer: "시장 분석, 경쟁 포지셔닝, 론칭 로드맵, 채널 전략, 메시징 프레임워크, 한국 거래소 상장 전략, 규제 대응 컨설팅까지 한국 Web3 시장에 특화된 종합 GTM 서비스를 제공합니다.",
  },
  {
    question: "프로젝트 단계별로 어떤 지원을 받을 수 있나요?",
    answer: "Pre-TGE 프로젝트는 론칭 전략, 커뮤니티 구축, 거래소 상장 준비를 지원하고, Post-TGE 프로젝트는 한국 시장 성장 최적화, 추가 거래소 상장, 규제 대응을 지원합니다.",
  },
  {
    question: "한국 시장 진입이 다른 이유는 무엇인가요?",
    answer: "한국은 카카오톡, 네이버 등 고유 플랫폼, 강력한 커뮤니티 문화, VASP 등록 및 특금법 등 특수한 규제 요건, 독특한 사용자 행동 패턴을 가지고 있습니다. 저희 현지 전문성으로 전략을 적절히 로컬라이즈합니다.",
  },
];

const GTMService = () => {
  usePageTitle("GTM Strategy");
  const [activePhase, setActivePhase] = useState(0);

  return (
    <ServicePageLayout
      serviceName="GTM Strategy"
      serviceTitle="Go-To-Market"
      serviceSubtitle="Strategy"
      serviceDescription="한국 시장 진입을 위한 전략적 GTM 계획 및 실행. 거래소 상장 전략, 규제 대응, 토크노믹스 검토부터 조율된 론칭 캠페인까지."
      serviceIcon={Rocket}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      processSteps={processSteps}
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="gtm"
    >
      {/* Korean Exchange Ecosystem Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader number="01" title="Korean Exchanges" badge="상장 전략" />
          
          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  한국 주요 거래소 상장 지원
                </h3>
                <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                  한국은 전 세계 암호화폐 거래량의 상당 부분을 차지합니다. 주요 거래소별 상장 요건과 프로세스를 이해하고 전략적으로 접근합니다.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {koreanExchanges.map((exchange, idx) => (
                  <motion.div
                    key={exchange.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300"
                  >
                    <div 
                      className="w-10 h-10 rounded-lg mb-3 flex items-center justify-center"
                      style={{ backgroundColor: `${exchange.color}20` }}
                    >
                      <Building2 className="w-5 h-5" style={{ color: exchange.color }} />
                    </div>
                    <h4 className="font-bold text-white mb-1">{exchange.name}</h4>
                    <span className="text-xs text-emerald-400 font-medium">{exchange.tier}</span>
                    <p className="text-xs text-white/50 mt-1">{exchange.volume}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Framework Section */}
      <section className="scroll-reveal bg-[#0A0A0A]">
        <div className="border-t border-white/10">
          <SectionHeader number="02" title="Regulatory Framework" badge="규제 대응" />
          
          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  한국 가상자산 규제 프레임워크
                </h3>
                <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                  한국 시장 진입을 위해 반드시 이해해야 할 규제 환경. VASP 등록, 특금법 준수, 세금 정책까지 종합적으로 컨설팅합니다.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {regulatoryFramework.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white mb-1">{item.title}</h4>
                          <p className="text-white/60 text-sm mb-3">{item.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.details.map((detail, dIdx) => (
                              <span 
                                key={dIdx}
                                className="px-2 py-1 bg-white/5 border border-white/10 text-white/70 text-xs rounded-md"
                              >
                                {detail}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Week Program Journey Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader number="03" title="4-Week Program" badge="GTM Journey" />
          
          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left - Phase Navigation */}
                <div>
                  <p className="text-white/60 text-lg leading-relaxed mb-8">
                    시장 분석부터 성공적인 론칭까지, 각 단계별 명확한 결과물과 함께 진행되는 4주 프로그램입니다.
                  </p>
                  
                  <div className="space-y-3">
                    {journeyPhases.map((phase, index) => {
                      const Icon = phase.icon;
                      const isActive = activePhase === index;
                      
                      return (
                        <motion.button
                          key={phase.week}
                          onClick={() => setActivePhase(index)}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                            isActive 
                              ? 'bg-emerald-500/10 border-emerald-500/30' 
                              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                          }`}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              isActive ? 'bg-emerald-500/20' : 'bg-white/10'
                            }`}>
                              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-white/60'}`} />
                            </div>
                            <div>
                              <span className={`text-xs font-medium ${isActive ? 'text-emerald-400' : 'text-white/40'}`}>
                                {phase.week}
                              </span>
                              <h4 className={`font-semibold ${isActive ? 'text-white' : 'text-white/70'}`}>
                                {phase.title}
                              </h4>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Right - Phase Details */}
                <motion.div
                  key={activePhase}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      {(() => {
                        const Icon = journeyPhases[activePhase].icon;
                        return <Icon className="w-6 h-6 text-emerald-400" />;
                      })()}
                    </div>
                    <div>
                      <span className="text-xs text-emerald-400 font-medium">{journeyPhases[activePhase].week}</span>
                      <h3 className="text-xl font-bold text-white">{journeyPhases[activePhase].title}</h3>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-white/60 mb-3">Activities</h4>
                    <ul className="space-y-2">
                      {journeyPhases[activePhase].activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white/80">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <h4 className="text-sm font-medium text-white/60 mb-3">Deliverables</h4>
                    <div className="flex flex-wrap gap-2">
                      {journeyPhases[activePhase].deliverables.map((deliverable, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium rounded-lg"
                        >
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default GTMService;
