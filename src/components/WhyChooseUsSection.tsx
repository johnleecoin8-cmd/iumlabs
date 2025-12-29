import { ArrowRight, Calendar, Users, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import seoulMetroPoster from '@/assets/campaigns/seoul-metro-poster.jpeg';

// Stat Card Component with icon
const StatCard = ({ 
  icon: Icon, 
  value, 
  label, 
  delay = 0 
}: { 
  icon: React.ElementType; 
  value: string; 
  label: string; 
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className={`
        group relative p-6 bg-muted/20 backdrop-blur-sm rounded-2xl border border-border/50 
        hover:bg-muted/40 hover:border-primary/30 hover:scale-[1.02]
        transition-all duration-500 cursor-default overflow-hidden
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="text-3xl md:text-4xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
          {value}
        </div>
        <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
          {label}
        </div>
      </div>
    </div>
  );
};

const WhyChooseUsSection = () => {
  return (
    <section className="bg-background">
      {/* Full-width Hero Image with Overlay */}
      <div className="relative h-[320px] md:h-[420px] overflow-hidden">
        <img 
          src={seoulMetroPoster} 
          alt="Seoul Metro Billboard - Ium Labs" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              About Us
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-4 max-w-2xl">
              We bridge global Web3 projects to growth in the Korean market. Established in 2025, we have become a trusted partner for 18+ brands expanding into Korea's dynamic crypto ecosystem.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-primary rounded-full" />
              <p className="text-foreground font-semibold text-sm md:text-base">
                Founded by former executives from Binance and KuCoin
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats + CTA Section */}
      <div className="p-6 md:p-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
          <StatCard icon={Calendar} value="2025" label="Founded" delay={0} />
          <StatCard icon={Users} value="18+" label="Partners" delay={100} />
          <StatCard icon={Rocket} value="60+" label="Campaigns" delay={200} />
        </div>
        
        {/* Enhanced CTA Button */}
        <Link
          to="/projects"
          className="group relative inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 text-base font-semibold rounded-full hover:bg-primary hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 w-full overflow-hidden"
        >
          {/* Shine sweep effect */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          
          <span className="relative z-10">View Our Work</span>
          <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
