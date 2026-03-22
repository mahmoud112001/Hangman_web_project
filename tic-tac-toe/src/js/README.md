# 🟨 js/ — JavaScript Source

> Direct mapping of the TypeScript source — same architecture, same file names, same logic.
> No build tool required — runs natively in any modern browser via ES modules (`type="module"`).

---

## 📁 Structure

```
js/
├── constants.js    ← All magic values (no imports)
├── state.js        ← Central state + controlled mutations
├── main.js         ← App entry point (bootstrap only)
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
│       State Layer           │  ← state.js
│  Single source of truth     │
└────────────┬────────────────┘
             │ informs
┌────────────▼────────────────┐
│         AI Layer            │  ← cpu-engine, easy, medium, hard
│  Isolated decision engine   │
└─────────────────────────────┘
```

Dependency flows **downward only**.
UI never calls AI directly. AI never touches DOM.

---

## 📄 Core Files

### `constants.js`
All magic values in one place. No imports, no side effects.

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

### `state.js`
Central game state with controlled mutations.

**Private `_state` object — never exported directly.**
All reads go through `getState()` (returns shallow clone).
All writes go through dedicated mutation functions.

**Mutation functions:**
`setGameConfig`, `startGame`, `placeMove`, `switchTurn`, `setWinner`, `setDraw`, `incrementScore`, `resetScores`, `resetRound`, `setCpuThinking`, `resetGame`, `resetToMenu`.

**Derived getters:**
`isCpuTurn()`, `isPlaying()`, `getPlayerName(symbol)`, `getScores()`.

---

### `main.js`
App bootstrap — runs once on `DOMContentLoaded`.

```
initDom()        → build DOM reference map
hydrateScores()  → restore scores from localStorage
bindControls()   → attach all event listeners
renderAll()      → paint initial setup screen
```

---

## 🔄 TS → JS Mapping

| TypeScript | JavaScript |
|---|---|
| `import type { GameState }` | Removed — no type imports in JS |
| `: string`, `: number` | Removed — no annotations |
| `interface GameState {}` | Removed — no interfaces |
| `as CellValue[]` | Removed — no casts |
| `readonly CellValue[]` | Removed |
| `randomChoice<T>(arr: T[])` | `randomChoice(arr)` |
| `const _e: never = diff` | `default: throw new Error(...)` |
| `.ts` file imports | `.js` file imports |

---

## 📂 Subfolders

| Folder | Files | Responsibility |
|---|---|---|
| `game/` | 7 files | Core game rules, turn flow, scoring, lifecycle |
| `ai/` | 4 files | CPU decision engine (Easy / Medium / Hard + router) |
| `ui/` | 5 files | DOM queries, rendering, event handlers, modal |
| `utils/` | 3 files | Random, localStorage, input validation |

See each folder's own `README.md` for details.

---

## 🚀 Usage

Add to `index.html` to use the JS version directly:

```html
<script type="module" src="src/js/main.js"></script>
```

No compilation, no build step — ES modules run natively in all modern browsers.

---

*Tic Tac Toe — JavaScript Source · ITI ICC Program · MEARN Track · 2026*
