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
  return;
};
export default TeamPreviewSection;