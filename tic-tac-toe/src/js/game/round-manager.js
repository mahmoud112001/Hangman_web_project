// ══════════════════════════════════════════════════
// ROUND-MANAGER.JS — Round lifecycle
// ══════════════════════════════════════════════════

import { setGameConfig, startGame, resetRound, resetGame, resetToMenu } from '../state.js';

export function beginGame(mode, difficulty) {
  setGameConfig(mode, difficulty);
  startGame();
}

export function restartRound() {
  resetRound();
}

export function nextRound() {
  resetRound();
}

export function returnToMenu() {
  resetToMenu();
}

export function fullReset() {
  resetGame();
}
