import { motion } from "framer-motion";
import { Search, Target, Rocket, TrendingUp } from "lucide-react";

const phases = [
  {
    number: "01",
    title: "DISCOVERY",
    icon: Search,
    timeline: "Week 1",
    description: "Deep-dive into your project, market positioning, and Korean audience fit."
  },
  {
    number: "02",
    title: "STRATEGY",
    icon: Target,
    timeline: "Week 2",
    description: "Build GTM roadmap, channel mix, and localized messaging framework."
  },
  {
    number: "03",
    title: "LAUNCH",
    icon: Rocket,
    timeline: "Week 3-4",
    description: "Execute campaigns across KOLs, community, PR, and social channels."
  },
  {
    number: "04",
    title: "SCALE",
    icon: TrendingUp,
    timeline: "Ongoing",
    description: "Optimize, iterate, and expand based on performance data."
  }
];

const ProcessSection = () => {
  return (
    <section className="bg-[#0A0A0A] text-white">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          return (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 md:p-12 ${
                index < phases.length - 1 ? "border-r border-white/10" : ""
              } ${index < 2 ? "border-b md:border-b-0 border-white/10" : ""}`}
            >
              <Icon className="w-8 h-8 mb-6 text-white/60" strokeWidth={1.5} />
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-white/40 text-sm font-mono">{phase.number}</span>
                <span className="text-white/40 text-sm">/</span>
                <span className="text-lg font-semibold tracking-wide">{phase.title}</span>
              </div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-4">
                {phase.timeline}
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                {phase.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ProcessSection;
