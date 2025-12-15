import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import discoveryImg from "@/assets/process/discovery-research.jpg";
import strategyImg from "@/assets/process/strategy-planning.jpg";
import executionImg from "@/assets/process/execution-growth.jpg";

const phases = [
  {
    number: "01",
    title: "Discovery",
    timeline: "Week 1",
    description: "Deep dive into your project, audience, and competitive landscape in Korea.",
    commitment: "Market research & analysis",
    image: discoveryImg,
    highlights: ["Market Research", "Competitor Analysis", "Audience Mapping"]
  },
  {
    number: "02",
    title: "Strategy",
    timeline: "Week 2",
    description: "Custom GTM plan with clear milestones and KPIs for Korean market success.",
    commitment: "Tailored action plan",
    image: strategyImg,
    highlights: ["GTM Strategy", "Content Calendar", "KOL Selection"]
  },
  {
    number: "03",
    title: "Launch & Scale",
    timeline: "Week 3+",
    description: "Execute across all channels with precision timing, then optimize for growth.",
    commitment: "Full campaign execution",
    image: executionImg,
    highlights: ["Campaign Launch", "Performance Reports", "Growth Scaling"]
  }
];

const ProcessSection = () => {
  return (
    <section className="relative bg-[#F8F8F8] py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
            Our Process
          </span>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            From Zero to <span className="text-primary">Korean Hype</span> in 30 Days
          </h3>
          <p className="text-gray-500 max-w-2xl text-lg">
            Our battle-tested process delivers measurable results, not just promises.
          </p>
        </motion.div>

        {/* Process Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group"
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 h-full border border-gray-100">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={phase.image} 
                    alt={phase.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900">{phase.number}</span>
                  </div>
                  
                  {/* Timeline Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700">
                      {phase.timeline}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-500">
                    {phase.title}
                  </h4>
                  
                  <p className="text-sm font-medium text-primary mb-3">
                    {phase.commitment}
                  </p>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {phase.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {phase.highlights.map((item, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-500"
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
