import { HoverExpand_001 } from "@/components/ui/expand-on-hover";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

// Import actual campaign images from assets
import bnbEvent from "@/assets/campaigns/bnb-event.jpg";
import ondoSeminar from "@/assets/campaigns/ondo-seminar.jpg";
import fogoFest from "@/assets/campaigns/fogo-fest.avif";
import peaqSummit from "@/assets/campaigns/peaq-summit.jpg";
import triaLaunch from "@/assets/campaigns/tria-launch.jpg";
import lbankFestival from "@/assets/campaigns/lbank-festival.jpg";
import kucoinOldschool from "@/assets/campaigns/kucoin-oldschool.jpg";
import openledgerInterview from "@/assets/campaigns/openledger-interview.jpg";
import zkpassNights from "@/assets/campaigns/zkpass-verifiable-nights.jpg";

const campaignImages = [
  { src: bnbEvent, alt: "BNB Chain Event", code: "BNB Chain - Korea Launch Event 2024" },
  { src: ondoSeminar, alt: "Story Protocol Origin Summit", code: "Story Protocol - Origin Summit 2025" },
  { src: fogoFest, alt: "FOGO Fogo Fest 2025", code: "FOGO - Fogo Fest 2025" },
  { src: peaqSummit, alt: "Peaq KBW 2025", code: "Peaq - KBW 2025" },
  { src: triaLaunch, alt: "Tria Korea Media Interview", code: "Tria - Korea Media Interview" },
  { src: lbankFestival, alt: "Lbank 1001 Festival Seoul", code: "Lbank - 1001 Festival Seoul" },
  { src: kucoinOldschool, alt: "Kucoin Old School is Back", code: "Kucoin - Old School is Back with Orbs and IOST" },
  { src: openledgerInterview, alt: "Open Ledger Korea Media Interview", code: "Open Ledger - Korea Media Interview" },
  { src: zkpassNights, alt: "zkPass The Verifiable Nights", code: "zkPass - The Verifiable Nights" },
];

const floatingTags = [
  { label: "9+ Events", top: "10%", right: "8%", delay: 0 },
  { label: "Live Campaigns", bottom: "15%", left: "5%", delay: 0.2 },
];

const FilmstripGallerySection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="relative min-h-[80vh] bg-[#0A0A0B] flex flex-col justify-center py-16 md:py-24 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Tags */}
      <div className="hidden lg:block">
        {floatingTags.map((tag, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: tag.delay + 0.3 }}
            className="absolute z-10 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/60 text-xs font-medium hover:bg-white/[0.06] hover:border-white/20 hover:text-white transition-all duration-300 cursor-default backdrop-blur-sm"
            style={{
              top: tag.top,
              left: tag.left,
              right: tag.right,
              bottom: tag.bottom
            }}
          >
            {tag.label}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 mb-8 md:mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="text-white/40 text-xs font-mono tracking-widest uppercase mb-4 block">
            [ 04 ] ── Our Cases
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Campaign <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-white/50 text-lg">
            Explore our successful campaigns and events across Korea's Web3 ecosystem. Drag to see more.
          </p>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full px-4 md:px-8 relative z-10"
      >
        <HoverExpand_001 images={campaignImages} className="w-full" />
      </motion.div>
    </div>
  );
};

export default FilmstripGallerySection;
