import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Send, Calendar, ArrowUpRight, Users, Globe, Megaphone, Shield, Check, Star, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import CalendlyButton from "@/components/CalendlyButton";
import Planet3D from "@/components/Planet3D";
import marsSurface from "@/assets/backgrounds/mars-surface.jpg";
import seoulSkyline from "@/assets/seoul-skyline.jpg";

// Import client logos
import bnbLogo from "@/assets/logos/bnb.svg";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import peaqLogo from "@/assets/logos/peaq.png";

const budgetOptions = [
  "$15,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 +",
  "Looking to raise funds",
];

const contactDetails = [
  { label: "office:", value: brand.address },
  { label: "e-mail:", value: brand.email, link: `mailto:${brand.email}` },
  { label: "telegram:", value: brand.telegram, link: brand.telegramLink },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: brand.email, link: `mailto:${brand.email}` },
  { icon: Phone, label: "Phone", value: brand.phone, link: `tel:${brand.phone.replace(/\s/g, '')}` },
  { icon: Send, label: "Telegram", value: brand.telegram, link: brand.telegramLink },
  { icon: MapPin, label: "Office", value: brand.address, link: "#" },
];

const trustLogos = [
  { src: bnbLogo, alt: "BNB Chain" },
  { src: kucoinLogo, alt: "KuCoin" },
  { src: polygonLogo, alt: "Polygon" },
  { src: peaqLogo, alt: "Peaq" },
];

const benefits = [
  "Free 30-min strategy consultation",
  "Custom market entry roadmap",
  "Access to 50+ Korean KOLs",
  "24-hour response guarantee",
];

const stats = [
  { value: "50+", label: "Projects Launched" },
  { value: "100M+", label: "Reach in Korea" },
  { value: "95%", label: "Client Retention" },
];

const serviceHighlights = [
  { 
    icon: Globe, 
    title: "Korean Market Entry", 
    description: "Strategic guidance for entering and thriving in the Korean Web3 ecosystem" 
  },
  { 
    icon: Users, 
    title: "Community Growth", 
    description: "Build and engage a loyal Korean community for your project" 
  },
  { 
    icon: Megaphone, 
    title: "KOL Marketing", 
    description: "Connect with top Korean influencers and thought leaders" 
  },
  { 
    icon: Shield, 
    title: "VASP Compliance", 
    description: "Navigate Korean regulations with our compliance expertise" 
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [scrollY, setScrollY] = useState(0);
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.15 });
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
      
      {/* Hero - Full Screen CTA */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-kenburns"
            style={{ 
              backgroundImage: `url(${marsSurface})`,
              filter: "brightness(0.5) saturate(1.2)",
            }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background/60 to-background" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          {/* 3D Planet */}
          <Planet3D type="mars" className="opacity-40" />
        </div>

        {/* Main CTA Content */}
        <div className="container mx-auto max-w-6xl px-4 relative z-10 pt-24 pb-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - CTA Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                <Zap className="w-4 h-4" />
                <span>Free Strategy Consultation</span>
              </div>
              
              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                Ready to
                <br />
                <span className="serif-italic text-primary">Conquer</span>
                <br />
                Korea?
              </h1>
              
              {/* Subtext */}
              <p className="text-lg text-white/60 mb-8 max-w-md opacity-0 animate-fade-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                Join 50+ successful Web3 projects that have launched in Korea with our expert guidance. Get your personalized market entry strategy today.
              </p>
              
              {/* Benefits List */}
              <div className="space-y-2 mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-white/70 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                <CalendlyButton className="group relative bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Book Free Consultation
                  </span>
                </CalendlyButton>
                <a
                  href={brand.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all"
                >
                  <Send className="w-4 h-4" />
                  Chat on Telegram
                </a>
              </div>
              
              {/* Trust Logos */}
              <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-4">Trusted by leading projects</p>
                <div className="flex items-center gap-6">
                  {trustLogos.map((logo, index) => (
                    <img
                      key={index}
                      src={logo.src}
                      alt={logo.alt}
                      className="h-6 opacity-50 hover:opacity-80 transition-opacity brightness-0 invert"
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right - Quick Contact Card */}
            <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-white/60 text-sm">Usually responds within 2 hours</span>
                </div>
                
                <h3 className="text-xl font-light text-white mb-1">Quick Contact</h3>
                <p className="text-white/50 text-sm mb-5">Reach out directly or fill the form below</p>
                
                <div className="space-y-3">
                  {contactInfo.map((info, index) => (
                    <a 
                      key={info.label}
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <info.icon className="w-5 h-5 text-primary" />
                        <span className="text-white/70 text-sm">{info.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white truncate max-w-[150px]">{info.value}</span>
                        <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-primary transition-colors" />
                      </div>
                    </a>
                  ))}
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-light text-primary">{stat.value}</div>
                      <div className="text-xs text-white/40">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
          <span className="text-xs uppercase tracking-widest">Send us a message</span>
        </div>
      </section>

      {/* Services Highlight Section */}
      <section 
        ref={servicesRef as React.RefObject<HTMLElement>}
        className="bg-[hsl(0,0%,6%)] py-14 px-4 border-y border-white/5"
      >
        <div className="container mx-auto max-w-6xl">
          <div className={`text-center mb-8 transition-all duration-700 ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-sm text-white/40 mb-3 block">[ Our Services ]</span>
            <h2 className="text-3xl md:text-4xl font-light text-white">
              How we can <span className="serif-italic text-primary">help</span>
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceHighlights.map((service, index) => (
              <div 
                key={index}
                className={`group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 overflow-hidden transition-all duration-500 ${
                  servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-500/10 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <service.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-medium text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors duration-300">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section 
        ref={formRef as React.RefObject<HTMLElement>}
        className="bg-background py-16 px-4"
      >
        <div className="container mx-auto max-w-6xl">
          {/* Section Header */}
          <div className={`text-center mb-10 transition-all duration-700 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-sm text-white/40 mb-3 block">[ Get Started ]</span>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Tell us about your <span className="serif-italic text-primary">project</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours with a customized proposal.
            </p>
          </div>
          
          <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 transition-all duration-700 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Left Column - Image & Contact Info */}
            <div 
              className="space-y-8 transition-all duration-700"
              style={{ transitionDelay: '150ms' }}
            >
              {/* Seoul Skyline Image */}
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img 
                  src={seoulSkyline} 
                  alt="Seoul Skyline" 
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
              
              {/* Contact Details */}
              <div className="space-y-6 p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-medium text-white">Contact Information</h3>
                {contactDetails.map((detail, index) => (
                  <div 
                    key={index}
                    className={`transition-all duration-500 ${formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                    style={{ transitionDelay: `${index * 100 + 300}ms` }}
                  >
                    <span className="text-sm text-white/40 block mb-1">{detail.label}</span>
                    {detail.link ? (
                      <a 
                        href={detail.link}
                        target={detail.link.startsWith('http') ? '_blank' : undefined}
                        rel={detail.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-white hover:text-primary transition-colors"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-white">{detail.value}</p>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Quick CTA */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-white font-medium">Prefer to talk directly?</span>
                </div>
                <p className="text-white/60 text-sm mb-4">
                  Skip the form and schedule a video call with our team.
                </p>
                <CalendlyButton className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-medium transition-all text-center">
                  Schedule a Call
                </CalendlyButton>
              </div>
            </div>

            {/* Right Column - Form */}
            <div 
              className={`transition-all duration-700 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-white/5 border border-white/10">
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Name *</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">E-mail *</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Company Name & Website Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Company Name</label>
                    <input
                      type="text"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Company Website</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Estimated Budget */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-4">Estimated Budget</label>
                  <div className="grid grid-cols-2 gap-3">
                    {budgetOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: option })}
                        className={`px-4 py-3 rounded-xl text-sm border transition-all text-center ${
                          formData.budget === option
                            ? 'bg-primary/20 border-primary text-white'
                            : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Tell Us About Your Project</label>
                  <textarea
                    placeholder="Describe your project and goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-medium transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
                
                <p className="text-center text-white/40 text-xs">
                  We'll respond within 24 hours. Your information is safe with us.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;