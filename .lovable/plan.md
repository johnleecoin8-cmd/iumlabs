
# 비디오 자동재생 및 React Hook 에러 해결 계획

## 문제 요약
1. **React "Should have a queue" 에러**: `PerformanceSection.tsx`의 `MarqueeRow` 컴포넌트에서 `useMobileOptimization()` 호출 시 발생
2. **홈 히어로 비디오 재생 안됨**: 위 에러로 인해 React 앱 전체가 불안정해져 비디오 재생 로직이 제대로 실행되지 않음

---

## 해결 전략

### 1. `useMobileOptimization` 훅 단순화

**파일**: `src/hooks/useMobileOptimization.tsx`

현재 문제점:
- `isHydrated` state와 두 개의 분리된 `useEffect`가 복잡성을 유발
- 각각의 `useEffect`에서 동일한 `checkPerformance` 함수를 별도로 정의

수정 방향:
- 단일 `useEffect`로 통합
- `isHydrated` state 제거 (불필요한 복잡성)
- 초기 상태를 SSR-safe하게 설정

```text
변경 전:
┌─────────────────────────────────────────┐
│ useState (초기값: 모두 false)            │
│ useState (isHydrated)                   │
│ useEffect #1 (hydration)                │
│ useEffect #2 (resize + motion listener) │
└─────────────────────────────────────────┘

변경 후:
┌─────────────────────────────────────────┐
│ useState (초기값: 모두 false)            │
│ useEffect #1 (통합된 단일 effect)        │
│   - 마운트 시 즉시 상태 체크             │
│   - resize 리스너 등록                   │
│   - motion preference 리스너 등록        │
└─────────────────────────────────────────┘
```

### 2. 수정 코드

```typescript
export const useMobileOptimization = (): MobileOptimizationState => {
  const [state, setState] = useState<MobileOptimizationState>({
    isMobile: false,
    isLowPerformance: false,
    prefersReducedMotion: false,
    shouldDisableHeavyAnimations: false,
    shouldDisable3D: false,
    shouldDisableVideo: false,
  });

  useEffect(() => {
    const checkPerformance = () => {
      const isMobile = 
        window.innerWidth < 1024 || 
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      const isLowPerformance = 
        (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4) ||
        ((navigator as any).deviceMemory !== undefined && (navigator as any).deviceMemory <= 4) ||
        /Android/.test(navigator.userAgent) ||
        /iPhone|iPad|iPod/.test(navigator.userAgent);
      
      const shouldDisableHeavyAnimations = isMobile || prefersReducedMotion || isLowPerformance;
      const shouldDisable3D = isMobile || isLowPerformance;
      const shouldDisableVideo = prefersReducedMotion;

      setState({
        isMobile,
        isLowPerformance,
        prefersReducedMotion,
        shouldDisableHeavyAnimations,
        shouldDisable3D,
        shouldDisableVideo,
      });
    };

    // 마운트 시 즉시 체크
    checkPerformance();

    // Debounced resize handler
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkPerformance, 500);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', checkPerformance);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', checkPerformance);
      clearTimeout(resizeTimeout);
    };
  }, []); // 빈 dependency array - 마운트 시 한 번만 실행

  return state;
};
```

---

## 핵심 변경 사항

| 변경 전 | 변경 후 |
|---------|---------|
| `isHydrated` state 사용 | 제거 (불필요) |
| 두 개의 분리된 `useEffect` | 단일 통합 `useEffect` |
| `[isHydrated]` dependency | `[]` 빈 배열 |
| `checkPerformance` 함수 2번 정의 | 1번만 정의 |

---

## 예상 결과

1. **React "Should have a queue" 에러 해결**: 훅 구조 단순화로 fiber reconciliation 안정화
2. **홈 히어로 비디오 자동재생 복구**: React 앱이 정상 동작하면서 `useVideoPlayer` 로직 정상 실행
3. **성능 개선**: 불필요한 state 및 effect 제거로 렌더링 최적화

---

## 수정 대상 파일

| 파일 | 변경 유형 | 설명 |
|------|-----------|------|
| `src/hooks/useMobileOptimization.tsx` | 수정 | 훅 단순화 - isHydrated 제거, 단일 useEffect |

---

## 기술적 세부사항

### 왜 이 에러가 발생했는가?

React의 hook은 컴포넌트 렌더링 시 **동일한 순서**로 호출되어야 합니다. `useMobileOptimization` 훅 내부에서 두 개의 `useEffect`를 사용하고 그 중 하나가 `[isHydrated]` dependency를 가지고 있을 때, **특정 조건에서 hook 호출 타이밍이 불안정**해질 수 있습니다.

특히 `MarqueeRow`처럼 **루프 내에서 여러 번 렌더링되는 컴포넌트**에서 이 훅을 호출하면 React의 fiber reconciliation 과정에서 hook queue 불일치가 발생할 가능성이 높아집니다.

### 해결 원리

단일 `useEffect`와 빈 dependency array(`[]`)를 사용하면:
1. 마운트 시 정확히 한 번만 실행
2. Hook 호출 순서가 항상 일정
3. 루프 내 여러 인스턴스에서도 안정적으로 동작
