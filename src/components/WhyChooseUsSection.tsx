import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo3D from './Logo3D';

const WhyChooseUsSection = () => {
  return (
    <section className="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: 3D Logo */}
        <div className="lg:border-r border-border">
          <div className="aspect-[4/3] overflow-hidden bg-background">
            <Logo3D />
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col">
          {/* About Text */}
          <div className="p-6 md:p-8 flex-1 flex flex-col justify-center border-b border-border">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              About Us
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              We bridge global Web3 projects to growth in the Korean market. Established in 2025, we have become a trusted partner for 18+ brands expanding into Korea's dynamic crypto ecosystem. Our name, 'Ium', is derived from the Korean verb 'to connect' (잇다), embodying our core mission to seamlessly link global innovation with local opportunities.
            </p>
            <p className="text-foreground font-medium text-sm">
              Founded by former executives from Binance and KuCoin
            </p>
          </div>

          {/* Stats + CTA */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">2025</div>
                <div className="text-xs text-muted-foreground">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">18+</div>
                <div className="text-xs text-muted-foreground">Partners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">60+</div>
                <div className="text-xs text-muted-foreground">Campaigns</div>
              </div>
            </div>
            <Link
              to="/projects"
              className="group inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium rounded-full hover:bg-foreground/90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 w-full"
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
