import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { HoverExpand_001 } from "@/components/ui/expand-on-hover";
import Lightbox from "@/components/Lightbox";

// Import all campaign images from assets
import bnbEvent from "@/assets/campaigns/bnb-event.jpg";
import ondoSeminar from "@/assets/campaigns/ondo-seminar.jpg";
import fogoFest from "@/assets/campaigns/fogo-fest.avif";
import peaqSummit from "@/assets/campaigns/peaq-summit.jpg";
import triaLaunch from "@/assets/campaigns/tria-launch.jpg";
import lbankFestival from "@/assets/campaigns/lbank-festival.jpg";
import kucoinCampaign from "@/assets/campaigns/kucoin-campaign.jpg";
import kucoinOldschool from "@/assets/campaigns/kucoin-oldschool.jpg";
import openledgerInterview from "@/assets/campaigns/openledger-interview.jpg";
import zkpassNights from "@/assets/campaigns/zkpass-verifiable-nights.jpg";
import saharaAi from "@/assets/campaigns/sahara-ai.jpg";
import synfuturesBillboard from "@/assets/campaigns/synfutures-billboard.jpg";
import polygonConnect from "@/assets/campaigns/polygon-connect.png";
import polygonHackathon from "@/assets/campaigns/polygon-hackathon.jpg";
import storyOriginSummit from "@/assets/campaigns/story-origin-summit.jpg";
import storyWorkshop from "@/assets/campaigns/story-workshop.jpg";
import mantraParty from "@/assets/campaigns/mantra-party.jpg";
import mantra from "@/assets/campaigns/mantra.jpg";
import megaethLaunch from "@/assets/campaigns/megaeth-launch.jpg";
import bybitEvent from "@/assets/campaigns/bybit-event.jpg";
import seoulMetroBillboardNew from "@/assets/campaigns/seoul-metro-billboard-new.jpeg";
import seoulMetroBillboard from "@/assets/campaigns/seoul-metro-billboard.jpeg";
import seoulMetroPoster from "@/assets/campaigns/seoul-metro-poster.jpeg";

// Map gallery `src` (stored as file path strings) to bundled campaign assets
const campaignAssetByFile: Record<string, string> = {
  "bnb-event.jpg": bnbEvent,
  "kucoin-campaign.jpg": kucoinCampaign,
  "kucoin-oldschool.jpg": kucoinOldschool,
  "ondo-seminar.jpg": ondoSeminar,
  "polygon-connect.png": polygonConnect,
  "polygon-hackathon.jpg": polygonHackathon,
  "sahara-ai.jpg": saharaAi,
  "story-origin-summit.jpg": storyOriginSummit,
  "story-workshop.jpg": storyWorkshop,
  "peaq-summit.jpg": peaqSummit,
  "bybit-event.jpg": bybitEvent,
  "mantra-party.jpg": mantraParty,
  "mantra.jpg": mantra,
  "megaeth-launch.jpg": megaethLaunch,
  "tria-launch.jpg": triaLaunch,
  "zkpass-verifiable-nights.jpg": zkpassNights,
  "synfutures-billboard.jpg": synfuturesBillboard,
  "fogo-fest.avif": fogoFest,
  "lbank-festival.jpg": lbankFestival,
  "openledger-interview.jpg": openledgerInterview,
  "seoul-metro-billboard-new.jpeg": seoulMetroBillboardNew,
  "seoul-metro-billboard.jpeg": seoulMetroBillboard,
  "seoul-metro-poster.jpeg": seoulMetroPoster
};
const resolveGallerySrcToAsset = (src?: string | null) => {
  if (!src) return null;
  const file = src.split("/").pop();
  if (!file) return null;
  return campaignAssetByFile[file] ?? null;
};

// All campaign images as fallback
const fallbackImages = [{
  src: bnbEvent,
  alt: "BNB Chain Event",
  title: "BNB Chain",
  subtitle: "Korea Launch Event 2024",
  slug: "bnb-chain"
}, {
  src: ondoSeminar,
  alt: "Ondo Finance",
  title: "Ondo Finance",
  subtitle: "Origin Summit 2025",
  slug: "ondo-finance"
}, {
  src: fogoFest,
  alt: "FOGO Fest",
  title: "FOGO",
  subtitle: "Fogo Fest 2025",
  slug: "fogo"
}, {
  src: peaqSummit,
  alt: "Peaq Summit",
  title: "Peaq",
  subtitle: "KBW 2025",
  slug: "peaq"
}, {
  src: triaLaunch,
  alt: "Tria Launch",
  title: "Tria",
  subtitle: "Korea Media Interview",
  slug: "tria"
}, {
  src: lbankFestival,
  alt: "Lbank Festival",
  title: "Lbank",
  subtitle: "1001 Festival Seoul",
  slug: "lbank"
}, {
  src: kucoinCampaign,
  alt: "KuCoin Campaign",
  title: "KuCoin",
  subtitle: "Korea Campaign",
  slug: "kucoin"
}, {
  src: kucoinOldschool,
  alt: "KuCoin Oldschool",
  title: "KuCoin",
  subtitle: "Oldschool Event",
  slug: "kucoin"
}, {
  src: openledgerInterview,
  alt: "OpenLedger Interview",
  title: "OpenLedger",
  subtitle: "Media Interview",
  slug: "openledger"
}, {
  src: zkpassNights,
  alt: "zkPass Verifiable Nights",
  title: "zkPass",
  subtitle: "Verifiable Nights",
  slug: "zkpass"
}, {
  src: saharaAi,
  alt: "Sahara AI",
  title: "Sahara AI",
  subtitle: "Korea Launch",
  slug: "sahara-ai"
}, {
  src: synfuturesBillboard,
  alt: "SynFutures Billboard",
  title: "SynFutures",
  subtitle: "Billboard Campaign",
  slug: "synfutures"
}, {
  src: polygonConnect,
  alt: "Polygon Connect",
  title: "Polygon",
  subtitle: "Connect Event",
  slug: "polygon"
}, {
  src: polygonHackathon,
  alt: "Polygon Hackathon",
  title: "Polygon",
  subtitle: "Hackathon Korea",
  slug: "polygon"
}, {
  src: storyOriginSummit,
  alt: "Story Origin Summit",
  title: "Story Protocol",
  subtitle: "Origin Summit",
  slug: "story-protocol"
}, {
  src: storyWorkshop,
  alt: "Story Workshop",
  title: "Story Protocol",
  subtitle: "Developer Workshop",
  slug: "story-protocol"
}, {
  src: mantraParty,
  alt: "MANTRA Party",
  title: "MANTRA",
  subtitle: "Korea Community Party",
  slug: "mantra"
}, {
  src: mantra,
  alt: "MANTRA Event",
  title: "MANTRA",
  subtitle: "Korea Event",
  slug: "mantra"
}, {
  src: megaethLaunch,
  alt: "MegaETH Launch",
  title: "MegaETH",
  subtitle: "Korea Launch",
  slug: "megaeth"
}, {
  src: bybitEvent,
  alt: "Bybit Event",
  title: "Bybit",
  subtitle: "Korea Event",
  slug: "bybit"
}, {
  src: seoulMetroBillboardNew,
  alt: "Seoul Metro Billboard",
  title: "Seoul Metro",
  subtitle: "Billboard Campaign",
  slug: "seoul-metro"
}, {
  src: seoulMetroBillboard,
  alt: "Seoul Metro Billboard",
  title: "Seoul Metro",
  subtitle: "Station Campaign",
  slug: "seoul-metro"
}, {
  src: seoulMetroPoster,
  alt: "Seoul Metro Poster",
  title: "Seoul Metro",
  subtitle: "Poster Campaign",
  slug: "seoul-metro"
}];
const FilmstripGallerySection = () => {
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Fetch first gallery image from each project
  const {
    data: galleryImages
  } = useQuery({
    queryKey: ['filmstrip-gallery'],
    queryFn: async () => {
      const {
        data: projects
      } = await supabase.from('projects').select('id, name, slug, result').eq('is_published', true).order('display_order').limit(12);
      if (!projects || projects.length === 0) return fallbackImages;
      const projectIds = projects.map(p => p.id);
      const {
        data: galleryRows
      } = await supabase.from('project_gallery').select('project_id, src, display_order').in('project_id', projectIds).order('display_order', {
        ascending: true
      });
      const firstGalleryByProject = new Map<string, string>();
      for (const row of galleryRows ?? []) {
        if (!firstGalleryByProject.has(row.project_id)) {
          firstGalleryByProject.set(row.project_id, row.src);
        }
      }
      const images = projects.map(project => {
        const gallerySrc = firstGalleryByProject.get(project.id);
        const asset = resolveGallerySrcToAsset(gallerySrc);
        if (!asset) return null;
        return {
          src: asset,
          alt: project.name,
          title: project.name,
          subtitle: project.result || '',
          slug: project.slug
        };
      }).filter((img): img is NonNullable<typeof img> => img !== null);
      return images.length > 0 ? images : fallbackImages;
    }
  });
  const images = galleryImages || fallbackImages;

  // Transform images for HoverExpand component
  const transformedImages = images.map(image => ({
    src: image.src,
    alt: image.alt,
    code: `${image.title} · ${image.subtitle}`,
    slug: image.slug
  }));

  // Transform images for Lightbox
  const lightboxImages = images.map(image => ({
    src: image.src,
    title: image.title,
    description: image.subtitle
  }));
  const handleLightboxOpen = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };
  const handleLightboxNavigate = (index: number) => {
    setLightboxIndex(index);
  };
  return <>
      <section className="py-16 bg-background md:py-[10px]">
        <div className="container mx-auto px-4 md:px-8">
          {/* Simple Header */}
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Campaign Gallery
            </h2>
            <Link to="/projects" className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Hover Expand Gallery with Autoplay */}
          <HoverExpand_001 images={transformedImages} onLightboxOpen={handleLightboxOpen} autoAdvance={true} autoAdvanceInterval={4000} />
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox images={lightboxImages} currentIndex={lightboxIndex} isOpen={lightboxOpen} onClose={handleLightboxClose} onNavigate={handleLightboxNavigate} />
    </>;
};
export default FilmstripGallerySection;