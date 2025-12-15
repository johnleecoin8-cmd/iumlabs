import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import CalendlyButton from './CalendlyButton';
import teamPhoto from '@/assets/team-photo.png';
import coindeskLogo from '@/assets/logos/coindesk.png';
import blockmediaLogo from '@/assets/logos/blockmedia-new.png';
import economistLogo from '@/assets/logos/economist.png';
import cointelegraphLogo from '@/assets/logos/cointelegraph.png';
import bloomingbitLogo from '@/assets/logos/bloomingbit.png';
import coinnessLogo from '@/assets/logos/coinness.png';
import SectionHeader from './SectionHeader';

const mediaLogos = [
  { name: "Cointelegraph", logo: cointelegraphLogo },
  { name: "CoinDesk", logo: coindeskLogo },
  { name: "BlockMedia", logo: blockmediaLogo },
  { name: "TokenPost", logo: "https://miro.medium.com/v2/resize:fill:176:176/1*pCtFs9n-MWMhU133o7trNA.jpeg" },
  { name: "Coinness", logo: coinnessLogo },
  { name: "Bloomingbit", logo: bloomingbitLogo },
  { name: "The Economist", logo: economistLogo }
];

// a41-style stats with large numbers
const stats = [
  { number: "01", value: "18+", label: "Projects Launched" },
  { number: "02", value: "120+", label: "KOL Network" },
  { number: "03", value: "$5M+", label: "Token Sales" },
  { number: "04", value: "47+", label: "AMA Hosted" },
];

const WhyChooseUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-[#F5F2ED] py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* 4pillars-style Header */}
        <SectionHeader 
          title="ABOUT" 
          dark={false}
        />

        {/* a41-style Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-6 md:p-8 border border-gray-200 hover:border-gray-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Number Badge */}
              <span className="absolute top-4 right-4 text-xs font-mono text-gray-400">
                {stat.number}
              </span>
              
              {/* Value */}
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="text-sm md:text-base text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main 2-column grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
          {/* Left Column - Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-2 lg:order-1"
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
              We Bridge Your Project{' '}
              <span className="text-primary">to Korea</span>
            </h3>
            
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
              We're Korean Web3 Go-To-Market Agency dedicated to achieving successful entry 
              and scalable growth for global projects in the dynamic Korean market.
            </p>
            
            <p className="text-base text-gray-500 mb-6">
              Founded by former executives from <span className="font-semibold text-gray-700">Binance</span> and <span className="font-semibold text-gray-700">KuCoin</span>
            </p>

            <CalendlyButton className="group relative overflow-hidden bg-gray-900 hover:bg-gray-800 text-white border-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <span className="relative z-10 flex items-center gap-2">
                Book a Meeting
              </span>
            </CalendlyButton>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="order-1 lg:order-2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[350px] md:h-[450px] hover:shadow-3xl transition-all duration-500">
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
          transition={{ duration: 0.7, delay: 0.5 }}
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
