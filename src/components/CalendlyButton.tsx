import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface CalendlyButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  calendlyUrl?: string;
  children?: React.ReactNode;
}

const CalendlyButton = ({ 
  variant = "default", 
  size = "default",
  className = "",
  calendlyUrl = "https://calendly.com/cryptobridgekorea/30min",
  children
}: CalendlyButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openCalendly = () => {
    // @ts-ignore - Calendly is loaded from external script
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    } else {
      // Fallback: open in new tab
      window.open(calendlyUrl, '_blank');
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={className}
      onClick={openCalendly}
    >
      {children || (
        <>
          <Calendar className="w-4 h-4 mr-2" />
          Book a Meeting
        </>
      )}
    </Button>
  );
};

export default CalendlyButton;