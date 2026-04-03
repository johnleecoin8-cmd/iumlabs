import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import FooterLinksSection from "@/components/FooterLinksSection";
import SEOHead from "@/components/SEOHead";
import { Mail, MapPin, Send, Calendar, ArrowUpRight, ArrowRight, Linkedin, Clock, ExternalLink, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import CalendlyButton from "@/components/CalendlyButton";
import officeImage from "@/assets/office/ium-labs-office.webp";
import confetti from "canvas-confetti";
const budgetOptions = ["$15,000 - $25,000", "$25,000 - $50,000", "$50,000 +", "Looking to raise funds"];
const contactInfo = [{
  icon: Send,
  label: "Telegram",
  value: brand.telegram,
  link: brand.telegramLink
}, {
  icon: Linkedin,
  label: "LinkedIn",
  value: "ium Labs",
  link: brand.linkedin
}, {
  icon: Mail,
  label: "Email",
  value: "E-mail",
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
    poster: '/images/contact-hero-poster.jpg',
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
      supabase.functions.invoke('send-contact-notification', {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          budget: formData.budget,
          message: formData.message
        }
      }).catch(console.error);
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
        description="Let's build in Korea. Drop us a line and we respond within 24 hours with a full Korea entry plan. 22+ projects launched including BNB, Bybit, and Mantra."
        path="/contact"
        keywords={['Korea Web3', 'Korea Crypto', 'Korea Web3 Marketing', 'Korea Crypto Agency', 'Contact Web3 Agency Korea', 'Korea Market Consultation']}
      />
      <Navbar />
      
      {/* Hero Section - Glassmorphism Style */}
      <main className="p-2 sm:p-3 md:p-4 bg-[#0A0A0A]">
        <section className="relative min-h-[80vh] flex flex-col justify-center items-center overflow-hidden rounded-2xl sm:rounded-3xl">
          {/* Video Background */}
          <div className="absolute inset-0 overflow-hidden">
            <ContactHeroVideo />
            
            {/* Dark overlay gradient matching hero */}
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
          </div>

          {/* Main Content - Centered */}
          <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6 w-full">
            <div className="max-w-5xl mx-auto text-center">
              {/* Main Headline - Single Line */}
              <h1 className="font-sans text-[2rem] sm:text-[4rem] md:text-[6rem] font-bold leading-[0.95] tracking-[-0.04em] mb-5 sm:mb-8 text-white whitespace-nowrap">
                Let's Build in Korea
              </h1>

              {/* Subtext */}
              <p className="text-sm sm:text-lg md:text-[22px] text-white/60 max-w-3xl mx-auto mb-8 font-light tracking-wide leading-relaxed">
                Drop us a line. We respond within 24 hours with a full Korea entry plan.
              </p>

              {/* CTA Button */}
              <div className="mb-10">
                <CalendlyButton className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold text-sm rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5 min-h-[48px]">
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                  <Calendar className="w-4 h-4" />
                  <span>Book a Meeting</span>
                </CalendlyButton>
              </div>

              {/* Contact Links - Inline */}
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                {contactInfo.map(info => (
                  <a key={info.label} href={info.link} target={info.link.startsWith('http') ? '_blank' : undefined} rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                    <info.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{info.value}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Office + Form — Full-width side by side */}
      <section id="contact-form" className="bg-[#0A0A0A] py-8 md:py-12">
        <div className="px-2 sm:px-3">
          <div className="rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/[0.08] overflow-hidden">
            <div className="flex flex-col lg:flex-row">

              {/* Left — Office Photo + Map + Info */}
              <div className="lg:w-1/2 flex flex-col">
                {/* Photo & Map */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-0">
                  {/* Office Photo */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={officeImage} alt="Ium Labs Office" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 text-[10px] font-medium bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white uppercase tracking-wider">
                        Office
                      </span>
                    </div>
                  </div>

                  {/* Google Maps */}
                  <a href="https://maps.google.com/?q=Ium+Labs+373+Gangnam-daero+Seocho-gu+Seoul" target="_blank" rel="noopener noreferrer" className="relative group aspect-[4/3] overflow-hidden border-t sm:border-t-0 sm:border-l lg:border-l-0 lg:border-t xl:border-t-0 xl:border-l border-white/[0.08]">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.5!2d127.0265!3d37.4965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca15a6f8b5555%3A0x5555555555555555!2s373%20Gangnam-daero%2C%20Seocho-gu%2C%20Seoul!5e0!3m2!1sen!2skr!4v1704067200000!5m2!1sen!2skr" className="absolute inset-0 w-full h-full pointer-events-none grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" style={{
                      border: 0,
                      filter: 'invert(0.9) hue-rotate(180deg)'
                    }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-4 py-2 bg-white/90 text-black text-sm font-medium rounded-full flex items-center gap-2 shadow-lg">
                        <ExternalLink className="w-4 h-4" />
                        Open in Google Maps
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 text-[10px] font-medium bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white uppercase tracking-wider">
                        Google Map
                      </span>
                    </div>
                  </a>
                </div>

                {/* Office Info */}
                <div className="p-6 sm:p-8 border-t border-white/[0.08]">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Corporate Office</p>
                        <h3 className="text-white font-bold text-xl">Ium Labs</h3>
                      </div>
                      <div className="hidden sm:block w-px h-10 bg-white/[0.08]" />
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Address</p>
                        <p className="text-white text-sm">373 Gangnam-daero, 10F, Seocho District, Seoul, Korea</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-2 text-white/60">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Mon - Fri, 10:00 AM - 7:00 PM KST</span>
                      </div>
                      <a href="https://maps.google.com/?q=Ium+Labs+373+Gangnam-daero+Seocho-gu+Seoul" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-white text-sm font-medium hover:bg-white/[0.1] hover:border-white/20 transition-all">
                        <ExternalLink className="w-4 h-4" />
                        View on Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — Form */}
              <div className="lg:w-1/2 p-6 sm:p-8 md:p-10 border-t lg:border-t-0 lg:border-l border-white/[0.08]">
                <div className="mb-8 text-center">
                  <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white mb-2">
                    Ready to Enter Korea?
                  </h2>
                  <p className="text-sm text-white/50">
                    Share your project details — our team responds within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Name *</label>
                      <input type="text" placeholder="Your name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Email *</label>
                      <input type="email" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all" />
                    </div>
                  </div>

                  {/* Company & Website */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Company Name</label>
                      <input type="text" placeholder="Company name" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Company Website</label>
                      <input type="text" placeholder="https://..." value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all" />
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-3">Estimated Budget</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetOptions.map(option => (
                        <button key={option} type="button" onClick={() => setFormData({ ...formData, budget: option })} className={`px-3 py-3 min-h-[44px] rounded-xl text-xs sm:text-sm border transition-all text-center hover:scale-[1.02] active:scale-[0.98] ${formData.budget === option ? 'bg-white/[0.1] border-white/30 text-white' : 'bg-white/[0.03] border-white/[0.08] text-white/60 hover:border-white/20 hover:bg-white/[0.05] hover:text-white'}`}>
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Tell Us About Your Project</label>
                    <textarea placeholder="Describe your project and goals..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={4} className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-white/30 focus:bg-white/[0.05] focus:outline-none transition-all resize-none" />
                  </div>

                  {/* Submit */}
                  <div className="pt-2 flex justify-center">
                    <button type="submit" disabled={isSubmitting} className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium text-sm rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50">
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