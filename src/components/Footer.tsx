import { useState } from "react";
import { Link } from "react-router-dom";
import { Send, Linkedin, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brand, footer } from "@/config/content";

const budgetOptions = [
  { value: "5k-15k", label: "$5,000 - $15,000" },
  { value: "15k-30k", label: "$15,000 - $30,000" },
  { value: "30k+", label: "$30,000+" },
];

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          comments: `Company: ${formData.company}\nWebsite: ${formData.website}\nBudget: ${formData.budget}\n\n${formData.message}`,
        });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", company: "", website: "", message: "", budget: "" });
    } catch (error) {
      toast({
        title: "Failed to send",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Office Info */}
          <div>
            <div className="mb-12">
              <span className="text-xs text-muted-foreground uppercase tracking-wider mb-4 block">OFFICE</span>
              <Link to="/" className="inline-block mb-6">
                <span className="text-2xl font-bold text-foreground">
                  {brand.name}
                </span>
              </Link>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                {brand.address}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 mb-12">
              <a 
                href={`mailto:${brand.email}`}
                className="block text-foreground hover:text-primary transition-colors"
              >
                {brand.email}
              </a>
              <a 
                href={`tel:${brand.phone.replace(/\s/g, '')}`}
                className="block text-foreground hover:text-primary transition-colors"
              >
                {brand.phone}
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href={brand.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:bg-blue-100 hover:border-blue-200 transition-all"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={brand.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-blue-600 hover:bg-blue-100 hover:border-blue-200 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-6 block">CONTACT FORM</span>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-card border-border rounded-lg"
                />
                <Input
                  type="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-card border-border rounded-lg"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-card border-border rounded-lg"
                />
                <Input
                  placeholder="Website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="bg-card border-border rounded-lg"
                />
              </div>
              <Textarea
                placeholder="Tell us about your project"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="bg-card border-border rounded-lg resize-none"
              />

              {/* Budget Selection */}
              <div className="pt-2">
                <span className="text-sm text-muted-foreground mb-3 block">ESTIMATED BUDGET</span>
                <RadioGroup
                  value={formData.budget}
                  onValueChange={(value) => setFormData({ ...formData, budget: value })}
                  className="flex flex-wrap gap-4"
                >
                  {budgetOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="text-sm text-muted-foreground cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="rounded-full bg-primary hover:bg-primary/90 group mt-2 shadow-md"
              >
                {isSubmitting ? "Sending..." : "Submit"}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {brand.copyright}
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              {footer.legal.privacy}
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              {footer.legal.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
