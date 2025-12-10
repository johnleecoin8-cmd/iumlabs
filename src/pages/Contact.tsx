import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@cryptobridge.kr",
    link: "mailto:hello@cryptobridge.kr",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+82 2-1234-5678",
    link: "tel:+8221234567",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "서울시 강남구 테헤란로 123, 크립토타워 15층",
    link: "#",
  },
  {
    icon: MessageCircle,
    title: "Telegram",
    value: "@CryptoBridgeKR",
    link: "https://t.me/CryptoBridgeKR",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "메시지가 전송되었습니다!",
      description: "빠른 시일 내에 연락드리겠습니다.",
    });
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageTransition>
        {/* Page Hero */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Contact Us</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              프로젝트에 대해 이야기해 보세요.
              무료 상담을 통해 최적의 마케팅 전략을 제안해 드립니다.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">이름 *</label>
                      <Input
                        required
                        placeholder="홍길동"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-secondary/50 border-border/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">이메일 *</label>
                      <Input
                        required
                        type="email"
                        placeholder="hello@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-secondary/50 border-border/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">회사/프로젝트명</label>
                    <Input
                      placeholder="CryptoBridge"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-secondary/50 border-border/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">메시지 *</label>
                    <Textarea
                      required
                      placeholder="프로젝트에 대해 알려주세요..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-secondary/50 border-border/50 resize-none"
                    />
                  </div>
                  <Button type="submit" variant="gradient" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    메시지 보내기
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="glass-card p-8">
                  <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
                  <div className="space-y-6">
                    {contactInfo.map((info) => (
                      <a
                        key={info.title}
                        href={info.link}
                        className="flex items-start gap-4 group hover:bg-secondary/30 p-3 rounded-lg transition-all -mx-3"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <info.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium mb-1">{info.title}</div>
                          <div className="text-muted-foreground text-sm">{info.value}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Office Hours */}
                <div className="glass-card p-8">
                  <h3 className="text-xl font-bold mb-4">Office Hours</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>월요일 - 금요일</span>
                      <span className="text-foreground">09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>토요일</span>
                      <span className="text-foreground">10:00 - 14:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>일요일</span>
                      <span className="text-foreground">휴무</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 px-4 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Find <span className="text-gradient">Us</span>
            </h2>
            <div className="glass-card p-2 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.3542!2d127.0276!3d37.4979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca159000000%3A0x0!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOq1rCDthYztl6TrnoDroZw!5e0!3m2!1sko!2skr!4v1699000000000!5m2!1sko!2skr"
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: "0.75rem" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CryptoBridge Office Location"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </section>

        <Footer />
      </PageTransition>
    </div>
  );
};

export default Contact;
