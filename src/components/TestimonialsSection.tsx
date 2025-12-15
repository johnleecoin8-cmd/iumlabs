import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
const testimonials = [{
  name: "Alex Chen",
  role: "CEO",
  company: "MetaVerse Korea",
  content: "CryptoBridge helped us raise $12M and build a community of 50K+ members in just 3 months. Their understanding of the Korean market is unmatched.",
  rating: 5
}, {
  name: "Sarah Kim",
  role: "Founder",
  company: "KimchiSwap",
  content: "The team's DeFi expertise and KOL network helped us achieve $100M TVL within the first month of launch. Highly recommend!",
  rating: 5
}, {
  name: "Michael Park",
  role: "CMO",
  company: "Seoul DAO",
  content: "Professional, responsive, and results-driven. They know exactly how to position Web3 projects for the Korean audience.",
  rating: 5
}, {
  name: "Jennifer Lee",
  role: "Head of Marketing",
  company: "ChainLink Korea",
  content: "Their network of Korean crypto influencers is incredible. We saw 300% increase in Korean community engagement within weeks.",
  rating: 5
}, {
  name: "David Hong",
  role: "CEO",
  company: "NFT Seoul",
  content: "From zero to hero in the Korean NFT space. CryptoBridge made our launch a massive success with their comprehensive approach.",
  rating: 5
}];
const TestimonialsSection = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  }, []);
  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({
        ...testimonials[index],
        originalIndex: index
      });
    }
    return visible;
  };
  return (
    <div ref={ref} className="relative bg-[#F5F2ED] py-[20px] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={`${testimonial.originalIndex}-${currentIndex}`}
                className={`group p-6 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:border-primary/40 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                
                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-gray-500 text-xs">{testimonial.role} at {testimonial.company}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-primary w-6' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TestimonialsSection;