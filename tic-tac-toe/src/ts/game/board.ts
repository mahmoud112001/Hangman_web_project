// ══════════════════════════════════════════════════
// BOARD.TS
// Board inspection and utility functions.
// Pure functions — no state mutation, no DOM.
//
// Responsibility:
//   - Creating empty boards
//   - Reading cell values
//   - Finding empty cells
//   - Cloning boards for AI simulation
// ══════════════════════════════════════════════════

import type { BoardState, CellValue, PlayerSymbol } from '../types';
import { BOARD_SIZE } from '../constants';

/**
 * Creates a new empty board (9 nulls).
 * Used when resetting, and by AI for simulation.
 */
export function createEmptyBoard(): CellValue[] {
  return Array(BOARD_SIZE).fill(null) as CellValue[];
}

/**
 * Returns the value at a specific cell index.
 * Returns null for out-of-bounds (safe guard).
 */
export function getCellValue(board: BoardState, index: number): CellValue {
  if (index < 0 || index >= BOARD_SIZE) return null;
  return board[index];
}

/**
 * Returns an array of indices where the cell is empty (null).
 * Used by every AI level to find valid moves.
 */
export function getEmptyCells(board: BoardState): number[] {
  return board.reduce<number[]>((acc, cell, index) => {
    if (cell === null) acc.push(index);
    return acc;
  }, []);
}

/**
 * Returns true if the given cell index is empty.
 */
export function isCellEmpty(board: BoardState, index: number): boolean {
  return board[index] === null;
}

/**
 * Returns true if the board is completely full (no empty cells).
 * Used alongside win-checking to detect draws.
 */
export function isBoardFull(board: BoardState): boolean {
  return board.every(cell => cell !== null);
}

/**
 * Returns a mutable shallow copy of the board.
 * Used by the AI to simulate moves without
 * touching the real game state.
 *
 * Usage in Minimax:
 *   const simBoard = cloneBoard(realBoard);
 *   simBoard[index] = symbol;
 *   const score = minimax(simBoard, ...);
 */
export function cloneBoard(board: BoardState): CellValue[] {
  return [...board];
}

/**
 * Returns a new board with a move applied.
 * Immutable — does not mutate the original board.
 * Preferred for AI simulations over mutating clones.
 */
export function applyMove(
  board: BoardState,
  index: number,
  symbol: PlayerSymbol
): CellValue[] {
  const next = cloneBoard(board);
  next[index] = symbol;
  return next;
}

/**
 * Counts how many cells a given symbol occupies.
 * Useful for medium AI heuristics.
 */
export function countSymbol(board: BoardState, symbol: PlayerSymbol): number {
  return board.filter(cell => cell === symbol).length;
}

/**
 * Returns the count of remaining empty cells.
 */
export function remainingMoves(board: BoardState): number {
  return board.filter(cell => cell === null).length;
}