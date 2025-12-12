import { useState } from "react";
import { MessageCircle, X, Send, Calendar, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: Send,
      label: "Telegram",
      href: "https://t.me/cryptobridgekorea",
      color: "bg-[#0088cc]"
    },
    {
      icon: Calendar,
      label: "Book Meeting",
      href: "https://calendly.com/cryptobridgekorea/30min",
      color: "bg-primary"
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:info@cryptobridgekorea.com",
      color: "bg-emerald-500"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2"
          >
            {contactOptions.map((option, index) => (
              <motion.a
                key={option.label}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-full ${option.color} text-white shadow-lg hover:scale-105 transition-transform`}
              >
                <option.icon className="h-5 w-5" />
                <span className="text-sm font-medium whitespace-nowrap">{option.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          isOpen ? "bg-muted-foreground" : "bg-primary"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingContactButton;
