import { ArrowRight, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { cta, brand } from "@/config/content";

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      {/* Dot pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Geometric decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-40 h-40 border border-primary/10 rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 border border-primary/10 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">{cta.badge}</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl tracking-tight mb-6">
            <span className="font-serif italic text-muted-foreground">{cta.headline.line1}</span>
            <br />
            <span className="font-sans font-bold text-foreground">{cta.headline.highlight}</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {cta.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/contact">
              <Button className="rounded-full bg-primary hover:bg-primary/90 px-8 group">
                {cta.buttons.primary}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 px-8">
                {cta.buttons.secondary}
              </Button>
            </Link>
          </div>

          {/* Contact Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a 
              href={`mailto:${brand.email}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>{brand.email}</span>
            </a>
            <a 
              href={brand.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
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