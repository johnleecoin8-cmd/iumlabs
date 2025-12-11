import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: { src: string; title: string; description: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const Lightbox = ({ images, currentIndex, isOpen, onClose, onNavigate }: LightboxProps) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case "Escape":
        onClose();
        break;
      case "ArrowLeft":
        onNavigate((currentIndex - 1 + images.length) % images.length);
        break;
      case "ArrowRight":
        onNavigate((currentIndex + 1) % images.length);
        break;
    }
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex - 1 + images.length) % images.length);
        }}
        className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex + 1) % images.length);
        }}
        className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image Container */}
      <div 
        className="max-w-5xl max-h-[85vh] w-full px-4 md:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.title}
          className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
        />
        
        {/* Caption */}
        <div className="text-center mt-6">
          <h3 className="text-white text-xl font-semibold mb-2">{currentImage.title}</h3>
          <p className="text-white/70">{currentImage.description}</p>
        </div>

        {/* Image Counter */}
        <div className="text-center mt-4">
          <span className="text-white/50 text-sm">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
