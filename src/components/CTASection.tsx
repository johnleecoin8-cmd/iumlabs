import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar, ArrowUpRight } from "lucide-react";
import { brand } from "@/config/content";

const brandConfig = {
  email: brand.email,
  telegram: brand.telegramLink,
  linkedin: brand.linkedin,
};

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-32 px-6 bg-background border-t border-border/30">
      <div className="container mx-auto max-w-5xl">
        <div 
          className={`text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Section Number */}
          <span className="text-muted-foreground text-sm mb-8 block">03</span>

          {/* Main Headline */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-8">
            Ready to <span className="serif-italic">Enter</span>
            <br />
            the Korean Market?
          </h2>

          {/* Subtitle */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Let's discuss how we can help your Web3 project succeed in Korea. 
            Schedule a free strategy call with our team.
          </p>

          {/* CTA Button */}
          <a
            href="https://calendly.com/cryptobridgekorea"
            target="_blank"
            rel="noopener noreferrer"
            className="lunar-btn inline-flex items-center gap-3 text-lg px-10 py-5 mb-16"
          >
            <Calendar className="w-5 h-5" />
            <span>Book a Meeting</span>
          </a>

          {/* Contact Options */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <a 
              href={`mailto:${brandConfig.email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Email Us</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a 
              href={brandConfig.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Telegram</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a 
              href={brandConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
