// Import media logos
import coindeskLogo from "@/assets/logos/coindesk.png";
import consensysLogo from "@/assets/logos/consensys.png";
import economistLogo from "@/assets/logos/economist.png";
import cointelegraphLogo from "@/assets/logos/cointelegraph.png";
import bloomingbitLogo from "@/assets/logos/bloomingbit.png";
import coinnessLogo from "@/assets/logos/coinness.png";
import hankyungLogo from "@/assets/logos/hankyung-new.png";

const mediaLogos = [
  { name: "Cointelegraph", logo: cointelegraphLogo, url: "https://cointelegraph.com" },
  { name: "CoinDesk", logo: coindeskLogo, url: "https://coindesk.com" },
  { name: "Consensys", logo: consensysLogo, url: "https://consensys.io" },
  { name: "Coinness", logo: coinnessLogo, url: "https://coinness.com" },
  { name: "Bloomingbit", logo: bloomingbitLogo, url: "https://bloomingbit.io" },
  { name: "The Economist", logo: economistLogo, url: "https://economist.com" },
  { name: "한국경제", logo: hankyungLogo, url: "https://hankyung.com" },
];

const MediaPartnersSection = () => {
  const tripled = [...mediaLogos, ...mediaLogos, ...mediaLogos];

  return (
    <section className="bg-surface-base overflow-hidden marquee-container">
      <div className="relative">
        {/* Small label */}
        <div className="flex items-center justify-center gap-3 pt-4 pb-2">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-[10px] text-white/40 tracking-[0.3em] uppercase font-light">Media Spots</span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/20" />
        </div>

        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-base to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-base to-transparent z-10" />

        {/* Marquee */}
        <div className="flex items-center py-3 sm:py-4 logo-marquee-slow">
          {tripled.map((media, index) => (
            <a
              key={`${media.name}-${index}`}
              href={media.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-3 mx-1 sm:mx-2 px-3 sm:px-6 py-2 sm:py-3.5 bg-zinc-900/80 rounded-full border border-white/15 hover:border-white/25 hover:bg-zinc-800/80 transition-all duration-300 flex-shrink-0"
            >
              <img
                src={media.logo}
                alt={media.name}
                loading="lazy"
                decoding="async"
                className="h-3.5 sm:h-7 w-auto max-w-[60px] sm:max-w-[140px] object-contain rounded-full opacity-85"
              />
              <span className="text-white/75 text-[10px] sm:text-sm font-medium whitespace-nowrap">
                {media.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaPartnersSection;
