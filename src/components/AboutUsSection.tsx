import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Clock, Award, Users, TrendingUp } from "lucide-react";
import { images } from "@/config/content";
import CalendlyButton from "./CalendlyButton";

const AboutUsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="py-24 px-4 flex-1 bg-[#F8F6F3]">
      <div className="container mx-auto max-w-6xl">
        <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left - Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
                <Award className="w-4 h-4" />
                Award-Winning Agency
              </span>
            </div>

            <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-[#1a1a1a]/90 mb-8">
              We're an <span className="text-amber-600 font-medium">Award-Winning Agency</span> supporting{" "}
              <span className="text-[#1a1a1a] font-medium">Crypto Projects</span> since 2023.{" "}
              <span className="text-amber-600 font-medium">Helping 200+ Brands</span> launch in{" "}
              <span className="serif-italic text-[#1a1a1a]">Korea</span> with expertise from{" "}
              <span className="text-[#1a1a1a] font-medium">Binance</span> and{" "}
              <span className="text-[#1a1a1a] font-medium">KuCoin</span> veterans.{" "}
              We specialize in <span className="text-amber-600 font-medium">PR</span>,{" "}
              <span className="text-amber-600 font-medium">Social Media</span>, and{" "}
              <span className="text-amber-600 font-medium">Influencer Marketing</span>.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-amber-200/50">
                <div className="text-2xl font-bold text-amber-600">200+</div>
                <div className="text-xs text-[#1a1a1a]/60">Clients</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-amber-200/50">
                <div className="text-2xl font-bold text-amber-600">$500M+</div>
                <div className="text-xs text-[#1a1a1a]/60">TVL Generated</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-amber-200/50">
                <div className="text-2xl font-bold text-amber-600">50+</div>
                <div className="text-xs text-[#1a1a1a]/60">Campaigns</div>
              </div>
            </div>

            {/* CTA Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <CalendlyButton className="lunar-btn">
                <span>Book a Meeting</span>
              </CalendlyButton>

              <div className="flex items-center gap-2 text-sm text-[#1a1a1a]/50">
                <Clock className="w-4 h-4" />
                <span>open hours: Mon-Fri 09:00 — 18:00 KST</span>
              </div>
            </div>
          </div>

          {/* Right - Team Photo */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="CryptoBridge Korea Team"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              {/* Gold gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-600/40 via-transparent to-transparent" />
            </div>
            
            {/* Decorative badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4 border border-amber-200/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#1a1a1a]">Since 2023</div>
                  <div className="text-xs text-[#1a1a1a]/60">Korea Market Expert</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;