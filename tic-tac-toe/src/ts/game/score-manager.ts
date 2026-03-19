// ══════════════════════════════════════════════════
// SCORE-MANAGER.TS
// Score tracking across rounds.
//
// Responsibility:
//   - Recording a round result (win or draw)
//   - Resetting all scores
//   - Persisting scores to localStorage
//   - Loading scores from localStorage on startup
// ══════════════════════════════════════════════════

import type { PlayerSymbol } from '../types';
import {
  incrementScore,
  resetScores,
  getScores,
} from '../state';
import { symbolToScoreKey } from './player';
import { saveScores, loadScores } from '../utils/storage';

/**
 * Records a win for the given player symbol.
 * Increments their score and persists to storage.
 */
export function recordWin(winner: PlayerSymbol): void {
  const key = symbolToScoreKey(winner);
  incrementScore(key);
  persistScores();
}

/**
 * Records a draw round.
 * Increments the draws counter and persists.
 */
export function recordDraw(): void {
  incrementScore('draws');
  persistScores();
}

/**
 * Resets all scores to zero.
 * Clears localStorage entry as well.
 */
export function clearScores(): void {
  resetScores();
  persistScores();
}

/**
 * Saves current scores to localStorage.
 * Called internally after every score change.
 */
function persistScores(): void {
  const scores = getScores();
  saveScores(scores);
}

/**
 * Loads previously saved scores from localStorage
 * and hydrates state.
 *
 * Called once at app startup (in main.ts).
 * If no saved scores exist, nothing happens —
 * state keeps its default zeros.
 */
export function hydrateScores(): void {
  const saved = loadScores();
  if (!saved) return;

  // Replay increments to bring state up to saved values.
  // We can't directly set state values — we go through
  // the state API (incrementScore) to stay consistent.
  for (let i = 0; i < saved.x;     i++) incrementScore('x');
  for (let i = 0; i < saved.o;     i++) incrementScore('o');
  for (let i = 0; i < saved.draws; i++) incrementScore('draws');
}