import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Alex Chen",
    role: "CEO",
    company: "MetaVerse Korea",
    content: "CryptoBridge helped us raise $12M and build a community of 50K+ members in just 3 months. Their understanding of the Korean market is unmatched.",
    rating: 5
  },
  {
    name: "Sarah Kim",
    role: "Founder",
    company: "KimchiSwap",
    content: "The team's DeFi expertise and KOL network helped us achieve $100M TVL within the first month of launch. Highly recommend!",
    rating: 5
  },
  {
    name: "Michael Park",
    role: "CMO",
    company: "Seoul DAO",
    content: "Professional, responsive, and results-driven. They know exactly how to position Web3 projects for the Korean audience.",
    rating: 5
  },
  {
    name: "Jennifer Lee",
    role: "Head of Marketing",
    company: "ChainLink Korea",
    content: "Their network of Korean crypto influencers is incredible. We saw 300% increase in Korean community engagement within weeks.",
    rating: 5
  },
  {
    name: "David Hong",
    role: "CEO",
    company: "NFT Seoul",
    content: "From zero to hero in the Korean NFT space. CryptoBridge made our launch a massive success with their comprehensive approach.",
    rating: 5
  }
];

const floatingTags = [
  { label: "$12M Raised", top: "10%", left: "5%", delay: 0 },
  { label: "300% Growth", top: "15%", right: "8%", delay: 0.2 },
  { label: "50K+ Members", bottom: "20%", left: "3%", delay: 0.4 },
];

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div ref={ref} className="relative bg-[#0A0A0B] py-16 md:py-24 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Tags */}
      <div className="hidden lg:block">
        {floatingTags.map((tag, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: tag.delay + 0.3 }}
            className="absolute z-10 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/60 text-xs font-medium hover:bg-white/[0.06] hover:border-white/20 hover:text-white transition-all duration-300 cursor-default backdrop-blur-sm"
            style={{
              top: tag.top,
              left: tag.left,
              right: tag.right,
              bottom: tag.bottom
            }}
          >
            {tag.label}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-white/40 text-xs font-mono tracking-widest uppercase mb-4 block">
            [ 07 ] ── Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            What Clients <span className="text-primary">Say</span>
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Testimonial Card */}
          <div className="relative min-h-[300px] md:min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm"
              >
                <Quote className="w-12 h-12 text-primary/30 mb-6" />
                
                <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
                  "{testimonials[currentIndex].content}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <span className="text-primary font-bold text-lg">
                      {testimonials[currentIndex].name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">{testimonials[currentIndex].name}</p>
                    <p className="text-white/50 text-sm">{testimonials[currentIndex].role} at {testimonials[currentIndex].company}</p>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.06] hover:border-primary/40 transition-all duration-300 group"
            >
              <ChevronLeft className="w-5 h-5 text-white/60 group-hover:text-white" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-white/20 w-2 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.06] hover:border-primary/40 transition-all duration-300 group"
            >
              <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
