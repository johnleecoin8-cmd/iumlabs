import { motion } from "framer-motion";
import { ExternalLink, Newspaper } from "lucide-react";
import { NewsItem } from "@/data/projectsData";

interface ProjectPressProps {
  news: NewsItem[];
  glowColor: string;
}

const ProjectPress = ({ news, glowColor }: ProjectPressProps) => {
  if (!news || news.length === 0) return null;

  return (
    <section className="relative py-12 md:py-16 bg-[#0A0A0A] overflow-hidden">
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
              06
            </span>
            <div 
              className="h-px w-10"
              style={{ background: `linear-gradient(to right, ${glowColor}, transparent)` }}
            />
            <span className="text-xs text-white/40 uppercase tracking-widest">Coverage</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Media <span style={{ color: glowColor }}>Coverage</span>
          </h2>
        </motion.div>
        
        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {news.slice(0, 3).map((item, i) => (
            <motion.a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div 
                className="p-4 rounded-xl border bg-gradient-to-br from-white/[0.03] to-transparent h-full transition-all duration-300 group-hover:border-opacity-100"
                style={{ borderColor: `${glowColor}15` }}
              >
                {/* Image */}
                <div className="aspect-[16/9] rounded-lg overflow-hidden mb-4">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Meta */}
                <div className="flex items-center gap-2 mb-2">
                  <Newspaper className="w-3 h-3 text-white/40" />
                  <span className="text-xs text-white/40">{item.source}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-xs text-white/40">{item.date}</span>
                </div>
                
                {/* Title */}
                <h3 className="text-sm font-medium text-white/80 leading-snug group-hover:text-white transition-colors line-clamp-2">
                  {item.title}
                </h3>
                
                {/* External Link Icon */}
                <div 
                  className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: `${glowColor}20` }}
                >
                  <ExternalLink className="w-3 h-3" style={{ color: glowColor }} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectPress;
