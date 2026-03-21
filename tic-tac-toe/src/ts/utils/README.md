# 🔧 utils/ — Pure Utilities

> Zero state. Zero DOM. Zero imports from the game system.
> Every function here is a pure, self-contained utility
> that can be tested, reused, or moved without any changes elsewhere.

---

## 📁 Files

```
utils/
├── helpers.ts      ← Random numbers, probability, clamp
├── storage.ts      ← localStorage with safe error handling
└── validators.ts   ← Input type guard functions
```

---

## `helpers.ts` — Random & Math

| Function | Signature | Description |
|---|---|---|
| `randomInt` | `(min, max) → number` | Random integer in range (inclusive) |
| `randomChoice` | `<T>(arr) → T` | Random element from any array |
| `withProbability` | `(p) → boolean` | Returns `true` with probability `p` (0–1) |
| `clamp` | `(value, min, max) → number` | Clamps number between min and max |

### Usage in the game

`randomChoice` is used by **Easy AI** to pick a random empty cell.
`withProbability(0.7)` is used by **Medium AI** to split strategic vs random moves.
`randomInt` is the foundation of both — generates the random index.

```typescript
// Easy AI
return { index: randomChoice(getEmptyCells(board)) };

// Medium AI
if (withProbability(MEDIUM_STRATEGIC_CHANCE)) {
  return findStrategicCell(board);
}
return { index: randomChoice(empties) };
```

---

## `storage.ts` — localStorage

Safe read/write for score persistence. All operations are wrapped in try/catch.
If localStorage is unavailable (private browsing, storage full, browser restriction) — the game still works normally. Scores just won't persist across page refreshes.

| Function | Description |
|---|---|
| `saveScores(scores)` | Serialise `ScoreState` to JSON and write to localStorage |
| `loadScores()` | Read + parse + **type-guard validate** → `ScoreState \| null` |
| `clearStorage()` | Remove the scores key silently |

### Type-Safe Parsing

`loadScores` does not blindly cast `JSON.parse` to `ScoreState`.
It validates the parsed object has the correct shape before returning it:

```typescript
if (
  typeof parsed === 'object' && parsed !== null &&
  'x' in parsed && 'o' in parsed && 'draws' in parsed &&
  typeof parsed.x === 'number' && ...
) {
  return parsed as ScoreState;
}
return null; // Invalid shape — ignore and start fresh
```

This prevents crashes if the localStorage data was corrupted or written by an older version.

### Storage Key

`STORAGE_KEY = 'ttt_scores'` (defined in `constants.ts`).

---

## `validators.ts` — Type Guards

Input validation functions that narrow `unknown` to specific types.
Used in `controls.ts` to safely read `dataset` attributes before passing to game logic.

| Function | Signature | Validates |
|---|---|---|
| `isValidMode` | `(value) → value is GameMode` | `'pvp' \| 'pvc'` |
| `isValidDifficulty` | `(value) → value is DifficultyLevel` | `'easy' \| 'medium' \| 'hard'` |
| `isValidCellIndex` | `(index) → index is number` | `0 ≤ index ≤ 8` |

### Usage in controls.ts

```typescript
// dataset['mode'] returns string | undefined
const mode = btn.dataset['mode'];
if (!isValidMode(mode)) return;  // TypeScript now knows: mode is GameMode
setGameConfig(mode, ...);        // Safe — no type error
```

Without these guards, TypeScript would error on `setGameConfig(mode, ...)` because
`string | undefined` is not assignable to `GameMode`.

---

*Tic Tac Toe — Utilities · ITI ICC Program · MEARN Track · 2026*