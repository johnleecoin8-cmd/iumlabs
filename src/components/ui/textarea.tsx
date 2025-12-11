import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  error?: boolean;
  success?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, success, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base styles
          "flex min-h-[80px] w-full rounded-xl border bg-background px-4 py-3 text-base transition-all duration-200",
          // Ring and focus styles
          "ring-offset-background",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-0 focus-visible:border-primary",
          // Placeholder
          "placeholder:text-muted-foreground/60",
          // Disabled
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Hover
          "hover:border-primary/50",
          // Default border
          "border-input",
          // Error state
          error && "border-destructive focus-visible:ring-destructive/50 focus-visible:border-destructive",
          // Success state
          success && "border-green-500 focus-visible:ring-green-500/50 focus-visible:border-green-500",
          // Text size
          "md:text-sm",
          className,
        )}
        ref={ref}
        aria-invalid={error ? "true" : undefined}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
