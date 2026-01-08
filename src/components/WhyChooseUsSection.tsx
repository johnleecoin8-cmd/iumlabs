import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import aboutImageDefault from '@/assets/campaigns/about-image-default.jpeg';
import aboutImageHover from '@/assets/campaigns/about-image-hover.jpeg';

const WhyChooseUsSection = () => {
  return (
    <section className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] lg:grid-cols-[2.5fr_3.5fr] md:max-h-[450px] lg:max-h-[700px] overflow-hidden">
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
        <div className="flex flex-col">
          {/* About Text */}
          <motion.div 
            className="p-5 sm:p-6 md:p-7 lg:p-10 flex-1 flex flex-col justify-center border-b border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-foreground mb-4 sm:mb-5 tracking-tight">
              Real results, not just promises.
            </h2>
            
            <p className="text-muted-foreground leading-relaxed text-body-sm sm:text-body md:text-body lg:text-body-lg mb-4">
              ium Labs bridges global Web3 projects with Korea's dynamic ecosystem. Derived from the Korean word "to connect," we function as your foundational layer for market entry. We transcend standard marketing by leveraging proprietary analytics and data-driven research, providing the actionable insights needed to navigate and succeed in the Korean market.
            </p>
            
            <p className="text-foreground/75 text-caption italic">
              Founded by former Binance & KuCoin executives
            </p>
          </motion.div>

          {/* Stats + CTA */}
          <div className="p-4 sm:p-5 md:p-6 lg:p-8">
            <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 mb-3 sm:mb-5">
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-0.5 tracking-tight">340%</div>
                <div className="text-[10px] sm:text-caption text-muted-foreground">Avg. Volume</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-0.5 tracking-tight">2.5M</div>
                <div className="text-[10px] sm:text-caption text-muted-foreground">Organic Reaching</div>
              </div>
            </div>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-foreground text-sm sm:text-base font-semibold relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1.5px] after:bottom-0 after:left-0 after:bg-foreground after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left min-h-[44px] sm:min-h-0 active:scale-[0.98] transition-transform"
            >
              View Our Work
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
