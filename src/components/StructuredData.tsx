import { Helmet } from 'react-helmet-async';
import { brand } from '@/config/content';

const BASE_URL = 'https://iumlabs.io';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": brand.name,
  "url": BASE_URL,
  "logo": `${BASE_URL}/images/share-og.jpeg`,
  "description": "Korea's #1 crypto marketing agency for Web3 market entry. End-to-end GTM, KOL campaigns, community growth, and PR.",
  "email": brand.email,
  "telephone": "",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Gangnam-daero 373, OFFICE 11B",
    "addressLocality": "Seoul",
    "addressRegion": "Gangnam-gu",
    "addressCountry": "KR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.4967,
    "longitude": 127.0276
  },
  "sameAs": [
    brand.linkedin,
    brand.twitter,
    brand.telegramLink
  ],
  "areaServed": [
    { "@type": "Country", "name": "South Korea" },
    { "@type": "Country", "name": "Singapore" }
  ],
  "knowsLanguage": ["en", "ko"],
  "priceRange": "$$$$"
};

const serviceSchemas = [
  { name: "Web3 GTM Strategy", description: "Full-stack Go-To-Market planning for Korean crypto market entry." },
  { name: "Influencer & KOL Marketing", description: "Campaigns powered by 250+ top Korean crypto voices across YouTube, Twitter, and Telegram." },
  { name: "PR & Media Coverage", description: "Korean media placements across CoinDesk Korea, Block Media, TokenPost, and mainstream outlets." },
  { name: "Community Management", description: "24/7 Korean community infrastructure on Telegram, Discord, and KakaoTalk." },
  { name: "Offline Events Korea", description: "End-to-end event planning for Web3 experiences in Seoul including KBW side events." },
  { name: "SEO & Paid Ads", description: "Naver SEO, Google Ads, and crypto-native advertising for Korean market." },
  { name: "AMA Hosting", description: "Structured AMA sessions on Telegram, Discord, and Twitter Spaces with Korean hosts." },
  { name: "Deep Research & Analytics", description: "Data-driven Korean market intelligence and on-chain analytics." },
  { name: "Regulations & Compliance", description: "VASP registration guidance and Korean crypto regulatory compliance." },
].map(svc => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "provider": { "@type": "Organization", "name": brand.name },
  "name": svc.name,
  "description": svc.description,
  "areaServed": { "@type": "Country", "name": "South Korea" }
}));

const StructuredData = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify(organizationSchema)}
    </script>
    <script type="application/ld+json">
      {JSON.stringify(serviceSchemas)}
    </script>
  </Helmet>
);

export default StructuredData;
