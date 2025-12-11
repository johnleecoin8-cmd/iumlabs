import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Calendar, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import CalendlyButton from "@/components/CalendlyButton";

const budgetOptions = [
  "$5K - $10K",
  "$10K - $25K",
  "$25K - $50K",
  "$50K+",
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
          comments: `Company: ${formData.company}\nBudget: ${formData.budget}\n\n${formData.message}`,
        });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", company: "", message: "", budget: "" });
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero - Dark Section */}
      <section className="section-dark pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <span className="number-badge text-[hsl(var(--dark-fg))] opacity-60 mb-4 inline-block">Contact</span>
              <h1 className="text-5xl md:text-7xl font-light text-[hsl(var(--dark-fg))] leading-tight mb-6">
                Let's <span className="serif-italic">Talk</span>
              </h1>
              <p className="text-lg text-[hsl(var(--dark-fg))] opacity-60 mb-8 max-w-lg">
                Tell us about your project and we'll explain how we can help you succeed in Korea.
              </p>
              <CalendlyButton className="lunar-btn">
                <Calendar className="w-4 h-4" />
                <span>Book a Meeting</span>
              </CalendlyButton>
            </div>

            {/* Right - Contact Info */}
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <a 
                  key={info.label}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-between py-4 border-b border-[hsl(var(--dark-fg))] opacity-20 group hover:opacity-40 transition-opacity"
                >
                  <div className="flex items-center gap-3">
                    <info.icon className="w-4 h-4 text-[hsl(var(--dark-fg))] opacity-60" />
                    <span className="text-[hsl(var(--dark-fg))] opacity-60">{info.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[hsl(var(--dark-fg))]">{info.value}</span>
                    <ArrowUpRight className="w-4 h-4 text-[hsl(var(--dark-fg))] opacity-0 group-hover:opacity-60 transition-opacity" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section - Light */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-card border border-border/50 rounded-2xl p-8 md:p-12">
            <div className="mb-8">
              <span className="number-badge mb-4 block">Send a Message</span>
              <h2 className="text-3xl font-light text-foreground">
                Tell us about your <span className="serif-italic">project</span>
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Name *</label>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="rounded-xl bg-background border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Email *</label>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="rounded-xl bg-background border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Company</label>
                <Input
                  placeholder="Your company or project"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="rounded-xl bg-background border-border/50 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-3">Budget Range</label>
                <div className="flex flex-wrap gap-2">
                  {budgetOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: option })}
                      className={`px-4 py-2 rounded-full text-sm border transition-all ${
                        formData.budget === option
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background border-border text-foreground hover:border-primary'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Message</label>
                <Textarea
                  placeholder="Tell us about your project and goals for the Korean market..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="rounded-xl bg-background border-border/50 focus:border-primary resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="lunar-btn w-full"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
