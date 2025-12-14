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

// Floating tags for light background
const floatingTags = [{
  label: "Korea Expert",
  top: "8%",
  left: "5%",
  delay: 0
}, {
  label: "24/7 Support",
  top: "15%",
  right: "8%",
  delay: 0.2
}, {
  label: "VASP Compliant",
  bottom: "20%",
  left: "3%",
  delay: 0.4
}, {
  label: "120+ KOLs",
  bottom: "12%",
  right: "5%",
  delay: 0.6
}];
const mobileFloatingTags = [{
  label: "Korea Expert",
  top: "3%",
  left: "5%",
  delay: 0
}, {
  label: "120+ KOLs",
  top: "3%",
  right: "5%",
  delay: 0.2
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
  return <motion.div initial={{
    opacity: 0,
    y: 30
  }} animate={isVisible ? {
    opacity: 1,
    y: 0
  } : {
    opacity: 0,
    y: 30
  }} transition={{
    duration: 0.6,
    delay: index * 0.1 + 0.3
  }} className="group relative p-6 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:border-primary/40 transition-all duration-500 overflow-hidden hover:-translate-y-1">
      {/* Animated gradient background */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br ${stat.glowColor}`} />
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
      
      {/* Corner glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
        <stat.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
      </div>
      
      <div className="mt-8 relative z-10">
        <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1 tabular-nums group-hover:text-primary transition-colors duration-300">
          {formattedCount}
        </div>
        <div className="text-gray-700 font-medium text-sm mb-1">
          {stat.label}
        </div>
        <div className="text-gray-500 text-xs group-hover:text-gray-700 transition-colors">
          {stat.description}
        </div>
      </div>
    </motion.div>;
};
const AboutUsSection = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  return;
};
export default AboutUsSection;