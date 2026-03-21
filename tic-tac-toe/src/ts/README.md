# 🧩 ts/ — TypeScript Source

> All application logic lives here. 25 TypeScript files across 5 layers.
> Compiled by Vite (esbuild) — no manual `tsc` output needed during development.

---

## 📁 Structure

```
ts/
├── types.ts        ← All type definitions (no imports)
├── constants.ts    ← All magic values (imports types only)
├── state.ts        ← Central state + controlled mutations
├── main.ts         ← App entry point (bootstrap only)
│
├── game/           ← Core game rules (7 files)
├── ai/             ← CPU decision engine (4 files)
├── ui/             ← DOM + rendering layer (5 files)
└── utils/          ← Pure utilities (3 files)
```

---

## 🔷 Layered Architecture

```
┌─────────────────────────────┐
│         UI Layer            │  ← dom, renderer, controls, modal
│  Reads state, writes DOM    │
└────────────┬────────────────┘
             │ calls
┌────────────▼────────────────┐
│       Game Layer            │  ← game-manager, board, win-checker...
│  Pure logic, no DOM         │
└────────────┬────────────────┘
             │ mutates / reads
┌────────────▼────────────────┐
│       State Layer           │  ← state.ts
│  Single source of truth     │
└────────────┬────────────────┘
             │ informs
┌────────────▼────────────────┐
│         AI Layer            │  ← cpu-engine, easy, medium, hard
│  Isolated decision engine   │
└─────────────────────────────┘
```

Dependency flows **downward only**. UI never calls AI directly. AI never touches DOM.

---

## 📄 Core Files

### `types.ts`
Single source of truth for all TypeScript types.
No imports, no side effects — pure declarations only.

| Type | Definition |
|---|---|
| `PlayerSymbol` | `'X' \| 'O'` |
| `CellValue` | `PlayerSymbol \| null` |
| `BoardState` | `readonly CellValue[]` (9 elements) |
| `GameMode` | `'pvp' \| 'pvc'` |
| `DifficultyLevel` | `'easy' \| 'medium' \| 'hard'` |
| `GameStatus` | `'setup' \| 'playing' \| 'won' \| 'draw'` |
| `WinningLine` | `[number, number, number]` (tuple) |
| `WinResult` | `{ winner: PlayerSymbol, line: WinningLine }` |
| `ScoreState` | `{ x: number, o: number, draws: number }` |
| `GameState` | Full game state shape (board, turn, mode, status, scores...) |
| `CpuMoveResult` | `{ index: number }` |
| `MinimaxResult` | `{ score: number, index: number }` |
| `DomElements` | All typed DOM element references |

---

### `constants.ts`
All magic values in one place. Imports from `types.ts` only.

| Constant | Value |
|---|---|
| `BOARD_SIZE` | `9` |
| `WINNING_COMBOS` | All 8 winning `[a,b,c]` index tuples |
| `PLAYER_X / PLAYER_O` | `'X'` / `'O'` |
| `FIRST_PLAYER` | `'X'` |
| `CPU_DELAY` | `{ easy: 400, medium: 650, hard: 900 }` ms |
| `MINIMAX_WIN_SCORE` | `10` |
| `MINIMAX_LOSS_SCORE` | `-10` |
| `MEDIUM_STRATEGIC_CHANCE` | `0.7` |
| `PREFERRED_CELLS` | `[4, 0, 2, 6, 8, 1, 3, 5, 7]` (center → corners → edges) |
| `DOM_IDS` | All HTML element IDs |
| `CSS` | All CSS class name strings |
| `MESSAGES` | All UI text strings (turn, win, draw) |
| `PLAYER_NAMES` | Display names per mode (`pvp`/`pvc`) |
| `STORAGE_KEY` | `'ttt_scores'` |

---

### `state.ts`
Central game state with controlled mutations.

**Private `_state` object — never exported directly.**
All reads go through `getState()` (returns shallow clone).
All writes go through dedicated mutation functions.

**Mutation functions:**
`setGameConfig`, `startGame`, `placeMove`, `switchTurn`, `setWinner`, `setDraw`, `incrementScore`, `resetScores`, `resetRound`, `setCpuThinking`, `resetGame`, `resetToMenu`.

**Derived getters:**
`isCpuTurn()`, `isPlaying()`, `getPlayerName(symbol)`, `getScores()`.

---

### `main.ts`
App bootstrap — runs once on `DOMContentLoaded`.

```
initDom()        → build typed DOM reference map
hydrateScores()  → restore scores from localStorage
bindControls()   → attach all event listeners
renderAll()      → paint initial setup screen
```

Nothing else belongs here. All logic lives in its dedicated module.

---

## 📂 Subfolders

| Folder | Files | Responsibility |
|---|---|---|
| `game/` | 7 files | Core game rules, turn flow, scoring, lifecycle |
| `ai/` | 4 files | CPU decision engine (Easy/Medium/Hard + router) |
| `ui/` | 5 files | DOM queries, rendering, event handlers, modal |
| `utils/` | 3 files | Random, localStorage, type guards |

See each folder's own `README.md` for details.

---

## ⚙️ TypeScript Configuration

| Setting | Value | Why |
|---|---|---|
| `target` | `ES2020` | Modern browser support |
| `module` | `ESNext` | ES module syntax |
| `moduleResolution` | `bundler` | Required for Vite |
| `strict` | `true` | Full strict mode |
| `noImplicitAny` | `true` | No untyped variables |
| `strictNullChecks` | `true` | Explicit null handling |
| `noEmit` | `true` | Vite handles compilation |
| `allowImportingTsExtensions` | `true` | Import `.ts` files directly |

---

*Tic Tac Toe — TypeScript Source · ITI ICC Program · MEARN Track · 2026*