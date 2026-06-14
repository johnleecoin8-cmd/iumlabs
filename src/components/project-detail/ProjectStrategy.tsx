import { motion } from "framer-motion";

interface ProjectStrategyProps {
  strategy: string[];
  glowColor: string;
  intro?: string;
}

const ProjectStrategy = ({ strategy, intro }: ProjectStrategyProps) => {
  if (!strategy || strategy.length === 0) return null;

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
            <span className="font-mono text-xs text-white/30">02</span>
            <span className="text-xs uppercase tracking-[0.25em] text-white/40">Our Strategy</span>
          </div>

          {intro && (
            <p className="mt-8 max-w-4xl text-xl font-light leading-snug text-white/85 md:text-2xl lg:text-[1.75rem] lg:leading-[1.35]">
              {intro}
            </p>
          )}

          <ol className="mt-12">
            {strategy.map((step, i) => (
              <motion.li
                key={i}
                className="grid grid-cols-[auto_1fr] items-start gap-6 border-t border-white/10 py-7 last:border-b md:gap-12 md:py-9"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <span className="pt-1 font-mono text-sm text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="max-w-3xl text-lg font-light leading-snug text-white/85 md:text-2xl">
                  {step}
                </p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectStrategy;
