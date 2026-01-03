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
  const [activeImage, setActiveImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const breakpoint = useBreakpoint();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Drag scroll state with momentum
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const momentumFrame = useRef<number | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const hasDragged = useRef(false);

  const config = {
    mobile: { 
      layout: "list" as const, 
      numVisible: images.length, 
      height: "min(20rem, 40vh)", 
    },
    smallTablet: { 
      layout: "horizontal" as const, 
      numVisible: 3, 
      itemWidth: 140,
      expandedWidth: 280, 
      height: "min(24rem, 45vh)", 
      gap: 12, 
    },
    largeTablet: { 
      layout: "horizontal" as const, 
      numVisible: 4, 
      itemWidth: 220,
      expandedWidth: 400, 
      height: "min(32rem, 55vh)", 
      gap: 20, 
    },
    desktop: { 
      layout: "horizontal" as const, 
      numVisible: 4, 
      itemWidth: 280,
      expandedWidth: 500, 
      height: "min(40rem, 65vh)", 
      gap: 24, 
    },
  }[breakpoint];

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

  // Autoplay logic
  const startAutoAdvance = useCallback(() => {
    if (!autoAdvance || isPaused || config.layout === "list") return;
    
    intervalRef.current = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;
      
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;
      
      if (currentScroll >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const scrollAmount = ('itemWidth' in config ? config.itemWidth : 200) + ('gap' in config ? config.gap : 16);
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, autoAdvanceInterval);
  }, [autoAdvance, isPaused, autoAdvanceInterval, config]);

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
    if (isDragging.current) {
      handleMouseUp();
    }
  };

  // Drag handlers with momentum
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    isDragging.current = true;
    setIsScrolling(true);
    hasDragged.current = false;
    startX.current = e.pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
    lastX.current = e.pageX;
    lastTime.current = Date.now();
    velocity.current = 0;
    
    if (momentumFrame.current) {
      cancelAnimationFrame(momentumFrame.current);
      momentumFrame.current = null;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    
    const container = scrollContainerRef.current;
    if (!container) return;
    
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    
    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
    }
    
    container.scrollLeft = scrollLeft.current - walk;
    
    // Calculate velocity for momentum
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (lastX.current - e.pageX) * (16 / dt) * 1.2;
    }
    lastX.current = e.pageX;
    lastTime.current = now;
  };

  const handleMouseUp = () => {
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
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    isDragging.current = true;
    setIsScrolling(true);
    hasDragged.current = false;
    startX.current = e.touches[0].pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
    lastX.current = e.touches[0].pageX;
    lastTime.current = Date.now();
    velocity.current = 0;
    
    if (momentumFrame.current) {
      cancelAnimationFrame(momentumFrame.current);
      momentumFrame.current = null;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    
    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
    }
    
    container.scrollLeft = scrollLeft.current - walk;
    
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (lastX.current - e.touches[0].pageX) * (16 / dt) * 1.2;
    }
    lastX.current = e.touches[0].pageX;
    lastTime.current = now;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    if (Math.abs(velocity.current) > 2) {
      applyMomentum();
    }
    
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  };

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

  const handleClick = (index: number, slug?: string) => {
    // Ignore click if we just dragged
    if (hasDragged.current || isScrolling) {
      hasDragged.current = false;
      return;
    }
    
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

  const itemWidth = config.itemWidth;
  const expandedWidth = config.expandedWidth;
  const gap = config.gap;

  return (
    <div 
      className={cn("w-full relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Scroll container with drag support */}
      <div
        ref={scrollContainerRef}
        className={cn(
          "flex overflow-x-auto scrollbar-hide select-none",
          isDragging.current ? "cursor-grabbing" : "cursor-grab"
        )}
        style={{ 
          height: config.height,
          gap: `${gap}px`,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollBehavior: isDragging.current ? 'auto' : 'smooth',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => {
          const isActive = activeImage === index && !isScrolling;
          const width = isActive ? expandedWidth : itemWidth;

          return (
            <motion.div
              key={index}
              className="relative h-full overflow-hidden rounded-[20px] flex-shrink-0"
              animate={{ width }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={() => handleClick(index, image.slug)}
              onHoverStart={() => !isScrolling && !isDragging.current && setActiveImage(index)}
              onHoverEnd={() => setActiveImage(-1)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover pointer-events-none"
                style={{ transform: isActive ? "scale(1)" : "scale(1.05)" }}
                draggable={false}
              />
              
              {/* Dark overlay for inactive images */}
              <motion.div
                className="absolute inset-0 bg-black/30"
                animate={{ opacity: isActive ? 0 : 0.3 }}
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
                    className="absolute bottom-6 left-6 right-6"
                  >
                    <p className="text-white font-semibold text-lg md:text-xl lg:text-2xl leading-tight">
                      {image.code}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center gap-2 mt-4">
        <div className="text-muted-foreground text-xs flex items-center gap-2">
          <span>← Drag to scroll →</span>
        </div>
      </div>
    </div>
  );
};

export { HoverExpand_001 };
