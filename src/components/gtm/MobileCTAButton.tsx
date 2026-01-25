import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileCTAButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="expanded"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-background/95 backdrop-blur-lg border border-primary/30 rounded-2xl p-4 shadow-xl shadow-primary/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-foreground">Bridge the Gap.</span>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <Link
                    to="/contact"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://t.me/petereum"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-3 border border-border rounded-xl hover:bg-muted transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-foreground" />
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="collapsed"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={() => setIsExpanded(true)}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground rounded-full font-medium text-sm shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileCTAButton;
