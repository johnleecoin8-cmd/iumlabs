import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MessageSquare, Search, Map, Rocket, TrendingUp, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import process images
import discoveryImg from "@/assets/process/discovery-research.jpg";
import strategyImg from "@/assets/process/strategy-planning.jpg";
import executionImg from "@/assets/process/execution-growth.jpg";

const steps = [{
  number: "01",
  title: "Initial Discussion",
  subtitle: "Kickoff",
  icon: MessageSquare,
  description: "프로젝트 이해 및 목표 정의",
  details: ["프로젝트 이해", "시장/타깃/체인/토큰모델 파악", "목표 정의 (Mint, Awareness, IDO, 거래량, 커뮤니티 등)"],
  image: discoveryImg,
  color: "#FF6B35"
}, {
  number: "02",
  title: "Discovery & Research",
  subtitle: "Analysis",
  icon: Search,
  description: "경쟁사 분석 및 시장 포지션 파악",
  details: ["경쟁사 분석", "Web3 내 포지션 파악 (Narrative / Chain Fit)", "커뮤니티 진단", "시장 사이클·내러티브 연동", "주요 인플루언서 매핑"],
  note: "모든 Web3 마케팅의 핵심, 일반 Web2보다 비중이 큼",
  image: discoveryImg,
  color: "#00D9FF"
}, {
  number: "03",
  title: "Strategy & Planning",
  subtitle: "Design",
  icon: Map,
  description: "캠페인 설계 및 리소스 배분",
  details: ["캠페인 설계 (AMA, KOL, PR, 콘텐츠, 커뮤니티)", "에코시스템 런칭 플랜", "KPI 정의", "리소스·예산 배분"],
  note: "Web3는 채널이 다양하므로 전략설계 비중이 크다",
  image: strategyImg,
  color: "#A855F7"
}, {
  number: "04",
  title: "Execution",
  subtitle: "Launch",
  icon: Rocket,
  description: "캠페인 실행 및 유저 유입",
  details: ["인플루언서/KOL 캠페인", "PR/미디어 배포", "SNS 운영", "Discord/Telegram 성장", "이벤트/퀘스트 기반 유저 유입", "상장/데이터 기반 Growth Sprint"],
  note: "프로젝트에 따라 Execution 파트가 가장 길어짐",
  image: executionImg,
  color: "#10B981"
}, {
  number: "05",
  title: "Growth Optimization",
  subtitle: "Scale",
  icon: TrendingUp,
  description: "실시간 최적화 및 ROI 극대화",
  details: ["KPI 실시간 조정", "콘텐츠/메시지/캠페인 튜닝", "ROI 기반 예산 재배분", "Narrative Riding (예: DePIN, RWA, AI 등)"],
  note: "Web3 특유의 민첩한 어댑테이션이 중요한 단계",
  image: executionImg,
  color: "#F59E0B"
}, {
  number: "06",
  title: "Reporting",
  subtitle: "Review",
  icon: FileText,
  description: "성과 분석 및 다음 스프린트 제안",
  details: ["KPI 달성도", "인플루언서 캠페인 퍼포먼스", "커뮤니티/트래픽 성장", "다음 Sprint 제안"],
  image: strategyImg,
  color: "#EC4899"
}];

const ProcessSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeStep, setActiveStep] = useState(0);

  const goToNext = () => setActiveStep((prev) => (prev + 1) % steps.length);
  const goToPrev = () => setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <section ref={ref} className="relative px-4 py-16 md:py-24 bg-[#0A0A0B] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeStep}
            src={steps[activeStep].image}
            alt={steps[activeStep].title}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-[#0A0A0B]/80 to-[#0A0A0B]" />
      </div>

      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            background: `radial-gradient(circle at 30% 50%, ${steps[activeStep].color}20 0%, transparent 50%)`
          }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className={`mb-12 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-white/30 text-sm font-mono">[ 02 ]</span>
            <span className="w-12 h-px bg-white/20" />
            <span className="text-white/50 text-sm uppercase tracking-widest">How We Work</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Our <span className="text-primary">Process</span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left - Step Navigation */}
          <div className={`lg:col-span-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="space-y-2">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = index === activeStep;
                const isPast = index < activeStep;
                
                return (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left group ${
                      isActive 
                        ? 'bg-white/10 border border-white/20' 
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {/* Step Number */}
                    <div 
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive ? '' : isPast ? 'bg-white/10' : 'bg-white/5'
                      }`}
                      style={{ 
                        backgroundColor: isActive ? `${step.color}30` : undefined 
                      }}
                    >
                      <IconComponent 
                        className="w-5 h-5 transition-colors duration-300" 
                        style={{ color: isActive ? step.color : isPast ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)' }}
                      />
                    </div>
                    
                    {/* Step Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-xs font-mono transition-colors duration-300"
                          style={{ color: isActive ? step.color : 'rgba(255,255,255,0.4)' }}
                        >
                          [{step.number}]
                        </span>
                        <span className={`text-xs uppercase tracking-wider transition-colors duration-300 ${
                          isActive ? 'text-white/70' : 'text-white/30'
                        }`}>
                          {step.subtitle}
                        </span>
                      </div>
                      <h4 className={`font-semibold truncate transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-white/50'
                      }`}>
                        {step.title}
                      </h4>
                    </div>

                    {/* Active Indicator */}
                    <div 
                      className={`w-1 h-8 rounded-full transition-all duration-300 ${isActive ? '' : 'opacity-0'}`}
                      style={{ backgroundColor: isActive ? step.color : 'transparent' }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={goToPrev}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: steps[activeStep].color }}
                  animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right - Active Step Detail */}
          <div className={`lg:col-span-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden"
              >
                {/* Card Background */}
                <div className="absolute inset-0">
                  <img
                    src={steps[activeStep].image}
                    alt={steps[activeStep].title}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${steps[activeStep].color}40 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.95) 100%)`
                    }}
                  />
                </div>

                {/* Card Content */}
                <div className="relative z-10 p-8 md:p-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span 
                          className="text-5xl md:text-7xl font-bold opacity-30"
                          style={{ color: steps[activeStep].color }}
                        >
                          {steps[activeStep].number}
                        </span>
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center"
                          style={{ backgroundColor: `${steps[activeStep].color}30` }}
                        >
                          {(() => {
                            const IconComponent = steps[activeStep].icon;
                            return <IconComponent className="w-8 h-8" style={{ color: steps[activeStep].color }} />;
                          })()}
                        </div>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {steps[activeStep].title}
                      </h3>
                      <p className="text-white/60 text-lg">
                        {steps[activeStep].description}
                      </p>
                    </div>
                  </div>

                  {/* Details List */}
                  <div className="space-y-3 mb-6">
                    {steps[activeStep].details.map((detail, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-4 group"
                      >
                        <div 
                          className="w-2 h-2 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: steps[activeStep].color }}
                        />
                        <span className="text-white/80 group-hover:text-white transition-colors">
                          {detail}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Note if exists */}
                  {steps[activeStep].note && (
                    <div 
                      className="p-4 rounded-xl border-l-4 mt-6"
                      style={{ 
                        backgroundColor: `${steps[activeStep].color}10`,
                        borderColor: steps[activeStep].color 
                      }}
                    >
                      <p className="text-white/70 text-sm italic">
                        💡 {steps[activeStep].note}
                      </p>
                    </div>
                  )}
                </div>

                {/* Border Glow */}
                <div 
                  className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                  style={{ borderColor: `${steps[activeStep].color}30` }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Step Dots - Mobile */}
        <div className="flex justify-center gap-2 mt-8 lg:hidden">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{ 
                backgroundColor: index === activeStep ? step.color : 'rgba(255,255,255,0.3)',
                width: index === activeStep ? '24px' : '8px'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
