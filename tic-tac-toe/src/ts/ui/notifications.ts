// ══════════════════════════════════════════════════
// NOTIFICATIONS.TS — Game event logging
// ══════════════════════════════════════════════════

export function notifyGameEvent(message: string): void {
  console.info(`[Game] ${message}`);
}