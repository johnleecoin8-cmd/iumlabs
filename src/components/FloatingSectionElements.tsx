import { ReactNode } from "react";

interface FloatingElement {
  type: "tag" | "icon" | "shape";
  content: string | ReactNode;
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  color: string;
  size?: "sm" | "md" | "lg";
  delay?: number;
}

interface FloatingSectionElementsProps {
  elements: FloatingElement[];
  scrollY?: number;
  parallaxMultiplier?: number;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

const FloatingSectionElements = ({
  elements,
  scrollY = 0,
  parallaxMultiplier = 0.02,
  className = "",
}: FloatingSectionElementsProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map((element, index) => {
        const delay = element.delay ?? index * 0.4;
        const size = element.size ?? "md";

        return (
          <div
            key={index}
            className="absolute animate-float-slow hidden sm:block"
            style={{
              ...element.position,
              animationDelay: `${delay}s`,
              transform: `translateY(${scrollY * parallaxMultiplier}px)`,
            }}
          >
            {element.type === "tag" && (
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border shadow-lg ${element.color}`}
                style={{
                  borderColor: "rgba(255, 255, 255, 0.15)",
                }}
              >
                {element.content}
              </span>
            )}

            {element.type === "icon" && (
              <div
                className={`${sizeClasses[size]} rounded-full flex items-center justify-center backdrop-blur-sm border shadow-lg ${element.color}`}
                style={{
                  borderColor: "rgba(255, 255, 255, 0.15)",
                }}
              >
                {element.content}
              </div>
            )}

            {element.type === "shape" && (
              <div
                className={`${sizeClasses[size]} flex items-center justify-center opacity-40`}
                style={{ color: element.color }}
              >
                {element.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FloatingSectionElements;
