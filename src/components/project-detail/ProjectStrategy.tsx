import { motion } from "framer-motion";

interface ProjectStrategyProps {
  strategy: string[];
  glowColor: string;
}

const ProjectStrategy = ({ strategy }: ProjectStrategyProps) => {
  if (!strategy || strategy.length === 0) return null;

  return (
    <section className="border-t border-white/[0.06]">
      <div className="px-6 lg:px-20 xl:px-24 py-16 md:py-24">
        <div className="flex items-center gap-6 lg:gap-8 mb-10 md:mb-14">
          <span className="text-[10px] md:text-xs text-white/20 font-mono tracking-widest">02</span>
          <h2 className="text-base md:text-lg font-medium text-white">Approach</h2>
        </div>

        <div className="space-y-0 divide-y divide-white/[0.06]">
          {strategy.slice(0, 6).map((step, i) => (
            <motion.div
              key={i}
              className="py-6 md:py-8 grid grid-cols-[40px_1fr] md:grid-cols-[60px_1fr] gap-4 md:gap-6 items-start"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            >
              <span className="text-xl md:text-2xl font-bold text-white/10 font-mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm md:text-base text-white/60 leading-[1.8]">
                {step}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectStrategy;
