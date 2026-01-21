import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import aboutImageDefault from '@/assets/campaigns/about-image-default.jpeg';
import aboutImageHover from '@/assets/campaigns/about-image-hover.jpeg';

const WhyChooseUsSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="bg-background">
      <div 
        className="grid grid-cols-1 md:grid-cols-2 md:h-[420px] lg:h-[480px] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Panel - Default: Image1, Hover: Text2 */}
        <div className="md:border-r border-border overflow-hidden h-[280px] sm:h-[320px] md:h-full relative">
          {/* Image1 - Default State */}
          <motion.div 
            className="absolute inset-0"
            initial={false}
            animate={{ 
              opacity: isHovered ? 0 : 1,
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <img 
              src={aboutImageDefault} 
              alt="ium Labs Team" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Text2 - Hover State */}
          <motion.div 
            className="absolute inset-0 bg-background flex flex-col justify-center px-8 md:px-12 lg:px-16"
            initial={false}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -30
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4">
              Why Choose Us
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
              Korea's #1 Web3<br />GTM Partner
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 max-w-md">
              186+ KOL 네트워크와 40+ 오프라인 이벤트 경험으로 한국 시장 진출의 모든 것을 지원합니다.
            </p>
            <Link 
              to="/projects"
              className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300 font-medium"
            >
              Discover Our Network
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
        
        {/* Right Panel - Default: Text1, Hover: Image2 */}
        <div className="overflow-hidden h-[280px] sm:h-[320px] md:h-full relative">
          {/* Text1 - Default State */}
          <motion.div 
            className="absolute inset-0 bg-background flex flex-col justify-center px-8 md:px-12 lg:px-16"
            initial={false}
            animate={{ 
              opacity: isHovered ? 0 : 1,
              x: isHovered ? 30 : 0
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4">
              About Us
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
              More than an Agency.<br />Your Growth Engine.
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 max-w-md">
              We don't just market—we engineer market presence. Backed by data, driven by results.
            </p>
            <span className="text-xs text-muted-foreground/60 italic">
              Hover to explore →
            </span>
          </motion.div>
          
          {/* Image2 - Hover State */}
          <motion.div 
            className="absolute inset-0"
            initial={false}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 1.05
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <img 
              src={aboutImageHover} 
              alt="ium Labs Network" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Mobile: Tap indicator */}
      <div className="md:hidden text-center py-4 text-xs text-muted-foreground/60">
        <button 
          onClick={() => setIsHovered(!isHovered)}
          className="px-4 py-2 border border-border rounded-full hover:border-primary transition-colors"
        >
          {isHovered ? "← Back" : "Tap to explore →"}
        </button>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
