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
  const [activeImage, setActiveImage] = useState(1);
  const breakpoint = useBreakpoint();

  const config = {
    mobile: { 
      layout: "list" as const, 
      numVisible: images.length, 
      height: "min(20rem, 40vh)", 
      padding: "px-0" 
    },
    smallTablet: { 
      layout: "horizontal" as const, 
      numVisible: 3, 
      expandedPercent: 50, 
      collapsedPercent: 25, 
      height: "min(24rem, 45vh)", 
      gap: "gap-2", 
      padding: "px-0" 
    },
    largeTablet: { 
      layout: "horizontal" as const, 
      numVisible: 4, 
      expandedPercent: 46, 
      collapsedPercent: 18, 
      height: "min(28rem, 50vh)", 
      gap: "gap-3", 
      padding: "px-0" 
    },
    desktop: { 
      layout: "horizontal" as const, 
      numVisible: 6, 
      expandedWidth: "27.65625rem", 
      collapsedWidth: "9.21875rem", 
      height: "min(36.875rem, 60vh)", 
      gap: "gap-5", 
      padding: "px-0", 
      maxWidth: "max-w-[1200px]" 
    },
  }[breakpoint];

  if (config.layout === "list") {
    return (
      <div className={cn("w-full", config.padding, className)}>
        <div className="flex flex-col gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative w-full overflow-hidden rounded-lg cursor-pointer"
              style={{ height: config.height }}
              onClick={() => setActiveImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm font-medium">{image.code}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full flex justify-center", config.padding, className)}>
      <div className={cn("w-full", "maxWidth" in config ? config.maxWidth : "")}>
        <div className={cn("flex w-full", config.gap)} style={{ height: config.height }}>
          {images.slice(0, config.numVisible).map((image, index) => {
            const isActive = activeImage === index;
            const width = "expandedWidth" in config 
              ? (isActive ? config.expandedWidth : config.collapsedWidth) 
              : (isActive ? `${config.expandedPercent}%` : `${config.collapsedPercent}%`);
            const initialWidth = "expandedWidth" in config 
              ? config.collapsedWidth 
              : `${config.collapsedPercent}%`;

            return (
              <motion.div
                key={index}
                className="relative h-full overflow-hidden rounded-lg cursor-pointer"
                initial={{ width: initialWidth }}
                animate={{ width }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => setActiveImage(index)}
                onHoverStart={() => setActiveImage(index)}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: isActive ? 1 : 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  )}
                </motion.div>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-4 z-20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <p className="text-white text-sm md:text-base font-medium">{image.code}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { HoverExpand_001 };
