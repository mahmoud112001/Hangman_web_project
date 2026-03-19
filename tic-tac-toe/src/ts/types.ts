// ══════════════════════════════════════════════════
// TYPES.TS
// Single source of truth for all type definitions.
// No imports. No side effects. Pure type declarations.
// Every module in this project imports from here.
// ══════════════════════════════════════════════════

// ── Player symbols ────────────────────────────────
// Union type preferred over enum here — lighter,
// no runtime output, works as string literals.
export type PlayerSymbol = 'X' | 'O';

// ── Cell value ────────────────────────────────────
// A cell is either taken by a player, or empty (null).
export type CellValue = PlayerSymbol | null;

// ── Board ─────────────────────────────────────────
// Flat array of 9 cells. Index maps to position:
//   0 | 1 | 2
//   3 | 4 | 5
//   6 | 7 | 8
// readonly prevents accidental direct mutation.
export type BoardState = readonly CellValue[];

// ── Game modes ────────────────────────────────────
export type GameMode = 'pvp' | 'pvc';

// ── Difficulty levels ─────────────────────────────
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

// ── Game lifecycle status ─────────────────────────
// 'setup'   → on the start screen
// 'playing' → active game, accepting moves
// 'won'     → a player has won this round
// 'draw'    → board full, no winner
export type GameStatus = 'setup' | 'playing' | 'won' | 'draw';

// ── Round result (mirrors status for clarity) ─────
export type RoundResult = 'won' | 'draw';

// ── Winning combination ───────────────────────────
// A tuple of 3 cell indices that form a winning line.
export type WinningLine = [number, number, number];

// ── Win check result ──────────────────────────────
// Returned by win-checker. null = no result yet.
export interface WinResult {
  readonly winner: PlayerSymbol;
  readonly line: WinningLine;
}

// ── Score state ───────────────────────────────────
export interface ScoreState {
  x: number;
  o: number;
  draws: number;
}

// ── Full game state ───────────────────────────────
// This is the single source of truth for every
// rendering decision in the entire application.
export interface GameState {
  // Board
  board: CellValue[];           // mutable array — mutated via state functions only

  // Turn
  currentTurn: PlayerSymbol;    // whose turn it is right now

  // Config (set during setup, unchanged mid-game)
  gameMode: GameMode;
  difficulty: DifficultyLevel;

  // Lifecycle
  status: GameStatus;

  // Result (null until game ends)
  winner: PlayerSymbol | null;
  winningLine: WinningLine | null;

  // Scores (persist across rounds)
  scores: ScoreState;

  // UI helpers
  isCpuThinking: boolean;       // true while CPU delay is running
}

// ── CPU move result ───────────────────────────────
export interface CpuMoveResult {
  readonly index: number;       // chosen cell index 0-8
}

// ── Minimax result ────────────────────────────────
// Internal to hard-ai.ts — not exported as part of
// the public surface but typed for clarity.
export interface MinimaxResult {
  readonly score: number;
  readonly index: number;
}

// ── DOM element map ───────────────────────────────
// Typed reference bag for all queried DOM elements.
// Keeps dom.ts clean — one interface, one place.
export interface DomElements {
  // App
  readonly app: HTMLElement;

  // Panels
  readonly setupPanel: HTMLElement;
  readonly gamePanel: HTMLElement;

  // Setup
  readonly btnPvp: HTMLButtonElement;
  readonly btnPvc: HTMLButtonElement;
  readonly difficultyGroup: HTMLElement;
  readonly btnEasy: HTMLButtonElement;
  readonly btnMedium: HTMLButtonElement;
  readonly btnHard: HTMLButtonElement;
  readonly btnStart: HTMLButtonElement;

  // Scoreboard
  readonly scoreX: HTMLElement;
  readonly scoreO: HTMLElement;
  readonly scoreDraw: HTMLElement;
  readonly scoreLabelX: HTMLElement;
  readonly scoreLabelO: HTMLElement;

  // Turn indicator
  readonly turnIndicator: HTMLElement;
  readonly turnDot: HTMLElement;
  readonly turnText: HTMLElement;

  // Board
  readonly board: HTMLElement;
  readonly cells: NodeListOf<HTMLButtonElement>;

  // Controls
  readonly btnRestart: HTMLButtonElement;
  readonly btnMenu: HTMLButtonElement;
  readonly btnResetScore: HTMLButtonElement;

  // Modal
  readonly resultModal: HTMLElement;
  readonly modalBackdrop: HTMLElement;
  readonly modalIcon: HTMLElement;
  readonly modalTitle: HTMLElement;
  readonly modalMessage: HTMLElement;
  readonly modalScoreX: HTMLElement;
  readonly modalScoreO: HTMLElement;
  readonly modalScoreDraw: HTMLElement;
  readonly modalLabelX: HTMLElement;
  readonly modalLabelO: HTMLElement;
  readonly btnNextRound: HTMLButtonElement;
  readonly btnModalRestart: HTMLButtonElement;
  readonly btnModalMenu: HTMLButtonElement;
}