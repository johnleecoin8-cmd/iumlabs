import { useCallback, MouseEvent } from "react";

export const useRipple = () => {
  const createRipple = useCallback((event: MouseEvent<HTMLElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple = document.createElement("span");
    ripple.className = "ripple-effect";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    button.appendChild(ripple);
    
    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  }, []);

  return { createRipple };
};
