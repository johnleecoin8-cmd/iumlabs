import { motion } from "framer-motion";
import { Search, Target, Rocket, TrendingUp } from "lucide-react";

const phases = [
  {
    title: "Discovery",
    icon: Search,
    description: "Deep-dive into your project, market positioning, and Korean audience fit."
  },
  {
    title: "Strategy",
    icon: Target,
    description: "Build GTM roadmap, channel mix, and localized messaging framework."
  },
  {
    title: "Launch",
    icon: Rocket,
    description: "Execute campaigns across KOLs, community, PR, and social channels."
  },
  {
    title: "Scale",
    icon: TrendingUp,
    description: "Optimize, iterate, and expand based on performance data."
  }
];

interface ProcessSectionProps {
  bgColor?: string;
}

const ProcessSection = ({ bgColor = "#0A0A0A" }: ProcessSectionProps) => {
  return (
    <section style={{ backgroundColor: bgColor }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          const isLast = index === phases.length - 1;
          const isOdd = index % 2 === 1;
          
          return (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`group p-8 md:p-10 transition-all duration-300 hover:bg-white/5 ${
                !isLast ? "lg:border-r border-white/10" : ""
              } ${isOdd ? "md:border-l lg:border-l-0 border-white/10" : ""} ${
                index < 2 ? "border-b lg:border-b-0 border-white/10" : ""
              }`}
            >
              <Icon className="w-8 h-8 mb-4 text-white/40 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300" strokeWidth={1.5} />
              
              <h3 className="text-lg font-semibold text-white mb-3">
                {phase.title}
              </h3>
              
              <p className="text-white/50 text-sm leading-relaxed">
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
