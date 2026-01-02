import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

// Fallback images
const fallbackImages = [
  { src: bnbEvent, alt: "BNB Chain Event", title: "BNB Chain", subtitle: "Korea Launch Event 2024" },
  { src: ondoSeminar, alt: "Ondo Finance", title: "Ondo Finance", subtitle: "Origin Summit 2025" },
  { src: fogoFest, alt: "FOGO Fest", title: "FOGO", subtitle: "Fogo Fest 2025" },
  { src: peaqSummit, alt: "Peaq Summit", title: "Peaq", subtitle: "KBW 2025" },
  { src: triaLaunch, alt: "Tria Launch", title: "Tria", subtitle: "Korea Media Interview" },
  { src: lbankFestival, alt: "Lbank Festival", title: "Lbank", subtitle: "1001 Festival Seoul" },
];

const FilmstripGallerySection = () => {
  // Fetch first gallery image from each project
  const { data: galleryImages } = useQuery({
    queryKey: ['filmstrip-gallery'],
    queryFn: async () => {
      // Get all published projects
      const { data: projects } = await supabase
        .from('projects')
        .select('id, name, slug, result')
        .eq('is_published', true)
        .order('display_order')
        .limit(12);

      if (!projects || projects.length === 0) return fallbackImages;

      const projectIds = projects.map(p => p.id);

      // Get first gallery image for each project
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

      // Map projects to gallery items
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
          };
        })
        .filter((img): img is NonNullable<typeof img> => img !== null);

      return images.length > 0 ? images : fallbackImages;
    },
  });

  const images = galleryImages || fallbackImages;

  return (
    <section className="bg-surface-base">
      <div className="flex flex-col md:flex-row">
        {/* Left: Gallery Grid */}
        <div className="w-full md:w-2/3 md:border-r border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3">
            {images.slice(0, 6).map((image, index) => (
              <div
                key={index}
                className={`group relative aspect-[6/5] overflow-hidden border-r border-b border-white/10 cursor-pointer hover:scale-[1.02] hover:z-10 transition-transform duration-300 ${
                  index % 2 === 1 ? "border-r-0 sm:border-r" : ""
                } ${index % 3 === 2 ? "sm:border-r-0" : ""}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 sm:pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold text-sm sm:text-lg">{image.title}</p>
                  <p className="text-white/70 text-[10px] sm:text-sm">{image.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info Panel */}
        <div className="w-full md:w-1/3 p-4 sm:p-6 md:p-6 lg:p-8 flex flex-col justify-center">
          <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">
            Campaign Gallery
          </h2>
          <p className="text-white/50 leading-relaxed mb-4 sm:mb-5 text-xs sm:text-sm md:text-sm">
            Explore our successful campaigns and events across Korea's Web3 ecosystem.
          </p>

          <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <span className="text-white/50 text-xs sm:text-sm">Events Hosted</span>
              <span className="text-white font-semibold text-sm sm:text-base">48+</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <span className="text-white/50 text-xs sm:text-sm">Media Placements</span>
              <span className="text-white font-semibold text-sm sm:text-base">200+</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-white/50 text-xs sm:text-sm">Campaigns Launched</span>
              <span className="text-white font-semibold text-sm sm:text-base">60+</span>
            </div>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-white font-medium hover:text-white/70 transition-colors text-sm min-h-[44px] sm:min-h-0"
          >
            View all projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FilmstripGallerySection;
