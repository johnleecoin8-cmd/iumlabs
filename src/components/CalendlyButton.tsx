import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CalendlyButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  calendlyUrl?: string;
}

const CalendlyButton = ({ 
  variant = "default", 
  size = "default",
  className = "",
  calendlyUrl = "https://calendly.com" // Replace with actual Calendly URL
}: CalendlyButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Calendar className="w-4 h-4 mr-2" />
          Book Free Consultation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[700px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Book Free Consultation</DialogTitle>
        </DialogHeader>
        <div className="flex-1 p-6">
          {/* Calendly placeholder - replace with actual embed */}
          <div className="w-full h-full bg-muted/50 rounded-lg flex flex-col items-center justify-center text-center p-8">
            <Calendar className="w-16 h-16 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Calendly Integration Coming Soon</h3>
            <p className="text-muted-foreground mb-6">
              Once you set a Calendly URL, the booking calendar will appear here.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>For now, please book via:</p>
              <div className="flex gap-4 justify-center mt-4">
                <a 
                  href="mailto:team@cryptobridge.kr" 
                  className="text-primary hover:underline"
                >
                  Email Us
                </a>
                <a 
                  href="https://t.me/cryptobridge_kr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Telegram
                </a>
              </div>
            </div>
            {/* 
              실제 Calendly 연동 시 아래 코드 사용:
              <iframe 
                src={`${calendlyUrl}?hide_gdpr_banner=1`}
                width="100%" 
                height="100%" 
                frameBorder="0"
              />
            */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendlyButton;
