import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { TrendingUp, Users, Building2, Handshake, Sparkles } from "lucide-react";
const stats = [{
  value: 18,
  suffix: "+",
  prefix: "",
  label: "Projects Launched",
  icon: TrendingUp,
  description: "Successfully launched in Korea",
  glowColor: "from-emerald-500/20 to-cyan-500/10"
}, {
  value: 120,
  suffix: "+",
  prefix: "",
  label: "KOL Network",
  icon: Users,
  description: "Influencers & creators",
  glowColor: "from-primary/20 to-purple-500/10"
}, {
  value: 2.5,
  suffix: "M+",
  prefix: "$",
  label: "Token Sales",
  icon: Building2,
  description: "Total token sales supported",
  glowColor: "from-cyan-500/20 to-blue-500/10"
}, {
  value: 38,
  suffix: "+",
  prefix: "",
  label: "AMA Hosting",
  icon: Handshake,
  description: "AMAs hosted for projects",
  glowColor: "from-purple-500/20 to-pink-500/10"
}];
const StatCard = ({
  stat,
  index,
  isVisible
}: {
  stat: typeof stats[0];
  index: number;
  isVisible: boolean;
}) => {
  const formattedCount = useCountUp({
    end: stat.value,
    duration: 2000,
    prefix: stat.prefix,
    suffix: stat.suffix,
    isVisible
  });
  return <div className={`group relative p-6 rounded-2xl bg-slate-100 border border-slate-200 hover:bg-white hover:border-primary/40 transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
    transitionDelay: `${index * 100 + 300}ms`
  }}>
      {/* Animated gradient background */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br ${stat.glowColor}`} />
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
      
      {/* Corner glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
        <stat.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
      </div>
      
      <div className="mt-8 relative z-10">
        <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1 tabular-nums group-hover:text-primary transition-colors duration-300">
          {formattedCount}
        </div>
        <div className="text-slate-700 font-medium text-sm mb-1">
          {stat.label}
        </div>
        <div className="text-slate-500 text-xs group-hover:text-slate-600 transition-colors">
          {stat.description}
        </div>
      </div>
    </div>;
};
const AboutUsSection = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  return <div ref={ref} className="relative px-4 bg-slate-50 overflow-hidden py-[40px]">
      {/* Background Elements - Light theme */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs - Light version */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] animate-pulse" style={{
        animationDuration: '8s'
      }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse" style={{
        animationDuration: '10s',
        animationDelay: '2s'
      }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />
        
        {/* Diagonal lines */}
        <div className="absolute top-20 right-[10%] w-40 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent rotate-45 hidden lg:block" />
        <div className="absolute bottom-40 left-[15%] w-32 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -rotate-45 hidden lg:block" />
      </div>
      
      {/* Floating Sparkles */}
      <Sparkles className="absolute top-[20%] left-[8%] w-5 h-5 text-primary/40 animate-pulse hidden md:block" style={{
      animationDelay: '0s'
    }} />
      <Sparkles className="absolute top-[60%] right-[12%] w-6 h-6 text-cyan-400/30 animate-pulse hidden md:block" style={{
      animationDelay: '1s'
    }} />
      <Sparkles className="absolute bottom-[25%] left-[20%] w-4 h-4 text-purple-400/30 animate-pulse hidden md:block" style={{
      animationDelay: '2s'
    }} />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content - Light theme */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-6 tracking-widest uppercase">
              <span className="w-8 h-px bg-primary" />
              Why Choose Us
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
              We Bridge Your
              <br />
              Project to{" "}
              <span className="relative">
                <span className="text-primary">Korea</span>
                {/* Underline effect */}
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary via-cyan-400 to-primary rounded-full opacity-60" />
              </span>
            </h2>
            
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
              Founded by veterans from <span className="text-slate-800 font-semibold bg-slate-200 px-2 py-0.5 rounded">Binance</span> and{" "}
              <span className="text-slate-800 font-semibold bg-slate-200 px-2 py-0.5 rounded">KuCoin</span>, we deliver unmatched expertise 
              in Korean Web3 market entry, community building, and exchange partnerships.
            </p>

            <div className="group flex items-center gap-6 p-4 rounded-xl bg-white border border-slate-200 hover:border-primary/30 hover:shadow-lg transition-all duration-500 w-fit">
              <div className="flex -space-x-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 border-2 border-primary/40 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/60 transition-all duration-500">
                  <span className="text-primary text-base font-bold">J</span>
                </div>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-cyan-500/5 border-2 border-cyan-500/40 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-500/60 transition-all duration-500 -ml-3">
                  <span className="text-cyan-500 text-base font-bold">D</span>
                </div>
              </div>
              <div>
                <p className="text-slate-500 text-sm mb-0.5">Founded by</p>
                <p className="text-slate-800 font-medium">Ex-Binance & Ex-KuCoin Leaders</p>
              </div>
            </div>
          </div>

          {/* Right - Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />)}
          </div>
        </div>


        {/* As Featured In Section - Light theme */}
        <div className={`mt-12 pt-12 border-t border-slate-200 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-center text-slate-500 text-sm uppercase tracking-widest mb-8">
            As Featured In Media
          </p>
          <div className="relative overflow-hidden">
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
            
            <div className="flex items-center logo-marquee-slow">
              {[{
              name: "Cointelegraph",
              logo: "https://cointelegraph.com/icons/logo/en.svg"
            }, {
              name: "CoinDesk",
              logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/CoinDesk_logo.svg"
            }, {
              name: "BlockMedia",
              logo: "https://cdn.blockmedia.co.kr/wp-content/uploads/2024/07/Blockmedia_Logo_name.png"
            }, {
              name: "TokenPost",
              logo: "https://s1.tokenpost.com/assets/images/tokenpost_new/common_new/logo.svg"
            }, {
              name: "Coinness",
              logo: "https://event.coinness.com/awards/images/media/CoinNess.webp"
            }, {
              name: "Bloomingbit",
              logo: "https://event.coinness.com/awards/images/media/Bloomingbit.webp"
            }, {
              name: "The Economist",
              logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/The_Economist_Logo.svg"
            }].flatMap((media, i) => [media, media]).map((media, index) => <div key={index} className="flex items-center gap-2 sm:gap-3 mx-2 sm:mx-3 px-4 sm:px-5 py-2 sm:py-2.5 bg-white rounded-full border border-slate-200 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <img src={media.logo} alt={media.name} className="h-5 w-5 sm:h-6 sm:w-6 object-contain opacity-60 flex-shrink-0" />
                  <span className="text-slate-600 text-xs sm:text-sm font-medium whitespace-nowrap">
                    {media.name}
                  </span>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default AboutUsSection;