import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import CalendlyButton from './CalendlyButton';
import teamPhoto from '@/assets/team-photo.png';
import coindeskLogo from '@/assets/logos/coindesk.png';
import blockmediaLogo from '@/assets/logos/blockmedia-new.png';
import economistLogo from '@/assets/logos/economist.png';
import cointelegraphLogo from '@/assets/logos/cointelegraph.png';
import bloomingbitLogo from '@/assets/logos/bloomingbit.png';
import coinnessLogo from '@/assets/logos/coinness.png';

const mediaLogos = [{
  name: "Cointelegraph",
  logo: cointelegraphLogo
}, {
  name: "CoinDesk",
  logo: coindeskLogo
}, {
  name: "BlockMedia",
  logo: blockmediaLogo
}, {
  name: "TokenPost",
  logo: "https://miro.medium.com/v2/resize:fill:176:176/1*pCtFs9n-MWMhU133o7trNA.jpeg"
}, {
  name: "Coinness",
  logo: coinnessLogo
}, {
  name: "Bloomingbit",
  logo: bloomingbitLogo
}, {
  name: "The Economist",
  logo: economistLogo
}];

const stats = [{
  value: 1000,
  label: 'Vetted KOLs',
  suffix: '+'
}, {
  value: 500,
  label: 'Raised for Clients',
  prefix: '$',
  suffix: 'M+'
}, {
  value: 50,
  label: 'Exchange Partners',
  suffix: '+'
}, {
  value: 200,
  label: 'Projects Launched',
  suffix: '+'
}];

const StatItem = ({
  stat,
  index,
  isVisible
}: {
  stat: typeof stats[0];
  index: number;
  isVisible: boolean;
}) => {
  const count = useCountUp({
    end: stat.value,
    duration: 2000,
    isVisible,
    prefix: stat.prefix,
    suffix: stat.suffix
  });
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={isVisible ? {
    opacity: 1,
    y: 0
  } : {
    opacity: 0,
    y: 20
  }} transition={{
    delay: 0.4 + index * 0.1,
    duration: 0.5
  }} className="text-center">
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
        {count}
      </div>
      <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
    </motion.div>;
};

const WhyChooseUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);
  return <section className="relative bg-[#F5F2ED] py-12 overflow-hidden md:py-[20px]">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Main 2-column grid - image larger */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start mb-8">
          {/* Left Column - Text Content */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} animate={isVisible ? {
          opacity: 1,
          x: 0
        } : {
          opacity: 0,
          x: -30
        }} transition={{
          duration: 0.6
        }} className="order-2 lg:order-1">
            <span className="inline-block text-xs font-semibold text-gray-500 mb-5 tracking-widest uppercase">
              About Us
            </span>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug mb-3">
              We bridge global{' '}
              <span className="text-primary">Web3 projects</span>{' '}
              to <span className="text-primary">Korea</span>.
            </h2>
            <p className="text-base md:text-lg text-gray-700 font-medium mb-3">
              Founded by former executives from Binance and KuCoin, we have rapidly become a trusted partner since 2025.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-normal mb-6">
              We empower 18+ brands—including BNB, Bybit, IP, and Tria—with our proven expertise in Offline Events, PR, KOL Marketing, Community Management, AMAs, and Ads.
            </p>

            <CalendlyButton className="mt-6 group relative overflow-hidden bg-gradient-to-r from-primary via-red-500 to-orange-500 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 border-0">
              <span className="relative z-10 flex items-center gap-2">
                Book a Meeting
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </CalendlyButton>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} animate={isVisible ? {
          opacity: 1,
          x: 0
        } : {
          opacity: 0,
          x: 30
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src={teamPhoto} alt="CryptoBridge Korea Team" className="w-full h-[450px] md:h-[520px] lg:h-[580px] object-cover object-[center_65%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* As Featured In Media Section */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isVisible ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 30
      }} transition={{
        duration: 0.7,
        delay: 0.5
      }} className="pt-10 border-t border-gray-200 py-[20px]">
          <p className="text-center text-gray-400 text-sm uppercase tracking-widest mb-8">
            As Featured In Media
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F5F2ED] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F5F2ED] to-transparent z-10 pointer-events-none" />
            
            <div className="flex items-center animate-marquee-slow hover:[animation-play-state:paused]">
              {[...mediaLogos, ...mediaLogos, ...mediaLogos].map((media, index) => (
                <div key={index} className="flex items-center gap-3 mx-3 px-4 py-2 bg-white/80 rounded-full border border-gray-200 hover:border-gray-300 transition-all duration-300 flex-shrink-0">
                  <img src={media.logo} alt={media.name} className="h-6 w-6 object-contain rounded-full flex-shrink-0" />
                  <span className="text-gray-700 text-sm font-medium whitespace-nowrap">
                    {media.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};

export default WhyChooseUsSection;
