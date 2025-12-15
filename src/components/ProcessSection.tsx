import { motion } from "framer-motion";
import { Search, Lightbulb, Rocket, TrendingUp, ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

const phases = [
  {
    number: "01",
    title: "DISCOVERY",
    description: "Deep dive into your project, audience, and competitive landscape.",
    commitment: "Market research & analysis",
    icon: Search,
    timeline: "Week 1",
    deliverables: ["Market Research Report", "Competitor Analysis", "Audience Mapping"]
  },
  {
    number: "02",
    title: "STRATEGY",
    description: "Custom GTM plan with clear milestones and KPIs.",
    commitment: "Tailored action plan",
    icon: Lightbulb,
    timeline: "Week 2",
    deliverables: ["GTM Strategy Doc", "Content Calendar", "KOL Selection"]
  },
  {
    number: "03",
    title: "LAUNCH",
    description: "Execute across all channels with precision timing.",
    commitment: "Full campaign execution",
    icon: Rocket,
    timeline: "Week 3",
    deliverables: ["Campaign Launch", "Community Setup", "Media Coverage"]
  },
  {
    number: "04",
    title: "SCALE",
    description: "Optimize, iterate, and amplify what works.",
    commitment: "Continuous growth",
    icon: TrendingUp,
    timeline: "Ongoing",
    deliverables: ["Performance Reports", "Strategy Optimization", "Growth Scaling"]
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
        
        {/* Headline */}
        <motion.div 
          className="mb-16 -mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            From Zero to <span className="text-primary">Korean Hype</span> in 30 Days
          </h3>
          <p className="text-gray-500 max-w-2xl">
            Our battle-tested process delivers measurable results, not just promises.
          </p>
        </motion.div>

        {/* a41-style Large Step Display */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            
            return (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Connection Line */}
                {index < phases.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-px bg-gradient-to-r from-gray-300 to-transparent z-0" />
                )}

                {/* Card */}
                <div className="relative bg-white rounded-2xl p-6 md:p-8 border border-gray-200 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full">
                  {/* Large Number Background */}
                  <span className="absolute top-4 right-4 text-6xl md:text-7xl font-bold text-gray-100 group-hover:text-primary/10 transition-colors">
                    {phase.number}
                  </span>

                  {/* Timeline Badge */}
                  <span className="inline-block text-xs font-mono px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors mb-6">
                    {phase.timeline}
                  </span>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-7 h-7 text-gray-600 group-hover:text-primary transition-colors" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {phase.title}
                  </h3>

                  {/* Commitment */}
                  <p className="text-sm font-medium text-primary mb-3">
                    {phase.commitment}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4">
                    {phase.description}
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-2">
                    {phase.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
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
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors group"
          >
            Book a Free Call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
