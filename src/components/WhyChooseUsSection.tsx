import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import CalendlyButton from './CalendlyButton';
import teamPhoto from '@/assets/team-photo.png';
const mediaLogos = [{
  name: "Cointelegraph",
  logo: "https://cointelegraph.com/icons/logo/en.svg"
}, {
  name: "CoinDesk",
  logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/CoinDesk_logo.svg"
}, {
  name: "BlockMedia",
  logo: "https://cdn.blockmedia.co.kr/wp-content/uploads/2024/07/Blockmedia_Logo_name.png"
}, {
  name: "TokenPost",
  logo: "https://s1.tokenpost.com/assets/images/tokenpost_new/common_new/logo.svg"
}, {
  name: "Coinness",
  logo: "https://event.coinness.com/awards/images/media/CoinNess.webp"
}, {
  name: "Bloomingbit",
  logo: "https://event.coinness.com/awards/images/media/Bloomingbit.webp"
}, {
  name: "The Economist",
  logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/The_Economist_Logo.svg"
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
  return <section className="relative bg-[#F5F2ED] py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* Main 2-column grid - image larger */}
        <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-center mb-12">
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

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-relaxed mb-8">
              We connect global{' '}
              <span className="text-primary">Web3 projects</span>{' '}
              with success and scalable growth in the highly competitive{' '}
              <span className="text-primary">Korean market</span>.{' '}
              We are your trusted{' '}
              <span className="text-primary">Go-To-Market partner</span>{' '}
              with deep local expertise.
            </h2>

            <CalendlyButton className="mt-6">
              Book a Meeting
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
              <img src={teamPhoto} alt="CryptoBridge Korea Team" className="w-full h-[350px] md:h-[400px] lg:h-[450px] object-cover object-top" />
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
      }} className="pt-10 border-t border-gray-200">
          <p className="text-center text-gray-400 text-sm uppercase tracking-widest mb-8">
            As Featured In Media
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F5F2ED] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F5F2ED] to-transparent z-10 pointer-events-none" />
            
            <div className="flex items-center logo-marquee-slow">
              {mediaLogos.map((media, index) => <div key={index} className="flex items-center gap-3 mx-3 px-6 py-3 bg-gray-50 rounded-full border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300">
                  <img src={media.logo} alt={media.name} className="h-7 w-7 object-contain opacity-80 flex-shrink-0" />
                  <span className="text-gray-600 text-sm font-medium whitespace-nowrap">
                    {media.name}
                  </span>
                </div>)}
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default WhyChooseUsSection;