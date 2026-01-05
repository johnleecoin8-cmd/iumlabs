import { motion } from "framer-motion";
import { GalleryItem } from "@/data/projectsData";

interface FeatureImageProps {
  gallery: GalleryItem[];
}

const FeatureImage = ({ gallery }: FeatureImageProps) => {
  if (!gallery || gallery.length === 0) return null;

  const mainImage = gallery[0];

  return (
    <section className="relative bg-black">
      <motion.div
        className="w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <img 
          src={mainImage.src} 
          alt={mainImage.title || "Project feature image"}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
};

export default FeatureImage;
