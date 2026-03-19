// ══════════════════════════════════════════════════
// CPU-ENGINE.TS
// CPU orchestrator — routes to correct AI by level.
//
// Responsibility:
//   Single entry point for all AI decisions.
//   game-manager calls ONLY this file.
//   Never imports easy/medium/hard directly.
//
// Why this indirection?
//   If we ever add a new difficulty, we change only
//   this file + add a new ai file.
//   game-manager never needs to change.
// ══════════════════════════════════════════════════

import type { BoardState, CpuMoveResult, PlayerSymbol, DifficultyLevel } from '../types';
import { getEasyMove }   from './easy-ai';
import { getMediumMove } from './medium-ai';
import { getHardMove }   from './hard-ai';

/**
 * Routes to the correct AI based on difficulty.
 * Returns the chosen cell index as a CpuMoveResult.
 *
 * @param board      - current board state (readonly)
 * @param symbol     - the CPU's symbol ('O' always)
 * @param difficulty - current difficulty setting
 */
export function getCpuMove(
  board: BoardState,
  symbol: PlayerSymbol,
  difficulty: DifficultyLevel
): CpuMoveResult {
  switch (difficulty) {
    case 'easy':   return getEasyMove(board);
    case 'medium': return getMediumMove(board, symbol);
    case 'hard':   return getHardMove(board, symbol);
    default: {
      const _exhaustive: never = difficulty;
      throw new Error(`[cpu-engine] Unknown difficulty: ${String(_exhaustive)}`);
    }
  }
}