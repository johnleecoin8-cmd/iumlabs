import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import FooterLinksSection from "@/components/FooterLinksSection";
import SEOHead from "@/components/SEOHead";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { Mail, MapPin, Send, Calendar, ArrowUpRight, ArrowRight, Linkedin, Clock, ExternalLink, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import CalendlyButton from "@/components/CalendlyButton";
import officeImage from "@/assets/office/ium-labs-office.webp";
import confetti from "canvas-confetti";
const budgetOptions = ["$15,000 - $25,000", "$25,000 - $50,000", "$50,000 +", "Looking to raise funds"];
const contactInfo = [{
  icon: Linkedin,
  label: "LinkedIn",
  value: "ium Labs",
  link: brand.linkedin
}, {
  icon: Send,
  label: "Telegram",
  value: brand.telegram,
  link: brand.telegramLink
}, {
  icon: Mail,
  label: "Email",
  value: brand.email,
  link: `mailto:${brand.email}`
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

import { useVideoPlayer } from "@/hooks/useVideoPlayer";

// Video component with poster fallback using useVideoPlayer hook
const ContactHeroVideo = () => {
  const {
    videoRef,
    isVideoReady,
    hasVideoError,
    shouldDisableVideo,
    videoProps,
    posterProps,
    ShimmerOverlay,
  } = useVideoPlayer({
    src: '/videos/contact-hero.mp4',
    poster: '/images/posters/contact-hero-poster.jpg',
    preload: window.innerWidth <= 768 ? 'none' : 'metadata',
    loadTimeout: 5000,
  });

  return (
    <>
      {/* Poster image shown while video loads */}
      <img
        {...posterProps}
        style={{ 
          ...posterProps.style,
          filter: "brightness(0.35)",
        }}
      />

      {/* Shimmer loading overlay */}
      <ShimmerOverlay />

      {!shouldDisableVideo && !hasVideoError && (
        <video
          ref={videoRef}
          {...videoProps}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            ...videoProps.style,
            filter: "brightness(0.35)",
          }}
        >
          <source src="/videos/contact-hero.mp4#t=0.001" type="video/mp4" />
        </video>
      )}
    </>
  );
};

const Contact = () => {
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
      const { error: notificationError } = await supabase.functions.invoke('send-contact-notification', {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          budget: formData.budget,
          message: formData.message
        }
      });

      if (notificationError) {
        throw notificationError;
      }
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
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
      <SEOHead
        title="Contact Korea's #1 Web3 & Crypto Marketing Agency | ium Labs"
        description="Let's build in Korea. Drop us a line and we respond within 24 hours with a full Korea entry plan. 25+ projects launched including BNB, Bybit, and Mantra."
        path="/contact"
        keywords={['Korea Web3', 'Korea Crypto', 'Korea Web3 Marketing', 'Korea Crypto Agency', 'Contact Web3 Agency Korea', 'Korea Market Consultation']}
      />
      <BreadcrumbSchema items={[{ name: "ium Labs", url: "https://iumlabs.io/" }, { name: "Contact", url: "https://iumlabs.io/contact" }]} />
      <Navbar />

      {/* Hero Section */}
      <main className="p-2 sm:p-3 md:p-4 bg-[#0A0A0A]">
        <section className="relative min-h-[70vh] sm:min-h-[80vh] flex flex-col justify-center items-center overflow-hidden rounded-2xl sm:rounded-3xl">
          <div className="absolute inset-0 overflow-hidden">
            <ContactHeroVideo />
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
          </div>

          <div className="flex-1 flex items-center justify-center relative z-10 px-5 sm:px-6 w-full">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="font-sans text-[clamp(1.75rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em] mb-3 sm:mb-8 mt-10 sm:mt-0 text-white sm:whitespace-nowrap">
                Let's Build in Korea
              </h1>

              <p className="text-[13px] sm:text-lg md:text-[22px] text-white/60 max-w-3xl mx-auto mb-5 sm:mb-8 font-light tracking-wide leading-relaxed">
                Drop us a line. We respond within 24 hours<br className="sm:hidden" /> with a full Korea entry plan.
              </p>

              <div className="mb-6 sm:mb-10">
                <CalendlyButton className="group relative inline-flex items-center gap-2.5 px-6 py-3 sm:px-8 sm:py-4 bg-white text-black font-semibold text-[13px] sm:text-sm rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5">
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                  <Calendar className="w-4 h-4" />
                  <span>Book a Meeting</span>
                </CalendlyButton>
              </div>

              <div className="flex items-center justify-center gap-3 sm:gap-6">
                {contactInfo.map(info => (
                  <a key={info.label} href={info.link} target={info.link.startsWith('http') ? '_blank' : undefined} rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="group flex items-center gap-1.5 text-white/35 hover:text-white transition-colors">
                    <info.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-[11px] sm:text-sm font-medium">{info.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Office + Form */}
      <section id="contact-form" className="bg-[#0A0A0A] py-6 md:py-12">
        <div className="px-2 sm:px-3">
          <div className="rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/[0.08] overflow-hidden">
            <div className="flex flex-col lg:flex-row">

              {/* Left — Office Photo + Map + Info */}
              <div className="lg:w-1/2 flex flex-col">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-0">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={officeImage} alt="Ium Labs Office" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-medium bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white uppercase tracking-wider">
                        Office
                      </span>
                    </div>
                  </div>

                  <a href="https://maps.google.com/?q=Ium+Labs+373+Gangnam-daero+Seocho-gu+Seoul" target="_blank" rel="noopener noreferrer" className="relative group aspect-[4/3] overflow-hidden border-l sm:border-l lg:border-l-0 lg:border-t xl:border-t-0 xl:border-l border-white/[0.08]">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.5!2d127.0265!3d37.4965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca15a6f8b5555%3A0x5555555555555555!2s373%20Gangnam-daero%2C%20Seocho-gu%2C%20Seoul!5e0!3m2!1sen!2skr!4v1704067200000!5m2!1sen!2skr" className="absolute inset-0 w-full h-full pointer-events-none grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" style={{
                      border: 0,
                      filter: 'invert(0.9) hue-rotate(180deg)'
                    }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/90 text-black text-[11px] sm:text-sm font-medium rounded-full flex items-center gap-1.5 shadow-lg">
                        <ExternalLink className="w-3.5 h-3.5" />
                        Google Maps
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-medium bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white uppercase tracking-wider">
                        Map
                      </span>
                    </div>
                  </a>
                </div>

                <div className="px-4 py-4 sm:p-6 border-t border-white/[0.08]">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-[15px] sm:text-lg mb-1">Ium Labs</h3>
                      <p className="text-white/40 text-[12px] sm:text-sm leading-relaxed">373 Gangnam-daero, 10F, Seocho District, Seoul</p>
                    </div>
                    <a href="https://maps.google.com/?q=Ium+Labs+373+Gangnam-daero+Seocho-gu+Seoul" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-white/60 text-[11px] sm:text-sm font-medium hover:bg-white/[0.1] transition-all">
                      <Navigation className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="hidden sm:inline">View on Maps</span>
                      <span className="sm:hidden">Map</span>
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2.5 text-white/30 text-[11px] sm:text-xs">
                    <Clock className="w-3 h-3 flex-shrink-0" />
                    <span>Mon–Fri 10:00–19:00 KST</span>
                  </div>
                </div>
              </div>

              {/* Right — Form */}
              <div className="lg:w-1/2 px-4 py-5 sm:p-8 md:p-10 border-t lg:border-t-0 lg:border-l border-white/[0.08]">
                <div className="mb-5 sm:mb-8">
                  <h2 className="font-sans text-xl sm:text-3xl font-bold text-white mb-1.5 sm:mb-2">
                    Ready to Enter Korea?
                  </h2>
                  <p className="text-[12px] sm:text-sm text-white/40">
                    Share your project details — we respond within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-1.5 sm:mb-2">Name *</label>
                      <input type="text" placeholder="Your name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-base text-white placeholder:text-white/25 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-1.5 sm:mb-2">Email *</label>
                      <input type="email" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-base text-white placeholder:text-white/25 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-1.5 sm:mb-2">Company</label>
                      <input type="text" placeholder="Company name" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-base text-white placeholder:text-white/25 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-1.5 sm:mb-2">Website</label>
                      <input type="text" placeholder="https://..." value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-base text-white placeholder:text-white/25 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-2 sm:mb-3">Budget</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                      {budgetOptions.map(option => (
                        <button key={option} type="button" onClick={() => setFormData({ ...formData, budget: option })} className={`px-2 py-2.5 sm:px-3 sm:py-3 rounded-xl text-[11px] sm:text-sm border transition-all text-center active:scale-[0.97] ${formData.budget === option ? 'bg-white/[0.1] border-white/30 text-white' : 'bg-white/[0.03] border-white/[0.08] text-white/50 hover:border-white/20 hover:text-white'}`}>
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-1.5 sm:mb-2">Your Project</label>
                    <textarea placeholder="Describe your project and goals..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={3} className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-base text-white placeholder:text-white/25 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all resize-none" />
                  </div>

                  <div className="pt-1 sm:pt-2 flex justify-center">
                    <button type="submit" disabled={isSubmitting} className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 bg-white text-black font-medium text-[13px] sm:text-sm rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50">
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                      <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Footer Links */}
      <FooterLinksSection />

      <Footer />
    </div>;
};
export default Contact;