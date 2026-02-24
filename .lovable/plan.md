

## Hero 텍스트 & CTA 크기/위치 조정

현재 히어로 섹션의 헤드라인, 서브텍스트, CTA 버튼이 전체적으로 약간 작고 위치가 높은 편입니다. 아래와 같이 조정합니다.

### 변경 사항

**1. 메인 헤드라인 크기 증가**
- 현재: `text-[2.5rem] md:text-[clamp(2.5rem,5vw,4rem)]`
- 변경: `text-[2.8rem] md:text-[clamp(3rem,5.5vw,4.5rem)]`
- 더 임팩트 있는 첫인상 제공

**2. 서브텍스트 크기 증가**
- 현재: `sm:text-body-base md:text-body-lg`
- 변경: `sm:text-base md:text-lg`
- 가독성 향상

**3. CTA 버튼 크기 증가**
- 패딩: `sm:px-8 sm:py-4` → `sm:px-10 sm:py-5`
- 폰트: `sm:text-base` → `sm:text-lg`
- 최소 높이: `sm:min-h-[50px]` → `sm:min-h-[56px]`
- 더 눈에 띄는 전환 포인트 역할

**4. 마이크로 카피 크기 소폭 증가**
- `sm:text-xs` → `sm:text-sm`

### 수정 파일
- `src/components/HeroSection.tsx` (lines 242-268)

### 기술 상세

h1 태그의 `font-size` 클래스와 CTA `<a>` 태그의 padding/font-size 클래스를 Tailwind 유틸리티 클래스로 조정합니다. 모바일 크기는 현재 수준을 유지하고, `sm` 이상 브레이크포인트에서만 크기를 키웁니다.

