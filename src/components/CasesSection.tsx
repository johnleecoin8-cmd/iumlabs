import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

// Import logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.png";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import peaqLogo from "@/assets/logos/peaq.png";
import storyLogo from "@/assets/logos/story-protocol.png";

// Import campaign images
import bnbEvent from "@/assets/campaigns/bnb-event.jpg";
import kucoinCampaign from "@/assets/campaigns/kucoin-campaign.jpg";
import polygonHackathon from "@/assets/campaigns/polygon-hackathon.jpg";
import ondoSeminar from "@/assets/campaigns/ondo-seminar.jpg";
import peaqSummit from "@/assets/campaigns/peaq-summit.jpg";
import storyWorkshop from "@/assets/campaigns/story-workshop.jpg";

const cases = [
  {
    name: "BNB Chain",
    logo: bnbLogo,
    slug: "bnb-chain",
    result: "+340% Korean Trading Volume",
    category: "Infrastructure",
    image: bnbEvent,
    gradient: "from-[#F0B90B] via-[#F8D33A] to-[#FFA500]",
    overlayColor: "bg-gradient-to-br from-[#F0B90B]/80 via-[#F8D33A]/60 to-[#FFA500]/80",
  },
  {
    name: "KuCoin",
    logo: kucoinLogo,
    slug: "kucoin",
    result: "50K+ New Korean Users",
    category: "Exchange",
    image: kucoinCampaign,
    gradient: "from-[#23AF91] via-[#2DC9A3] to-[#00E8B5]",
    overlayColor: "bg-gradient-to-br from-[#23AF91]/80 via-[#2DC9A3]/60 to-[#00E8B5]/80",
  },
  {
    name: "Polygon",
    logo: polygonLogo,
    slug: "polygon",
    result: "$2M Korean TVL in 30 Days",
    category: "Layer 2",
    image: polygonHackathon,
    gradient: "from-[#8247E5] via-[#A06EFF] to-[#7B3FE4]",
    overlayColor: "bg-gradient-to-br from-[#8247E5]/80 via-[#A06EFF]/60 to-[#7B3FE4]/80",
  },
  {
    name: "Ondo Finance",
    logo: ondoLogo,
    slug: "ondo",
    result: "100K+ Korean Community",
    category: "RWA",
    image: ondoSeminar,
    gradient: "from-[#0052FF] via-[#3377FF] to-[#6699FF]",
    overlayColor: "bg-gradient-to-br from-[#0052FF]/80 via-[#3377FF]/60 to-[#6699FF]/80",
  },
  {
    name: "Peaq",
    logo: peaqLogo,
    slug: "peaq",
    result: "#1 DePIN in Korea",
    category: "DePIN",
    image: peaqSummit,
    gradient: "from-[#00FF9D] via-[#00D68F] to-[#00B377]",
    overlayColor: "bg-gradient-to-br from-[#00FF9D]/80 via-[#00D68F]/60 to-[#00B377]/80",
  },
  {
    name: "Story Protocol",
    logo: storyLogo,
    slug: "story-protocol",
    result: "5K+ Korean Creators",
    category: "IP Protocol",
    image: storyWorkshop,
    gradient: "from-[#FF6B4A] via-[#FF8E6E] to-[#FF4757]",
    overlayColor: "bg-gradient-to-br from-[#FF6B4A]/80 via-[#FF8E6E]/60 to-[#FF4757]/80",
  },
];

interface CaseCardProps {
  caseItem: typeof cases[0];
  index: number;
}

const CaseCard = ({ caseItem, index }: CaseCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const rotateX = isHovered ? (mousePosition.y - 0.5) * -25 : 0;
  const rotateY = isHovered ? (mousePosition.x - 0.5) * 25 : 0;
  const scale = isHovered ? 1.05 : 1;

  return (
    <Link
      to={`/projects/${caseItem.slug}`}
      className="group block"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePosition({ x: 0.5, y: 0.5 });
        }}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered 
            ? '0 50px 100px -20px rgba(0,0,0,0.5), 0 30px 60px -30px rgba(0,0,0,0.5)' 
            : '0 10px 30px -10px rgba(0,0,0,0.3)',
        }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
          style={{ 
            backgroundImage: `url(${caseItem.image})`,
            transform: isHovered ? 'scale(1.15)' : 'scale(1)',
          }}
        />
        
        {/* Color Overlay */}
        <div className={`absolute inset-0 ${caseItem.overlayColor} mix-blend-multiply transition-opacity duration-500 ${isHovered ? 'opacity-70' : 'opacity-90'}`} />
        
        {/* Gradient Mesh */}
        <div className={`absolute inset-0 bg-gradient-to-br ${caseItem.gradient} opacity-40`} />
        
        {/* Animated Shine Effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
          }}
        />

        {/* Logo and Name */}
        <div 
          className="absolute top-6 left-6 flex items-center gap-3 z-10"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/30">
            <img src={caseItem.logo} alt={caseItem.name} className="w-10 h-10 object-contain drop-shadow-2xl" />
          </div>
          <span className="text-white text-2xl font-bold drop-shadow-2xl tracking-tight">{caseItem.name}</span>
        </div>

        {/* Category Badge */}
        <div 
          className="absolute top-6 right-6 z-10"
          style={{ transform: 'translateZ(30px)' }}
        >
          <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium border border-white/30">
            {caseItem.category}
          </span>
        </div>

        {/* Bottom Result - Always visible */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-6 z-10"
          style={{ transform: 'translateZ(50px)' }}
        >
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10 transition-all duration-500 group-hover:bg-black/60">
            <p className="text-white text-lg font-bold tracking-tight">{caseItem.result}</p>
            <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span className="text-white/80 text-sm">View Case Study</span>
              <ArrowUpRight className="w-4 h-4 text-white/80" />
            </div>
          </div>
        </div>

        {/* Corner Accent */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
      </div>
    </Link>
  );
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
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {cases.map((caseItem, index) => (
            <CaseCard key={caseItem.name} caseItem={caseItem} index={index} />
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