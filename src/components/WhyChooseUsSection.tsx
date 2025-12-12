import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import moonImage from '@/assets/backgrounds/moon-sphere.png';

const floatingTags = [
  { text: 'Responsible', color: 'bg-pink-400', top: '18%', left: '8%', delay: 0 },
  { text: 'Creative', color: 'bg-yellow-400', top: '32%', left: '22%', delay: 0.1 },
  { text: 'Innovation-Oriented', color: 'bg-violet-400', top: '52%', left: '2%', delay: 0.2 },
  { text: 'Resourceful', color: 'bg-orange-500', top: '48%', left: '32%', delay: 0.3 },
  { text: 'Strategic', color: 'bg-violet-300', top: '72%', left: '28%', delay: 0.4 },
  { text: 'Responsible', color: 'bg-emerald-400', top: '8%', right: '12%', delay: 0.15 },
  { text: 'Attention to Detail', color: 'bg-emerald-300', top: '18%', right: '5%', delay: 0.25 },
  { text: 'Innovative', color: 'bg-emerald-400', top: '48%', right: '3%', delay: 0.35 },
  { text: 'Result-Driven Mindset', color: 'bg-emerald-400', top: '78%', right: '28%', delay: 0.45 },
];

const WhyChooseUsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0033FF]">
      {/* Moon at right center, mostly visible */}
      <div className="absolute top-1/2 -right-[20%] md:-right-[15%] lg:-right-[10%] -translate-y-1/2 pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
          }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative"
        >
          <img 
            src={moonImage}
            alt=""
            className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px] object-cover rounded-full opacity-70"
            style={{
              filter: 'saturate(0.2) brightness(0.85)',
            }}
          />
          <img 
            src={moonImage}
            alt=""
            className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px] object-cover rounded-full opacity-70"
            style={{
              filter: 'saturate(0.2) brightness(0.85)',
            }}
          />
        </motion.div>
      </div>

      {/* Floating Tags with Animation */}
      {floatingTags.map((tag, index) => (
        <motion.div
          key={`${tag.text}-${index}`}
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
          }}
          transition={{ 
            delay: 0.3 + tag.delay, 
            duration: 0.6,
            ease: "easeOut"
          }}
          className="absolute z-20 hidden md:block"
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
          }}
        >
          <motion.div
            animate={{ 
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3 + (index * 0.2),
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.15,
            }}
            whileHover={{ 
              scale: 1.1, 
              y: -4,
            }}
            className={`${tag.color} text-black font-medium px-3 py-1.5 rounded text-sm cursor-default shadow-md`}
          >
            {tag.text}
          </motion.div>
        </motion.div>
      ))}

      {/* Content - positioned over the moon */}
      <div 
        ref={ref}
        className="absolute top-1/2 right-[5%] md:right-[10%] lg:right-[15%] -translate-y-1/2 z-10"
      >
        <div className={`max-w-2xl text-right transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight"
          >
            Why Choose Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg lg:text-xl text-white/90 font-light leading-relaxed"
          >
            As a Web3 Marketing Agency with a focus on customer satisfaction, 
            CryptoBridge has tailor made the service offering to include services 
            that serve to build and grow your Web3 project in the Korean market.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
