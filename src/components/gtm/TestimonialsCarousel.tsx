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
const testimonials: Testimonial[] = [{
  quote: "ium Labs made our Korea launch seamless. They understood our vision from day one and delivered beyond expectations. Their local expertise and data-driven approach was exactly what we needed.",
  author: "Sarah Kim",
  role: "Head of Marketing",
  company: "Story Protocol",
  logo: storyLogo,
  result: "+340% Trading Volume",
  rating: 5
}, {
  quote: "The team's execution was flawless. From community building to media relations, they handled everything with precision and professionalism. We saw real results within weeks.",
  author: "Michael Chen",
  role: "Head of BD",
  company: "MANTRA",
  logo: mantraLogo,
  result: "500K+ Community",
  rating: 5
}, {
  quote: "Working with ium Labs gave us a significant first-mover advantage in the Korean market. Their deep understanding of the local crypto ecosystem is unmatched.",
  author: "David Park",
  role: "CEO",
  company: "peaq Network",
  logo: peaqLogo,
  result: "#1 DePIN in Korea",
  rating: 5
}, {
  quote: "ium Labs transformed our Korea strategy completely. Their community management and KOL network helped us build genuine connections with Korean users.",
  author: "Lisa Wang",
  role: "CMO",
  company: "Sahara AI",
  logo: saharaLogo,
  result: "200K+ Active Users",
  rating: 5
}, {
  quote: "Professional, responsive, and results-driven. ium Labs helped us navigate the complex Korean crypto landscape with confidence.",
  author: "James Lee",
  role: "Global BD",
  company: "KuCoin",
  logo: kucoinLogo,
  result: "Top 5 Exchange",
  rating: 5
}];
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
    <section ref={ref} className="px-4 md:px-12 lg:px-20 py-16 md:py-24 bg-background border-t border-border">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-8 md:mb-12">
          <p className="text-muted-foreground text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">
            What Our Clients Say
          </p>
          <h2 className="text-2xl md:text-4xl font-medium text-foreground">
            Trusted by Industry Leaders
          </h2>
        </div>

        <div className="relative">
          {/* Main testimonial card */}
          <div className="relative overflow-hidden min-h-[360px] md:min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="p-5 md:p-12 border border-border bg-muted/30"
              >
                <Quote className="w-8 h-8 md:w-10 md:h-10 text-primary/30 mb-4 md:mb-6" />
                
                <p className="text-base md:text-xl text-foreground leading-relaxed mb-6 md:mb-8">
                  "{activeTestimonial.quote}"
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={activeTestimonial.logo} 
                      alt={activeTestimonial.company}
                      className="h-8 w-auto opacity-80"
                    />
                    <div>
                      <p className="font-medium text-foreground">{activeTestimonial.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {activeTestimonial.role}, {activeTestimonial.company}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(activeTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-primary ml-2">
                      {activeTestimonial.result}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-5 md:mt-6">
            <div className="flex gap-2 md:gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 min-w-[32px] md:min-w-[8px] ${
                    i === activeIndex 
                      ? 'bg-primary w-8 md:w-8' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-8 md:w-2'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={goPrev}
                className="p-3 md:p-2 border border-border hover:border-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="p-3 md:p-2 border border-border hover:border-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
export default TestimonialsCarousel;