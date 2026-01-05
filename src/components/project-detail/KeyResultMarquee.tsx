import { motion } from "framer-motion";

interface KeyResultMarqueeProps {
  result: string;
  glowColor: string;
}

const KeyResultMarquee = ({ result, glowColor }: KeyResultMarqueeProps) => {
  const displayText = result || "key result";
  
  return (
    <div 
      className="py-4 overflow-hidden"
      style={{ backgroundColor: '#D4FF00' }}
    >
      <motion.div 
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -1200] }}
        transition={{ 
          repeat: Infinity, 
          duration: 25, 
          ease: "linear" 
        }}
      >
        {Array(20).fill(displayText).map((text, i) => (
          <span 
            key={i} 
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: glowColor }}
          >
            {text} •
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default KeyResultMarquee;
