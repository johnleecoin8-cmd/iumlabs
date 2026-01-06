import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sections = [
  { title: "1. Agreement to Terms", content: "By accessing and using ium Labs' services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services." },
  { title: "2. Services", content: "ium Labs provides Web3 marketing and consulting services including but not limited to Go-To-Market strategy, community management, influencer marketing, and PR services for blockchain and cryptocurrency projects." },
  { title: "3. User Responsibilities", content: "Users agree to provide accurate information when using our services and to comply with all applicable laws and regulations in their jurisdiction." },
  { title: "4. Intellectual Property", content: "All content, trademarks, and intellectual property on this website are owned by ium Labs unless otherwise stated." },
  { title: "5. Limitation of Liability", content: "ium Labs shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services." },
  { title: "6. Contact", content: "For questions about these Terms, please contact us at info@iumlabs.com." },
];

const TermsModal = ({ isOpen, onClose }: TermsModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
    >
      {/* Background blur overlay */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className={`relative w-full max-w-2xl max-h-[85vh] mx-4 bg-background border border-border rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${
        isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Last updated: January 2025
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {sections.map((section) => (
              <div
                key={section.title}
                className="p-5 rounded-xl border border-border hover:border-border/80 transition-all duration-300 hover:bg-muted/5"
              >
                <h2 className="text-base font-semibold text-foreground mb-2">{section.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TermsModal;
