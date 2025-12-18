import { motion } from "framer-motion";
import { Search, Target, Rocket, TrendingUp } from "lucide-react";

const phases = [
  {
    title: "Discovery",
    icon: Search,
    description: "Deep-dive into your project, market positioning, and Korean audience fit.",
    week: "Week 1",
    color: "#3B82F6",
  },
  {
    title: "Strategy",
    icon: Target,
    description: "Build GTM roadmap, channel mix, and localized messaging framework.",
    week: "Week 2",
    color: "#06B6D4",
  },
  {
    title: "Launch",
    icon: Rocket,
    description: "Execute campaigns across KOLs, community, PR, and social channels.",
    week: "Week 3",
    color: "#10B981",
  },
  {
    title: "Scale",
    icon: TrendingUp,
    description: "Optimize, iterate, and expand based on performance data.",
    week: "Week 4+",
    color: "#22C55E",
  }
];

const ProcessSection = () => {
  return (
    <section className="bg-[#0A0A0A] relative overflow-hidden py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p 
            className="text-white/40 text-sm uppercase tracking-wider mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            From Zero to Korean Hype
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            in <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">30 Days</span>
          </motion.h2>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 opacity-30" />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          {/* Timeline Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <motion.div
                  key={phase.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Timeline Node */}
                  <div className="flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0">
                    {/* Node Circle */}
                    <motion.div
                      className="relative z-10 w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center border-2 bg-[#0A0A0A]"
                      style={{ 
                        borderColor: phase.color,
                        boxShadow: `0 0 20px ${phase.color}40`
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Icon className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: phase.color }} />
                    </motion.div>

                    {/* Content Card */}
                    <div className="flex-1 lg:mt-8 lg:text-center">
                      <p 
                        className="text-xs font-mono mb-2"
                        style={{ color: phase.color }}
                      >
                        {phase.week}
                      </p>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {phase.title}
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  </div>

                  {/* Mobile Connector Line */}
                  {index < phases.length - 1 && (
                    <div className="lg:hidden absolute left-6 top-12 w-px h-full bg-gradient-to-b from-white/20 to-transparent" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-white/40 text-sm mb-4">Ready to start?</p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
          >
            Let's discuss your project
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
