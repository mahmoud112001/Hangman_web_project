# 🖥️ ui/ — UI Layer

> The only layer that reads game state and writes to the DOM.
> No game logic. No AI logic. No direct state mutation.
> Pattern: Event → controls.ts → game-manager → state mutates → renderer reads → DOM updates.

---

## 📁 Files

```
ui/
├── dom.ts              ← Typed DOM reference map (query once, reuse everywhere)
├── renderer.ts         ← State → DOM  (renderAll is the only DOM writer)
├── modal.ts            ← Result dialog show/hide
├── controls.ts         ← All event listeners → game-manager
└── notifications.ts    ← Game event logging utility
```

---

## `dom.ts` — Typed DOM References

Queries all DOM elements **once** at startup and stores them in a typed map.

```typescript
initDom()     // Called once in main.ts — builds the map
getDom()      // Returns the singleton DomElements object
```

**Why centralise?**
- If an ID changes in HTML → fix it in one place (`constants.ts → DOM_IDS`)
- Every module gets typed references without calling `querySelector` themselves
- `buildDomElements()` throws a descriptive error if any element is missing — catches HTML/TS mismatches immediately at startup

The returned `DomElements` object contains typed references for every interactive element: panels, buttons, board cells, scoreboard, turn indicator, modal elements.

---

## `renderer.ts` — State → DOM

**The ONLY file that writes to the DOM based on game state.**

### `renderAll()`
Called after every state change. Composes 5 sub-renderers:

| Sub-renderer | What it updates |
|---|---|
| `renderPanels()` | Which screen is visible (setup vs game) |
| `renderSetup()` | Active mode/difficulty button highlights |
| `renderBoard()` | Cell classes (X/O/winner/draw), disabled states, hover attrs |
| `renderTurnIndicator()` | Whose turn, thinking state, text |
| `renderScore()` | Score numbers, player labels, active card highlight |

### `renderAfterCpuStart()`
Partial render — only updates the turn indicator to "CPU is thinking..." and locks the board. Called immediately when CPU turn starts, before the delay fires.

### `animateScoreBump(symbol)`
Triggers the `score-bump` CSS animation on the correct score element.
Uses `offsetWidth` reflow trick to restart the animation if called twice quickly.

**Key rule:** All render functions are **idempotent** — calling them twice with the same state produces identical DOM output. No hidden state in the renderer.

---

## `modal.ts` — Result Dialog

```typescript
showModal()   // Populate + show the result modal
hideModal()   // Hide the modal
```

`showModal()` reads current game state and sets:
- Icon (`🏆` for win, `🤝` for draw)
- Title text + color class (`--x`, `--o`, `--draw`)
- Message text
- Score snapshot (X / Draws / O)
- Player labels per game mode
- Auto-focuses "Next Round" button for keyboard accessibility

---

## `controls.ts` — Event Listeners

Attaches all event listeners in `bindControls()` (called once from `main.ts`).

**Rule: No game logic here.** Only: read event → validate → call game-manager.

| Event | Handler | Calls |
|---|---|---|
| Mode button click | `onModeClick` | `setGameConfig` + `renderAll` |
| Difficulty click | `onDifficultyClick` | `setGameConfig` + `renderAll` |
| Start game | `onStartGame` | `handleStartGame` |
| Cell click | `onCellClick` | `handleCellClick(index)` |
| Restart | `onRestartRound` | `hideModal` + `handleRestartRound` |
| Next Round | `onNextRound` | `hideModal` + `handleNextRound` |
| Menu | `onReturnToMenu` | `hideModal` + `handleReturnToMenu` |
| Reset Score | `onResetScores` | `handleResetScores` |
| Modal backdrop | click | `onNextRound` |
| `Escape` key | `onKeyDown` | `hideModal` + `handleNextRound` |

**Type safety on dataset:**
`cell.dataset['index']` returns `string | undefined`.
The handler checks for `undefined` before calling `Number()` — no implicit coercion bugs.

---

## `notifications.ts` — Logging Utility

Lightweight game event logger. Currently outputs to `console.info`.
Designed to be expanded into a toast notification, sound effect, or haptic system without changing any call sites.

```typescript
notifyGameEvent('Player X wins!') // → console.info('[game] Player X wins!')
```

---

*Tic Tac Toe — UI Layer · ITI ICC Program · MEARN Track · 2026*