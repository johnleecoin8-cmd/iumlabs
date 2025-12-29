"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface HoverExpandGalleryProps {
  images: GalleryImage[];
  className?: string;
}

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

// Lightbox Component
function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}: {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const [dragDirection, setDragDirection] = useState(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + images.length) % images.length);
    if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onClose, onNavigate]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 50;
    const velocityThreshold = 500;
    if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      setDragDirection(-1);
      onNavigate((currentIndex - 1 + images.length) % images.length);
    } else if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      setDragDirection(1);
      onNavigate((currentIndex + 1) % images.length);
    }
  };

  if (!isOpen) return null;
  const currentImage = images[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setDragDirection(-1);
          onNavigate((currentIndex - 1 + images.length) % images.length);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setDragDirection(1);
          onNavigate((currentIndex + 1) % images.length);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <AnimatePresence mode="popLayout" initial={false} custom={dragDirection}>
        <motion.div
          key={currentIndex}
          custom={dragDirection}
          initial={{ opacity: 0, x: dragDirection * 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dragDirection * -300 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center cursor-grab active:cursor-grabbing"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-w-full max-h-[75vh] object-contain rounded-lg select-none pointer-events-none"
            draggable={false}
          />
          
          {(currentImage.title || currentImage.description) && (
            <div className="mt-4 text-center px-4">
              {currentImage.title && <h3 className="text-white text-lg font-semibold">{currentImage.title}</h3>}
              {currentImage.description && <p className="text-white/70 text-sm mt-1">{currentImage.description}</p>}
            </div>
          )}

          <div className="mt-4 text-white/50 text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 text-xs flex items-center gap-2">
        <ChevronLeft className="w-4 h-4" />
        <span>Drag to navigate</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </motion.div>
  );
}

export function HoverExpandGallery({
  images,
  className = ""
}: HoverExpandGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const momentumFrame = useRef<number | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const breakpoint = useBreakpoint();

  // Triple the images for infinite scroll effect
  const tripleImages = useMemo(() => [...images, ...images, ...images], [images]);

  // Calculate item width based on container width (5 items per view)
  const [itemWidth, setItemWidth] = useState(0);
  const gap = breakpoint === "mobile" ? 8 : breakpoint === "tablet" ? 12 : 16;

  useEffect(() => {
    const calculateWidth = () => {
      if (typeof window !== "undefined") {
        const containerWidth = window.innerWidth;
        const totalGaps = gap * 4; // 4 gaps between 5 items
        const calculatedWidth = (containerWidth - totalGaps) / 5;
        setItemWidth(calculatedWidth);
      }
    };
    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, [gap]);

  const config = useMemo(() => ({
    mobile: {
      expandedWidth: itemWidth * 1.3,
      height: "min(400px, 50vh)"
    },
    tablet: {
      expandedWidth: itemWidth * 1.4,
      height: "min(500px, 55vh)"
    },
    desktop: {
      expandedWidth: itemWidth * 1.5,
      height: "min(590px, 60vh)"
    }
  })[breakpoint], [breakpoint, itemWidth]);

  // Center to middle set on mount
  useEffect(() => {
    if (scrollContainerRef.current && itemWidth > 0) {
      const singleSetWidth = images.length * (itemWidth + gap);
      scrollContainerRef.current.scrollLeft = singleSetWidth;
    }
  }, [images.length, itemWidth, gap]);

  // Handle infinite scroll loop
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || itemWidth === 0) return;
    
    const container = scrollContainerRef.current;
    const singleSetWidth = images.length * (itemWidth + gap);
    
    // If scrolled past the third set, jump back to middle
    if (container.scrollLeft >= singleSetWidth * 2) {
      container.scrollLeft = container.scrollLeft - singleSetWidth;
    }
    // If scrolled before the first set, jump to middle
    if (container.scrollLeft <= 0) {
      container.scrollLeft = container.scrollLeft + singleSetWidth;
    }
  }, [images.length, itemWidth, gap]);

  // Momentum scrolling
  const applyMomentum = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const friction = 0.95;
    const minVelocity = 0.5;
    
    if (Math.abs(velocity.current) > minVelocity) {
      scrollContainerRef.current.scrollLeft += velocity.current;
      handleScroll();
      velocity.current *= friction;
      momentumFrame.current = requestAnimationFrame(applyMomentum);
    } else {
      velocity.current = 0;
      if (momentumFrame.current) {
        cancelAnimationFrame(momentumFrame.current);
        momentumFrame.current = null;
      }
    }
  }, [handleScroll]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDragging.current = true;
    setIsScrolling(true);
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
    lastX.current = e.pageX;
    lastTime.current = Date.now();
    velocity.current = 0;
    if (momentumFrame.current) {
      cancelAnimationFrame(momentumFrame.current);
      momentumFrame.current = null;
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    handleScroll();

    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (lastX.current - e.pageX) * (16 / dt) * 1.2;
    }
    lastX.current = e.pageX;
    lastTime.current = now;
  }, [handleScroll]);

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

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    isDragging.current = true;
    setIsScrolling(true);
    startX.current = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
    lastX.current = e.touches[0].pageX;
    lastTime.current = Date.now();
    velocity.current = 0;
    if (momentumFrame.current) {
      cancelAnimationFrame(momentumFrame.current);
      momentumFrame.current = null;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    handleScroll();
    
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (lastX.current - e.touches[0].pageX) * (16 / dt) * 1.2;
    }
    lastX.current = e.touches[0].pageX;
    lastTime.current = now;
  }, [handleScroll]);

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

  const openLightbox = (index: number) => {
    if (!isScrolling && !isDragging.current) {
      // Map tripled index back to original
      const originalIndex = index % images.length;
      setLightboxIndex(originalIndex);
      setLightboxOpen(true);
    }
  };

  if (images.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <p className="text-muted-foreground">No images to display</p>
      </div>
    );
  }

  return (
    <>
      <div className={`relative w-full overflow-hidden ${className}`}>
        {/* Scrollable container - full width, no padding */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
          style={{
            height: config.height,
            gap: `${gap}px`,
            scrollBehavior: isDragging.current ? 'auto' : 'smooth'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onScroll={handleScroll}
        >
          {tripleImages.map((image, index) => {
            const isActive = activeIndex === index && !isScrolling;
            const width = isActive ? config.expandedWidth : itemWidth;

            return (
              <motion.div
                key={`${index}-${image.src}`}
                className="relative overflow-hidden flex-shrink-0"
                style={{
                  borderRadius: "12px",
                  height: "100%"
                }}
                animate={{
                  width,
                  opacity: 1
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                onHoverStart={() => !isScrolling && !isDragging.current && setActiveIndex(index)}
                onHoverEnd={() => setActiveIndex(null)}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 pointer-events-none"
                  style={{
                    transform: isActive ? "scale(1)" : "scale(1.05)"
                  }}
                  loading="lazy"
                  draggable={false}
                />
                
                {/* Gradient overlay for inactive */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
                  animate={{ opacity: isActive ? 0 : 0.3 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Caption overlay */}
                <AnimatePresence>
                  {isActive && image.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.1, duration: 0.25 }}
                      className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none"
                    >
                      <p className="text-white text-xs md:text-sm font-semibold">{image.title}</p>
                      {image.description && (
                        <p className="text-white/70 text-xs mt-1 line-clamp-2">{image.description}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={images}
            currentIndex={lightboxIndex}
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}