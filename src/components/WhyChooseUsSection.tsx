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

const WhyChooseUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-[#0A0A0B] py-24 md:py-32 overflow-hidden min-h-screen flex items-center">
      {/* 3D Bridge - Full Background */}
      <div className="absolute inset-0 w-full h-full">
        <Bridge3D 
          type="hero" 
          className="w-full h-full" 
          color="#3B82F6" 
          secondaryColor="#60A5FA" 
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Main Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/90 text-sm md:text-base uppercase tracking-[0.3em] mb-4"
          >
            We Bridge Your Project
          </motion.h2>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-primary text-lg md:text-xl uppercase tracking-[0.2em] mb-12"
          >
            To the Korean Market
          </motion.h3>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/60 leading-relaxed mb-4 max-w-2xl"
          >
            Korean Web3 Go-To-Market Agency dedicated to achieving successful entry 
            and scalable growth for global projects.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base text-white/40 mb-10"
          >
            Founded by former executives from <span className="text-white/70 font-semibold">Binance</span> and <span className="text-white/70 font-semibold">KuCoin</span>
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <CalendlyButton className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-white border-0 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-500 ease-out rounded-full px-10 py-5 text-lg font-semibold">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10 flex items-center gap-3">
                <Calendar className="w-5 h-5 group-hover:animate-pulse" />
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
        className="absolute bottom-0 left-0 right-0 py-8 border-t border-white/10"
      >
        <p className="text-center text-white/30 text-sm uppercase tracking-widest mb-6">
          As Featured In Media
        </p>
        
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
          
          <div className="flex items-center animate-marquee-slow hover:[animation-play-state:paused]">
            {[...mediaLogos, ...mediaLogos, ...mediaLogos].map((media, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 mx-3 px-5 py-2.5 bg-white/[0.03] rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500 ease-out flex-shrink-0 cursor-default"
              >
                <img src={media.logo} alt={media.name} className="h-7 w-7 object-contain rounded-xl flex-shrink-0 brightness-0 invert opacity-60" />
                <span className="text-white/50 text-sm font-medium whitespace-nowrap">
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
