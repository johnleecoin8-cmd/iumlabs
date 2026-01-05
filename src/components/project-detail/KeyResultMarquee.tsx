import { motion } from "framer-motion";

interface KeyResultMarqueeProps {
  result: string;
  glowColor: string;
}

const KeyResultMarquee = ({ result, glowColor }: KeyResultMarqueeProps) => {
  if (!result) return null;
  
  const items = [...Array(20)].map((_, i) => i);
  
  return (
    <motion.div 
      className="w-full py-3 sm:py-4 overflow-hidden rounded-b-3xl"
      style={{ backgroundColor: glowColor }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center logo-marquee-slow">
        {[...items, ...items].map((_, index) => (
          <span 
            key={index} 
            className="text-black font-semibold text-sm sm:text-base whitespace-nowrap mx-6 sm:mx-10"
          >
            {result}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default KeyResultMarquee;
