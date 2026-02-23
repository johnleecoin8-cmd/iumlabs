
# About 섹션 텍스트 고급화 리디자인

현재 About 섹션의 텍스트가 너무 단순하고 고급스러운 느낌이 부족합니다. 경복궁 배경 영상과 어울리는 럭셔리하고 세련된 타이포그래피로 전면 개편합니다.

## 변경 방향

### 1. 헤드라인 리디자인
- "Data-Driven" 부분을 **serif italic** (Playfair Display)로 변경하여 클래식한 고급감 부여
- "Market Entry." 부분은 기존 sans-serif bold 유지하여 serif/sans 대비 효과
- 그라데이션을 gold 톤 (`from-amber-200 via-white to-amber-100`)으로 변경하여 프리미엄 느낌 강조

### 2. 상단 라벨 변경
- 현재 `◆ Seoul, Korea` 뱃지 스타일을 thin horizontal line + 텍스트로 교체
- `Est. Seoul, Korea` 형태로 더 절제된 고급 표현

### 3. 서브 태그라인 제거 또는 리파인
- "Research · Strategy · Execution" 을 더 넓은 letter-spacing과 얇은 세리프로 변경
- 구분자를 `—` (em dash)로 교체

### 4. 본문 텍스트 개선
- 전체적으로 line-height를 더 넉넉하게 (`leading-[1.8]`)
- 하이라이트 키워드를 gold/amber 계열로 통일
- 글자 크기를 약간 키워서 여백감 확보

### 5. 하단 액센트 리디자인
- "Founded by veterans from Binance & KuCoin" 을 더 미니멀하게
- 얇은 금색 라인 + 작은 텍스트

---

## 기술 상세

**수정 파일:** `src/components/WhyChooseUsSection.tsx`

**핵심 변경:**
- `font-serif italic` 적용 (이미 Playfair Display가 tailwind에 설정되어 있음)
- 컬러 팔레트를 primary에서 amber/gold 톤으로 일부 전환
- 전체 레이아웃 여백 및 spacing 조정
- 그라데이션 오버레이를 약간 더 어둡게 하여 텍스트 가독성과 고급감 향상
