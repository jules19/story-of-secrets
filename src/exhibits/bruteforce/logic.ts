/**
 * Brute-force arithmetic. Rates are order-of-magnitude illustrations,
 * documented in the exhibit; the DES data points are historical (EFF 1998).
 */
export interface Attacker {
  id: string;
  label: string;
  /** Keys tried per second (order of magnitude). */
  rate: number;
  note: string;
}

export const ATTACKERS: Attacker[] = [
  {
    id: 'laptop',
    label: 'One laptop',
    rate: 1e8,
    note: 'a single modern CPU, ~100 million keys per second (order of magnitude)',
  },
  {
    id: 'deepcrack',
    label: 'Deep Crack, 1998',
    rate: 9e10,
    note: 'the EFF’s $250,000 DES-cracking machine: ~90 billion keys per second',
  },
  {
    id: 'cluster',
    label: 'GPU cluster',
    rate: 1e13,
    note: 'a serious modern GPU farm, ~10 trillion keys per second (order of magnitude)',
  },
  {
    id: 'nation',
    label: 'Nation-state build-out',
    rate: 1e17,
    note: 'a hypothetical purpose-built national facility (illustrative)',
  },
  {
    id: 'planet',
    label: 'A planet of machines',
    rate: 1e21,
    note: 'roughly the combined throughput of the Bitcoin network, repurposed (illustrative)',
  },
];

export const KEY_SIZES = [40, 56, 64, 80, 96, 112, 128, 192, 256];

/** Expected time to find a key: half the keyspace on average. */
export function expectedSeconds(bits: number, rate: number): number {
  return Math.pow(2, bits - 1) / rate;
}

export function keyspace(bits: number): number {
  return Math.pow(2, bits);
}

export const YEAR_SECONDS = 60 * 60 * 24 * 365.25;
export const UNIVERSE_AGE_YEARS = 1.38e10;

/** Position (0–1) of a duration on the exhibit's log scale, clamped. */
export function logPosition(seconds: number): number {
  // scale: 1 microsecond (1e-6 s) … 1e30 years (~3e37 s)
  const min = Math.log10(1e-6);
  const max = Math.log10(1e30 * YEAR_SECONDS);
  const v = Math.log10(Math.max(seconds, 1e-6));
  return Math.min(1, Math.max(0, (v - min) / (max - min)));
}
