import { motion } from "framer-motion";
import { Search, Target, Rocket, TrendingUp } from "lucide-react";

const phases = [
  {
    number: "01",
    title: "Discovery",
    icon: Search,
    timeline: "Week 1",
    description: "Deep-dive into your project, market positioning, and Korean audience fit."
  },
  {
    number: "02",
    title: "Strategy",
    icon: Target,
    timeline: "Week 2",
    description: "Build GTM roadmap, channel mix, and localized messaging framework."
  },
  {
    number: "03",
    title: "Launch",
    icon: Rocket,
    timeline: "Week 3-4",
    description: "Execute campaigns across KOLs, community, PR, and social channels."
  },
  {
    number: "04",
    title: "Scale",
    icon: TrendingUp,
    timeline: "Ongoing",
    description: "Optimize, iterate, and expand based on performance data."
  }
];

const ProcessSection = () => {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          const isLast = index === phases.length - 1;
          const isOdd = index % 2 === 1;
          
          return (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 md:p-10 ${
                !isLast ? "lg:border-r border-gray-200" : ""
              } ${isOdd ? "md:border-l lg:border-l-0 border-gray-200" : ""} ${
                index < 2 ? "border-b lg:border-b-0 border-gray-200" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs text-gray-400 font-mono">[{phase.number}]</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">{phase.timeline}</span>
              </div>
              
              <Icon className="w-8 h-8 mb-4 text-gray-400" strokeWidth={1.5} />
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {phase.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed">
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
