import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Campaign images
import seoulMetroBillboard from '@/assets/campaigns/seoul-metro-billboard-new.jpeg';
import seoulMetroPoster from '@/assets/campaigns/seoul-metro-poster.jpeg';
import synfuturesBillboard from '@/assets/campaigns/synfutures-billboard.jpg';
import storyOriginSummit from '@/assets/campaigns/story-origin-summit.jpg';
import storyWorkshop from '@/assets/campaigns/story-workshop.jpg';
import peaqSummit from '@/assets/campaigns/peaq-summit.jpg';
import polygonConnect from '@/assets/campaigns/polygon-connect.png';
import polygonHackathon from '@/assets/campaigns/polygon-hackathon.jpg';
import ondoSeminar from '@/assets/campaigns/ondo-seminar.jpg';
import mantraParty from '@/assets/campaigns/mantra-party.jpg';
import bnbEvent from '@/assets/campaigns/bnb-event.jpg';
import bybitEvent from '@/assets/campaigns/bybit-event.jpg';
import openledgerEvent from '@/assets/campaigns/openledger-event.jpg';
import openledgerInterview from '@/assets/campaigns/openledger-interview.jpg';
import kucoinCampaign from '@/assets/campaigns/kucoin-campaign.jpg';
import kucoinNew from '@/assets/campaigns/kucoin-new.jpg';
import megaethLaunch from '@/assets/campaigns/megaeth-launch.jpg';
import triaLaunch from '@/assets/campaigns/tria-launch.jpg';
import zkpassEvent from '@/assets/campaigns/zkpass-verifiable-nights.jpg';
import lbankFestival from '@/assets/campaigns/lbank-festival.jpg';
import fogoFest from '@/assets/campaigns/fogo-fest.avif';

interface CampaignCategory {
  id: string;
  label: string;
  labelKo: string;
  images: { src: string; title: string }[];
}

const categories: CampaignCategory[] = [
  {
    id: 'outdoor',
    label: 'Outdoor Ads',
    labelKo: '옥외 광고',
    images: [
      { src: seoulMetroBillboard, title: 'Seoul Metro Billboard' },
      { src: seoulMetroPoster, title: 'Metro Station Poster' },
      { src: synfuturesBillboard, title: 'SynFutures Billboard' },
    ]
  },
  {
    id: 'summit',
    label: 'Summits & Conferences',
    labelKo: '서밋 & 컨퍼런스',
    images: [
      { src: storyOriginSummit, title: 'Story Origin Summit' },
      { src: peaqSummit, title: 'peaq Korea Summit' },
      { src: polygonConnect, title: 'Polygon Connect' },
      { src: polygonHackathon, title: 'Polygon Hackathon' },
      { src: ondoSeminar, title: 'Ondo Seminar' },
    ]
  },
  {
    id: 'event',
    label: 'Community Events',
    labelKo: '커뮤니티 이벤트',
    images: [
      { src: mantraParty, title: 'MANTRA Party' },
      { src: bnbEvent, title: 'BNB Chain Event' },
      { src: bybitEvent, title: 'Bybit Event' },
      { src: openledgerEvent, title: 'OpenLedger Event' },
      { src: zkpassEvent, title: 'zkPass Verifiable Nights' },
      { src: fogoFest, title: 'Fogo Fest' },
      { src: lbankFestival, title: 'LBank Festival' },
    ]
  },
  {
    id: 'media',
    label: 'Media & PR',
    labelKo: '미디어 & PR',
    images: [
      { src: openledgerInterview, title: 'OpenLedger Interview' },
      { src: storyWorkshop, title: 'Story Workshop' },
      { src: kucoinCampaign, title: 'KuCoin Campaign' },
      { src: kucoinNew, title: 'KuCoin Korea Launch' },
    ]
  },
  {
    id: 'launch',
    label: 'Product Launches',
    labelKo: '프로덕트 런칭',
    images: [
      { src: megaethLaunch, title: 'MegaETH Launch' },
      { src: triaLaunch, title: 'Tria Launch' },
    ]
  },
];

// Lightbox Component
const Lightbox = ({ 
  image, 
  onClose, 
  onPrev, 
  onNext 
}: { 
  image: { src: string; title: string } | null; 
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  if (!image) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div onClick={(e) => e.stopPropagation()} className="max-w-5xl max-h-[85vh]">
        <img
          src={image.src}
          alt={image.title}
          className="max-w-full max-h-[75vh] object-contain rounded-lg"
        />
        <p className="text-white text-center mt-4 font-medium">{image.title}</p>
      </div>
    </motion.div>
  );
};

const CategoryRow = ({ category, onImageClick }: { 
  category: CampaignCategory;
  onImageClick: (src: string, title: string) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="mb-10">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-lg font-bold text-white">{category.label}</h4>
          <span className="text-sm text-white/40">{category.labelKo}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-white/70" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-white/70" />
          </button>
        </div>
      </div>

      {/* Scrollable Images */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
      >
        {category.images.map((img, index) => (
          <motion.div
            key={img.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            onClick={() => onImageClick(img.src, img.title)}
            className="group relative flex-shrink-0 w-72 aspect-[16/10] rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-primary/40 transition-all duration-300"
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-white text-sm font-medium">{img.title}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CampaignWall = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);
  const allImages = categories.flatMap(c => c.images);

  const handleImageClick = (src: string, title: string) => {
    setLightboxImage({ src, title });
  };

  const handlePrev = () => {
    if (!lightboxImage) return;
    const currentIndex = allImages.findIndex(img => img.src === lightboxImage.src);
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setLightboxImage(allImages[prevIndex]);
  };

  const handleNext = () => {
    if (!lightboxImage) return;
    const currentIndex = allImages.findIndex(img => img.src === lightboxImage.src);
    const nextIndex = (currentIndex + 1) % allImages.length;
    setLightboxImage(allImages[nextIndex]);
  };

  return (
    <>
      <section ref={ref} className="relative py-24 md:py-32 bg-neutral-950 overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Campaign Gallery</span>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mt-4">
              Real <span className="bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Campaigns</span>
            </h3>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">
              From subway billboards to exclusive summits — see our work across Korea.
            </p>
          </motion.div>

          {/* Category Rows */}
          {categories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              onImageClick={handleImageClick}
            />
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          onClose={() => setLightboxImage(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
};

export default CampaignWall;
