const footerLinks = {
  services: [
    { name: "Web3 Marketing", href: "#" },
    { name: "NFT Marketing", href: "#" },
    { name: "DeFi Marketing", href: "#" },
    { name: "Exchange Listing", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Case Studies", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="inline-block mb-4">
              <span className="text-xl font-semibold tracking-tight">
                CryptoBridge
              </span>
            </a>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Korea's leading Web3 marketing agency. We help blockchain projects 
              succeed with strategic marketing and deep local expertise.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-medium text-sm mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 CryptoBridge Korea
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
