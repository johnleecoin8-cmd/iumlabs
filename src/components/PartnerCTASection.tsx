import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import CalendlyButton from "@/components/CalendlyButton";

const stats = [
  { value: "15+", label: "Projects Delivered" },
  { value: "$50M+", label: "Ecosystem Value" },
  { value: "24h", label: "Response Time" },
];

const PartnerCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/[0.04] blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/[0.04] blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20 text-center">
        {/* Label */}
        <motion.span
          className="inline-block text-[11px] tracking-[0.3em] text-white/40 font-mono mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0 }}
        >
          PARTNER WITH US
        </motion.span>

        {/* Headline */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Ready to Enter
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Korea?
          </span>
        </motion.h2>

        {/* Sub text */}
        <motion.p
          className="text-white/50 text-base md:text-lg max-w-lg mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          From strategy to execution — we are your all-in-one bridge to the Korean Web3 market.
        </motion.p>

        {/* Stats */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-0 border-y border-white/10 py-8 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex-1 px-8 py-4 sm:py-0 ${
                i < stats.length - 1 ? "sm:border-r border-b sm:border-b-0 border-white/10" : ""
              }`}
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-white/40 tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <CalendlyButton
            className="w-full sm:w-auto px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors text-sm"
          />
          <Link
            to="/projects"
            className="w-full sm:w-auto px-8 py-3 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors text-sm text-center"
          >
            View Our Work
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerCTASection;
