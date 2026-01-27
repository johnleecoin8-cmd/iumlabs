
# Process 섹션 하이브리드 버전 계획

## 개요
Ium Labs의 전문 방법론(ANALYZE, BUILD, IGNITE, SCALE)과 클라이언트 관점의 비즈니스 프로세스(Inquiry → Execution)를 조합하여 두 가지 장점을 모두 살린 새로운 버전을 만듭니다.

---

## 조합 컨셉

**핵심 아이디어**: 클라이언트가 경험하는 여정(Inquiry → Execution) 안에 Ium Labs의 전문 방법론이 녹아들어 있음을 보여줌

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│  01                    02                    03                    04       │
│  Inquiry               Strategy              Amplify               Growth   │
│  Discovery             Planning              Launch                Scale    │
│                                                                             │
│  • Deep Market         • Community           • Viral Marketing     • On-chain│
│    Research              Architecture        • Tier-1 PR Blast       Events │
│  • Competitor          • KOL Network         • Cross-Community     • Holder │
│    Analysis              Mapping               AMAs                  Retention│
│  • Project Fit         • Content             • Media Coverage      • Sustainable│
│    Assessment            Localization                                 Growth │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 새로운 데이터 구조

| 단계 | 타이틀 | 서브타이틀 | 세부 포인트 |
|------|--------|------------|-------------|
| 01 | Inquiry | Discovery | Deep Market Research, Competitor Analysis, Project Fit Assessment |
| 02 | Strategy | Planning | Community Architecture, KOL Network Mapping, Content Localization |
| 03 | Amplify | Launch | Viral Marketing & Amplification, Tier-1 PR Blast, Cross-Community AMAs |
| 04 | Growth | Scale | On-chain Events & Campaigns, Holder Retention Programs, Sustainable Growth |

**특징**:
- 타이틀: 클라이언트 관점 (Inquiry, Strategy, Amplify, Growth)
- 서브타이틀: 단계별 성격 (Discovery, Planning, Launch, Scale)
- 세부 포인트: Ium Labs 전문 방법론 내용 유지

---

## 아이콘 선택

| 단계 | 아이콘 | 의미 |
|------|--------|------|
| Inquiry | `Search` | 분석과 발견 |
| Strategy | `LayoutGrid` | 구조와 계획 |
| Amplify | `Megaphone` | 증폭과 확산 |
| Growth | `TrendingUp` | 성장과 유지 |

---

## 수정 파일

**`src/pages/Index.tsx`**
1. 아이콘 import 변경: `Search`, `LayoutGrid`, `Megaphone`, `TrendingUp`
2. `processPhases` 배열 업데이트:
   - 타이틀: Inquiry → Strategy → Amplify → Growth
   - 서브타이틀: Discovery → Planning → Launch → Scale
   - 세부 포인트: 기존 방법론 내용 유지 (약간 조정)
   - quote 필드 제거 (현재 미사용)

---

## 상세 코드 변경

```typescript
const processPhases = [
  {
    title: "Inquiry",
    subtitle: "Discovery",
    icon: Search,
    subPoints: ["Deep Market Research", "Competitor Analysis", "Project Fit Assessment"],
    quote: ''
  },
  {
    title: "Strategy", 
    subtitle: "Planning",
    icon: LayoutGrid,
    subPoints: ["Community Architecture", "KOL Network Mapping", "Content Localization"],
    quote: ''
  },
  {
    title: "Amplify",
    subtitle: "Launch",
    icon: Megaphone,
    subPoints: ["Viral Marketing & Amplification", "Tier-1 PR Blast", "Cross-Community AMAs"],
    quote: ''
  },
  {
    title: "Growth",
    subtitle: "Scale",
    icon: TrendingUp,
    subPoints: ["On-chain Events & Campaigns", "Holder Retention Programs", "Sustainable Growth"],
    quote: ''
  }
];
```

---

## 기대 효과

1. **클라이언트 친화적**: 비즈니스 프로세스 흐름이 직관적
2. **전문성 유지**: Ium Labs의 Web3 마케팅 방법론 세부 내용 보존
3. **차별화**: 일반적인 에이전시 프로세스와 다른 전문 용어 사용
4. **일관성**: 기존 디자인 구조(빌보드 배경, 호버 효과) 그대로 유지
