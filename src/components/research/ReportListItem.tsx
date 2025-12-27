import { ArrowUpRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface ReportListItemProps {
  slug: string;
  title: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
}

const ReportListItem = ({
  slug,
  title,
  image,
  category,
  date,
  readTime,
  author,
}: ReportListItemProps) => {
  return (
    <Link
      to={`/research/${slug}`}
      className="group flex gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-2 py-0.5 text-[9px] font-medium rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {category}
          </span>
          <span className="text-[10px] text-white/30">{date}</span>
        </div>
        
        <h3 className="text-sm font-medium text-white/80 group-hover:text-white leading-snug line-clamp-2 transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-3 mt-2">
          <span className="text-[10px] text-emerald-400/70">@{author}</span>
          <div className="flex items-center gap-1 text-white/30">
            <Clock className="w-2.5 h-2.5" />
            <span className="text-[10px]">{readTime}</span>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="w-4 h-4 text-emerald-400" />
      </div>
    </Link>
  );
};

export default ReportListItem;
