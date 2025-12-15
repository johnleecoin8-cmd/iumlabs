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
    <section className="bg-[#FAFAFA] py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Option B Header - Unified */}
        <motion.div 
          className="relative mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Large background number */}
          <span className="absolute -top-8 left-0 text-[100px] md:text-[140px] lg:text-[180px] font-bold text-black/[0.03] leading-none pointer-events-none select-none">
            02
          </span>
          
          {/* Title */}
          <div className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="text-gray-400">Our</span>{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mt-4 rounded-full" />
            <p className="text-gray-500 text-base md:text-lg mt-6 max-w-xl">
              From Zero to Korean Hype in 30 Days
            </p>
          </div>
        </motion.div>

        {/* Timeline Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Connection Line (desktop only) */}
              {index < phases.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-gray-300 to-transparent z-0" />
              )}

              {/* Card - Unified Style */}
              <div className="relative h-full bg-white rounded-2xl border border-gray-200 hover:border-primary/30 hover:shadow-lg p-6 transition-all duration-300">
                {/* Number & Timeline */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-gray-400 text-xs uppercase tracking-wider">
                    {phase.timeline}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {phase.title}
                </h3>

                {/* Commitment */}
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 font-semibold text-sm mb-3">
                  {phase.commitment}
                </p>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {phase.description}
                </p>

                {/* Deliverables */}
                <div className="space-y-2 mb-4">
                  {phase.deliverables.map((deliverable, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2 text-gray-500 text-sm"
                    >
                      <div className="w-1 h-1 bg-amber-500 rounded-full" />
                      <span>{deliverable}</span>
                    </div>
                  ))}
                </div>

                {/* Learn more */}
                <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-900 transition-colors duration-300 text-sm">
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA - commitment statement */}
        <motion.div 
          className="mt-16 md:mt-20 pt-12 border-t border-gray-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Ready to start?
              </h3>
              <p className="text-gray-500">
                Book a free strategy call to discuss your Korean market entry.
              </p>
            </div>
            <a 
              href="https://calendly.com/cryptobridgekorea/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors duration-300 text-sm group"
            >
              Book a Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;