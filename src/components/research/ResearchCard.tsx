import { ArrowUpRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ResearchCardProps {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  index: number;
}

const ResearchCard = ({
  slug,
  title,
  excerpt,
  image,
  category,
  date,
  readTime,
  author,
  index,
}: ResearchCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/research/${slug}`}
        className="group block rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-[10px] font-medium rounded-full bg-black/60 backdrop-blur-sm text-white/90 border border-white/10">
              {category}
            </span>
          </div>

          {/* Hover Arrow */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-base font-semibold text-white/90 group-hover:text-white leading-snug line-clamp-2 mb-2 transition-colors">
            {title}
          </h3>
          
          <p className="text-xs text-white/40 leading-relaxed line-clamp-2 mb-3">
            {excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-[8px] font-bold text-white">
                {author.charAt(0)}
              </div>
              <span className="text-white/50">{author}</span>
              <span className="text-white/20">•</span>
              <span className="text-white/40">{date}</span>
            </div>
            
            <div className="flex items-center gap-1 text-white/30">
              <Clock className="w-2.5 h-2.5" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ResearchCard;
