import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sections = [
  { title: "1. Information We Collect", content: "We collect information you provide directly to us, including name, email address, company information, and project details when you contact us or use our services." },
  { title: "2. How We Use Your Information", content: "We use the information we collect to provide, maintain, and improve our services, communicate with you, and send you updates about our services." },
  { title: "3. Information Sharing", content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law." },
  { title: "4. Data Security", content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction." },
  { title: "5. Cookies", content: "We may use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser." },
  { title: "6. Your Rights", content: "You have the right to access, correct, or delete your personal information. Contact us at info@iumlabs.io for any privacy-related requests." },
];

const PrivacyModal = ({ isOpen, onClose }: PrivacyModalProps) => {
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
              Privacy Policy
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

export default PrivacyModal;
