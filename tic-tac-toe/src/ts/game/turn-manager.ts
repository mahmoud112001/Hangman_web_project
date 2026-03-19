// ══════════════════════════════════════════════════
// TURN-MANAGER.TS
// Controls turn flow — who moves, when CPU triggers.
//
// Responsibility:
//   - Validating if a move is legal
//   - Switching turn after a valid move
//   - Deciding when to trigger the CPU
//   - Managing the CPU thinking delay
// ══════════════════════════════════════════════════

import type { PlayerSymbol } from '../types';
import {
  getState,
  placeMove,
  switchTurn,
  setCpuThinking,
  isCpuTurn,
  isPlaying,
} from '../state';
import { isCellEmpty } from './board';
import { CPU_DELAY } from '../constants';

/**
 * Validates whether a move at `index` is legal.
 *
 * A move is illegal if:
 *   - The game is not in 'playing' status
 *   - The CPU is currently thinking (board locked)
 *   - The cell is already occupied
 */
export function isLegalMove(index: number): boolean {
  const state = getState();

  if (!isPlaying())           return false;
  if (state.isCpuThinking)    return false;
  if (!isCellEmpty(state.board, index)) return false;

  return true;
}

/**
 * Executes a human player move.
 *
 * Steps:
 *   1. Validate the move
 *   2. Place the symbol on the board
 *   3. Return true so game-manager can evaluate result
 *
 * Does NOT switch turns — game-manager handles
 * the full post-move flow after evaluation.
 */
export function executeMove(index: number, symbol: PlayerSymbol): boolean {
  if (!isLegalMove(index)) return false;

  placeMove(index, symbol);
  return true;
}

/**
 * Switches the active turn to the next player.
 * Called by game-manager after a move that did
 * not end the round.
 */
export function advanceTurn(): void {
  switchTurn();
}

/**
 * Returns true if it's now the CPU's turn.
 * game-manager calls this after every human move
 * to decide whether to trigger the AI.
 */
export function shouldTriggerCpu(): boolean {
  return isCpuTurn() && isPlaying();
}

/**
 * Triggers the CPU move after a realistic delay.
 *
 * Flow:
 *   1. Set isCpuThinking = true  (board locks, UI shows "thinking")
 *   2. Wait for delay based on difficulty
 *   3. Call the provided `onCpuReady` callback
 *      (game-manager passes this to maintain control)
 *   4. Callback handles: AI move selection + board update + evaluation
 *
 * Why a callback instead of returning the move here?
 *   Because setTimeout is async — we can't `return`
 *   the move synchronously. The callback pattern
 *   keeps game-manager in control of the full flow.
 */
export function scheduleCpuMove(onCpuReady: () => void): void {
  const { difficulty } = getState();
  const delay = CPU_DELAY[difficulty] ?? CPU_DELAY.medium;

  setCpuThinking(true);

  window.setTimeout(() => {
    setCpuThinking(false);
    onCpuReady();
  }, delay);
}