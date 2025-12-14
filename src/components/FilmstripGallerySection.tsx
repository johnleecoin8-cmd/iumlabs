import { HoverExpand_001 } from "@/components/ui/expand-on-hover";

// Import actual campaign images from assets
import bnbEvent from "@/assets/campaigns/bnb-event.jpg";
import kucoinCampaign from "@/assets/campaigns/kucoin-campaign.jpg";
import polygonHackathon from "@/assets/campaigns/polygon-hackathon.jpg";
import ondoSeminar from "@/assets/campaigns/ondo-seminar.jpg";
import storyWorkshop from "@/assets/campaigns/story-workshop.jpg";
import megaethLaunch from "@/assets/campaigns/megaeth-launch.jpg";
import bybitCompetition from "@/assets/campaigns/bybit-competition.jpg";
import peaqSummit from "@/assets/campaigns/peaq-summit.jpg";
import triaLaunch from "@/assets/campaigns/tria-launch.jpg";

const campaignImages = [
  {
    src: bnbEvent,
    alt: "BNB Chain Event",
    code: "BNB Chain - Korea Launch Event 2024",
  },
  {
    src: kucoinCampaign,
    alt: "KuCoin Campaign",
    code: "KuCoin - Market Expansion Campaign",
  },
  {
    src: polygonHackathon,
    alt: "Polygon Hackathon",
    code: "Polygon - Developer Hackathon Seoul",
  },
  {
    src: ondoSeminar,
    alt: "Ondo Finance Seminar",
    code: "Ondo Finance - RWA Seminar",
  },
  {
    src: storyWorkshop,
    alt: "Story Protocol Workshop",
    code: "Story Protocol - IP Workshop",
  },
  {
    src: megaethLaunch,
    alt: "MegaETH Launch",
    code: "MegaETH - Korea Community Launch",
  },
  {
    src: bybitCompetition,
    alt: "Bybit Competition",
    code: "Bybit - Trading Competition Korea",
  },
  {
    src: peaqSummit,
    alt: "Peaq Summit",
    code: "Peaq - DePIN Summit Seoul",
  },
  {
    src: triaLaunch,
    alt: "Tria Launch",
    code: "Tria - Korea Community Launch",
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
