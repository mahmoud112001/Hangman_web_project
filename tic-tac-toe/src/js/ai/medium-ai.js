// ══════════════════════════════════════════════════
// MEDIUM-AI.JS — Strategic but intentionally imperfect
// Priority: Win → Block → 70% strategic / 30% random
// ══════════════════════════════════════════════════

import { getEmptyCells, applyMove } from '../game/board.js';
import { getOpponent } from '../game/player.js';
import { hasWon } from '../game/win-checker.js';
import { PREFERRED_CELLS, MEDIUM_STRATEGIC_CHANCE } from '../constants.js';
import { randomChoice, withProbability } from '../utils/helpers.js';

function wouldWin(board, index, symbol) {
  const simulated = applyMove(board, index, symbol);
  return hasWon(simulated, symbol);
}

function findWinningMove(board, symbol) {
  const empties = getEmptyCells(board);
  for (const index of empties) {
    if (wouldWin(board, index, symbol)) return index;
  }
  return null;
}

function findStrategicCell(board) {
  const empties = new Set(getEmptyCells(board));
  for (const cell of PREFERRED_CELLS) {
    if (empties.has(cell)) return cell;
  }
  return null;
}

export function getMediumMove(board, cpuSymbol) {
  const opponent = getOpponent(cpuSymbol);
  const empties  = getEmptyCells(board);

  if (empties.length === 0) throw new Error('[medium-ai] No empty cells');

  // Priority 1 — Win immediately
  const winMove = findWinningMove(board, cpuSymbol);
  if (winMove !== null) return { index: winMove };

  // Priority 2 — Block opponent
  const blockMove = findWinningMove(board, opponent);
  if (blockMove !== null) return { index: blockMove };

  // Priority 3 — Strategic vs random split
  if (withProbability(MEDIUM_STRATEGIC_CHANCE)) {
    const strategic = findStrategicCell(board);
    if (strategic !== null) return { index: strategic };
  }

  return { index: randomChoice(empties) };
}
