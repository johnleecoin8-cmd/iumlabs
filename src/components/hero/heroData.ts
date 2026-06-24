// Grid data for the WebGL workgrid hero, derived from ium's real case studies.
// Each project becomes one tile on the curved bowl; clicking opens its case
// study. Ported from the phantom.land-style hero — adapted to ium content.
import { projectsData, type ProjectData } from "@/data/projectsData";

export type Cell = {
  id: string;
  slug: string;
  title: string;
  client: string | null;
  zone: string | null;
  features: string[];
  mediaType: "image" | "video";
  // image url shown on the tile (poster). videos are intentionally disabled in
  // the hero grid for mobile decode safety — posters only.
  mediaUrl: string;
  poster: string | null;
  glowColor: string | null;
};

function toCell(slug: string, p: ProjectData): Cell {
  // prefer the cleaner project background over the busy campaign feature photo
  const img = (p.bgImage ?? p.featureImage) as string;
  return {
    id: slug,
    slug,
    title: p.name,
    client: p.name,
    zone: p.category ?? null,
    features: p.shortServices?.length ? p.shortServices : p.services ?? [],
    mediaType: "image",
    mediaUrl: img,
    poster: img,
    glowColor: p.glowColor ?? null,
  };
}

export const workgridCells: Cell[] = Object.entries(projectsData)
  .map(([slug, p]) => toCell(slug, p))
  .filter((c) => !!c.poster);

export const ZONES: string[] = Array.from(
  new Set(workgridCells.map((c) => c.zone).filter((z): z is string => !!z))
);

// still image for a cell (image-only grid → just the poster)
export function posterFor(cell: Cell): string | null {
  return cell.poster;
}
