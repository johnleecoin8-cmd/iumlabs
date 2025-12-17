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
  // Triple the array for seamless loop
  const duplicatedLogos = [...mediaLogos, ...mediaLogos, ...mediaLogos];

  return (
    <section className="bg-[#0A0A0A] overflow-hidden relative">
      {/* Indigo gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-blue-500/5 to-indigo-500/5 pointer-events-none" />
      
      <div className="relative py-2">
        {/* Gradient overlays with indigo tint */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10" />
        
        {/* First row - moving left */}
        <motion.div
          className="flex items-center gap-16 py-4"
          animate={{ x: [0, -60 * mediaLogos.length] }}
          transition={{
            x: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((media, index) => (
            <motion.div
              key={`row1-${media.name}-${index}`}
              className="flex items-center gap-3 flex-shrink-0 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <img
                  src={media.logo}
                  alt={media.name}
                  className="w-7 h-7 object-contain rounded-full opacity-50 group-hover:opacity-100 transition-all duration-300"
                />
                {/* Blue glow on hover */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md bg-indigo-500/40" />
              </div>
              <span className="text-white/30 text-sm font-medium whitespace-nowrap group-hover:text-indigo-300 transition-colors duration-300">
                {media.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Second row - moving right (opposite direction) */}
        <motion.div
          className="flex items-center gap-16 py-4"
          animate={{ x: [-60 * mediaLogos.length, 0] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((media, index) => (
            <motion.div
              key={`row2-${media.name}-${index}`}
              className="flex items-center gap-3 flex-shrink-0 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <img
                  src={media.logo}
                  alt={media.name}
                  className="w-7 h-7 object-contain rounded-full opacity-50 group-hover:opacity-100 transition-all duration-300"
                />
                {/* Blue glow on hover */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md bg-blue-500/40" />
              </div>
              <span className="text-white/30 text-sm font-medium whitespace-nowrap group-hover:text-blue-300 transition-colors duration-300">
                {media.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MediaPartnersSection;
