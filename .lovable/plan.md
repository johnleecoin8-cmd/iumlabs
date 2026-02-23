

# 경쟁사 벤치마크 기반 개선 구현 계획

리드 마그넷, 테스티모니얼, 프라이싱, 팀 소개를 제외한 2가지 개선 사항을 진행합니다.

---

## 1. 홈페이지 Trust Badges 섹션 추가

현재 MediaPartnersSection(미디어 로고 마키)과 ClientLogosSection(클라이언트 로고)은 있지만, 미디어 노출 실적을 강조하는 "As Featured In" 스타일의 신뢰 배지 섹션이 없습니다.

**작업 내용:**
- 새 컴포넌트 `TrustBadgesSection.tsx` 생성
- 미디어 출연/보도 실적을 강조하는 배지 스타일 (예: "Featured in CoinDesk", "Covered by Cointelegraph" 등)
- 기존 MediaPartnersSection 바로 위 또는 Hero 바로 아래(01 About 섹션 전)에 배치
- 미니멀한 수평 배열, 기존 디자인 톤(다크 배경, 작은 텍스트, 얇은 보더)과 일관성 유지
- 모바일에서는 2열 또는 수평 스크롤

**배치 위치 (Index.tsx):**
- Hero 섹션과 01 About 섹션 사이에 삽입

---

## 2. 프로젝트 상세 페이지 Before/After 성장 차트 추가

현재 프로젝트 상세 페이지의 메트릭은 정적 숫자 카드(MetricCard)로만 표시됩니다. 경쟁사들은 시간 기반 성장 그래프와 Before/After 비교를 활용합니다.

**작업 내용:**
- 새 컴포넌트 `ProjectGrowthChart.tsx` 생성
- Recharts (이미 설치됨)를 사용하여 간단한 Before/After 바 차트 또는 라인 차트 렌더링
- 데이터 소스: 각 프로젝트의 기존 metrics 배열을 활용 (value에서 숫자 추출하여 Before=0 기준, After=실제값으로 시각화)
- `ProjectContentSection.tsx`의 메트릭 그리드 아래에 차트 섹션 추가
- 프로젝트 glowColor를 차트 액센트 색상으로 활용
- 모바일 반응형 대응

---

## 수정/생성 파일 목록

| 파일 | 작업 |
|------|------|
| `src/components/TrustBadgesSection.tsx` | 신규 생성 - Trust Badges 컴포넌트 |
| `src/pages/Index.tsx` | Trust Badges 섹션 삽입 |
| `src/components/project-detail/ProjectGrowthChart.tsx` | 신규 생성 - Before/After 차트 |
| `src/components/project-detail/ProjectContentSection.tsx` | 차트 컴포넌트 삽입 |

---

## 기술 세부사항

- TrustBadgesSection: 기존 미디어 로고 에셋(`@/assets/logos/`) 재활용, framer-motion 애니메이션 적용
- ProjectGrowthChart: recharts `BarChart` 사용, 프로젝트 metrics 데이터에서 숫자값 자동 파싱, 반응형 `ResponsiveContainer`
- 기존 미니멀 디자인 원칙 준수 (불필요한 장식 요소 배제)
