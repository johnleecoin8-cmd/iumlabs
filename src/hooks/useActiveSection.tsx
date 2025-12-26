import { useState, useEffect, useRef } from 'react';

interface Section {
  id: string;
  number: string;
}

export const useActiveSection = (sections: Section[]) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.number || '01');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = sections.find(s => s.id === entry.target.id);
          if (section) {
            setActiveSection(section.number);
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    });

    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections]);

  return activeSection;
};

export default useActiveSection;
