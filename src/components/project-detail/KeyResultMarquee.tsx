import { motion } from "framer-motion";

interface KeyResultMarqueeProps {
  result: string;
  glowColor: string;
}

const KeyResultMarquee = ({ result, glowColor }: KeyResultMarqueeProps) => {
  if (!result) return null;
  
  // Create array for seamless loop
  const duplicatedItems = [...Array(8)].map((_, i) => i);
  
  return (
    <motion.div 
      className="w-full py-6 md:py-8 bg-black border-y border-white/10 overflow-hidden relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Left gradient overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      
      {/* Right gradient overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      
      {/* Marquee content */}
      <div className="flex items-center logo-marquee-slow">
        {duplicatedItems.map((idx) => (
          <div key={idx} className="flex items-center gap-6 md:gap-8 shrink-0 px-8 md:px-12">
            <span className="text-xs uppercase tracking-[0.2em] text-white/40 whitespace-nowrap">
              Key Result
            </span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: glowColor }} />
            <span 
              className="text-xl md:text-2xl lg:text-3xl font-medium whitespace-nowrap"
              style={{ color: glowColor }}
            >
              {result}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default KeyResultMarquee;
