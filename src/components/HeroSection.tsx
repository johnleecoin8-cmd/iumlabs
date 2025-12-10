import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Gradient Blobs - Stripe style */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="gradient-blob gradient-blob-purple w-[600px] h-[600px] -top-40 -left-20 animate-pulse-glow" />
        <div className="gradient-blob gradient-blob-pink w-[500px] h-[500px] top-1/4 right-0 animate-pulse-glow" style={{ animationDelay: '-2s' }} />
        <div className="gradient-blob gradient-blob-orange w-[400px] h-[400px] bottom-20 left-1/4 animate-pulse-glow" style={{ animationDelay: '-4s' }} />
        <div className="gradient-blob gradient-blob-cyan w-[300px] h-[300px] bottom-40 right-1/4 animate-pulse-glow opacity-40" style={{ animationDelay: '-1s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Overline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">Web3 Marketing Agency</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-display-lg md:text-display-xl mb-6 animate-fade-up delay-100">
              Launch your
              <br />
              <span className="text-gradient">Web3 project</span>
              <br />
              in Korea.
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 animate-fade-up delay-200 leading-relaxed">
              We help blockchain projects succeed with strategic marketing, 
              community building, and deep local expertise.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 animate-fade-up delay-300">
              <Button variant="gradient" size="lg">
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="glass" size="lg">
                View Our Work
              </Button>
            </div>
          </div>

          {/* Right Content - Floating Cards */}
          <div className="relative hidden lg:block h-[500px]">
            {/* Main Card */}
            <div className="absolute top-8 left-8 w-72 glass-card-hover p-6 animate-float">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Campaign ROI</p>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-gradient mb-2">+847%</div>
              <div className="h-16 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-end gap-1 p-2">
                {[40, 65, 45, 80, 55, 90, 70, 95].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-gradient-to-t from-primary to-accent rounded-sm"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Secondary Card */}
            <div className="absolute top-48 right-4 w-64 glass-card-hover p-5 animate-float-delayed">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gradient-pink to-gradient-orange flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Community Growth</p>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">52.4K</span>
                <span className="text-sm text-green-400">+12.5%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Active members this week</p>
            </div>

            {/* Tertiary Card */}
            <div className="absolute bottom-12 left-16 w-56 glass-card-hover p-4 animate-float" style={{ animationDelay: '-1.5s' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gradient-cyan to-primary flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary-foreground" />
                </div>
                <p className="text-sm font-medium">Quick Stats</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-secondary/50 rounded-lg p-2">
                  <p className="text-lg font-bold">200+</p>
                  <p className="text-xs text-muted-foreground">Projects</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-2">
                  <p className="text-lg font-bold">$500M</p>
                  <p className="text-xs text-muted-foreground">Raised</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;