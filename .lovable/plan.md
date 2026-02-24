
# Stats 숫자 크기 확대

현재 `text-7xl md:text-9xl`인 스탯 숫자를 더 크게 키웁니다.

## 변경 사항

**파일: `src/components/StatsSection.tsx`**

- 스탯 숫자 크기: `text-7xl md:text-9xl` → `text-8xl md:text-[10rem]`
  - 모바일: 8xl (6rem / 96px)
  - 데스크탑: 10rem (160px) - Tailwind 기본 스케일을 넘어서 커스텀 값 사용
- `font-bold` → `font-black`으로 더 두껍게
- 카드 패딩도 `p-12 md:p-16` → `p-14 md:p-20`으로 여유 확보
