import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CalendlyButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const CalendlyButton = ({ 
  variant = "default", 
  size = "default",
  className = "",
  children,
  style
}: CalendlyButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/contact");
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={className}
      style={style}
      onClick={handleClick}
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
