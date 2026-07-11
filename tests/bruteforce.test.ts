import { describe, expect, it } from 'vitest';
import {
  ATTACKERS,
  UNIVERSE_AGE_YEARS,
  YEAR_SECONDS,
  expectedSeconds,
  keyspace,
  logPosition,
} from '../src/exhibits/bruteforce/logic';
import { bigNumberName, humanDuration } from '../src/core/format';

describe('expectedSeconds', () => {
  it('DES vs Deep Crack lands in the historical ballpark (days, not years)', () => {
    const deepCrack = ATTACKERS.find((a) => a.id === 'deepcrack')!;
    const secs = expectedSeconds(56, deepCrack.rate);
    const days = secs / 86400;
    // EFF's actual 1998 run took 56 hours (lucky early hit); expectation ≈ 4–5 days
    expect(days).toBeGreaterThan(1);
    expect(days).toBeLessThan(14);
  });

  it('128-bit keys outlive the universe for every real-world adversary', () => {
    for (const a of ATTACKERS.filter((x) => x.id !== 'planet')) {
      const years = expectedSeconds(128, a.rate) / YEAR_SECONDS;
      expect(years).toBeGreaterThan(UNIVERSE_AGE_YEARS);
    }
  });

  it('even a planet of machines needs billions of years for 128 bits, and 256 is beyond everything', () => {
    const planet = ATTACKERS.find((a) => a.id === 'planet')!;
    expect(expectedSeconds(128, planet.rate) / YEAR_SECONDS).toBeGreaterThan(1e9);
    for (const a of ATTACKERS) {
      expect(expectedSeconds(256, a.rate) / YEAR_SECONDS).toBeGreaterThan(
        UNIVERSE_AGE_YEARS * 1e10,
      );
    }
  });

  it('each extra bit doubles the work', () => {
    expect(expectedSeconds(57, 1e9) / expectedSeconds(56, 1e9)).toBeCloseTo(2);
  });

  it('keyspace is 2^bits', () => {
    expect(keyspace(8)).toBe(256);
    expect(keyspace(40)).toBe(2 ** 40);
  });
});

describe('logPosition', () => {
  it('is monotonic and clamped to [0, 1]', () => {
    expect(logPosition(1e-9)).toBe(0);
    expect(logPosition(1)).toBeGreaterThan(0);
    expect(logPosition(1e50)).toBeLessThanOrEqual(1);
    expect(logPosition(1e6)).toBeGreaterThan(logPosition(1e3));
  });
});

describe('formatters', () => {
  it('names big numbers', () => {
    expect(bigNumberName(2 ** 56)).toContain('quadrillion');
    expect(bigNumberName(500)).toBe('500');
  });

  it('humanises durations across scales', () => {
    expect(humanDuration(0.5)).toContain('milliseconds');
    expect(humanDuration(90)).toContain('minutes');
    expect(humanDuration(YEAR_SECONDS * 3)).toContain('years');
    expect(humanDuration(YEAR_SECONDS * 1e12)).toContain('age of the universe');
  });
});
