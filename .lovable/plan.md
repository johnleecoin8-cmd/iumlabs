
# Process 섹션 리디자인 계획

## 개요
참조 이미지 스타일로 Process 섹션을 간결하고 깔끔하게 리디자인합니다.

---

## 현재 vs 변경 후 비교

| 항목 | 현재 | 변경 후 |
|------|------|---------|
| 배경 | 서울 지하철 빌보드 이미지 | 단순 어두운 배경 (bg-[#0A0A0A]) |
| 레이아웃 | 복잡한 hover 상태 | 심플한 4-column 그리드 |
| 아이콘 | 작은 원형 아이콘 | 크고 선명한 라인 아이콘 |
| 연결 | 없음 | 화살표 연결자 (||>) |
| 콘텐츠 | ANALYZE, BUILD, IGNITE, SCALE | Inquiry, Proposal, Payment, Execution |

---

## 새로운 디자인 구조

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                              Process                                     │
├─────────────┬───┬─────────────┬───┬─────────────┬───┬─────────────────┤
│   📞        │||>│   📋        │||>│   💳        │||>│   🚀            │
│  (icon)     │   │  (icon)     │   │  (icon)     │   │  (icon)         │
│             │   │             │   │             │   │                 │
│ Inquiry /   │   │ Proposal /  │   │  Payment    │   │  Execution      │
│ Meeting     │   │ Confirm     │   │             │   │                 │
│             │   │             │   │             │   │                 │
│ • Project   │   │ • Custom    │   │ • Service   │   │ • Dedicated TF  │
│   Analysis  │   │   GTM Deck  │   │   Agreement │   │   Deployment    │
│ • Feasibility   │   │   Delivery  │   │   Signing   │   │ • Campaign     │
│   Consultation│   │ • KPI &     │   │ • Invoice   │   │   Launch        │
│             │   │   Scope     │   │   Settlement│   │                 │
└─────────────┴───┴─────────────┴───┴─────────────┴───┴─────────────────┘
```

---

## 상세 구현 계획

### 1. 콘텐츠 데이터 변경

```typescript
const processPhases = [
  {
    title: "Inquiry / Meeting",
    icon: Phone, // PhoneOutgoing
    subPoints: ["Project Analysis", "Feasibility Consultation"]
  },
  {
    title: "Proposal / Confirm",
    icon: FileCheck, // FileText with check
    subPoints: ["Custom GTM Deck Delivery", "KPI & Scope Confirmation"]
  },
  {
    title: "Payment",
    icon: CreditCard,
    subPoints: ["Service Agreement Signing", "Invoice Settlement"]
  },
  {
    title: "Execution",
    icon: Rocket,
    subPoints: ["Dedicated TF Deployment", "Campaign Launch"]
  }
];
```

### 2. 새로운 레이아웃 스타일

**디자인 요소:**
- 배경: 단색 어두운 배경 (bg-[#0A0A0A] 또는 bg-[#111111])
- 아이콘: 64x64px 크기, 흰색 라인 아이콘
- 제목: 굵은 폰트, 가운데 정렬
- 하위 항목: 작은 도트 리스트
- 화살표: 카드 사이에 `||>` 스타일 연결자 (커스텀 SVG 또는 텍스트)

### 3. 반응형 레이아웃

| 화면 크기 | 레이아웃 |
|-----------|----------|
| Desktop (lg+) | 4-column 그리드 + 화살표 연결 |
| Tablet (md) | 2x2 그리드, 화살표 숨김 |
| Mobile (sm-) | 1-column 세로 리스트, 화살표 숨김 |

---

## 수정 파일

**`src/pages/Index.tsx`**
- `processPhases` 데이터 구조 변경
- `ProcessBillboardOverlay` 컴포넌트를 새로운 심플한 디자인으로 교체
- 배경 이미지 제거
- 아이콘 import 변경 (PhoneOutgoing, FileCheck, CreditCard, Rocket)
- 화살표 연결자 SVG/텍스트 추가

---

## 시각적 세부 사항

### 아이콘 스타일
- Lucide 아이콘 사용: `PhoneOutgoing`, `FileCheck`, `CreditCard`, `Rocket`
- 크기: w-12 h-12 또는 w-16 h-16
- 색상: text-white
- 스트로크: stroke-width 1.5

### 화살표 연결자
- 스타일: `||>` (두 개의 세로선 + 화살표)
- 색상: text-white/30
- 위치: 데스크톱에서만 표시, 카드 사이 중앙 정렬

### 카드 스타일
- 배경: 미묘한 그라데이션 또는 반투명 (bg-white/5)
- 둥근 모서리: rounded-xl
- 패딩: p-6 또는 p-8

---

## 예상 결과

- 배경 이미지 없이 깔끔하고 집중도 높은 디자인
- 명확한 프로세스 흐름 시각화 (화살표 연결)
- 실제 비즈니스 프로세스 반영 (문의 → 제안 → 결제 → 실행)
- 모바일에서도 깔끔하게 표시
