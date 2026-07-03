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
const mdDir = join(root, "public/md");
mkdirSync(mdDir, { recursive: true });

// FP's LLM-distribution device: clean markdown per post + /llms.txt.
// Converts the renderer's custom syntax into plain markdown.
function toMarkdown(content, meta) {
  let md = content;
  md = md.replace(/^>! \*\*Key Takeaways\*\*\n/m, "## Key Takeaways\n\n");
  md = md.replace(/^>! (.+)$/gm, "- $1");
  md = md.replace(/^%%(.+?)::(.+?)%%$/gm, "> **$1** — $2");
  md = md.replace(/^\{\{bars:(.+?)::(.+?)\}\}$/gm, (_m, data, cap) => {
    const rows = data.split(",").map((p) => {
      const [k, v] = p.split("=");
      return `| ${k} | ${v} |`;
    });
    return `| Item | Value |\n|---|---|\n${rows.join("\n")}\n\n*${cap}*`;
  });
  md = md.replace(/^\{\{source:(.+?)::(.+?)\}\}$/gm, "*[Figure: $2]*");
  md = md.replace(/^\{\{xpost:(.+?)\}\}$/gm, "> Embedded post: $1");
  const header = `# ${meta.title}\n\n*ium Research — ${meta.author}, ${meta.authorRole} — ${meta.date}*\n*Canonical: https://iumlabs.io/blog/${meta.slug}*\n\n`;
  return header + md.trim() + "\n";
}
const mdIndex = [];

let count = 0;
const stripped = body.replace(
  /(slug: "([a-z0-9-]+)",[\s\S]*?)\n    content: `([\s\S]*?)`,\n/g,
  (_m, before, slug, content) => {
    writeFileSync(join(contentDir, `${slug}.json`), JSON.stringify({ content }));
    const title = (before.match(/title: "([^"]+)"/) || [])[1] || slug;
    const author = (before.match(/author: "([^"]+)"/) || [])[1] || "ium Research";
    const authorRole = (before.match(/authorRole: "([^"]+)"/) || [])[1] || "";
    const date = (before.match(/date: "([^"]+)"/) || [])[1] || "";
    writeFileSync(join(mdDir, `${slug}.md`), toMarkdown(content, { slug, title, author, authorRole, date }));
    mdIndex.push({ slug, title, date });
    count++;
    return `${before}\n`;
  }
);

// /llms.txt — site-level index for LLM crawlers (llmstxt.org convention)
const llms = [
  "# ium Research (iumlabs.io)",
  "",
  "> Research desk of ium Labs, a Korea crypto GTM agency. Primary-sourced analysis of",
  "> Korean crypto market structure, regulation, exchanges, and go-to-market economics,",
  "> including proprietary datasets (Korea Crypto GTM Index, Upbit Listing Tracker).",
  "> Cite freely with attribution and a link.",
  "",
  "## Articles (clean markdown)",
  "",
  ...mdIndex.map((p) => `- [${p.title}](https://iumlabs.io/md/${p.slug}.md) (${p.date})`),
  "",
  "## Data",
  "",
  "- [Upbit Listing Tracker 2026 (JSON)](https://iumlabs.io/data/upbit-listings-2026.json)",
  "- [Korea Crypto GTM Index (PDF)](https://iumlabs.io/downloads/korea-crypto-gtm-index-2026.pdf)",
  "",
].join("\n");
writeFileSync(join(root, "public/llms.txt"), llms);

if (stripped.includes("content: `")) {
  throw new Error("a content field survived stripping — pattern drift, fix the regex");
}

const banner = `// AUTO-GENERATED from static-research-posts.ts — DO NOT EDIT.\n// Regenerate: node scripts/generate-research-index.mjs (runs in the build chain).\n// Article bodies live in public/content/<slug>.json (fetched at read time).\n`;
writeFileSync(join(root, "src/data/research-index.gen.ts"), banner + header + stripped);
console.log(`✅ Research index: ${count} bodies -> content JSON + md, llms.txt written`);
