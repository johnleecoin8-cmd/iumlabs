import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar, ArrowUpRight, Video, Clock, CheckCircle } from "lucide-react";
import { brand } from "@/config/content";

const brandConfig = {
  email: brand.email,
  telegram: brand.telegramLink,
  linkedin: brand.linkedin,
};

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="section-dark py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div 
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <span className="inline-block px-4 py-2 rounded-full border border-[hsl(var(--dark-fg)/0.2)] text-[hsl(var(--dark-fg)/0.7)] text-sm font-medium mb-8">
              Let's Connect ///
            </span>

            {/* Main Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--dark-fg))] leading-tight mb-6">
              Let's Talk
              <br />
              <span className="serif-italic">Strategy</span>
            </h2>

            {/* Subtitle */}
            <p className="text-[hsl(var(--dark-fg)/0.6)] text-lg max-w-lg mb-10">
              Schedule a free 30-minute call to discuss your project's 
              Korean market entry strategy with our team.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4 mb-10 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-[hsl(var(--dark-fg)/0.7)]">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm">30min Free Call</span>
              </div>
              <div className="flex items-center gap-2 text-[hsl(var(--dark-fg)/0.7)]">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm">Flexible Scheduling</span>
              </div>
              <div className="flex items-center gap-2 text-[hsl(var(--dark-fg)/0.7)]">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm">No Commitment</span>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="https://calendly.com/cryptobridgekorea"
              target="_blank"
              rel="noopener noreferrer"
              className="lunar-btn inline-flex items-center gap-3 text-lg px-10 py-5"
            >
              <Calendar className="w-5 h-5" />
              <span>Book a Meeting</span>
            </a>
          </div>

          {/* Right Column - Calendly Preview UI */}
          <div className="relative">
            {/* Mockup Card - Video Call Style */}
            <div className="bg-[hsl(220,20%,12%)] rounded-3xl border border-[hsl(var(--dark-fg)/0.1)] p-6 shadow-2xl">
              {/* Window Controls */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>

              {/* Video Preview Area */}
              <div className="aspect-video bg-[hsl(220,20%,8%)] rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20" />
                
                {/* Video Icon */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                    <Video className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-[hsl(var(--dark-fg)/0.5)] text-sm">Strategy Call Preview</p>
                </div>
              </div>

              {/* Meeting Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">CB</span>
                    </div>
                    <div>
                      <p className="text-[hsl(var(--dark-fg))] font-medium">CryptoBridge Korea</p>
                      <p className="text-[hsl(var(--dark-fg)/0.5)] text-sm">Web3 Strategy Call</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[hsl(var(--dark-fg)/0.5)]">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">30 min</span>
                  </div>
                </div>

                {/* Time Slots Preview */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="px-3 py-2 rounded-lg bg-[hsl(220,20%,8%)] text-center text-[hsl(var(--dark-fg)/0.6)] text-sm">
                    10:00 AM
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-primary/20 text-center text-primary text-sm border border-primary/30">
                    2:00 PM
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-[hsl(220,20%,8%)] text-center text-[hsl(var(--dark-fg)/0.6)] text-sm">
                    4:00 PM
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Contact Options */}
            <div className="absolute -bottom-4 -left-4 bg-[hsl(var(--dark-bg))] border border-[hsl(var(--dark-fg)/0.1)] rounded-xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <a 
                  href={`mailto:${brandConfig.email}`}
                  className="w-10 h-10 rounded-full bg-[hsl(220,20%,12%)] flex items-center justify-center text-[hsl(var(--dark-fg)/0.6)] hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a 
                  href={brandConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[hsl(220,20%,12%)] flex items-center justify-center text-[hsl(var(--dark-fg)/0.6)] hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a 
                  href={brandConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[hsl(220,20%,12%)] flex items-center justify-center text-[hsl(var(--dark-fg)/0.6)] hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
