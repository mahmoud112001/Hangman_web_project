// ══════════════════════════════════════════════════
// MODAL.TS
// Result modal — show, hide, populate content.
//
// Responsibility:
//   - Reading current state to build modal content
//   - Showing/hiding the modal element
//   - Setting title, message, icon, score snapshot
// ══════════════════════════════════════════════════

import { getState } from '../state';
import { getDom } from './dom';
import { CSS, MESSAGES, MODAL_ICONS, PLAYER_NAMES } from '../constants';
import { getPlayerName } from '../state';

/**
 * Populates and shows the result modal.
 * Reads from current game state.
 */
export function showModal(): void {
  const state = getState();
  const dom   = getDom();
  const { status, winner, scores, gameMode } = state;

  // ── Icon ─────────────────────────────────────
  dom.modalIcon.textContent = status === 'won' ? MODAL_ICONS.win : MODAL_ICONS.draw;

  // ── Title & title color class ─────────────────
  dom.modalTitle.classList.remove(CSS.MODAL_X, CSS.MODAL_O, CSS.MODAL_DRAW);

  if (status === 'won' && winner) {
    const name = PLAYER_NAMES[gameMode]?.[winner] ?? `Player ${winner}`;
    dom.modalTitle.textContent = MESSAGES.winX(name);
    dom.modalTitle.classList.add(winner === 'X' ? CSS.MODAL_X : CSS.MODAL_O);
  } else {
    dom.modalTitle.textContent = MESSAGES.draw;
    dom.modalTitle.classList.add(CSS.MODAL_DRAW);
  }

  // ── Message ───────────────────────────────────
  dom.modalMessage.textContent = status === 'won' ? MESSAGES.winSub : MESSAGES.drawSub;

  // ── Score snapshot ────────────────────────────
  dom.modalScoreX.textContent    = String(scores.x);
  dom.modalScoreO.textContent    = String(scores.o);
  dom.modalScoreDraw.textContent = String(scores.draws);
  dom.modalLabelX.textContent    = PLAYER_NAMES[gameMode]?.X ?? 'X';
  dom.modalLabelO.textContent    = PLAYER_NAMES[gameMode]?.O ?? 'O';

  // ── Show ──────────────────────────────────────
  dom.resultModal.classList.remove(CSS.HIDDEN);
  dom.resultModal.style.display = '';

  // Focus the primary action button for accessibility
  setTimeout(() => dom.btnNextRound.focus(), 50);
}

/**
 * Hides the result modal.
 * Called before starting a new round.
 */
export function hideModal(): void {
  const dom = getDom();
  dom.resultModal.classList.add(CSS.HIDDEN);
}