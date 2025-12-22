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
  const duplicatedLogos = [...mediaLogos, ...mediaLogos, ...mediaLogos];

  return (
    <section className="relative bg-[#0A0A0A] py-12 overflow-hidden">
      {/* Gradient border top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Row 1 - Left to Right */}
      <div className="relative mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
        
        <motion.div
          className="flex items-center gap-16"
          animate={{ x: [0, -100 * mediaLogos.length] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((media, index) => (
            <div
              key={`row1-${media.name}-${index}`}
              className="group flex items-center gap-4 flex-shrink-0 py-3 px-6 rounded-full border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-300 cursor-pointer"
            >
              <img
                src={media.logo}
                alt={media.name}
                className="w-8 h-8 object-contain rounded-full grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 transition-all duration-300"
              />
              <span className="text-white/30 group-hover:text-white/80 text-sm font-medium whitespace-nowrap transition-colors duration-300">
                {media.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - Right to Left (Counter-directional) */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
        
        <motion.div
          className="flex items-center gap-16"
          initial={{ x: -100 * mediaLogos.length }}
          animate={{ x: [- 100 * mediaLogos.length, 0] }}
          transition={{
            x: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {[...duplicatedLogos].reverse().map((media, index) => (
            <div
              key={`row2-${media.name}-${index}`}
              className="group flex items-center gap-4 flex-shrink-0 py-3 px-6 rounded-full border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-300 cursor-pointer"
            >
              <img
                src={media.logo}
                alt={media.name}
                className="w-8 h-8 object-contain rounded-full grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 transition-all duration-300"
              />
              <span className="text-white/30 group-hover:text-white/80 text-sm font-medium whitespace-nowrap transition-colors duration-300">
                {media.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradient border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
};

export default MediaPartnersSection;