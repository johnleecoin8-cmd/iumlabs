import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const CTABannerSection = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className="bg-background text-foreground border-t border-border relative overflow-hidden">
      {/* Animated background glow on hover */}
      <motion.div 
        className="absolute inset-0 opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <motion.h3 
              className="text-2xl md:text-3xl font-light text-foreground mb-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Have a project in mind?
            </motion.h3>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Let's discuss how we can help you succeed in Korea.
            </motion.p>
          </div>
          <motion.div 
            className="flex gap-3 w-full md:w-auto"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              className="flex-1 md:flex-none relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glow effect behind button */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Link 
                to="/contact" 
                className="group relative flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-4 md:py-3 bg-foreground text-background font-medium rounded-full overflow-hidden hover:bg-foreground/90 active:bg-foreground/80 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-300 min-h-[52px]"
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                {/* Pulse ring on hover */}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100">
                  <span className="absolute inset-0 rounded-full animate-ping bg-foreground/20" style={{ animationDuration: '1.5s' }} />
                </span>
                
                <span className="relative z-10">Get in Touch</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
            <motion.button
              onClick={scrollToTop}
              className="group p-4 md:p-3 border border-border rounded-full hover:bg-secondary active:bg-secondary/80 hover:border-foreground/30 hover:-translate-y-0.5 hover:shadow-[0_5px_20px_-5px_rgba(255,255,255,0.2)] transition-all duration-300 min-w-[52px] min-h-[52px] flex items-center justify-center"
              aria-label="Back to top"
              whileHover={{ scale: 1.05, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABannerSection;
