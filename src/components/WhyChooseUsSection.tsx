import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import aboutImageDefault from '@/assets/campaigns/about-image-default.jpeg';
import aboutImageHover from '@/assets/campaigns/about-image-hover.jpeg';

const stats = [
  { value: "50+", label: "Projects Launched" },
  { value: "$2B+", label: "Total Value Marketed" },
  { value: "100+", label: "KOL Partners" },
];

const WhyChooseUsSection = () => {
  return (
    <section className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] lg:grid-cols-[2.5fr_3.5fr] md:max-h-[550px] lg:max-h-[700px] overflow-hidden">
        {/* Left: Featured Image with Hover Effect */}
        <div className="md:border-r border-border overflow-hidden h-[320px] sm:h-[400px] md:h-full relative group active:scale-[0.995] transition-transform">
          <img 
            src={aboutImageDefault} 
            alt="ium Labs Team - Default" 
            className="block w-full h-full object-cover object-center transition-opacity duration-500 group-hover:opacity-0"
          />
          <img 
            src={aboutImageHover} 
            alt="ium Labs Team - Hover" 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>

        {/* Right: Content */}
        <div className="flex flex-col justify-center">
          <motion.div 
            className="p-6 sm:p-8 md:p-10 lg:p-14 flex flex-col justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 sm:mb-6 tracking-tight leading-tight">
              More than an Agency.<br />Your Growth Engine.
            </h2>
            
            {/* Description */}
            <p className="text-foreground/50 leading-relaxed text-sm sm:text-base md:text-base lg:text-lg mb-6">
              ium Labs connects global Web3 projects to Korea's dynamic ecosystem through data-driven research and actionable insights. Founded by veterans from Binance & KuCoin, we provide the winning formula to navigate the complex Korean market.
            </p>
            
            {/* CTA Note */}
            <p className="text-violet-400 text-sm sm:text-base md:text-lg font-medium">
              Execute with precision and dominate it.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
