import { lazy, Suspense } from "react";
import { ArrowRight, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { cta, brand } from "@/config/content";

const MetallicElement = lazy(() => import("@/components/MetallicElement"));

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
      
      {/* 3D Element - Left side */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-[250px] h-[250px] opacity-30 pointer-events-none hidden lg:block">
        <Suspense fallback={null}>
          <MetallicElement variant="double" />
        </Suspense>
      </div>

      {/* 3D Element - Right side */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[250px] h-[250px] opacity-30 pointer-events-none hidden lg:block">
        <Suspense fallback={null}>
          <MetallicElement variant="ring" />
        </Suspense>
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