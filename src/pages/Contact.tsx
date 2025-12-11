import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Calendar, ArrowUpRight, Clock, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import CalendlyButton from "@/components/CalendlyButton";
import Planet3D from "@/components/Planet3D";
import TeamContactCard from "@/components/TeamContactCard";
import marsSurface from "@/assets/backgrounds/mars-surface.jpg";

const budgetOptions = [
  "< $5K",
  "$5K - $15K",
  "$15K - $30K",
  "$30K - $50K",
  "$50K+",
];

const floatingTags = [
  { label: "Let's Connect", top: "20%", left: "6%", mobileTop: "12%", mobileLeft: "3%", color: "bg-red-400 text-white" },
  { label: "24/7 Support", top: "30%", left: "22%", mobileTop: "15%", mobileRight: "3%", color: "bg-orange-400 text-black" },
  { label: "Seoul Office", top: "48%", left: "4%", mobileTop: "75%", mobileLeft: "3%", color: "bg-amber-400 text-black" },
  { label: "Fast Response", top: "52%", left: "26%", color: "bg-red-500 text-white" },
  { label: "Global Reach", top: "18%", right: "12%", color: "bg-orange-300 text-black" },
  { label: "Partnership", top: "32%", right: "5%", color: "bg-rose-400 text-white" },
  { label: "Consultation", top: "50%", right: "10%", color: "bg-amber-500 text-black" },
  { label: "Get Started", bottom: "25%", right: "18%", color: "bg-red-300 text-black" },
];

const teamMembers = [
  {
    name: "James",
    role: "Co-Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    telegram: "https://t.me/cryptobridgekorea",
    linkedin: "https://www.linkedin.com/in/james-l-13a998251/",
    email: "james@cryptobridgekorea.com",
  },
  {
    name: "David",
    role: "Co-Founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    telegram: "https://t.me/cryptobridgekorea",
    linkedin: "https://www.linkedin.com/company/cryptobridge",
    email: "david@cryptobridgekorea.com",
  },
];

const Contact = () => {
  const { toast } = useToast();
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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      supabase.functions.invoke('send-contact-notification', {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          budget: formData.budget,
          message: formData.message,
        },
      }).catch(console.error);

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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero - Full Screen with Ken Burns Background */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background - Mars Surface */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-kenburns"
            style={{ 
              backgroundImage: `url(${marsSurface})`,
              filter: "brightness(0.6) saturate(1.3)",
            }}
          />
          
          {/* Aurora light overlay */}
          <div className="absolute inset-0 animate-aurora">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 via-transparent to-orange-500/20" />
            <div className="absolute inset-0 bg-gradient-to-bl from-rose-600/25 via-transparent to-amber-500/15" />
          </div>
          
          {/* Light sweep effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent animate-light-sweep" />
          </div>
          
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.9)]" />
          
          {/* 3D Planet */}
          <Planet3D type="mars" className="opacity-60" />
        </div>
        
        {/* Floating Tags */}
        <div>
          {floatingTags.map((tag, index) => (
            <span
              key={`${tag.label}-${index}`}
              className={`absolute animate-float hidden sm:block px-4 py-2 rounded-md text-sm font-medium shadow-lg ${tag.color}`}
              style={{
                top: tag.top,
                left: tag.left,
                right: tag.right,
                bottom: tag.bottom,
                animationDelay: `${index * 0.3}s`,
                transform: `translateY(${scrollY * 0.05}px)`,
              }}
            >
              {tag.label}
            </span>
          ))}
          {floatingTags.slice(0, 4).map((tag, index) => (
            <span
              key={`mobile-${tag.label}-${index}`}
              className={`absolute animate-float sm:hidden px-3 py-1.5 rounded-md text-xs font-medium shadow-lg ${tag.color}`}
              style={{
                top: tag.mobileTop,
                left: tag.mobileLeft,
                right: tag.mobileRight,
                animationDelay: `${index * 0.3}s`,
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-7xl px-4 relative z-10 pt-32 pb-24">
          <div className="mb-16">
            <span className="text-sm text-white/50 mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>[ Contact ]</span>
            <h1 className="text-[12vw] md:text-[150px] lg:text-[180px] font-light text-white leading-[0.85] tracking-tight opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Let's <span className="serif-italic text-primary">Talk</span>
            </h1>
          </div>
          
          <div className="pt-8 border-t border-white/10 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <p className="text-lg text-white/60 max-w-2xl">
              We work closely with founders to accelerate their growth in the Korean market. 
              Reach out directly to our team or fill out the form below.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* Contact Section - 2 Column Layout */}
      <section className="section-mars-dark py-24 px-4">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column - Team & Info */}
            <div className="space-y-10">
              {/* Team Contact Cards */}
              <div>
                <span className="text-white/40 text-sm font-mono mb-6 block">[ Direct Contact ]</span>
                <h2 className="text-3xl font-light text-white mb-8">
                  Talk directly with our <span className="serif-italic text-primary">founders</span>
                </h2>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <TeamContactCard key={member.name} {...member} />
                  ))}
                </div>
              </div>

              {/* Open Hours */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="text-white font-medium">Open Hours</h3>
                </div>
                <div className="space-y-2 text-white/60">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-white">9:00 AM - 6:00 PM KST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday - Sunday</span>
                    <span className="text-white/40">Closed</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <Globe className="w-4 h-4" />
                    <span>Seoul, South Korea (GMT+9)</span>
                  </div>
                </div>
              </div>

              {/* Office Info */}
              <div className="space-y-4">
                <span className="text-white/40 text-sm font-mono block">[ Office ]</span>
                <a 
                  href="https://maps.google.com/?q=11B+Gangnam-daero+373+Gangnam+Seoul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white">{brand.address}</p>
                    <span className="text-sm text-white/40 group-hover:text-primary transition-colors">View on Map →</span>
                  </div>
                </a>
              </div>

              {/* Prefer Not to Fill Form */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6">
                <h3 className="text-white font-medium mb-4">Prefer not to fill out a form?</h3>
                <div className="space-y-3">
                  <a 
                    href={`mailto:${brand.email}`}
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 text-primary" />
                    <span>{brand.email}</span>
                  </a>
                  <a 
                    href={brand.telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                  >
                    <Send className="w-4 h-4 text-primary" />
                    <span>{brand.telegram}</span>
                  </a>
                  <a 
                    href={`tel:${brand.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-primary" />
                    <span>{brand.phone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10">
                <div className="mb-8">
                  <span className="text-white/40 text-sm font-mono mb-4 block">[ Contact Form ]</span>
                  <h2 className="text-3xl font-light text-white">
                    Tell us about your <span className="serif-italic text-primary">project</span>
                  </h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/50 mb-2">Name *</label>
                      <Input
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="rounded-xl bg-white/5 border-white/10 focus:border-primary text-white placeholder:text-white/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/50 mb-2">Email *</label>
                      <Input
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="rounded-xl bg-white/5 border-white/10 focus:border-primary text-white placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/50 mb-2">Company</label>
                      <Input
                        placeholder="Your company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="rounded-xl bg-white/5 border-white/10 focus:border-primary text-white placeholder:text-white/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/50 mb-2">Website</label>
                      <Input
                        placeholder="https://yourproject.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="rounded-xl bg-white/5 border-white/10 focus:border-primary text-white placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/50 mb-3">Budget Range</label>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: option })}
                          className={`px-4 py-2 rounded-full text-sm border transition-all ${
                            formData.budget === option
                              ? 'bg-primary text-white border-primary'
                              : 'bg-transparent border-white/20 text-white/70 hover:border-primary hover:text-white'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/50 mb-2">Project Description *</label>
                    <Textarea
                      placeholder="Tell us about your project, goals, and timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      required
                      className="rounded-xl bg-white/5 border-white/10 focus:border-primary resize-none text-white placeholder:text-white/30"
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

                  <p className="text-center text-white/40 text-sm">
                    Or{" "}
                    <CalendlyButton className="text-primary hover:underline inline">
                      book a call directly
                    </CalendlyButton>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
