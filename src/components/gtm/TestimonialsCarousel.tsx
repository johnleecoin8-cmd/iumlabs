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
  return;
};
export default TestimonialsCarousel;