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
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-black text-foreground mb-4 sm:mb-5 tracking-tight leading-tight">
              Real results, not just promises.
            </h2>
            
            {/* Description */}
            <p className="text-foreground/80 leading-relaxed text-sm sm:text-base md:text-base lg:text-lg mb-6">
              ium Labs bridges global Web3 projects with Korea's dynamic ecosystem. <span className="text-primary font-semibold">'이음(ium)'</span> Derived from the Korean word "to connect," we function as your foundational layer for market entry. We transcend standard marketing by leveraging proprietary analytics and data-driven research, providing the actionable insights needed to navigate and succeed in the Korean market.
            </p>
            
            {/* Stats Row */}
            <div className="flex flex-wrap gap-6 sm:gap-8 mb-6 pb-6 border-b border-border">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="cursor-default"
                >
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            {/* Bottom Row: Founders + CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-primary font-semibold text-sm sm:text-base">
                Founded by former Binance & KuCoin executives
              </p>
              
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 text-foreground text-sm sm:text-base font-semibold relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1.5px] after:bottom-0 after:left-0 after:bg-foreground after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left active:scale-[0.98] transition-transform"
              >
                View Our Work
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
