import { motion } from "framer-motion";

import coindeskLogo from "@/assets/logos/coindesk.png";
import cointelegraphLogo from "@/assets/logos/cointelegraph.png";
import blockmediaLogo from "@/assets/logos/blockmedia-new.png";
import hankyungLogo from "@/assets/logos/hankyung-new.png";
import bloomingbitLogo from "@/assets/logos/bloomingbit.png";
import coinnessLogo from "@/assets/logos/coinness.png";

const badges = [
  { name: "CoinDesk", logo: coindeskLogo },
  { name: "Cointelegraph", logo: cointelegraphLogo },
  { name: "BlockMedia", logo: blockmediaLogo },
  { name: "한국경제", logo: hankyungLogo },
  { name: "BloomingBit", logo: bloomingbitLogo },
  { name: "Coinness", logo: coinnessLogo },
];

const TrustBadgesSection = () => {
  return (
    <section className="py-8 md:py-12 bg-surface-base">
      <div className="px-4 md:px-8 lg:px-10">
        {/* Label */}
        <motion.p
          className="text-[10px] md:text-xs text-white/40 uppercase tracking-[0.2em] text-center mb-6 md:mb-8 font-mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          As Featured In
        </motion.p>

        {/* Badges Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 max-w-4xl mx-auto">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.name}
              className="flex items-center justify-center h-14 md:h-16 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <img
                src={badge.logo}
                alt={`Featured in ${badge.name}`}
                className="h-5 md:h-6 w-auto object-contain opacity-50 hover:opacity-80 transition-opacity duration-300 grayscale"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadgesSection;
