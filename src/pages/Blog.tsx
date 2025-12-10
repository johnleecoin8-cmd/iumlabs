import { useState } from "react";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "2024년 Web3 마케팅 트렌드: 커뮤니티 중심 성장 전략",
    excerpt: "Web3 프로젝트가 성공하기 위한 핵심 마케팅 전략과 커뮤니티 빌딩의 중요성을 분석합니다.",
    category: "트렌드",
    date: "2024-12-01",
    readTime: "5분",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
    slug: "web3-marketing-trends-2024",
  },
  {
    id: "2",
    title: "NFT 프로젝트 런칭 가이드: 성공적인 민팅을 위한 체크리스트",
    excerpt: "NFT 컬렉션을 성공적으로 런칭하기 위한 단계별 가이드와 실전 팁을 공유합니다.",
    category: "가이드",
    date: "2024-11-25",
    readTime: "8분",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800",
    slug: "nft-launch-guide",
  },
  {
    id: "3",
    title: "한국 크립토 시장 진출: 현지화 마케팅 전략",
    excerpt: "글로벌 Web3 프로젝트가 한국 시장에 성공적으로 진출하기 위한 현지화 전략을 소개합니다.",
    category: "인사이트",
    date: "2024-11-18",
    readTime: "6분",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800",
    slug: "korea-crypto-market-entry",
  },
  {
    id: "4",
    title: "DeFi 프로토콜 마케팅: TVL 성장을 위한 핵심 전략",
    excerpt: "DeFi 프로젝트의 TVL을 성장시키기 위한 마케팅 전략과 사례를 분석합니다.",
    category: "DeFi",
    date: "2024-11-10",
    readTime: "7분",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800",
    slug: "defi-marketing-strategies",
  },
  {
    id: "5",
    title: "GameFi 마케팅: 게임 길드와 스트리머 협업 가이드",
    excerpt: "P2E 게임 프로젝트의 성장을 위한 게임 길드 및 스트리머 협업 전략을 공유합니다.",
    category: "GameFi",
    date: "2024-11-05",
    readTime: "6분",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
    slug: "gamefi-marketing-guide",
  },
  {
    id: "6",
    title: "Web3 커뮤니티 관리: Discord & Telegram 운영 노하우",
    excerpt: "활발한 Web3 커뮤니티를 구축하고 관리하기 위한 실전 노하우를 공유합니다.",
    category: "커뮤니티",
    date: "2024-10-28",
    readTime: "5분",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    slug: "web3-community-management",
  },
];

const categories = ["전체", "트렌드", "가이드", "인사이트", "DeFi", "GameFi", "커뮤니티"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const { ref, isVisible } = useScrollAnimation();

  const filteredPosts = selectedCategory === "전체" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageTransition>
        {/* Hero */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Web3 인사이트</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Web3 마케팅 트렌드, 전략, 그리고 실전 가이드를 공유합니다
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="px-4 pb-8">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section ref={ref} className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {filteredPosts.map((post, index) => (
                <article 
                  key={post.id}
                  className="group glass-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-medium text-primary bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} 읽기
                      </span>
                    </div>

                    <h2 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <button className="flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
                      읽어보기
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </PageTransition>
    </div>
  );
};

export default Blog;
