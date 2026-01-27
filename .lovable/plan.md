
# 홈페이지 종합 개선 계획

## 개요
제가 분석한 문제점들을 모두 수정하여 홈페이지의 일관성과 완성도를 높입니다.

---

## 1. 섹션 번호 순차 정리

**현재 문제**: 번호가 중복되거나 누락됨
- About: 01 / Services: 01 (중복)
- Process: 02 / Cases: 번호 없음
- Insights: 04 / Contact: 05

**수정 계획**:
| 섹션 | 현재 | 수정 후 |
|------|------|---------|
| About | 01 | 01 |
| Services | 01 | 02 |
| Process | 02 | 03 |
| Cases | 없음 | 04 |
| Insights | 04 | 05 |
| Contact | 05 | 06 |

---

## 2. About 섹션 통계 데이터 추가

**현재 문제**: `WhyChooseUsSection.tsx`에 통계 데이터가 정의되어 있지만 렌더링되지 않음

```text
stats = [
  { value: "50+", label: "Projects Launched" },
  { value: "$2B+", label: "Total Value Marketed" },
  { value: "100+", label: "KOL Partners" }
]
```

**수정 계획**: 
- 본문 아래, "Founded by veterans..." 위에 3개의 통계 카드를 가로로 배치
- 미니멀한 스타일 유지 (border-white/10, text-white/80)

---

## 3. AnnouncementBar 추가

**현재 문제**: 컴포넌트가 존재하지만 사용되지 않음

**수정 계획**:
- `Index.tsx`에서 Navbar 바로 위에 AnnouncementBar 추가
- "Schedule a Free Consultation Now → Book Now" CTA 표시
- X 버튼으로 닫기 가능

---

## 4. Footer 개선

**현재 문제**: Footer가 너무 단순함 (브랜드명만 표시)

**수정 계획**:
- 현재 Footer는 브랜드명 표시 유지
- FooterLinksSection과 Footer 사이에 구분선 스타일 개선
- Footer에 저작권 정보 추가: "© 2026 ium Labs. All rights reserved."

---

## 5. 모바일 Process 폰트 크기 개선

**현재 문제**: 모바일에서 `text-[9px]` 사용으로 가독성 저하

**수정 계획**:
| 요소 | 현재 | 수정 후 |
|------|------|---------|
| 번호 | text-[10px] | text-xs |
| 제목 | text-xs | text-sm |
| 서브타이틀 | text-[9px] | text-[10px] |
| subPoints | text-[9px] | text-[10px] |

---

## 6. Cases 섹션 헤더 추가

**현재 문제**: Cases 섹션에 다른 섹션과 같은 스타일의 헤더가 없음

**수정 계획**:
- PerformanceSection 위에 표준 섹션 헤더 추가
- 번호: 04, 제목: "Cases", 배지: "Portfolio"

---

## 수정 파일 목록

1. **`src/pages/Index.tsx`**
   - 섹션 번호 순차 정리 (01~06)
   - AnnouncementBar import 및 추가
   - Cases 섹션 헤더 추가
   - 모바일 Process 폰트 크기 증가

2. **`src/components/WhyChooseUsSection.tsx`**
   - 통계 카드 3개 렌더링 추가

3. **`src/components/Footer.tsx`**
   - 저작권 정보 추가

---

## 예상 결과

- 섹션 번호가 01부터 06까지 일관되게 표시
- About 섹션에 "50+ Projects", "$2B+ Value", "100+ KOL Partners" 통계 표시
- 페이지 상단에 프로모션 배너 표시 (닫기 가능)
- 모바일에서 Process 카드 텍스트 가독성 향상
- Cases 섹션에 통일된 헤더 스타일 적용
