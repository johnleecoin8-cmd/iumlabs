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
  description: "Successfully launched in Korea",
  glowColor: "from-emerald-500/20 to-cyan-500/10"
}, {
  value: 120,
  suffix: "+",
  prefix: "",
  label: "KOL Network",
  icon: Users,
  description: "Influencers & creators",
  glowColor: "from-primary/20 to-purple-500/10"
}, {
  value: 2.5,
  suffix: "M+",
  prefix: "$",
  label: "Token Sales",
  icon: Building2,
  description: "Total token sales supported",
  glowColor: "from-cyan-500/20 to-blue-500/10"
}, {
  value: 38,
  suffix: "+",
  prefix: "",
  label: "AMA Hosting",
  icon: Handshake,
  description: "AMAs hosted for projects",
  glowColor: "from-purple-500/20 to-pink-500/10"
}];

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
      className="group relative p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.06] transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
    >
      {/* Animated gradient background */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br ${stat.glowColor}`} />
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

      <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 border border-primary/20">
        <stat.icon className="w-5 h-5 text-primary" />
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
    <section ref={ref} className="bg-[#0A0A0B] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        {/* Option B Header */}
        <div className="relative mb-12 md:mb-16">
          <span className="absolute -top-8 left-0 text-[100px] md:text-[140px] font-bold text-white/[0.03] leading-none pointer-events-none select-none">
            06
          </span>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="text-white/50">The</span>{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Numbers
              </span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mt-4 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;