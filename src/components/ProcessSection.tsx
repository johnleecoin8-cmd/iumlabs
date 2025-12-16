import { motion } from "framer-motion";
import { Search, Target, Rocket, TrendingUp } from "lucide-react";

const phases = [
  {
    number: "01",
    title: "Discovery",
    icon: Search,
    description: "Deep-dive into your project, market positioning, and Korean audience fit."
  },
  {
    number: "02",
    title: "Strategy",
    icon: Target,
    description: "Build GTM roadmap, channel mix, and localized messaging framework."
  },
  {
    number: "03",
    title: "Launch",
    icon: Rocket,
    description: "Execute campaigns across KOLs, community, PR, and social channels."
  },
  {
    number: "04",
    title: "Scale",
    icon: TrendingUp,
    description: "Optimize, iterate, and expand based on performance data."
  }
];

const ProcessSection = () => {
  return (
    <section className="bg-[#0A0A0A]">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          const isLast = index === phases.length - 1;
          
          return (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`p-4 md:p-6 ${
                !isLast ? "border-r border-white/10" : ""
              } ${index < 2 ? "border-b lg:border-b-0 border-white/10" : ""}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                <h3 className="text-sm font-medium text-white">
                  {phase.title}
                </h3>
                <span className="text-[10px] text-white/20 font-mono ml-auto">{phase.number}</span>
              </div>
              
              <p className="text-white/40 text-xs leading-relaxed">
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
