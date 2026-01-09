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
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  const goNext = () => {
    setActiveIndex(prev => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goPrev = () => {
    setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-24 bg-background border-t border-border">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="max-w-5xl mx-auto"
      >
        <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4 text-center">
          What Clients Say
        </p>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-16 text-center">
          Trusted by Industry Leaders
        </h2>

        <div className="relative">
          {/* Main testimonial card */}
          <div 
            className="relative bg-muted/30 border border-border p-8 md:p-12"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <Quote className="w-8 h-8 text-primary/30 mb-6" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8">
                  "{activeTestimonial.quote}"
                </p>

                {/* Author info */}
                <div className="flex items-center gap-4">
                  <img 
                    src={activeTestimonial.logo} 
                    alt={activeTestimonial.company}
                    className="w-12 h-12 object-contain opacity-80"
                  />
                  <div>
                    <p className="font-medium text-foreground">{activeTestimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {activeTestimonial.role}, {activeTestimonial.company}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium">
                      {activeTestimonial.result}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeIndex 
                    ? 'bg-primary w-6' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsCarousel;
