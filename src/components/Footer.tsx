import { Send, Twitter, MessageCircle, Github } from "lucide-react";

const footerLinks = {
  services: [
    { name: "Web3 Marketing", href: "#" },
    { name: "NFT Marketing", href: "#" },
    { name: "DeFi Marketing", href: "#" },
    { name: "GameFi Marketing", href: "#" },
    { name: "Exchange Listing", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Case Studies", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#" },
  ],
  social: [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Telegram", icon: Send, href: "#" },
    { name: "Discord", icon: MessageCircle, href: "#" },
    { name: "GitHub", icon: Github, href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-block mb-6">
              <span className="text-2xl font-display font-bold text-gradient">
                CRYPTOBRIDGE
              </span>
              <span className="text-xs font-display text-muted-foreground tracking-widest ml-2">
                KOREA
              </span>
            </a>
            <p className="text-muted-foreground max-w-md mb-6 leading-relaxed">
              Korea's leading Web3 marketing agency. We help blockchain projects 
              succeed in the Korean and global markets with comprehensive marketing 
              strategies and deep local expertise.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold uppercase tracking-wider text-sm mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold uppercase tracking-wider text-sm mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 CryptoBridge Korea. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
