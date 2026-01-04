// Import media logos
import coindeskLogo from "@/assets/logos/coindesk.png";
import blockmediaLogo from "@/assets/logos/blockmedia-new.png";
import economistLogo from "@/assets/logos/economist.png";
import cointelegraphLogo from "@/assets/logos/cointelegraph.png";
import bloomingbitLogo from "@/assets/logos/bloomingbit.png";
import coinnessLogo from "@/assets/logos/coinness.png";

const mediaLogos = [
  { name: "Cointelegraph", logo: cointelegraphLogo },
  { name: "CoinDesk", logo: coindeskLogo },
  { name: "BlockMedia", logo: blockmediaLogo },
  { name: "TokenPost", logo: "https://miro.medium.com/v2/resize:fill:176:176/1*pCtFs9n-MWMhU133o7trNA.jpeg" },
  { name: "Coinness", logo: coinnessLogo },
  { name: "Bloomingbit", logo: bloomingbitLogo },
  { name: "The Economist", logo: economistLogo },
];

const MediaPartnersSection = () => {
  // Double the array for seamless loop
  const duplicatedLogos = [...mediaLogos, ...mediaLogos];

  return (
    <section className="bg-surface-base overflow-hidden">
      <div className="relative">
        {/* Small label */}
        <div className="flex items-center justify-center gap-3 pt-4 pb-2">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-[10px] text-white/40 tracking-[0.3em] uppercase font-light">Media Partners</span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/20" />
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-base to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-base to-transparent z-10" />
        
        {/* Marquee with CSS animation */}
        <div className="flex items-center gap-8 sm:gap-12 md:gap-16 py-3 sm:py-4 logo-marquee-slow">
          {duplicatedLogos.map((media, index) => (
            <div
              key={`${media.name}-${index}`}
              className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0"
            >
              <img
                src={media.logo}
                alt={media.name}
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain rounded-full opacity-80"
              />
              <span className="text-white/60 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap">
                {media.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaPartnersSection;
