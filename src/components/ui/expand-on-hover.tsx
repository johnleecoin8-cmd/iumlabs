"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<"mobile" | "smallTablet" | "largeTablet" | "desktop">(() => {
    if (typeof window === "undefined") return "desktop";
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 900) return "smallTablet";
    if (width < 1280) return "largeTablet";
    return "desktop";
  });

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) setBreakpoint("mobile");
      else if (width < 900) setBreakpoint("smallTablet");
      else if (width < 1280) setBreakpoint("largeTablet");
      else setBreakpoint("desktop");
    };
    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  return breakpoint;
};

export interface HoverExpandImage {
  src: string;
  alt: string;
  code: string;
  slug?: string;
}

interface HoverExpandProps {
  images: HoverExpandImage[];
  className?: string;
  onImageClick?: (slug: string) => void;
  onLightboxOpen?: (index: number) => void;
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
}

const HoverExpand_001 = ({ 
  images, 
  className, 
  onImageClick,
  onLightboxOpen,
  autoAdvance = true,
  autoAdvanceInterval = 4000
}: HoverExpandProps) => {
  const [activeImage, setActiveImage] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const breakpoint = useBreakpoint();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const config = {
    mobile: { 
      layout: "list" as const, 
      numVisible: images.length, 
      height: "min(20rem, 40vh)", 
    },
    smallTablet: { 
      layout: "horizontal" as const, 
      numVisible: 3, 
      expandedPercent: 50, 
      collapsedPercent: 25, 
      height: "min(24rem, 45vh)", 
      gap: "gap-2", 
    },
    largeTablet: { 
      layout: "horizontal" as const, 
      numVisible: 4, 
      expandedPercent: 46, 
      collapsedPercent: 18, 
      height: "min(28rem, 50vh)", 
      gap: "gap-3", 
    },
    desktop: { 
      layout: "horizontal" as const, 
      numVisible: 6, 
      expandedWidth: "27.65625rem", 
      collapsedWidth: "9.21875rem", 
      height: "min(36.875rem, 60vh)", 
      gap: "gap-5", 
      maxWidth: "max-w-[1200px]" 
    },
  }[breakpoint];

  const numVisible = config.numVisible;

  // Autoplay logic
  const startAutoAdvance = useCallback(() => {
    if (!autoAdvance || isPaused || config.layout === "list") return;
    
    intervalRef.current = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % numVisible);
    }, autoAdvanceInterval);
  }, [autoAdvance, isPaused, numVisible, autoAdvanceInterval, config.layout]);

  const stopAutoAdvance = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoAdvance();
    return () => stopAutoAdvance();
  }, [startAutoAdvance, stopAutoAdvance]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    stopAutoAdvance();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleClick = (index: number, slug?: string) => {
    // Open lightbox if handler provided
    if (onLightboxOpen) {
      onLightboxOpen(index);
    } else if (onImageClick && slug) {
      onImageClick(slug);
    } else {
      setActiveImage(index);
    }
  };

  // Mobile: List layout
  if (config.layout === "list") {
    return (
      <div className={cn("flex flex-col gap-4", className)}>
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleClick(index, image.slug)}
            className="relative rounded-xl overflow-hidden cursor-pointer"
            style={{ height: config.height }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-medium text-sm">{image.code}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Tablet & Desktop: Horizontal expand layout with scroll
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll-based autoplay
  useEffect(() => {
  if (!autoAdvance || isPaused || breakpoint === "mobile") return;
    
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollInterval = setInterval(() => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;
      
      if (currentScroll >= maxScroll - 10) {
        // Reset to start
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll by one image width
        const imageWidth = breakpoint === 'desktop' ? 180 : 150;
        container.scrollBy({ left: imageWidth, behavior: 'smooth' });
      }
    }, autoAdvanceInterval);

    return () => clearInterval(scrollInterval);
  }, [autoAdvance, isPaused, autoAdvanceInterval, breakpoint, config.layout]);

  const collapsedWidth = breakpoint === 'desktop' ? '9.21875rem' : breakpoint === 'largeTablet' ? '7rem' : '5.5rem';
  const expandedWidth = breakpoint === 'desktop' ? '27.65625rem' : breakpoint === 'largeTablet' ? '18rem' : '14rem';

  return (
    <div 
      className={cn("w-full relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Scroll container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div
          className={cn("flex", config.gap)}
          style={{ 
            height: config.height,
            width: 'max-content',
            paddingRight: '2rem',
          }}
        >
          {images.map((image, index) => {
            const isActive = activeImage === index;
            const width = isActive ? expandedWidth : collapsedWidth;

            return (
              <motion.div
                key={index}
                className="relative h-full overflow-hidden rounded-[20px] cursor-pointer flex-shrink-0"
                initial={{ width: collapsedWidth }}
                animate={{ width }}
                transition={{ type: "spring", stiffness: 400, damping: 40 }}
                onClick={() => handleClick(index, image.slug)}
                onHoverStart={() => setActiveImage(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                
                {/* Dark overlay for inactive images */}
                <motion.div
                  className="absolute inset-0 bg-black/30"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isActive ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Gradient overlay for caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Caption - only visible when active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-4 left-4 right-4"
                    >
                      <p className="text-white font-medium text-sm md:text-base">
                        {image.code}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Right fade hint */}
      <div className="absolute right-0 top-0 bottom-8 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      {/* Scroll progress indicator */}
      {autoAdvance && (
        <div className="flex justify-center gap-1.5 mt-4">
          {Array.from({ length: Math.min(images.length, 10) }).map((_, index) => {
            const groupSize = Math.ceil(images.length / 10);
            const groupStart = index * groupSize;
            const groupEnd = Math.min((index + 1) * groupSize - 1, images.length - 1);
            const isInGroup = activeImage >= groupStart && activeImage <= groupEnd;
            
            return (
              <button
                key={index}
                onClick={() => {
                  setActiveImage(groupStart);
                  scrollContainerRef.current?.scrollTo({
                    left: groupStart * (breakpoint === 'desktop' ? 180 : 150),
                    behavior: 'smooth'
                  });
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  isInGroup 
                    ? "bg-foreground w-6" 
                    : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export { HoverExpand_001 };
