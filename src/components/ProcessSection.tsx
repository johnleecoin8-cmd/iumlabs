import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Process phases data - commitment-based approach
const phases = [
  {
    number: "01",
    title: "Discovery",
    timeline: "Week 1",
    commitment: "We'll understand your project deeply",
    description: "Deep dive into your project goals, target audience, and competitive landscape in the Korean market.",
    deliverables: [
      "Market readiness assessment",
      "Competitor mapping",
      "Opportunity identification"
    ]
  },
  {
    number: "02",
    title: "Strategy",
    timeline: "Week 2",
    commitment: "You'll have a clear roadmap",
    description: "Develop a comprehensive go-to-market strategy tailored for Korean market entry and growth.",
    deliverables: [
      "GTM strategy document",
      "Channel selection",
      "Timeline & milestones"
    ]
  },
  {
    number: "03",
    title: "Launch",
    timeline: "Week 3-4",
    commitment: "Your project goes live in Korea",
    description: "Execute across all channels—community, KOLs, PR, and events—with full coordination.",
    deliverables: [
      "Community activation",
      "KOL campaign launch",
      "Media coverage"
    ]
  },
  {
    number: "04",
    title: "Scale",
    timeline: "Ongoing",
    commitment: "We'll grow together",
    description: "Continuous optimization, reporting, and strategic expansion based on performance data.",
    deliverables: [
      "Weekly performance reports",
      "Growth optimization",
      "Strategic recommendations"
    ]
  }
];

const ProcessSection = () => {
  return (
    <section className="bg-[#0A0A0B] py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header - VaynerMedia style impact headline */}
        <motion.div 
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-left">
            <span className="text-white/30">From Zero to</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
              Korean Hype
            </span>
            <br />
            <span className="text-white">in 30 Days</span>
          </h2>
          <p className="text-white/50 text-lg md:text-xl mt-6 max-w-xl">
            Our battle-tested process delivers measurable results, not just promises.
          </p>
        </motion.div>

        {/* Timeline Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Connection Line (desktop only) */}
              {index < phases.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-white/20 to-transparent z-0" />
              )}

              {/* Card */}
              <div className="relative h-full border border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.04] p-6 md:p-8 transition-all duration-300">
                {/* Number */}
                <div className="flex items-start justify-between mb-6">
                  <span className="text-white/20 font-mono text-sm">[{phase.number}]</span>
                  <span className="text-xs font-mono px-2 py-1 bg-white/10 text-white/60">
                    {phase.timeline}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {phase.title}
                </h3>

                {/* Commitment - key differentiator */}
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 font-medium text-sm mb-4">
                  {phase.commitment}
                </p>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {phase.description}
                </p>

                {/* Deliverables */}
                <div className="space-y-2 mb-6">
                  {phase.deliverables.map((deliverable, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2 text-white/40 text-sm"
                    >
                      <div className="w-1 h-1 bg-amber-500 rounded-full" />
                      <span>{deliverable}</span>
                    </div>
                  ))}
                </div>

                {/* Arrow indicator on hover */}
                <div className="flex items-center gap-2 text-white/30 group-hover:text-white/60 transition-colors">
                  <span className="text-xs font-mono">Learn more</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA - commitment statement */}
        <motion.div 
          className="mt-16 md:mt-24 pt-12 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Ready to start?
              </h3>
              <p className="text-white/50">
                Book a free strategy call to discuss your Korean market entry.
              </p>
            </div>
            <a 
              href="https://calendly.com/cryptobridgekorea/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold hover:from-amber-400 hover:to-orange-400 transition-all group"
            >
              Book a Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
