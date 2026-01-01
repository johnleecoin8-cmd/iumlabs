import { ArrowRight, Link2, FlaskConical, Target, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import aboutImageDefault from '@/assets/campaigns/about-image-default.jpeg';
import aboutImageHover from '@/assets/campaigns/about-image-hover.jpeg';

const WhyChooseUsSection = () => {
  return (
    <section className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] lg:grid-cols-[2.5fr_3.5fr] md:max-h-[500px] lg:max-h-[650px] overflow-hidden">
        {/* Left: Featured Image with Hover Effect */}
        <div className="md:border-r border-border overflow-hidden h-[280px] sm:h-[320px] md:h-full relative group">
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
          <div className="p-4 sm:p-5 md:p-5 lg:p-6 flex-1 flex flex-col justify-center border-b border-border">
            <h2 className="text-xl sm:text-2xl md:text-xl lg:text-2xl font-bold text-foreground mb-3 sm:mb-4">
              About Us
            </h2>
            
            <div className="space-y-3 sm:space-y-4">
              {/* Brand Identity Cards - Mobile Optimized Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {/* Ium Card */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-2.5 sm:p-3">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Link2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                    </div>
                    <span className="text-foreground font-semibold text-xs sm:text-sm">Ium (이음)</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-[10px] sm:text-xs">
                    From "잇다" — Connecting global Web3 with Korea's ecosystem.
                  </p>
                </div>
                
                {/* Labs Card */}
                <div className="bg-accent/50 border border-accent rounded-lg p-2.5 sm:p-3">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-accent flex items-center justify-center flex-shrink-0">
                      <FlaskConical className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent-foreground" />
                    </div>
                    <span className="text-foreground font-semibold text-xs sm:text-sm">Labs</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-[10px] sm:text-xs">
                    Data-driven research & proprietary analytics.
                  </p>
                </div>
              </div>
              
              {/* Core Services - Visual Icons */}
              <div className="pt-2 sm:pt-3 border-t border-border/50">
                <p className="text-muted-foreground text-[9px] sm:text-[10px] uppercase tracking-wider mb-2 font-medium">Core Services</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <div className="flex items-center gap-1 sm:gap-1.5 bg-background/50 border border-border rounded-full px-2 sm:px-2.5 py-1 sm:py-1.5">
                    <Target className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary flex-shrink-0" />
                    <span className="text-foreground text-[10px] sm:text-xs font-medium whitespace-nowrap">GTM Marketing</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-1.5 bg-background/50 border border-border rounded-full px-2 sm:px-2.5 py-1 sm:py-1.5">
                    <BarChart3 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary flex-shrink-0" />
                    <span className="text-foreground text-[10px] sm:text-xs font-medium whitespace-nowrap">Research Products</span>
                  </div>
                </div>
              </div>
              
              {/* Credibility - Compact */}
              <p className="text-muted-foreground leading-relaxed text-[10px] sm:text-xs pt-2 border-t border-border/50">
                Founded by <span className="text-foreground font-medium">Binance & KuCoin</span> executives. Trusted by <span className="text-foreground font-medium">18+ brands</span> since 2025.
              </p>
            </div>
          </div>

          {/* Stats + CTA */}
          <div className="p-3 sm:p-4 md:p-5 lg:p-6">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
              <div className="text-center">
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-0.5">2025</div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-0.5">18+</div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Partners</div>
              </div>
              <div className="text-center">
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-0.5">60+</div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Campaigns</div>
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
