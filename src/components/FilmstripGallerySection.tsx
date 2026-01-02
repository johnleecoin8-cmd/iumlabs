import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Lightbox from "@/components/Lightbox";

// Import actual campaign images from assets
import bnbEvent from "@/assets/campaigns/bnb-event.jpg";
import ondoSeminar from "@/assets/campaigns/ondo-seminar.jpg";
import fogoFest from "@/assets/campaigns/fogo-fest.avif";
import peaqSummit from "@/assets/campaigns/peaq-summit.jpg";
import triaLaunch from "@/assets/campaigns/tria-launch.jpg";
import lbankFestival from "@/assets/campaigns/lbank-festival.jpg";
import kucoinCampaign from "@/assets/campaigns/kucoin-campaign.jpg";
import openledgerInterview from "@/assets/campaigns/openledger-interview.jpg";
import zkpassNights from "@/assets/campaigns/zkpass-verifiable-nights.jpg";
import saharaAi from "@/assets/campaigns/sahara-ai.jpg";
import synfuturesBillboard from "@/assets/campaigns/synfutures-billboard.jpg";
import polygonConnect from "@/assets/campaigns/polygon-connect.png";
import storyOriginSummit from "@/assets/campaigns/story-origin-summit.jpg";
import mantraParty from "@/assets/campaigns/mantra-party.jpg";
import megaethLaunch from "@/assets/campaigns/megaeth-launch.jpg";
import bybitEvent from "@/assets/campaigns/bybit-event.jpg";

// Map gallery `src` (stored as file path strings) to bundled campaign assets
const campaignAssetByFile: Record<string, string> = {
  "bnb-event.jpg": bnbEvent,
  "kucoin-campaign.jpg": kucoinCampaign,
  "ondo-seminar.jpg": ondoSeminar,
  "polygon-connect.png": polygonConnect,
  "sahara-ai.jpg": saharaAi,
  "story-origin-summit.jpg": storyOriginSummit,
  "peaq-summit.jpg": peaqSummit,
  "bybit-event.jpg": bybitEvent,
  "mantra-party.jpg": mantraParty,
  "megaeth-launch.jpg": megaethLaunch,
  "tria-launch.jpg": triaLaunch,
  "zkpass-verifiable-nights.jpg": zkpassNights,
  "synfutures-billboard.jpg": synfuturesBillboard,
  "fogo-fest.avif": fogoFest,
  "lbank-festival.jpg": lbankFestival,
  "openledger-interview.jpg": openledgerInterview,
};

const resolveGallerySrcToAsset = (src?: string | null) => {
  if (!src) return null;
  const file = src.split("/").pop();
  if (!file) return null;
  return campaignAssetByFile[file] ?? null;
};

// Fallback images
const fallbackImages = [
  { src: bnbEvent, alt: "BNB Chain Event", title: "BNB Chain", subtitle: "Korea Launch Event 2024" },
  { src: ondoSeminar, alt: "Ondo Finance", title: "Ondo Finance", subtitle: "Origin Summit 2025" },
  { src: fogoFest, alt: "FOGO Fest", title: "FOGO", subtitle: "Fogo Fest 2025" },
  { src: peaqSummit, alt: "Peaq Summit", title: "Peaq", subtitle: "KBW 2025" },
  { src: triaLaunch, alt: "Tria Launch", title: "Tria", subtitle: "Korea Media Interview" },
  { src: lbankFestival, alt: "Lbank Festival", title: "Lbank", subtitle: "1001 Festival Seoul" },
];

const FilmstripGallerySection = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = 400;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Fetch first gallery image from each project
  const { data: galleryImages } = useQuery({
    queryKey: ['filmstrip-gallery'],
    queryFn: async () => {
      // Get all published projects
      const { data: projects } = await supabase
        .from('projects')
        .select('id, name, slug, result')
        .eq('is_published', true)
        .order('display_order')
        .limit(12);

      if (!projects || projects.length === 0) return fallbackImages;

      const projectIds = projects.map(p => p.id);

      // Get first gallery image for each project
      const { data: galleryRows } = await supabase
        .from('project_gallery')
        .select('project_id, src, display_order')
        .in('project_id', projectIds)
        .order('display_order', { ascending: true });

      const firstGalleryByProject = new Map<string, string>();
      for (const row of galleryRows ?? []) {
        if (!firstGalleryByProject.has(row.project_id)) {
          firstGalleryByProject.set(row.project_id, row.src);
        }
      }

      // Map projects to gallery items
      const images = projects
        .map(project => {
          const gallerySrc = firstGalleryByProject.get(project.id);
          const asset = resolveGallerySrcToAsset(gallerySrc);
          if (!asset) return null;
          return {
            src: asset,
            alt: project.name,
            title: project.name,
            subtitle: project.result || '',
          };
        })
        .filter((img): img is NonNullable<typeof img> => img !== null);

      return images.length > 0 ? images : fallbackImages;
    },
  });

  const images = galleryImages || fallbackImages;
  const glowColor = "#00D4FF";

  return (
    <section className="relative py-20 md:py-32 bg-surface-base overflow-hidden">
      {/* Background Effects */}
      <div 
        className="absolute bottom-0 left-0 w-[40%] h-[60%] opacity-5 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 100%, ${glowColor} 0%, transparent 60%)` }}
      />
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span 
                className="text-sm font-mono tracking-wider"
                style={{ color: glowColor }}
              >
                GALLERY
              </span>
              <div 
                className="h-px w-12"
                style={{ background: `linear-gradient(to right, ${glowColor}, transparent)` }}
              />
              <span className="text-xs text-white/40 uppercase tracking-widest">Visual Journey</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Campaign <span style={{ color: glowColor }}>Highlights</span>
            </h2>
            <p className="text-white/50 mt-3 max-w-md text-sm md:text-base">
              Explore our successful campaigns and events across Korea's Web3 ecosystem.
            </p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              <motion.button
                onClick={() => scrollGallery('left')}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all group hover:border-white/40"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </motion.button>
              <motion.button
                onClick={() => scrollGallery('right')}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all group hover:border-white/40"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </motion.button>
            </div>
            
            <Link
              to="/projects"
              className="hidden md:inline-flex items-center gap-2 text-white font-medium hover:text-white/70 transition-colors text-sm px-4 py-2 rounded-full border border-white/20 hover:border-white/40"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Gallery Slider */}
        <div 
          ref={galleryRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth -mx-6 px-6"
        >
          <div className="flex gap-4 md:gap-6" style={{ width: 'max-content' }}>
            {images.map((image, index) => (
              <motion.div 
                key={index} 
                className="relative w-72 md:w-80 lg:w-[420px] aspect-[4/3] overflow-hidden rounded-2xl group cursor-pointer flex-shrink-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setLightboxIndex(index)}
              >
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Border Glow on Hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ 
                    boxShadow: `inset 0 0 0 2px ${glowColor}60, 0 0 40px ${glowColor}30`
                  }}
                />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold text-base md:text-lg mb-1">{image.title}</h3>
                  <p className="text-white/60 text-xs md:text-sm line-clamp-2">{image.subtitle}</p>
                </div>

                {/* Index Badge */}
                <div 
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ 
                    backgroundColor: `${glowColor}20`,
                    color: glowColor,
                    border: `1px solid ${glowColor}40`
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Expand Icon */}
                <motion.div 
                  className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  whileHover={{ scale: 1.1, rotate: 45 }}
                  style={{ backgroundColor: glowColor }}
                >
                  <ArrowUpRight className="w-5 h-5 text-black" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gallery Count & Mobile Link */}
        <motion.div 
          className="flex items-center justify-between mt-8 md:mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Images className="w-4 h-4" style={{ color: glowColor }} />
            <span className="text-white/40 text-sm">
              {images.length} campaigns
            </span>
          </div>
          
          <Link
            to="/projects"
            className="md:hidden inline-flex items-center gap-2 text-white font-medium hover:text-white/70 transition-colors text-sm"
          >
            View all projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={images.map(img => ({ src: img.src, title: img.title, description: img.subtitle }))}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
};

export default FilmstripGallerySection;
