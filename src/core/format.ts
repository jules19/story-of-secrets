const NAMES: Array<[number, string]> = [
  [1e33, 'decillion'],
  [1e30, 'nonillion'],
  [1e27, 'octillion'],
  [1e24, 'septillion'],
  [1e21, 'sextillion'],
  [1e18, 'quintillion'],
  [1e15, 'quadrillion'],
  [1e12, 'trillion'],
  [1e9, 'billion'],
  [1e6, 'million'],
  [1e3, 'thousand'],
];

/** 3.6e16 → "36 quadrillion"; falls back to scientific notation for the truly vast. */
export function bigNumberName(n: number): string {
  if (!Number.isFinite(n)) return 'more than can be written';
  if (n < 1000) return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  for (const [scale, name] of NAMES) {
    if (n >= scale) {
      const v = n / scale;
      const digits = v >= 100 ? 0 : v >= 10 ? 0 : 1;
      return `${v.toLocaleString('en-US', { maximumFractionDigits: digits })} ${name}`;
    }
  }
  return n.toExponential(1).replace('e+', ' × 10^');
}

const YEAR_SECONDS = 60 * 60 * 24 * 365.25;

/** Human duration from seconds, from nanoseconds up to multiples of the age of the universe. */
export function humanDuration(seconds: number): string {
  if (!Number.isFinite(seconds)) return 'effectively forever';
  if (seconds < 1e-6) return 'under a microsecond';
  if (seconds < 1e-3) return `${Math.round(seconds * 1e6)} microseconds`;
  if (seconds < 1) return `${Math.round(seconds * 1e3)} milliseconds`;
  if (seconds < 90) return `${round1(seconds)} seconds`;
  const minutes = seconds / 60;
  if (minutes < 90) return `${round1(minutes)} minutes`;
  const hours = minutes / 60;
  if (hours < 36) return `${round1(hours)} hours`;
  const days = hours / 24;
  if (days < 500) return `${round1(days)} days`;
  const years = seconds / YEAR_SECONDS;
  if (years < 1e4) return `${years.toLocaleString('en-US', { maximumFractionDigits: 0 })} years`;
  const universes = years / 1.38e10;
  if (universes < 1) return `${bigNumberName(Math.round(years))} years`;
  return `${bigNumberName(Math.round(years))} years — ${bigNumberName(universes)}× the age of the universe`;
}

function round1(n: number): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: 1 });
}
