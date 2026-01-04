import { useState, useEffect, useRef } from "react";

type ScrollDirection = "up" | "down" | null;

interface UseScrollDirectionOptions {
  threshold?: number;
  initialVisible?: boolean;
}

export const useScrollDirection = ({
  threshold = 10,
  initialVisible = true,
}: UseScrollDirectionOptions = {}) => {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const diff = scrollY - lastScrollY.current;

      if (Math.abs(diff) < threshold) {
        ticking.current = false;
        return;
      }

      const direction = diff > 0 ? "down" : "up";
      setScrollDirection(direction);
      setIsVisible(direction === "up" || scrollY < 100);
      lastScrollY.current = scrollY;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return { isVisible, scrollDirection };
};
