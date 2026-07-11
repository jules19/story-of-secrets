import { describe, expect, it } from 'vitest';
import { mulberry32 } from '../src/exhibits/frequency/logic';
import {
  matchedPrefix,
  probePosition,
  randomPin,
  simulateCheck,
  slowestDigit,
  spread,
} from '../src/exhibits/sidechannel/logic';

describe('matchedPrefix', () => {
  it('counts matching leading digits', () => {
    expect(matchedPrefix('1234', '1234')).toBe(4);
    expect(matchedPrefix('1234', '1299')).toBe(2);
    expect(matchedPrefix('1234', '9234')).toBe(0);
  });
});

describe('simulateCheck', () => {
  it('accepts only the exact PIN', () => {
    const rng = mulberry32(1);
    expect(simulateCheck('4711', '4711', false, rng).accepted).toBe(true);
    expect(simulateCheck('4711', '4712', false, rng).accepted).toBe(false);
  });

  it('early exit compares fewer digits for early mismatches', () => {
    const rng = mulberry32(2);
    expect(simulateCheck('4711', '9999', false, rng).digitsCompared).toBe(1);
    expect(simulateCheck('4711', '4799', false, rng).digitsCompared).toBe(3);
  });

  it('constant-time always compares every digit', () => {
    const rng = mulberry32(3);
    expect(simulateCheck('4711', '9999', true, rng).digitsCompared).toBe(4);
    expect(simulateCheck('4711', '4799', true, rng).digitsCompared).toBe(4);
  });
});

describe('the attack', () => {
  it('averaged probing identifies each correct digit of a leaky device', () => {
    const rng = mulberry32(42);
    const secret = randomPin(rng);
    let known = '';
    for (let pos = 0; pos < 4; pos++) {
      const probe = probePosition(secret, known, false, rng, 12);
      const digit = slowestDigit(probe);
      expect(String(digit)).toBe(secret[pos]);
      known += String(digit);
    }
    expect(known).toBe(secret);
  });

  it('constant-time comparison starves the attack of signal', () => {
    const rng = mulberry32(77);
    const secret = '3141';
    const leaky = probePosition(secret, '', false, rng, 12);
    const fixed = probePosition(secret, '', true, rng, 12);
    // leaky: the correct digit stands ~a full per-digit cost above the noise
    expect(spread(leaky)).toBeGreaterThan(0.8);
    // constant-time: only noise remains (noise amplitude 0.5µs, averaged over 12)
    expect(spread(fixed)).toBeLessThan(0.6);
  });
});
