import { motion } from "framer-motion";
import { ProjectMetric } from "@/data/projectsData";
import { useCountUp } from "@/hooks/useCountUp";

interface ProjectResultsProps {
  metrics: ProjectMetric[];
  glowColor: string;
  timeline?: string;
  duration?: string;
}

const ResultCard = ({ metric, index, glowColor }: { metric: ProjectMetric; index: number; glowColor: string }) => {
  const numericMatch = metric.value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  const prefix = numericMatch ? numericMatch[1] : "";
  const numericValue = numericMatch ? parseFloat(numericMatch[2].replace(/,/g, "")) : 0;
  const suffix = numericMatch ? numericMatch[3] : metric.value;
  const displayValue = useCountUp({ end: numericValue, duration: 2200, prefix, suffix, isVisible: true });

  return (
    <motion.div
      className="relative p-5 md:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm overflow-hidden group"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="absolute top-0 left-0 h-[2px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)` }} />
      <span className="block text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-tight leading-none">
        {numericMatch ? displayValue : metric.value}
      </span>
      <span className="block text-[10px] md:text-xs text-white/50 mt-2 tracking-wide">{metric.label}</span>
    </motion.div>
  );
};

const ProjectResults = ({ metrics, glowColor, timeline, duration }: ProjectResultsProps) => {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="py-14 md:py-20 bg-[#0A0A0A]">
      <div className="px-4 md:px-8 lg:px-12">
        <motion.div
          className="flex items-baseline justify-between border-b border-white/10 pb-4 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-baseline gap-4 md:gap-6">
            <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest">02</span>
            <h2 className="text-lg md:text-xl font-medium text-white">Results</h2>
          </div>
          <div className="flex items-center gap-4">
            {duration && <span className="text-[10px] md:text-xs text-white/40 tracking-wider">{duration}</span>}
            {timeline && <span className="text-[10px] md:text-xs text-white/40 tracking-wider px-3 py-1 border border-white/10 rounded-full">{timeline}</span>}
          </div>
        </motion.div>

        <div className={`grid gap-3 md:gap-4 ${metrics.length <= 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"}`}>
          {metrics.map((metric, idx) => (
            <ResultCard key={idx} metric={metric} index={idx} glowColor={glowColor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectResults;
