import { motion } from "framer-motion";

const KeyResultMarquee = () => {
  const items = [...Array(30)].map((_, i) => i);
  
  return (
    <motion.div 
      className="mx-4 mt-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div 
        className="w-full py-3 sm:py-4 overflow-hidden rounded-full"
        style={{ backgroundColor: '#D7FF4A' }}
      >
        <div className="flex items-center animate-marquee-slow w-max">
          {[...items, ...items].map((_, index) => (
            <span 
              key={index} 
              className="text-black font-medium text-sm sm:text-base whitespace-nowrap flex items-center"
            >
              <span className="mx-4 sm:mx-6">key result</span>
              <span className="text-black/40">•</span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default KeyResultMarquee;
