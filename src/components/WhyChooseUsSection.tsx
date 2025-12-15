import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Pillars3D from './Pillars3D';
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

const WhyChooseUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-[#0A0A0A] py-24 md:py-32 overflow-hidden min-h-screen flex items-center">
      {/* 3D Pillars Background */}
      <div className="absolute inset-0 opacity-80">
        <Pillars3D className="w-full h-full" />
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/30 to-[#0A0A0A]/80 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow text */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/40 text-xs md:text-sm uppercase tracking-[0.3em] mb-8"
          >
            Web3 Marketing Excellence
          </motion.p>

          {/* Main Title - Large & Bold */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[1.1] mb-6"
          >
            <span className="block">PROFESSIONAL</span>
            <span className="block text-white/60">WEB3 MARKETING</span>
            <span className="block">FOR KOREA</span>
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/50 text-base md:text-lg lg:text-xl max-w-2xl mb-12 font-light tracking-wide"
          >
            Strategic growth solutions tailored for the Korean crypto ecosystem
          </motion.p>

          {/* CTA - Minimal Search Bar Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="w-full max-w-md"
          >
            <a 
              href="/services"
              className="group flex items-center justify-between w-full px-6 py-4 bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-full transition-all duration-500"
            >
              <span className="text-white/60 text-sm md:text-base">Explore our services</span>
              <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full group-hover:scale-110 transition-transform duration-300">
                <ArrowRight className="w-5 h-5 text-black" />
              </div>
            </a>
          </motion.div>
        </div>
      </div>

      {/* As Featured In Media Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 py-8 border-t border-white/10"
      >
        <p className="text-center text-white/30 text-xs uppercase tracking-[0.25em] mb-6">
          Featured In
        </p>
        
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
          
          <div className="flex items-center animate-marquee-slow hover:[animation-play-state:paused]">
            {[...mediaLogos, ...mediaLogos, ...mediaLogos].map((media, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 mx-4 px-5 py-2.5 bg-white/[0.03] rounded-full border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all duration-500 ease-out flex-shrink-0 cursor-default"
              >
                <img src={media.logo} alt={media.name} className="h-6 w-6 object-contain rounded-full flex-shrink-0 brightness-0 invert opacity-50" />
                <span className="text-white/40 text-sm font-light whitespace-nowrap tracking-wide">
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
