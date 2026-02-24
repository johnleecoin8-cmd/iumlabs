import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import CalendlyButton from "@/components/CalendlyButton";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "15+", label: "Projects" },
  { value: "$50M+", label: "Ecosystem Value" },
  { value: "24h", label: "Response" },
];

const PartnerCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] flex items-center justify-center bg-[#0A0A0A] border-t border-white/[0.06]"
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24 md:py-32">
        {/* Label */}
        <motion.span
          className="block text-[10px] tracking-[0.35em] text-white/30 font-mono uppercase mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0 }}
        >
          Let's Work Together
        </motion.span>

        {/* Headline */}
        <motion.h2
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] font-bold text-white leading-[1.05] tracking-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span className="italic font-light">Your Bridge</span>
          <br />
          to Korea.
        </motion.h2>

        {/* Sub text */}
        <motion.p
          className="text-white/35 text-sm md:text-base max-w-md mb-16 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          From strategy to execution — we are your all-in-one partner for the Korean Web3 market.
        </motion.p>

        {/* Stats - minimal inline */}
        <motion.div
          className="flex items-center gap-6 md:gap-8 text-white/40 text-xs font-mono tracking-widest uppercase mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6 md:gap-8">
              {i > 0 && <span className="text-white/15">—</span>}
              <span>
                <span className="text-white/70 font-semibold">{stat.value}</span>{" "}
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-start gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <CalendlyButton
            className="px-8 py-3.5 bg-white text-black font-medium text-sm tracking-wide hover:bg-white/90 transition-colors"
          />
          <Link
            to="/projects"
            className="group flex items-center gap-2 px-2 py-3.5 text-white/50 hover:text-white/80 transition-colors text-sm tracking-wide"
          >
            View Our Work
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerCTASection;
