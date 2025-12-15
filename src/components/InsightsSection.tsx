import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import SectionHeader from "./SectionHeader";

// Import blog images
import aiAgentsImg from "@/assets/blog/ai-agents-defi.jpg";
import ecosystemImg from "@/assets/blog/ecosystem-growth-2025.jpg";
import kolImg from "@/assets/blog/kol-marketing.jpg";
import communityImg from "@/assets/blog/community-growth-ai.jpg";
import cryptoMarketingImg from "@/assets/blog/crypto-marketing-bear.jpg";

const insights = [
  {
    id: "ai-agents-defi",
    title: "AI Agents Are Revolutionizing DeFi",
    date: "2 days ago",
    readTime: "5 min",
    category: "AI",
    image: aiAgentsImg,
  },
  {
    id: "ecosystem-growth-2025",
    title: "Ecosystem Growth Strategies for 2025",
    date: "5 days ago",
    readTime: "8 min",
    category: "Strategy",
    image: ecosystemImg,
  },
  {
    id: "kol-marketing",
    title: "The State of KOL Marketing",
    date: "1 week ago",
    readTime: "6 min",
    category: "Marketing",
    image: kolImg,
  },
  {
    id: "community-growth-ai",
    title: "Building Communities with AI Tools",
    date: "2 weeks ago",
    readTime: "7 min",
    category: "Community",
    image: communityImg,
  },
  {
    id: "crypto-marketing-bear",
    title: "Marketing in Bear Markets",
    date: "3 weeks ago",
    readTime: "6 min",
    category: "Strategy",
    image: cryptoMarketingImg,
  }
];

const InsightsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative bg-[#0A0A0B] py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header with navigation */}
        <div className="flex items-end justify-between mb-12">
          <div className="flex-1">
            <SectionHeader 
              title="INSIGHTS" 
              linkTo="/research" 
              linkText="VIEW ALL"
              dark={true}
            />
          </div>
          
          {/* Navigation arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                canScrollLeft 
                  ? 'border-white/20 text-white hover:bg-white hover:text-black' 
                  : 'border-white/10 text-white/20 cursor-not-allowed'
              }`}
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                canScrollRight 
                  ? 'border-white/20 text-white hover:bg-white hover:text-black' 
                  : 'border-white/10 text-white/20 cursor-not-allowed'
              }`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* a41 style: horizontal card carousel */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-16 lg:px-16"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {insights.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex-shrink-0 w-[320px] md:w-[380px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <Link 
                to={`/research/${article.id}`} 
                className="group block bg-white rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-900">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                    <span className="font-mono">{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime} read</span>
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>

                  {/* Read link */}
                  <div className="flex items-center gap-2 text-gray-400 group-hover:text-primary transition-colors">
                    <span className="text-sm font-medium">Read now</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
