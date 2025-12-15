import { motion } from "framer-motion";
import { Search, Lightbulb, Rocket, TrendingUp } from "lucide-react";
import SectionHeader from "./SectionHeader";

const phases = [
  {
    number: "01",
    title: "DISCOVERY",
    description: "Deep dive into your project, audience, and competitive landscape.",
    icon: Search,
    timeline: "Week 1"
  },
  {
    number: "02",
    title: "STRATEGY",
    description: "Custom GTM plan with clear milestones and KPIs.",
    icon: Lightbulb,
    timeline: "Week 2"
  },
  {
    number: "03",
    title: "LAUNCH",
    description: "Execute across all channels with precision timing.",
    icon: Rocket,
    timeline: "Week 3"
  },
  {
    number: "04",
    title: "SCALE",
    description: "Optimize, iterate, and amplify what works.",
    icon: TrendingUp,
    timeline: "Ongoing"
  }
];

const ProcessSection = () => {
  return (
    <section className="relative bg-gray-50 py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* 4pillars-style Header */}
        <SectionHeader 
          title="PROCESS" 
          dark={false}
        />
        
        {/* Subtitle */}
        <motion.div 
          className="text-center mb-16 -mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
            From Zero to <span className="text-gray-400">Korean Hype</span>
          </h3>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Our battle-tested process delivers measurable results in 30 days.
          </p>
        </motion.div>

        {/* Stats Bar Style Process */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
          <div className="grid md:grid-cols-4">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isLast = index === phases.length - 1;
              
              return (
                <motion.div
                  key={phase.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`p-8 md:p-10 ${!isLast ? 'md:border-r border-gray-100' : ''} ${index > 0 ? 'border-t md:border-t-0 border-gray-100' : ''}`}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Number + Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl md:text-5xl font-black text-gray-200">
                      {phase.number}
                    </span>
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      / {phase.title}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {phase.description}
                  </p>

                  {/* Timeline Badge */}
                  <span className="inline-block text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                    {phase.timeline}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 mb-4">Ready to start your journey?</p>
          <a 
            href="https://calendly.com/cryptobridgekorea/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Book a Free Call
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
