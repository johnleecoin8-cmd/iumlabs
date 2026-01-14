import { useState } from "react";
import { MessageCircle, X, Send, Calendar, Mail } from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isVisible
  } = useScrollDirection({
    threshold: 15
  });
  const contactOptions = [{
    icon: Calendar,
    label: "Free 30-min Call",
    href: "https://calendly.com/iumlabs/30min",
    color: "bg-primary"
  }, {
    icon: Send,
    label: "Telegram",
    href: "https://t.me/iumlabs",
    color: "bg-[#0088cc]"
  }, {
    icon: Mail,
    label: "Email Us",
    href: "mailto:info@iumlabs.io",
    color: "bg-emerald-500"
  }];
  return <div className={`fixed bottom-[max(1rem,calc(env(safe-area-inset-bottom)+0.5rem))] right-[max(1rem,calc(env(safe-area-inset-right)+0.5rem))] sm:bottom-[max(1.5rem,calc(env(safe-area-inset-bottom)+1rem))] sm:right-[max(1.5rem,calc(env(safe-area-inset-right)+1rem))] z-50 flex flex-col items-end gap-3 transition-all duration-300 ${isVisible || isOpen ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"}`}>
      {isOpen && <div className="flex flex-col gap-2 animate-fade-in">
          {contactOptions.map((option, index) => <a key={option.label} href={option.href} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 px-5 py-4 sm:px-4 sm:py-3 rounded-full ${option.color} text-white shadow-lg hover:scale-105 active:scale-95 transition-transform min-h-[48px]`} style={{
        animationDelay: `${index * 50}ms`
      }}>
              <option.icon className="h-5 w-5" />
              <span className="text-sm font-medium whitespace-nowrap">{option.label}</span>
            </a>)}
        </div>}

      
    </div>;
};
export default FloatingContactButton;