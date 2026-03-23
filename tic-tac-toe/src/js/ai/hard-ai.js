// ══════════════════════════════════════════════════
// HARD-AI.JS — Full Minimax algorithm (unbeatable)
//
// CPU  = Maximising player → wants score as HIGH as possible
// Human = Minimising player → wants score as LOW as possible
//
// Scoring:
//   CPU wins  → +10 - depth  (prefer faster wins)
//   Human wins→ -10 + depth  (penalise slower losses)
//   Draw      →  0
// ══════════════════════════════════════════════════

import { getEmptyCells, applyMove, isBoardFull } from '../game/board.js';
import { getOpponent } from '../game/player.js';
import { hasWon } from '../game/win-checker.js';
import { MINIMAX_WIN_SCORE, MINIMAX_LOSS_SCORE, MINIMAX_DRAW_SCORE } from '../constants.js';

function evaluate(board, cpuSymbol, depth) {
  const human = getOpponent(cpuSymbol);
  if (hasWon(board, cpuSymbol)) return MINIMAX_WIN_SCORE  - depth;
  if (hasWon(board, human))     return MINIMAX_LOSS_SCORE + depth;
  if (isBoardFull(board))       return MINIMAX_DRAW_SCORE;
  return null;
}

function minimax(board, depth, isMaximising, cpuSymbol) {
  const terminalScore = evaluate(board, cpuSymbol, depth);
  if (terminalScore !== null) return terminalScore;

  const emptyCells = getEmptyCells(board);
  const human      = getOpponent(cpuSymbol);

  if (isMaximising) {
    let bestScore = -Infinity;
    for (const index of emptyCells) {
      const simulated = applyMove(board, index, cpuSymbol);
      const score     = minimax(simulated, depth + 1, false, cpuSymbol);
      bestScore       = Math.max(bestScore, score);
    }
    return bestScore;
  } else {
    let bestScore = +Infinity;
    for (const index of emptyCells) {
      const simulated = applyMove(board, index, human);
      const score     = minimax(simulated, depth + 1, true, cpuSymbol);
      bestScore       = Math.min(bestScore, score);
    }
    return bestScore;
  }
}

export function getHardMove(board, cpuSymbol) {
  const emptyCells = getEmptyCells(board);
  if (emptyCells.length === 0) throw new Error('[hard-ai] No empty cells');

  let bestScore = -Infinity;
  let bestIndex = emptyCells[0];

  for (const index of emptyCells) {
    const simulated = applyMove(board, index, cpuSymbol);
    const score     = minimax(simulated, 0, false, cpuSymbol);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  }

  return { index: bestIndex };
}
