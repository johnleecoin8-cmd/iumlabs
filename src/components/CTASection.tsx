import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { cta, brand } from "@/config/content";

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-gradient-pink/10" />
        <div className="gradient-blob gradient-blob-purple w-[600px] h-[600px] top-0 left-1/4 opacity-30" />
        <div className="gradient-blob gradient-blob-pink w-[500px] h-[500px] bottom-0 right-1/4 opacity-30" />
        <div className="gradient-blob gradient-blob-orange w-[400px] h-[400px] top-1/2 right-0 opacity-20" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={ref}
          className={`max-w-4xl mx-auto scroll-animate ${isVisible ? 'is-visible' : ''}`}
        >
          {/* Glass card container */}
          <div className="glass-card p-12 md:p-16 text-center relative overflow-hidden">
            {/* Inner gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">{cta.badge}</span>
              </div>

              {/* Heading */}
              <h2 className="text-display-md md:text-display-lg mb-6">
                {cta.headline.line1}
                <br />
                <span className="text-gradient">{cta.headline.highlight}</span>
              </h2>

              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
                {cta.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <Link to="/contact">
                  <Button variant="gradient" size="lg">
                    {cta.buttons.primary}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="glass" size="lg">
                    {cta.buttons.secondary}
                  </Button>
                </Link>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <a href={`mailto:${brand.email}`} className="hover:text-primary transition-colors">
                  {brand.email}
                </a>
                <span className="hidden md:inline text-border">·</span>
                <a href={brand.telegramLink} className="hover:text-primary transition-colors">
                  {cta.contactLinks.telegram}
                </a>
                <span className="hidden md:inline text-border">·</span>
                <a href="#" className="hover:text-primary transition-colors">
                  {cta.contactLinks.kakao}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
