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
      <section className="relative py-12 md:py-16 bg-[#F5F5F5] overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          {/* Section Header */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">
              Gallery
            </h2>
          </motion.div>
          
          {/* Gallery Grid - 1x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gallery.slice(0, 2).map((item, i) => (
              <motion.div
                key={i}
                className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer bg-gray-200"
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
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                
                {/* Expand Icon */}
                <div 
                  className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/90"
                >
                  <Expand className="w-5 h-5 text-gray-700" />
                </div>
                
                {/* Caption on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-lg font-medium text-white">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-white/80 mt-1">{item.description}</p>
                  )}
                </div>
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
