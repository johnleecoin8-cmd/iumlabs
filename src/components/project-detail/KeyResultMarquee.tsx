import { motion } from "framer-motion";

interface KeyResultMarqueeProps {
  result: string;
  glowColor: string;
}

const KeyResultMarquee = ({ result, glowColor }: KeyResultMarqueeProps) => {
  if (!result) return null;
  
  return (
    <motion.div 
      className="w-full py-8 md:py-12 bg-black border-y border-white/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <span className="text-xs uppercase tracking-[0.2em] text-white/40 shrink-0">
            Key Result
          </span>
          <p 
            className="text-xl md:text-2xl lg:text-3xl font-medium leading-snug"
            style={{ color: glowColor }}
          >
            {result}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default KeyResultMarquee;
