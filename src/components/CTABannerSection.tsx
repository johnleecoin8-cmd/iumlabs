import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import FloatingTags from "./FloatingTags";

const floatingTags = [
  { label: "30 min Free Call", top: "8%", left: "15%", mobileTop: "5%", mobileLeft: "5%" },
  { label: "Flexible Scheduling", top: "45%", left: "5%", mobileTop: "15%", mobileLeft: "3%" },
  { label: "Calendly", top: "15%", right: "12%", mobileTop: "5%", mobileRight: "5%" },
  { label: "Ask Us Anything", top: "35%", right: "8%", mobileTop: "85%", mobileRight: "5%" },
  { label: "Start Your Journey", bottom: "15%", right: "15%", mobileBottom: "5%", mobileRight: "3%" },
];

const CTABannerSection = () => {
  return (
    <section className="relative bg-[#0047FF] py-20 md:py-32 lg:py-40 overflow-hidden">
      {/* Floating Tags */}
      <div className="hidden md:block">
        {floatingTags.map((tag, index) => (
          <motion.span
            key={tag.label}
            className="absolute px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
            style={{
              top: tag.top,
              left: tag.left,
              right: tag.right,
              bottom: tag.bottom,
              backgroundColor: index === 0 ? "#FFD700" : 
                              index === 1 ? "#D4FF00" : 
                              index === 2 ? "#FF4444" : 
                              index === 3 ? "#00E5E5" : "#FF4444",
              color: "#000",
            }}
            animate={{
              y: [0, -8, 0],
              rotate: [-1, 1, -1],
            }}
            transition={{
              duration: 4 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3,
            }}
          >
            {tag.label}
          </motion.span>
        ))}
      </div>

      {/* Mobile Tags - simplified positions */}
      <div className="md:hidden">
        <motion.span
          className="absolute top-6 left-4 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ backgroundColor: "#FFD700", color: "#000" }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          30 min Free Call
        </motion.span>
        <motion.span
          className="absolute top-6 right-4 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ backgroundColor: "#FF4444", color: "#000" }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          Calendly
        </motion.span>
      </div>

      {/* Center Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
            Let's Talk<br />Strategy
          </h2>
          
          <p className="text-white/80 text-base md:text-lg lg:text-xl mb-10 max-w-xl mx-auto">
            We'll get to the point. You explain what you're building and we'll explain how we'd support it.
          </p>
          
          <a
            href="https://calendly.com/ium-labs/intro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-2xl font-medium hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Calendar className="w-5 h-5" />
            Book a Meeting
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABannerSection;
