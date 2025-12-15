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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 md:gap-6 mb-10 md:mb-14"
    >
      {/* Title - 4pillars style */}
      <h2 className={`text-xs md:text-sm font-semibold tracking-[0.25em] uppercase whitespace-nowrap ${dark ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      
      {/* Extending Line */}
      <div className={`flex-grow h-px ${dark ? 'bg-white/15' : 'bg-gray-200'}`} />
      
      {/* View All Link */}
      {linkTo && (
        <Link 
          to={linkTo}
          className={`group flex items-center gap-2 text-xs md:text-sm font-medium tracking-wider whitespace-nowrap transition-all duration-300 ${
            dark 
              ? 'text-white/50 hover:text-white' 
              : 'text-gray-400 hover:text-gray-900'
          }`}
        >
          {linkText}
          <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
        </Link>
      )}
    </motion.div>
  );
};

export default SectionHeader;
