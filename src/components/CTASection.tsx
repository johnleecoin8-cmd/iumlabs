import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-display-md md:text-display-lg mb-6">
            Ready to launch
            <br />
            <span className="text-gradient">your project?</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Get a free consultation with our Web3 marketing experts and discover 
            how we can help you succeed in the Korean market.
          </p>

          {/* CTA Button */}
          <Button variant="filled" size="lg">
            Schedule a Call
            <ArrowRight className="w-4 h-4" />
          </Button>

          {/* Contact Info */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="mailto:hello@cryptobridge.kr" className="hover:text-foreground transition-colors">
              hello@cryptobridge.kr
            </a>
            <span className="hidden md:inline">·</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Telegram
            </a>
            <span className="hidden md:inline">·</span>
            <a href="#" className="hover:text-foreground transition-colors">
              KakaoTalk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
