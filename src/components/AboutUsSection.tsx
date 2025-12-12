import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Clock, Users, Award, Calendar } from "lucide-react";
import CalendlyButton from "./CalendlyButton";
import seoulSkyline from "@/assets/seoul-skyline.jpg";

const stats = [
  { icon: Users, value: "200+", label: "Brands Launched" },
  { icon: Award, value: "50+", label: "KOL Partners" },
  { icon: Calendar, value: "2023", label: "Since" },
];

const AboutUsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="relative py-32 px-4 overflow-hidden min-h-[90vh]">
      {/* Dark Seoul Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${seoulSkyline})`,
          filter: 'grayscale(0.7) brightness(0.25)'
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="relative">
          
          {/* Main Content Grid - Asymmetric */}
          <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[500px]">
            
            {/* Left: Glassmorphism Text Box */}
            <div className={`lg:col-span-5 relative z-20 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}>
              {/* Glassmorphism Card */}
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl">
                {/* Accent Border Left */}
                <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-primary via-emerald-400 to-cyan-400 rounded-full" />
                
                <div className="pl-6">
                  <span className="inline-block px-3 py-1 text-xs font-medium tracking-widest uppercase text-primary border border-primary/30 rounded-full mb-6">
                    About Us
                  </span>
                  
                  <h2 className="text-3xl lg:text-4xl font-light text-white leading-tight mb-6">
                    Award-Winning Agency for{" "}
                    <span className="text-primary font-medium">Web3 Projects</span>
                  </h2>
                  
                  <p className="text-white/70 text-lg leading-relaxed mb-8">
                    We build the bridge for global crypto projects to enter the Korean market. 
                    With veterans from <span className="text-white font-medium">Binance</span> and{" "}
                    <span className="text-white font-medium">KuCoin</span>, we specialize in PR, 
                    Social Media, and Influencer Marketing.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <CalendlyButton className="lunar-btn bg-primary hover:bg-primary/90 text-black font-medium px-6 py-3 rounded-xl">
                      <span>Book a Meeting</span>
                    </CalendlyButton>
                    
                    <div className="flex items-center gap-2 text-sm text-white/50">
                      <Clock className="w-4 h-4" />
                      <span>Mon-Fri 09:00 — 18:00 KST</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right: Overflowing Team Image */}
            <div className={`lg:col-span-7 relative z-10 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}>
              <div className="relative lg:translate-x-16 xl:translate-x-24">
                {/* Image Container with Angled Clip */}
                <div className="relative overflow-hidden rounded-3xl lg:rounded-l-3xl lg:rounded-r-none shadow-2xl"
                     style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 8% 100%)' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop"
                    alt="CryptoBridge Korea Team"
                    className="w-full h-[350px] lg:h-[500px] object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-cyan-500/20" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
                </div>
                
                {/* Decorative Frame */}
                <div className="absolute -inset-2 border border-primary/20 rounded-3xl -z-10" 
                     style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 8% 100%)' }} />
              </div>
            </div>
          </div>
          
          {/* Floating Stats Badges */}
          <div className={`flex flex-wrap gap-4 mt-8 lg:mt-0 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:translate-y-1/2 z-30 justify-center lg:justify-start lg:pl-4 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0 lg:translate-y-1/2' : 'opacity-0 translate-y-8 lg:translate-y-[calc(50%+2rem)]'
          }`}>
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="group backdrop-blur-xl bg-black/60 border border-white/10 rounded-2xl px-6 py-4 shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default AboutUsSection;
