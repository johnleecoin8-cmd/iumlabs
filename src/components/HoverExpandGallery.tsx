"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
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
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Navigation buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex - 1 + images.length) % images.length);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex + 1) % images.length);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Image container */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-[75vh] object-contain rounded-lg"
        />
        
        {/* Caption */}
        {(currentImage.title || currentImage.description) && (
          <div className="mt-4 text-center px-4">
            {currentImage.title && (
              <h3 className="text-white text-lg font-semibold">{currentImage.title}</h3>
            )}
            {currentImage.description && (
              <p className="text-white/70 text-sm mt-1">{currentImage.description}</p>
            )}
          </div>
        )}

        {/* Image counter */}
        <div className="mt-4 text-white/50 text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HoverExpandGallery({ images, className = "" }: HoverExpandGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const breakpoint = useBreakpoint();

  const config = useMemo(() => ({
    mobile: { numVisible: 3, expandedPercent: 60, collapsedPercent: 20, height: "min(400px, 50vh)", gap: 8 },
    tablet: { numVisible: 5, expandedPercent: 40, collapsedPercent: 15, height: "min(500px, 55vh)", gap: 12 },
    desktop: { numVisible: 6, expandedPercent: 36, collapsedPercent: 12.8, height: "min(590px, 60vh)", gap: 16 },
  })[breakpoint], [breakpoint]);

  const visibleImages = useMemo(() => {
    const result: (GalleryImage & { originalIndex: number })[] = [];
    for (let i = 0; i < config.numVisible && i < images.length; i++) {
      const idx = (startIndex + i) % images.length;
      result.push({ ...images[idx], originalIndex: idx });
    }
    return result;
  }, [images, startIndex, config.numVisible]);

  const canNavigate = images.length > config.numVisible;

  const navigate = (direction: "prev" | "next") => {
    if (direction === "next") {
      setStartIndex((prev) => (prev + 1) % images.length);
      setActiveIndex(0);
    } else {
      setStartIndex((prev) => (prev - 1 + images.length) % images.length);
      setActiveIndex(0);
    }
  };

  const openLightbox = (originalIndex: number) => {
    setLightboxIndex(originalIndex);
    setLightboxOpen(true);
  };

  if (images.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <p className="text-muted-foreground">No images to display</p>
      </div>
    );
  }

  // Mobile list layout
  if (breakpoint === "mobile") {
    return (
      <>
        <div className={`relative ${className}`}>
          <div className="flex gap-2 overflow-hidden" style={{ height: config.height }}>
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleImages.map((image, index) => {
                const isActive = activeIndex === index;
                return (
                  <motion.div
                    key={`${image.originalIndex}-${startIndex}`}
                    className="relative overflow-hidden cursor-pointer flex-shrink-0"
                    style={{ 
                      borderRadius: "16px",
                      height: "100%",
                    }}
                    initial={{ width: `${config.collapsedPercent}%`, opacity: 0.8 }}
                    animate={{ 
                      width: isActive ? `${config.expandedPercent}%` : `${config.collapsedPercent}%`,
                      opacity: 1
                    }}
                    exit={{ width: `${config.collapsedPercent}%`, opacity: 0.8 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 30,
                      mass: 1
                    }}
                    onClick={() => {
                      if (isActive) {
                        openLightbox(image.originalIndex);
                      } else {
                        setActiveIndex(index);
                      }
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Caption overlay */}
                    <AnimatePresence>
                      {isActive && image.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ delay: 0.1, duration: 0.2 }}
                          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                        >
                          <p className="text-white text-sm font-medium line-clamp-1">{image.title}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Mobile navigation buttons */}
          {canNavigate && (
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => navigate("prev")}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={() => navigate("next")}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          )}
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

  // Desktop/Tablet horizontal expand layout
  return (
    <>
      <div className={`relative ${className}`}>
        {/* Navigation buttons */}
        {canNavigate && (
          <>
            <button
              onClick={() => navigate("prev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button
              onClick={() => navigate("next")}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors shadow-lg"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          </>
        )}

        <div 
          className="flex justify-center overflow-hidden px-16"
          style={{ height: config.height, gap: `${config.gap}px` }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleImages.map((image, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.div
                  key={`${image.originalIndex}-${startIndex}`}
                  className="relative overflow-hidden cursor-pointer flex-shrink-0"
                  style={{ 
                    borderRadius: "20px",
                    height: "100%",
                  }}
                  initial={{ width: `${config.collapsedPercent}%`, opacity: 0.9 }}
                  animate={{ 
                    width: isActive ? `${config.expandedPercent}%` : `${config.collapsedPercent}%`,
                    opacity: 1
                  }}
                  exit={{ width: `${config.collapsedPercent}%`, opacity: 0.9 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 280, 
                    damping: 28,
                    mass: 0.9
                  }}
                  onHoverStart={() => setActiveIndex(index)}
                  onClick={() => openLightbox(image.originalIndex)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500"
                    style={{ transform: isActive ? "scale(1)" : "scale(1.05)" }}
                    loading="lazy"
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
                        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
                      >
                        <p className="text-white text-base font-semibold">{image.title}</p>
                        {image.description && (
                          <p className="text-white/70 text-sm mt-1 line-clamp-2">{image.description}</p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-1.5 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setStartIndex(index);
                setActiveIndex(0);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === startIndex 
                  ? "w-8 bg-foreground" 
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
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
