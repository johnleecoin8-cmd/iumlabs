import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import aboutImageDefault from '@/assets/campaigns/about-image-default.jpeg';
import aboutImageHover from '@/assets/campaigns/about-image-hover.jpeg';

const WhyChooseUsSection = () => {
  return (
    <section className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] lg:grid-cols-[2.5fr_3.5fr] max-h-[700px] sm:max-h-[720px] md:max-h-[400px] lg:max-h-[650px] overflow-hidden">
        {/* Left: Featured Image with Hover Effect */}
        <div className="md:border-r border-border overflow-hidden h-[400px] sm:h-[420px] md:h-full relative group">
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
          <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex-1 flex flex-col justify-center border-b border-border">
            <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-foreground mb-2 sm:mb-3">
              About Us
            </h2>
            
            <div className="space-y-2 sm:space-y-3">
              {/* Brand Identity - Ium */}
              <div>
                <p className="text-foreground font-medium text-xs sm:text-sm md:text-sm mb-0.5">
                  「Ium (이음)」
                </p>
                <p className="text-muted-foreground leading-relaxed text-[11px] sm:text-xs md:text-xs">
                  Derived from the Korean word "잇다" (to connect). We are the bridge that links global Web3 projects with Korea's dynamic crypto ecosystem — serving as both connector and foundational layer for market entry.
                </p>
              </div>
              
              {/* Brand Identity - Labs */}
              <div>
                <p className="text-foreground font-medium text-xs sm:text-sm md:text-sm mb-0.5">
                  「Labs」
                </p>
                <p className="text-muted-foreground leading-relaxed text-[11px] sm:text-xs md:text-xs">
                  Reflects our commitment to data-driven research and proprietary analytics. Beyond marketing, we deliver actionable insights through our Research Products that power informed decision-making for market entry.
                </p>
              </div>
              
              {/* Mission & Credibility */}
              <p className="text-foreground/90 leading-relaxed text-[11px] sm:text-xs md:text-xs pt-1 border-t border-border/50">
                <span className="font-medium">Our Mission:</span> Bridging global Web3 projects with the Korean market through strategic GTM marketing and proprietary research products. Founded by former Binance and KuCoin executives, trusted by 18+ leading brands since 2025.
              </p>
            </div>
          </div>

          {/* Stats + CTA */}
          <div className="p-3 sm:p-4 md:p-5 lg:p-6">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-foreground mb-0.5">2025</div>
                <div className="text-[10px] sm:text-xs md:text-xs text-muted-foreground">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-foreground mb-0.5">18+</div>
                <div className="text-[10px] sm:text-xs md:text-xs text-muted-foreground">Partners</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-foreground mb-0.5">60+</div>
                <div className="text-[10px] sm:text-xs md:text-xs text-muted-foreground">Campaigns</div>
              </div>
            </div>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-foreground text-xs sm:text-sm font-medium relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-foreground after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left min-h-[44px] sm:min-h-0"
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
