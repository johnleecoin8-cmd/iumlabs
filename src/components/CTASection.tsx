import { ArrowRight, Mail, Send, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 100%, hsl(var(--gradient-red) / 0.15) 0%, transparent 50%),
              linear-gradient(to bottom, transparent 0%, hsl(var(--card) / 0.5) 100%)
            `,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Badge */}
          <span className="text-primary font-mono text-sm tracking-wider mb-6 block">04. LET'S TALK</span>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6">
            <span className="font-sans font-bold text-foreground">Ready to Enter</span>
            <br />
            <span className="font-serif italic text-gradient">Korea's Market?</span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Let's discuss how we can help your Web3 project succeed in one of the world's most active crypto markets.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/contact">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 px-8 py-6 text-base group">
                Book a Consultation
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="https://t.me/cryptobridgekorea" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="rounded-full border-border/50 px-8 py-6 text-base hover:bg-card">
                <Send className="w-4 h-4 mr-2" />
                Message on Telegram
              </Button>
            </a>
          </div>

          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <a 
              href="mailto:CryptoBridgekoea@gmail.com"
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-card/50 border border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all group"
            >
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-sm">Email Us</span>
            </a>
            <a 
              href="https://t.me/cryptobridgekorea"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-card/50 border border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all group"
            >
              <Send className="w-5 h-5 text-primary" />
              <span className="text-sm">Telegram</span>
            </a>
            <a 
              href="tel:01039699699"
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-card/50 border border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all group"
            >
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-sm">Call Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
