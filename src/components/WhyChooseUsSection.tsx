import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import CalendlyButton from './CalendlyButton';
import Moon3D from './Moon3D';
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

// Floating tags with different colors - scattered across the section
const floatingTags = [
  { label: "Responsible", color: "bg-violet-400", top: "15%", left: "8%", delay: 0 },
  { label: "Creative", color: "bg-red-500", top: "22%", left: "25%", delay: 0.5 },
  { label: "Innovation-Oriented", color: "bg-blue-400", top: "35%", left: "3%", delay: 1 },
  { label: "Resourceful", color: "bg-orange-500", top: "48%", left: "30%", delay: 1.5 },
  { label: "Strategic", color: "bg-purple-300", top: "62%", left: "18%", delay: 2 },
  { label: "Attention to Detail", color: "bg-cyan-300", top: "18%", right: "8%", delay: 0.3 },
  { label: "Innovative", color: "bg-green-400", top: "45%", right: "3%", delay: 1.2 },
  { label: "Result-Driven", color: "bg-emerald-400", top: "65%", right: "15%", delay: 1.8 },
];

const WhyChooseUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-[#0033FF] py-24 md:py-32 overflow-hidden min-h-screen flex items-center">
      {/* 3D Moon - Left Side */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[15%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px]">
        <Moon3D className="w-full h-full" />
      </div>

      {/* Floating Tags */}
      {floatingTags.map((tag, index) => (
        <motion.div
          key={tag.label}
          className={`absolute ${tag.color} text-black text-xs md:text-sm font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-md shadow-lg z-20`}
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { 
            opacity: 1, 
            scale: 1,
            y: [0, -10, 0],
          } : {}}
          transition={{
            opacity: { duration: 0.5, delay: tag.delay },
            scale: { duration: 0.5, delay: tag.delay },
            y: { 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: tag.delay
            }
          }}
        >
          {tag.label}
        </motion.div>
      ))}

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="flex flex-col items-end text-right ml-auto max-w-3xl">
          {/* Main Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white leading-none mb-8"
          >
            About Us
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed mb-6 font-light"
          >
            As a <span className="font-medium">Crypto Marketing Agency</span> with a focus on the Korean market, CryptoBridge has tailor made the service offering to include services that serve to <span className="font-medium">build and grow your Web3 project</span>.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-white/70 mb-10"
          >
            Founded by former executives from <span className="text-white font-medium">Binance</span> and <span className="text-white font-medium">KuCoin</span>
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <CalendlyButton className="group relative overflow-hidden bg-white hover:bg-white/90 text-[#0033FF] border-0 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 ease-out rounded-full px-10 py-5 text-lg font-semibold">
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
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0033FF] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0033FF] to-transparent z-10 pointer-events-none" />
          
          <div className="flex items-center animate-marquee-slow hover:[animation-play-state:paused]">
            {[...mediaLogos, ...mediaLogos, ...mediaLogos].map((media, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 mx-3 px-5 py-2.5 bg-white/10 rounded-2xl border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-500 ease-out flex-shrink-0 cursor-default"
              >
                <img src={media.logo} alt={media.name} className="h-7 w-7 object-contain rounded-xl flex-shrink-0 brightness-0 invert opacity-80" />
                <span className="text-white/80 text-sm font-medium whitespace-nowrap">
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
