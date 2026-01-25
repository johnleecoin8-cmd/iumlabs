import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { useIsMobile } from '@/hooks/use-mobile';

export interface CampaignImage {
  src: string;
  title: string;
  project: string;
  result?: string;
}

interface ServiceCampaignGalleryProps {
  images: CampaignImage[];
  sectionNumber: string;
  accentColor: string;
}

const ServiceCampaignGallery = ({ images, sectionNumber, accentColor }: ServiceCampaignGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const isMobile = useIsMobile();

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-slide
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, images.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <section className="bg-[#0A0A0A]">
      <div className="border-t border-white/10">
        <SectionHeader 
          number={sectionNumber} 
          title="Real Campaigns" 
          badge="In Action" 
        />
        
        <div className="py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            {/* Main Gallery Container */}
            <div 
              className="relative rounded-xl md:rounded-2xl overflow-hidden bg-black/50 border border-white/10"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Image Container */}
              <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={currentImage.src}
                      alt={currentImage.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{ background: `linear-gradient(135deg, ${accentColor}20 0%, transparent 50%)` }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Info Overlay */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-4 md:p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={`info-${currentIndex}`}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-6">
                    <div>
                      <span 
                        className="inline-block px-2.5 py-1 text-[10px] md:text-xs font-medium rounded-md mb-2"
                        style={{ backgroundColor: `${accentColor}30`, color: accentColor }}
                      >
                        {currentImage.project}
                      </span>
                      <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white">
                        {currentImage.title}
                      </h3>
                      {currentImage.result && (
                        <p className="text-sm md:text-base text-white/60 mt-1 md:mt-2 max-w-xl">
                          {currentImage.result}
                        </p>
                      )}
                    </div>

                    {/* Counter */}
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <span style={{ color: accentColor }} className="font-bold text-lg">
                        {String(currentIndex + 1).padStart(2, '0')}
                      </span>
                      <span>/</span>
                      <span>{String(images.length).padStart(2, '0')}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Navigation Arrows */}
                {images.length > 1 && !isMobile && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 hover:border-white/20 transition-all opacity-0 group-hover:opacity-100"
                      style={{ opacity: 1 }}
                    >
                      <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 hover:border-white/20 transition-all opacity-0 group-hover:opacity-100"
                      style={{ opacity: 1 }}
                    >
                      <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Dot Indicators */}
              {images.length > 1 && (
                <div className="flex items-center justify-center gap-2 py-4 bg-black/40">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'scale-125' 
                          : 'bg-white/20 hover:bg-white/40'
                      }`}
                      style={{ 
                        backgroundColor: index === currentIndex ? accentColor : undefined 
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Strip - Desktop Only */}
            {images.length > 1 && !isMobile && (
              <div className="mt-4 md:mt-6 grid grid-cols-4 md:grid-cols-6 gap-2 md:gap-3">
                {images.slice(0, 6).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentIndex 
                        ? 'border-opacity-100 scale-105' 
                        : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                    style={{ 
                      borderColor: index === currentIndex ? accentColor : 'transparent' 
                    }}
                  >
                    <img 
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCampaignGallery;
