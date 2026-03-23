// ══════════════════════════════════════════════════
// STORAGE.JS — localStorage with safe error handling
// ══════════════════════════════════════════════════

import { STORAGE_KEY } from '../constants.js';

export function saveScores(scores) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch {
    // Storage unavailable — fail silently
  }
}

export function loadScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'x'     in parsed &&
      'o'     in parsed &&
      'draws' in parsed &&
      typeof parsed.x     === 'number' &&
      typeof parsed.o     === 'number' &&
      typeof parsed.draws === 'number'
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function clearStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Fail silently
  }
}
