// ══════════════════════════════════════════════════
// HARD-AI.TS
// Minimax algorithm — unbeatable AI.
//
// ── What is Minimax? ─────────────────────────────
// Minimax is a recursive decision algorithm for
// two-player zero-sum games.
//
// It simulates every possible future move for both
// players, building a complete game tree:
//
//   MAX player (CPU)  → tries to maximise the score
//   MIN player (human)→ tries to minimise the score
//
// Scoring:
//   CPU wins  → +10 (minus depth = reward faster wins)
//   Human wins→ -10 (plus depth = penalise slow losses)
//   Draw      →   0
//
// Why depth matters:
//   Without depth, the AI wins but may choose a
//   slow 5-move win over a 3-move win.
//   By subtracting depth from win scores, faster
//   wins get higher scores → AI prefers them.
//
// ── Minimax recursion ────────────────────────────
//
//   function minimax(board, depth, isMaximising):
//     if terminal state → return score
//
//     if isMaximising:
//       bestScore = -Infinity
//       for each empty cell:
//         simulate CPU move
//         score = minimax(board, depth+1, false)
//         bestScore = max(bestScore, score)
//       return bestScore
//
//     else:
//       bestScore = +Infinity
//       for each empty cell:
//         simulate human move
//         score = minimax(board, depth+1, true)
//         bestScore = min(bestScore, score)
//       return bestScore
//
// ── Why no Alpha-Beta pruning? ───────────────────
// Tic Tac Toe has at most 9! = 362,880 states.
// In practice far fewer (many terminal states hit
// early). Full Minimax runs in milliseconds.
// Alpha-Beta would be premature optimisation here.
// ══════════════════════════════════════════════════

import type { BoardState, CpuMoveResult, PlayerSymbol } from '../types';
import { getEmptyCells, applyMove, isBoardFull } from '../game/board';
import { getOpponent } from '../game/player';
import { hasWon } from '../game/win-checker';
import {
  MINIMAX_WIN_SCORE,
  MINIMAX_LOSS_SCORE,
  MINIMAX_DRAW_SCORE,
} from '../constants';

// ── Terminal state evaluation ─────────────────────

/**
 * Evaluates a terminal board state and returns a score.
 * Called when recursion hits a won/drawn board.
 *
 * @param board       - current board state
 * @param cpuSymbol   - the maximising player (CPU)
 * @param depth       - how many moves deep we are
 * @returns score or null if board is not terminal
 */
function evaluate(
  board: BoardState,
  cpuSymbol: PlayerSymbol,
  depth: number
): number | null {
  const human = getOpponent(cpuSymbol);

  if (hasWon(board, cpuSymbol)) {
    // CPU wins — prefer faster wins (subtract depth)
    return MINIMAX_WIN_SCORE - depth;
  }

  if (hasWon(board, human)) {
    // Human wins — penalise slower losses (add depth)
    return MINIMAX_LOSS_SCORE + depth;
  }

  if (isBoardFull(board)) {
    return MINIMAX_DRAW_SCORE;
  }

  return null;  // Not terminal — continue recursion
}

// ── Minimax recursive function ────────────────────

/**
 * Recursive Minimax.
 *
 * @param board         - board to evaluate (simulated copy)
 * @param depth         - current recursion depth (starts at 0)
 * @param isMaximising  - true when it's CPU's turn, false for human
 * @param cpuSymbol     - which symbol the CPU is playing
 * @returns the best score achievable from this board state
 */
function minimax(
  board: BoardState,
  depth: number,
  isMaximising: boolean,
  cpuSymbol: PlayerSymbol
): number {
  // Check if this is a terminal state
  const terminalScore = evaluate(board, cpuSymbol, depth);
  if (terminalScore !== null) return terminalScore;

  const emptyCells = getEmptyCells(board);
  const human      = getOpponent(cpuSymbol);

  if (isMaximising) {
    // CPU's turn — wants to MAXIMISE the score
    let bestScore = -Infinity;

    for (const index of emptyCells) {
      const simulated = applyMove(board, index, cpuSymbol);
      const score     = minimax(simulated, depth + 1, false, cpuSymbol);
      bestScore       = Math.max(bestScore, score);
    }

    return bestScore;

  } else {
    // Human's turn — wants to MINIMISE the score
    let bestScore = +Infinity;

    for (const index of emptyCells) {
      const simulated = applyMove(board, index, human);
      const score     = minimax(simulated, depth + 1, true, cpuSymbol);
      bestScore       = Math.min(bestScore, score);
    }

    return bestScore;
  }
}

// ── Public entry point ────────────────────────────

/**
 * Returns the best move for the CPU using Minimax.
 *
 * How it works:
 *   Iterates all empty cells.
 *   For each cell, simulates a CPU move and runs
 *   Minimax (minimising) to score that path.
 *   Picks the cell with the highest score.
 *
 * The result is always the objectively optimal move.
 * The CPU cannot lose — it will always win or draw.
 */
export function getHardMove(
  board: BoardState,
  cpuSymbol: PlayerSymbol
): CpuMoveResult {
  const emptyCells = getEmptyCells(board);

  if (emptyCells.length === 0) {
    throw new Error('[hard-ai] No empty cells');
  }

  let bestScore = -Infinity;
  let bestIndex = emptyCells[0];  // Fallback (always overridden)

  for (const index of emptyCells) {
    const simulated = applyMove(board, index, cpuSymbol);

    // After CPU places at `index`, it's the human's turn
    // → isMaximising = false
    const score = minimax(simulated, 0, false, cpuSymbol);

    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  }

  return { index: bestIndex };
}