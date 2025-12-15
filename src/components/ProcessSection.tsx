import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { 
  MessageSquare, 
  Search, 
  Lightbulb, 
  Rocket, 
  TrendingUp, 
  FileText,
  RotateCcw,
  ChevronDown
} from "lucide-react";

// Process images
import discoveryImg from "@/assets/process/discovery-research.jpg";
import strategyImg from "@/assets/process/strategy-planning.jpg";
import executionImg from "@/assets/process/execution-growth.jpg";

const steps = [
  {
    number: "01",
    title: "Initial Discussion",
    subtitle: "Understanding Your Vision",
    icon: MessageSquare,
    description: "We begin with a deep dive into your project, understanding your goals, target audience, and unique value proposition for the Korean market.",
    details: [
      "Project overview and market analysis",
      "Target audience identification",
      "Competitive landscape review",
      "Goal setting and KPI definition"
    ],
    image: discoveryImg,
    color: "#3B82F6"
  },
  {
    number: "02",
    title: "Discovery & Research",
    subtitle: "Market Intelligence",
    icon: Search,
    description: "Our team conducts comprehensive research on Korean market trends, competitor analysis, and community sentiment to inform our strategy.",
    details: [
      "Korean market trends analysis",
      "Community sentiment research",
      "KOL and media landscape mapping",
      "Regulatory compliance assessment"
    ],
    image: discoveryImg,
    color: "#8B5CF6"
  },
  {
    number: "03",
    title: "Strategy & Planning",
    subtitle: "Tailored Approach",
    icon: Lightbulb,
    description: "We develop a customized go-to-market strategy combining community building, influencer partnerships, and media outreach.",
    details: [
      "GTM strategy development",
      "Channel and platform selection",
      "Content and messaging framework",
      "Timeline and milestone planning"
    ],
    image: strategyImg,
    color: "#EC4899"
  },
  {
    number: "04",
    title: "Execution",
    subtitle: "Launching Your Campaign",
    icon: Rocket,
    description: "Our experienced team executes the strategy across multiple channels, managing communities, KOL campaigns, and media relations.",
    details: [
      "Community launch and management",
      "KOL campaign activation",
      "PR and media outreach",
      "Event coordination"
    ],
    image: executionImg,
    color: "#F59E0B"
  },
  {
    number: "05",
    title: "Growth Optimization",
    subtitle: "Scaling Success",
    icon: TrendingUp,
    description: "We continuously optimize campaigns based on data and feedback, scaling what works and adjusting strategies for maximum impact.",
    details: [
      "Performance analysis",
      "A/B testing and optimization",
      "Community engagement scaling",
      "Partnership expansion"
    ],
    image: executionImg,
    color: "#10B981"
  },
  {
    number: "06",
    title: "Reporting & Insights",
    subtitle: "Measuring Impact",
    icon: FileText,
    description: "Regular comprehensive reports provide clear visibility into campaign performance, ROI, and actionable insights for future growth.",
    details: [
      "Weekly performance reports",
      "ROI and KPI tracking",
      "Market intelligence updates",
      "Strategic recommendations"
    ],
    image: strategyImg,
    color: "#06B6D4"
  }
];

const ProcessSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<"left" | "right">("left");
  const [removedCards, setRemovedCards] = useState<number[]>([]);

  const currentStep = steps[currentIndex];
  const Icon = currentStep?.icon || MessageSquare;

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold) {
      setExitDirection(info.offset.x > 0 ? "right" : "left");
      removeCard();
    }
  };

  const removeCard = () => {
    if (currentIndex < steps.length - 1) {
      setRemovedCards([...removedCards, currentIndex]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const resetStack = () => {
    setRemovedCards([]);
    setCurrentIndex(0);
  };

  const goToStep = (index: number) => {
    if (index > currentIndex) {
      // Remove cards up to the target
      const newRemoved = [];
      for (let i = currentIndex; i < index; i++) {
        newRemoved.push(i);
      }
      setRemovedCards([...removedCards, ...newRemoved]);
    }
    setCurrentIndex(index);
  };

  return (
    <section className="min-h-screen bg-[#0A0A0B] py-20 overflow-hidden relative">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${currentStep?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(40px)",
          transition: "background-image 0.5s ease-in-out"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-transparent to-[#0A0A0B]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Number */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[14rem] font-black text-white/[0.03] pointer-events-none select-none">
            02
          </span>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight relative z-10">
            <span className="text-white/50">Our</span>{" "}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          
          {/* Gradient Underline */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-24 h-1 mx-auto mt-6 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 rounded-full"
          />
          
          <p className="text-white/60 text-lg max-w-2xl mx-auto mt-6 relative z-10">
            Swipe or click to explore each step
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left: Timeline Progress */}
          <div className="hidden lg:block">
            <div className="sticky top-32 space-y-1">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === currentIndex;
                const isPassed = removedCards.includes(index);

                return (
                  <button
                    key={step.number}
                    onClick={() => !isPassed && goToStep(index)}
                    disabled={isPassed}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                      isPassed 
                        ? "opacity-40 cursor-not-allowed" 
                        : "hover:bg-white/5 cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          isActive ? "scale-110" : ""
                        }`}
                        style={{
                          background: isActive ? `${step.color}30` : "rgba(255,255,255,0.05)",
                          border: isActive ? `2px solid ${step.color}` : "2px solid transparent",
                          boxShadow: isActive ? `0 0 20px ${step.color}40` : "none"
                        }}
                      >
                        <StepIcon 
                          className="w-5 h-5" 
                          style={{ color: isActive ? step.color : "rgba(255,255,255,0.4)" }}
                        />
                      </div>
                      <div>
                        <div 
                          className={`font-mono text-xs transition-colors ${
                            isActive ? "" : "text-white/40"
                          }`}
                          style={{ color: isActive ? step.color : undefined }}
                        >
                          Step {step.number}
                        </div>
                        <div className={`font-medium transition-colors ${
                          isActive ? "text-white" : "text-white/60"
                        }`}>
                          {step.title}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Reset Button */}
              {removedCards.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={resetStack}
                  className="w-full mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Stack
                </motion.button>
              )}

              {/* Progress */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex justify-between text-sm text-white/40 mb-2">
                  <span>Progress</span>
                  <span>{currentIndex + 1} / {steps.length}</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full"
                    style={{ background: currentStep?.color }}
                    animate={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Card Stack */}
          <div className="relative h-[500px] md:h-[550px] flex items-center justify-center">
            {/* Stack Container */}
            <div className="relative w-full max-w-[450px] h-[450px] md:h-[500px]">
              <AnimatePresence mode="popLayout">
                {steps.map((step, index) => {
                  if (removedCards.includes(index)) return null;
                  
                  const stackPosition = index - currentIndex;
                  const StepIcon = step.icon;
                  const isTop = index === currentIndex;

                  if (stackPosition > 3) return null;

                  return (
                    <motion.div
                      key={step.number}
                      className={`absolute inset-0 ${isTop ? "cursor-grab active:cursor-grabbing" : ""}`}
                      initial={{ 
                        scale: 1 - stackPosition * 0.05,
                        y: stackPosition * 12,
                        rotate: stackPosition * 1.5,
                        opacity: 1 - stackPosition * 0.15
                      }}
                      animate={{ 
                        scale: 1 - stackPosition * 0.05,
                        y: stackPosition * 12,
                        rotate: stackPosition * 1.5,
                        opacity: 1 - stackPosition * 0.15,
                        zIndex: steps.length - index
                      }}
                      exit={{ 
                        x: exitDirection === "left" ? -400 : 400,
                        rotate: exitDirection === "left" ? -20 : 20,
                        opacity: 0,
                        transition: { duration: 0.3 }
                      }}
                      drag={isTop ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.9}
                      onDragEnd={isTop ? handleDragEnd : undefined}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30
                      }}
                      onClick={() => isTop && removeCard()}
                    >
                      <div 
                        className="w-full h-full rounded-3xl overflow-hidden relative"
                        style={{
                          boxShadow: isTop 
                            ? `0 0 60px ${step.color}30, 0 25px 50px -12px rgba(0,0,0,0.8)` 
                            : "0 25px 50px -12px rgba(0,0,0,0.5)",
                        }}
                      >
                        {/* Background Image */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${step.image})` }}
                        />
                        
                        {/* Gradient Overlay */}
                        <div 
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(135deg, ${step.color}40 0%, ${step.color}80 100%)`,
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />

                        {/* Content */}
                        <div className="absolute inset-0 p-6 md:p-8 flex flex-col">
                          {/* Top Row */}
                          <div className="flex items-start justify-between mb-auto">
                            <div 
                              className="text-6xl md:text-7xl font-bold font-mono opacity-30"
                              style={{ color: step.color }}
                            >
                              {step.number}
                            </div>
                            <div 
                              className="w-14 h-14 rounded-2xl flex items-center justify-center"
                              style={{ 
                                background: `${step.color}30`,
                                border: `1px solid ${step.color}50`
                              }}
                            >
                              <StepIcon className="w-7 h-7" style={{ color: step.color }} />
                            </div>
                          </div>

                          {/* Bottom Content */}
                          <div>
                            <div 
                              className="text-sm font-medium mb-2 uppercase tracking-wider"
                              style={{ color: step.color }}
                            >
                              {step.subtitle}
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                              {step.title}
                            </h3>
                            <p className="text-white/70 text-sm md:text-base mb-6 line-clamp-3">
                              {step.description}
                            </p>

                            {/* Details */}
                            <div className="space-y-2">
                              {step.details.slice(0, 3).map((detail, i) => (
                                <div 
                                  key={i}
                                  className="flex items-center gap-3 text-white/60 text-sm"
                                >
                                  <div 
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ background: step.color }}
                                  />
                                  {detail}
                                </div>
                              ))}
                            </div>

                            {/* Swipe Hint */}
                            {isTop && (
                              <motion.div 
                                className="mt-6 flex items-center justify-center gap-2 text-white/40 text-sm"
                                animate={{ y: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                              >
                                <span>Swipe or tap to continue</span>
                                <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* All cards removed state */}
              {currentIndex >= steps.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Process Complete!
                    </h3>
                    <p className="text-white/60 mb-6">
                      You've explored all our process steps
                    </p>
                    <button
                      onClick={resetStack}
                      className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/80 transition-all flex items-center gap-2 mx-auto"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Review Again
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Progress Dots */}
        <div className="flex justify-center gap-2 mt-8 lg:hidden">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                removedCards.includes(index) 
                  ? "bg-white/20" 
                  : index === currentIndex 
                    ? "w-6" 
                    : "bg-white/40"
              }`}
              style={{
                background: index === currentIndex ? step.color : undefined,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
