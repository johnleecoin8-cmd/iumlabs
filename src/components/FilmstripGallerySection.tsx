import { HoverExpand_001 } from "@/components/ui/expand-on-hover";

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
];

const FilmstripGallerySection = () => {
  return (
    <div className="min-h-[80vh] bg-[#0A0A0B] flex flex-col justify-center py-16 md:py-24">
      <div className="container mx-auto px-4 mb-8 md:mb-12">
        {/* Option B Header */}
        <div className="relative">
          <span className="absolute -top-8 left-0 text-[100px] md:text-[140px] font-bold text-white/[0.03] leading-none pointer-events-none select-none">
            04
          </span>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="text-white/50">Campaign</span>{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Gallery
              </span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mt-4 rounded-full" />
            <p className="text-white/40 text-lg mt-4 max-w-xl">
              Explore our successful campaigns and events across Korea's Web3 ecosystem. Drag to see more.
            </p>
          </div>
        </div>
      </div>
      
      <div className="w-full px-4 md:px-8">
        <HoverExpand_001 images={campaignImages} className="w-full" />
      </div>
    </div>
  );
};

export default FilmstripGallerySection;
