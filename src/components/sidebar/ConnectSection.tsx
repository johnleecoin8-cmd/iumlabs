import { Send, Linkedin, Mail, Check, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { brand } from "@/config/content";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ConnectSectionProps {
  isCollapsed: boolean;
}

const connectLinks = [
  {
    icon: Send,
    label: "@iumlabs",
    href: brand.telegramLink,
    external: true,
    copyable: false,
  },
  {
    icon: Linkedin,
    label: "ium Labs",
    href: brand.linkedin,
    external: true,
    copyable: false,
  },
  {
    icon: Mail,
    label: brand.email,
    href: `mailto:${brand.email}`,
    external: false,
    copyable: true,
    copyValue: brand.email,
  },
  {
    icon: FileText,
    label: "Request Deck",
    href: "mailto:info@iumlabs.io?subject=Request%20for%20Korea%20Market%20Analysis%20Deck",
    external: false,
    copyable: false,
  },
];

const ConnectSection = ({ isCollapsed }: ConnectSectionProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleClick = (e: React.MouseEvent, link: typeof connectLinks[0], index: number) => {
    if (link.copyable && link.copyValue) {
      e.preventDefault();
      navigator.clipboard.writeText(link.copyValue);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  if (isCollapsed) {
    return (
      <motion.div 
        className="flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {connectLinks.map((link, index) => (
          <Tooltip key={link.href} delayDuration={0}>
            <TooltipTrigger asChild>
              <motion.a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={(e) => handleClick(e, link, index)}
                className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/35 hover:text-primary hover:bg-white/[0.08] hover:border-primary/20 transition-all duration-200"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {copiedIndex === index ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="icon"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <link.icon className="w-3.5 h-3.5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.a>
            </TooltipTrigger>
            <TooltipContent 
              side="right" 
              sideOffset={10}
              className="bg-black/90 backdrop-blur-xl text-white text-[10px] font-medium px-2.5 py-1.5 rounded-lg border border-white/10"
            >
              {copiedIndex === index ? "Copied!" : link.copyable ? "Click to copy" : link.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-1.5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-[9px] text-white/25 font-medium tracking-[0.15em] uppercase block mb-2 ml-1">
        Connect
      </span>
      {connectLinks.map((link, index) => (
        <motion.a 
          key={link.href}
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
          onClick={(e) => handleClick(e, link, index)}
          className="group flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.06] hover:border-primary/20 transition-all duration-200"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence mode="wait">
            {copiedIndex === index ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check className="w-3 h-3 text-emerald-400" />
              </motion.div>
            ) : (
              <motion.div
                key="icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <link.icon className="w-3 h-3 text-white/30 group-hover:text-primary transition-colors duration-200" />
              </motion.div>
            )}
          </AnimatePresence>
          <span className="text-[11px] text-white/40 group-hover:text-white/70 transition-colors duration-200 truncate">
            {copiedIndex === index ? "Copied!" : link.label}
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default ConnectSection;
