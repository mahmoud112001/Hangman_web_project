// ══════════════════════════════════════════════════
// CONTROLS.JS — All event listeners → game-manager
// ══════════════════════════════════════════════════

import { getState, setGameConfig } from '../state.js';
import { getDom } from './dom.js';
import { hideModal } from './modal.js';
import { renderAll } from './renderer.js';
import {
  handleCellClick,
  handleStartGame,
  handleRestartRound,
  handleNextRound,
  handleReturnToMenu,
  handleResetScores,
} from '../game/game-manager.js';
import { isValidMode, isValidDifficulty } from '../utils/validators.js';

// ── Setup ─────────────────────────────────────────

function onModeClick(e) {
  const btn  = e.currentTarget;
  const mode = btn.dataset['mode'];
  if (!isValidMode(mode)) return;
  setGameConfig(mode, getState().difficulty);
  renderAll();
}

function onDifficultyClick(e) {
  const btn        = e.currentTarget;
  const difficulty = btn.dataset['difficulty'];
  if (!isValidDifficulty(difficulty)) return;
  setGameConfig(getState().gameMode, difficulty);
  renderAll();
}

function onStartGame() {
  const { gameMode, difficulty } = getState();
  handleStartGame(gameMode, difficulty);
}

// ── Board ─────────────────────────────────────────

function onCellClick(e) {
  const cell = e.currentTarget;
  const raw  = cell.dataset['index'];
  if (raw === undefined) return;
  const index = Number(raw);
  if (isNaN(index)) return;
  handleCellClick(index);
}

// ── Controls ──────────────────────────────────────

function onRestartRound() { hideModal(); handleRestartRound(); }
function onNextRound()    { hideModal(); handleNextRound();    }
function onReturnToMenu() { hideModal(); handleReturnToMenu(); }
function onResetScores()  { handleResetScores(); }

// ── Keyboard ──────────────────────────────────────

function onKeyDown(e) {
  if (e.key === 'Escape') {
    const { status } = getState();
    if (status === 'won' || status === 'draw') {
      hideModal();
      handleNextRound();
    }
  }
}

// ── Bind all ──────────────────────────────────────

export function bindControls() {
  const dom = getDom();

  dom.btnPvp.addEventListener('click',    onModeClick);
  dom.btnPvc.addEventListener('click',    onModeClick);
  dom.btnEasy.addEventListener('click',   onDifficultyClick);
  dom.btnMedium.addEventListener('click', onDifficultyClick);
  dom.btnHard.addEventListener('click',   onDifficultyClick);
  dom.btnStart.addEventListener('click',  onStartGame);

  dom.cells.forEach(cell => cell.addEventListener('click', onCellClick));

  dom.btnRestart.addEventListener('click',    onRestartRound);
  dom.btnMenu.addEventListener('click',       onReturnToMenu);
  dom.btnResetScore.addEventListener('click', onResetScores);

  dom.btnNextRound.addEventListener('click',    onNextRound);
  dom.btnModalRestart.addEventListener('click', onRestartRound);
  dom.btnModalMenu.addEventListener('click',    onReturnToMenu);
  dom.modalBackdrop.addEventListener('click',   onNextRound);

  document.addEventListener('keydown', onKeyDown);
}
