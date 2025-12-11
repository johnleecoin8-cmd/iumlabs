import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Send, Calendar, Mail } from "lucide-react";
import { brand, navigation } from "@/config/content";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-lg md:text-xl font-bold tracking-tight text-foreground">
              {brand.name}
            </span>
          </Link>

          {/* Center - Email (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            <a href={`mailto:${brand.email}`} className="hover:text-foreground transition-colors">
              {brand.email}
            </a>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Live Chat - Telegram */}
            <a 
              href={brand.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Live Chat</span>
            </a>

            {/* Book a Meeting */}
            <Link to="/contact">
              <Button 
                size="sm" 
                className="hidden md:flex items-center gap-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Meeting</span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 md:top-20 bg-background z-40 animate-fade-in">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Navigation Links */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-6">Navigation</p>
                {navigation.links.map((link, index) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`block text-3xl md:text-5xl font-bold py-2 transition-colors hover:text-primary ${
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Get in Touch</p>
                  <a 
                    href={`mailto:${brand.email}`}
                    className="text-lg text-foreground hover:text-primary transition-colors"
                  >
                    {brand.email}
                  </a>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Telegram</p>
                  <a 
                    href={brand.telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-foreground hover:text-primary transition-colors"
                  >
                    {brand.telegram}
                  </a>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Office</p>
                  <p className="text-lg text-muted-foreground">
                    {brand.address}
                  </p>
                </div>

                {/* CTA in Menu */}
                <div className="pt-8">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    <Button 
                      size="lg" 
                      className="rounded-full bg-primary hover:bg-primary/90 px-8 shadow-lg"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book a Meeting
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
