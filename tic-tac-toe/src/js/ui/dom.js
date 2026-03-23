// ══════════════════════════════════════════════════
// DOM.JS — Typed DOM references queried once
// ══════════════════════════════════════════════════

import { DOM_IDS } from '../constants.js';

function getEl(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`[dom] Element not found: #${id}`);
  return el;
}

function getCells() {
  const cells = document.querySelectorAll('.board__cell');
  if (cells.length !== 9) throw new Error(`[dom] Expected 9 cells, found ${cells.length}`);
  return cells;
}

export function buildDomElements() {
  return {
    app:             getEl(DOM_IDS.APP),
    setupPanel:      getEl(DOM_IDS.SETUP_PANEL),
    gamePanel:       getEl(DOM_IDS.GAME_PANEL),
    btnPvp:          getEl(DOM_IDS.BTN_PVP),
    btnPvc:          getEl(DOM_IDS.BTN_PVC),
    difficultyGroup: getEl(DOM_IDS.DIFFICULTY_GROUP),
    btnEasy:         getEl(DOM_IDS.BTN_EASY),
    btnMedium:       getEl(DOM_IDS.BTN_MEDIUM),
    btnHard:         getEl(DOM_IDS.BTN_HARD),
    btnStart:        getEl(DOM_IDS.BTN_START),
    scoreX:          getEl(DOM_IDS.SCORE_X),
    scoreO:          getEl(DOM_IDS.SCORE_O),
    scoreDraw:       getEl(DOM_IDS.SCORE_DRAW),
    scoreLabelX:     getEl(DOM_IDS.SCORE_LABEL_X),
    scoreLabelO:     getEl(DOM_IDS.SCORE_LABEL_O),
    turnIndicator:   getEl(DOM_IDS.TURN_INDICATOR),
    turnDot:         getEl(DOM_IDS.TURN_DOT),
    turnText:        getEl(DOM_IDS.TURN_TEXT),
    board:           getEl(DOM_IDS.BOARD),
    cells:           getCells(),
    btnRestart:      getEl(DOM_IDS.BTN_RESTART),
    btnMenu:         getEl(DOM_IDS.BTN_MENU),
    btnResetScore:   getEl(DOM_IDS.BTN_RESET_SCORE),
    resultModal:     getEl(DOM_IDS.RESULT_MODAL),
    modalBackdrop:   getEl(DOM_IDS.MODAL_BACKDROP),
    modalIcon:       getEl(DOM_IDS.MODAL_ICON),
    modalTitle:      getEl(DOM_IDS.MODAL_TITLE),
    modalMessage:    getEl(DOM_IDS.MODAL_MESSAGE),
    modalScoreX:     getEl(DOM_IDS.MODAL_SCORE_X),
    modalScoreO:     getEl(DOM_IDS.MODAL_SCORE_O),
    modalScoreDraw:  getEl(DOM_IDS.MODAL_SCORE_DRAW),
    modalLabelX:     getEl(DOM_IDS.MODAL_LABEL_X),
    modalLabelO:     getEl(DOM_IDS.MODAL_LABEL_O),
    btnNextRound:    getEl(DOM_IDS.BTN_NEXT_ROUND),
    btnModalRestart: getEl(DOM_IDS.BTN_MODAL_RESTART),
    btnModalMenu:    getEl(DOM_IDS.BTN_MODAL_MENU),
  };
}

let _dom = null;

export function initDom() {
  _dom = buildDomElements();
}

export function getDom() {
  if (!_dom) throw new Error('[dom] Not initialised. Call initDom() first.');
  return _dom;
}
