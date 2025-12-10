import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow delay-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background))_80%)]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-[0.02]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-slide-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Korea's #1 Web3 Marketing Agency
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tight mb-6 animate-slide-up delay-100">
            <span className="text-foreground">Services for</span>
            <br />
            <span className="text-gradient glow-text">Web3, NFT, DeFi</span>
            <br />
            <span className="text-foreground">Crypto Projects</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up delay-200">
            CryptoBridge Korea – The smart way to launch your Crypto, Web3, DeFi, 
            NFT and IEO/ICO projects in the Korean and global markets.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-300">
            <Button variant="hero" size="xl">
              Schedule Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl">
              View Our Projects
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto animate-slide-up delay-400">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">200+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Projects Launched</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">$500M+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Funds Raised</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">50+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Exchange Partners</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
