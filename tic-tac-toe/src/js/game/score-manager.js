// ══════════════════════════════════════════════════
// SCORE-MANAGER.JS — Score tracking across rounds
// ══════════════════════════════════════════════════

import { incrementScore, resetScores, getScores } from '../state.js';
import { symbolToScoreKey } from './player.js';
import { saveScores, loadScores } from '../utils/storage.js';

export function recordWin(winner) {
  const key = symbolToScoreKey(winner);
  incrementScore(key);
  persistScores();
}

export function recordDraw() {
  incrementScore('draws');
  persistScores();
}

export function clearScores() {
  resetScores();
  persistScores();
}

function persistScores() {
  const scores = getScores();
  saveScores(scores);
}

export function hydrateScores() {
  const saved = loadScores();
  if (!saved) return;
  for (let i = 0; i < saved.x;     i++) incrementScore('x');
  for (let i = 0; i < saved.o;     i++) incrementScore('o');
  for (let i = 0; i < saved.draws; i++) incrementScore('draws');
}
