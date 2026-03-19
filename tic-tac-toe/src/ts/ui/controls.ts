// ══════════════════════════════════════════════════
// CONTROLS.TS — Event listeners → game-manager
// ══════════════════════════════════════════════════

import { getState, setGameConfig } from '../state';
import { getDom } from './dom';
import { hideModal } from './modal';
import { renderAll } from './renderer';
import {
  handleCellClick,
  handleStartGame,
  handleRestartRound,
  handleNextRound,
  handleReturnToMenu,
  handleResetScores,
} from '../game/game-manager';
import { isValidMode, isValidDifficulty } from '../utils/validators';

// ── Setup: mode selection ─────────────────────────
function onModeClick(e: Event): void {
  const btn  = e.currentTarget as HTMLButtonElement;
  const mode = btn.dataset['mode'];
  if (!isValidMode(mode)) return;
  setGameConfig(mode, getState().difficulty);
  renderAll();
}

// ── Setup: difficulty selection ───────────────────
function onDifficultyClick(e: Event): void {
  const btn        = e.currentTarget as HTMLButtonElement;
  const difficulty = btn.dataset['difficulty'];
  if (!isValidDifficulty(difficulty)) return;
  setGameConfig(getState().gameMode, difficulty);
  renderAll();
}

// ── Setup: start game ─────────────────────────────
function onStartGame(): void {
  const { gameMode, difficulty } = getState();
  handleStartGame(gameMode, difficulty);
}

// ── Board: cell click ─────────────────────────────
function onCellClick(e: Event): void {
  const cell  = e.currentTarget as HTMLButtonElement;
  const raw   = cell.dataset['index'];
  if (raw === undefined) return;
  const index = Number(raw);
  if (isNaN(index)) return;
  handleCellClick(index);
}

// ── Game controls ─────────────────────────────────
function onRestartRound(): void { hideModal(); handleRestartRound(); }
function onNextRound():    void { hideModal(); handleNextRound();    }
function onReturnToMenu(): void { hideModal(); handleReturnToMenu(); }
function onResetScores():  void { handleResetScores(); }

// ── Keyboard support ──────────────────────────────
function onKeyDown(e: KeyboardEvent): void {
  if (e.key === 'Escape') {
    const { status } = getState();
    if (status === 'won' || status === 'draw') {
      hideModal();
      handleNextRound();
    }
  }
}

// ══════════════════════════════════════════════════
// BIND ALL LISTENERS
// ══════════════════════════════════════════════════
export function bindControls(): void {
  const dom = getDom();

  dom.btnPvp.addEventListener('click',    onModeClick);
  dom.btnPvc.addEventListener('click',    onModeClick);
  dom.btnEasy.addEventListener('click',   onDifficultyClick);
  dom.btnMedium.addEventListener('click', onDifficultyClick);
  dom.btnHard.addEventListener('click',   onDifficultyClick);
  dom.btnStart.addEventListener('click',  onStartGame);

  dom.cells.forEach(cell => {
    cell.addEventListener('click', onCellClick);
  });

  dom.btnRestart.addEventListener('click',    onRestartRound);
  dom.btnMenu.addEventListener('click',       onReturnToMenu);
  dom.btnResetScore.addEventListener('click', onResetScores);

  dom.btnNextRound.addEventListener('click',    onNextRound);
  dom.btnModalRestart.addEventListener('click', onRestartRound);
  dom.btnModalMenu.addEventListener('click',    onReturnToMenu);
  dom.modalBackdrop.addEventListener('click',   onNextRound);

  document.addEventListener('keydown', onKeyDown);
}