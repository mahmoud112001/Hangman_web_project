// ══════════════════════════════════════════════════
// STATE.JS — Central game state + mutations
// ══════════════════════════════════════════════════

import { BOARD_SIZE, FIRST_PLAYER, PLAYER_NAMES } from './constants.js';

function createInitialState() {
  return {
    board:         Array(BOARD_SIZE).fill(null),
    currentTurn:   FIRST_PLAYER,
    gameMode:      'pvp',
    difficulty:    'easy',
    status:        'setup',
    winner:        null,
    winningLine:   null,
    scores:        { x: 0, o: 0, draws: 0 },
    isCpuThinking: false,
  };
}

let _state = createInitialState();

// ── READ ──────────────────────────────────────────

export function getState() {
  return { ..._state };
}

export function getBoard() {
  return [..._state.board];
}

// ── WRITE ─────────────────────────────────────────

export function setGameConfig(mode, difficulty) {
  _state.gameMode   = mode;
  _state.difficulty = difficulty;
}

export function startGame() {
  _state.board         = Array(BOARD_SIZE).fill(null);
  _state.currentTurn   = FIRST_PLAYER;
  _state.status        = 'playing';
  _state.winner        = null;
  _state.winningLine   = null;
  _state.isCpuThinking = false;
}

export function placeMove(index, symbol) {
  _state.board[index] = symbol;
}

export function switchTurn() {
  _state.currentTurn = _state.currentTurn === 'X' ? 'O' : 'X';
}

export function setWinner(symbol, line) {
  _state.status      = 'won';
  _state.winner      = symbol;
  _state.winningLine = line;
}

export function setDraw() {
  _state.status      = 'draw';
  _state.winner      = null;
  _state.winningLine = null;
}

export function incrementScore(result) {
  _state.scores[result]++;
}

export function resetScores() {
  _state.scores = { x: 0, o: 0, draws: 0 };
}

export function resetRound() {
  _state.board         = Array(BOARD_SIZE).fill(null);
  _state.currentTurn   = FIRST_PLAYER;
  _state.status        = 'playing';
  _state.winner        = null;
  _state.winningLine   = null;
  _state.isCpuThinking = false;
}

export function setCpuThinking(thinking) {
  _state.isCpuThinking = thinking;
}

export function resetGame() {
  _state = createInitialState();
}

export function resetToMenu() {
  const savedScores = { ..._state.scores };
  const savedMode   = _state.gameMode;
  const savedDiff   = _state.difficulty;
  _state            = createInitialState();
  _state.scores     = savedScores;
  _state.gameMode   = savedMode;
  _state.difficulty = savedDiff;
}

// ── DERIVED GETTERS ───────────────────────────────

export function isCpuTurn() {
  return _state.gameMode === 'pvc' && _state.currentTurn === 'O';
}

export function isPlaying() {
  return _state.status === 'playing';
}

export function getPlayerName(symbol) {
  return PLAYER_NAMES[_state.gameMode]?.[symbol] ?? `Player ${symbol}`;
}

export function getScores() {
  return { ..._state.scores };
}
