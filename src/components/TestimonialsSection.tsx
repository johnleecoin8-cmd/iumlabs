import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    name: "Alex Chen",
    role: "CEO",
    company: "MetaVerse Korea",
    content: "CryptoBridge helped us raise $12M and build a community of 50K+ members in just 3 months. Their understanding of the Korean market is unmatched.",
    rating: 5,
  },
  {
    name: "Sarah Kim",
    role: "Founder",
    company: "KimchiSwap",
    content: "The team's DeFi expertise and KOL network helped us achieve $100M TVL within the first month of launch. Highly recommend!",
    rating: 5,
  },
  {
    name: "Michael Park",
    role: "CMO",
    company: "Seoul DAO",
    content: "Professional, responsive, and results-driven. They know exactly how to position Web3 projects for the Korean audience.",
    rating: 5,
  },
  {
    name: "Jennifer Lee",
    role: "Head of Marketing",
    company: "ChainLink Korea",
    content: "Their network of Korean crypto influencers is incredible. We saw 300% increase in Korean community engagement within weeks.",
    rating: 5,
  },
  {
    name: "David Hong",
    role: "CEO",
    company: "NFT Seoul",
    content: "From zero to hero in the Korean NFT space. CryptoBridge made our launch a massive success with their comprehensive approach.",
    rating: 5,
  },
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

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Get visible testimonials (3 at a time on desktop)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ ...testimonials[index], originalIndex: index });
    }
    return visible;
  };

  return (
    <section 
      ref={ref} 
      className="py-32 px-4 bg-[hsl(40,20%,96%)] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="text-xs font-medium text-primary mb-4 block tracking-widest uppercase">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(0,0%,10%)]">
              What Our <span className="text-primary">Clients Say</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            {/* Progress Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-primary' 
                      : 'bg-[hsl(0,0%,70%)] hover:bg-[hsl(0,0%,50%)]'
                  }`}
                />
              ))}
            </div>

            {/* Arrow Controls */}
            <div className="flex items-center gap-2">
              <button 
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-[hsl(0,0%,80%)] flex items-center justify-center text-[hsl(0,0%,40%)] hover:text-[hsl(0,0%,10%)] hover:border-[hsl(0,0%,60%)] transition-all hover:bg-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-[hsl(0,0%,80%)] flex items-center justify-center text-[hsl(0,0%,40%)] hover:text-[hsl(0,0%,10%)] hover:border-[hsl(0,0%,60%)] transition-all hover:bg-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid md:grid-cols-3 gap-6">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={`${testimonial.originalIndex}-${currentIndex}`}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-primary/20 mb-6" />
                
                {/* Content */}
                <p className="text-[hsl(0,0%,30%)] leading-relaxed mb-8 text-lg">
                  "{testimonial.content}"
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-primary font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-[hsl(0,0%,10%)]">{testimonial.name}</div>
                    <div className="text-sm text-[hsl(0,0%,50%)]">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-play indicator */}
        <div className={`mt-8 flex justify-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-xs text-[hsl(0,0%,60%)]">
            {isAutoPlaying ? 'Auto-playing • Hover to pause' : 'Paused'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;