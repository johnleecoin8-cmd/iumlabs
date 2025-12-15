import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
import storyWorkshop from "@/assets/campaigns/story-workshop.jpg";

const campaignImages = [
  { src: bnbEvent, title: "BNB Chain Event", location: "Seoul", date: "2024" },
  { src: ondoSeminar, title: "Ondo Finance Seminar", location: "Seoul", date: "2024" },
  { src: fogoFest, title: "FOGO Fest", location: "Seoul", date: "2025" },
  { src: peaqSummit, title: "Peaq Summit", location: "Seoul", date: "2024" },
  { src: triaLaunch, title: "Tria Launch", location: "Seoul", date: "2024" },
  { src: lbankFestival, title: "Lbank 1001 Festival", location: "Seoul", date: "2024" },
  { src: kucoinOldschool, title: "KuCoin Oldschool", location: "Seoul", date: "2024" },
  { src: openledgerInterview, title: "Open Ledger Interview", location: "Seoul", date: "2024" },
  { src: zkpassNights, title: "zkPass Verifiable Nights", location: "Seoul", date: "2024" },
  { src: saharaAi, title: "Sahara AI Launch", location: "Seoul", date: "2024" },
  { src: synfuturesBillboard, title: "SynFutures Billboard", location: "Gangnam", date: "2024" },
  { src: storyWorkshop, title: "Story Protocol Workshop", location: "Seoul", date: "2024" },
];

const FilmstripGallerySection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative bg-[#0A0A0B] py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <SectionHeader 
            title="GALLERY" 
            dark={true}
          />
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full border transition-all duration-300 ${
                canScrollLeft 
                  ? 'border-white/30 hover:border-white hover:bg-white/10 text-white' 
                  : 'border-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-3 rounded-full border transition-all duration-300 ${
                canScrollRight 
                  ? 'border-white/30 hover:border-white hover:bg-white/10 text-white' 
                  : 'border-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10 pointer-events-none" />

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {campaignImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group flex-shrink-0 w-[300px] md:w-[360px] cursor-pointer"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Card */}
                <div className="relative h-[240px] md:h-[280px] rounded-2xl overflow-hidden bg-gray-900 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-2xl">
                  {/* Image */}
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    {/* Date Badge */}
                    <span className="text-xs text-white/60 mb-2 font-mono">
                      {image.date} • {image.location}
                    </span>
                    
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors duration-500">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex items-center justify-center gap-8 md:gap-16 text-center"
        >
          <div>
            <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">47+</div>
            <div className="text-sm text-white/50">Events Hosted</div>
          </div>
          <div className="h-12 w-px bg-white/20" />
          <div>
            <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">5K+</div>
            <div className="text-sm text-white/50">Attendees</div>
          </div>
          <div className="h-12 w-px bg-white/20" />
          <div>
            <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">12</div>
            <div className="text-sm text-white/50">Cities</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FilmstripGallerySection;
