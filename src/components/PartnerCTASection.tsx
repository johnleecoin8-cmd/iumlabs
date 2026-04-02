import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CalendlyButton from "@/components/CalendlyButton";

const PartnerCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center bg-[#0A0A0A] border-t border-white/[0.06]"
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16 md:py-20">
        {/* Headline */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          한국 시장,
          <br />
          <span className="italic font-light">같이 뚫자.</span>
        </motion.h2>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CalendlyButton
            className="px-8 py-3.5 bg-white text-black font-medium text-sm tracking-wide hover:bg-white/90 transition-colors"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerCTASection;
