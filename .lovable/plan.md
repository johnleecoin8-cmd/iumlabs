
# 비주얼 이슈 및 SEO 일괄 수정 계획

## 수정 항목 3가지

---

### 1. 빈 CTABannerSection 컴포넌트 제거

빈 `<section>` 태그가 약 200px의 불필요한 여백을 생성하고 있습니다.

**작업 내용:**
- 아래 7개 페이지에서 `CTABannerSection` import 및 사용 제거:
  - `Index.tsx`, `GTMService.tsx`, `Contact.tsx`, `Projects.tsx`, `Jobs.tsx`, `Research.tsx`, `ServicePageLayout.tsx`
- `CTABannerSection.tsx` 파일 삭제

---

### 2. 04 Cases 섹션 가독성 개선

배경 이미지 위 텍스트가 읽기 어렵고, 모바일에서 카드가 잘리는 문제가 있습니다.

**작업 내용 (PerformanceSection.tsx):**
- 오버레이 불투명도 증가: `bg-black/70` -> `bg-black/80`
- 모바일 카드 크기 미세 조정으로 잘림 방지

---

### 3. 서비스 별칭 페이지 Canonical URL 적용

`/kol-marketing`, `/growth-marketing`, `/community-growth`, `/research-data` 4개 별칭이 주요 서비스 URL과 중복 색인되고 있습니다.

현재 서비스 페이지는 `usePageMeta` 훅을 사용하며 canonical 설정이 없습니다.

**작업 내용:**
- `usePageMeta` 훅에 `canonicalPath` 옵션 추가
- 각 서비스 페이지에서 현재 경로를 감지하여 별칭 접근 시 canonical을 주요 URL로 설정:

| 별칭 경로 | Canonical |
|-----------|-----------|
| `/kol-marketing` | `/services/influencer` |
| `/growth-marketing` | `/services/gtm` |
| `/community-growth` | `/services/community` |
| `/research-data` | `/services/deep-research` |

---

## 수정 파일 목록

| 파일 | 작업 |
|------|------|
| `src/components/CTABannerSection.tsx` | 삭제 |
| `src/pages/Index.tsx` | CTABanner 제거 |
| `src/pages/GTMService.tsx` | CTABanner 제거 |
| `src/pages/Contact.tsx` | CTABanner 제거 |
| `src/pages/Projects.tsx` | CTABanner 제거 |
| `src/pages/Jobs.tsx` | CTABanner 제거 |
| `src/pages/Research.tsx` | CTABanner 제거 |
| `src/components/ServicePageLayout.tsx` | CTABanner 제거 |
| `src/components/gtm/PerformanceSection.tsx` | 오버레이 강화 |
| `src/hooks/usePageMeta.tsx` | canonical 지원 추가 |
| `src/pages/InfluencerService.tsx` | canonical 적용 |
| `src/pages/GTMService.tsx` | canonical 적용 |
| `src/pages/CommunityService.tsx` | canonical 적용 |
| `src/pages/DeepResearchService.tsx` | canonical 적용 |
