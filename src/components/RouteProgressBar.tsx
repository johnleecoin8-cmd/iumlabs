import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const RouteProgressBar = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname === prevPath.current) return;
    prevPath.current = location.pathname;

    // Start
    setVisible(true);
    setProgress(30);

    timeoutRef.current = setTimeout(() => setProgress(60), 100);
    const t2 = setTimeout(() => setProgress(80), 200);
    const t3 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    }, 400);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [location.pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[99999] h-[2px]">
      <div
        className="h-full bg-gradient-to-r from-emerald-300 to-emerald-400 transition-all ease-out"
        style={{
          width: `${progress}%`,
          transitionDuration: progress === 100 ? '200ms' : '400ms',
          opacity: progress === 100 ? 0 : 1,
        }}
      />
    </div>
  );
};

export default RouteProgressBar;
