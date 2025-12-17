import { ArrowRight, Camera, Film } from "lucide-react";
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
];

// Film sprocket holes component
const FilmSprockets = ({ position }: { position: 'top' | 'bottom' }) => (
  <div className={`absolute ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 right-0 h-3 bg-[#0A0A0A] flex items-center justify-around z-10 pointer-events-none`}>
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} className="w-2 h-2 rounded-sm bg-pink-500/20" />
    ))}
  </div>
);

const FilmstripGallerySection = () => {
  return (
    <section className="bg-[#0A0A0A] relative overflow-hidden">
      {/* Magenta/Pink gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-fuchsia-500/5 pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row relative">
        {/* Left: Gallery Grid */}
        <div className="w-full lg:w-2/3 lg:border-r border-white/10 relative">
          {/* Film strip effect - top */}
          <FilmSprockets position="top" />
          
          <div className="grid grid-cols-2 md:grid-cols-3 py-4">
            {campaignImages.slice(0, 9).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, zIndex: 10 }}
                className={`group relative aspect-square overflow-hidden border-r border-b border-white/10 cursor-pointer ${
                  index % 3 === 2 ? "border-r-0" : ""
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Pink/Magenta hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-900/80 via-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Glow border on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 0 2px rgba(236, 72, 153, 0.5), inset 0 0 30px rgba(236, 72, 153, 0.2)'
                  }}
                />
                
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold text-lg">{image.title}</p>
                  <p className="text-pink-300 text-sm">{image.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Film strip effect - bottom */}
          <FilmSprockets position="bottom" />
        </div>

        {/* Right: Info Panel */}
        <motion.div
          className="w-full lg:w-1/3 p-8 md:p-12 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Camera/Film icon decoration */}
          <motion.div
            className="mb-6 flex items-center gap-3"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Camera className="w-10 h-10 text-pink-400" strokeWidth={1.5} />
            <Film className="w-8 h-8 text-fuchsia-400" strokeWidth={1.5} />
          </motion.div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Campaign <span className="text-pink-400">Gallery</span>
          </h2>
          <p className="text-white/50 leading-relaxed mb-8">
            Explore our successful campaigns and events across Korea's Web3 ecosystem. From launch events to media coverage, we deliver results.
          </p>

          <div className="space-y-4 mb-12">
            <div className="flex items-center justify-between py-3 border-b border-pink-500/20">
              <span className="text-white/50 text-sm">Events Hosted</span>
              <span className="text-pink-400 font-semibold">48+</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-pink-500/20">
              <span className="text-white/50 text-sm">Media Placements</span>
              <span className="text-pink-400 font-semibold">200+</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-white/50 text-sm">Campaigns Launched</span>
              <span className="text-pink-400 font-semibold">60+</span>
            </div>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-pink-400 font-medium hover:text-pink-300 transition-colors"
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
