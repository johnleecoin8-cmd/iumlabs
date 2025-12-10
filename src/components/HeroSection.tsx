import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Overline */}
          <p className="text-primary text-sm font-medium tracking-wide mb-6 animate-fade-up">
            Web3 Marketing Agency
          </p>

          {/* Main Headline */}
          <h1 className="text-display-lg md:text-display-xl mb-6 animate-fade-up delay-100">
            Launch your
            <br />
            <span className="text-gradient">Web3 project</span>
            <br />
            in Korea.
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up delay-200 leading-relaxed">
            We help blockchain projects succeed with strategic marketing, 
            community building, and deep local expertise.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
            <Button variant="filled" size="lg">
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="ghost-dark" size="lg">
              View Our Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
