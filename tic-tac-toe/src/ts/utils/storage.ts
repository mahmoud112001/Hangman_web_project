// ══════════════════════════════════════════════════
// STORAGE.TS — localStorage with safe error handling
// ══════════════════════════════════════════════════

import type { ScoreState } from '../types';
import { STORAGE_KEY } from '../constants';

export function saveScores(scores: Readonly<ScoreState>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch {
    // Storage unavailable — fail silently
  }
}

export function loadScores(): ScoreState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as unknown;

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'x'     in parsed &&
      'o'     in parsed &&
      'draws' in parsed &&
      typeof (parsed as ScoreState).x     === 'number' &&
      typeof (parsed as ScoreState).o     === 'number' &&
      typeof (parsed as ScoreState).draws === 'number'
    ) {
      return parsed as ScoreState;
    }
    return null;
  } catch {
    return null;
  }
}

export function clearStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Fail silently
  }
}