import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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
    <section className="bg-[#0A0A0A]">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Gallery Grid */}
        <div className="w-full lg:w-2/3 lg:border-r border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-3">
            {campaignImages.slice(0, 9).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`group relative aspect-square overflow-hidden border-r border-b border-white/10 ${
                  index % 3 === 2 ? "border-r-0" : ""
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold text-lg">{image.title}</p>
                  <p className="text-white/70 text-sm">{image.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Info Panel */}
        <motion.div
          className="w-full lg:w-1/3 p-8 md:p-12 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Campaign Gallery
          </h2>
          <p className="text-white/50 leading-relaxed mb-8">
            Explore our successful campaigns and events across Korea's Web3 ecosystem. From launch events to media coverage, we deliver results.
          </p>

          <div className="space-y-4 mb-12">
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <span className="text-white/50 text-sm">Events Hosted</span>
              <span className="text-white font-semibold">48+</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <span className="text-white/50 text-sm">Media Placements</span>
              <span className="text-white font-semibold">200+</span>
            </div>
            <div className="flex items-center justify-between py-3">
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
        </motion.div>
      </div>
    </section>
  );
};

export default FilmstripGallerySection;
