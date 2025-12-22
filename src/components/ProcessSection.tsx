import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Target, Rocket, TrendingUp, Check } from "lucide-react";
import { useRef } from "react";

const phases = [
  {
    title: "Discovery",
    icon: Search,
    description: "Deep-dive into your project, market positioning, and Korean audience fit.",
    color: "from-blue-500 to-cyan-500",
    details: ["Market Research", "Competitor Analysis", "Audience Mapping"]
  },
  {
    title: "Strategy",
    icon: Target,
    description: "Build GTM roadmap, channel mix, and localized messaging framework.",
    color: "from-purple-500 to-pink-500",
    details: ["GTM Planning", "Content Strategy", "KOL Selection"]
  },
  {
    title: "Launch",
    icon: Rocket,
    description: "Execute campaigns across KOLs, community, PR, and social channels.",
    color: "from-orange-500 to-amber-500",
    details: ["Campaign Execution", "Community Building", "PR Coverage"]
  },
  {
    title: "Scale",
    icon: TrendingUp,
    description: "Optimize, iterate, and expand based on performance data.",
    color: "from-green-500 to-emerald-500",
    details: ["Performance Analytics", "Growth Optimization", "Market Expansion"]
  }
];

const TimelineStep = ({ phase, index, progress }: { phase: typeof phases[0]; index: number; progress: number }) => {
  const Icon = phase.icon;
  const isActive = progress > index * 0.25;
  const isComplete = progress > (index + 1) * 0.25;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative flex-1 min-w-[280px]"
    >
      {/* Connector line */}
      {index < phases.length - 1 && (
        <div className="absolute top-8 left-[calc(50%+24px)] right-0 h-0.5 hidden lg:block">
          <div className="absolute inset-0 bg-white/10" />
          <motion.div
            className={`absolute inset-y-0 left-0 bg-gradient-to-r ${phase.color}`}
            initial={{ width: "0%" }}
            animate={{ width: isComplete ? "100%" : isActive ? "50%" : "0%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      )}

      {/* Step content */}
      <div className="relative z-10 text-center lg:text-left">
        {/* Icon circle */}
        <motion.div
          className={`relative mx-auto lg:mx-0 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
            isActive 
              ? `bg-gradient-to-br ${phase.color} shadow-lg` 
              : 'bg-white/5 border border-white/10'
          }`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          style={{
            boxShadow: isActive ? '0 10px 30px rgba(0,0,0,0.3)' : 'none'
          }}
        >
          {isComplete ? (
            <Check className="w-6 h-6 text-white" strokeWidth={2.5} />
          ) : (
            <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-white/40'}`} strokeWidth={1.5} />
          )}
          
          {/* Pulse effect when active */}
          {isActive && !isComplete && (
            <motion.div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${phase.color}`}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Step number */}
        <div className="absolute top-0 left-1/2 lg:left-14 -translate-x-1/2 lg:translate-x-0 -translate-y-2">
          <span className={`text-xs font-mono ${isActive ? 'text-white/60' : 'text-white/30'}`}>
            0{index + 1}
          </span>
        </div>

        {/* Text content */}
        <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/50'}`}>
          {phase.title}
        </h3>
        <p className={`text-sm leading-relaxed mb-4 transition-colors duration-300 ${isActive ? 'text-white/70' : 'text-white/40'}`}>
          {phase.description}
        </p>

        {/* Details list */}
        <ul className="space-y-1">
          {phase.details.map((detail, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + i * 0.05 }}
              className={`text-xs transition-colors duration-300 ${isActive ? 'text-white/50' : 'text-white/30'}`}
            >
              • {detail}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const progress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="relative bg-[#0A0A0A] py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header with progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-white/40 text-sm tracking-widest uppercase mb-4">How We Work</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Our Process</h2>
          
          {/* Progress bar */}
          <div className="max-w-md mx-auto">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"
                style={{ scaleX: progress, transformOrigin: "left" }}
              />
            </div>
            <div className="flex justify-between mt-2">
              {phases.map((_, i) => (
                <span key={i} className="text-white/30 text-xs font-mono">0{i + 1}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          className="flex flex-col lg:flex-row gap-8 lg:gap-4"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [0.5, 1]) }}
        >
          {phases.map((phase, index) => (
            <TimelineStep 
              key={phase.title} 
              phase={phase} 
              index={index}
              progress={useTransform(progress, v => v).get()}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;