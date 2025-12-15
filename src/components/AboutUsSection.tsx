import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";

const Bridge3D = lazy(() => import("./Bridge3D"));

const stats = [
  {
    value: 18,
    suffix: "+",
    prefix: "",
    label: "Projects Launched",
    description: "Successfully launched in Korea"
  },
  {
    value: 120,
    suffix: "+",
    prefix: "",
    label: "KOL Network",
    description: "Influencers & creators"
  },
  {
    value: 2.5,
    suffix: "M+",
    prefix: "$",
    label: "Token Sales",
    description: "Total token sales supported"
  },
  {
    value: 38,
    suffix: "+",
    prefix: "",
    label: "AMA Hosting",
    description: "AMAs hosted for projects"
  }
];

const StatCard = ({
  stat,
  index,
  isVisible
}: {
  stat: typeof stats[0];
  index: number;
  isVisible: boolean;
}) => {
  const formattedCount = useCountUp({
    end: stat.value,
    duration: 2000,
    prefix: stat.prefix,
    suffix: stat.suffix,
    isVisible
  });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative py-8 md:py-12 border-b border-white/10 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
    >
      <div className="px-4 md:px-8">
        {/* a41 style: 01 / label format */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-white/30 font-mono text-sm">
            {String(index + 1).padStart(2, '0')} /
          </span>
          <span className="text-white/50 text-sm uppercase tracking-wider">
            {stat.label}
          </span>
        </div>
        
        {/* Large number */}
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tabular-nums mb-2">
          {formattedCount}
        </div>
        
        {/* Description */}
        <p className="text-white/40 text-sm">
          {stat.description}
        </p>
      </div>
    </motion.div>
  );
};

const AboutUsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section ref={ref} className="relative bg-[#0A0A0B] py-16 md:py-24 overflow-hidden">
      {/* 3D Bridge Background */}
      <Suspense fallback={null}>
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ minHeight: '400px' }}>
          <Bridge3D className="w-full h-full" />
        </div>
      </Suspense>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-[#0A0A0B]/50 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* a41 style header */}
        <motion.div 
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-white/30 font-mono text-sm">[ METRICS ]</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            The Numbers
          </h2>
        </motion.div>

        {/* a41 style stats grid - horizontal dividers on mobile, vertical on desktop */}
        <div className="grid md:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
