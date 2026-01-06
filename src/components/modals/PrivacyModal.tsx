import { X, ArrowLeft } from "lucide-react";

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
  { title: "6. Your Rights", content: "You have the right to access, correct, or delete your personal information. Contact us at info@iumlabs.com for any privacy-related requests." },
];

const PrivacyModal = ({ isOpen, onClose }: PrivacyModalProps) => {
  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-500 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
    >
      {/* Background blur overlay */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 z-10 flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back</span>
        </button>

        {/* Marquee Header */}
        <div className="bg-muted/30 py-3 overflow-hidden border-b border-border/30 mt-14">
          <div className="flex animate-marquee whitespace-nowrap">
            {Array(10).fill(null).map((_, i) => (
              <div key={i} className="flex items-center mx-4">
                <span className="text-foreground text-sm mr-8">privacy policy</span>
                <span className="text-primary text-sm mr-8">data protection</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 container mx-auto px-6 py-12 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-10">
              Last updated: January 2025
            </p>
            
            <div className="space-y-4">
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="p-6 rounded-xl border border-border hover:border-border/80 transition-all duration-300 hover:bg-muted/5"
                >
                  <h2 className="text-lg font-semibold text-foreground mb-3">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-muted/50 hover:bg-muted transition-colors flex items-center justify-center"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default PrivacyModal;
