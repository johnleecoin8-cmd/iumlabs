import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import { GalleryItem } from "@/data/projectsData";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";

interface ProjectGalleryGridProps {
  gallery: GalleryItem[];
  glowColor: string;
}

const ProjectGalleryGrid = ({ gallery, glowColor }: ProjectGalleryGridProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!gallery || gallery.length === 0) return null;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lightboxImages = gallery.map(item => ({
    src: item.src,
    title: item.title,
    description: item.description
  }));

  return (
    <>
      <section className="relative py-8 md:py-10 bg-[#0A0A0A] overflow-hidden">
        {/* Background */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] opacity-5 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${glowColor} 0%, transparent 60%)` }}
        />
        
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          {/* Section Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span 
                className="text-sm font-mono tracking-wider"
                style={{ color: glowColor }}
              >
                05
              </span>
              <div 
                className="h-px w-10"
                style={{ background: `linear-gradient(to right, ${glowColor}, transparent)` }}
              />
              <span className="text-xs text-white/40 uppercase tracking-widest">Campaign</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Visual <span style={{ color: glowColor }}>Gallery</span>
            </h2>
          </motion.div>
          
        {/* Gallery Grid - 1x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gallery.slice(0, 2).map((item, i) => (
            <motion.div
              key={i}
              className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => openLightbox(i)}
              >
                {/* Image */}
                <img 
                  src={item.src} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"
                />
                
                {/* Expand Icon */}
                <div 
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: `${glowColor}30`, border: `1px solid ${glowColor}50` }}
                >
                  <Expand className="w-4 h-4" style={{ color: glowColor }} />
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p 
                    className="text-xs uppercase tracking-wider mb-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: glowColor }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-white/60 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.description}
                  </p>
                </div>
                
                {/* Border Glow on Hover */}
                <div 
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${glowColor}40` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
};

export default ProjectGalleryGrid;
