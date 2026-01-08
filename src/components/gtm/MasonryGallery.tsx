import { useRef, useState, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

// All campaign images
import bnbEvent from '@/assets/campaigns/bnb-event.jpg';
import bybitEvent from '@/assets/campaigns/bybit-event.jpg';
import kucoinCampaign from '@/assets/campaigns/kucoin-campaign.jpg';
import kucoinNew from '@/assets/campaigns/kucoin-new.jpg';
import mantraParty from '@/assets/campaigns/mantra-party.jpg';
import mantra from '@/assets/campaigns/mantra.jpg';
import megaethLaunch from '@/assets/campaigns/megaeth-launch.jpg';
import ondoSeminar from '@/assets/campaigns/ondo-seminar.jpg';
import openledgerEvent from '@/assets/campaigns/openledger-event.jpg';
import openledgerInterview from '@/assets/campaigns/openledger-interview.jpg';
import peaqSummit from '@/assets/campaigns/peaq-summit.jpg';
import polygonConnect from '@/assets/campaigns/polygon-connect.png';
import polygonHackathon from '@/assets/campaigns/polygon-hackathon.jpg';
import storyOriginSummit from '@/assets/campaigns/story-origin-summit.jpg';
import storyWorkshop from '@/assets/campaigns/story-workshop.jpg';
import synfuturesBillboard from '@/assets/campaigns/synfutures-billboard.jpg';
import triaLaunch from '@/assets/campaigns/tria-launch.jpg';
import fogoFest from '@/assets/campaigns/fogo-fest.avif';
import zkpassEvent from '@/assets/campaigns/zkpass-verifiable-nights.jpg';
import lbankFestival from '@/assets/campaigns/lbank-festival.jpg';
import seoulMetroBillboard from '@/assets/campaigns/seoul-metro-billboard-new.jpeg';
import seoulMetroPoster from '@/assets/campaigns/seoul-metro-poster.jpeg';

interface GalleryImage {
  src: string;
  title: string;
  category: 'event' | 'media' | 'campaign';
  size: 'normal' | 'tall' | 'wide';
}

const galleryImages: GalleryImage[] = [
  { src: storyOriginSummit, title: "Story Origin Summit", category: "event", size: "wide" },
  { src: seoulMetroBillboard, title: "Seoul Metro Billboard", category: "media", size: "tall" },
  { src: mantraParty, title: "MANTRA Party", category: "event", size: "normal" },
  { src: peaqSummit, title: "peaq Summit", category: "event", size: "normal" },
  { src: synfuturesBillboard, title: "SynFutures Billboard", category: "media", size: "tall" },
  { src: bnbEvent, title: "BNB Chain Event", category: "event", size: "normal" },
  { src: polygonConnect, title: "Polygon Connect", category: "event", size: "wide" },
  { src: openledgerInterview, title: "OpenLedger Interview", category: "media", size: "normal" },
  { src: kucoinCampaign, title: "KuCoin Campaign", category: "campaign", size: "normal" },
  { src: bybitEvent, title: "Bybit Event", category: "event", size: "normal" },
  { src: ondoSeminar, title: "Ondo Seminar", category: "event", size: "normal" },
  { src: megaethLaunch, title: "MegaETH Launch", category: "campaign", size: "wide" },
  { src: openledgerEvent, title: "OpenLedger Event", category: "event", size: "normal" },
  { src: kucoinNew, title: "KuCoin Korea", category: "campaign", size: "normal" },
  { src: polygonHackathon, title: "Polygon Hackathon", category: "event", size: "normal" },
  { src: fogoFest, title: "Fogo Fest", category: "event", size: "tall" },
  { src: storyWorkshop, title: "Story Workshop", category: "event", size: "normal" },
  { src: triaLaunch, title: "Tria Launch", category: "campaign", size: "normal" },
  { src: zkpassEvent, title: "zkPass Event", category: "event", size: "normal" },
  { src: lbankFestival, title: "LBank Festival", category: "event", size: "normal" },
  { src: mantra, title: "MANTRA Campaign", category: "campaign", size: "normal" },
  { src: seoulMetroPoster, title: "Metro Poster", category: "media", size: "normal" },
];

const categories = [
  { id: 'all', label: 'All', labelKo: '전체' },
  { id: 'event', label: 'Events', labelKo: '이벤트' },
  { id: 'media', label: 'Media', labelKo: '미디어' },
  { id: 'campaign', label: 'Campaigns', labelKo: '캠페인' },
];

const MasonryGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') return galleryImages;
    return galleryImages.filter(img => img.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightboxIndex === null) return;
    const newIndex = direction === 'next' 
      ? (lightboxIndex + 1) % filteredImages.length
      : (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxIndex(newIndex);
  };

  return (
    <>
      <section ref={ref} className="relative py-24 md:py-32 bg-neutral-950 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Gallery</span>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mt-4">
              Campaign <span className="bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Showcase</span>
            </h3>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat.label}
                <span className="text-xs ml-1 opacity-60">({cat.labelKo})</span>
              </button>
            ))}
          </motion.div>

          {/* Masonry Grid */}
          <motion.div 
            layout
            className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          >
            <AnimatePresence>
              {filteredImages.map((img, index) => (
                <motion.div
                  key={img.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  onClick={() => openLightbox(index)}
                  className={`group relative overflow-hidden rounded-xl break-inside-avoid cursor-pointer border border-white/10 hover:border-primary/40 transition-all duration-300 ${
                    img.size === 'tall' ? 'aspect-[3/4]' : 
                    img.size === 'wide' ? 'aspect-[16/9]' : 
                    'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-white text-sm font-medium">{img.title}</span>
                    <span className="block text-xs text-white/50 capitalize mt-1">{img.category}</span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-2 py-1 text-xs bg-white/20 backdrop-blur-sm rounded-full text-white capitalize">
                      {img.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl max-h-[85vh]"
            >
              <img
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
              />
              <div className="text-center mt-4">
                <p className="text-white font-medium">{filteredImages[lightboxIndex].title}</p>
                <p className="text-white/50 text-sm capitalize">{filteredImages[lightboxIndex].category}</p>
                <p className="text-white/30 text-xs mt-2">{lightboxIndex + 1} / {filteredImages.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MasonryGallery;
