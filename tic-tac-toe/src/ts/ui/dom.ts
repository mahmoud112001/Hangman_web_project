// ══════════════════════════════════════════════════
// DOM.TS
// Typed DOM element references — queried once at
// startup and reused everywhere.
//
// Why centralise DOM queries?
//   1. If an ID changes in HTML, fix it in ONE place.
//   2. Fail fast with clear errors if elements are
//      missing (catches HTML/TS mismatches early).
//   3. Every other module gets typed references
//      without calling querySelector themselves.
// ══════════════════════════════════════════════════

import type { DomElements } from '../types';
import { DOM_IDS } from '../constants';

/**
 * Generic helper — queries element by ID and
 * asserts it exists and is the expected type.
 * Throws a descriptive error if not found.
 */
function getEl<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`[dom] Element not found: #${id}`);
  return el as T;
}

/**
 * Queries all board cells at once.
 */
function getCells(): NodeListOf<HTMLButtonElement> {
  const cells = document.querySelectorAll<HTMLButtonElement>('.board__cell');
  if (cells.length !== 9) {
    throw new Error(`[dom] Expected 9 board cells, found ${cells.length}`);
  }
  return cells;
}

/**
 * Builds and returns the complete typed DOM reference map.
 * Called once in main.ts and passed into the UI layer.
 */
export function buildDomElements(): DomElements {
  return {
    // App
    app:              getEl(DOM_IDS.APP),

    // Panels
    setupPanel:       getEl(DOM_IDS.SETUP_PANEL),
    gamePanel:        getEl(DOM_IDS.GAME_PANEL),

    // Setup controls
    btnPvp:           getEl<HTMLButtonElement>(DOM_IDS.BTN_PVP),
    btnPvc:           getEl<HTMLButtonElement>(DOM_IDS.BTN_PVC),
    difficultyGroup:  getEl(DOM_IDS.DIFFICULTY_GROUP),
    btnEasy:          getEl<HTMLButtonElement>(DOM_IDS.BTN_EASY),
    btnMedium:        getEl<HTMLButtonElement>(DOM_IDS.BTN_MEDIUM),
    btnHard:          getEl<HTMLButtonElement>(DOM_IDS.BTN_HARD),
    btnStart:         getEl<HTMLButtonElement>(DOM_IDS.BTN_START),

    // Scoreboard
    scoreX:           getEl(DOM_IDS.SCORE_X),
    scoreO:           getEl(DOM_IDS.SCORE_O),
    scoreDraw:        getEl(DOM_IDS.SCORE_DRAW),
    scoreLabelX:      getEl(DOM_IDS.SCORE_LABEL_X),
    scoreLabelO:      getEl(DOM_IDS.SCORE_LABEL_O),

    // Turn indicator
    turnIndicator:    getEl(DOM_IDS.TURN_INDICATOR),
    turnDot:          getEl(DOM_IDS.TURN_DOT),
    turnText:         getEl(DOM_IDS.TURN_TEXT),

    // Board
    board:            getEl(DOM_IDS.BOARD),
    cells:            getCells(),

    // Game controls
    btnRestart:       getEl<HTMLButtonElement>(DOM_IDS.BTN_RESTART),
    btnMenu:          getEl<HTMLButtonElement>(DOM_IDS.BTN_MENU),
    btnResetScore:    getEl<HTMLButtonElement>(DOM_IDS.BTN_RESET_SCORE),

    // Modal
    resultModal:      getEl(DOM_IDS.RESULT_MODAL),
    modalBackdrop:    getEl(DOM_IDS.MODAL_BACKDROP),
    modalIcon:        getEl(DOM_IDS.MODAL_ICON),
    modalTitle:       getEl(DOM_IDS.MODAL_TITLE),
    modalMessage:     getEl(DOM_IDS.MODAL_MESSAGE),
    modalScoreX:      getEl(DOM_IDS.MODAL_SCORE_X),
    modalScoreO:      getEl(DOM_IDS.MODAL_SCORE_O),
    modalScoreDraw:   getEl(DOM_IDS.MODAL_SCORE_DRAW),
    modalLabelX:      getEl(DOM_IDS.MODAL_LABEL_X),
    modalLabelO:      getEl(DOM_IDS.MODAL_LABEL_O),
    btnNextRound:     getEl<HTMLButtonElement>(DOM_IDS.BTN_NEXT_ROUND),
    btnModalRestart:  getEl<HTMLButtonElement>(DOM_IDS.BTN_MODAL_RESTART),
    btnModalMenu:     getEl<HTMLButtonElement>(DOM_IDS.BTN_MODAL_MENU),
  };
}

// Module-level singleton — set once, used everywhere
let _dom: DomElements | null = null;

export function initDom(): void {
  _dom = buildDomElements();
}

export function getDom(): DomElements {
  if (!_dom) throw new Error('[dom] DOM not initialised. Call initDom() first.');
  return _dom;
}