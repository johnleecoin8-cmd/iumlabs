

## 비디오 첫 프레임 → 포스터 이미지 자동 생성 계획

### 현재 상황 분석

#### 비디오 파일 (18개)
| 경로 | 현재 포스터 |
|------|------------|
| `/videos/hero-background.mp4` | `/images/hero-poster.jpg` ✅ 있음 |
| `/videos/projects-hero.mp4` | `/images/projects-hero-poster.jpg` ✅ 있음 |
| `/videos/contact-hero.mp4` | `/images/contact-hero-poster.jpg` ✅ 있음 |
| `/videos/services-hero.mp4` | `/images/posters/services-hero.jpg` ✅ 있음 |
| `/videos/gtm-hero.mp4` | `/images/posters/gtm-hero.jpg` ✅ 있음 |
| `/videos/community-hero.mp4` | `/images/posters/community-hero.jpg` ❌ 없음 |
| `/videos/influencer-hero.mp4` | `/images/posters/influencer-hero.jpg` ❌ 없음 |
| `/videos/pr-hero.mp4` | `/images/posters/pr-hero.jpg` ❌ 없음 |
| `/videos/branding-hero.mp4` | `/images/posters/branding-hero.jpg` ❌ 없음 |
| `/videos/seo-hero.mp4` | `/images/posters/seo-hero.jpg` ❌ 없음 |
| `/videos/offline-event-hero.mp4` | `/images/posters/offline-event-hero.jpg` ❌ 없음 |
| `/videos/deep-research-hero.mp4` | `/images/posters/deep-research-hero.jpg` ❌ 없음 |
| `/videos/jobs-hero.mp4` | `/images/hero-poster.jpg` (기본값) ❌ 전용 없음 |
| `/videos/research-background.mp4` | `/images/hero-poster.jpg` (기본값) ❌ 전용 없음 |
| `/videos/yap-hero.mp4` | 미확인 ❌ |
| `/videos/projects/story-hero.mp4` | ❌ 없음 |
| `/videos/projects/mantra-hero.mp4` | ❌ 없음 |
| `/videos/projects/peaq-hero.mp4` 외 5개 | ❌ 없음 |

**결론**: 약 13개의 비디오에 전용 포스터 이미지가 없음

---

### 제안: 자동화 Edge Function 생성

비디오 첫 프레임(0:01초)을 스크린샷으로 캡처하여 포스터로 저장하는 **Edge Function**을 만들 수 있습니다.

```text
┌─────────────────────────────────────────────────────────┐
│                 포스터 생성 워크플로우                    │
├─────────────────────────────────────────────────────────┤
│  1. 비디오 파일 URL 입력                                 │
│  2. FFmpeg/Canvas API로 0:01초 프레임 추출              │
│  3. JPEG로 인코딩 (품질 85%)                            │
│  4. Lovable Cloud Storage에 업로드                      │
│  5. /public/images/posters/ 경로에 저장                 │
└─────────────────────────────────────────────────────────┘
```

---

### 제약 사항

**브라우저/Edge Function 환경에서 비디오 프레임 추출의 한계:**

1. **FFmpeg 불가**: Edge Function은 FFmpeg를 실행할 수 없음
2. **Canvas 제약**: 서버사이드에서 `<video>` 요소와 Canvas를 사용할 수 없음
3. **외부 API 필요**: Cloudinary, AWS Lambda + FFmpeg Layer, 또는 전용 미디어 처리 서비스 필요

---

### 실현 가능한 대안

#### 옵션 A: 수동 스크린샷 (권장 - 가장 빠름)
1. 각 비디오를 VLC/QuickTime에서 열기
2. 0:01초 지점에서 스크린샷 캡처
3. `/public/images/posters/` 폴더에 저장
4. 파일명 규칙: `{video-name}.jpg` (예: `community-hero.jpg`)

#### 옵션 B: 로컬 스크립트 (반자동)
사용자가 로컬에서 실행할 Node.js + FFmpeg 스크립트 제공

#### 옵션 C: 외부 서비스 연동
Cloudinary 등 미디어 처리 API 연동 (추가 비용 발생)

---

### 코드 변경 사항 (포스터 경로 표준화)

포스터 이미지가 준비되면, 코드에서 포스터 경로만 업데이트하면 됩니다:

| 파일 | 현재 | 변경 |
|------|------|------|
| `Jobs.tsx` | `'/images/hero-poster.jpg'` | `'/images/posters/jobs-hero.jpg'` |
| `ResearchHeroSection.tsx` | `'/images/hero-poster.jpg'` | `'/images/posters/research-hero.jpg'` |
| + 각 서비스 페이지 | posterSrc 이미 지정됨 | 파일만 생성하면 됨 |

---

### 권장 진행 방향

**자동화는 기술적으로 복잡하고 외부 서비스가 필요합니다.**

가장 현실적인 방법:
1. **수동 스크린샷**: 비디오 13개 × 약 30초 = **약 10분** 소요
2. 스크린샷을 제공해 주시면, 제가 코드에 경로를 업데이트하고 파일을 올바른 위치에 저장

**필요한 포스터 목록** (13개):
```text
public/images/posters/
├── community-hero.jpg      ← /videos/community-hero.mp4
├── influencer-hero.jpg     ← /videos/influencer-hero.mp4
├── pr-hero.jpg             ← /videos/pr-hero.mp4
├── branding-hero.jpg       ← /videos/branding-hero.mp4
├── seo-hero.jpg            ← /videos/seo-hero.mp4
├── offline-event-hero.jpg  ← /videos/offline-event-hero.mp4
├── deep-research-hero.jpg  ← /videos/deep-research-hero.mp4
├── jobs-hero.jpg           ← /videos/jobs-hero.mp4
├── research-hero.jpg       ← /videos/research-background.mp4
├── yap-hero.jpg            ← /videos/yap-hero.mp4
└── projects/
    ├── story-hero.jpg
    ├── mantra-hero.jpg
    ├── peaq-hero.jpg
    ├── sahara-hero.jpg
    ├── kucoin-hero.jpg
    ├── bybit-hero.jpg
    ├── bnb-hero.jpg
    └── spacecoin-hero.jpg
```

---

### 요약

| 접근법 | 가능 여부 | 소요 시간 | 추가 비용 |
|--------|----------|----------|----------|
| Edge Function 자동화 | ❌ 불가 | - | - |
| 외부 API (Cloudinary) | ✅ 가능 | 2-3시간 | 유료 |
| 수동 스크린샷 | ✅ 가능 | 10-15분 | 무료 |
| 로컬 FFmpeg 스크립트 | ✅ 가능 | 30분 | 무료 |

**수동 방식이 가장 빠르고 비용이 없습니다.** 스크린샷을 첨부해 주시면 즉시 적용하겠습니다.

