// Single source of truth for research-desk authors: avatar, role, bio.
// Used by the article byline (ResearchDetail) and the author archive pages.
export interface AuthorInfo {
  img?: string;
  role: string;
  bio: string;
}

export const AUTHORS: Record<string, AuthorInfo> = {
  Helen: {
    img: "/images/authors/helen.jpeg",
    role: "Head of Research",
    bio: "Helen leads the research desk at ium Labs, where she maintains the agency's internal campaign dataset and the Korea Crypto GTM Index, and covers Korean market structure, regulation, and go-to-market economics. Her work draws on attribution data from 25+ Korea market entries executed by the ium Labs team.",
  },
  David: {
    img: "/images/authors/david.webp",
    role: "Co-founder",
    bio: "David is the CEO and co-founder of ium Labs, leading strategic direction for one of Korea's most active Web3 marketing agencies. His background spans traditional finance and blockchain infrastructure, with a focus on institutional market dynamics and cross-border crypto flows.",
  },
  James: {
    img: "/images/authors/james.jpg",
    role: "Co-Founder",
    bio: "James is a co-founder of ium Labs and covers exchange dynamics, listing strategy, and the operational side of Korea market entries, drawing on years inside Korean crypto trading and BD.",
  },
  Tobi: {
    img: "/images/authors/tobi.webp",
    role: "Senior Analyst",
    bio: "Tobi is a senior analyst at ium Labs covering DeFi, on-chain markets, and the behavior of Korean retail across cycles. He turns exchange data and community telemetry into the desk's market-structure calls.",
  },
};
