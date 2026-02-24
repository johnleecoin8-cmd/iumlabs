

## Cases 섹션에 3개 프로젝트 추가 (Sahara AI, Aptos, Kite)

### 현재 상태
- Cases 섹션은 DB에서 `display_order` 순으로 최대 **12개**만 표시
- 현재 빠져 있는 프로젝트: **Sahara AI** (14), **Aptos** (15), **Kite** (16)

### 변경 내용

**1. 쿼리 limit 및 기본값 변경** (`src/components/CasesSection.tsx`)
- `maxItems` 기본값: `12` → `15`
- Supabase 쿼리 `.limit(12)` → `.limit(15)`

**2. fallback 이미지 추가** (`src/components/CasesSection.tsx`)
- Aptos, Kite는 DB의 `background_url`이 동영상(mp4)이라 이미지로 렌더링 불가
- `fallbackImages` 맵에 아래 3개 추가:
  - `aptos`: bgImage → `/images/projects/aptos-bg.jpg`
  - `kite`: bgImage → `/images/projects/kite-bg.jpg`
  - `sahara-ai`: 이미 등록되어 있음 (확인 완료)

**3. 그리드 레이아웃**
- 현재 3열 그리드 → 15개 = 5행 (마지막 행 3개 꽉 참) — 레이아웃 변경 불필요

### 수정 파일
- `src/components/CasesSection.tsx` — limit/maxItems 변경 + fallback 이미지 2개 추가
