import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import seoulMetroPoster from '@/assets/campaigns/seoul-metro-poster.jpeg';

const WhyChooseUsSection = () => {
  return (
    <section className="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_3.5fr] max-h-[500px] lg:max-h-[550px] overflow-hidden">
        {/* Left: Featured Image */}
        <div className="lg:border-r border-border overflow-hidden h-full">
          <img 
            src={seoulMetroPoster} 
            alt="Seoul Metro Billboard - Ium Labs" 
            className="block w-full h-full object-cover object-center"
          />
        </div>

        {/* Right: Content */}
        <div className="flex flex-col">
          {/* About Text */}
          <div className="p-5 md:p-6 flex-1 flex flex-col justify-center border-b border-border">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              About Us
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm md:text-base">
              We bridge global Web3 projects to growth in the Korean market. Established in 2025, we have become a trusted partner for 18+ brands expanding into Korea's dynamic crypto ecosystem. Our name, 'Ium', is derived from the Korean verb 'to connect' (잇다), embodying our core mission to seamlessly link global innovation with local opportunities.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-primary rounded-full"></div>
              <p className="text-foreground font-medium text-sm">
                Founded by former executives from Binance and KuCoin
              </p>
            </div>
          </div>

          {/* Stats + CTA */}
          <div className="p-5 md:p-6">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 hover:scale-105 transition-all duration-300 cursor-default">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-0.5">2025</div>
                <div className="text-xs text-muted-foreground">Founded</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 hover:scale-105 transition-all duration-300 cursor-default">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-0.5">18+</div>
                <div className="text-xs text-muted-foreground">Partners</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 hover:scale-105 transition-all duration-300 cursor-default">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-0.5">60+</div>
                <div className="text-xs text-muted-foreground">Campaigns</div>
              </div>
            </div>
            <Link
              to="/projects"
              className="group inline-flex items-center justify-center gap-2 bg-foreground text-background px-5 py-2.5 text-sm font-medium rounded-full hover:bg-foreground/90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 w-full"
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
