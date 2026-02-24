

## Cases 섹션 15개로 확장 (3개 프로젝트 추가)

### 현재 상태
- DB에 15개 프로젝트가 `is_published = true`로 등록됨
- CasesSection에서 `.limit(12)`와 `maxItems = 12`로 12개만 표시
- 빠진 3개: **Spacecoin**, **Aptos**, **Kite**

### 변경 내용 (`src/components/CasesSection.tsx`)

**1. 쿼리 limit 변경**
- `.limit(12)` → `.limit(15)`

**2. maxItems 기본값 변경**
- `maxItems = 12` → `maxItems = 15`

**3. fallback 이미지 3개 추가**
Spacecoin, Aptos, Kite의 DB `background_url`이 mp4 동영상이라 이미지 fallback 필요:
- `spacecoin`: bgImage → `/images/projects/spacecoin-bg.jpg`
- `aptos`: bgImage → `/images/projects/aptos-bg.jpg`
- `kite`: bgImage → `/images/projects/kite-bg.jpg`

(이 3개는 `public/images/projects/`에 이미 존재하는 파일)

**4. 그리드 레이아웃**
- 데스크톱 3열 그리드 → 15개 = 5행 (딱 맞음)
- 모바일 2열 그리드 → 8행 (마지막 행 1개) — 자연스러움
- 레이아웃 CSS 변경 불필요

**5. 주석 업데이트**
- `{/* 3x4 Cases Grid (12 projects max) */}` → `{/* 3x5 Cases Grid (15 projects) */}`

### 수정 파일
- `src/components/CasesSection.tsx` 1개 파일만 수정
