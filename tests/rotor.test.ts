import { describe, expect, it } from 'vitest';
import {
  encipher,
  encipherRun,
  initialState,
  positionLetters,
  step,
  ROTOR_WIRINGS,
  REFLECTOR_B,
} from '../src/exhibits/rotor/logic';

describe('wirings', () => {
  it('are permutations of the alphabet', () => {
    for (const w of [...ROTOR_WIRINGS, REFLECTOR_B]) {
      expect([...w].sort().join('')).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }
  });

  it('reflector is an involution with no fixed points', () => {
    const A = 'A'.charCodeAt(0);
    for (let i = 0; i < 26; i++) {
      const j = REFLECTOR_B.charCodeAt(i) - A;
      expect(j).not.toBe(i);
      expect(REFLECTOR_B.charCodeAt(j) - A).toBe(i);
    }
  });
});

describe('stepping', () => {
  it('advances the right rotor every press and carries like an odometer', () => {
    expect(step([0, 0, 0])).toEqual([0, 0, 1]);
    expect(step([0, 0, 25])).toEqual([0, 1, 0]);
    expect(step([0, 25, 25])).toEqual([1, 0, 0]);
  });

  it('does not step when frozen', () => {
    const s = { positions: [3, 5, 7] as [number, number, number], stepping: false };
    const r = encipher(s, 'A');
    expect(r.state.positions).toEqual([3, 5, 7]);
  });
});

describe('encipherment', () => {
  it('is reciprocal: from the same rotor state, E(x) = y implies E(y) = x', () => {
    const s = { positions: [4, 11, 19] as [number, number, number], stepping: false };
    for (const ch of 'AQZM') {
      const y = encipher(s, ch).output;
      expect(encipher(s, y).output).toBe(ch);
    }
  });

  it('never maps a letter to itself (reflector property)', () => {
    let state = initialState();
    for (let i = 0; i < 60; i++) {
      const r = encipher(state, 'E');
      expect(r.output).not.toBe('E');
      state = r.state;
    }
  });

  it('produces varied outputs for a repeated letter when stepping', () => {
    const { outputs } = encipherRun(initialState(), 'E', 20);
    expect(new Set(outputs).size).toBeGreaterThan(8);
  });

  it('produces one constant output when frozen', () => {
    const frozen = { ...initialState(), stepping: false };
    const { outputs } = encipherRun(frozen, 'E', 20);
    expect(new Set(outputs).size).toBe(1);
  });

  it('path has eight stations, ending at the output letter', () => {
    const r = encipher(initialState(), 'T');
    expect(r.path).toHaveLength(8);
    expect(String.fromCharCode(65 + r.path[7]!)).toBe(r.output);
  });

  it('reports positions as letters', () => {
    expect(positionLetters(initialState())).toBe('AAA');
    expect(positionLetters({ positions: [0, 1, 2], stepping: true })).toBe('ABC');
  });
});
