import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import aboutImageDefault from '@/assets/campaigns/about-image-default.jpeg';
import aboutImageHover from '@/assets/campaigns/about-image-hover.jpeg';

const WhyChooseUsSection = () => {
  return (
    <section className="bg-background px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] lg:grid-cols-[2.5fr_3.5fr] max-h-[750px] sm:max-h-[780px] md:max-h-[450px] lg:max-h-[700px] overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20">
        {/* Left: Featured Image with Hover Effect */}
        <div className="md:border-r border-border overflow-hidden h-[420px] sm:h-[450px] md:h-full relative group">
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
              About Us
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
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-5">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1 tracking-tight">2025</div>
                <div className="text-caption text-muted-foreground">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1 tracking-tight">18+</div>
                <div className="text-caption text-muted-foreground">Partners</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1 tracking-tight">60+</div>
                <div className="text-caption text-muted-foreground">Campaigns</div>
              </div>
            </div>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2.5 text-foreground text-body font-semibold relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1.5px] after:bottom-0 after:left-0 after:bg-foreground after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left min-h-[44px] sm:min-h-0"
            >
              View Our Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
