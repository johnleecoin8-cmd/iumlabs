import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface SpotlightCardProps {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
}

const SpotlightCard = ({
  slug,
  title,
  excerpt,
  image,
  category,
  date,
  readTime,
  author,
  authorRole,
}: SpotlightCardProps) => {
  return (
    <Link to={`/research/${slug}`} className="block group">
      <motion.div
        className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/[0.06] hover:border-emerald-500/30 transition-all duration-500"
        whileHover={{ y: -4 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between">
          {/* Top */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-emerald-400">
                Spotlight
              </span>
            </div>
            <span className="px-2.5 py-1 text-[10px] font-medium rounded-full bg-white/10 text-white/70 border border-white/10">
              {category}
            </span>
          </div>

          {/* Bottom */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight group-hover:text-emerald-50 transition-colors line-clamp-3">
                {title}
              </h2>
              <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
                {excerpt}
              </p>
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-xs font-bold text-white">
                  {author.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-medium text-white">{author}</div>
                  <div className="text-[10px] text-white/40">{date}</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-white/40">
                <Clock className="w-3 h-3" />
                <span className="text-[10px]">{readTime}</span>
              </div>
            </div>

            {/* Read Button */}
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Read Report</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default SpotlightCard;
