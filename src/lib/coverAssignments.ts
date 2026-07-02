// AUTO-ASSIGNED cover styles: round-robin dispersion over the photo pool
// and style axes so no two posts in the library can render near-identical
// covers (random seeding alone guarantees birthday collisions: 33 posts,
// 16 photos). Adjacent posts never share a photo; when a photo repeats a
// full cycle later, shape/density/angle are forced apart.
// Regenerate when adding many posts; unknown slugs fall back to hash-seeded
// styling in blogCover.ts.

export interface CoverAssignment {
  photo: number;
  shape: "circle" | "square" | "diamond" | "dash";
  angle: number;   // degrees
  density: number; // grid columns
  hex: boolean;
  poster: number;  // 0 = continuous tone
}

export const COVER_ASSIGN: Record<string, CoverAssignment> = {
  "robinhood-chain-korea-radar-tokenized-stocks-2026": { photo: 0, shape: "circle", angle: -18.0, density: 34, hex: false, poster: 4 },
  "korea-crypto-gtm-index-2026-benchmarks-25-market-entries": { photo: 1, shape: "square", angle: -17.0, density: 47, hex: true, poster: 0 },
  "korea-won-stablecoin-digital-asset-basic-act-2026": { photo: 2, shape: "diamond", angle: -16.0, density: 60, hex: false, poster: 0 },
  "korea-corporate-crypto-ban-lifted-institutional-playbook-2026": { photo: 3, shape: "dash", angle: -15.0, density: 73, hex: true, poster: 4 },
  "korea-cex-user-acquisition-funnel-kol-naver-paid-ads": { photo: 4, shape: "circle", angle: -14.0, density: 44, hex: false, poster: 0 },
  "korea-rwa-tokenized-assets-trust-gap-sto-2026": { photo: 5, shape: "square", angle: -13.0, density: 57, hex: true, poster: 0 },
  "korea-gtm-stack-full-funnel-web3-framework-2026": { photo: 6, shape: "diamond", angle: -12.0, density: 70, hex: false, poster: 4 },
  "kakaotalk-open-chat-korea-crypto-distribution-2026": { photo: 7, shape: "dash", angle: -11.0, density: 41, hex: true, poster: 0 },
  "upbit-dominance-how-78-percent-market-share-reshapes-token-economics": { photo: 8, shape: "circle", angle: -10.0, density: 54, hex: false, poster: 0 },
  "korea-memecoin-paradox-4-7b-volume-zero-organic-projects": { photo: 9, shape: "square", angle: -9.0, density: 67, hex: true, poster: 4 },
  "ai-crypto-korea-why-800m-depin-narrative-hasnt-landed": { photo: 10, shape: "diamond", angle: -8.0, density: 38, hex: false, poster: 0 },
  "the-stablecoin-siege-usdt-vs-usdc-in-asia": { photo: 11, shape: "dash", angle: -7.0, density: 51, hex: true, poster: 0 },
  "korea-defi-paradox-why-active-traders-wont-touch-onchain": { photo: 12, shape: "circle", angle: -6.0, density: 64, hex: false, poster: 4 },
  "korea-kol-marketing-landscape-2026-guide": { photo: 13, shape: "square", angle: -5.0, density: 35, hex: true, poster: 0 },
  "korean-exchange-listing-strategy-upbit-bithumb-2026": { photo: 14, shape: "diamond", angle: -4.0, density: 48, hex: false, poster: 0 },
  "korea-crypto-regulation-2026-vaupa-travel-rule": { photo: 15, shape: "dash", angle: -3.0, density: 61, hex: true, poster: 4 },
  "korea-institutional-crypto-vc-family-office-landscape-2026": { photo: 0, shape: "square", angle: -2.0, density: 74, hex: false, poster: 0 },
  "the-naver-effect-search-dominance-korean-crypto-discovery": { photo: 1, shape: "diamond", angle: -1.0, density: 45, hex: true, poster: 0 },
  "korean-crypto-telegram-anatomy-50k-member-community": { photo: 2, shape: "dash", angle: 0.0, density: 58, hex: false, poster: 4 },
  "token-launch-timing-korea-quarterly-cycle": { photo: 3, shape: "circle", angle: 1.0, density: 71, hex: true, poster: 0 },
  "korea-vs-japan-crypto-market-structural-comparison-2026": { photo: 4, shape: "square", angle: 2.0, density: 42, hex: false, poster: 0 },
  "korean-premium-decoded-kimchi-premium-mechanics-2026": { photo: 5, shape: "diamond", angle: 3.0, density: 55, hex: true, poster: 4 },
  "korea-spot-crypto-etf-framework-act-2026": { photo: 6, shape: "dash", angle: 4.0, density: 68, hex: false, poster: 0 },
  "bithumb-upbit-squeeze-korea-exchange-duopoly-2026": { photo: 7, shape: "circle", angle: 5.0, density: 39, hex: true, poster: 0 },
  "korea-crypto-tax-2027-22-percent-gtm-fallout": { photo: 8, shape: "square", angle: 6.0, density: 52, hex: false, poster: 4 },
};
