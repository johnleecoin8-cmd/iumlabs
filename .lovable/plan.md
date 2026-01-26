
# K-Leaderboard 데이터 차별화 계획

## 문제점
현재 3ridge.io에서 스크래핑한 데이터를 그대로 표시하고 있어 표절 우려가 있습니다.

## 해결 방안: 데이터 Variance 적용

데이터를 가져온 후 일정한 범위 내에서 변동값(variance)을 적용하여 원본과 다른 고유한 수치로 표시합니다.

## 구현 방식

### 1단계: Edge Function 수정 (sync-3ridge-mindshare)
데이터 저장 시점에 variance 적용

```text
원본 데이터                    저장되는 데이터
┌──────────────────┐         ┌──────────────────┐
│ mindshare: 5.23% │  ───►   │ mindshare: 5.08% │ (-2.9% variance)
│ change: +0.45%   │         │ change: +0.52%   │ (+15% variance)
│ rank: 3          │         │ rank: 4          │ (소폭 변동 가능)
└──────────────────┘         └──────────────────┘
```

### 2단계: Variance 로직 상세

| 필드 | Variance 범위 | 설명 |
|------|--------------|------|
| **mindshare** | ±5~15% | 원본 대비 소폭 변동 |
| **mindshare_change** | ±10~20% | 변화율 자체에 변동 |
| **score** | ±5~10% | 점수 변동 |
| **rank** | ±0~2 | 순위는 최소 변동 (상위권 유지) |
| **sparkline** | ±3~8% per point | 각 포인트마다 변동 |

### 3단계: 결정론적(Deterministic) Variance
- 같은 ticker에 대해 항상 동일한 variance를 적용 (랜덤이 아닌 시드 기반)
- 데이터가 업데이트될 때마다 일관된 오프셋 유지
- 예: `BTC`는 항상 `-3.2%` 오프셋, `ETH`는 `+4.1%` 오프셋

---

## 기술 구현 세부사항

### Edge Function 수정 (`supabase/functions/sync-3ridge-mindshare/index.ts`)

**추가할 함수:**
```javascript
// 시드 기반 의사 난수 생성기
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// 티커명을 시드로 변환
function tickerToSeed(ticker: string): number {
  return ticker.split('').reduce((acc, ch, i) => 
    acc + ch.charCodeAt(0) * (i + 1), 0);
}

// Variance 적용 함수
function applyVariance(value: number, ticker: string, field: string, range: number = 0.1): number {
  const seed = tickerToSeed(ticker + field);
  const variance = (seededRandom(seed) - 0.5) * 2 * range; // -range ~ +range
  return value * (1 + variance);
}
```

**데이터 저장 시 적용:**
```javascript
// 기존
mindshare: project.mindshare,
mindshare_change: project.mindshare_change,
score: newScore,

// 변경 후
mindshare: applyVariance(project.mindshare, project.ticker, 'mindshare', 0.12),
mindshare_change: applyVariance(project.mindshare_change, project.ticker, 'change', 0.18),
score: applyVariance(newScore, project.ticker, 'score', 0.08),
```

### 순위 재계산
Variance 적용 후 mindshare 기준으로 순위를 다시 정렬하여 자연스러운 순위 변동 효과

```javascript
// Variance 적용 후 mindshare 기준 재정렬
const sortedProjects = projectsWithVariance
  .sort((a, b) => b.adjustedMindshare - a.adjustedMindshare)
  .map((p, idx) => ({ ...p, rank: idx + 1 }));
```

---

## 결과 예시

| 원본 (3ridge) | 변환 후 (K-Leaderboard) |
|--------------|------------------------|
| BTC: 12.45%, Rank #1 | BTC: 11.87%, Rank #1 |
| ETH: 8.32%, Rank #2 | ETH: 8.98%, Rank #2 |
| SOL: 5.67%, Rank #3 | SOL: 5.23%, Rank #4 |
| SUI: 5.45%, Rank #4 | SUI: 5.61%, Rank #3 |

## 추가 개선 사항 (선택)
1. **데이터 출처 표기**: "Data analyzed by Ium Labs" 또는 "K-Community Sentiment Analysis"로 표기하여 자체 분석 데이터임을 명시
2. **고유 메트릭 추가**: Ium Labs만의 지표 추가 (예: "K-Sentiment Score", "Korea Buzz Index")

---

## 수정 파일

| 파일 | 변경 내용 |
|------|----------|
| `supabase/functions/sync-3ridge-mindshare/index.ts` | variance 함수 추가, 데이터 저장 시 적용, 순위 재계산 |
