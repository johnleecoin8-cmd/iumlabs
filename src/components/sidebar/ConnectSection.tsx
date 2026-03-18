import { Send, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { brand } from "@/config/content";

interface ConnectSectionProps {
  isCollapsed: boolean;
}

const connectLinks = [
  {
    icon: Mail,
    label: brand.email,
    href: `mailto:${brand.email}`,
    external: false,
  },
  {
    icon: Send,
    label: "@iumlabs",
    href: brand.telegramLink,
    external: true,
  },
  {
    icon: Linkedin,
    label: "ium Labs",
    href: brand.linkedin,
    external: true,
  },
];

const ConnectSection = ({ isCollapsed }: ConnectSectionProps) => {
  return (
    <>
      {isCollapsed ? (
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {connectLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/35 hover:text-primary hover:bg-white/[0.08] hover:border-primary/20 transition-all duration-200"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              title={link.label}
            >
              <link.icon className="w-4 h-4" />
            </motion.a>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="space-y-1.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase block mb-2">
            Connect
          </span>
          {connectLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 px-2.5 py-2 rounded-md text-white/50 hover:text-primary hover:bg-white/[0.05] transition-colors"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <link.icon className="w-3.5 h-3.5" />
              <span className="text-xs">{link.label}</span>
            </motion.a>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default ConnectSection;
