// ══════════════════════════════════════════════════
// RENDERER.JS — State → DOM (only file that writes DOM)
// ══════════════════════════════════════════════════

import { getState } from '../state.js';
import { getDom } from './dom.js';
import { CSS, MESSAGES, PLAYER_NAMES } from '../constants.js';

function show(el) { el.classList.remove(CSS.HIDDEN); }
function hide(el) { el.classList.add(CSS.HIDDEN); }

function renderPanels() {
  const { status } = getState();
  const dom = getDom();
  if (status === 'setup') { show(dom.setupPanel); hide(dom.gamePanel); }
  else                    { hide(dom.setupPanel); show(dom.gamePanel); }
}

function renderBoard() {
  const { board, winningLine, status, isCpuThinking } = getState();
  const dom = getDom();

  dom.cells.forEach((cell, index) => {
    const value = board[index];
    cell.classList.remove(CSS.CELL_X, CSS.CELL_O, CSS.CELL_WINNER, CSS.CELL_DRAW, CSS.CELL_DISABLED);
    cell.removeAttribute('data-hover');

    if (value === 'X') cell.classList.add(CSS.CELL_X);
    if (value === 'O') cell.classList.add(CSS.CELL_O);
    if (winningLine?.includes(index)) cell.classList.add(CSS.CELL_WINNER);
    if (status === 'draw' && value !== null) cell.classList.add(CSS.CELL_DRAW);

    const isDisabled = value !== null || status === 'won' || status === 'draw' || isCpuThinking;
    cell.disabled = isDisabled;
    if (isDisabled && value === null) cell.classList.add(CSS.CELL_DISABLED);
  });

  const shouldLock = isCpuThinking || status === 'won' || status === 'draw';
  dom.board.classList.toggle(CSS.BOARD_LOCKED, shouldLock);

  if (status === 'playing' && !isCpuThinking) {
    const { currentTurn } = getState();
    dom.cells.forEach(cell => {
      if (!cell.disabled) cell.setAttribute('data-hover', currentTurn);
    });
  }
}

function renderTurnIndicator() {
  const { status, currentTurn, isCpuThinking, gameMode } = getState();
  const dom = getDom();

  dom.turnIndicator.classList.remove(CSS.TURN_X, CSS.TURN_O, CSS.TURN_THINKING);
  dom.turnDot.classList.remove(CSS.DOT_O, CSS.DOT_THINKING);

  if (status !== 'playing') { dom.turnText.textContent = ''; return; }

  if (isCpuThinking) {
    dom.turnIndicator.classList.add(CSS.TURN_THINKING);
    dom.turnDot.classList.add(CSS.DOT_THINKING);
    dom.turnText.textContent = MESSAGES.thinking;
    return;
  }

  const playerName = PLAYER_NAMES[gameMode]?.[currentTurn] ?? `Player ${currentTurn}`;
  if (currentTurn === 'X') {
    dom.turnIndicator.classList.add(CSS.TURN_X);
    dom.turnText.textContent = MESSAGES.turnX(playerName);
  } else {
    dom.turnIndicator.classList.add(CSS.TURN_O);
    dom.turnDot.classList.add(CSS.DOT_O);
    dom.turnText.textContent = MESSAGES.turnO(playerName);
  }
}

function renderScore() {
  const { scores, currentTurn, status, gameMode } = getState();
  const dom = getDom();

  dom.scoreX.textContent    = String(scores.x);
  dom.scoreO.textContent    = String(scores.o);
  dom.scoreDraw.textContent = String(scores.draws);

  dom.scoreLabelX.textContent = PLAYER_NAMES[gameMode]?.X ?? 'Player X';
  dom.scoreLabelO.textContent = PLAYER_NAMES[gameMode]?.O ?? 'Player O';

  const xCard = dom.scoreX.closest('.score-card');
  const oCard = dom.scoreO.closest('.score-card');
  xCard?.classList.toggle(CSS.SCORE_ACTIVE, status === 'playing' && currentTurn === 'X');
  oCard?.classList.toggle(CSS.SCORE_ACTIVE, status === 'playing' && currentTurn === 'O');
}

export function animateScoreBump(symbol) {
  const dom = getDom();
  const el  = symbol === 'X' ? dom.scoreX
            : symbol === 'O' ? dom.scoreO
            : dom.scoreDraw;

  el.classList.remove(CSS.SCORE_BUMP);
  void el.offsetWidth;
  el.classList.add(CSS.SCORE_BUMP);
  el.addEventListener('animationend', () => el.classList.remove(CSS.SCORE_BUMP), { once: true });
}

function renderSetup() {
  const { gameMode, difficulty } = getState();
  const dom = getDom();

  dom.btnPvp.classList.toggle(CSS.MODE_ACTIVE, gameMode === 'pvp');
  dom.btnPvc.classList.toggle(CSS.MODE_ACTIVE, gameMode === 'pvc');
  dom.btnPvp.setAttribute('aria-pressed', String(gameMode === 'pvp'));
  dom.btnPvc.setAttribute('aria-pressed', String(gameMode === 'pvc'));

  dom.difficultyGroup.classList.toggle(CSS.HIDDEN, gameMode !== 'pvc');

  dom.btnEasy.classList.toggle(CSS.DIFF_ACTIVE,   difficulty === 'easy');
  dom.btnMedium.classList.toggle(CSS.DIFF_ACTIVE, difficulty === 'medium');
  dom.btnHard.classList.toggle(CSS.DIFF_ACTIVE,   difficulty === 'hard');
  dom.btnEasy.setAttribute('aria-pressed',   String(difficulty === 'easy'));
  dom.btnMedium.setAttribute('aria-pressed', String(difficulty === 'medium'));
  dom.btnHard.setAttribute('aria-pressed',   String(difficulty === 'hard'));
}

export function renderAll() {
  renderPanels();
  renderSetup();
  renderBoard();
  renderTurnIndicator();
  renderScore();
}

export function renderAfterCpuStart() {
  renderTurnIndicator();
  renderBoard();
}
