import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import logoCoindesk from "@/assets/logos/coindesk.png";
import logoBlockmedia from "@/assets/logos/blockmedia-new.png";
import logoHankyung from "@/assets/logos/hankyung-new.png";
import logoCointelegraph from "@/assets/logos/cointelegraph.png";
import logoEconomist from "@/assets/logos/economist.png";
import logoBloomingbit from "@/assets/logos/bloomingbit.png";

const mediaLogos = [
  { src: logoCoindesk, alt: "CoinDesk Korea", width: 120 },
  { src: logoCointelegraph, alt: "CoinTelegraph", width: 130 },
  { src: logoBlockmedia, alt: "Block Media", width: 110 },
  { src: logoHankyung, alt: "한국경제", width: 100 },
  { src: logoEconomist, alt: "The Economist", width: 110 },
  { src: logoBloomingbit, alt: "Bloomingbit", width: 110 },
];

const stats = [
  { value: "25+", label: "Projects Launched" },
  { value: "250+", label: "KOLs in Network" },
  { value: "$35M+", label: "Revenue Driven" },
  { value: "200+", label: "Media Placements" },
];

const TrustSignalsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  return (
    <div ref={ref} className="py-12 sm:py-16">
      <div className="px-4 sm:px-6 lg:px-10">
        <p className={`text-[10px] sm:text-xs text-white/30 uppercase tracking-[0.25em] text-center mb-8 sm:mb-10 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          Featured In
        </p>

        <div className={`flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-16 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {mediaLogos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-5 sm:h-6 lg:h-7 w-auto object-contain opacity-40 hover:opacity-70 transition-opacity duration-300 grayscale"
              style={{ maxWidth: logo.width }}
            />
          ))}
        </div>

        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-0 border border-white/[0.06] rounded-xl overflow-hidden transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center py-6 sm:py-8 ${i < stats.length - 1 ? 'border-r border-white/[0.06]' : ''} ${i < 2 ? 'border-b sm:border-b-0 border-white/[0.06]' : ''}`}
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-[-0.02em]">{stat.value}</div>
              <div className="text-[9px] sm:text-[11px] text-white/30 uppercase tracking-[0.15em] mt-2 font-medium font-mono">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustSignalsSection;
