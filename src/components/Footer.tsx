import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { brand, navigation } from "@/config/content";

const brandConfig = {
  name: brand.name,
  email: brand.email,
  telegram: brand.telegramLink,
  linkedin: brand.linkedin,
  office: brand.address,
};

const navLinks = navigation.links.map(link => ({ to: link.href, label: link.name }));
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: 'Newsletter Subscriber',
          email,
          comments: 'Newsletter signup'
        });

      if (error) throw error;

      toast({
        title: "Subscribed!",
        description: "You've been added to our newsletter.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-background border-t border-border/30">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <span className="text-xl font-bold text-foreground">{brandConfig.name}</span>
              <span className="w-2 h-2 bg-primary rounded-sm"></span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md mb-8">
              Korea's leading Web3 marketing agency. We connect global blockchain projects 
              with the Korean crypto market through strategic marketing and community building.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-card border border-border rounded-full text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="lunar-btn text-sm px-6"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm text-muted-foreground uppercase tracking-wider mb-6">Navigation</h4>
            <nav className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-foreground hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm text-muted-foreground uppercase tracking-wider mb-6">Contact</h4>
            <div className="space-y-4 text-sm">
              <a 
                href={`mailto:${brandConfig.email}`}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <span>{brandConfig.email}</span>
              </a>
              <a 
                href={brandConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <span>Telegram</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a 
                href={brandConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <p className="text-muted-foreground pt-4">
                {brandConfig.office}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} {brandConfig.name}. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
