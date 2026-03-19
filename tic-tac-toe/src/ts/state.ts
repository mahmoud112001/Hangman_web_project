// ══════════════════════════════════════════════════
// STATE.TS
// Central game state + controlled mutation functions.
//
// Rules:
//   1. Only this file directly mutates `_state`.
//   2. All other modules call functions from here.
//   3. Callers never receive a mutable reference.
//   4. `getState()` returns a shallow clone —
//      safe for reading, not for direct mutation.
// ══════════════════════════════════════════════════

import type {
  GameState,
  CellValue,
  PlayerSymbol,
  GameMode,
  DifficultyLevel,
  GameStatus,
  WinningLine,
} from './types';

import {
  BOARD_SIZE,
  FIRST_PLAYER,
  PLAYER_NAMES,
} from './constants';

// ── Initial state factory ─────────────────────────
// A function (not a const) so each call creates
// a fresh object — no shared reference bugs.

function createInitialState(): GameState {
  return {
    board:        Array(BOARD_SIZE).fill(null) as CellValue[],
    currentTurn:  FIRST_PLAYER,
    gameMode:     'pvp',
    difficulty:   'easy',
    status:       'setup',
    winner:       null,
    winningLine:  null,
    scores:       { x: 0, o: 0, draws: 0 },
    isCpuThinking: false,
  };
}

// ── Private state object ──────────────────────────
// Never export this directly. All access goes
// through the functions below.
let _state: GameState = createInitialState();

// ══════════════════════════════════════════════════
// READ — Safe access (shallow clone)
// ══════════════════════════════════════════════════

/**
 * Returns a shallow copy of the current game state.
 * Callers can safely read all top-level properties.
 * Note: `board` and `scores` are still references —
 * do not mutate them directly.
 */
export function getState(): Readonly<GameState> {
  return { ..._state };
}

/**
 * Returns the current board as a readonly snapshot.
 * Used by AI modules that need to inspect the board.
 */
export function getBoard(): readonly CellValue[] {
  return [..._state.board];
}

// ══════════════════════════════════════════════════
// WRITE — Controlled mutations
// Each function has a single, explicit purpose.
// ══════════════════════════════════════════════════

/** Sets game mode and difficulty from the setup screen. */
export function setGameConfig(mode: GameMode, difficulty: DifficultyLevel): void {
  _state.gameMode   = mode;
  _state.difficulty = difficulty;
}

/** Transitions game from setup → playing. Resets the board. */
export function startGame(): void {
  _state.board       = Array(BOARD_SIZE).fill(null) as CellValue[];
  _state.currentTurn = FIRST_PLAYER;
  _state.status      = 'playing';
  _state.winner      = null;
  _state.winningLine = null;
  _state.isCpuThinking = false;
}

/** Places a symbol on a cell. Does NOT validate — caller must validate first. */
export function placeMove(index: number, symbol: PlayerSymbol): void {
  _state.board[index] = symbol;
}

/** Switches the active player turn. */
export function switchTurn(): void {
  _state.currentTurn = _state.currentTurn === 'X' ? 'O' : 'X';
}

/** Marks the game as won. Sets winner and winning line. */
export function setWinner(symbol: PlayerSymbol, line: WinningLine): void {
  _state.status      = 'won';
  _state.winner      = symbol;
  _state.winningLine = line;
}

/** Marks the game as a draw. */
export function setDraw(): void {
  _state.status = 'draw';
  _state.winner = null;
  _state.winningLine = null;
}

/** Increments score for the winner or draws. */
export function incrementScore(result: 'x' | 'o' | 'draws'): void {
  _state.scores[result]++;
}

/** Resets all scores to zero. */
export function resetScores(): void {
  _state.scores = { x: 0, o: 0, draws: 0 };
}

/** Resets the board and turn for a new round. Preserves scores and config. */
export function resetRound(): void {
  _state.board       = Array(BOARD_SIZE).fill(null) as CellValue[];
  _state.currentTurn = FIRST_PLAYER;
  _state.status      = 'playing';
  _state.winner      = null;
  _state.winningLine = null;
  _state.isCpuThinking = false;
}

/** Sets the CPU thinking flag — used to lock board during CPU delay. */
export function setCpuThinking(thinking: boolean): void {
  _state.isCpuThinking = thinking;
}

/** Full reset — goes back to setup screen with cleared scores. */
export function resetGame(): void {
  const saved = { ..._state.scores };  // preserve scores if needed by caller
  _state = createInitialState();
  // Note: scores are intentionally reset here too.
  // The caller (game-manager) decides whether to preserve them.
  void saved;
}

/** Full reset preserving scores — used when returning to menu mid-game. */
export function resetToMenu(): void {
  const savedScores = { ..._state.scores };
  const savedMode   = _state.gameMode;
  const savedDiff   = _state.difficulty;

  _state = createInitialState();
  _state.scores     = savedScores;
  _state.gameMode   = savedMode;
  _state.difficulty = savedDiff;
}

// ══════════════════════════════════════════════════
// DERIVED GETTERS
// Computed values that don't change state.
// ══════════════════════════════════════════════════

/** Returns true if it's currently the CPU's turn. */
export function isCpuTurn(): boolean {
  return _state.gameMode === 'pvc' && _state.currentTurn === 'O';
}

/** Returns true if the game is still in progress. */
export function isPlaying(): boolean {
  return _state.status === 'playing';
}

/** Returns the display name for a given symbol. */
export function getPlayerName(symbol: PlayerSymbol): string {
  return PLAYER_NAMES[_state.gameMode]?.[symbol] ?? `Player ${symbol}`;
}

/** Returns a readonly snapshot of current scores. */
export function getScores(): Readonly<typeof _state.scores> {
  return { ..._state.scores };
}