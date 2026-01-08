import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Client logos
import storyLogo from '@/assets/logos/story-protocol.png';
import mantraLogo from '@/assets/logos/mantra.png';
import peaqLogo from '@/assets/logos/peaq.svg';
import saharaLogo from '@/assets/logos/sahara-ai.png';
import kucoinLogo from '@/assets/logos/kucoin.svg';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  logo: string;
  result: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "ium Labs made our Korea launch seamless. They understood our vision from day one and delivered beyond expectations. Their local expertise and data-driven approach was exactly what we needed.",
    author: "Sarah Kim",
    role: "Head of Marketing",
    company: "Story Protocol",
    logo: storyLogo,
    result: "+340% Trading Volume",
    rating: 5
  },
  {
    quote: "The team's execution was flawless. From community building to media relations, they handled everything with precision and professionalism. We saw real results within weeks.",
    author: "Michael Chen",
    role: "Head of BD",
    company: "MANTRA",
    logo: mantraLogo,
    result: "500K+ Community",
    rating: 5
  },
  {
    quote: "Working with ium Labs gave us a significant first-mover advantage in the Korean market. Their deep understanding of the local crypto ecosystem is unmatched.",
    author: "David Park",
    role: "CEO",
    company: "peaq Network",
    logo: peaqLogo,
    result: "#1 DePIN in Korea",
    rating: 5
  },
  {
    quote: "ium Labs transformed our Korea strategy completely. Their community management and KOL network helped us build genuine connections with Korean users.",
    author: "Lisa Wang",
    role: "CMO",
    company: "Sahara AI",
    logo: saharaLogo,
    result: "200K+ Active Users",
    rating: 5
  },
  {
    quote: "Professional, responsive, and results-driven. ium Labs helped us navigate the complex Korean crypto landscape with confidence.",
    author: "James Lee",
    role: "Global BD",
    company: "KuCoin",
    logo: kucoinLogo,
    result: "Top 5 Exchange",
    rating: 5
  }
];

const TestimonialsCarousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/10 via-transparent to-transparent" />
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Testimonials</span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mt-4">
            클라이언트가 <span className="bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">말합니다</span>
          </h3>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Quote className="w-6 h-6 text-primary" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative p-8 md:p-12 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl"
              >
                {/* Client Logo */}
                <img 
                  src={activeTestimonial.logo} 
                  alt={activeTestimonial.company}
                  className="h-8 w-auto brightness-0 invert opacity-60 mb-6"
                />

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-2xl text-white/90 leading-relaxed mb-8 font-light">
                  "{activeTestimonial.quote}"
                </blockquote>

                {/* Author & Result */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-white/10">
                  <div>
                    <p className="text-white font-semibold text-lg">{activeTestimonial.author}</p>
                    <p className="text-white/50 text-sm">{activeTestimonial.role}, {activeTestimonial.company}</p>
                  </div>
                  <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                    <span className="text-green-400 font-semibold text-sm">{activeTestimonial.result}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={goPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors hidden md:flex"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors hidden md:flex"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i 
                    ? 'w-8 bg-primary' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Client Logos Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-16 border-t border-white/10"
        >
          <p className="text-center text-white/30 text-xs tracking-wider uppercase mb-8">Trusted By Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {testimonials.map((t, i) => (
              <motion.button
                key={t.company}
                onClick={() => goToSlide(i)}
                className={`transition-all duration-300 ${
                  activeIndex === i 
                    ? 'opacity-100 scale-110' 
                    : 'opacity-30 grayscale hover:opacity-60'
                }`}
              >
                <img
                  src={t.logo}
                  alt={t.company}
                  className="h-6 md:h-8 w-auto"
                />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
