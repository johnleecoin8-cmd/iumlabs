import { motion } from 'framer-motion';
import aboutImageDefault from '@/assets/campaigns/about-image-default.jpeg';
import aboutImageHover from '@/assets/campaigns/about-image-hover.jpeg';

const WhyChooseUsSection = () => {
  return (
    <section className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] lg:grid-cols-[2.5fr_3.5fr] md:max-h-[600px] lg:max-h-[780px] overflow-hidden">
        {/* Left: Featured Image with Hover Effect */}
        <div className="md:border-r border-border overflow-hidden h-[380px] sm:h-[450px] md:h-full relative group active:scale-[0.995] transition-transform">
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
        <div className="flex flex-col">
          <motion.div 
            className="p-6 sm:p-8 md:p-10 lg:p-14 flex flex-col justify-center flex-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 sm:mb-6 tracking-tight leading-tight">
              Data-Driven Market Entry.
            </h2>
            
            {/* Description */}
            <p className="text-foreground/50 leading-relaxed text-sm sm:text-base md:text-base lg:text-lg mb-10 sm:mb-12">
              In Korean, 'ium' (이음) means 'connection.' But to us, it means integration. Stop relying on intuition. We engineer your entry into the Korean market using proprietary research and quantitative impact analysis. We don't just market; we structure your narrative to flawlessly 'ium' (connect) global protocols with local liquidity.
            </p>
            
            {/* CTA Note */}
            <p className="text-violet-400 text-sm sm:text-base md:text-lg font-medium">
              Founded by veterans from Binance & KuCoin
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
