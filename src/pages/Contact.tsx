import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Calendar, ArrowUpRight, Users, Globe, Megaphone, Shield } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import CalendlyButton from "@/components/CalendlyButton";
import Planet3D from "@/components/Planet3D";
import marsSurface from "@/assets/backgrounds/mars-surface.jpg";
import seoulSkyline from "@/assets/seoul-skyline.jpg";

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

const serviceHighlights = [
  { 
    icon: Globe, 
    title: "DeFi Solutions", 
    description: "Strategic marketing for DeFi protocols entering the Korean market",
    link: "/services/defi"
  },
  { 
    icon: Users, 
    title: "NFT & Metaverse", 
    description: "Build and engage communities around your NFT and metaverse projects",
    link: "/services/nft"
  },
  { 
    icon: Megaphone, 
    title: "GameFi Marketing", 
    description: "Connect with Korean gamers and gaming communities",
    link: "/services/gamefi"
  },
  { 
    icon: Shield, 
    title: "All Services", 
    description: "Explore our full range of Web3 marketing services",
    link: "/services"
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
      // Save to database
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          comments: `Company: ${formData.company}\nWebsite: ${formData.website}\nBudget: ${formData.budget}\n\n${formData.message}`,
        });

      if (error) throw error;

      // Send email notification (don't block on this)
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
          
          {/* Aurora light overlay - Mars red/orange theme */}
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
        
        {/* Floating Tags with Parallax - Colorful */}
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

        {/* Content with Stagger Animation */}
        <div className="container mx-auto max-w-7xl px-4 relative z-10 pt-32 pb-24">
          <div className="mb-16">
            <span className="text-sm text-white/50 mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>[ Contact ]</span>
            <h1 className="text-[12vw] md:text-[150px] lg:text-[180px] font-light text-white leading-[0.85] tracking-tight opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Let's <span className="serif-italic text-primary">Talk</span>
            </h1>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 pt-8 border-t border-white/10 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            {/* Left - Description */}
            <div>
              <p className="text-lg text-white/60 mb-8">
                Tell us about your project and we'll explain how we can help you succeed in Korea.
              </p>
              <CalendlyButton className="lunar-btn">
                <Calendar className="w-4 h-4" />
                <span>Book a Meeting</span>
              </CalendlyButton>
            </div>

            {/* Right - Contact Links */}
            <div className="space-y-0">
              {contactInfo.map((info, index) => (
                <a 
                  key={info.label}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-between py-4 border-b border-white/10 group hover:border-white/30 transition-colors opacity-0 animate-fade-up"
                  style={{ animationDelay: `${0.5 + index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <div className="flex items-center gap-3">
                    <info.icon className="w-4 h-4 text-white/50" />
                    <span className="text-white/50 text-sm">{info.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white">{info.value}</span>
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* Services Highlight Section */}
      <section 
        ref={servicesRef as React.RefObject<HTMLElement>}
        className="bg-background/95 py-20 px-4 border-y border-white/5"
      >
        <div className="container mx-auto max-w-6xl">
          <div className={`text-center mb-12 transition-all duration-700 ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-sm text-white/40 mb-3 block">[ Our Services ]</span>
            <h2 className="text-3xl md:text-4xl font-light text-white">
              How we can <span className="serif-italic text-primary">help</span>
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceHighlights.map((service, index) => (
              <Link 
                key={index}
                to={service.link}
                className={`group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 overflow-hidden transition-all duration-500 ${
                  servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-500/10 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <service.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors duration-300">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section - Dark Theme 2-Column */}
      <section 
        ref={formRef as React.RefObject<HTMLElement>}
        className="bg-background py-24 px-4"
      >
        <div className="container mx-auto max-w-6xl">
          <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 transition-all duration-700 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Left Column - Image & Contact Info */}
            <div 
              className="space-y-8 transition-all duration-700"
              style={{ transitionDelay: '150ms' }}
            >
              {/* Seoul Skyline Image */}
              <div className="rounded-xl overflow-hidden">
                <img 
                  src={seoulSkyline} 
                  alt="Seoul Skyline" 
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
              
              {/* Contact Details */}
              <div className="space-y-6">
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
                        className="text-white text-lg hover:text-primary transition-colors"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-white text-lg">{detail.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Form */}
            <div 
              className={`transition-all duration-700 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">E-mail</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
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
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Company Website</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Estimated Budget */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-4">Estimated Budget</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {budgetOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: option })}
                        className={`px-4 py-3 rounded-lg text-sm border transition-all text-center ${
                          formData.budget === option
                            ? 'bg-white/10 border-primary text-white'
                            : 'bg-transparent border-white/20 text-white/60 hover:border-white/40 hover:text-white'
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
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
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