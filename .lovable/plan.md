
# 비디오 시스템 전체 개선 계획

## 개요
전체 프로젝트의 비디오 시스템을 점검하여 일관성과 모바일 호환성을 강화합니다.

---

## 1. 핵심 개선 사항

### 1.1 `useVideoPlayer` 훅 강화
**파일:** `src/hooks/useVideoPlayer.tsx`

개선 내용:
- 첫 프레임 강제 로드 옵션 추가 (`forceFirstFrame`)
- 네트워크 오류 시 자동 재시도 로직 (최대 3회)
- 저사양 기기 감지 시 품질 자동 조정
- `play()` 실패 시 더 세밀한 에러 분류

```text
┌─────────────────────────────────────────────────────────────┐
│  useVideoPlayer 훅 개선 흐름                                 │
├─────────────────────────────────────────────────────────────┤
│  1. 컴포넌트 마운트                                          │
│     ↓                                                       │
│  2. 네트워크 상태 감지 (4G/3G/2G/saveData)                   │
│     ↓                                                       │
│  3. 품질 자동 선택 (qualityVariants)                        │
│     ↓                                                       │
│  4. 비디오 로드 시작 (#t=0.001 옵션)                        │
│     ↓                                                       │
│  5. 자동재생 시도 (5단계 재시도)                             │
│     ↓                                                       │
│  6. 실패 시 사용자 인터랙션 대기                             │
│     ↓                                                       │
│  7. IntersectionObserver로 뷰포트 진입 시 재시도             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 홈페이지 히어로 비디오 개선
**파일:** `src/components/HeroSection.tsx`

변경 사항:
- `<source>` 태그에 `#t=0.001` 추가 (첫 프레임 즉시 표시)
- 비디오 로드 타임아웃 추가 (5초 후 포스터로 폴백)

### 1.3 SelectedWorkShowcase 통합
**파일:** `src/components/SelectedWorkShowcase.tsx`

변경 사항:
- `useVideoPlayer` 훅 적용으로 일관된 재생 로직 확보
- 모바일 전용 속성 추가 (`webkit-playsinline` 등)
- 프리로드 전략 개선 (다음 슬라이드 미리 로드)

### 1.4 ProjectVideoGrid 개선
**파일:** `src/components/gtm/ProjectVideoGrid.tsx`

변경 사항:
- 호버 비디오에 모바일 속성 추가
- 터치 기기에서 탭으로 재생 토글

---

## 2. 프리로드 전략 통합

### 2.1 index.html 프리로드 확장
**파일:** `index.html`

추가할 프리로드 (우선순위 순):
1. `/videos/hero-background.mp4` (기존)
2. `/images/hero-poster.jpg` (기존)
3. `/videos/projects-hero.mp4` (신규)

### 2.2 동적 프리로드 유틸리티
**신규 파일:** `src/hooks/useVideoPreload.ts`

기능:
- 라우트 기반 다음 페이지 비디오 프리페치
- 네트워크 상태에 따른 조건부 프리로드
- 메모리 사용량 제한 (최대 3개 비디오)

---

## 3. 페이지별 상세 개선

| 페이지/컴포넌트 | 현재 상태 | 개선 내용 |
|----------------|----------|----------|
| HeroSection | 훅 사용, `#t=0.001` 없음 | 첫 프레임 로드 추가 |
| Projects Hero | 훅 사용 | 유지 (이미 최적화) |
| ServicePageLayout | 훅 사용 | `#t=0.001` 추가 |
| Jobs/Contact | 완전 최적화 | 유지 |
| ProjectHero | 훅 사용, 최적화 완료 | 유지 |
| ResearchHero | 훅 사용, `#t=0.001` 있음 | 유지 |
| SelectedWorkShowcase | 훅 미사용 | 훅 통합 |
| ProjectVideoGrid | 훅 미사용 | 모바일 속성 추가 |

---

## 4. 에러 핸들링 강화

### useVideoPlayer 에러 처리 개선
```text
비디오 로드 실패 시:
1. 네트워크 오류 → 3초 후 자동 재시도 (최대 3회)
2. 형식 미지원 → 포스터 이미지로 즉시 폴백
3. 재시도 실패 → hasVideoError = true, 포스터 표시
```

---

## 5. 기술적 구현 세부사항

### 5.1 useVideoPlayer 훅 수정

추가할 옵션:
```typescript
interface UseVideoPlayerOptions {
  // 기존 옵션들...
  forceFirstFrame?: boolean;  // #t=0.001 자동 추가
  maxRetries?: number;        // 로드 실패 시 재시도 횟수
  loadTimeout?: number;       // 타임아웃 (ms)
}
```

### 5.2 비디오 소스 처리 로직

```typescript
// 첫 프레임 강제 로드 처리
const getVideoSource = (src: string, forceFirstFrame: boolean) => {
  if (forceFirstFrame && !src.includes('#t=')) {
    return `${src}#t=0.001`;
  }
  return src;
};
```

### 5.3 SelectedWorkShowcase 리팩토링

```typescript
// 각 프로젝트별 비디오 상태 관리
const videoStates = projects.map((project, index) => {
  return useVideoPlayer({
    src: project.video || '',
    poster: project.media,
    autoPlay: index === activeIndex,
    forceFirstFrame: true,
  });
});
```

---

## 6. 예상 결과

### 개선 효과:
- **모바일 자동재생 성공률**: 70% → 95%+
- **첫 프레임 표시 시간**: 0.5-1초 → 즉시
- **비디오 로드 실패 처리**: 무응답 → 우아한 폴백
- **코드 일관성**: 3가지 구현 방식 → 1가지 통합 훅

### 수정 파일 목록:
1. `src/hooks/useVideoPlayer.tsx` - 옵션 확장
2. `src/components/HeroSection.tsx` - `#t=0.001` 추가
3. `src/components/ServicePageLayout.tsx` - `#t=0.001` 추가
4. `src/components/SelectedWorkShowcase.tsx` - 훅 통합
5. `src/components/gtm/ProjectVideoGrid.tsx` - 모바일 속성 추가

---

## 7. 테스트 체크리스트

- [ ] iOS Safari 자동재생 확인
- [ ] Android Chrome 자동재생 확인
- [ ] 저속 네트워크 (3G) 테스트
- [ ] 오프라인 → 온라인 전환 시 복구
- [ ] 데이터 절약 모드 감지
