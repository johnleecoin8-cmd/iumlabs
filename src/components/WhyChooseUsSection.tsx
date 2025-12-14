import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import CalendlyButton from './CalendlyButton';
import teamPhoto from '@/assets/team-photo.png';

const stats = [
  { value: 1000, label: 'Vetted KOLs', suffix: '+' },
  { value: 500, label: 'Raised for Clients', prefix: '$', suffix: 'M+' },
  { value: 50, label: 'Exchange Partners', suffix: '+' },
  { value: 200, label: 'Projects Launched', suffix: '+' },
];

const StatItem = ({ stat, index, isVisible }: { stat: typeof stats[0]; index: number; isVisible: boolean }) => {
  const count = useCountUp({
    end: stat.value,
    duration: 2000,
    isVisible,
    prefix: stat.prefix,
    suffix: stat.suffix,
  });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
        {count}
      </div>
      <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
    </motion.div>
  );
};

const WhyChooseUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-[#F5F2ED] py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Main 2-column grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <span className="inline-block text-xs font-medium text-muted-foreground mb-4 tracking-widest uppercase">
              About Us
            </span>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug mb-8">
              We're a{' '}
              <span className="text-primary">Korea-Based Agency</span>{' '}
              supporting{' '}
              <span className="text-primary">Web3 Projects</span>{' '}
              since 2023, with a Proven track record of{' '}
              <span className="text-primary">Helping 200+ Brands</span>{' '}
              like{' '}
              <span className="text-primary">BNB Chain</span>,{' '}
              <span className="text-primary">KuCoin</span>, and{' '}
              <span className="text-primary">Polygon</span>{' '}
              through{' '}
              <span className="text-primary">KOL Marketing</span>,{' '}
              <span className="text-primary">Community Growth</span>,{' '}
              <span className="text-primary">PR</span>, and{' '}
              <span className="text-primary">Events</span>.
            </h2>

            <CalendlyButton className="mt-4">
              Book a Meeting
            </CalendlyButton>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={teamPhoto}
                alt="CryptoBridge Korea Team"
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats Row */}
        <div className="border-t border-gray-200 pt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <StatItem key={stat.label} stat={stat} index={index} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
