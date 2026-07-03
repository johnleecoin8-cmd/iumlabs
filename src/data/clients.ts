// Shared client-logo roster. Single source for the hero marquee AND the
// footer "Let's talk" logo wall. Marks are background-removed monochrome
// silhouettes (PIL flood-fill / dominant-color keying) rendered white via
// `brightness-0 invert` so the whole wall reads as one uniform set.
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin-mono-cut.png";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import spacecoinLogo from "@/assets/logos/spacecoin-cut.png";
import triaLogo from "@/assets/logos/tria-mono-cut.png";
import mantraLogo from "@/assets/logos/mantra-mono-cut.png";
import saharaAiLogo from "@/assets/logos/sahara-ai-cut.png";
import fogoLogo from "@/assets/logos/fogo-cut.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";
import openledgerLogo from "@/assets/logos/openledger-wordmark.png";
import multipliLogo from "@/assets/logos/multipli-cut.png";
import talusLogo from "@/assets/logos/talus-cut.png";
import peaqLogo from "@/assets/logos/peaq-cut.png";
import aptosLogo from "@/assets/logos/aptos-cut.png";

export interface ClientLogo {
  name: string;
  logo: string;
  noInvert: boolean;
  slug: string;
}

export const clientLogos: ClientLogo[] = [
  { name: "BNB", logo: bnbLogo, noInvert: false, slug: "bnb-chain" },
  { name: "KuCoin", logo: kucoinLogo, noInvert: true, slug: "kucoin" },
  { name: "Polygon", logo: polygonLogo, noInvert: false, slug: "polygon" },
  { name: "Ondo Finance", logo: ondoLogo, noInvert: false, slug: "ondo" },
  { name: "Bybit", logo: bybitLogo, noInvert: false, slug: "bybit" },
  { name: "Spacecoin", logo: spacecoinLogo, noInvert: true, slug: "spacecoin" },
  { name: "Tria", logo: triaLogo, noInvert: true, slug: "tria" },
  { name: "Mantra", logo: mantraLogo, noInvert: true, slug: "mantra" },
  { name: "Sahara AI", logo: saharaAiLogo, noInvert: true, slug: "sahara-ai" },
  { name: "FOGO", logo: fogoLogo, noInvert: true, slug: "fogo" },
  { name: "SynFutures", logo: synfuturesLogo, noInvert: true, slug: "synfutures" },
  { name: "Peaq", logo: peaqLogo, noInvert: true, slug: "peaq" },
  { name: "Aptos", logo: aptosLogo, noInvert: true, slug: "aptos" },
  { name: "OpenLedger", logo: openledgerLogo, noInvert: false, slug: "openledger" },
  { name: "Multipli", logo: multipliLogo, noInvert: true, slug: "multipli" },
  { name: "Talus", logo: talusLogo, noInvert: true, slug: "talus" },
];
