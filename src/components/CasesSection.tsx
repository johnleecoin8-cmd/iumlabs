import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

// Import logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.png";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import peaqLogo from "@/assets/logos/peaq.png";
import storyLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria.png";
import bybitLogo from "@/assets/logos/bybit.png";

// Import background images
import bnbBg from "@/assets/projects/bnb-bg.jpg";
import kucoinBg from "@/assets/projects/kucoin-bg.jpg";
import polygonBg from "@/assets/projects/polygon-bg.jpg";
import ondoBg from "@/assets/projects/ondo-bg.jpg";
import peaqBg from "@/assets/projects/peaq-bg.jpg";
import storyBg from "@/assets/projects/story-bg.jpg";
import triaBg from "@/assets/projects/tria-bg.jpg";

const featuredCases = [{
  name: "BNB Chain",
  logo: bnbLogo,
  bgImage: bnbBg,
  slug: "bnb-chain",
  category: "Infrastructure",
  result: "500K+",
  resultLabel: "Community Members",
  description: "Full-service marketing campaign for Korea market entry",
  glowColor: "#F3BA2F",
  roiBadge: "5x ROI"
}, {
  name: "KuCoin",
  logo: kucoinLogo,
  bgImage: kucoinBg,
  slug: "kucoin",
  category: "Exchange",
  result: "$2B+",
  resultLabel: "Trading Volume",
  description: "Community growth and influencer marketing strategy",
  glowColor: "#23AF91",
  roiBadge: "200% Growth"
}, {
  name: "Polygon",
  logo: polygonLogo,
  bgImage: polygonBg,
  slug: "polygon",
  category: "Layer 2",
  result: "100+",
  resultLabel: "Dapps Onboarded",
  description: "Developer outreach and ecosystem expansion",
  glowColor: "#8247E5",
  roiBadge: "150+ Projects"
}, {
  name: "Ondo Finance",
  logo: ondoLogo,
  bgImage: ondoBg,
  slug: "ondo",
  category: "RWA",
  result: "100K+",
  resultLabel: "Korean Community",
  description: "RWA education campaign for Korean investors",
  glowColor: "#3B82F6",
  roiBadge: "$50M+ TVL"
}, {
  name: "Peaq",
  logo: peaqLogo,
  bgImage: peaqBg,
  slug: "peaq",
  category: "DePIN",
  result: "#1",
  resultLabel: "DePIN in Korea",
  description: "Thought leadership in DePIN space",
  glowColor: "#00CED1",
  roiBadge: "1M+ Views"
}, {
  name: "Story Protocol",
  logo: storyLogo,
  bgImage: storyBg,
  slug: "story-protocol",
  category: "IP Protocol",
  result: "5K+",
  resultLabel: "Korean Creators",
  description: "Korean content creator onboarding",
  glowColor: "#FF6B9D",
  roiBadge: "300% Growth"
}, {
  name: "Tria",
  logo: triaLogo,
  bgImage: triaBg,
  slug: "tria",
  category: "Wallet",
  result: "50K+",
  resultLabel: "Users Onboarded",
  description: "Web3 wallet onboarding campaign for Korean market",
  glowColor: "#FF6B6B",
  roiBadge: "10x Growth"
}];

const clientLogos = [{
  name: "MegaETH",
  logo: megaethLogo
}, {
  name: "Bybit",
  logo: bybitLogo
}];
const CasesSection = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  return <div ref={ref} className="bg-[hsl(0,0%,5%)] px-px py-[10px]">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-[hsl(0,0%,5%)] px-px py-px">
            <span className="text-xs font-medium text-primary mb-4 block tracking-widest uppercase">
              Featured Cases
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Success <span className="text-primary">Stories</span>
            </h2>
          </div>
          <Link to="/projects" className="group flex items-center gap-2 text-white/60 hover:text-primary transition-colors">
            View all projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Cases Grid - 2 rows of 3 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuredCases.map((project, index) => <Link key={index} to={`/projects/${project.slug}`} onClick={() => window.scrollTo(0, 0)} className={`group relative overflow-hidden rounded-3xl min-h-[420px] flex flex-col transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
          transitionDelay: `${index * 150}ms`
        }}>
              {/* Background Image */}
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{
            backgroundImage: `url(${project.bgImage})`
          }} />
              
              {/* Dark Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
              
              {/* ROI Badge */}
              <div className="absolute top-4 right-4 z-20">
                <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs font-bold shadow-lg">
                  {project.roiBadge}
                </div>
              </div>
              
              {/* Intense Glow Effect on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{
            background: `radial-gradient(ellipse at 50% 50%, ${project.glowColor}40 0%, ${project.glowColor}15 40%, transparent 70%)`
          }} />
              <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" style={{
            boxShadow: `0 0 80px 30px ${project.glowColor}40, 0 0 120px 60px ${project.glowColor}20`
          }} />

              {/* Top Section - Category Badge with Project Color & Arrow */}
              <div className="relative z-10 p-8 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-widest text-white/90 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full" style={{
              border: `1px solid ${project.glowColor}50`
            }}>
                  {project.category}
                </span>
                <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" style={{
              backgroundColor: `${project.glowColor}30`,
              backdropFilter: 'blur(8px)'
            }}>
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Center - Spacer */}
              <div className="relative z-10 flex-1" />

              {/* Bottom Section - Stats with Project Color */}
              <div className="relative z-10 p-8 pt-4">
                {/* Description - Hidden by default, shown on hover */}
                <p className="text-sm text-white/60 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Stats Row with Project Color Border */}
                <div className="flex items-end justify-between pt-4" style={{
              borderTop: `1px solid ${project.glowColor}30`
            }}>
                  <div>
                    <span className="text-3xl md:text-4xl font-bold" style={{
                  color: project.glowColor
                }}>
                      {project.result}
                    </span>
                    <p className="text-sm text-white/50 mt-1">{project.resultLabel}</p>
                  </div>
                  <span className="text-base font-semibold text-white/80 group-hover:text-white transition-colors">
                    {project.name}
                  </span>
                </div>
              </div>
            </Link>)}
        </div>

        {/* Client Logos Marquee */}
        <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-center text-white/40 text-sm mb-8 uppercase tracking-widest">
            Trusted by 200+ Web3 Projects
          </p>
          <div className="flex items-center justify-center flex-wrap gap-8 md:gap-12">
            {clientLogos.map((client, index) => <div key={index} className="opacity-40 hover:opacity-80 transition-opacity">
                <img src={client.logo} alt={client.name} className="h-8 w-auto object-contain brightness-0 invert" />
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
export default CasesSection;