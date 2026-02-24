
# PartnerCTASection 리디자인 - Ium Labs 브랜드에 맞는 미니멀 임팩트 섹션

## 문제점
현재 섹션이 그라디언트 텍스트, 글로우 배경, 둥근 버튼 등으로 인해 generic한 Web3 랜딩페이지 느낌 -- Ium Labs의 미니멀 에이전시 미학과 맞지 않음.

## 리디자인 방향
사이트 전체의 미니멀 에이전시 톤을 유지하면서 임팩트를 주는 방식으로 변경. 과한 효과 대신 타이포그래피와 여백으로 힘을 줌.

## 디자인 컨셉: "Quiet Confidence"
- 그라디언트 텍스트, 컬러 글로우 전부 제거
- 초대형 타이포그래피 (text-[8rem] 이상)로 시각적 무게감
- 모노톤 (white/gray) 색상 체계 유지
- 기존 사이트 패턴: `bg-[#0A0A0A]`, `border-white/[0.06]`, `font-mono tracking-widest` 활용
- 섹션 상단에 `border-t border-white/10` 구분선 + 섹션 번호 헤더 추가 (04.5 느낌 없이, 별도 번호 없는 전환 블록)

## 변경될 레이아웃

```text
+--------------------------------------------------+
|  (full-width, min-h-[70vh], centered)            |
|                                                    |
|  [mono label] LET'S WORK TOGETHER                 |
|                                                    |
|  Your Bridge                                       |
|  to Korea.           <-- 초대형, serif italic mix  |
|                                                    |
|  [한 줄 서브 텍스트, white/40]                     |
|                                                    |
|  ── 15+ Projects ── $50M+ Value ── 24h ──         |
|      (가로 구분선 위 미니멀 stat row)              |
|                                                    |
|  [Book a Call]  [View Our Work →]                  |
|   (흰 bg 버튼)   (텍스트 링크 스타일)              |
+--------------------------------------------------+
```

## 기술 변경 사항

### `src/components/PartnerCTASection.tsx` 전면 수정
1. 배경 글로우 애니메이션 전부 제거 (촌스러운 주범)
2. 그라디언트 텍스트 제거 -> 순수 white + serif italic 조합
3. 헤드라인을 더 크게, serif italic "Your Bridge" + sans bold "to Korea." 패턴 (StatsSection과 유사한 패턴)
4. Stats를 border 라인 없이 간결한 inline 가로 나열 (separator: `·` 또는 em dash)
5. CTA 버튼: primary를 `bg-white text-black rounded-none` 사각형 미니멀 스타일, secondary를 text link + arrow 스타일
6. framer-motion 애니메이션은 유지하되 subtle하게 (fade-up only, 글로우 없음)
7. 전체 높이를 `min-h-[70vh]`로 유지해 여백으로 임팩트

### `src/pages/Index.tsx` - 변경 없음 (import는 동일)
