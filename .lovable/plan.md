
# Branding & Website 서비스 페이지 전면 개편

## 문제 분석

현재 BrandingService 페이지의 카드 기반 UI는:
- 과도한 그라데이션과 glow 효과로 인해 시각적 노이즈가 많음
- 홈페이지의 미니멀한 톤과 괴리감이 있음
- 에이전시 신뢰도보다 "게임/NFT" 느낌을 줌
- 레퍼런스 이미지처럼 깔끔하고 전문적인 느낌이 부족

## 디자인 방향성

MarketAcross, Lunar Strategy, VaynerMedia 등 탑 에이전시들의 공통점:
1. **미니멀한 섹션 구조**: 불필요한 장식 최소화
2. **명확한 정보 계층**: 큰 제목 → 서브포인트 → 체크리스트
3. **여백 활용**: 콘텐츠 사이 충분한 breathing room
4. **단순한 카드**: 단색 배경 + 얇은 보더, 호버 시 미세한 변화만
5. **FAQ는 아코디언**: 깔끔한 확장형 UI

---

## 개편 내용

### 1. Deliverables 섹션 리디자인 (ServicePageLayout)

**변경 전**: 체크 아이콘 리스트가 있는 작은 카드들
**변경 후**: 레퍼런스와 동일한 미니멀 카드 스타일

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│  ● Brand Identity          ● Website & Tech         ● Ongoing     │
│                                                      Support       │
│  ✓ The Basics: Logo kit    ✓ Design: Fully          ✓ Launch      │
│    (Primary, Secondary,      responsive and           Assist:     │
│    Icons)                    interactive layouts      We're with  │
│                                                       you...      │
│  ✓ The Vibe: Color         ✓ Development: Clean     ✓ Quick       │
│    palettes, gradients,      code, fast loading,      Fixes: Fast │
│    and custom fonts          and SEO-ready            turnaround  │
│                                                                    │
│  ✓ The Rules: A simple     ✓ Web3 Ready: Easy       ✓ Growth      │
│    Brand Guideline PDF       wallet connections       Ready: Easy │
│    so your team stays        and smooth animations    to scale    │
│    on track                                                        │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

스타일 변경사항:
- 카드 배경: `bg-white/[0.02]` → `bg-[#0D0D0D]` (더 진한 단색)
- 보더: `border-white/10` → `border-white/[0.08]` (더 미세)
- 라운딩: `rounded-xl` → `rounded-2xl` (더 부드러운 코너)
- 호버: glow 효과 제거, 단순히 `border-white/15`로 살짝 밝아짐
- 제목 앞 컬러 도트 유지 (accent color)
- 체크 아이콘 색상: accent color → `text-violet-400/60` (더 은은)

### 2. FAQ 섹션 리디자인

**변경 전**: 작은 아코디언 카드들
**변경 후**: 레퍼런스처럼 풀 너비 아코디언 아이템

```
┌────────────────────────────────────────────────────────────────────┐
│  ❯  What's in the branding package?                           ∨   │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│  ❯  Do you build websites from scratch?                       ∨   │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│  ❯  How long does the whole process take?                     ∨   │
└────────────────────────────────────────────────────────────────────┘
```

스타일 변경사항:
- 아이템 간격: `space-y-3` → `space-y-2` (더 촘촘)
- 카드 스타일: 깔끔한 단색 배경 `bg-[#0D0D0D]`
- 보더: 더 얇고 미세한 `border-white/[0.06]`
- 라운딩: `rounded-2xl` (레퍼런스와 동일)
- 화살표 아이콘: ChevronRight → `❯` 스타일 (더 미니멀)
- 우측 드롭다운 아이콘: ChevronDown 유지

### 3. Featured Work 섹션 완전 제거 또는 단순화

현재 FeaturedCaseCard는 너무 복잡한 레이아웃을 가지고 있음:
- 배경 이미지 + 그라데이션 오버레이
- 컬러별 glow 효과
- 메트릭 + 서비스 태그 + 진행바

**대안 A: 완전 제거**
Featured Work 섹션을 제거하고 Gallery 마키만 유지

**대안 B: 텍스트 기반으로 단순화**
```
┌────────────────────────────────────────────────────────────────────┐
│  Our Recent Work                                                   │
├────────────────────────────────────────────────────────────────────┤
│  Bananago          Affiliate Platform       40K+ Monthly Users    │
│  Thirdweb          Developer Platform       200K+ Active Devs     │
│  Coinmerce         Crypto Exchange          150K Accounts         │
└────────────────────────────────────────────────────────────────────┘
```

이미지 없이 테이블/리스트 형태로 변경하여 미니멀함 유지

### 4. Process 섹션 (4-Week Program) 단순화

현재 ProcessBillboardOverlay는:
- 배경 이미지 + 4분할 그리드
- 호버 시 활성화 애니메이션
- 아이콘 + 서브포인트 + 인용구

**단순화 방향**:
- 배경 이미지 제거 또는 opacity 대폭 낮춤
- 4개의 심플한 단계 카드로 변경
- 아이콘만 남기고 상세 내용은 별도 표시

```
┌─────────┬─────────┬─────────┬─────────┐
│  WEEK 1 │  WEEK 2 │  WEEK 3 │  WEEK 4 │
│         │         │         │         │
│  Deep   │  Look & │  The    │  Blast  │
│  Dive   │  Feel   │  Build  │  Off    │
│         │         │         │         │
│  [Eye]  │ [Palette│ [Layout]│ [Code]  │
│         │         │         │         │
└─────────┴─────────┴─────────┴─────────┘
```

배경: 단색 `bg-[#0D0D0D]`
호버: 미세한 `bg-white/5` 변화만

### 5. Gallery 섹션 유지 (현재 상태 양호)

GalleryMarquee는 현재 괜찮은 상태:
- 무한 스크롤 마키
- 이미지 호버 시 확대 효과
- 프로젝트명 오버레이

---

## 수정 파일 목록

1. **`src/components/ServicePageLayout.tsx`**
   - Deliverables 섹션 카드 스타일 미니멀화
   - FAQ 아코디언 스타일 레퍼런스에 맞게 변경
   - 전체적인 색상 톤 조정

2. **`src/pages/BrandingService.tsx`**
   - Featured Work 섹션 제거 또는 단순화
   - ProcessBillboardOverlay 컴포넌트 스타일 단순화
   - FeaturedCaseCard 컴포넌트 제거

---

## 기술적 변경사항

### Deliverables Card 새 스타일
```tsx
<div className="p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-[#0D0D0D] 
  hover:border-white/[0.12] transition-all duration-300">
  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
    {deliverable.title}
  </h3>
  <ul className="space-y-2">
    {deliverable.items.map((item, idx) => (
      <li key={idx} className="flex items-start gap-2 text-white/50 text-xs">
        <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-violet-400/60" />
        {item}
      </li>
    ))}
  </ul>
</div>
```

### FAQ Accordion 새 스타일
```tsx
<AccordionItem 
  className="border border-white/[0.06] rounded-2xl bg-[#0D0D0D] px-5 
    data-[state=open]:border-white/[0.12] transition-all"
>
  <AccordionTrigger className="py-4 text-sm text-white hover:no-underline">
    <span className="flex items-center gap-3">
      <ChevronRight className="w-4 h-4 text-violet-400/60" />
      {item.question}
    </span>
  </AccordionTrigger>
  <AccordionContent className="text-white/50 text-sm pb-4 pl-7">
    {item.answer}
  </AccordionContent>
</AccordionItem>
```

---

## 예상 결과

- 레퍼런스 스크린샷과 일치하는 미니멀한 카드 스타일
- 홈페이지와 일관된 시각적 톤
- 전문 에이전시다운 깔끔하고 신뢰감 있는 디자인
- 불필요한 시각적 노이즈 제거
- 정보 전달에 집중하는 UI
