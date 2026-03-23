// ══════════════════════════════════════════════════
// GAME-MANAGER.JS — Central orchestrator
// ══════════════════════════════════════════════════

import {
  getState, getBoard, placeMove,
  setWinner, setDraw, resetScores,
} from '../state.js';
import { executeMove, advanceTurn, shouldTriggerCpu, scheduleCpuMove } from './turn-manager.js';
import { evaluateBoard } from './win-checker.js';
import { recordWin, recordDraw } from './score-manager.js';
import { beginGame, restartRound, nextRound, returnToMenu } from './round-manager.js';
import { getCpuMove } from '../ai/cpu-engine.js';
import { renderAll, renderAfterCpuStart, animateScoreBump } from '../ui/renderer.js';
import { showModal, hideModal } from '../ui/modal.js';

// ── Human cell click ──────────────────────────────

export function handleCellClick(index) {
  const state = getState();
  if (state.status !== 'playing') return;
  if (state.isCpuThinking) return;

  const symbol = state.currentTurn;
  const moved  = executeMove(index, symbol);
  if (!moved) return;

  const evaluation = evaluateBoard(getBoard(), symbol);

  if (evaluation?.type === 'won') {
    setWinner(evaluation.result.winner, evaluation.result.line);
    recordWin(evaluation.result.winner);
    animateScoreBump(evaluation.result.winner);
    renderAll();
    showModal();
    return;
  }

  if (evaluation?.type === 'draw') {
    setDraw();
    recordDraw();
    animateScoreBump('draw');
    renderAll();
    showModal();
    return;
  }

  advanceTurn();
  renderAll();

  if (shouldTriggerCpu()) {
    renderAfterCpuStart();
    scheduleCpuMove(executeCpuTurn);
  }
}

// ── CPU turn ──────────────────────────────────────

function executeCpuTurn() {
  const state  = getState();
  const board  = getBoard();
  const symbol = state.currentTurn;

  const cpuMove = getCpuMove(board, symbol, state.difficulty);
  placeMove(cpuMove.index, symbol);

  const evaluation = evaluateBoard(getBoard(), symbol);

  if (evaluation?.type === 'won') {
    setWinner(evaluation.result.winner, evaluation.result.line);
    recordWin(evaluation.result.winner);
    animateScoreBump(evaluation.result.winner);
    renderAll();
    showModal();
    return;
  }

  if (evaluation?.type === 'draw') {
    setDraw();
    recordDraw();
    animateScoreBump('draw');
    renderAll();
    showModal();
    return;
  }

  advanceTurn();
  renderAll();
}

// ── Lifecycle handlers ────────────────────────────

export function handleStartGame(mode, difficulty) {
  beginGame(mode, difficulty);
  renderAll();
}

export function handleRestartRound() {
  hideModal();
  restartRound();
  renderAll();
}

export function handleNextRound() {
  hideModal();
  nextRound();
  renderAll();
}

export function handleReturnToMenu() {
  hideModal();
  returnToMenu();
  renderAll();
}

export function handleResetScores() {
  resetScores();
  restartRound();
  renderAll();
}
