import { Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

// Calendly 타입 선언
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

interface CalendlyButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  calendlyUrl?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const CalendlyButton = ({ 
  variant = "default", 
  size = "default",
  className = "",
  calendlyUrl = "https://calendly.com/iumlabs-info/30min",
  children,
  style
}: CalendlyButtonProps) => {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 이미 Calendly가 로드되어 있으면 바로 준비 완료
    if (window.Calendly) {
      setIsReady(true);
      setIsLoading(false);
      return;
    }

    // 이미 스크립트가 DOM에 추가되어 있는지 확인
    const existingScript = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]');
    
    if (existingScript) {
      // 이미 스크립트가 있으면 로드 완료 대기
      const checkCalendly = () => {
        if (window.Calendly) {
          setIsReady(true);
          setIsLoading(false);
        } else {
          setTimeout(checkCalendly, 100);
        }
      };
      checkCalendly();
      return;
    }

    // CSS 스타일시트 로드
    const existingLink = document.querySelector('link[href*="calendly.com/assets/external/widget.css"]');
    if (!existingLink) {
      const link = document.createElement('link');
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    // 새로 스크립트 로드
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
    script.onload = () => {
      setIsReady(true);
      setIsLoading(false);
    };
    
    script.onerror = () => {
      setIsLoading(false);
      console.error('Failed to load Calendly script');
    };
    
    document.body.appendChild(script);
    
    // 컴포넌트 언마운트 시 스크립트 제거하지 않음 (다른 버튼에서 재사용)
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    } else {
      // Fallback: 새 탭에서 열기
      window.open(calendlyUrl, '_blank');
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={className}
      style={style}
      onClick={openCalendly}
    >
      {children || (
        <>
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Calendar className="w-4 h-4 mr-2" />
          )}
          Book a Meeting
        </>
      )}
    </Button>
  );
};

export default CalendlyButton;
