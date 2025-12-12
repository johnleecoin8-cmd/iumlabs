import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronDown, MessageSquare, Search, Map, Rocket, TrendingUp, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Initial Discussion",
    subtitle: "Kickoff",
    icon: MessageSquare,
    description: "프로젝트 이해 및 목표 정의",
    details: [
      "프로젝트 이해",
      "시장/타깃/체인/토큰모델 파악",
      "목표 정의 (Mint, Awareness, IDO, 거래량, 커뮤니티 등)",
    ],
    note: "Lunar Strategy, Coinbound, Blockwiz 등 공통적 단계",
  },
  {
    number: "02",
    title: "Discovery & Research",
    subtitle: "Analysis",
    icon: Search,
    description: "경쟁사 분석 및 시장 포지션 파악",
    details: [
      "경쟁사 분석",
      "Web3 내 포지션 파악 (Narrative / Chain Fit)",
      "커뮤니티 진단",
      "시장 사이클·내러티브 연동",
      "주요 인플루언서 매핑",
    ],
    note: "모든 Web3 마케팅의 핵심, 일반 Web2보다 비중이 큼",
  },
  {
    number: "03",
    title: "Strategy & Planning",
    subtitle: "Design",
    icon: Map,
    description: "캠페인 설계 및 리소스 배분",
    details: [
      "캠페인 설계 (AMA, KOL, PR, 콘텐츠, 커뮤니티)",
      "에코시스템 런칭 플랜",
      "KPI 정의",
      "리소스·예산 배분",
    ],
    note: "Web3는 채널이 다양하므로 전략설계 비중이 크다",
  },
  {
    number: "04",
    title: "Execution",
    subtitle: "Launch",
    icon: Rocket,
    description: "캠페인 실행 및 유저 유입",
    details: [
      "인플루언서/KOL 캠페인",
      "PR/미디어 배포",
      "SNS 운영",
      "Discord/Telegram 성장",
      "이벤트/퀘스트 기반 유저 유입",
      "상장/데이터 기반 Growth Sprint",
    ],
    note: "프로젝트에 따라 Execution 파트가 가장 길어짐",
  },
  {
    number: "05",
    title: "Growth Optimization",
    subtitle: "Scale",
    icon: TrendingUp,
    description: "실시간 최적화 및 ROI 극대화",
    details: [
      "KPI 실시간 조정",
      "콘텐츠/메시지/캠페인 튜닝",
      "ROI 기반 예산 재배분",
      "Narrative Riding (예: DePIN, RWA, AI 등)",
    ],
    note: "Web3 특유의 민첩한 어댑테이션이 중요한 단계",
  },
  {
    number: "06",
    title: "Reporting",
    subtitle: "Review",
    icon: FileText,
    description: "성과 분석 및 다음 스프린트 제안",
    details: [
      "KPI 달성도",
      "인플루언서 캠페인 퍼포먼스",
      "커뮤니티/트래픽 성장",
      "다음 Sprint 제안",
    ],
    note: "Lunar, Coinbound, Blockwiz 등 대부분 동일 구조",
  },
];

const ProcessSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section ref={ref} className="py-24 px-4 bg-[hsl(0,0%,4%)] overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header - Unified Style */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-4 tracking-widest uppercase">
            <span className="w-8 h-px bg-primary" />
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Our <span className="text-primary">Process</span>
          </h2>
        </div>

        {/* Horizontal Stepper */}
        <div className={`mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-[2px] bg-white/[0.08] hidden md:block" />
            <div 
              className="absolute top-5 left-0 h-[2px] bg-primary transition-all duration-500 hidden md:block"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index === activeStep;
              const isPast = index < activeStep;

              return (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`relative z-10 flex flex-col items-center group transition-all duration-300 ${
                    isActive ? 'scale-105' : 'hover:scale-105'
                  }`}
                >
                  {/* Step Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-primary text-white'
                        : isPast
                        ? 'bg-primary/60 text-white'
                        : 'bg-white/[0.03] border border-white/[0.08] text-white/40 group-hover:border-primary/40'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>

                  {/* Step Label */}
                  <div className="hidden md:block mt-3 text-center">
                    <span className={`text-xs font-bold block ${isActive ? 'text-primary' : 'text-white/40'}`}>
                      {step.number}
                    </span>
                    <span className={`text-xs font-medium block ${isActive ? 'text-white' : 'text-white/40'}`}>
                      {step.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion Content - Unified Card Style */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/[0.08] bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  {(() => {
                    const IconComponent = steps[activeStep].icon;
                    return <IconComponent className="w-6 h-6 text-primary" />;
                  })()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-primary font-bold text-sm">{steps[activeStep].number}</span>
                    <ChevronDown className="w-4 h-4 text-white/40" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-white/50 text-sm mt-1">
                    {steps[activeStep].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-6">
              <ul className="space-y-3">
                {steps[activeStep].details.map((detail, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-white/70 text-sm md:text-base">{detail}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Note */}
              <div className="mt-5 pt-5 border-t border-white/[0.06]">
                <p className="text-xs text-white/40 italic">
                  → {steps[activeStep].note}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile Step Indicators */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeStep ? 'bg-primary w-6' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
