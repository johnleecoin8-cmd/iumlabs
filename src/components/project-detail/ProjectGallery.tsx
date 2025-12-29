import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
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
      const scrollAmount = 320;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-[#0F0F0F] py-16">
      {/* Section Header - Homepage Style */}
      <div className="border-t border-white/10">
        <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
          <div className="flex items-baseline gap-6 md:gap-10">
            <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">03</span>
            <h2 className="text-lg md:text-xl font-medium text-white">Gallery</h2>
          </div>
          <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Campaign Highlights</span>
        </div>
      </div>
      
      <div className="container mx-auto max-w-7xl px-4 md:px-8 pt-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] mb-4" style={{ color: glowColor }}>
              <span className="w-6 h-px" style={{ backgroundColor: glowColor }} />
              Visual Journey
            </span>
            <h2 className="text-white text-4xl md:text-5xl font-bold">
              Campaign <span style={{ color: glowColor }}>Highlights</span>
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <motion.button
              onClick={() => scrollGallery('left')}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = glowColor; e.currentTarget.style.backgroundColor = `${glowColor}15`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.backgroundColor = ''; }}
            >
              <ChevronLeft className="w-5 h-5 text-white/60 group-hover:text-white" />
            </motion.button>
            <motion.button
              onClick={() => scrollGallery('right')}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = glowColor; e.currentTarget.style.backgroundColor = `${glowColor}15`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.backgroundColor = ''; }}
            >
              <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white" />
            </motion.button>
          </div>
        </div>

        {/* Gallery Images */}
        <div 
          ref={galleryRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth -mx-4 px-4"
        >
          <div className="flex gap-5" style={{ width: 'max-content' }}>
            {gallery.map((item, index) => (
              <motion.div 
                key={index} 
                className="relative w-72 md:w-80 aspect-[4/3] overflow-hidden rounded-2xl group cursor-pointer flex-shrink-0 border border-white/10 hover:border-white/30 transition-all duration-300"
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => onOpenLightbox(index)}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${glowColor}50`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Project color border glow on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
                  style={{ boxShadow: `inset 0 0 30px ${glowColor}40, 0 0 40px ${glowColor}30` }}
                />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold text-base mb-1">{item.title}</h3>
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;