import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { TrendingUp, Users, Building2, Handshake } from "lucide-react";
import { motion } from "framer-motion";

const stats = [{
  value: 18,
  suffix: "+",
  prefix: "",
  label: "Projects Launched",
  icon: TrendingUp,
  description: "Successfully launched in Korea"
}, {
  value: 120,
  suffix: "+",
  prefix: "",
  label: "KOL Network",
  icon: Users,
  description: "Influencers & creators"
}, {
  value: 2.5,
  suffix: "M+",
  prefix: "$",
  label: "Token Sales",
  icon: Building2,
  description: "Total token sales supported"
}, {
  value: 38,
  suffix: "+",
  prefix: "",
  label: "AMA Hosting",
  icon: Handshake,
  description: "AMAs hosted for projects"
}];

const floatingTags: { label: string; top?: string; left?: string; right?: string; bottom?: string; delay: number }[] = [
  { label: "Korea Expert", top: "10%", left: "5%", delay: 0 },
  { label: "24/7 Support", top: "15%", right: "8%", delay: 0.2 },
  { label: "VASP Compliant", bottom: "25%", left: "3%", delay: 0.4 },
  { label: "120+ KOLs", bottom: "20%", right: "5%", delay: 0.6 }
];

const mobileFloatingTags: { label: string; top?: string; left?: string; right?: string; bottom?: string; delay: number }[] = [
  { label: "Korea Expert", top: "3%", left: "5%", delay: 0 },
  { label: "120+ KOLs", top: "3%", right: "5%", delay: 0.2 }
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
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
      className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.06] hover:border-primary/40 transition-all duration-500 overflow-hidden hover:-translate-y-1"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      </div>
      
      {/* Corner glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
        <stat.icon className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors duration-300" />
      </div>
      
      <div className="mt-8 relative z-10">
        <div className="text-3xl md:text-4xl font-bold text-white mb-1 tabular-nums group-hover:text-primary transition-colors duration-300">
          {formattedCount}
        </div>
        <div className="text-white/70 font-medium text-sm mb-1">
          {stat.label}
        </div>
        <div className="text-white/40 text-xs group-hover:text-white/60 transition-colors">
          {stat.description}
        </div>
      </div>
    </motion.div>
  );
};

const AboutUsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div ref={ref} className="relative min-h-[50vh] bg-[#0A0A0B] py-16 md:py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      
      {/* Floating Tags - Desktop */}
      <div className="hidden sm:block">
        {floatingTags.map((tag, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: tag.delay + 0.2 }}
            className="absolute z-10 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/60 text-xs font-medium hover:bg-white/[0.06] hover:border-white/20 hover:text-white transition-all duration-300 cursor-default backdrop-blur-sm"
            style={{
              top: tag.top,
              left: tag.left,
              right: tag.right,
              bottom: tag.bottom
            }}
          >
            {tag.label}
          </motion.div>
        ))}
      </div>

      {/* Floating Tags - Mobile */}
      <div className="sm:hidden">
        {mobileFloatingTags.map((tag, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: tag.delay + 0.2 }}
            className="absolute z-10 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/60 text-[10px] font-medium backdrop-blur-sm"
            style={{
              top: tag.top,
              left: tag.left,
              right: tag.right,
              bottom: tag.bottom
            }}
          >
            {tag.label}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-white/40 text-xs font-mono tracking-widest uppercase mb-4 block">
            [ 02 ] ── Our Impact
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            The Numbers <span className="text-primary">Speak</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
