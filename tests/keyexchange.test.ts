import { describe, expect, it } from 'vitest';
import {
  G,
  P,
  bruteForceLog,
  hueFor,
  mixHues,
  modpow,
  publicValue,
  sharedSecret,
} from '../src/exhibits/keyexchange/logic';

describe('modpow', () => {
  it('matches known values', () => {
    expect(modpow(5, 6, 23)).toBe(8);
    expect(modpow(5, 15, 23)).toBe(19);
    expect(modpow(2, 10, 1000)).toBe(24);
    expect(modpow(7, 0, 13)).toBe(1);
  });
});

describe('Diffie–Hellman in the toy group', () => {
  it('both parties always derive the same shared secret', () => {
    for (let a = 1; a < P - 1; a++) {
      for (let b = 1; b < P - 1; b++) {
        const A = publicValue(a);
        const B = publicValue(b);
        expect(sharedSecret(B, a)).toBe(sharedSecret(A, b));
      }
    }
  });

  it('the shared secret differs from both public values in general', () => {
    const a = 6;
    const b = 15;
    const A = publicValue(a);
    const B = publicValue(b);
    const s = sharedSecret(B, a);
    expect(s).not.toBe(A);
    expect(s).not.toBe(B);
  });

  it('brute-forcing the discrete log recovers the exponent', () => {
    for (const a of [2, 6, 11, 21]) {
      expect(bruteForceLog(publicValue(a))).toBeLessThanOrEqual(a);
      expect(publicValue(bruteForceLog(publicValue(a)))).toBe(publicValue(a));
    }
  });

  it(`g = ${G} generates the group (all values distinct until wrap)`, () => {
    const seen = new Set<number>();
    for (let x = 1; x < P; x++) seen.add(modpow(G, x, P));
    expect(seen.size).toBe(P - 1);
  });
});

describe('paint analogy', () => {
  it('mixing is order-independent (both parties reach the same colour)', () => {
    const a = hueFor(6);
    const b = hueFor(15);
    const common = 46;
    expect(mixHues([common, a, b])).toBeCloseTo(mixHues([b, common, a]), 6);
  });

  it('hues stay within the wheel', () => {
    for (let s = 2; s <= 21; s++) {
      const h = hueFor(s);
      expect(h).toBeGreaterThanOrEqual(0);
      expect(h).toBeLessThan(360);
    }
  });
});
