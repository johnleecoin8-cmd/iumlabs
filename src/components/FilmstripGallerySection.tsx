import { ArrowRight, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
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

// Responsive breakpoint hook
const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<"mobile" | "tablet" | "desktop">(() => {
    if (typeof window === "undefined") return "desktop";
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1280) return "tablet";
    return "desktop";
  });

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) setBreakpoint("mobile");
      else if (width < 1280) setBreakpoint("tablet");
      else setBreakpoint("desktop");
    };
    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  return breakpoint;
};

const FilmstripGallerySection = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Drag scroll refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const momentumFrame = useRef<number | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const breakpoint = useBreakpoint();

  const config = useMemo(() => ({
    mobile: { itemWidth: 200, expandedWidth: 280, height: "min(400px, 50vh)", gap: 12 },
    tablet: { itemWidth: 220, expandedWidth: 340, height: "min(500px, 55vh)", gap: 16 },
    desktop: { itemWidth: 260, expandedWidth: 420, height: "min(590px, 60vh)", gap: 20 },
  })[breakpoint], [breakpoint]);

  // Momentum scrolling
  const applyMomentum = useCallback(() => {
    if (!galleryRef.current) return;
    
    const friction = 0.95;
    const minVelocity = 0.5;
    
    if (Math.abs(velocity.current) > minVelocity) {
      galleryRef.current.scrollLeft += velocity.current;
      velocity.current *= friction;
      momentumFrame.current = requestAnimationFrame(applyMomentum);
    } else {
      velocity.current = 0;
      if (momentumFrame.current) {
        cancelAnimationFrame(momentumFrame.current);
        momentumFrame.current = null;
      }
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!galleryRef.current) return;
    
    isDragging.current = true;
    setIsScrolling(true);
    startX.current = e.pageX - galleryRef.current.offsetLeft;
    scrollLeft.current = galleryRef.current.scrollLeft;
    lastX.current = e.pageX;
    lastTime.current = Date.now();
    velocity.current = 0;
    
    if (momentumFrame.current) {
      cancelAnimationFrame(momentumFrame.current);
      momentumFrame.current = null;
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !galleryRef.current) return;
    e.preventDefault();
    
    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    galleryRef.current.scrollLeft = scrollLeft.current - walk;
    
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (lastX.current - e.pageX) * (16 / dt) * 1.2;
    }
    lastX.current = e.pageX;
    lastTime.current = now;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    if (Math.abs(velocity.current) > 2) {
      applyMomentum();
    }
    
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  }, [applyMomentum]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging.current) {
      handleMouseUp();
    }
  }, [handleMouseUp]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!galleryRef.current) return;
    
    isDragging.current = true;
    setIsScrolling(true);
    startX.current = e.touches[0].pageX - galleryRef.current.offsetLeft;
    scrollLeft.current = galleryRef.current.scrollLeft;
    lastX.current = e.touches[0].pageX;
    lastTime.current = Date.now();
    velocity.current = 0;
    
    if (momentumFrame.current) {
      cancelAnimationFrame(momentumFrame.current);
      momentumFrame.current = null;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || !galleryRef.current) return;
    
    const x = e.touches[0].pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    galleryRef.current.scrollLeft = scrollLeft.current - walk;
    
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (lastX.current - e.touches[0].pageX) * (16 / dt) * 1.2;
    }
    lastX.current = e.touches[0].pageX;
    lastTime.current = now;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    if (Math.abs(velocity.current) > 2) {
      applyMomentum();
    }
    
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  }, [applyMomentum]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (momentumFrame.current) {
        cancelAnimationFrame(momentumFrame.current);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = config.itemWidth * 2 + config.gap * 2;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const openLightbox = (index: number) => {
    if (!isScrolling && !isDragging.current) {
      setLightboxIndex(index);
    }
  };

  // Fetch first gallery image from each project
  const { data: galleryImages } = useQuery({
    queryKey: ['filmstrip-gallery'],
    queryFn: async () => {
      const { data: projects } = await supabase
        .from('projects')
        .select('id, name, slug, result')
        .eq('is_published', true)
        .order('display_order')
        .limit(12);

      if (!projects || projects.length === 0) return fallbackImages;

      const projectIds = projects.map(p => p.id);

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

        {/* Gallery Slider with Hover Expand */}
        <div 
          ref={galleryRef}
          className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none -mx-6 px-6"
          style={{ 
            height: config.height, 
            gap: `${config.gap}px`,
            scrollBehavior: isDragging.current ? 'auto' : 'smooth',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((image, index) => {
            const isActive = activeIndex === index && !isScrolling;
            const width = isActive ? config.expandedWidth : config.itemWidth;
            
            return (
              <motion.div
                key={index}
                className="relative overflow-hidden flex-shrink-0"
                style={{ 
                  borderRadius: "20px",
                  height: "100%",
                }}
                animate={{ 
                  width,
                  opacity: 1
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                }}
                onHoverStart={() => !isScrolling && !isDragging.current && setActiveIndex(index)}
                onHoverEnd={() => setActiveIndex(null)}
                onClick={() => openLightbox(index)}
              >
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 pointer-events-none"
                  style={{ transform: isActive ? "scale(1)" : "scale(1.05)" }}
                  loading="lazy"
                  draggable={false}
                />
                
                {/* Gradient overlay for inactive */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
                  animate={{ opacity: isActive ? 0 : 0.3 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Border Glow on Hover */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none rounded-[20px]"
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    boxShadow: `inset 0 0 0 2px ${glowColor}60, 0 0 40px ${glowColor}30`
                  }}
                />

                {/* Caption overlay - only on hover */}
                <AnimatePresence>
                  {isActive && image.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.1, duration: 0.25 }}
                      className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none"
                    >
                      <p className="text-white text-sm md:text-base font-semibold">{image.title}</p>
                      {image.subtitle && (
                        <p className="text-white/70 text-xs md:text-sm mt-1 line-clamp-2">{image.subtitle}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Gallery Count & Scroll Indicator */}
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

          {/* Drag to scroll indicator */}
          <div className="hidden md:flex items-center gap-2 text-white/30 text-xs">
            <ChevronLeft className="w-3 h-3" />
            <span>Drag to scroll</span>
            <ChevronRight className="w-3 h-3" />
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
