import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

const phases = [
  {
    number: "01",
    title: "Discovery",
    timeline: "Week 1",
    description: "Deep dive into your project, audience, and competitive landscape in Korea.",
    deliverables: ["Market Research", "Competitor Analysis", "Audience Mapping"]
  },
  {
    number: "02",
    title: "Strategy",
    timeline: "Week 2",
    description: "Custom GTM plan with clear milestones and KPIs for Korean market success.",
    deliverables: ["GTM Strategy", "Content Calendar", "KOL Selection"]
  },
  {
    number: "03",
    title: "Launch & Scale",
    timeline: "Week 3+",
    description: "Execute across all channels with precision timing, then optimize for growth.",
    deliverables: ["Campaign Launch", "Performance Reports", "Growth Scaling"]
  }
];

const ProcessSection = () => {
  return (
    <section className="relative bg-[#0A0A0B] py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <SectionHeader 
          title="OUR PROCESS" 
          dark={true}
        />

        {/* Headline */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            From Zero to <span className="text-primary">Korean Hype</span> in 30 Days
          </h3>
          <p className="text-white/50 max-w-2xl text-lg">
            Our battle-tested process delivers measurable results, not just promises.
          </p>
        </motion.div>

        {/* a41 style: vertical numbered list */}
        <div className="space-y-0">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group border-t border-white/10 first:border-t-0"
            >
              <div className="py-10 md:py-14 grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                {/* Number */}
                <div className="md:col-span-1">
                  <span className="text-6xl md:text-7xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                    {phase.number}
                  </span>
                </div>

                {/* Title & Timeline */}
                <div className="md:col-span-3">
                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {phase.title}
                  </h4>
                  <span className="text-white/40 text-sm font-mono">
                    {phase.timeline}
                  </span>
                </div>

                {/* Description */}
                <div className="md:col-span-5">
                  <p className="text-white/60 text-base md:text-lg leading-relaxed">
                    {phase.description}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="md:col-span-3">
                  <div className="flex flex-wrap gap-2">
                    {phase.deliverables.map((item, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-medium text-white/50"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom border line */}
        <div className="border-t border-white/10" />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-between pt-10 md:pt-14"
        >
          <p className="text-white/40">Ready to start your journey?</p>
          <a 
            href="https://calendly.com/cryptobridgekorea/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-white hover:text-primary transition-colors"
          >
            <span className="text-lg font-medium">Book a Free Call</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
