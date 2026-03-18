import { X, ArrowLeft } from "lucide-react";
import { brand, about, images } from "@/config/content";

interface LiveChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LiveChatModal = ({ isOpen, onClose }: LiveChatModalProps) => {
  const teamMembers = [
    {
      name: "James",
      role: "Co-Founder",
      image: images.team.james,
    },
    {
      name: "David",
      role: "Co-Founder",
      image: images.team.david,
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-500 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
    >
      {/* Background blur overlay */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 z-10 flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back</span>
        </button>

        {/* Marquee Header */}
        <div className="bg-muted/30 py-3 overflow-hidden border-b border-border/30 mt-14">
          <div className="flex animate-marquee whitespace-nowrap">
            {Array(10).fill(null).map((_, i) => (
              <div key={i} className="flex items-center mx-4">
                <span className="text-foreground text-sm mr-8">contact us</span>
                <span className="text-primary text-sm mr-8">sales department</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Column - Description */}
          <div className="flex-1 space-y-8">
            <div className="bg-white rounded-3xl p-8 lg:p-12">
              <p className="text-xl lg:text-2xl leading-relaxed text-gray-900">
                <span className="text-primary font-medium">We work closely with founders</span> and{" "}
                <span className="text-primary font-medium">teams across stages</span>, from{" "}
                <span className="text-primary font-medium">early launches</span> to{" "}
                <span className="text-primary font-medium">scaled ecosystems</span>. If you're exploring a campaign,{" "}
                <span className="text-primary font-medium">looking for support</span>, or just want to get a sense of{" "}
                <span className="text-primary font-medium">how we work</span>, reach out.{" "}
                <a 
                  href={brand.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:no-underline"
                >
                  We're easy to talk to.
                </a>
              </p>
            </div>

            <div className="text-muted-foreground">
              <p className="text-xs uppercase tracking-widest mb-1">open hours</p>
              <p className="text-foreground">Mon-Fri 09:00 — 18:00</p>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${brand.email}`}
                className="lunar-btn"
              >
                Email Us
              </a>
              <a
                href={brand.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="lunar-btn"
              >
                Chat on Telegram
              </a>
            </div>
          </div>

          {/* Right Column - Team Photos */}
          <div className="flex-1 flex gap-4 justify-center lg:justify-end">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-40 h-52 lg:w-52 lg:h-64 rounded-2xl overflow-hidden mb-4 bg-gradient-to-b from-blue-100 to-blue-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-foreground font-medium text-lg">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-muted/50 hover:bg-muted transition-colors flex items-center justify-center"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default LiveChatModal;
