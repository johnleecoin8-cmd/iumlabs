
# Google Search Console SEO 문제 해결 계획

## 발견된 문제들

### 1. "적절한 표준 태그가 포함된 대체 페이지" (Alternate page with proper canonical tag)
- **영향 받은 URL**: `https://iumlabs.io/blog/kol-marketing`, `https://iumlabs.io/?s={search_term_string}`
- **원인**: 검색 파라미터(`?s=`) URL이 크롤링되고 있으나 차단되지 않음

### 2. `/research` 경로 문제
- **영향 받은 URL**: `https://iumlabs.io/research` (2026.2.6 크롤링됨)
- **원인**: `/research` → `/blog`로 리브랜딩했지만:
  - 301 리다이렉트가 없음
  - 코드 내 `/research` 링크가 여전히 존재 (GTMService.tsx, DeepResearchService.tsx 등)
  - 구글이 여전히 `/research` URL을 크롤링 중

### 3. 중복 콘텐츠 가능성
- `/kol-marketing`과 `/services/influencer`가 동일한 컴포넌트를 렌더링
- 두 URL 모두 sitemap에 있음

---

## 해결 방안

### Phase 1: robots.txt 업데이트
**목표**: 검색 파라미터 URL 크롤링 차단

```text
# robots.txt에 추가
Disallow: /*?s=*
Disallow: /*?search*
Disallow: /?*
```

### Phase 2: 301 리다이렉트 추가
**목표**: 이전 URL에서 새 URL로 영구 리다이렉트

```text
# _redirects에 추가
/research  /blog  301
/research/*  /blog/:splat  301
```

### Phase 3: 내부 링크 수정
**목표**: 코드 내 모든 `/research` 참조를 `/blog`로 변경

| 파일 | 현재 | 변경 |
|------|------|------|
| `src/pages/GTMService.tsx` | `/research` | `/blog` |
| `src/pages/DeepResearchService.tsx` | `/research`, `/research/${slug}` | `/blog`, `/blog/${slug}` |
| `src/pages/admin/ResearchForm.tsx` | `/ium-admin/research` | `/ium-admin/blog` |
| `src/hooks/useVideoPreload.ts` | `'/research'` | `'/blog'` |

### Phase 4: Canonical URL 명확화
**목표**: 서비스 별칭 URL에 기본 canonical 지정

| 별칭 URL | Canonical URL |
|----------|---------------|
| `/kol-marketing` | `/services/influencer` |
| `/growth-marketing` | `/services/gtm` |
| `/community-growth` | `/services/community` |
| `/research-data` | `/services/deep-research` |

**또는** sitemap에서 중복 URL 제거

### Phase 5: Sitemap 정리
- Story Protocol 관련 URL 제거 (숨김 처리됨)
- `lastmod` 날짜 업데이트
- 중복 서비스 URL 정리

---

## 구현 순서

```text
1. robots.txt 업데이트 (검색 파라미터 차단)
2. _redirects에 /research → /blog 301 리다이렉트 추가
3. 코드 내 /research 링크를 /blog로 변경 (4개 파일)
4. sitemap.xml에서 Story Protocol 제거 + 날짜 업데이트
5. 별칭 URL에 canonical 태그 추가 (선택)
```

---

## 예상 결과
- 검색 파라미터 URL 크롤링 중단
- `/research` → `/blog` 리다이렉트로 SEO 가치 보존
- 중복 콘텐츠 문제 해결
- Google Search Console에서 "적절한 표준 태그" 오류 해소

---

## 기술 세부사항

### _redirects 파일 변경
```text
# 기존
/*  /index.html  200

# 변경
/research  /blog  301
/research/*  /blog/:splat  301
/*  /index.html  200
```

### robots.txt 추가 규칙
```text
# Block search parameter URLs
Disallow: /*?
Disallow: /*?s=*
```

### 서비스 페이지 Canonical 처리 (SEOHead.tsx)
서비스 별칭 페이지에서 주요 URL을 canonical로 지정하는 props 추가
