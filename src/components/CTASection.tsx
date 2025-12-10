import { lazy, Suspense } from "react";
import { ArrowRight, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { cta, brand } from "@/config/content";
const MetallicElement = lazy(() => import("@/components/MetallicElement"));
const CTASection = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  return;
};
export default CTASection;