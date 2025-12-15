import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  linkTo?: string;
  linkText?: string;
  dark?: boolean;
}

const SectionHeader = ({ title, linkTo, linkText = "VIEW ALL", dark = true }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex items-center gap-6 mb-12 md:mb-16"
    >
      {/* Title */}
      <h2 className={`text-sm font-medium tracking-[0.2em] uppercase ${dark ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      
      {/* Line */}
      <div className={`flex-grow h-px ${dark ? 'bg-white/20' : 'bg-gray-300'}`} />
      
      {/* View All Link */}
      {linkTo && (
        <Link 
          to={linkTo}
          className={`group flex items-center gap-2 text-sm font-medium tracking-wide transition-colors ${
            dark 
              ? 'text-white/60 hover:text-white' 
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          {linkText}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </motion.div>
  );
};

export default SectionHeader;
