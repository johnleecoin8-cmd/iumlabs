import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  MessageSquare, 
  Search, 
  Lightbulb, 
  Rocket, 
  TrendingUp, 
  FileText,
  CheckCircle2
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const containerTop = containerRef.current.offsetTop;
      const scrollPosition = window.scrollY - containerTop + window.innerHeight * 0.4;
      
      stepRefs.current.forEach((ref, index) => {
        if (ref) {
          const stepTop = ref.offsetTop;
          const stepHeight = ref.offsetHeight;
          
          if (scrollPosition >= stepTop && scrollPosition < stepTop + stepHeight) {
            setActiveStep(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#0A0A0B]">
      {/* Fixed Progress Bar - Left Side */}
      <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col items-center gap-4">
          {/* Progress Line */}
          <div className="relative w-1 h-64 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-blue-500 rounded-full"
              style={{ height: progressHeight }}
            />
          </div>
          
          {/* Step Indicators */}
          <div className="flex flex-col gap-2">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === activeStep;
              const isPassed = index < activeStep;
              
              return (
                <button
                  key={index}
                  onClick={() => {
                    stepRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group ${
                    isActive ? "scale-110" : "hover:scale-105"
                  }`}
                  style={{
                    background: isActive ? `${step.color}30` : isPassed ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
                    border: isActive ? `2px solid ${step.color}` : "2px solid transparent",
                    boxShadow: isActive ? `0 0 20px ${step.color}40` : "none"
                  }}
                >
                  {isPassed ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <StepIcon 
                      className="w-5 h-5 transition-colors" 
                      style={{ color: isActive ? step.color : "rgba(255,255,255,0.4)" }}
                    />
                  )}
                  
                  {/* Tooltip */}
                  <div className="absolute left-14 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-lg text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Header - Sticky */}
      <div className="sticky top-0 z-30 bg-gradient-to-b from-[#0A0A0B] via-[#0A0A0B] to-transparent pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white/40 font-mono text-sm tracking-widest mb-4 block"
            >
              [ 02 ] ── How We Work
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white mb-4"
            >
              Our Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/50 text-lg"
            >
              Scroll to explore each step of our methodology
            </motion.p>
          </div>
        </div>
      </div>

      {/* Steps Container */}
      <div className="container mx-auto px-4 lg:pl-24">
        <div className="max-w-5xl mx-auto space-y-4">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === activeStep;
            
            return (
              <div
                key={index}
                ref={(el) => (stepRefs.current[index] = el)}
                className="min-h-[80vh] flex items-center py-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.6 }}
                  className={`w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-500 ${
                    isActive ? "opacity-100 scale-100" : "opacity-50 scale-95"
                  }`}
                >
                  {/* Left: Content */}
                  <div className={`order-2 ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
                    {/* Step Number & Icon */}
                    <div className="flex items-center gap-4 mb-6">
                      <span 
                        className="text-7xl md:text-8xl font-bold font-mono opacity-20"
                        style={{ color: step.color }}
                      >
                        {step.number}
                      </span>
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ 
                          background: `${step.color}20`,
                          border: `2px solid ${step.color}40`
                        }}
                      >
                        <StepIcon className="w-8 h-8" style={{ color: step.color }} />
                      </div>
                    </div>

                    {/* Subtitle */}
                    <div 
                      className="text-sm font-medium uppercase tracking-widest mb-3"
                      style={{ color: step.color }}
                    >
                      {step.subtitle}
                    </div>

                    {/* Title */}
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xl text-white/60 mb-8 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-3">
                      {step.details.map((detail, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-4"
                        >
                          <div 
                            className="w-2 h-2 rounded-full mt-2.5 shrink-0"
                            style={{ background: step.color }}
                          />
                          <span className="text-white/70 text-lg">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Image */}
                  <div className={`order-1 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="relative aspect-[4/3] rounded-3xl overflow-hidden group"
                      style={{
                        boxShadow: isActive ? `0 0 80px ${step.color}30` : "0 25px 50px -12px rgba(0,0,0,0.5)"
                      }}
                    >
                      {/* Image */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${step.image})` }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div 
                        className="absolute inset-0 opacity-60"
                        style={{
                          background: `linear-gradient(135deg, ${step.color}60 0%, transparent 60%, ${step.color}40 100%)`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Step Badge */}
                      <div 
                        className="absolute top-6 right-6 px-4 py-2 rounded-full backdrop-blur-md text-white font-mono font-bold"
                        style={{ 
                          background: `${step.color}40`,
                          border: `1px solid ${step.color}60`
                        }}
                      >
                        Step {step.number}
                      </div>

                      {/* Bottom Gradient Text */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="text-white text-lg font-semibold">{step.title}</div>
                        <div className="text-white/60 text-sm">{step.subtitle}</div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Step Indicator */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeStep ? "w-6" : ""
              }`}
              style={{
                background: index === activeStep ? step.color : index < activeStep ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)"
              }}
            />
          ))}
          <span className="ml-2 text-white/60 text-xs font-mono">
            {activeStep + 1}/{steps.length}
          </span>
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-32" />
    </section>
  );
};

export default ProcessSection;
