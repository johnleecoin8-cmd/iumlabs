import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useRef } from "react";

// Import actual campaign images from assets
import bnbEvent from "@/assets/campaigns/bnb-event.jpg";
import ondoSeminar from "@/assets/campaigns/ondo-seminar.jpg";
import fogoFest from "@/assets/campaigns/fogo-fest.avif";
import peaqSummit from "@/assets/campaigns/peaq-summit.jpg";
import triaLaunch from "@/assets/campaigns/tria-launch.jpg";
import lbankFestival from "@/assets/campaigns/lbank-festival.jpg";
import kucoinCampaign from "@/assets/campaigns/kucoin-campaign.jpg";
import openledgerInterview from "@/assets/campaigns/openledger-interview.jpg";
import zkpassNights from "@/assets/campaigns/zkpass-verifiable-nights.jpg";
import saharaAi from "@/assets/campaigns/sahara-ai.jpg";
import synfuturesBillboard from "@/assets/campaigns/synfutures-billboard.jpg";
import polygonConnect from "@/assets/campaigns/polygon-connect.png";
import storyOriginSummit from "@/assets/campaigns/story-origin-summit.jpg";
import mantraParty from "@/assets/campaigns/mantra-party.jpg";
import megaethLaunch from "@/assets/campaigns/megaeth-launch.jpg";
import bybitEvent from "@/assets/campaigns/bybit-event.jpg";

// Map gallery `src` (stored as file path strings) to bundled campaign assets
const campaignAssetByFile: Record<string, string> = {
  "bnb-event.jpg": bnbEvent,
  "kucoin-campaign.jpg": kucoinCampaign,
  "ondo-seminar.jpg": ondoSeminar,
  "polygon-connect.png": polygonConnect,
  "sahara-ai.jpg": saharaAi,
  "story-origin-summit.jpg": storyOriginSummit,
  "peaq-summit.jpg": peaqSummit,
  "bybit-event.jpg": bybitEvent,
  "mantra-party.jpg": mantraParty,
  "megaeth-launch.jpg": megaethLaunch,
  "tria-launch.jpg": triaLaunch,
  "zkpass-verifiable-nights.jpg": zkpassNights,
  "synfutures-billboard.jpg": synfuturesBillboard,
  "fogo-fest.avif": fogoFest,
  "lbank-festival.jpg": lbankFestival,
  "openledger-interview.jpg": openledgerInterview,
};

const resolveGallerySrcToAsset = (src?: string | null) => {
  if (!src) return null;
  const file = src.split("/").pop();
  if (!file) return null;
  return campaignAssetByFile[file] ?? null;
};

// Fallback images with slugs
const fallbackImages = [
  { src: bnbEvent, alt: "BNB Chain Event", title: "BNB Chain", subtitle: "Korea Launch Event 2024", slug: "bnb-chain" },
  { src: ondoSeminar, alt: "Ondo Finance", title: "Ondo Finance", subtitle: "Origin Summit 2025", slug: "ondo-finance" },
  { src: fogoFest, alt: "FOGO Fest", title: "FOGO", subtitle: "Fogo Fest 2025", slug: "fogo" },
  { src: peaqSummit, alt: "Peaq Summit", title: "Peaq", subtitle: "KBW 2025", slug: "peaq" },
  { src: triaLaunch, alt: "Tria Launch", title: "Tria", subtitle: "Korea Media Interview", slug: "tria" },
  { src: lbankFestival, alt: "Lbank Festival", title: "Lbank", subtitle: "1001 Festival Seoul", slug: "lbank" },
];

const FilmstripGallerySection = () => {
  const galleryRef = useRef<HTMLDivElement>(null);

  // Fetch first gallery image from each project
  const { data: galleryImages } = useQuery({
    queryKey: ['filmstrip-gallery'],
    queryFn: async () => {
      const { data: projects } = await supabase
        .from('projects')
        .select('id, name, slug, result')
        .eq('is_published', true)
        .order('display_order')
        .limit(12);

      if (!projects || projects.length === 0) return fallbackImages;

      const projectIds = projects.map(p => p.id);

      const { data: galleryRows } = await supabase
        .from('project_gallery')
        .select('project_id, src, display_order')
        .in('project_id', projectIds)
        .order('display_order', { ascending: true });

      const firstGalleryByProject = new Map<string, string>();
      for (const row of galleryRows ?? []) {
        if (!firstGalleryByProject.has(row.project_id)) {
          firstGalleryByProject.set(row.project_id, row.src);
        }
      }

      const images = projects
        .map(project => {
          const gallerySrc = firstGalleryByProject.get(project.id);
          const asset = resolveGallerySrcToAsset(gallerySrc);
          if (!asset) return null;
          return {
            src: asset,
            alt: project.name,
            title: project.name,
            subtitle: project.result || '',
            slug: project.slug,
          };
        })
        .filter((img): img is NonNullable<typeof img> => img !== null);

      return images.length > 0 ? images : fallbackImages;
    },
  });

  const images = galleryImages || fallbackImages;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Simple Header */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Campaign Gallery
          </h2>
          <Link
            to="/projects"
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Simple Horizontal Scroll Gallery */}
        <div 
          ref={galleryRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 md:-mx-8 md:px-8"
        >
          {images.map((image, index) => (
            <Link
              key={index}
              to={`/projects/${image.slug}`}
              className="group flex-shrink-0 w-[260px] md:w-[300px] lg:w-[320px] rounded-xl overflow-hidden bg-card"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 transform transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="text-white font-semibold text-base md:text-lg mb-1">
                    {image.title}
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-2">
                    {image.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilmstripGallerySection;
