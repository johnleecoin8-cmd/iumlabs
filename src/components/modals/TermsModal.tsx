import { X, ArrowLeft } from "lucide-react";

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
                <span className="text-foreground text-sm mr-8">terms of service</span>
                <span className="text-primary text-sm mr-8">legal agreement</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 container mx-auto px-6 py-12 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Terms of Service
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

export default TermsModal;
