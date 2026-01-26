
# 히어로 섹션 동영상 일괄 변경 계획

## 요약
업로드된 9개의 MP4 파일을 해당 페이지들의 히어로 섹션 동영상으로 교체합니다.

## 영상 매핑 (확인됨)

| # | 페이지 | 현재 영상 파일 | 새 영상 파일 |
|---|--------|---------------|-------------|
| 1 | Home (/) | `/videos/hero-background.mp4` | `home.mp4` |
| 2 | PR & Media | `/videos/pr-hero.mp4` | `PR_media.mp4` |
| 3 | Research | `/videos/research-background.mp4` | `kbw_앞2.mp4` |
| 4 | Offline Event | `/videos/offline-event-hero.mp4` | `offline.mp4` |
| 5 | Community | `/videos/community-hero.mp4` | `community.mp4` |
| 6 | Projects (메인) | `/videos/projects-hero.mp4` | `project.mp4` |
| 7 | Influencer | `/videos/influencer-hero.mp4` | `kbw.mp4` |
| 8 | Spacecoin (프로젝트 상세) | `/videos/projects/spacecoin-hero.mp4` | `스페이스코인-2.mp4` |
| 9 | SEO & Ads | `/videos/seo-hero.mp4` | `SEO.mp4` |

---

## 작업 단계

### 1단계: 영상 파일 복사
업로드된 영상 파일들을 `public/videos/` 폴더로 복사합니다.

```text
user-uploads://home.mp4       → public/videos/hero-background.mp4
user-uploads://PR_media.mp4   → public/videos/pr-hero.mp4
user-uploads://kbw_앞2.mp4    → public/videos/research-background.mp4
user-uploads://offline.mp4    → public/videos/offline-event-hero.mp4
user-uploads://community.mp4  → public/videos/community-hero.mp4
user-uploads://project.mp4    → public/videos/projects-hero.mp4
user-uploads://kbw.mp4        → public/videos/influencer-hero.mp4
user-uploads://스페이스코인-2.mp4 → public/videos/projects/spacecoin-hero.mp4
user-uploads://SEO.mp4        → public/videos/seo-hero.mp4
```

### 2단계: 기존 파일 교체
같은 파일명으로 덮어쓰기하므로 코드 수정이 필요 없습니다.

---

## 영향 받는 컴포넌트/페이지

| 파일 | 사용하는 영상 | 코드 변경 필요 여부 |
|------|-------------|-------------------|
| `src/components/HeroSection.tsx` | `hero-background.mp4` | ❌ (파일명 동일) |
| `src/pages/PRService.tsx` | `pr-hero.mp4` | ❌ |
| `src/components/ResearchHeroSection.tsx` | `research-background.mp4` | ❌ |
| `src/pages/OfflineEventService.tsx` | `offline-event-hero.mp4` | ❌ |
| `src/pages/CommunityService.tsx` | `community-hero.mp4` | ❌ |
| `src/pages/Projects.tsx` | `projects-hero.mp4` | ❌ |
| `src/pages/InfluencerService.tsx` | `influencer-hero.mp4` | ❌ |
| `src/pages/ProjectDetail.tsx` (Spacecoin) | `spacecoin-hero.mp4` | ❌ |
| `src/pages/SEOAdsService.tsx` | `seo-hero.mp4` | ❌ |

---

## 기술 노트

- **파일 형식**: MP4 (기존과 동일)
- **코드 수정 불필요**: 기존 영상 파일명과 동일하게 교체하므로 코드 변경 없이 적용됩니다
- **캐시**: 브라우저 캐시로 인해 즉시 반영되지 않을 수 있습니다 (강력 새로고침 권장)
- **성능 권장**: 앞서 논의한 대로 8-10초, 720p, 2MB 이하로 영상 최적화 시 로딩 속도가 개선됩니다

---

## 예상 결과
- 9개 페이지의 히어로 섹션 배경 영상이 새 영상으로 교체됩니다
- 기존 로딩 로직 (poster fallback, shimmer 효과 등) 그대로 유지됩니다
