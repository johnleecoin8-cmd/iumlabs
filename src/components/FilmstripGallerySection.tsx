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
];

const FilmstripGallerySection = () => {
  return (
    <div className="min-h-[80vh] bg-background flex flex-col justify-center py-16 md:py-24">
      <div className="container mx-auto px-4 mb-8 md:mb-12">
        <div className="max-w-3xl">
          <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
            [ Our Cases ]
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Campaign Gallery
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our successful campaigns and events across Korea's Web3 ecosystem. Drag to see more.
          </p>
        </div>
      </div>
      
      <div className="w-full px-4 md:px-8">
        <HoverExpand_001 images={campaignImages} className="w-full" />
      </div>
    </div>
  );
};

export default FilmstripGallerySection;
