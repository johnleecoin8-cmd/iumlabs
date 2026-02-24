

# PartnerCTASection 네러티브 파인튜닝

## 현재 네러티브 분석

홈페이지는 클래식한 에이전시 스토리텔링 구조를 따르고 있음:

```text
Hero (Hook)
  → 01 About (Trust - 왜 우리인가)
    → 02 Services (Capability - 무엇을 하는가)
      → 03 Cases (Proof - 결과를 증명)
        → 04 Insights (Authority - 전문성 과시)
          → Partner CTA (Climax - 감정적 전환점)  ← HERE
            → 05 Contact (Action - 실행)
```

Partner CTA는 "증명이 끝났으니, 이제 당신 차례"라는 전환점이어야 함. 현재는 카피가 약간 generic하고, Contact 폼과 역할이 겹침.

## 파인튜닝 내용

### 1. 카피 수정 (핵심)

**현재:**
- Label: "Let's Work Together"
- Headline: "*Your Bridge* to Korea."
- Sub: "From strategy to execution -- we are your all-in-one partner for the Korean Web3 market."

**변경:**
- Label: "Next Step"
- Headline: "*Your Growth* Starts Here."
- Sub: "15+ global projects trusted us to navigate Korea. Yours could be next."

이유: Insights(연구/전문성) 직후이므로 "bridge" 메타포보다 "성장의 시작"이라는 forward-looking 메시지가 네러티브 흐름에 맞음. "trusted us"로 이전 Cases 섹션의 증명을 콜백.

### 2. Stats 제거

현재 stats (15+ Projects, $50M+, 24h)는 About 섹션의 Hero 카운터와 중복됨. 클라이맥스 섹션에서 숫자는 임팩트를 분산시킴. 제거하고 여백으로 무게감을 줌.

### 3. CTA 카피 미세 조정

- "Book a Call" 유지 (CalendlyButton)
- "View Our Work" → "See Case Studies" (Cases 섹션으로의 앵커 or /projects)로 변경하여 증명 루프를 만듦

### 4. 서브텍스트 위치 조정

서브텍스트를 헤드라인 바로 아래가 아니라 CTA 버튼 바로 위로 이동하여, 헤드라인의 여백을 극대화.

## 변경 후 레이아웃

```text
+--------------------------------------------------+
|                                                    |
|  [mono] NEXT STEP                                  |
|                                                    |
|  Your Growth                                       |
|  Starts Here.                                      |
|                                                    |
|                  (큰 여백)                          |
|                                                    |
|  15+ global projects trusted us to navigate Korea. |
|  Yours could be next.                              |
|                                                    |
|  [Book a Call]  [See Case Studies →]               |
+--------------------------------------------------+
```

## 기술 변경

### `src/components/PartnerCTASection.tsx`
1. Label 텍스트 변경: "Let's Work Together" → "Next Step"
2. Headline 변경: "Your Bridge / to Korea." → "Your Growth / Starts Here."
3. Sub text 변경 + 위치를 stats 자리로 이동 (CTA 바로 위)
4. Stats 블록 전체 제거
5. "View Our Work" → "See Case Studies", 링크는 `/projects` 유지
6. mb 간격 조정으로 여백 극대화 (headline mb-6 → mb-20 이상)

**Index.tsx 변경 없음.**

