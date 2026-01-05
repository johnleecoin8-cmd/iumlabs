import { motion } from "framer-motion";

interface ProjectStrategyProps {
  strategy: string[];
  glowColor: string;
}

const ProjectStrategy = ({ strategy, glowColor }: ProjectStrategyProps) => {
  if (!strategy || strategy.length === 0) return null;

  return (
    <section className="relative py-12 md:py-16 bg-[#F5F5F5] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Section Header */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-900">
            Approach
          </h2>
        </motion.div>
        
        {/* Strategy Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {strategy.slice(0, 4).map((step, i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Number */}
              <span 
                className="text-sm font-semibold mb-3 block"
                style={{ color: glowColor }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              
              {/* Text */}
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {step}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectStrategy;
