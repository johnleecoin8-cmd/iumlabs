import { HoverExpand_001 } from "@/components/ui/expand-on-hover";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

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
import saharaAi from "@/assets/campaigns/sahara-ai.jpg";
import synfuturesBillboard from "@/assets/campaigns/synfutures-billboard.jpg";

const campaignImages = [
  {
    src: bnbEvent,
    alt: "BNB Chain Event",
    code: "BNB Chain - Korea Launch Event 2024",
  },
  {
    src: ondoSeminar,
    alt: "Story Protocol Origin Summit",
    code: "Story Protocol - Origin Summit 2025",
  },
  {
    src: fogoFest,
    alt: "FOGO Fogo Fest 2025",
    code: "FOGO - Fogo Fest 2025",
  },
  {
    src: peaqSummit,
    alt: "Peaq KBW 2025",
    code: "Peaq - KBW 2025",
  },
  {
    src: triaLaunch,
    alt: "Tria Korea Media Interview",
    code: "Tria - Korea Media Interview",
  },
  {
    src: lbankFestival,
    alt: "Lbank 1001 Festival Seoul",
    code: "Lbank - 1001 Festival Seoul",
  },
  {
    src: kucoinOldschool,
    alt: "Kucoin Old School is Back",
    code: "Kucoin - Old School is Back with Orbs and IOST",
  },
  {
    src: openledgerInterview,
    alt: "Open Ledger Korea Media Interview",
    code: "Open Ledger - Korea Media Interview",
  },
  {
    src: zkpassNights,
    alt: "zkPass The Verifiable Nights",
    code: "zkPass - The Verifiable Nights",
  },
  {
    src: saharaAi,
    alt: "Sahara AI Korea Launch",
    code: "Sahara AI - Korean AI x Web3 Launch",
  },
  {
    src: synfuturesBillboard,
    alt: "SynFutures Gangnam Billboard",
    code: "SynFutures - Gangnam Billboard Promotion",
  },
];

const FilmstripGallerySection = () => {
  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-[#0A0A0B] via-[#0F0F12] to-[#0A0A0B] flex flex-col justify-center py-16 md:py-24 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container mx-auto px-4 mb-8 md:mb-12 relative z-10">
        {/* 4pillars-style Header */}
        <SectionHeader 
          title="GALLERY" 
          dark={true}
        />
        
        {/* Subtitle */}
        <motion.p 
          className="text-white/40 text-lg -mt-8 mb-8 max-w-xl"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explore our successful campaigns and events across Korea's Web3 ecosystem. Drag to see more.
        </motion.p>
      </div>
      
      <div className="w-full px-4 md:px-8">
        <HoverExpand_001 images={campaignImages} className="w-full" />
      </div>
    </div>
  );
};

export default FilmstripGallerySection;
