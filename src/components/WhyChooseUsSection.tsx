import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import CalendlyButton from './CalendlyButton';
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
    <section className="relative bg-[#0A0A0B] py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-6xl">
        {/* despread style: text-centered, large typography */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-white/20" />
            <span className="text-white/40 font-mono text-sm uppercase tracking-widest">About Us</span>
            <div className="h-px w-12 bg-white/20" />
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
            We Bridge Your Project
            <br />
            <span className="text-primary">to Korea</span>
          </h2>
          
          <p className="text-white/50 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-6">
            We're a Korean Web3 Go-To-Market Agency dedicated to achieving successful entry 
            and scalable growth for global projects in the dynamic Korean market.
          </p>
          
          <p className="text-white/30 text-base mb-12">
            Founded by former executives from <span className="text-white/60">Binance</span> and <span className="text-white/60">KuCoin</span>
          </p>

          <CalendlyButton className="group inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors">
            <span className="text-lg">Book a Meeting</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </CalendlyButton>
        </motion.div>

        {/* Media logos - minimal grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-white/10 pt-12"
        >
          <p className="text-center text-white/30 text-xs uppercase tracking-widest mb-8">
            As Featured In
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {mediaLogos.map((media, index) => (
              <div 
                key={index} 
                className="opacity-40 hover:opacity-70 transition-opacity duration-300"
              >
                <img 
                  src={media.logo} 
                  alt={media.name} 
                  className="h-8 w-auto object-contain brightness-0 invert" 
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
