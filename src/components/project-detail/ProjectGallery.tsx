import { ChevronLeft, ChevronRight, ArrowUpRight, Images } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { GalleryItem } from "@/data/projectsData";

interface ProjectGalleryProps {
  gallery: GalleryItem[];
  glowColor: string;
  onOpenLightbox: (index: number) => void;
}

const ProjectGallery = ({ gallery, glowColor, onOpenLightbox }: ProjectGalleryProps) => {
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = 400;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Background Effects */}
      <div 
        className="absolute bottom-0 left-0 w-[40%] h-[60%] opacity-5 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 100%, ${glowColor} 0%, transparent 60%)` }}
      />
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span 
                className="text-sm font-mono tracking-wider"
                style={{ color: glowColor }}
              >
                03
              </span>
              <div 
                className="h-px w-12"
                style={{ background: `linear-gradient(to right, ${glowColor}, transparent)` }}
              />
              <span className="text-xs text-white/40 uppercase tracking-widest">Visual Journey</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Campaign <span style={{ color: glowColor }}>Highlights</span>
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <motion.button
              onClick={() => scrollGallery('left')}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all group hover:border-white/40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
            </motion.button>
            <motion.button
              onClick={() => scrollGallery('right')}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all group hover:border-white/40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
            </motion.button>
          </div>
        </motion.div>

        {/* Gallery Images */}
        <div 
          ref={galleryRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth -mx-6 px-6"
        >
          <div className="flex gap-6" style={{ width: 'max-content' }}>
            {gallery.map((item, index) => (
              <motion.div 
                key={index} 
                className="relative w-80 md:w-[420px] aspect-[4/3] overflow-hidden rounded-2xl group cursor-pointer flex-shrink-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => onOpenLightbox(index)}
              >
                {/* Image */}
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Border Glow on Hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ 
                    boxShadow: `inset 0 0 0 2px ${glowColor}60, 0 0 40px ${glowColor}30`
                  }}
                />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-white/60 text-sm line-clamp-2">{item.description}</p>
                </div>

                {/* Expand Icon */}
                <motion.div 
                  className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  whileHover={{ scale: 1.1, rotate: 45 }}
                  style={{ backgroundColor: glowColor }}
                >
                  <ArrowUpRight className="w-5 h-5 text-black" />
                </motion.div>

                {/* Index Badge */}
                <div 
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ 
                    backgroundColor: `${glowColor}20`,
                    color: glowColor,
                    border: `1px solid ${glowColor}40`
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gallery Count */}
        <motion.div 
          className="flex items-center justify-center gap-3 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Images className="w-4 h-4" style={{ color: glowColor }} />
          <span className="text-white/40 text-sm">
            {gallery.length} images in gallery
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectGallery;