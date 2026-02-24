

# Insights와 Contact 사이 임팩트 CTA 섹션 추가

## 개요
Insights (04)와 Contact (05) 섹션 사이에 풀스크린 느낌의 임팩트 있는 "함께하자" 섹션을 추가합니다. 콘텐츠를 다 본 사용자가 Contact으로 넘어가기 전, 강렬한 한 방을 주는 역할입니다.

## 디자인 컨셉
- **풀 뷰포트 높이** (min-h-[60vh]) 의 임팩트 섹션
- 중앙에 큰 타이포그래피: "Ready to Enter Korea?" 또는 "Your Bridge to Korea Starts Here"
- 배경에 은은한 글로우 애니메이션 (framer-motion)
- 핵심 수치 3개를 한 줄로 (15+ Projects / $50M+ Ecosystem / 24h Response)
- 하단에 CTA 버튼 2개: "Book a Call" (Calendly) + "View Our Work" (Projects 페이지)
- 스크롤 시 텍스트가 fade-up으로 순차 등장

## 구현 파일

### 1. 새 컴포넌트 생성: `src/components/PartnerCTASection.tsx`
- 풀폭 다크 배경 (`bg-[#0A0A0A]`)에 중앙 정렬 레이아웃
- framer-motion `useInView`로 스크롤 진입 시 텍스트 애니메이션
- 상단 작은 라벨: "PARTNER WITH US"
- 메인 헤드라인: 큰 텍스트 (text-4xl ~ text-7xl)
- 서브 텍스트: 한 줄 설명
- 핵심 수치 3개 가로 배치 (border 구분)
- CTA 버튼 2개 (흰색 primary + outline secondary)
- 배경에 그라디언트 글로우 원형 2개 (subtle, animated)

### 2. `src/pages/Index.tsx` 수정
- Insights 섹션과 Contact 섹션 사이에 `PartnerCTASection` 삽입
- Lazy load 적용 + AnimatedSection 래핑

## 기술 세부사항
- framer-motion의 `motion.div` + `whileInView`로 스크롤 트리거 애니메이션
- 반응형: 모바일에서는 수치가 세로 스택, 버튼도 풀폭
- Calendly 링크와 /projects 내부 라우팅 사용
- 기존 디자인 시스템 (bg-[#0A0A0A], border-white/10, rounded-full 버튼) 준수
- SectionIndicator에는 별도 번호 부여 없이 전환 구간으로 처리 (독립 임팩트 블록)

