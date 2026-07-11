import { describe, expect, it } from 'vitest';
import { mulberry32 } from '../src/exhibits/frequency/logic';
import {
  density,
  difference,
  emptyGrid,
  envelopeGlyph,
  keyGlyph,
  randomGrid,
  xor,
  GRID,
} from '../src/exhibits/otp/logic';

describe('xor', () => {
  it('is self-inverse: (m ⊕ k) ⊕ k = m', () => {
    const rng = mulberry32(7);
    const m = envelopeGlyph();
    const k = randomGrid(rng);
    expect(xor(xor(m, k), k)).toEqual(m);
  });

  it('throws on size mismatch', () => {
    expect(() => xor(emptyGrid(), [true])).toThrow();
  });

  it('reused key cancels: c1 ⊕ c2 = m1 ⊕ m2 (the VENONA identity)', () => {
    const rng = mulberry32(11);
    const k = randomGrid(rng);
    const m1 = envelopeGlyph();
    const m2 = keyGlyph();
    const c1 = xor(m1, k);
    const c2 = xor(m2, k);
    expect(xor(c1, c2)).toEqual(xor(m1, m2));
  });

  it('fresh keys leave no message correlation in c1 ⊕ c2', () => {
    const rng = mulberry32(13);
    const m1 = envelopeGlyph();
    const m2 = keyGlyph();
    const c1 = xor(m1, randomGrid(rng));
    const c2 = xor(m2, randomGrid(rng));
    const combined = xor(c1, c2);
    // combined should differ substantially from m1 ⊕ m2 (independent noise)
    expect(difference(combined, xor(m1, m2))).toBeGreaterThan(0.3);
    // and look like a fair coin
    expect(density(combined)).toBeGreaterThan(0.35);
    expect(density(combined)).toBeLessThan(0.65);
  });
});

describe('glyphs', () => {
  it('are the right size and non-trivial', () => {
    for (const g of [envelopeGlyph(), keyGlyph()]) {
      expect(g).toHaveLength(GRID * GRID);
      expect(density(g)).toBeGreaterThan(0.05);
      expect(density(g)).toBeLessThan(0.6);
    }
  });

  it('differ from each other', () => {
    expect(difference(envelopeGlyph(), keyGlyph())).toBeGreaterThan(0.1);
  });
});
