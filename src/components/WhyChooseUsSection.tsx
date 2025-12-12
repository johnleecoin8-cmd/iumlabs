import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const floatingTags = [
  { text: 'Result-Driven', color: 'bg-pink-400', top: '15%', left: '5%' },
  { text: 'Creative', color: 'bg-yellow-400', top: '25%', left: '20%' },
  { text: 'Innovation-Oriented', color: 'bg-violet-400', top: '45%', left: '3%' },
  { text: 'Resourceful', color: 'bg-orange-500', top: '55%', left: '25%' },
  { text: 'Strategic', color: 'bg-violet-300', top: '75%', left: '18%' },
  { text: 'Responsible', color: 'bg-emerald-400', top: '12%', right: '8%' },
  { text: 'Attention to Detail', color: 'bg-emerald-300', top: '22%', right: '5%' },
  { text: 'Innovative', color: 'bg-emerald-400', top: '50%', right: '3%' },
  { text: 'Result-Driven Mindset', color: 'bg-emerald-400', top: '80%', right: '25%' },
];

const WhyChooseUsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#3B5CFF]">
      {/* Moon/Planet Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(200,210,255,0.4) 0%, rgba(100,120,200,0.2) 50%, transparent 70%)',
          }}
        />
        <img 
          src="/lovable-uploads/moon-texture.png" 
          alt=""
          className="w-[700px] h-[700px] object-cover rounded-full opacity-40 mix-blend-overlay"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Fallback moon effect */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(220,225,255,0.3) 0%, rgba(150,160,200,0.15) 40%, rgba(100,110,180,0.1) 60%, transparent 80%)',
            boxShadow: 'inset -40px -40px 100px rgba(0,0,0,0.2), inset 20px 20px 60px rgba(255,255,255,0.1)',
          }}
        />
      </div>

      {/* Floating Tags */}
      {floatingTags.map((tag, index) => (
        <motion.div
          key={tag.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
          className={`absolute ${tag.color} text-black font-medium px-3 py-1.5 rounded text-sm`}
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
          }}
        >
          {tag.text}
        </motion.div>
      ))}

      {/* Content */}
      <div 
        ref={ref}
        className="relative z-10 container mx-auto px-6 min-h-screen flex items-center justify-center"
      >
        <div className={`max-w-4xl text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-6xl md:text-8xl font-light text-white mb-8">
            Why Choose Us
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed">
            As a Web3 Marketing Agency with a focus on customer satisfaction, 
            CryptoBridge has tailor made the service offering to include services 
            that serve to build and grow your Web3 project in the Korean market.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
