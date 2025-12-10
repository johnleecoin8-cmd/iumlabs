/**
 * =====================================================
 * 사이트 콘텐츠 설정 파일
 * =====================================================
 * 
 * 이 파일에서 모든 텍스트와 이미지 경로를 수정할 수 있습니다.
 * 각 섹션별로 구분되어 있으니 필요한 부분만 수정하세요.
 */

// =====================================================
// 브랜드 정보
// =====================================================
export const brand = {
  name: "CryptoBridge Korea",
  tagline: "Web3 마케팅 에이전시",
  description: "한국 최고의 Web3 전문 마케팅 에이전시. 블록체인 프로젝트의 성공적인 런칭과 성장을 지원합니다.",
  email: "CryptoBridgekoea@gmail.com",
  phone: "010 3969 9699",
  address: "OFFICE 11B, Gangnam-daero 373, Gangnam, Seoul, South Korea",
  telegram: "@cryptobridgekorea",
  telegramLink: "https://t.me/cryptobridgekorea",
  linkedin: "https://www.linkedin.com/company/cryptobridge",
  copyright: `© ${new Date().getFullYear()} CryptoBridge Korea`,
};

// =====================================================
// 이미지 설정 및 권장 사이즈
// =====================================================
export const images = {
  /**
   * 대시보드 목업 이미지
   * 권장 사이즈: 1200x800px (3:2 비율)
   * 형식: PNG 또는 WebP (투명 배경 권장)
   * 위치: src/assets/dashboard-mockup.png
   */
  dashboardMockup: "/src/assets/dashboard-mockup.png",

  /**
   * 포트폴리오 프로젝트 이미지들
   * 권장 사이즈: 800x600px (4:3 비율)
   * 형식: PNG, JPG, 또는 WebP
   * 위치: src/assets/portfolio-*.png
   */
  portfolio: {
    metaverse: "/src/assets/portfolio-metaverse.png",
    defi: "/src/assets/portfolio-defi.png",
    dao: "/src/assets/portfolio-dao.png",
    gamefi: "/src/assets/portfolio-gamefi.png",
  },

  /**
   * 팀 멤버 프로필 이미지
   * 권장 사이즈: 300x300px (1:1 정사각형)
   * 형식: JPG 또는 WebP
   * 배경: 깔끔한 단색 배경 권장
   */
  team: {
    james: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    david: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
  },

  /**
   * 로고 이미지 (선택사항)
   * 권장 사이즈: 200x50px (가로형) 또는 100x100px (정사각형)
   * 형식: SVG 권장 (PNG도 가능)
   */
  logo: null, // 현재 텍스트 로고 사용 중
};

// =====================================================
// 네비게이션
// =====================================================
export const navigation = {
  links: [
    { name: "서비스", href: "/services" },
    { name: "프로젝트", href: "/projects" },
    { name: "회사 소개", href: "/about" },
    { name: "문의하기", href: "/contact" },
  ],
  ctaButton: "시작하기",
};

// =====================================================
// 히어로 섹션 (메인 페이지)
// =====================================================
export const hero = {
  badge: "Web3 마케팅 에이전시",
  headline: {
    line1: "당신의",
    highlight: "Web3 프로젝트",
    line2: "한국에서 런칭.",
  },
  description: "블록체인 프로젝트의 성공을 위한 전략적 마케팅, 커뮤니티 구축, 그리고 깊은 현지 전문성을 제공합니다.",
  buttons: {
    primary: "프로젝트 시작하기",
    secondary: "포트폴리오 보기",
  },
  badges: {
    liveData: "실시간 데이터",
    roi: "+847% ROI",
  },
};

// =====================================================
// 통계 섹션
// =====================================================
export const stats = {
  items: [
    { 
      value: 200, 
      label: "런칭 프로젝트", 
      suffix: "+",
    },
    { 
      value: 500, 
      label: "자금 조달", 
      prefix: "$", 
      suffix: "M+",
    },
    { 
      value: 50, 
      label: "거래소 파트너", 
      suffix: "+",
    },
    { 
      value: 5, 
      label: "커뮤니티 도달", 
      suffix: "M+",
    },
  ],
  partnersLabel: "신뢰받는 파트너사",
  /**
   * 파트너 로고 (텍스트로 표시)
   * 실제 로고 이미지를 사용하려면 images 섹션에 추가하세요
   */
  partners: [
    "Binance",
    "Upbit",
    "Bithumb",
    "Coinone",
    "CoinMarketCap",
    "CoinGecko",
  ],
};

// =====================================================
// 서비스 섹션
// =====================================================
export const services = {
  badge: "서비스 소개",
  headline: "한국 시장을 위한 <highlight>Web3 마케팅</highlight> 풀서비스.",
  items: [
    {
      id: "web3-marketing",
      title: "Web3 마케팅",
      description: "커뮤니티 구축, PR, 인플루언서 캠페인을 포함한 블록체인 프로젝트 종합 마케팅 전략.",
      fullDescription: "한국 시장 진출을 원하는 블록체인 프로젝트를 위한 엔드투엔드 솔루션을 제공합니다. 깊은 산업 지식과 검증된 마케팅 전략을 결합하여 타겟 오디언스에게 효과적으로 도달합니다.",
      features: [
        "커뮤니티 구축 및 관리",
        "KOL/인플루언서 파트너십",
        "PR & 미디어 관계",
        "소셜 미디어 전략",
        "콘텐츠 마케팅",
        "이벤트 기획 & 실행",
      ],
    },
    {
      id: "nft-marketing",
      title: "NFT 마케팅",
      description: "아트워크 전략부터 마켓플레이스 리스팅, 커뮤니티 인게이지먼트까지 엔드투엔드 NFT 런칭 서비스.",
      fullDescription: "NFT 컬렉션을 최대한의 임팩트로 런칭하세요. 프리런칭 하이프 빌딩부터 민팅 후 커뮤니티 인게이지먼트까지, 경쟁이 치열한 한국 NFT 시장에서 컬렉션이 돋보일 수 있도록 지원합니다.",
      features: [
        "컬렉션 전략 & 포지셔닝",
        "화이트리스트 캠페인 관리",
        "디스코드 & 커뮤니티 셋업",
        "마켓플레이스 최적화",
        "2차 판매 전략",
        "홀더 베네핏 프로그램",
      ],
    },
    {
      id: "defi-marketing",
      title: "DeFi 마케팅",
      description: "유동성 프로그램, 일드 파밍 캠페인, TVL 성장을 위한 DeFi 프로토콜 전문 마케팅.",
      fullDescription: "DeFi 프로토콜은 전문화된 마케팅 접근이 필요합니다. 타겟 캠페인과 전략적 파트너십을 통해 유동성 확보, TVL 성장, 파워 유저 커뮤니티 구축을 지원합니다.",
      features: [
        "TVL 성장 캠페인",
        "일드 파밍 프로모션",
        "유동성 마이닝 프로그램",
        "프로토콜 교육 콘텐츠",
        "DeFi 애그리게이터 리스팅",
        "보안 감사 마케팅",
      ],
    },
    {
      id: "gamefi",
      title: "GameFi",
      description: "한국 게임 시장을 타겟으로 한 P2E 및 GameFi 프로젝트 게이밍 중심 마케팅 전략.",
      fullDescription: "한국은 세계 최대 게임 시장 중 하나입니다. 문화에 맞게 조정된 캠페인과 한국 게임 인플루언서와의 파트너십을 통해 블록체인 게임이 이 유망한 시장에 진출할 수 있도록 지원합니다.",
      features: [
        "게임 인플루언서 캠페인",
        "e스포츠 파트너십",
        "P2E 커뮤니티 구축",
        "길드 파트너십",
        "게임 리뷰 플레이스먼트",
        "베타 테스팅 캠페인",
      ],
    },
    {
      id: "exchange-listing",
      title: "거래소 리스팅",
      description: "문서 작성 및 협상을 포함한 한국 및 글로벌 거래소 리스팅 전문 지원.",
      fullDescription: "한국 및 글로벌 거래소 리스팅의 복잡한 과정을 함께합니다. 주요 거래소와의 관계를 바탕으로 컴플라이언스 요구사항과 협상 과정을 안내합니다.",
      features: [
        "거래소 신청 지원",
        "문서 준비",
        "컴플라이언스 컨설팅",
        "마켓 메이킹 파트너십",
        "리스팅 발표",
        "리스팅 후 지원",
      ],
    },
    {
      id: "advisory",
      title: "자문 서비스",
      description: "한국 시장에서의 토크노믹스, GTM 전략, 규제 컴플라이언스 전략 컨설팅.",
      fullDescription: "업계 베테랑들의 전략적 가이던스를 받으세요. 규제 고려사항부터 토크노믹스 설계, GTM 전략까지 한국 크립토 시장을 탐색할 수 있도록 지원합니다.",
      features: [
        "토크노믹스 컨설팅",
        "GTM 전략",
        "규제 가이던스",
        "파트너십 연결",
        "IR (투자자 관계)",
        "위기 관리",
      ],
    },
  ],
  modal: {
    includedLabel: "포함 사항",
    getStarted: "시작하기",
    close: "닫기",
  },
  learnMore: "자세히 보기",
};

// =====================================================
// 포트폴리오/프로젝트 섹션
// =====================================================
export const portfolio = {
  badge: "포트폴리오",
  headline: "주요 <highlight>프로젝트</highlight>",
  viewAll: "전체 보기",
  fundsRaised: "자금 조달",
  activeLabel: "● 활성",
  projects: [
    {
      id: "metaverse-korea",
      name: "메타버스 코리아",
      category: "NFT",
      raised: "$12M",
      description: "가상 부동산과 소셜 기능을 갖춘 한국 대표 메타버스 플랫폼.",
    },
    {
      id: "kimchiswap",
      name: "김치스왑",
      category: "DeFi",
      raised: "$8.5M",
      description: "혁신적인 AMM과 일드 파밍 프로토콜을 갖춘 한국 대표 DEX.",
    },
    {
      id: "seoul-dao",
      name: "서울DAO",
      category: "Web3",
      raised: "$15M",
      description: "한국 Web3 생태계 발전을 위한 탈중앙화 자율 조직.",
    },
    {
      id: "k-play",
      name: "K-Play",
      category: "GameFi",
      raised: "$20M",
      description: "한국 최고 게임 IP를 활용한 P2E 게이밍 플랫폼.",
    },
  ],
};

// =====================================================
// CTA 섹션
// =====================================================
export const cta = {
  badge: "무료 상담 가능",
  headline: {
    line1: "프로젝트를 런칭할",
    highlight: "준비가 되셨나요?",
  },
  description: "Web3 마케팅 전문가와 무료 상담을 통해 한국 시장에서 성공하는 방법을 알아보세요.",
  buttons: {
    primary: "상담 예약하기",
    secondary: "메시지 보내기",
  },
  contactLinks: {
    telegram: "텔레그램",
    kakao: "카카오톡",
  },
};

// =====================================================
// 푸터
// =====================================================
export const footer = {
  servicesTitle: "서비스",
  companyTitle: "회사",
  services: [
    { name: "Web3 마케팅", href: "/services" },
    { name: "NFT 마케팅", href: "/services" },
    { name: "DeFi 마케팅", href: "/services" },
    { name: "거래소 리스팅", href: "/services" },
  ],
  company: [
    { name: "회사 소개", href: "/about" },
    { name: "케이스 스터디", href: "/projects" },
    { name: "블로그", href: "#" },
    { name: "문의하기", href: "/contact" },
  ],
  social: ["LinkedIn", "Telegram", "Twitter"],
  legal: {
    privacy: "개인정보처리방침",
    terms: "이용약관",
  },
};

// =====================================================
// About 페이지
// =====================================================
export const about = {
  pageTitle: "회사 소개",
  pageDescription: "CryptoBridge는 한국 최고의 Web3 전문 마케팅 에이전시입니다. 블록체인 프로젝트의 성공적인 런칭과 성장을 지원합니다.",
  
  mission: {
    title: "Our <highlight>Mission</highlight>",
    description1: "우리는 혁신적인 Web3 프로젝트들이 글로벌 시장에서 성공할 수 있도록 전략적 마케팅 파트너십을 제공합니다. 단순한 홍보를 넘어, 지속 가능한 커뮤니티와 브랜드 가치를 구축합니다.",
    description2: "2021년 설립 이후, 100개 이상의 프로젝트와 함께 $500M 이상의 자금 조달을 지원했습니다.",
    stats: [
      { value: "100+", label: "런칭 프로젝트" },
      { value: "$500M+", label: "자금 조달" },
      { value: "50+", label: "팀 멤버" },
      { value: "30+", label: "진출 국가" },
    ],
  },
  
  valuesTitle: "Our <highlight>Values</highlight>",
  values: [
    {
      title: "결과 중심",
      description: "측정 가능한 성과를 통해 프로젝트의 성공을 증명합니다.",
    },
    {
      title: "혁신",
      description: "최신 트렌드와 기술을 활용한 혁신적인 마케팅 전략을 제시합니다.",
    },
    {
      title: "커뮤니티 우선",
      description: "진정성 있는 커뮤니티 구축이 Web3 성공의 핵심입니다.",
    },
    {
      title: "글로벌 확장",
      description: "한국을 넘어 글로벌 시장으로의 확장을 지원합니다.",
    },
  ],
  
  teamTitle: "Our <highlight>Team</highlight>",
  team: [
    {
      name: "James",
      role: "Co-Founder",
      description: "Web3 전략 및 비즈니스 개발 전문가",
    },
    {
      name: "David",
      role: "Co-Founder",
      description: "블록체인 마케팅 및 커뮤니티 성장 전문가",
    },
  ],
};

// =====================================================
// Contact 페이지
// =====================================================
export const contact = {
  pageTitle: "문의하기",
  pageDescription: "프로젝트에 대해 이야기해 보세요. 무료 상담을 통해 최적의 마케팅 전략을 제안해 드립니다.",
  
  form: {
    title: "메시지 보내기",
    nameLabel: "이름 *",
    namePlaceholder: "홍길동",
    emailLabel: "이메일 *",
    emailPlaceholder: "hello@example.com",
    companyLabel: "회사/프로젝트명",
    companyPlaceholder: "CryptoBridge",
    messageLabel: "메시지 *",
    messagePlaceholder: "프로젝트에 대해 알려주세요...",
    submitButton: "메시지 보내기",
    successTitle: "메시지가 전송되었습니다!",
    successMessage: "빠른 시일 내에 연락드리겠습니다.",
  },
  
  info: {
    title: "연락처 정보",
    items: [
      { type: "email", label: "이메일" },
      { type: "phone", label: "전화" },
      { type: "address", label: "주소" },
      { type: "telegram", label: "텔레그램" },
    ],
  },
  
  officeHours: {
    title: "영업 시간",
    weekday: { label: "월요일 - 금요일", time: "09:00 - 18:00" },
    saturday: { label: "토요일", time: "10:00 - 14:00" },
    sunday: { label: "일요일", time: "휴무" },
  },
  
  mapTitle: "오시는 <highlight>길</highlight>",
};

// =====================================================
// Services 페이지
// =====================================================
export const servicesPage = {
  pageTitle: "서비스",
  pageDescription: "Web3 프로젝트의 성공을 위한 종합적인 마케팅 솔루션을 제공합니다. 전략 수립부터 실행까지 원스톱으로 지원합니다.",
};

// =====================================================
// Projects 페이지
// =====================================================
export const projectsPage = {
  pageTitle: "프로젝트",
  pageDescription: "성공적으로 런칭한 Web3 프로젝트들을 확인하세요. 각 프로젝트의 성장 스토리와 성과를 공유합니다.",
};

// =====================================================
// 인트로 애니메이션
// =====================================================
export const intro = {
  tagline: "Web3 마케팅 에이전시",
};
