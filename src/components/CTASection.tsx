import { ArrowRight, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { cta, brand } from "@/config/content";

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Geometric decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-40 h-40 border border-primary/20 rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 border border-primary/10 rounded-full" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--primary) / 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">{cta.badge}</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tight">
            {cta.headline.line1}
            <br />
            <span className="text-gradient">{cta.headline.highlight}</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {cta.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 uppercase tracking-wider group">
                {cta.buttons.primary}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-foreground/30 hover:bg-foreground/10 uppercase tracking-wider">
                {cta.buttons.secondary}
              </Button>
            </Link>
          </div>

          {/* Contact Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a 
              href={`mailto:${brand.email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{brand.email}</span>
            </a>
            <a 
              href={brand.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>{cta.contactLinks.telegram}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
