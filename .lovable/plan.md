
# 모바일 히어로 비디오 재생버튼 제거 및 즉시 재생 수정

## 문제 분석

### 현재 상황
- `controls: false` 설정이 되어 있지만, 모바일 브라우저(iOS Safari, Android Chrome)에서는 비디오가 로드 중일 때 **네이티브 재생 버튼 오버레이**를 표시함
- 비디오 요소가 `opacity: 0`이어도 네이티브 플레이 버튼은 보임
- `isVideoReady` 상태가 `true`가 되기 전에 비디오 요소가 DOM에 있어서 문제 발생

### 근본 원인
1. **비디오 요소가 너무 일찍 렌더링됨**: `opacity: 0`으로 숨겨도 네이티브 컨트롤은 보임
2. **CSS로 네이티브 컨트롤을 완전히 숨기지 않음**: `controls: false`만으로는 모든 브라우저에서 동작하지 않음
3. **`visibility` 속성 미사용**: `opacity`만 사용하면 요소는 여전히 상호작용 가능

---

## 수정 계획

### 1단계: CSS로 네이티브 비디오 컨트롤 완전 숨기기 (index.css)
- 전역 CSS에서 모든 비디오의 네이티브 컨트롤 숨기기
- `video::-webkit-media-controls` 등 벤더별 셀렉터 추가

```css
/* 모바일 네이티브 비디오 컨트롤 완전 숨기기 */
video::-webkit-media-controls,
video::-webkit-media-controls-panel,
video::-webkit-media-controls-play-button,
video::-webkit-media-controls-start-playback-button,
video::-webkit-media-controls-overlay-play-button,
video::-webkit-media-controls-enclosure,
video::-webkit-media-controls-container {
  display: none !important;
  -webkit-appearance: none !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

video::-moz-media-controls {
  display: none !important;
}

video::media-controls {
  display: none !important;
}

video {
  -webkit-appearance: none;
}
```

### 2단계: useVideoPlayer 훅 수정 - visibility 추가
- `opacity: 0`에서 `visibility: hidden`도 함께 사용
- 비디오가 준비되지 않았을 때 완전히 숨김

```typescript
// videoProps.style 수정
style: {
  opacity: isVideoReady ? 1 : 0,
  visibility: isVideoReady ? 'visible' : 'hidden',
  transition: 'opacity 180ms ease, visibility 0s linear 0s',
} as React.CSSProperties,
```

### 3단계: HeroSection에서 조건부 렌더링 강화
- `isVideoReady`가 `true`일 때만 비디오 요소를 DOM에 추가하는 대신
- 더 안전하게 `pointer-events: none` 추가

### 4단계: 추가 모바일 비디오 속성 강화
- `controlsList="nodownload nofullscreen noplaybackrate"` 추가
- `disableRemotePlayback` 추가

---

## 기술적 세부사항

### 수정 파일
| 파일 | 변경 내용 |
|------|-----------|
| `src/index.css` | 네이티브 비디오 컨트롤 숨기는 CSS 추가 |
| `src/hooks/useVideoPlayer.tsx` | visibility 스타일 추가, 추가 속성 |
| `src/components/HeroSection.tsx` | pointer-events 및 z-index 조정 |

### 예상 결과
- ✅ 모바일에서 재생 버튼이 절대 보이지 않음
- ✅ 포스터 이미지가 비디오 로드 전까지 표시됨
- ✅ 비디오가 준비되면 자연스럽게 재생 시작
- ✅ iOS Safari, Android Chrome 모두 호환
