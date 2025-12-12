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
    <section className="relative min-h-screen overflow-hidden bg-[#3B5CFF]">
      {/* Moon at bottom-right, larger and partially visible */}
      <div className="absolute -bottom-[30%] -right-[15%] md:-bottom-[25%] md:-right-[10%] pointer-events-none">
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
          {/* Subtle glow */}
          <div 
            className="absolute inset-0 blur-3xl opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(150,180,255,0.5) 0%, rgba(80,120,255,0.3) 40%, transparent 70%)',
              transform: 'scale(1.2)',
            }}
          />
          <img 
            src={moonImage}
            alt=""
            className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] lg:w-[1100px] lg:h-[1100px] object-cover rounded-full opacity-60"
            style={{
              filter: 'saturate(0.3) brightness(0.9)',
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

      {/* Content - positioned more to the right/center like reference */}
      <div 
        ref={ref}
        className="relative z-10 container mx-auto px-6 min-h-screen flex items-center"
      >
        <div className={`max-w-3xl ml-auto mr-0 md:mr-[10%] lg:mr-[15%] text-left md:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-[6rem] font-light text-white mb-6 tracking-tight"
          >
            Why Choose Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed"
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
