# ♟️ Tic Tac Toe — Production-Level Game

> **Author:** Mahmoud Awad Saad
> **Program:** ITI — ICC Program | Full-Stack MEARN Track
> **Built With:** TypeScript · SCSS · HTML5 · Vite

---

## 🔗 Quick Start

```bash
npm install
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

---

## 🎮 Game Features

| Feature | Details |
|---|---|
| **Game Modes** | Player vs Player · Player vs CPU |
| **CPU Difficulty** | Easy · Medium · Hard (Minimax AI) |
| **Score System** | Real-time · Persists across rounds · localStorage |
| **Win Detection** | All 8 combinations · Winning line highlight |
| **Draw Detection** | Full board with no winner |
| **Result Modal** | Win/draw popup with score snapshot |
| **Keyboard Support** | Escape key closes modal |
| **Responsive** | Desktop + Mobile |
| **Dark Theme** | Premium dark UI with animations |

---

## 📁 Project Structure

```
tic-tac-toe/
│
├── index.html              ← App shell — semantic HTML, all sections
├── package.json            ← Dependencies: Vite + TypeScript + Sass
├── tsconfig.json           ← Strict TypeScript config (bundler mode)
├── vite.config.js          ← Vite build config
│
├── src/
│   ├── styles/             ← SCSS design system (11 partials)
│   └── ts/                 ← TypeScript source (25 files)
│       ├── types.ts
│       ├── constants.ts
│       ├── state.ts
│       ├── main.ts
│       ├── game/           ← Core game logic (7 files)
│       ├── ai/             ← CPU AI engine (4 files)
│       ├── ui/             ← DOM + rendering layer (5 files)
│       └── utils/          ← Pure utilities (3 files)
```

---

## 🎨 `/src/styles` — SCSS Design System

The SCSS is split into **11 partials** with a strict import order.
`main.scss` is the single entry point — it imports all partials in the correct cascade.

```
src/styles/
├── main.scss           ← Entry point — imports all partials in order
├── _variables.scss     ← Design tokens
├── _mixins.scss        ← Reusable patterns
├── _reset.scss         ← Browser normalization
├── _base.scss          ← Root defaults, fonts, utilities
├── _layout.scss        ← App shell, header, panels, grid
├── _components.scss    ← Buttons, mode cards, turn indicator
├── _board.scss         ← 3×3 grid, cell states, hover, winner
├── _score.scss         ← Scoreboard + score cards
├── _modal.scss         ← Result dialog overlay
├── _animations.scss    ← All @keyframes in one place
└── _responsive.scss    ← Mobile breakpoint overrides
```

### File Responsibilities

**`_variables.scss`**
Single source of truth for all design tokens. Never hardcode values anywhere else.
Colors (`$color-x`, `$color-o`, `$color-win`), spacing scale, typography, border radius, shadows, transitions, z-index, board dimensions, breakpoints.

**`_mixins.scss`**
Reusable SCSS patterns. Imported by every partial that needs layout or component logic.
Includes: `flex-center`, `flex-column`, `card`, `card-glass`, `btn-base`, `glow`, `mono-tag`, `respond-to`, `lift-on-hover`.

**`_reset.scss`**
Removes browser inconsistencies — box-sizing, margin, padding, font inheritance, button reset.

**`_base.scss`**
Loads Google Fonts (`DM Sans` + `DM Mono`), sets CSS custom properties on `:root`, body styles, scrollbar, selection highlight, and `.hidden` / `.sr-only` utilities.

**`_layout.scss`**
App wrapper with animated background grid and ambient glow blobs. Header, setup panel, game panel, controls row — all structural sections.

**`_components.scss`**
Mode buttons (1v1 / vs CPU), difficulty buttons (Easy/Medium/Hard), start button with shimmer effect, control buttons, turn indicator with dot pulse animation.

**`_board.scss`**
The 3×3 CSS grid. Cell base styles, X/O symbol reveal animation (`cellReveal`), winner highlight + glow (`winnerPulse`, `winnerGlow`), draw fade, locked board state, hover preview ghost symbol.

**`_score.scss`**
Scoreboard grid (3 columns). Score cards with colored top bar per player, value display, score bump animation on point scored.

**`_modal.scss`**
Fixed overlay dialog. Glassmorphism card with top accent gradient, icon drop animation, score snapshot grid, action buttons (primary/secondary/ghost).

**`_animations.scss`**
All `@keyframes` in one file — `fadeDown`, `fadeUp`, `modalIn`, `cardBounceIn`, `iconDrop`, `cellReveal`, `winnerPulse`, `winnerGlow`, `drawFade`, `scoreBump`, `dotPulse`, `dotBlink`, `gridDrift`, `blobPulse`, `shimmer`.

**`_responsive.scss`**
Mobile overrides for ≤480px and ≤768px — smaller board cells, adjusted padding, stacked layouts, smaller typography.

### BEM Naming Convention
```scss
.board {}               // Block
.board__cell {}         // Element
.board__cell--x {}      // Modifier (player X)
.board__cell--winner {} // Modifier (winning cell)
```

---

## 🧩 `/src/ts` — TypeScript Architecture

### Core Files

**`types.ts`**
Single source of truth for all type definitions. No imports, no side effects.
Exports: `PlayerSymbol`, `CellValue`, `BoardState`, `GameMode`, `DifficultyLevel`, `GameStatus`, `WinResult`, `ScoreState`, `GameState`, `CpuMoveResult`, `MinimaxResult`, `DomElements`.

**`constants.ts`**
All magic values in one place. No logic, no side effects.
Exports: `WINNING_COMBOS`, `BOARD_SIZE`, `CPU_DELAY`, `MEDIUM_STRATEGIC_CHANCE`, `PREFERRED_CELLS`, `MINIMAX_WIN_SCORE`, `DOM_IDS`, `CSS`, `MESSAGES`, `PLAYER_NAMES`, `STORAGE_KEY`.

**`state.ts`**
Central game state + controlled mutations.
Private `_state` object — never exported directly.
All mutations go through exported functions: `placeMove`, `switchTurn`, `setWinner`, `setDraw`, `incrementScore`, `resetScores`, `resetRound`, `setCpuThinking`, `resetGame`, `resetToMenu`.
Derived getters: `isCpuTurn`, `isPlaying`, `getPlayerName`, `getScores`.

**`main.ts`**
App entry point. Runs once on `DOMContentLoaded`.
Order: `initDom()` → `hydrateScores()` → `bindControls()` → `renderAll()`.

---

## ⚙️ `/src/ts/game` — Game Logic Layer

Zero DOM. Zero AI. Pure game rules and lifecycle.

```
game/
├── board.ts          ← Board inspection utilities
├── player.ts         ← Symbol and identity utilities
├── win-checker.ts    ← Win and draw detection
├── turn-manager.ts   ← Move validation and turn flow
├── score-manager.ts  ← Score tracking + localStorage sync
├── round-manager.ts  ← Round lifecycle (begin, restart, next, menu)
└── game-manager.ts   ← Central orchestrator
```

**`board.ts`**
Pure functions for board inspection.
`createEmptyBoard`, `getCellValue`, `getEmptyCells`, `isCellEmpty`, `isBoardFull`, `cloneBoard`, `applyMove`, `countSymbol`, `remainingMoves`.

**`player.ts`**
Symbol utility functions.
`getOpponent` (X↔O), `isValidSymbol`, `symbolToClass`, `getDisplayName`, `symbolToScoreKey`, `isCpu`.

**`win-checker.ts`**
Win and draw detection — the most-called module in the codebase (called by AI hundreds of times per move).
`checkWinner` (one symbol), `checkAnyWinner` (both), `checkDraw`, `evaluateBoard` (combined result), `hasWon` (fast boolean for Minimax).

**`turn-manager.ts`**
Controls turn flow.
`isLegalMove` (validates index against state), `executeMove` (place + validate), `advanceTurn` (switch turn), `shouldTriggerCpu` (check if AI needed), `scheduleCpuMove` (setTimeout + isCpuThinking flag).

**`score-manager.ts`**
Score tracking across rounds.
`recordWin`, `recordDraw`, `clearScores`, `hydrateScores` (restore from localStorage on startup).

**`round-manager.ts`**
Round lifecycle semantics.
`beginGame` (setup→playing), `restartRound` (board reset, keep scores), `nextRound` (same as restart, different semantic intent), `returnToMenu` (playing→setup, keep scores), `fullReset` (clear everything).

**`game-manager.ts`**
The orchestrator. The ONLY module that coordinates between game logic + AI + UI.
`handleCellClick` → validate → place → evaluate → score → render → modal.
`handleStartGame`, `handleRestartRound`, `handleNextRound`, `handleReturnToMenu`, `handleResetScores`.
Contains `executeCpuTurn` (called by `scheduleCpuMove` callback after delay).

---

## 🤖 `/src/ts/ai` — CPU AI Engine

Isolated from all UI and state. Pure decision logic.

```
ai/
├── easy-ai.ts      ← Random move selector
├── medium-ai.ts    ← Win/block + strategic/random split
├── hard-ai.ts      ← Full Minimax algorithm
└── cpu-engine.ts   ← Orchestrator — routes by difficulty
```

**`easy-ai.ts`**
`getEasyMove(board)` → `randomChoice(getEmptyCells(board))`.
Completely random. No strategy whatsoever.

**`medium-ai.ts`**
`getMediumMove(board, cpuSymbol)` — priority decision tree:
1. Winning move available → take it immediately (100%)
2. Opponent can win next move → block it (100%)
3. Otherwise → `withProbability(0.7)`: strategic cell (center → corners → edges) / random fallback

**`hard-ai.ts`**
`getHardMove(board, cpuSymbol)` — Full Minimax.

How Minimax works:
- Simulates every possible future move for both players
- CPU = **maximising** player (wants highest score)
- Human = **minimising** player (wants lowest score)
- Scoring: CPU wins = `+10 - depth` (prefer faster wins) · Human wins = `-10 + depth` · Draw = `0`
- Depth scoring ensures the AI prefers a 3-move win over a 7-move win
- Result: CPU cannot lose — always wins or forces a draw

```
CPU's turn → simulate each empty cell
    → for each: minimax(depth+1, isMaximising=false)
        → human tries all responses
            → minimax(depth+2, isMaximising=true)
                → ... until terminal state
                → return score
        → human picks minimum
    → CPU picks maximum
→ return cell with highest score
```

**`cpu-engine.ts`**
Single entry point for all AI decisions.
`getCpuMove(board, symbol, difficulty)` → routes to easy / medium / hard.
`game-manager` imports only this file — never the AI files directly.

---

## 🖥️ `/src/ts/ui` — UI Layer

The only layer that reads state and writes to the DOM.
No game logic here. No AI logic here.

```
ui/
├── dom.ts              ← Typed DOM reference map
├── renderer.ts         ← State → DOM (renderAll)
├── modal.ts            ← Result dialog show/hide
├── controls.ts         ← Event listeners → game-manager
└── notifications.ts    ← Game event logging
```

**`dom.ts`**
Queries all DOM elements once at startup.
`buildDomElements()` → typed `DomElements` object.
`initDom()` / `getDom()` — module-level singleton pattern.
Throws descriptive errors if any element is missing (catches HTML/TS mismatches immediately).

**`renderer.ts`**
State → DOM. The ONLY place that writes to the DOM based on game state.
`renderAll()` → `renderPanels` + `renderSetup` + `renderBoard` + `renderTurnIndicator` + `renderScore`.
`renderAfterCpuStart()` — partial render for "CPU is thinking..." state.
`animateScoreBump(symbol)` — triggers CSS animation on score element.
All render functions are **idempotent** — same state always = same DOM output.

**`modal.ts`**
`showModal()` — reads state, populates icon/title/message/scores, removes `.hidden`.
`hideModal()` — adds `.hidden` back.

**`controls.ts`**
Attaches all event listeners in `bindControls()` (called once from `main.ts`).
Handlers: mode click, difficulty click, start game, cell click, restart, next round, return to menu, reset scores, keyboard (Escape).
Pattern: read event → validate → call game-manager → never touch state directly.

**`notifications.ts`**
Dev logging utility. Ready to be expanded into a toast/sound/haptic system.

---

## 🔧 `/src/ts/utils` — Pure Utilities

No state. No DOM. No imports from the game system.

```
utils/
├── helpers.ts      ← Random, probability, clamp
├── storage.ts      ← localStorage read/write with error handling
└── validators.ts   ← Input type guards
```

**`helpers.ts`**
`randomInt(min, max)` → integer in range.
`randomChoice<T>(arr)` → random array element.
`withProbability(p)` → true `p`% of the time (used by medium AI).
`clamp(value, min, max)`.

**`storage.ts`**
`saveScores(scores)` → JSON to localStorage (silent fail on error).
`loadScores()` → parse + type-guard validate + return `ScoreState | null`.
`clearStorage()` → remove key (silent fail).

**`validators.ts`**
`isValidMode(value)` → type guard for `GameMode`.
`isValidDifficulty(value)` → type guard for `DifficultyLevel`.
`isValidCellIndex(index)` → guard for 0–8 range.

---

## 🔄 Full Game Flow

```
Page loads
    ↓
main.ts → initDom() → hydrateScores() → bindControls() → renderAll()
    ↓
User sees setup screen
    ↓
Selects mode + difficulty → clicks Start
    ↓
controls.ts → game-manager.handleStartGame()
    ↓
state: setup → playing | board reset | turn = X
    ↓
renderAll() → game panel visible, board empty
    ↓
Player X clicks cell
    ↓
controls.ts → game-manager.handleCellClick(index)
    ├── executeMove() validates + places move
    ├── evaluateBoard() checks win/draw
    │   ├── Won?  → setWinner() → recordWin() → renderAll() → showModal()
    │   ├── Draw? → setDraw()   → recordDraw() → renderAll() → showModal()
    │   └── None? → advanceTurn() → renderAll()
    │               └── CPU turn? → scheduleCpuMove(delay) → executeCpuTurn()
    └── (repeat)
```

---

## 🏗️ Architecture Principles

| Principle | Implementation |
|---|---|
| **Layered Architecture** | UI → Game → State → AI (one-way dependency) |
| **State-Driven Rendering** | State mutates → `renderAll()` → DOM updates |
| **Single Responsibility** | Every file does exactly one thing |
| **No Magic Numbers** | All values in `constants.ts` |
| **Pure Functions** | `board.ts`, `win-checker.ts`, all AI files — no side effects |
| **Fail Fast** | `dom.ts` throws descriptively on missing elements |
| **Type Safety** | Strict TypeScript — no `any`, type guards on all external data |
| **BEM CSS** | Consistent, collision-free, self-documenting class names |

---

## 🛠️ Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 🧠 TypeScript Concepts Used

| Concept | Where |
|---|---|
| Union types | `PlayerSymbol`, `CellValue`, `GameMode`, `GameStatus` |
| Interfaces | `GameState`, `WinResult`, `ScoreState`, `DomElements` |
| Readonly | `BoardState`, `WinningLine`, all AI inputs |
| Type guards | `isValidMode`, `isValidDifficulty`, `loadScores` |
| Generic functions | `randomChoice<T>`, `getEl<T>` in dom.ts |
| Exhaustive switch | `cpu-engine.ts` never case on difficulty |
| Strict null checks | Guard clauses throughout game logic |
| `as const` | `WINNING_COMBOS`, `DOM_IDS`, `CSS` maps |

---

*Tic Tac Toe — Production-Level Game · ITI ICC Program · Full-Stack MEARN Track · 2026*
*Built by Mahmoud Awad Saad*