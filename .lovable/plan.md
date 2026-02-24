

# 히어로 섹션 마퀴 크기 축소

## 변경 내용

`src/components/HeroSection.tsx`의 Client Logo Marquee 영역을 전체적으로 한 단계씩 줄임.

### 구체적 수정

| 요소 | 현재 | 변경 |
|------|------|------|
| 컨테이너 패딩 | `py-4 sm:py-6` | `py-2 sm:py-3` |
| 배지 간격 | `gap-1.5 sm:gap-3, mx-1.5 sm:mx-3` | `gap-1 sm:gap-2, mx-1 sm:mx-2` |
| 배지 패딩 | `px-3.5 sm:px-6 py-2 sm:py-3.5` | `px-2.5 sm:px-4 py-1.5 sm:py-2` |
| 로고 이미지 높이 | `h-5 sm:h-7` | `h-3.5 sm:h-5` |
| 로고 max-width | `max-w-[110px] sm:max-w-[140px]` | `max-w-[80px] sm:max-w-[100px]` |
| 텍스트 크기 | `text-[10px] sm:text-sm` | `text-[9px] sm:text-xs` |

결과: 마퀴 전체 높이가 약 40% 줄어들어 히어로 콘텐츠에 시선이 더 집중됨.
