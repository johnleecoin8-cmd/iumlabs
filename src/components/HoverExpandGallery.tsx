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
      if (width < 768) setBreakpoint("mobile");else if (width < 1280) setBreakpoint("tablet");else setBreakpoint("desktop");
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
  const handleDragEnd = (_: any, info: {
    offset: {
      x: number;
    };
    velocity: {
      x: number;
    };
  }) => {
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
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} transition={{
    duration: 0.2
  }} className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
        <X className="w-6 h-6 text-white" />
      </button>

      <button onClick={e => {
      e.stopPropagation();
      setDragDirection(-1);
      onNavigate((currentIndex - 1 + images.length) % images.length);
    }} className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button onClick={e => {
      e.stopPropagation();
      setDragDirection(1);
      onNavigate((currentIndex + 1) % images.length);
    }} className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <AnimatePresence mode="popLayout" initial={false} custom={dragDirection}>
        <motion.div key={currentIndex} custom={dragDirection} initial={{
        opacity: 0,
        x: dragDirection * 300
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: dragDirection * -300
      }} transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }} drag="x" dragConstraints={{
        left: 0,
        right: 0
      }} dragElastic={0.2} onDragEnd={handleDragEnd} className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center cursor-grab active:cursor-grabbing" onClick={e => e.stopPropagation()}>
          <img src={currentImage.src} alt={currentImage.alt} className="max-w-full max-h-[75vh] object-contain rounded-lg select-none pointer-events-none" draggable={false} />
          
          {(currentImage.title || currentImage.description) && <div className="mt-4 text-center px-4">
              {currentImage.title && <h3 className="text-white text-lg font-semibold">{currentImage.title}</h3>}
              {currentImage.description && <p className="text-white/70 text-sm mt-1">{currentImage.description}</p>}
            </div>}

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
    </motion.div>;
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
  const config = useMemo(() => ({
    mobile: {
      itemWidth: 200,
      expandedWidth: 280,
      height: "min(400px, 50vh)",
      gap: 12
    },
    tablet: {
      itemWidth: 220,
      expandedWidth: 340,
      height: "min(500px, 55vh)",
      gap: 16
    },
    desktop: {
      itemWidth: 260,
      expandedWidth: 420,
      height: "min(590px, 60vh)",
      gap: 20
    }
  })[breakpoint], [breakpoint]);

  // Momentum scrolling
  const applyMomentum = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const friction = 0.95;
    const minVelocity = 0.5;
    if (Math.abs(velocity.current) > minVelocity) {
      scrollContainerRef.current.scrollLeft += velocity.current;
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
    const walk = (x - startX.current) * 1.5; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;

    // Calculate velocity
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (lastX.current - e.pageX) * (16 / dt) * 1.2; // Adjusted for momentum
    }
    lastX.current = e.pageX;
    lastTime.current = now;
  }, []);
  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // Apply momentum
    if (Math.abs(velocity.current) > 2) {
      applyMomentum();
    }

    // Delay removing scroll state
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
  const openLightbox = (index: number) => {
    if (!isScrolling && !isDragging.current) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  };
  const scrollToPosition = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = config.itemWidth * 2 + config.gap * 2;
    const targetScroll = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
    scrollContainerRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };
  if (images.length === 0) {
    return <div className={`flex items-center justify-center h-64 ${className}`}>
        <p className="text-muted-foreground">No images to display</p>
      </div>;
  }
  return <>
      <div className={`relative ${className}`}>
        {/* Navigation buttons */}
        <button onClick={() => scrollToPosition('left')} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors shadow-lg">
          
        </button>
        <button onClick={() => scrollToPosition('right')} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors shadow-lg">
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
        </button>

        {/* Scrollable container */}
        <div ref={scrollContainerRef} className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none px-12 md:px-16" style={{
        height: config.height,
        gap: `${config.gap}px`,
        scrollBehavior: isDragging.current ? 'auto' : 'smooth'
      }} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeave} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
          {images.map((image, index) => {
          const isActive = activeIndex === index && !isScrolling;
          const width = isActive ? config.expandedWidth : config.itemWidth;
          return <motion.div key={index} className="relative overflow-hidden flex-shrink-0" style={{
            borderRadius: "20px",
            height: "100%"
          }} animate={{
            width,
            opacity: 1
          }} transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }} onHoverStart={() => !isScrolling && !isDragging.current && setActiveIndex(index)} onHoverEnd={() => setActiveIndex(null)} onClick={() => openLightbox(index)}>
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-500 pointer-events-none" style={{
              transform: isActive ? "scale(1)" : "scale(1.05)"
            }} loading="lazy" draggable={false} />
                
                {/* Gradient overlay for inactive */}
                <motion.div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" animate={{
              opacity: isActive ? 0 : 0.3
            }} transition={{
              duration: 0.3
            }} />

                {/* Caption overlay */}
                <AnimatePresence>
                  {isActive && image.title && <motion.div initial={{
                opacity: 0,
                y: 30
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: 20
              }} transition={{
                delay: 0.1,
                duration: 0.25
              }} className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none">
                      <p className="text-white text-sm md:text-base font-semibold">{image.title}</p>
                      {image.description && <p className="text-white/70 text-xs md:text-sm mt-1 line-clamp-2">{image.description}</p>}
                    </motion.div>}
                </AnimatePresence>
              </motion.div>;
        })}
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="text-muted-foreground text-xs flex items-center gap-2">
            <ChevronLeft className="w-3 h-3" />
            <span>Drag to scroll</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && <Lightbox images={images} currentIndex={lightboxIndex} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} onNavigate={setLightboxIndex} />}
      </AnimatePresence>
    </>;
}