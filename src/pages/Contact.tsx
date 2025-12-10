import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { contact, brand } from "@/config/content";

const iconMap = { email: Mail, phone: Phone, address: MapPin, telegram: MessageCircle };
const contactData = [
  { type: "email", value: brand.email, link: `mailto:${brand.email}` },
  { type: "phone", value: brand.phone, link: `tel:${brand.phone.replace(/[^+\d]/g, '')}` },
  { type: "address", value: brand.address, link: "#" },
  { type: "telegram", value: brand.telegram, link: brand.telegramLink },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: contact.form.successTitle, description: contact.form.successMessage });
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const parseHighlight = (text: string) => {
    const parts = text.split(/<highlight>|<\/highlight>/);
    return parts.length === 3 ? <>{parts[0]}<span className="text-gradient">{parts[1]}</span>{parts[2]}</> : text;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageTransition>
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6"><span className="text-gradient">{contact.pageTitle}</span></h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{contact.pageDescription}</p>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6">{contact.form.title}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{contact.form.nameLabel}</label>
                      <Input required placeholder={contact.form.namePlaceholder} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-secondary/50 border-border/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{contact.form.emailLabel}</label>
                      <Input required type="email" placeholder={contact.form.emailPlaceholder} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-secondary/50 border-border/50" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{contact.form.companyLabel}</label>
                    <Input placeholder={contact.form.companyPlaceholder} value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="bg-secondary/50 border-border/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{contact.form.messageLabel}</label>
                    <Textarea required placeholder={contact.form.messagePlaceholder} rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="bg-secondary/50 border-border/50 resize-none" />
                  </div>
                  <Button type="submit" variant="gradient" className="w-full"><Send className="w-4 h-4 mr-2" />{contact.form.submitButton}</Button>
                </form>
              </div>

              <div className="space-y-6">
                <div className="glass-card p-8">
                  <h2 className="text-2xl font-bold mb-6">{contact.info.title}</h2>
                  <div className="space-y-6">
                    {contactData.map((info, index) => {
                      const Icon = iconMap[info.type as keyof typeof iconMap];
                      const label = contact.info.items[index].label;
                      return (
                        <a key={info.type} href={info.link} className="flex items-start gap-4 group hover:bg-secondary/30 p-3 rounded-lg transition-all -mx-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium mb-1">{label}</div>
                            <div className="text-muted-foreground text-sm">{info.value}</div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="glass-card p-8">
                  <h3 className="text-xl font-bold mb-4">{contact.officeHours.title}</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex justify-between"><span>{contact.officeHours.weekday.label}</span><span className="text-foreground">{contact.officeHours.weekday.time}</span></div>
                    <div className="flex justify-between"><span>{contact.officeHours.saturday.label}</span><span className="text-foreground">{contact.officeHours.saturday.time}</span></div>
                    <div className="flex justify-between"><span>{contact.officeHours.sunday.label}</span><span className="text-foreground">{contact.officeHours.sunday.time}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{parseHighlight(contact.mapTitle)}</h2>
            <div className="glass-card p-2 overflow-hidden">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.3542!2d127.0276!3d37.4979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca159000000%3A0x0!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOq1rCDthYztl6TrnoDroZw!5e0!3m2!1sko!2skr!4v1699000000000!5m2!1sko!2skr" width="100%" height="450" style={{ border: 0, borderRadius: "0.75rem" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="CryptoBridge Office Location" className="grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
        </section>

        <Footer />
      </PageTransition>
    </div>
  );
};

export default Contact;
