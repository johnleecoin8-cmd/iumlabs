import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Send, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import CalendlyButton from "@/components/CalendlyButton";

const budgetOptions = [
  { value: "5k-15k", label: "$5K - $15K" },
  { value: "15k-30k", label: "$15K - $30K" },
  { value: "30k+", label: "$30K+" },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: brand.email, link: `mailto:${brand.email}` },
  { icon: Phone, label: "Phone", value: brand.phone, link: `tel:${brand.phone.replace(/\s/g, '')}` },
  { icon: Send, label: "Telegram", value: brand.telegram, link: brand.telegramLink },
  { icon: MapPin, label: "Office", value: brand.address, link: "#" },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - What */}
            <div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-foreground mb-8">
                Contact
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Tell us about your project and we'll explain how we can help you succeed in Korea.
              </p>
              <CalendlyButton 
                variant="outline" 
                className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                [ book a meeting ]
              </CalendlyButton>
            </div>

            {/* Right - Info */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Reach Us
              </h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a 
                    key={info.label}
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center justify-between py-4 border-b border-dashed border-border/50 group hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <info.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">{info.label}</span>
                    </div>
                    <span className="text-sm text-foreground">{info.value}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 border-t border-border/30">
        <div className="container mx-auto max-w-3xl">
          <div className="p-8 rounded-2xl bg-card/50 border border-border/50">
            <div className="mb-8">
              <span className="text-sm font-mono text-primary mb-2 block">[ send a message ]</span>
              <h2 className="text-2xl font-bold text-foreground">Tell us about your project</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Name *</label>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="rounded-lg bg-background border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Email *</label>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="rounded-lg bg-background border-border/50 focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Company</label>
                  <Input
                    placeholder="Your company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="rounded-lg bg-background border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Website</label>
                  <Input
                    placeholder="https://..."
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="rounded-lg bg-background border-border/50 focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Tell us about your project</label>
                <Textarea
                  placeholder="What are you building? What are your goals for the Korean market?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="rounded-lg bg-background border-border/50 focus:border-primary resize-none"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-3">Estimated Budget</label>
                <RadioGroup
                  value={formData.budget}
                  onValueChange={(value) => setFormData({ ...formData, budget: value })}
                  className="flex flex-wrap gap-4"
                >
                  {budgetOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} className="border-border" />
                      <Label htmlFor={option.value} className="text-sm cursor-pointer text-muted-foreground">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full rounded-full bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;