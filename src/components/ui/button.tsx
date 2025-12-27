import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97]",
  {
    variants: {
      variant: {
        // Primary solid button - rounded-full for consistency
        default: "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5",
        // Solid white button
        filled: "rounded-full bg-foreground text-background hover:bg-foreground/90 hover:shadow-lg hover:shadow-foreground/20 hover:-translate-y-0.5",
        // Outline dark theme
        outline: "rounded-full border border-border bg-transparent text-foreground hover:bg-secondary hover:border-foreground/30 hover:-translate-y-0.5",
        // Outline light theme (for dark backgrounds)
        "outline-light": "rounded-full border border-foreground/20 bg-transparent text-foreground hover:bg-foreground/5 hover:border-foreground/40 hover:-translate-y-0.5",
        // Secondary muted
        secondary: "rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:-translate-y-0.5",
        // Ghost (no background)
        ghost: "rounded-full hover:bg-secondary hover:text-foreground",
        // Link style
        link: "text-primary underline-offset-4 hover:underline",
        // Glass effect
        glass: "rounded-full bg-card/50 backdrop-blur-sm border border-border/50 text-foreground hover:bg-card/70 hover:border-primary/30 hover:-translate-y-0.5",
        // Destructive
        destructive: "rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };