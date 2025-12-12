import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Search, Map, Rocket, MessageCircle, TrendingUp, FileText, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Import process images
import kickoffImg from "@/assets/process/kickoff-discussion.jpg";
import discoveryImg from "@/assets/process/discovery-research.jpg";
import strategyImg from "@/assets/process/strategy-planning.jpg";
import executionImg from "@/assets/process/execution-growth.jpg";
import growthImg from "@/assets/process/growth-optimization.jpg";
import reportingImg from "@/assets/process/reporting.jpg";

const steps = [
  {
    number: "01",
    title: "Initial Discussion",
    subtitle: "Kickoff",
    description: "프로젝트를 깊이 이해하고 목표를 명확히 정의하는 첫 단계입니다.",
    image: kickoffImg,
    icon: MessageCircle,
    highlights: ["Project Understanding", "Goal Definition", "Market Analysis"],
    details: [
      "프로젝트 이해 및 비전 공유",
      "시장/타깃/체인/토큰모델 파악",
      "목표 정의 (Mint, Awareness, IDO, 거래량, 커뮤니티 등)",
    ],
  },
  {
    number: "02",
    title: "Discovery & Research",
    subtitle: "Market Intelligence",
    description: "경쟁사와 시장을 분석하여 최적의 포지셔닝을 찾습니다.",
    image: discoveryImg,
    icon: Search,
    highlights: ["Competitor Analysis", "Position Mapping", "KOL Research"],
    details: [
      "경쟁사 분석",
      "Web3 내 포지션 파악 (Narrative / Chain Fit)",
      "커뮤니티 진단",
      "시장 사이클·내러티브 연동",
      "주요 인플루언서 매핑",
    ],
  },
  {
    number: "03",
    title: "Strategy & Planning",
    subtitle: "Campaign Design",
    description: "맞춤형 마케팅 로드맵과 캠페인을 설계합니다.",
    image: strategyImg,
    icon: Map,
    highlights: ["Campaign Design", "KPI Definition", "Resource Planning"],
    details: [
      "캠페인 설계 (AMA, KOL, PR, 콘텐츠, 커뮤니티)",
      "에코시스템 런칭 플랜",
      "KPI 정의",
      "리소스·예산 배분",
    ],
  },
  {
    number: "04",
    title: "Execution",
    subtitle: "Full-Scale Launch",
    description: "프로젝트에 따라 가장 핵심적인 실행 단계입니다.",
    image: executionImg,
    icon: Rocket,
    highlights: ["KOL Campaign", "PR Distribution", "Community Growth"],
    details: [
      "인플루언서/KOL 캠페인",
      "PR/미디어 배포",
      "SNS 운영",
      "Discord/Telegram 성장",
      "이벤트/퀘스트 기반 유저 유입",
      "상장/데이터 기반 Growth Sprint",
    ],
  },
  {
    number: "05",
    title: "Growth Optimization",
    subtitle: "Real-time Tuning",
    description: "실시간 데이터를 기반으로 캠페인을 최적화합니다.",
    image: growthImg,
    icon: TrendingUp,
    highlights: ["KPI Adjustment", "ROI Optimization", "Narrative Riding"],
    details: [
      "KPI 실시간 조정",
      "콘텐츠/메시지/캠페인 튜닝",
      "ROI 기반 예산 재배분",
      '"Narrative Riding" (DePIN, RWA, AI 등)',
    ],
  },
  {
    number: "06",
    title: "Reporting",
    subtitle: "Performance Review",
    description: "성과를 분석하고 다음 단계를 제안합니다.",
    image: reportingImg,
    icon: FileText,
    highlights: ["KPI Report", "Campaign Analysis", "Next Sprint"],
    details: [
      "KPI 달성도",
      "인플루언서 캠페인 퍼포먼스",
      "커뮤니티/트래픽 성장",
      "다음 Sprint 제안",
    ],
  },
];

const ProcessSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedStep, setSelectedStep] = useState<typeof steps[0] | null>(null);

  // Auto-progress through steps
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={ref} className="py-24 px-6 bg-background border-t border-border overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header - Bold Single Word Style */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Bold Single Word */}
          <h2 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.15em] text-foreground uppercase mb-6">
            LAUNCH
          </h2>
          
          {/* Horizontal Line Decoration */}
          <div className={`w-full max-w-xl mx-auto h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`} />
          
          {/* Subtitle */}
          <p className={`text-muted-foreground text-sm md:text-base tracking-wider uppercase transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            6 steps from idea to Korean market domination
          </p>
        </div>

        {/* Progress Bar */}
        <div className={`mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-between mb-3 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
                  activeStep === index 
                    ? 'bg-primary text-white' 
                    : activeStep > index 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <span className="text-xs font-bold">{step.number}</span>
                <span className="hidden lg:inline text-xs font-medium">{step.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-cyan-500 to-primary rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            <motion.div 
              className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"
              animate={{ 
                left: ['0%', `${((activeStep + 1) / steps.length) * 100 - 5}%`] 
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((_, index) => (
              <span 
                key={index} 
                className={`text-xs transition-colors duration-300 ${
                  activeStep >= index ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Step {index + 1}
              </span>
            ))}
          </div>
        </div>

        {/* Steps - 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedStep(step)}
              >
                {/* Card */}
                <div className={`relative bg-card border rounded-2xl overflow-hidden transition-all duration-500 h-full ${
                  activeStep === index 
                    ? 'border-primary shadow-[0_0_40px_rgba(59,130,246,0.3)] scale-[1.02]' 
                    : 'border-border hover:border-primary/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]'
                }`}>
                  {/* Image Section */}
                  <div className="relative h-[140px] overflow-hidden">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        activeStep === index ? 'scale-125' : 'group-hover:scale-125'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    
                    {/* Number Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-primary/90 text-white text-xs font-bold backdrop-blur-sm">
                        {step.number}
                      </span>
                    </div>

                    {/* Icon Overlay */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>

                    {/* Click indicator */}
                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/70 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Click for details
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5">
                    <div className="text-xs text-primary/70 font-medium mb-1">{step.subtitle}</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm mb-3 line-clamp-2">
                      {step.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1.5">
                      {step.highlights.slice(0, 2).map((highlight, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                        >
                          {highlight}
                        </span>
                      ))}
                      {step.highlights.length > 2 && (
                        <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
                          +{step.highlights.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="https://calendly.com/cryptobridgekorea"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300 group"
          >
            Start your journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedStep} onOpenChange={() => setSelectedStep(null)}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-bold">
                {selectedStep?.number}
              </span>
              <span className="text-primary/70 text-sm font-medium">{selectedStep?.subtitle}</span>
            </div>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground">
              {selectedStep?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedStep && (
            <div className="mt-4">
              {/* Image */}
              <div className="relative h-[200px] rounded-xl overflow-hidden mb-6">
                <img 
                  src={selectedStep.image} 
                  alt={selectedStep.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-lg mb-6">
                {selectedStep.description}
              </p>

              {/* Details List */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">What we do</h4>
                <ul className="space-y-2">
                  {selectedStep.details.map((detail, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 text-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Highlights */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {selectedStep.highlights.map((highlight, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProcessSection;
