// ══════════════════════════════════════════════════
// EASY-AI.TS
// Random move selector. No strategy.
//
// Behaviour:
//   Picks any available empty cell at random.
//   Completely unpredictable and beatable easily.
//   Intentionally simple — no lookahead, no blocks.
// ══════════════════════════════════════════════════

import type { BoardState, CpuMoveResult } from '../types';
import { getEmptyCells } from '../game/board';
import { randomChoice } from '../utils/helpers';

/**
 * Returns a random valid move index.
 * Throws if called on a full board (should never happen
 * in normal game flow — game-manager prevents this).
 */
export function getEasyMove(board: BoardState): CpuMoveResult {
  const emptyCells = getEmptyCells(board);

  if (emptyCells.length === 0) {
    throw new Error('[easy-ai] No empty cells — board is full');
  }

  return { index: randomChoice(emptyCells) };
}