import { motion } from "framer-motion";

// Import client logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import peaqLogo from "@/assets/logos/peaq.svg";
import storyProtocolLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria-official.png";
import mantraLogo from "@/assets/logos/mantra.png";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import fogoLogo from "@/assets/logos/fogo.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";

const clientLogos = [
  { name: "BNB", logo: bnbLogo, noInvert: false },
  { name: "KuCoin", logo: kucoinLogo, noInvert: false },
  { name: "Polygon", logo: polygonLogo, noInvert: false },
  { name: "Ondo Finance", logo: ondoLogo, noInvert: false },
  { name: "Bybit", logo: bybitLogo, noInvert: false },
  { name: "Peaq", logo: peaqLogo, noInvert: false },
  { name: "Story Protocol", logo: storyProtocolLogo, noInvert: false },
  { name: "MegaETH", logo: megaethLogo, noInvert: false },
  { name: "Tria", logo: triaLogo, noInvert: true },
  { name: "Mantra", logo: mantraLogo, noInvert: true },
  { name: "Sahara AI", logo: saharaAiLogo, noInvert: true },
  { name: "FOGO", logo: fogoLogo, noInvert: true },
  { name: "SynFutures", logo: synfuturesLogo, noInvert: true },
];

const KeyResultMarquee = () => {
  return (
    <motion.div 
      className="relative w-full overflow-hidden py-3 sm:py-4 border-t border-white/10 bg-black/30 backdrop-blur-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Section indicator */}
      <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white/50 text-label z-20">
        <span className="number-badge">01</span>
      </div>

      <div className="flex items-center logo-marquee-slow ml-12 sm:ml-20">
        {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 sm:gap-2.5 mx-1.5 sm:mx-2.5 px-3 sm:px-5 py-1.5 sm:py-2.5 bg-zinc-900/80 rounded-full border border-white/15 hover:border-white/25 transition-all duration-300"
          >
            <img 
              src={client.logo} 
              alt={client.name} 
              className={`h-4 w-4 sm:h-5 sm:w-5 object-contain flex-shrink-0 ${client.noInvert ? 'opacity-90' : 'brightness-0 invert opacity-85'}`} 
            />
            <span className="text-white/75 text-caption font-medium whitespace-nowrap">
              {client.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default KeyResultMarquee;
