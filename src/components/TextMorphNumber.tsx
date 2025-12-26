import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, CSSProperties } from 'react';

interface TextMorphNumberProps {
  number: string;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}

const TextMorphNumber = ({ number, className = '', delay = 0, style }: TextMorphNumberProps) => {
  const [displayNumber, setDisplayNumber] = useState(number);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (number !== displayNumber) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayNumber(number);
        setIsAnimating(false);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [number, displayNumber, delay]);

  const digits = displayNumber.split('');

  return (
    <div className={`flex overflow-hidden ${className}`} style={style}>
      {digits.map((digit, index) => (
        <div key={index} className="relative overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={`${digit}-${index}-${displayNumber}`}
              className="inline-block"
              initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
              animate={{ 
                y: 0, 
                opacity: 1, 
                filter: 'blur(0px)',
                transition: {
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }
              }}
              exit={{ 
                y: -40, 
                opacity: 0, 
                filter: 'blur(8px)',
                transition: {
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1]
                }
              }}
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default TextMorphNumber;
