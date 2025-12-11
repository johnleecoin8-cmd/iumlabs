import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "@/components/TiltCard";

// Import logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.png";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import peaqLogo from "@/assets/logos/peaq.png";
import storyLogo from "@/assets/logos/story-protocol.png";

const cases = [
  {
    name: "BNB Chain",
    logo: bnbLogo,
    slug: "bnb-chain",
    result: "+340% Korean Trading Volume",
    category: "Infrastructure",
    decorationType: "bnb",
  },
  {
    name: "KuCoin",
    logo: kucoinLogo,
    slug: "kucoin",
    result: "50K+ New Korean Users",
    category: "Exchange",
    decorationType: "kucoin",
  },
  {
    name: "Polygon",
    logo: polygonLogo,
    slug: "polygon",
    result: "$2M Korean TVL in 30 Days",
    category: "Layer 2",
    decorationType: "polygon",
  },
  {
    name: "Ondo Finance",
    logo: ondoLogo,
    slug: "ondo",
    result: "100K+ Korean Community",
    category: "RWA",
    decorationType: "ondo",
  },
  {
    name: "Peaq",
    logo: peaqLogo,
    slug: "peaq",
    result: "#1 DePIN in Korea",
    category: "DePIN",
    decorationType: "peaq",
  },
  {
    name: "Story Protocol",
    logo: storyLogo,
    slug: "story-protocol",
    result: "5K+ Korean Creators",
    category: "IP Protocol",
    decorationType: "story",
  },
];

// Vibrant card styles inspired by Lunar Strategy
const CardContent = ({ type, logo, name }: { type: string; logo: string; name: string }) => {
  switch (type) {
    case "bnb":
      // Hot pink/magenta like Polkadot
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#E91E8C] via-[#FF2DAF] to-[#9B1FE8] overflow-hidden">
          {/* Large decorative circles */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#FF1493]/60 blur-sm" />
          <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-[#FF69B4]/50" />
          <div className="absolute bottom-32 left-32 w-24 h-24 rounded-full bg-[#C71585]/70" />
          <div className="absolute top-20 right-10 w-16 h-16 rounded-full bg-white/20" />
          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
          {/* Logo */}
          <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
            <img src={logo} alt={name} className="w-12 h-12 object-contain drop-shadow-2xl" />
            <span className="text-white text-2xl font-bold drop-shadow-lg">{name}</span>
          </div>
        </div>
      );
    
    case "kucoin":
      // Soft gradient like Cardano
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8F4F8] via-[#FFF5E6] to-[#FFE4D6] overflow-hidden">
          {/* Warm sun-like center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-radial from-[#FF9D5C]/70 via-[#FFBE82]/50 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-radial from-[#FFB366]/60 to-transparent" />
          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, #666 0.5px, transparent 0.5px)',
            backgroundSize: '12px 12px'
          }} />
          {/* Logo */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
            <img src={logo} alt={name} className="w-10 h-10 object-contain" />
            <span className="text-slate-700 text-xl font-semibold tracking-wider uppercase">{name}</span>
          </div>
        </div>
      );
    
    case "polygon":
      // Dark blue with scattered elements like Internet Computer
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B3E] via-[#1A2B5C] to-[#0A1628] overflow-hidden">
          {/* Scattered colorful elements */}
          <div className="absolute top-1/4 left-1/4 w-2 h-8 bg-cyan-400 rotate-45 opacity-80" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-pink-500 rotate-12" />
          <div className="absolute bottom-1/4 left-1/3 w-2 h-6 bg-orange-400 -rotate-45 opacity-70" />
          <div className="absolute top-2/3 right-1/3 w-4 h-1 bg-purple-400 rotate-90" />
          <div className="absolute bottom-1/3 right-1/5 w-2 h-2 bg-blue-400 rounded-full" />
          <div className="absolute top-1/2 left-1/5 w-1 h-4 bg-green-400 rotate-30 opacity-60" />
          {/* More scattered particles */}
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-1 h-1 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#06B6D4', '#EC4899', '#F97316', '#8B5CF6', '#10B981'][i % 5],
                opacity: 0.6 + Math.random() * 0.4,
              }}
            />
          ))}
          {/* Logo */}
          <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
            <div className="w-10 h-10 flex items-center justify-center">
              <svg viewBox="0 0 38 33" className="w-10 h-10 text-white">
                <path fill="currentColor" d="M19 0l19 33H0L19 0zm0 8L8 27h22L19 8z"/>
              </svg>
            </div>
            <span className="text-white text-xl font-bold">{name}</span>
          </div>
        </div>
      );
    
    case "ondo":
      // Black with chrome 3D sphere like MultiversX
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#000000] overflow-hidden">
          {/* Chrome 3D sphere effect */}
          <div className="absolute bottom-0 left-0 w-48 h-48">
            <div className="absolute inset-0 rounded-full bg-gradient-conic from-pink-500 via-purple-600 via-blue-500 via-teal-400 via-yellow-400 to-pink-500 blur-md opacity-80" 
                 style={{ transform: 'perspective(400px) rotateX(20deg)' }} />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-slate-300 via-slate-500 to-slate-800"
                 style={{ transform: 'perspective(400px) rotateX(20deg)' }} />
            <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-white/40 to-transparent opacity-60" />
          </div>
          {/* Ambient glow */}
          <div className="absolute bottom-0 left-0 w-64 h-32 bg-gradient-to-t from-purple-500/20 via-blue-500/10 to-transparent blur-2xl" />
          {/* Logo */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <span className="text-white text-3xl font-light tracking-wider">
              Ondo<span className="text-cyan-400 align-super text-sm">Finance</span>
            </span>
          </div>
        </div>
      );
    
    case "peaq":
      // Green with dot pattern like Aethir
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#4A7C59] via-[#5D8A68] to-[#3D6B4A] overflow-hidden">
          {/* Dot grid pattern */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 2px, transparent 2px)',
            backgroundSize: '24px 24px'
          }} />
          {/* Gradient overlay top */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#3A6B4A]/50 to-transparent" />
          {/* Small accent dots */}
          <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-[#00FF9D]/60" />
          <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-white/40" />
          {/* Logo */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            <div className="text-[#C5FF4A] font-bold text-3xl tracking-tight">
              <span className="inline-block transform -skew-x-6">▲</span>
            </div>
            <span className="text-white text-3xl font-bold">{name}</span>
            <span className="text-white/50 text-xs align-super">™</span>
          </div>
        </div>
      );
    
    case "story":
      // Coral/orange gradient with stripes
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B4A] via-[#FF7F5C] to-[#FF8E6E] overflow-hidden">
          {/* Vertical stripes */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.3) 8px, rgba(255,255,255,0.3) 10px)',
          }} />
          {/* Dark section at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#1A2B5C] to-transparent" />
          {/* Abstract icon */}
          <div className="absolute bottom-12 right-12 w-20 h-20 opacity-80">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/90 rounded-sm" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-10 bg-white/80 rounded-sm" />
          </div>
          {/* Small dots scattered */}
          <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-white/60" />
          <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-[#1A2B5C]/40" />
          {/* Logo */}
          <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
            <img src={logo} alt={name} className="w-10 h-10 object-contain drop-shadow-lg" />
            <span className="text-white text-xl font-semibold drop-shadow-md">{name}</span>
          </div>
        </div>
      );
    
    default:
      return null;
  }
};

const CasesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="py-24 px-4 flex-1 bg-[hsl(0,0%,96%)]">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className={`flex flex-col md:flex-row items-start md:items-center justify-between mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span className="number-badge text-[hsl(0,0%,40%)]">200+ Clients</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-center text-[hsl(0,0%,8%)] flex-1">
            Featured <span className="serif-italic">Cases</span>
          </h2>
          
          <div className="text-[hsl(0,0%,60%)] text-2xl font-light hidden md:block">///</div>
        </div>

        {/* Cases Grid - 3x2 */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {cases.map((caseItem, index) => (
            <Link
              key={caseItem.name}
              to={`/projects/${caseItem.slug}`}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TiltCard
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500"
                max={8}
                scale={1.02}
                speed={400}
              >
                {/* Card Content */}
                <CardContent type={caseItem.decorationType} logo={caseItem.logo} name={caseItem.name} />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-20" />

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-30">
                  <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <ArrowUpRight className="w-5 h-5 text-slate-800" />
                  </div>
                </div>

                {/* Bottom Result (shows on hover) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                  <p className="text-white text-sm font-semibold">{caseItem.result}</p>
                  <p className="text-white/70 text-xs mt-1">{caseItem.category}</p>
                </div>
              </TiltCard>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className={`flex justify-center mt-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link
            to="/projects"
            className="lunar-btn-outline border-[hsl(0,0%,20%)] text-[hsl(0,0%,20%)] hover:bg-[hsl(0,0%,20%)] hover:text-white"
          >
            <span>View All Cases</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CasesSection;