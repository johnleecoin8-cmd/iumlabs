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
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-base to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-base to-transparent z-10" />
        
        {/* Marquee with CSS animation */}
        <div className="flex items-center gap-16 py-10 logo-marquee-slow">
          {duplicatedLogos.map((media, index) => (
            <div
              key={`${media.name}-${index}`}
              className="flex items-center gap-4 flex-shrink-0"
            >
              <img
                src={media.logo}
                alt={media.name}
                className="w-8 h-8 object-contain rounded-full opacity-80"
              />
              <span className="text-white/60 text-base font-medium whitespace-nowrap">
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
