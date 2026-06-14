import { motion } from "framer-motion";
import { ProjectMetric } from "@/data/projectsData";
import { useCountUp } from "@/hooks/useCountUp";

interface ProjectResultsProps {
  metrics: ProjectMetric[];
  glowColor: string;
  headline?: string;
  timeline?: string;
  duration?: string;
}

const ResultStat = ({ metric, index }: { metric: ProjectMetric; index: number }) => {
  const numericMatch = metric.value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  const prefix = numericMatch ? numericMatch[1] : "";
  const numericValue = numericMatch ? parseFloat(numericMatch[2].replace(/,/g, "")) : 0;
  const suffix = numericMatch ? numericMatch[3] : metric.value;
  const displayValue = useCountUp({ end: numericValue, duration: 2000, prefix, suffix, isVisible: true });

  return (
    <motion.div
      className="border-t border-white/10 pt-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <span className="block text-4xl font-light leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
        {numericMatch ? displayValue : metric.value}
      </span>
      <span className="mt-3 block text-sm leading-relaxed text-white/50">{metric.label}</span>
    </motion.div>
  );
};

const ProjectResults = ({ metrics, headline }: ProjectResultsProps) => {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <motion.div
          className="border-t border-white/10 py-16 md:py-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs text-white/30">03</span>
            <span className="text-xs uppercase tracking-[0.25em] text-white/40">The Results</span>
          </div>

          {headline && (
            <p className="mt-8 max-w-4xl text-2xl font-light leading-snug text-white md:text-3xl lg:text-[2.5rem] lg:leading-[1.2]">
              {headline}
            </p>
          )}

          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {metrics.map((metric, idx) => (
              <ResultStat key={idx} metric={metric} index={idx} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectResults;
