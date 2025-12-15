import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import CalendlyButton from './CalendlyButton';
import teamPhoto from '@/assets/team-photo.png';
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
    <section className="relative bg-[#F5F2ED] py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Main 2-column grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
          {/* Left Column - Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
              About Us
            </span>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              We Bridge Your Project{' '}
              <span className="text-primary">to Korea</span>
            </h3>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              We're Korean Web3 Go-To-Market Agency dedicated to achieving successful entry 
              and scalable growth for global projects in the dynamic Korean market.
            </p>
            
            <p className="text-base text-gray-500 mb-8">
              Founded by former executives from <span className="font-semibold text-gray-700">Binance</span> and <span className="font-semibold text-gray-700">KuCoin</span>
            </p>

            <CalendlyButton className="group relative overflow-hidden bg-gradient-to-r from-primary via-red-500 to-orange-500 hover:shadow-2xl hover:shadow-primary/40 text-white border-0 hover:-translate-y-1 transition-all duration-300 rounded-full px-8 py-4">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10 flex items-center gap-2 font-semibold">
                <Calendar className="w-5 h-5 group-hover:animate-pulse" />
                Book a Meeting
              </span>
            </CalendlyButton>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[450px] md:h-[520px] lg:h-[580px] hover:shadow-3xl transition-all duration-500">
              <img 
                src={teamPhoto} 
                alt="CryptoBridge Korea Team" 
                className="w-full h-full object-cover object-[center_65%]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* As Featured In Media Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="pt-8 border-t border-gray-300"
        >
          <p className="text-center text-gray-400 text-sm uppercase tracking-widest mb-8">
            As Featured In Media
          </p>
          
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F5F2ED] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F5F2ED] to-transparent z-10 pointer-events-none" />
            
            <div className="flex items-center animate-marquee-slow hover:[animation-play-state:paused]">
              {[...mediaLogos, ...mediaLogos, ...mediaLogos].map((media, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 mx-3 px-5 py-2.5 bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0 cursor-default"
                >
                  <img src={media.logo} alt={media.name} className="h-7 w-7 object-contain rounded-xl flex-shrink-0" />
                  <span className="text-gray-700 text-sm font-medium whitespace-nowrap">
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
