/**
 * A simulated PIN pad whose comparison routine leaks through time — the shape
 * of Kocher's 1996 timing attacks, scaled to a toy. The "device" checks the
 * PIN digit by digit and rejects at the first mismatch (early exit), so wrong
 * guesses that share a longer prefix with the secret take measurably longer.
 */
export interface TimingModel {
  baseUs: number;
  perDigitUs: number;
  noiseUs: number;
}

export const DEFAULT_MODEL: TimingModel = { baseUs: 2.0, perDigitUs: 1.2, noiseUs: 0.5 };

export const PIN_LENGTH = 4;

export function randomPin(rng: () => number): string {
  return Array.from({ length: PIN_LENGTH }, () => Math.floor(rng() * 10)).join('');
}

export function matchedPrefix(secret: string, guess: string): number {
  let n = 0;
  while (n < secret.length && n < guess.length && secret[n] === guess[n]) n++;
  return n;
}

export interface CheckResult {
  accepted: boolean;
  timeUs: number;
  /** digits the comparison routine actually examined */
  digitsCompared: number;
}

export function simulateCheck(
  secret: string,
  guess: string,
  constantTime: boolean,
  rng: () => number,
  model: TimingModel = DEFAULT_MODEL,
): CheckResult {
  const prefix = matchedPrefix(secret, guess);
  const accepted = prefix === secret.length;
  const digitsCompared = constantTime ? secret.length : accepted ? secret.length : prefix + 1; // early exit at the first mismatch
  const noise = (rng() * 2 - 1) * model.noiseUs;
  const timeUs = model.baseUs + digitsCompared * model.perDigitUs + noise;
  return { accepted, timeUs, digitsCompared };
}

/**
 * Probe one position: for each digit 0–9, submit `prefix + digit + 0-padding`
 * `trials` times and average the response times.
 */
export function probePosition(
  secret: string,
  prefix: string,
  constantTime: boolean,
  rng: () => number,
  trials = 8,
  model: TimingModel = DEFAULT_MODEL,
): { digit: number; meanUs: number }[] {
  const results: { digit: number; meanUs: number }[] = [];
  for (let digit = 0; digit <= 9; digit++) {
    const guess = (prefix + String(digit)).padEnd(PIN_LENGTH, '0').slice(0, PIN_LENGTH);
    let sum = 0;
    for (let t = 0; t < trials; t++) {
      sum += simulateCheck(secret, guess, constantTime, rng, model).timeUs;
    }
    results.push({ digit, meanUs: sum / trials });
  }
  return results;
}

/** The attacker's read of a probe: the digit with the slowest average response. */
export function slowestDigit(probe: { digit: number; meanUs: number }[]): number {
  let best = probe[0]!;
  for (const p of probe) {
    if (p.meanUs > best.meanUs) best = p;
  }
  return best.digit;
}

/** Spread between slowest and fastest mean — how much signal the leak gives. */
export function spread(probe: { digit: number; meanUs: number }[]): number {
  const times = probe.map((p) => p.meanUs);
  return Math.max(...times) - Math.min(...times);
}
