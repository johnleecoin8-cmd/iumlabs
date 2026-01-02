"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
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
}

const HoverExpand_001 = ({ images, className, onImageClick }: HoverExpandProps) => {
  const [activeImage, setActiveImage] = useState(1);
  const breakpoint = useBreakpoint();

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

  const handleClick = (index: number, slug?: string) => {
    if (onImageClick && slug) {
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

  // Tablet & Desktop: Horizontal expand layout
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "flex justify-center mx-auto",
          config.gap,
          "maxWidth" in config && config.maxWidth
        )}
        style={{ height: config.height }}
      >
        {images.slice(0, config.numVisible).map((image, index) => {
          const isActive = activeImage === index;
          const width =
            "expandedWidth" in config
              ? isActive
                ? config.expandedWidth
                : config.collapsedWidth
              : isActive
              ? `${config.expandedPercent}%`
              : `${config.collapsedPercent}%`;
          const initialWidth =
            "expandedWidth" in config
              ? config.collapsedWidth
              : `${config.collapsedPercent}%`;

          return (
            <motion.div
              key={index}
              className="relative h-full overflow-hidden rounded-[20px] cursor-pointer"
              initial={{ width: initialWidth }}
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
  );
};

export { HoverExpand_001 };
