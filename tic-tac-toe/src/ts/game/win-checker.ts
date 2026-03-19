// ══════════════════════════════════════════════════
// WIN-CHECKER.TS
// Win and draw detection. Pure functions only.
// No state mutation. No DOM.
//
// Responsibility:
//   - Check if a symbol has won on a given board
//   - Check if the board is a draw
//   - Return winning line for highlight rendering
//
// Why pure functions?
//   The AI needs to call these hundreds of times
//   during Minimax simulation. Pure functions are
//   fast, testable, and have zero side effects.
// ══════════════════════════════════════════════════

import type { BoardState, PlayerSymbol, WinResult } from '../types';
import { WINNING_COMBOS } from '../constants';
import { isBoardFull } from './board';

/**
 * Checks if the given symbol has a winning line
 * on the given board.
 *
 * How it works:
 *   Iterates all 8 winning combinations.
 *   For each combo [a, b, c], checks if all three
 *   cells contain the given symbol.
 *   Returns the result object with winner + line,
 *   or null if no win found.
 *
 * Time complexity: O(8) = O(1) — always 8 checks.
 */
export function checkWinner(
  board: BoardState,
  symbol: PlayerSymbol
): WinResult | null {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo;

    if (
      board[a] === symbol &&
      board[b] === symbol &&
      board[c] === symbol
    ) {
      return { winner: symbol, line: combo };
    }
  }

  return null;
}

/**
 * Checks if either player has won.
 * Returns the WinResult for the winner, or null.
 *
 * Call order matters for correctness:
 *   Always check the player who just moved first.
 *   This avoids falsely reporting the wrong winner
 *   in edge cases. game-manager passes the last
 *   player who moved as `lastPlayed`.
 */
export function checkAnyWinner(
  board: BoardState,
  lastPlayed: PlayerSymbol
): WinResult | null {
  // Check the last player first (most likely winner)
  const result = checkWinner(board, lastPlayed);
  if (result) return result;

  // Then check the other player (defensive check)
  const other: PlayerSymbol = lastPlayed === 'X' ? 'O' : 'X';
  return checkWinner(board, other);
}

/**
 * Returns true if the board is a draw:
 *   - No empty cells remaining
 *   - AND no winner
 *
 * Must be called AFTER checkAnyWinner returns null.
 */
export function checkDraw(board: BoardState): boolean {
  return isBoardFull(board);
}

/**
 * Combined check — returns:
 *   { type: 'won',  result: WinResult } if there's a winner
 *   { type: 'draw' }                   if it's a draw
 *   null                               if game is still in progress
 *
 * This is the main entry point used by game-manager
 * after every move.
 */
export function evaluateBoard(
  board: BoardState,
  lastPlayed: PlayerSymbol
): { type: 'won'; result: WinResult } | { type: 'draw' } | null {
  const winResult = checkAnyWinner(board, lastPlayed);

  if (winResult) {
    return { type: 'won', result: winResult };
  }

  if (checkDraw(board)) {
    return { type: 'draw' };
  }

  return null;
}

/**
 * Fast win check for Minimax — returns just true/false.
 * Used in the recursive AI where we only need to know
 * if the board is terminal, not which line won.
 * Avoids creating WinResult objects on every recursion.
 */
export function hasWon(board: BoardState, symbol: PlayerSymbol): boolean {
  return WINNING_COMBOS.some(([a, b, c]) =>
    board[a] === symbol &&
    board[b] === symbol &&
    board[c] === symbol
  );
}