# 🤖 ai/ — CPU Decision Engine

> Isolated from all UI and state. Pure decision logic only.
> `game-manager.ts` imports only `cpu-engine.ts` — never the AI files directly.

---

## 📁 Files

```
ai/
├── cpu-engine.ts   ← Orchestrator — routes by difficulty
├── easy-ai.ts      ← Random move
├── medium-ai.ts    ← Strategic + random split
└── hard-ai.ts      ← Full Minimax algorithm
```

---

## `cpu-engine.ts` — Orchestrator

Single entry point for all AI decisions.

```typescript
getCpuMove(board, symbol, difficulty) → CpuMoveResult
```

Routes to the correct AI based on `difficulty`.
Uses an exhaustive `switch` with a `never` fallthrough — TypeScript will error at compile time if a difficulty level is added to the type but not handled here.

---

## `easy-ai.ts` — Random

```typescript
getEasyMove(board) → CpuMoveResult
```

`randomChoice(getEmptyCells(board))` — picks any valid cell at random.
No lookahead. No blocking. Fully unpredictable and easily beatable.

---

## `medium-ai.ts` — Strategic + Imperfect

```typescript
getMediumMove(board, cpuSymbol) → CpuMoveResult
```

**Priority decision tree:**

```
1. Can CPU win right now?     → take the win  (100%)
2. Can human win next move?   → block it      (100%)
3. Otherwise:
     withProbability(0.7):    → strategic cell
     else:                    → random cell
```

**Strategic cell order** (`PREFERRED_CELLS`):
Center (4) → Corners (0,2,6,8) → Edges (1,3,5,7)

**Why intentionally imperfect?**
70/30 split means a thinking player can still find and exploit patterns.
Without Minimax, medium AI still misses multi-step trap setups.

---

## `hard-ai.ts` — Minimax (Unbeatable)

```typescript
getHardMove(board, cpuSymbol) → CpuMoveResult
```

### What is Minimax?

A recursive decision algorithm for two-player zero-sum games.
Simulates **every possible future game state** for both players.

```
CPU  = Maximising player  → wants score as HIGH as possible
Human = Minimising player → wants score as LOW as possible
```

### Scoring Terminal States

| Outcome | Score |
|---|---|
| CPU wins | `+10 - depth` |
| Human wins | `-10 + depth` |
| Draw | `0` |

**Why subtract/add depth?**
Without depth, the AI wins but may delay unnecessarily.
By penalising depth on wins: a 3-move win scores `+10` but a 5-move win scores `+8`.
The AI always prefers the fastest path to victory.

### Minimax Recursion

```
getHardMove(board, CPU):
    for each empty cell:
        simulate: board[cell] = CPU
        score = minimax(simBoard, depth=0, isMaximising=false)
        track highest score
    return cell with highest score

minimax(board, depth, isMaximising):
    if terminal (win/draw) → return score
    if isMaximising (CPU turn):
        bestScore = -Infinity
        for each empty cell:
            simulate CPU move
            score = minimax(board, depth+1, false)
            bestScore = max(bestScore, score)
        return bestScore
    else (human turn):
        bestScore = +Infinity
        for each empty cell:
            simulate human move
            score = minimax(board, depth+1, true)
            bestScore = min(bestScore, score)
        return bestScore
```

### Why No Alpha-Beta Pruning?

Tic Tac Toe has at most 9! = 362,880 possible states.
In practice, terminal states are hit early and far fewer paths are explored.
Full Minimax runs in < 1ms — alpha-beta would be premature optimisation.

### Result

The Hard AI **cannot lose**. Every move it makes is mathematically optimal.
Against a perfect human player, the result is always a draw.
Against any imperfect play, the CPU wins.

---

## Data Flow

```
game-manager.ts
    ↓
getCpuMove(board, 'O', difficulty)   ← cpu-engine.ts
    ↓
getEasyMove(board)                   ← easy-ai.ts
getMediumMove(board, 'O')            ← medium-ai.ts
getHardMove(board, 'O')              ← hard-ai.ts
    ↓
{ index: number }                    → game-manager places the move
```

---

*Tic Tac Toe — AI Engine · ITI ICC Program · MEARN Track · 2026*