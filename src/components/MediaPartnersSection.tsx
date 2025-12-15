import { motion } from "framer-motion";

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
    <section className="bg-[#0A0A0A] overflow-hidden">
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
        
        {/* Marquee */}
        <motion.div
          className="flex items-center gap-12 py-6"
          animate={{ x: [0, -50 * mediaLogos.length] }}
          transition={{
            x: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((media, index) => (
            <div
              key={`${media.name}-${index}`}
              className="flex items-center gap-3 flex-shrink-0"
            >
              <img
                src={media.logo}
                alt={media.name}
                className="w-6 h-6 object-contain rounded-full opacity-60"
              />
              <span className="text-white/40 text-sm font-medium whitespace-nowrap">
                {media.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MediaPartnersSection;
