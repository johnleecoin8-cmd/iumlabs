import { motion } from "framer-motion";

interface KeyResultMarqueeProps {
  result: string;
  glowColor: string;
}

const KeyResultMarquee = ({ result, glowColor }: KeyResultMarqueeProps) => {
  if (!result) return null;
  
  // Create items for seamless loop (duplicated for continuous scroll)
  const items = [...Array(12)].map((_, i) => i);
  
  return (
    <motion.div 
      className="relative z-10 border-t border-white/15 py-3 sm:py-4 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Left section indicator */}
      <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white/50 text-xs z-20">
        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-medium">
          01
        </span>
      </div>

      {/* Marquee content */}
      <div className="flex items-center logo-marquee-slow ml-12 sm:ml-20">
        {[...items, ...items].map((idx, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 sm:gap-2.5 mx-1.5 sm:mx-2.5 px-3 sm:px-5 py-1.5 sm:py-2.5 bg-zinc-900/80 rounded-full border border-white/15 hover:border-white/25 transition-all duration-300"
          >
            {/* Project color dot */}
            <span 
              className="w-2 h-2 rounded-full flex-shrink-0" 
              style={{ backgroundColor: glowColor }} 
            />
            {/* Key Result text */}
            <span className="text-white/75 text-sm font-medium whitespace-nowrap">
              {result}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default KeyResultMarquee;
