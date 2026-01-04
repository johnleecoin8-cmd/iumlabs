import React, { forwardRef, MouseEvent } from "react";
import { useRipple } from "@/hooks/useRipple";
import { cn } from "@/lib/utils";

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "dark" | "emerald" | "default";
  children: React.ReactNode;
}

export const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ variant = "dark", children, className, onClick, ...props }, ref) => {
    const { createRipple } = useRipple();

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      createRipple(e);
      onClick?.(e);
    };

    const variantClasses = {
      dark: "primary-cta-dark bg-foreground text-background",
      emerald: "primary-cta-emerald text-white",
      default: "primary-cta bg-secondary text-foreground",
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={cn(
          "relative overflow-hidden",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

RippleButton.displayName = "RippleButton";
