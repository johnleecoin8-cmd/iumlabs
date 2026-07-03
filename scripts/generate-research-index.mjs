// F1 (CEO review D6): keep static-research-posts.ts as the single authoring
// source, but stop shipping article BODIES in the JS bundle. This script
// derives two artifacts from it:
//   1. src/data/research-index.gen.ts — the same export minus every `content`
//      field (what the app imports; ~10x smaller chunk)
//   2. public/content/<slug>.json — { content } fetched by the article page
// Runs at the front of the build chain and on demand after editing posts.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcPath = join(root, "src/data/static-research-posts.ts");
const src = readFileSync(srcPath, "utf8");

const marker = "export const staticResearchPosts = [";
const headerEnd = src.indexOf(marker);
if (headerEnd === -1) throw new Error("marker not found");
const header = src.slice(0, headerEnd);
const body = src.slice(headerEnd);

// Emit content JSONs while stripping the content fields.
const contentDir = join(root, "public/content");
mkdirSync(contentDir, { recursive: true });

let count = 0;
const stripped = body.replace(
  /(slug: "([a-z0-9-]+)",[\s\S]*?)\n    content: `([\s\S]*?)`,\n/g,
  (_m, before, slug, content) => {
    writeFileSync(join(contentDir, `${slug}.json`), JSON.stringify({ content }));
    count++;
    return `${before}\n`;
  }
);

if (stripped.includes("content: `")) {
  throw new Error("a content field survived stripping — pattern drift, fix the regex");
}

const banner = `// AUTO-GENERATED from static-research-posts.ts — DO NOT EDIT.\n// Regenerate: node scripts/generate-research-index.mjs (runs in the build chain).\n// Article bodies live in public/content/<slug>.json (fetched at read time).\n`;
writeFileSync(join(root, "src/data/research-index.gen.ts"), banner + header + stripped);
console.log(`✅ Research index: ${count} bodies externalized to public/content/, index written`);
