import { useEffect } from "react";

const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50px 0px",
      threshold: 0.15,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add staggered delay for children with data-stagger attribute
          const staggerDelay = entry.target.getAttribute('data-stagger');
          if (staggerDelay) {
            setTimeout(() => {
              entry.target.classList.add("is-visible");
            }, parseInt(staggerDelay) * 100);
          } else {
            entry.target.classList.add("is-visible");
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
};

export default useScrollReveal;
