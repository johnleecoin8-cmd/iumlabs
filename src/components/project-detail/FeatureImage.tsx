import { motion } from "framer-motion";
import { GalleryItem } from "@/data/projectsData";
interface FeatureImageProps {
  gallery: GalleryItem[];
}
const FeatureImage = ({
  gallery
}: FeatureImageProps) => {
  if (!gallery || gallery.length === 0) return null;
  const mainImage = gallery[0];
  return <section className="relative bg-black">
      
    </section>;
};
export default FeatureImage;