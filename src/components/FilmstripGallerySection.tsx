import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
  { src: bnbEvent, alt: "BNB Chain Event", title: "BNB Chain", subtitle: "Korea Launch Event 2024" },
  { src: ondoSeminar, alt: "Story Protocol", title: "Story Protocol", subtitle: "Origin Summit 2025" },
  { src: fogoFest, alt: "FOGO Fest", title: "FOGO", subtitle: "Fogo Fest 2025" },
  { src: peaqSummit, alt: "Peaq Summit", title: "Peaq", subtitle: "KBW 2025" },
  { src: triaLaunch, alt: "Tria Launch", title: "Tria", subtitle: "Korea Media Interview" },
  { src: lbankFestival, alt: "Lbank Festival", title: "Lbank", subtitle: "1001 Festival Seoul" },
  { src: kucoinOldschool, alt: "Kucoin Event", title: "Kucoin", subtitle: "Old School is Back" },
  { src: openledgerInterview, alt: "Open Ledger", title: "Open Ledger", subtitle: "Korea Media Interview" },
  { src: zkpassNights, alt: "zkPass Nights", title: "zkPass", subtitle: "The Verifiable Nights" },
  { src: saharaAi, alt: "Sahara AI", title: "Sahara AI", subtitle: "Korean AI x Web3 Launch" },
  { src: synfuturesBillboard, alt: "SynFutures", title: "SynFutures", subtitle: "Gangnam Billboard" },
];

const FilmstripGallerySection = () => {
  return (
    <section className="bg-surface-base">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Gallery Grid */}
        <div className="w-full lg:w-2/3 lg:border-r border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-3">
            {campaignImages.slice(0, 9).map((image, index) => (
              <div
                key={index}
                className={`group relative aspect-[6/5] overflow-hidden border-r border-b border-white/10 cursor-pointer hover:scale-[1.02] hover:z-10 transition-transform duration-300 ${
                  index % 3 === 2 ? "border-r-0" : ""
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold text-lg">{image.title}</p>
                  <p className="text-white/70 text-sm">{image.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info Panel */}
        <div className="w-full lg:w-1/3 p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            Campaign Gallery
          </h2>
          <p className="text-white/50 leading-relaxed mb-5 text-sm">
            Explore our successful campaigns and events across Korea's Web3 ecosystem. From launch events to media coverage, we deliver results.
          </p>

          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between py-2.5 border-b border-white/10">
              <span className="text-white/50 text-sm">Events Hosted</span>
              <span className="text-white font-semibold">48+</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-white/10">
              <span className="text-white/50 text-sm">Media Placements</span>
              <span className="text-white font-semibold">200+</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-white/50 text-sm">Campaigns Launched</span>
              <span className="text-white font-semibold">60+</span>
            </div>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-white font-medium hover:text-white/70 transition-colors"
          >
            View all projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FilmstripGallerySection;
