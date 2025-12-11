import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar, Mail, Send, MapPin } from "lucide-react";
import { brand } from "@/config/content";
import CalendlyButton from "./CalendlyButton";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import seoulBridgeNight from "@/assets/seoul-bridge-night.jpg";

const brandConfig = {
  email: brand.email,
  telegram: brand.telegramLink,
  linkedin: brand.linkedin,
  office: brand.address,
};

const budgetOptions = [
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 +",
  "Looking to raise funds",
];

const floatingTags = [
  { label: "30 min Free Call", top: "8%", left: "5%" },
  { label: "Flexible Scheduling", top: "15%", right: "8%" },
  { label: "Ask Us Anything", bottom: "20%", left: "3%" },
  { label: "Korean Market Entry", bottom: "12%", right: "5%" },
];

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name,
        email: formData.email,
        comments: `Company: ${formData.company}\nWebsite: ${formData.website}\nBudget: ${formData.budget}\n\nMessage: ${formData.message}`,
      });

      if (error) throw error;

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", company: "", website: "", message: "", budget: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={ref} className="py-24 px-4 flex-1 relative overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
      >
        <img 
          src={seoulBridgeNight}
          alt=""
          className="w-full h-[120%] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70" />
      </div>

      {/* Floating Tags */}
      {floatingTags.map((tag, index) => (
        <span
          key={tag.label}
          className="lunar-tag-dark absolute animate-float text-xs hidden lg:block z-10"
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
            bottom: tag.bottom,
            animationDelay: `${index * 0.5}s`,
          }}
        >
          {tag.label}
        </span>
      ))}

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-6 text-[hsl(var(--dark-fg))]">
            Start Your <span className="serif-italic">Journey</span>
            <br />
            Let's Talk <span className="serif-italic">Strategy</span>
          </h2>

          <p className="text-[hsl(var(--dark-fg))] opacity-60 text-lg max-w-xl">
            We'll get to the point. You explain what you're building and we'll explain how we'd support it.
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.2s' }}>
          {/* Left - Contact Info */}
          <div>
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 mb-12">
              <CalendlyButton className="lunar-btn text-base px-6 py-3 hover-glow">
                <Calendar className="w-5 h-5" />
                <span>Book a Meeting</span>
              </CalendlyButton>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-white/60" />
                </div>
                <div>
                  <p className="text-sm text-white/40 mb-1">e-mail</p>
                  <a href={`mailto:${brandConfig.email}`} className="text-white hover:text-primary transition-colors">
                    {brandConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Send className="w-4 h-4 text-white/60" />
                </div>
                <div>
                  <p className="text-sm text-white/40 mb-1">telegram</p>
                  <a href={brandConfig.telegram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
                    @cryptobridgekorea
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-white/60" />
                </div>
                <div>
                  <p className="text-sm text-white/40 mb-1">office</p>
                  <p className="text-white/80 text-sm">
                    {brandConfig.office}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-card/50 border border-border/50 rounded-2xl p-8 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">e-mail *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Company & Website Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Company name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your company"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Company website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://yoursite.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm text-white/60 mb-2">Tell us about your project *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="What's on your mind?"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Budget Options */}
              <div>
                <label className="block text-sm text-white/60 mb-3">Estimated Budget</label>
                <div className="flex flex-wrap gap-2">
                  {budgetOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: option })}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        formData.budget === option
                          ? "bg-primary text-primary-foreground"
                          : "bg-white/5 text-white/60 border border-white/10 hover:border-white/30"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="lunar-btn w-full text-base py-4 hover-glow disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              <p className="text-xs text-white/40 text-center">
                By submitting, I agree to CryptoBridge Korea's Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;