import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageCircle, Send } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[200px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-6">
            <span className="text-foreground">Ready to</span>
            <br />
            <span className="text-gradient glow-text">Launch Your Project?</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Get a free consultation with our Web3 marketing experts and discover 
            how we can help you succeed in the Korean and global crypto markets.
          </p>

          {/* CTA Button */}
          <Button variant="hero" size="xl" className="mb-12">
            Schedule Free Consultation
            <ArrowRight className="w-5 h-5" />
          </Button>

          {/* Contact Methods */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
            <a
              href="mailto:contact@cryptobridge.kr"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">contact@cryptobridge.kr</span>
            </a>
            <span className="hidden md:inline text-border">|</span>
            <a
              href="#"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Send className="w-5 h-5" />
              <span className="font-medium">Telegram</span>
            </a>
            <span className="hidden md:inline text-border">|</span>
            <a
              href="#"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">KakaoTalk</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
