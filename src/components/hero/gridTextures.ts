import * as THREE from "three";
import type { Cell } from "./heroData";

// Manages textures for the workgrid.
// - Every cell shows a still poster image as its base (image cells = own thumb,
//   video cells = linked project image). Cheap, cached, loaded on demand.
// - Video cells additionally play video, but only the nearest N (maxVideos) at
//   once — the real cost is concurrent decode, not file size. Until a video has
//   enough data buffered, the poster keeps showing (no black flash).
// - maxVideos = 0 (slow connection) means pure posters, zero video decode.
export class GridTextureManager {
  private cells: Cell[];
  private posters: (string | null)[];
  private imageCache = new Map<string, THREE.Texture>();
  private placeholder: THREE.Texture;
  private loader = new THREE.TextureLoader();

  private maxVideos: number;
  private videoSlots: {
    el: HTMLVideoElement;
    tex: THREE.VideoTexture;
    cellIndex: number | null;
  }[] = [];

  constructor(cells: Cell[], posters: (string | null)[], maxVideos = 10) {
    this.cells = cells;
    this.posters = posters;
    this.maxVideos = maxVideos;
    this.loader.crossOrigin = "anonymous";

    const c = document.createElement("canvas");
    c.width = c.height = 4;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#141414";
    ctx.fillRect(0, 0, 4, 4);
    this.placeholder = new THREE.CanvasTexture(c);

    for (let i = 0; i < maxVideos; i++) {
      const el = document.createElement("video");
      el.crossOrigin = "anonymous";
      el.muted = true;
      el.loop = true;
      el.playsInline = true;
      el.preload = "auto";
      const tex = new THREE.VideoTexture(el);
      tex.colorSpace = THREE.SRGBColorSpace;
      this.videoSlots.push({ el, tex, cellIndex: null });
    }
  }

  private loadImage(url: string): THREE.Texture {
    const cached = this.imageCache.get(url);
    if (cached) return cached;
    const tex = this.loader.load(url, (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.needsUpdate = true;
    });
    tex.colorSpace = THREE.SRGBColorSpace;
    this.imageCache.set(url, tex);
    return tex;
  }

  private poster(index: number): THREE.Texture {
    const url = this.posters[index];
    return url ? this.loadImage(url) : this.placeholder;
  }

  // Texture to show right now: a playing+buffered video if assigned, else poster.
  textureFor(index: number): THREE.Texture {
    if (this.cells[index].mediaType === "video") {
      const slot = this.videoSlots.find((s) => s.cellIndex === index);
      // only bind once a real frame exists, else texImage2D warns "no video"
      if (slot && slot.el.readyState >= 2 && slot.el.videoWidth > 0) return slot.tex;
      return this.poster(index);
    }
    return this.poster(index);
  }

  // Assign the capped video pool to the nearest visible video cells.
  updateVideoAssignments(ranked: number[]) {
    if (this.maxVideos === 0) return;
    const want = ranked.slice(0, this.maxVideos);
    const wantSet = new Set(want);

    for (const slot of this.videoSlots) {
      if (slot.cellIndex !== null && !wantSet.has(slot.cellIndex)) {
        slot.el.pause();
        slot.cellIndex = null;
      }
    }
    for (const idx of want) {
      if (this.videoSlots.some((s) => s.cellIndex === idx)) continue;
      const free = this.videoSlots.find((s) => s.cellIndex === null);
      if (!free) break;
      free.cellIndex = idx;
      const url = this.cells[idx].mediaUrl;
      if (free.el.src !== url) free.el.src = url;
      free.el.play().catch(() => {});
    }
  }

  dispose() {
    this.videoSlots.forEach((s) => {
      s.el.pause();
      s.el.removeAttribute("src");
      s.el.load();
      s.tex.dispose();
    });
    this.imageCache.forEach((t) => t.dispose());
    this.placeholder.dispose();
  }
}
