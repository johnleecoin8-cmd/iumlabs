#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');
const PUBLIC = resolve(ROOT, 'public');
const BASE_URL = 'https://iumlabs.io';
const TODAY = new Date().toISOString().split('T')[0];

// ── Extract blog slugs from static-research-posts.ts ──
function extractBlogSlugs() {
  const file = readFileSync(resolve(ROOT, 'src/data/static-research-posts.ts'), 'utf-8');
  const matches = [...file.matchAll(/slug:\s*["']([^"']+)["']/g)];
  return matches.map(m => m[1]);
}

// ── All site routes (mirrors App.tsx) ──
const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.85', changefreq: 'weekly' },
  { path: '/contact', priority: '0.85', changefreq: 'weekly' },
  { path: '/book-a-meeting', priority: '0.7', changefreq: 'monthly' },

  // Core services
  { path: '/services/gtm', priority: '0.85', changefreq: 'weekly' },
  { path: '/services/influencer', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/community', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/pr', priority: '0.75', changefreq: 'weekly' },
  { path: '/services/deep-research', priority: '0.7', changefreq: 'weekly' },
  { path: '/services/compliance', priority: '0.75', changefreq: 'weekly' },
  { path: '/services/ama', priority: '0.65', changefreq: 'weekly' },
  { path: '/services/seo-ads', priority: '0.65', changefreq: 'weekly' },
  { path: '/services/offline-event', priority: '0.65', changefreq: 'weekly' },

  // SEO landing pages
  { path: '/crypto-marketing-korea', priority: '0.9', changefreq: 'weekly' },
  { path: '/kol-marketing-korea', priority: '0.85', changefreq: 'weekly' },
  { path: '/korea-web3-guide', priority: '0.85', changefreq: 'weekly' },
  { path: '/korea-community-management', priority: '0.85', changefreq: 'weekly' },
  { path: '/korea-pr-media', priority: '0.85', changefreq: 'weekly' },
  { path: '/korea-event-marketing', priority: '0.85', changefreq: 'weekly' },
  { path: '/korea-seo-naver', priority: '0.85', changefreq: 'weekly' },
  { path: '/korea-exchange-listing', priority: '0.85', changefreq: 'weekly' },

  // Other pages
  { path: '/k-leaderboard', priority: '0.6', changefreq: 'weekly' },
  { path: '/jobs', priority: '0.5', changefreq: 'weekly' },
  { path: '/deck', priority: '0.5', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/transparency', priority: '0.4', changefreq: 'monthly' },
];

// SEO article routes (static, hardcoded in App.tsx)
const SEO_ARTICLES = [
  'how-to-launch-token-in-korea',
  'korean-crypto-kol-marketing-guide',
  'naver-seo-for-crypto-projects',
  'korea-crypto-community-building',
  'web3-event-marketing-korea',
  'korea-crypto-pr-media-guide',
  'understanding-korean-crypto-investors',
];

// Published project slugs (from projectsData)
const PROJECT_SLUGS = [
  'aptos', 'bnb-chain', 'bybit', 'fogo', 'kite', 'kucoin', 'mantra',
  'openledger', 'polygon', 'sahara-ai', 'spacecoin', 'synfutures', 'tria',
  'world', 'megaeth', 'story-protocol', 'ondo',
];

function urlEntry(path, priority, changefreq, lastmod = TODAY) {
  return `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function generateMainSitemap() {
  const entries = [];

  // Static routes
  for (const r of STATIC_ROUTES) {
    entries.push(urlEntry(r.path, r.priority, r.changefreq));
  }

  // Project detail pages
  for (const slug of PROJECT_SLUGS) {
    entries.push(urlEntry(`/projects/${slug}`, '0.6', 'monthly'));
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;
}

function generateBlogSitemap() {
  const entries = [];
  const staticSlugs = extractBlogSlugs();

  // SEO articles (higher priority)
  for (const slug of SEO_ARTICLES) {
    entries.push(urlEntry(`/blog/${slug}`, '0.7', 'monthly'));
  }

  // Static research posts
  for (const slug of staticSlugs) {
    entries.push(urlEntry(`/blog/${slug}`, '0.65', 'monthly'));
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
${entries.join('\n')}
</urlset>`;
}

function generateSitemapIndex() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-blog.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
</sitemapindex>`;
}

async function pingSearchEngines() {
  const sitemapUrl = encodeURIComponent(`${BASE_URL}/sitemap-index.xml`);
  const endpoints = [
    `https://www.google.com/ping?sitemap=${sitemapUrl}`,
    `https://www.bing.com/ping?sitemap=${sitemapUrl}`,
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(10000) });
      const engine = url.includes('google') ? 'Google' : 'Bing';
      console.log(`  ✓ ${engine} pinged (${res.status})`);
    } catch (e) {
      const engine = url.includes('google') ? 'Google' : 'Bing';
      console.log(`  ✗ ${engine} ping failed: ${e.message}`);
    }
  }
}

// ── Main ──
console.log('🗺️  Generating sitemaps...');

const mainSitemap = generateMainSitemap();
const blogSitemap = generateBlogSitemap();
const sitemapIndex = generateSitemapIndex();

// Write to both dist/ and public/ so they stay in sync
for (const dir of [DIST, PUBLIC]) {
  if (!existsSync(dir)) continue;
  writeFileSync(resolve(dir, 'sitemap.xml'), mainSitemap);
  writeFileSync(resolve(dir, 'sitemap-blog.xml'), blogSitemap);
  writeFileSync(resolve(dir, 'sitemap-index.xml'), sitemapIndex);
  console.log(`  ✓ Written to ${dir === DIST ? 'dist/' : 'public/'}`);
}

const mainCount = (mainSitemap.match(/<url>/g) || []).length;
const blogCount = (blogSitemap.match(/<url>/g) || []).length;
console.log(`  ✓ sitemap.xml: ${mainCount} URLs`);
console.log(`  ✓ sitemap-blog.xml: ${blogCount} URLs`);
console.log(`  ✓ lastmod: ${TODAY}`);

console.log('\n📡 Pinging search engines...');
await pingSearchEngines();

console.log('\n✅ Sitemaps generated and search engines notified.');
