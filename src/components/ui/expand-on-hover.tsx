"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
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

interface HoverExpandImage {
  src: string;
  alt: string;
  code: string;
}

interface HoverExpandProps {
  images: HoverExpandImage[];
  className?: string;
}

const HoverExpand_001 = ({ images, className }: HoverExpandProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoint = useBreakpoint();

  const config = {
    mobile: { 
      cardWidth: 280,
      height: "min(20rem, 40vh)", 
      gap: 16,
    },
    smallTablet: { 
      cardWidth: 300,
      height: "min(24rem, 45vh)", 
      gap: 16,
    },
    largeTablet: { 
      cardWidth: 320,
      height: "min(28rem, 50vh)", 
      gap: 20,
    },
    desktop: { 
      cardWidth: 360,
      height: "min(36.875rem, 60vh)", 
      gap: 24,
    },
  }[breakpoint];

  const totalWidth = images.length * (config.cardWidth + config.gap) - config.gap;
  const containerWidth = typeof window !== "undefined" ? window.innerWidth - 64 : 1200;
  const dragConstraint = Math.max(0, totalWidth - containerWidth);

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <motion.div
        ref={containerRef}
        className="flex cursor-grab active:cursor-grabbing"
        style={{ 
          height: config.height,
          gap: config.gap,
        }}
        drag="x"
        dragConstraints={{ left: -dragConstraint, right: 0 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
      >
        {images.map((image, index) => {
          const isActive = activeImage === index;

          return (
            <motion.div
              key={index}
              className="relative h-full overflow-hidden rounded-xl flex-shrink-0"
              style={{ width: config.cardWidth }}
              animate={{ 
                scale: isActive ? 1 : 0.95,
                opacity: isActive ? 1 : 0.7,
              }}
              transition={{ duration: 0.3 }}
              onClick={() => !isDragging && setActiveImage(index)}
              onHoverStart={() => !isDragging && setActiveImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <AnimatePresence>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 z-20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isActive ? 1 : 0.6, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white text-sm md:text-base font-medium drop-shadow-lg">{image.code}</p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Scroll indicator */}
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              activeImage === index ? "bg-primary w-6" : "bg-muted-foreground/30"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export { HoverExpand_001 };
