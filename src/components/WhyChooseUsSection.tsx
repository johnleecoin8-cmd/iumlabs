import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import CalendlyButton from './CalendlyButton';
import Bridge3D from './Bridge3D';
import coindeskLogo from '@/assets/logos/coindesk.png';
import blockmediaLogo from '@/assets/logos/blockmedia-new.png';
import economistLogo from '@/assets/logos/economist.png';
import cointelegraphLogo from '@/assets/logos/cointelegraph.png';
import bloomingbitLogo from '@/assets/logos/bloomingbit.png';
import coinnessLogo from '@/assets/logos/coinness.png';

const mediaLogos = [
  { name: "Cointelegraph", logo: cointelegraphLogo },
  { name: "CoinDesk", logo: coindeskLogo },
  { name: "BlockMedia", logo: blockmediaLogo },
  { name: "TokenPost", logo: "https://miro.medium.com/v2/resize:fill:176:176/1*pCtFs9n-MWMhU133o7trNA.jpeg" },
  { name: "Coinness", logo: coinnessLogo },
  { name: "Bloomingbit", logo: bloomingbitLogo },
  { name: "The Economist", logo: economistLogo }
];

// Floating tags like in the reference
const floatingTags = [
  { label: "Responsible", color: "bg-pink-500", top: "35%", left: "8%" },
  { label: "Creative", color: "bg-orange-500", top: "42%", left: "18%" },
  { label: "Innovation-Oriented", color: "bg-white text-black", top: "50%", left: "3%" },
  { label: "Resourceful", color: "bg-orange-600", top: "55%", left: "25%" },
  { label: "Strategic", color: "bg-white/20 border border-white/40", top: "70%", left: "20%" },
  { label: "Responsible", color: "bg-white/20 border border-white/40", top: "28%", right: "5%" },
  { label: "Attention to Detail", color: "bg-green-500", top: "35%", right: "8%" },
  { label: "Innovative", color: "bg-green-400", top: "55%", right: "2%" },
  { label: "Result-Driven Mindset", color: "bg-green-500", top: "78%", right: "15%" },
];

const WhyChooseUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-[#1E40AF] py-24 md:py-32 overflow-hidden min-h-screen flex items-center">
      {/* 3D Moon - Positioned Right */}
      <div className="absolute -right-[10%] top-1/2 -translate-y-1/2 w-[70%] h-[120%]">
        <Bridge3D className="w-full h-full" />
      </div>

      {/* Floating Tags */}
      {floatingTags.map((tag, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          className={`absolute px-3 py-1.5 rounded-md text-sm font-medium ${tag.color} ${tag.color.includes('text-black') ? '' : 'text-white'} z-20 hidden md:block`}
          style={{ 
            top: tag.top, 
            left: tag.left, 
            right: tag.right,
          }}
        >
          {tag.label}
        </motion.div>
      ))}

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="flex flex-col items-start text-left max-w-2xl ml-0 lg:ml-[5%]">
          {/* Main Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white text-6xl md:text-7xl lg:text-8xl font-light mb-8 tracking-tight"
            style={{ fontFamily: 'serif' }}
          >
            Services
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed mb-8 font-light"
            style={{ fontFamily: 'serif', fontStyle: 'italic' }}
          >
            As a Crypto Marketing Agency with a focus on customer satisfaction, 
            CryptoBridge Korea has tailor made the service offering to include 
            services that serve to build and grow your Web3 project.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <CalendlyButton className="group relative overflow-hidden bg-white hover:bg-white/90 text-blue-700 border-0 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 ease-out rounded-full px-8 py-4 text-base font-semibold">
              <span className="relative z-10 flex items-center gap-3">
                <Calendar className="w-5 h-5" />
                Book a Meeting
              </span>
            </CalendlyButton>
          </motion.div>
        </div>
      </div>

      {/* As Featured In Media Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 py-8 border-t border-white/20"
      >
        <p className="text-center text-white/50 text-sm uppercase tracking-widest mb-6">
          As Featured In Media
        </p>
        
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1E40AF] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1E40AF] to-transparent z-10 pointer-events-none" />
          
          <div className="flex items-center animate-marquee-slow hover:[animation-play-state:paused]">
            {[...mediaLogos, ...mediaLogos, ...mediaLogos].map((media, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 mx-3 px-5 py-2.5 bg-white/[0.08] rounded-2xl border border-white/20 hover:border-white/30 hover:bg-white/[0.12] transition-all duration-500 ease-out flex-shrink-0 cursor-default"
              >
                <img src={media.logo} alt={media.name} className="h-7 w-7 object-contain rounded-xl flex-shrink-0 brightness-0 invert opacity-70" />
                <span className="text-white/70 text-sm font-medium whitespace-nowrap">
                  {media.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default WhyChooseUsSection;