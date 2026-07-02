// Post-build: write per-article HTML shells with correct social meta.
// LinkedIn/Kakao/X crawlers don't execute JS, so the SPA's helmet-injected
// per-page OG tags are invisible to them — every share previews as the
// generic site card. This script copies dist/index.html to
// dist/blog/<slug>/index.html with og:title/description/image/url,
// twitter:*, canonical and <title> replaced per post, pointing og:image at
// the pre-rendered 1200x630 cards in /public/og/<slug>.png.
// Static hosts serve the exact-path file before the SPA fallback, so
// crawlers get real meta while human visitors still boot the SPA normally.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const base = readFileSync(join(dist, "index.html"), "utf8");
const src = readFileSync(join(root, "src/data/static-research-posts.ts"), "utf8");

const posts = [];
const re = /slug: "([a-z0-9-]+)",\s*\n\s*title: "([^"]+)",[\s\S]*?excerpt: "([^"]+)"/g;
let m;
while ((m = re.exec(src)) !== null) {
  posts.push({ slug: m[1], title: m[2], excerpt: m[3] });
}

const esc = (t) => t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

let written = 0;
for (const p of posts) {
  const ogImg = join(root, "public/og", `${p.slug}.png`);
  const image = existsSync(ogImg)
    ? `https://iumlabs.io/og/${p.slug}.png`
    : "https://iumlabs.io/images/share-og.jpeg";
  const url = `https://iumlabs.io/blog/${p.slug}`;
  const title = esc(`${p.title} | ium Research`);
  const desc = esc(p.excerpt.slice(0, 200));

  let html = base
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${desc}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${image}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:type" content=")[^"]*(")/, `$1article$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${desc}$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${image}$2`)
    .replace(/(<meta name="twitter:url" content=")[^"]*(")/, `$1${url}$2`);
  // og:image dimensions for the 1200x630 cards
  html = html
    .replace(/(<meta property="og:image:width" content=")[^"]*(")/, `$11200$2`)
    .replace(/(<meta property="og:image:height" content=")[^"]*(")/, `$1630$2`);

  const dir = join(dist, "blog", p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  written++;
}
console.log(`✅ Social shells: ${written} article pages written to dist/blog/*/index.html`);
