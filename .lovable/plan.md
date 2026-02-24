
# 모바일에서 03 Cases 마퀴 터치 시 멈추지 않게 수정

## 문제
`src/components/gtm/PerformanceSection.tsx`의 `MarqueeRow` 컴포넌트에서 `onTouchStart` 이벤트가 `setIsPaused(true)`를 호출하여 모바일에서 마퀴를 터치하면 애니메이션이 멈춤. 이로 인해 모바일에서 의도치 않은 클릭/인터랙션이 발생.

## 수정 내용

### `src/components/gtm/PerformanceSection.tsx`
- `MarqueeRow` 컴포넌트에서 터치 관련 핸들러 제거:
  - `onTouchStart`, `onTouchMove`, `onTouchEnd` 이벤트 리스너 삭제
  - `isPaused`, `dragStart`, `dragOffset` state 삭제
  - `motion.div`의 `animate`에서 `isPaused` 분기 제거 -- 항상 무한 루프 애니메이션만 실행
- 데스크탑 hover pause도 이 컴포넌트에는 없으므로 별도 처리 불필요
- 결과: 마퀴가 모바일/데스크탑 모두에서 항상 자동 스크롤, 터치해도 멈추지 않음
