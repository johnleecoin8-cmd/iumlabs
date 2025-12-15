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
  return;
};
export default TestimonialsSection;