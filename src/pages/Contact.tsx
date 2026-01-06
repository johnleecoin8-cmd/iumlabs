import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABannerSection from "@/components/CTABannerSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import { Mail, MapPin, Send, Calendar, ArrowUpRight, ArrowRight, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import CalendlyButton from "@/components/CalendlyButton";
import { usePageMeta } from "@/hooks/usePageMeta";
const budgetOptions = ["$15,000 - $25,000", "$25,000 - $50,000", "$50,000 +", "Looking to raise funds"];
const contactInfo = [{
  icon: Mail,
  label: "Email",
  value: brand.email,
  link: `mailto:${brand.email}`
}, {
  icon: Send,
  label: "Telegram",
  value: brand.telegram,
  link: brand.telegramLink
}, {
  icon: Linkedin,
  label: "LinkedIn",
  value: "ium Labs",
  link: brand.linkedin
}];

// Floating tags similar to HeroSection
const floatingTags = [{
  label: "Free Consultation",
  position: "top-[15%] left-[5%]"
}, {
  label: "24h Response",
  position: "top-[35%] left-[4%]"
}, {
  label: "Korean Market Expert",
  position: "top-[18%] right-[6%]"
}, {
  label: "Global Partners",
  position: "top-[40%] right-[5%]"
}];
const mobileFloatingTags = [{
  label: "Free Consult",
  position: "top-[8%] left-[3%]"
}, {
  label: "24h Response",
  position: "top-[12%] right-[3%]"
}];
const Contact = () => {
  usePageMeta(
    "Contact Us",
    "Get in touch with ium labs for Korean Web3 marketing. Free consultation, 24h response. Seoul-based experts helping global projects succeed in Korea.",
    "/contact"
  );
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, [location.hash]);
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
    budget: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.from('contact_submissions').insert({
        name: formData.name,
        email: formData.email,
        comments: `Company: ${formData.company}\nWebsite: ${formData.website}\nBudget: ${formData.budget}\n\n${formData.message}`
      });
      if (error) throw error;
      supabase.functions.invoke('send-contact-notification', {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          budget: formData.budget,
          message: formData.message
        }
      }).catch(console.error);
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours."
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        website: "",
        message: "",
        budget: ""
      });
    } catch (error) {
      toast({
        title: "Failed to send",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero Section - Glassmorphism Style */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-[#0A0A0A]">
        <section className="relative min-h-[80vh] flex flex-col justify-center items-center overflow-hidden rounded-2xl sm:rounded-3xl">
          {/* Video Background */}
          <div className="absolute inset-0 overflow-hidden">
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{
            filter: "brightness(0.35)"
          }} onLoadedMetadata={e => {
            (e.target as HTMLVideoElement).currentTime = 0;
          }}>
              <source src="/videos/services-background.mp4" type="video/mp4" />
            </video>
            {/* Dark overlay gradient matching hero */}
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
          </div>

          {/* Floating Tags - Desktop */}
          {floatingTags.map((tag, index) => <div key={index} className={`absolute ${tag.position} hidden lg:block z-10`}>
              <span className="font-sans px-4 py-2 text-xs whitespace-nowrap rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/70 hover:bg-white/[0.06] hover:border-primary/40 hover:text-white transition-all duration-300">
                {tag.label}
              </span>
            </div>)}

          {/* Floating Tags - Mobile */}
          {mobileFloatingTags.map((tag, index) => <div key={`mobile-${index}`} className={`absolute ${tag.position} lg:hidden z-10`}>
              <span className="font-sans px-2 py-1 text-[10px] rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/60 whitespace-nowrap">
                {tag.label}
              </span>
            </div>)}

          {/* Main Content - Centered */}
          <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6 w-full">
            <div className="max-w-5xl mx-auto text-center">
              {/* Main Headline */}
              <h1 className="font-sans text-display-hero font-bold leading-[1.1] tracking-[-0.02em] mb-4 sm:mb-6">
                <span className="text-white">Let's Build</span>
                <br />
                <span className="text-white/90">Something </span>
                <span className="text-white">Great Together</span>
              </h1>

              {/* Subtext */}
              <p className="text-body-lg text-white/60 max-w-2xl mx-auto mb-6 font-light tracking-wide leading-relaxed">
                Tell us about your project and we'll explain how we can help you <span className="text-white font-medium">succeed in Korea</span>.
              </p>

              {/* CTA Button */}
              <div>
                <CalendlyButton className="group relative inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium text-sm rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5 min-h-[44px]">
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                  <Calendar className="w-4 h-4" />
                  <span>Book a Meeting</span>
                </CalendlyButton>
              </div>
            </div>
          </div>

          {/* Contact Info Cards - Bottom Section */}
          <div className="relative z-10 w-full border-t border-white/10 py-4 sm:py-6">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                {contactInfo.map(info => <a key={info.label} href={info.link} target={info.link.startsWith('http') ? '_blank' : undefined} rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="group flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 min-h-[44px]">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/50 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/40 text-[10px] uppercase tracking-wider">{info.label}</p>
                      <p className="text-white text-xs sm:text-sm font-medium truncate">{info.value}</p>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-white/20 group-hover:text-white transition-colors flex-shrink-0" />
                  </a>)}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Why Work With Us - Identity Section */}
      

      {/* Contact Form Section - Glassmorphism */}
      <section id="contact-form" className="bg-[#0A0A0A] py-12 md:py-[20px]">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-block px-4 py-2 text-xs rounded-full bg-white/[0.03] border border-white/[0.08] text-white/60 mb-4 sm:mb-6">
              Send a Message
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Start Your Project
            </h2>
            <p className="text-sm sm:text-base text-white/50 max-w-xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          {/* Glassmorphism Form Container */}
          <div className="relative p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm">
            {/* Subtle gradient glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.01] pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="relative space-y-6 sm:space-y-8">
              {/* Name & Email Row */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Name *</label>
                  <input type="text" placeholder="Your name" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} required className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Email *</label>
                  <input type="email" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} required className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all" />
                </div>
              </div>

              {/* Company Name & Website Row */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Company Name</label>
                  <input type="text" placeholder="Company name" value={formData.company} onChange={e => setFormData({
                  ...formData,
                  company: e.target.value
                })} className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Company Website</label>
                  <input type="url" placeholder="https://..." value={formData.website} onChange={e => setFormData({
                  ...formData,
                  website: e.target.value
                })} className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all" />
                </div>
              </div>

              {/* Estimated Budget */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/40 mb-3 sm:mb-4">Estimated Budget</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {budgetOptions.map(option => <button key={option} type="button" onClick={() => setFormData({
                  ...formData,
                  budget: option
                })} className={`px-3 py-3 sm:px-4 min-h-[44px] rounded-xl text-xs sm:text-sm border transition-all text-center hover:scale-[1.02] active:scale-[0.98] ${formData.budget === option ? 'bg-white/[0.1] border-white/30 text-white' : 'bg-white/[0.03] border-white/[0.08] text-white/60 hover:border-white/20 hover:bg-white/[0.05] hover:text-white'}`}>
                      {option}
                    </button>)}
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Tell Us About Your Project</label>
                <textarea placeholder="Describe your project and goals..." value={formData.message} onChange={e => setFormData({
                ...formData,
                message: e.target.value
              })} rows={4} className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all resize-none" />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button type="submit" disabled={isSubmitting} className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium text-sm rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50">
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>

          {/* Office Location Card */}
          <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-white/50" />
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Office</p>
              <p className="text-white font-medium">{brand.address}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABannerSection />
      
      {/* Footer Links */}
      <FooterLinksSection />

      <Footer />
    </div>;
};
export default Contact;