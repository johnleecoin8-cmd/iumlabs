import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowRight, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
const teamMembers = [{
  name: "James",
  role: "Co-Founder",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  description: "Ex-Lead of Korea from Kucoin, Ex-VC from Outlierventures",
  linkedin: "https://www.linkedin.com/in/james-l-13a998251/"
}, {
  name: "David",
  role: "Co-Founder",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
  description: "Ex-Head of Business Development from Binance, Ex-Analyst from 21 shares",
  linkedin: "#"
}];
const TeamPreviewSection = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  return <section ref={ref} className="py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-card/30" />
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.3) 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }} />
      </div>

      
    </section>;
};
export default TeamPreviewSection;