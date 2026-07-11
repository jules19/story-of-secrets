/**
 * Harvest-now-decrypt-later, as a scenario machine. Nothing here predicts when
 * (or whether) a cryptanalytically relevant quantum computer arrives — the
 * visitor sets that assumption and watches the consequences.
 */
export const SEND_YEAR = 2026;
export const TIMELINE_END = 2060;

export type Scheme = 'classical' | 'hybrid';

export interface HarvestState {
  scheme: Scheme;
  /** Scenario assumption: the year a CRQC arrives. > TIMELINE_END = "not in this window". */
  crqcYear: number;
  /** The year the visitor has scrubbed to. */
  viewYear: number;
  /** How long the message must remain secret, in years. */
  secrecyYears: number;
}

export type MessageStatus = 'sealed' | 'opened';

/** Is the recorded ciphertext readable by the adversary at viewYear? */
export function status(s: HarvestState): MessageStatus {
  if (s.scheme === 'classical' && s.viewYear >= s.crqcYear) return 'opened';
  return 'sealed';
}

/** Does the scenario end in damage — exposure before the secrecy requirement expires? */
export function damaged(s: HarvestState): boolean {
  if (s.scheme !== 'classical') return false;
  return s.crqcYear < SEND_YEAR + s.secrecyYears;
}

/** Year the secrecy requirement expires. */
export function secrecyUntil(s: HarvestState): number {
  return SEND_YEAR + s.secrecyYears;
}

/**
 * Mosca's inequality, in words: if (years the secret must live) +
 * (years migration takes) exceeds (years until a CRQC), you are already late.
 */
export function moscaLate(
  secrecyYears: number,
  migrationYears: number,
  yearsToCrqc: number,
): boolean {
  return secrecyYears + migrationYears > yearsToCrqc;
}

/** Fraction 0–1 of a year along the exhibit timeline. */
export function timelinePos(year: number): number {
  return Math.min(1, Math.max(0, (year - SEND_YEAR) / (TIMELINE_END - SEND_YEAR)));
}
