// ══════════════════════════════════════════════════
// WIN-CHECKER.JS — Win and draw detection
// ══════════════════════════════════════════════════

import { WINNING_COMBOS } from '../constants.js';
import { isBoardFull } from './board.js';

export function checkWinner(board, symbol) {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] === symbol && board[b] === symbol && board[c] === symbol) {
      return { winner: symbol, line: combo };
    }
  }
  return null;
}

export function checkAnyWinner(board, lastPlayed) {
  const result = checkWinner(board, lastPlayed);
  if (result) return result;

  const other = lastPlayed === 'X' ? 'O' : 'X';
  return checkWinner(board, other);
}

export function checkDraw(board) {
  return isBoardFull(board);
}

export function evaluateBoard(board, lastPlayed) {
  const winResult = checkAnyWinner(board, lastPlayed);
  if (winResult) return { type: 'won', result: winResult };
  if (checkDraw(board)) return { type: 'draw' };
  return null;
}

export function hasWon(board, symbol) {
  return WINNING_COMBOS.some(([a, b, c]) =>
    board[a] === symbol &&
    board[b] === symbol &&
    board[c] === symbol
  );
}
