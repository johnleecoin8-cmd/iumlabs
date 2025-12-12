import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Clock } from "lucide-react";
import { images } from "@/config/content";
import CalendlyButton from "./CalendlyButton";

const AboutUsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="py-24 px-4 flex-1 bg-[hsl(0,0%,6%)]">
      <div className="container mx-auto max-w-6xl">
        <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left - Content */}
          <div>
            <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
              <span className="number-badge text-white/50">About Us</span>
            </div>

            <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-white/90 mb-8">
              We're an <span className="text-emerald-400 font-medium">Award-Winning Agency</span> supporting{" "}
              <span className="text-emerald-400 font-medium">Crypto Projects</span> since 2023.{" "}
              <span className="text-emerald-400 font-medium">Helping 200+ Brands</span> launch in{" "}
              <span className="serif-italic text-white">Korea</span> with expertise from{" "}
              <span className="text-emerald-400 font-medium">Binance</span> and{" "}
              <span className="text-emerald-400 font-medium">KuCoin</span> veterans.{" "}
              We specialize in <span className="text-emerald-400 font-medium">PR</span>,{" "}
              <span className="text-emerald-400 font-medium">Social Media</span>, and{" "}
              <span className="text-emerald-400 font-medium">Influencer Marketing</span>.
            </p>

            {/* CTA Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <CalendlyButton className="lunar-btn">
                <span>Book a Meeting</span>
              </CalendlyButton>

              <div className="flex items-center gap-2 text-sm text-white/50">
                <Clock className="w-4 h-4" />
                <span>open hours: Mon-Fri 09:00 — 18:00 KST</span>
              </div>
            </div>
          </div>

          {/* Right - Team Photo */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="CryptoBridge Korea Team"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              {/* Neon Green overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
