import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import seoulMetroPoster from '@/assets/campaigns/seoul-metro-poster.jpeg';
import seoulMetroHover from '@/assets/campaigns/seoul-metro-hover.png';

const WhyChooseUsSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_3.5fr] max-h-[500px] lg:max-h-[550px] overflow-hidden">
        {/* Left: Featured Image */}
        <div 
          className="lg:border-r border-border overflow-hidden h-full relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img 
            src={seoulMetroPoster} 
            alt="Seoul Metro Billboard - Ium Labs" 
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
          />
          <img 
            src={seoulMetroHover} 
            alt="Seoul Metro Billboard - Ium Labs Hover" 
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        {/* Right: Content */}
        <div className="flex flex-col">
          {/* About Text */}
          <div className="p-4 md:p-5 flex-1 flex flex-col justify-center border-b border-border">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              About Us
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-2 text-sm">
              We bridge global Web3 projects to growth in the Korean market. Established in 2025, we have become a trusted partner for 18+ brands expanding into Korea's dynamic crypto ecosystem. Our name, 'Ium', is derived from the Korean verb 'to connect' (잇다), embodying our core mission to seamlessly link global innovation with local opportunities.
            </p>
            <p className="text-foreground font-medium text-sm">
              Founded by former executives from Binance and KuCoin
            </p>
          </div>

          {/* Stats + CTA */}
          <div className="p-4 md:p-5">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-foreground mb-0.5">2025</div>
                <div className="text-xs text-muted-foreground">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-foreground mb-0.5">18+</div>
                <div className="text-xs text-muted-foreground">Partners</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-foreground mb-0.5">60+</div>
                <div className="text-xs text-muted-foreground">Campaigns</div>
              </div>
            </div>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-foreground text-sm font-medium relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-foreground after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              View Our Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
