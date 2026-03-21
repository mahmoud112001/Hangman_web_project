# ⚙️ game/ — Core Game Logic

> Zero DOM. Zero AI. Pure game rules and lifecycle management.
> All functions are focused, testable, and side-effect free except
> `game-manager.ts` which orchestrates the full flow.

---

## 📁 Files

```
game/
├── board.ts          ← Board inspection utilities
├── player.ts         ← Symbol and identity utilities
├── win-checker.ts    ← Win and draw detection
├── turn-manager.ts   ← Move validation and turn flow
├── score-manager.ts  ← Score tracking + localStorage sync
├── round-manager.ts  ← Round lifecycle
└── game-manager.ts   ← Central orchestrator
```

---

## `board.ts` — Board Utilities

Pure functions for reading and copying the board. No mutations to real state.

| Function | Description |
|---|---|
| `createEmptyBoard()` | Returns `[null × 9]` |
| `getCellValue(board, index)` | Safe cell read with bounds check |
| `getEmptyCells(board)` | Array of empty cell indices |
| `isCellEmpty(board, index)` | Boolean check |
| `isBoardFull(board)` | True if no nulls remain |
| `cloneBoard(board)` | Shallow copy for AI simulation |
| `applyMove(board, index, symbol)` | Immutable — returns new board with move applied |
| `countSymbol(board, symbol)` | Count occupied cells for a symbol |
| `remainingMoves(board)` | Count of empty cells |

`applyMove` is the key function used by the AI — it creates a simulation copy without touching real state.

---

## `player.ts` — Player Identity

Pure symbol utilities. No state access.

| Function | Description |
|---|---|
| `getOpponent(symbol)` | `'X' → 'O'`, `'O' → 'X'` |
| `isValidSymbol(value)` | Type guard |
| `symbolToClass(symbol)` | `'X' → 'x'` for BEM CSS classes |
| `getDisplayName(symbol, mode)` | `'Player X'` or `'CPU'` based on mode |
| `symbolToScoreKey(symbol)` | `'X' → 'x'` for score object key |
| `isCpu(symbol, mode)` | True if `mode === 'pvc' && symbol === 'O'` |

---

## `win-checker.ts` — Win & Draw Detection

The most-called module — invoked by Minimax hundreds of times per move.
All functions are pure with no side effects.

| Function | Description |
|---|---|
| `checkWinner(board, symbol)` | Checks all 8 combos for one symbol → `WinResult \| null` |
| `checkAnyWinner(board, lastPlayed)` | Checks last-played symbol first (more likely winner) |
| `checkDraw(board)` | True if board full and no winner |
| `evaluateBoard(board, lastPlayed)` | Combined: returns `{type:'won', result}` / `{type:'draw'}` / `null` |
| `hasWon(board, symbol)` | Fast boolean version for Minimax — no object allocation |

`evaluateBoard` is the main entry point called by `game-manager` after every move.
`hasWon` is the lightweight version called inside Minimax recursion.

---

## `turn-manager.ts` — Turn Flow

Controls who moves and when the CPU fires.

| Function | Description |
|---|---|
| `isLegalMove(index)` | Validates: status=playing, not thinking, cell empty |
| `executeMove(index, symbol)` | Validate + `state.placeMove()` → returns `boolean` |
| `advanceTurn()` | Calls `state.switchTurn()` |
| `shouldTriggerCpu()` | True if `mode=pvc && turn=O && playing` |
| `scheduleCpuMove(callback)` | `setCpuThinking(true)` → `setTimeout(callback, delay)` |

`scheduleCpuMove` takes a callback (not a return value) because `setTimeout` is async.
`game-manager` passes `executeCpuTurn` as the callback to maintain control of the flow.

---

## `score-manager.ts` — Scores

Tracks and persists scores across rounds.

| Function | Description |
|---|---|
| `recordWin(winner)` | Increment winner's score + persist to localStorage |
| `recordDraw()` | Increment draws + persist |
| `clearScores()` | Zero all scores + persist |
| `hydrateScores()` | Load saved scores from localStorage into state at startup |

---

## `round-manager.ts` — Round Lifecycle

Semantic wrappers around state transitions.

| Function | Trigger | Effect |
|---|---|---|
| `beginGame(mode, difficulty)` | Start button | `setup → playing`, board reset |
| `restartRound()` | Restart button | board reset, scores preserved |
| `nextRound()` | Next Round in modal | same as restart (semantic alias) |
| `returnToMenu()` | Menu button | `playing → setup`, scores preserved |
| `fullReset()` | Reset Score button | everything cleared |

---

## `game-manager.ts` — Orchestrator

The central coordinator. The ONLY module that connects game logic + AI + UI.

### `handleCellClick(index)`
Main flow for human moves:
```
validate move → place symbol → evaluate board
    ├── won  → setWinner → recordWin → animateScore → renderAll → showModal
    ├── draw → setDraw   → recordDraw → animateScore → renderAll → showModal
    └── none → advanceTurn → renderAll
                └── CPU turn? → renderAfterCpuStart → scheduleCpuMove
```

### `executeCpuTurn()` (private)
Called after the CPU delay:
```
getCpuMove(board, 'O', difficulty) → placeMove → evaluate → score → render
```

### Lifecycle handlers (called by controls.ts)
`handleStartGame`, `handleRestartRound`, `handleNextRound`, `handleReturnToMenu`, `handleResetScores`.

---

*Tic Tac Toe — Game Logic · ITI ICC Program · MEARN Track · 2026*