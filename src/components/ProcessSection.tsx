import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Bridge3D from "./Bridge3D";
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
    <section className="relative bg-[#0A0A0B] py-20 md:py-28 overflow-hidden">
      {/* 3D Beams Bridge - Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] opacity-20 z-0 pointer-events-none">
        <Bridge3D type="beams" color="#3B82F6" secondaryColor="#06B6D4" className="w-full h-full" />
      </div>
      
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Header */}
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
            From Zero to <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Korean Hype</span> in 30 Days
          </h3>
          <p className="text-white/50 max-w-2xl text-lg">
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
              <div className="relative bg-white/[0.02] rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 ease-out hover:-translate-y-2 h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={phase.image} 
                    alt={phase.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/60 to-transparent" />
                  
                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/[0.08] backdrop-blur-sm flex items-center justify-center border border-white/10">
                    <span className="text-lg font-bold text-white/70">{phase.number}</span>
                  </div>
                  
                  {/* Timeline Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-sm text-xs font-medium text-white/70 border border-white/10">
                      {phase.timeline}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-500">
                    {phase.title}
                  </h4>
                  
                  <p className="text-sm font-medium bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent mb-3">
                    {phase.commitment}
                  </p>
                  
                  <p className="text-white/50 text-sm mb-4">
                    {phase.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {phase.highlights.map((item, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-medium text-white/60 group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary transition-all duration-500"
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
          <p className="text-white/50 mb-4">Ready to start your journey?</p>
          <a 
            href="https://calendly.com/cryptobridgekorea/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-cyan-500 text-white px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 group"
          >
            Book a Free Call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
