import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import moonImage from '@/assets/backgrounds/moon-sphere.png';

const floatingTags = [
  { text: 'Result-Driven', color: 'bg-pink-400', top: '15%', left: '5%', delay: 0 },
  { text: 'Creative', color: 'bg-yellow-400', top: '28%', left: '18%', delay: 0.1 },
  { text: 'Innovation-Oriented', color: 'bg-violet-400', top: '48%', left: '3%', delay: 0.2 },
  { text: 'Resourceful', color: 'bg-orange-500', top: '58%', left: '22%', delay: 0.3 },
  { text: 'Strategic', color: 'bg-violet-300', top: '78%', left: '15%', delay: 0.4 },
  { text: 'Responsible', color: 'bg-emerald-400', top: '12%', right: '10%', delay: 0.15 },
  { text: 'Attention to Detail', color: 'bg-emerald-300', top: '25%', right: '3%', delay: 0.25 },
  { text: 'Innovative', color: 'bg-emerald-400', top: '52%', right: '5%', delay: 0.35 },
  { text: 'Result-Driven Mindset', color: 'bg-emerald-400', top: '82%', right: '20%', delay: 0.45 },
];

const WhyChooseUsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#3B5CFF]">
      {/* Moon Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative"
        >
          {/* Glow effect behind moon */}
          <div 
            className="absolute inset-0 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(180,200,255,0.4) 0%, rgba(100,140,255,0.2) 40%, transparent 70%)',
              transform: 'scale(1.3)',
            }}
          />
          <img 
            src={moonImage}
            alt=""
            className="w-[500px] h-[500px] md:w-[650px] md:h-[650px] lg:w-[750px] lg:h-[750px] object-cover rounded-full opacity-50 mix-blend-luminosity"
          />
        </motion.div>
      </div>

      {/* Floating Tags with Animation */}
      {floatingTags.map((tag, index) => (
        <motion.div
          key={tag.text}
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
          className="absolute z-20"
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
          }}
        >
          <motion.div
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, index % 2 === 0 ? 2 : -2, 0],
            }}
            transition={{
              duration: 3 + (index * 0.3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
            whileHover={{ 
              scale: 1.15, 
              y: -5,
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
            className={`${tag.color} text-black font-semibold px-4 py-2 rounded-md text-sm cursor-default shadow-lg transition-shadow`}
          >
            {tag.text}
          </motion.div>
        </motion.div>
      ))}

      {/* Content */}
      <div 
        ref={ref}
        className="relative z-10 container mx-auto px-6 min-h-screen flex items-center justify-center"
      >
        <div className={`max-w-4xl text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 tracking-tight"
          >
            Why Choose Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-white/90 font-light leading-relaxed"
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
