import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const location = useLocation();

  useEffect(() => {
    // Fade out
    setIsVisible(false);
    
    // After fade out, update children and fade in
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsVisible(true);
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    // Initial fade in
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`page-transition ${isVisible ? "page-visible" : "page-hidden"}`}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition;
