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
    <section className="relative bg-[#0A0A0B] py-24 md:py-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* Radial Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)]" />
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Main Content - 3D Bridge Centered */}
        <div className="flex flex-col items-center text-center mb-16">
          {/* Label */}
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-primary uppercase tracking-widest mb-6"
          >
            About Us
          </motion.span>

          {/* 3D Bridge - Hero Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-3xl h-[300px] md:h-[400px] mb-8"
          >
            {/* Glow Effect Behind Bridge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
            
            {/* 3D Bridge */}
            <Bridge3D 
              type="arch" 
              color="#3B82F6" 
              className="w-full h-full"
            />
          </motion.div>

          {/* Main Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 max-w-4xl"
          >
            We Bridge Your Project{' '}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
              to Korea
            </span>
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-white/60 leading-relaxed mb-4 max-w-2xl"
          >
            We're Korean Web3 Go-To-Market Agency dedicated to achieving successful entry 
            and scalable growth for global projects in the dynamic Korean market.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base text-white/40 mb-10"
          >
            Founded by former executives from <span className="text-white/70 font-semibold">Binance</span> and <span className="text-white/70 font-semibold">KuCoin</span>
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
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

        {/* As Featured In Media Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="pt-12 border-t border-white/10"
        >
          <p className="text-center text-white/30 text-sm uppercase tracking-widest mb-8">
            As Featured In Media
          </p>
          
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
            
            <div className="flex items-center animate-marquee-slow hover:[animation-play-state:paused]">
              {[...mediaLogos, ...mediaLogos, ...mediaLogos].map((media, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 mx-3 px-5 py-2.5 bg-white/[0.03] rounded-2xl border border-white/10 hover:border-primary/30 hover:bg-white/[0.05] transition-all duration-500 ease-out flex-shrink-0 cursor-default"
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
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
