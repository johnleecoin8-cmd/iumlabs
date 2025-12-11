import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar, Mail, Send, Phone, Video, Mic, MonitorOff } from "lucide-react";
import { brand } from "@/config/content";
import CalendlyButton from "./CalendlyButton";

const brandConfig = {
  email: brand.email,
  telegram: brand.telegramLink,
  linkedin: brand.linkedin,
};

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="section-dark py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className={`grid lg:grid-cols-2 gap-16 items-center transition-normal ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Left - Content */}
          <div>
            <h2 className="text-4xl md:text-6xl font-light leading-tight mb-6 text-[hsl(var(--dark-fg))]">
              Let's Talk
              <br />
              <span className="serif-italic">Strategy</span>
            </h2>

            <p className="text-[hsl(var(--dark-fg))] opacity-60 text-lg mb-8 max-w-md">
              Ready to expand into the Korean crypto market? Book a free strategy 
              call with our founders to discuss your project.
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="lunar-tag-dark">30min Free Call</span>
              <span className="lunar-tag-dark">Flexible Scheduling</span>
              <span className="lunar-tag-dark">No Commitment</span>
            </div>

            {/* CTA Button */}
            <CalendlyButton className="lunar-btn text-lg px-8 py-4 mb-8 hover-glow">
              <Calendar className="w-5 h-5" />
              <span>Book a Meeting</span>
            </CalendlyButton>

            {/* Contact Options */}
            <div className="flex flex-wrap gap-4">
              <a 
                href={`mailto:${brandConfig.email}`}
                className="flex items-center gap-2 text-[hsl(var(--dark-fg))] opacity-60 hover:opacity-100 transition-opacity duration-200"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">Email</span>
              </a>
              <a 
                href={brandConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[hsl(var(--dark-fg))] opacity-60 hover:opacity-100 transition-opacity duration-200"
              >
                <Send className="w-4 h-4" />
                <span className="text-sm">Telegram</span>
              </a>
              <a 
                href={brandConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[hsl(var(--dark-fg))] opacity-60 hover:opacity-100 transition-opacity duration-200"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right - Video Call UI Mock */}
          <div className={`relative transition-normal ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: '0.2s' }}>
            <div className="video-call-frame p-4 hover-lift">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[hsl(142,70%,45%)] animate-pulse" />
                  <span className="text-xs text-[hsl(var(--dark-fg))] opacity-60">Strategy Call</span>
                </div>
                <span className="text-xs text-[hsl(var(--dark-fg))] opacity-40">30:00</span>
              </div>

              {/* Main Video Area */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* James */}
                <div className="video-participant aspect-video group">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face"
                    alt="James"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 bg-[hsl(var(--dark-bg))] opacity-80 backdrop-blur-sm rounded px-2 py-1">
                    <span className="text-xs text-[hsl(var(--dark-fg))]">James</span>
                  </div>
                </div>

                {/* David */}
                <div className="video-participant aspect-video group">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face"
                    alt="David"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 bg-[hsl(var(--dark-bg))] opacity-80 backdrop-blur-sm rounded px-2 py-1">
                    <span className="text-xs text-[hsl(var(--dark-fg))]">David</span>
                  </div>
                </div>
              </div>

              {/* You - Placeholder */}
              <div className="video-participant aspect-[21/9] flex items-center justify-center mb-4">
                <div className="text-center">
                  <Video className="w-8 h-8 text-[hsl(var(--dark-fg))] opacity-30 mx-auto mb-2" />
                  <span className="text-sm text-[hsl(var(--dark-fg))] opacity-40">Your video here</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <button className="w-10 h-10 rounded-full bg-[hsl(var(--dark-fg))] opacity-10 flex items-center justify-center hover:opacity-20 transition-opacity duration-200">
                  <Mic className="w-4 h-4 text-[hsl(var(--dark-fg))]" />
                </button>
                <button className="w-10 h-10 rounded-full bg-[hsl(var(--dark-fg))] opacity-10 flex items-center justify-center hover:opacity-20 transition-opacity duration-200">
                  <Video className="w-4 h-4 text-[hsl(var(--dark-fg))]" />
                </button>
                <button className="w-12 h-12 rounded-full bg-[hsl(265,100%,63%)] flex items-center justify-center hover:bg-[hsl(265,100%,55%)] transition-colors duration-200 shadow-[0_0_20px_hsl(265,100%,63%,0.4)] hover:shadow-[0_0_30px_hsl(265,100%,63%,0.5)]">
                  <Phone className="w-5 h-5 text-white rotate-[135deg]" />
                </button>
                <button className="w-10 h-10 rounded-full bg-[hsl(var(--dark-fg))] opacity-10 flex items-center justify-center hover:opacity-20 transition-opacity duration-200">
                  <MonitorOff className="w-4 h-4 text-[hsl(var(--dark-fg))]" />
                </button>
              </div>
            </div>

            {/* Floating Labels */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-medium animate-float">
              Free Strategy Call
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
