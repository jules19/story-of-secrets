import { describe, expect, it } from 'vitest';
import { TLS_STEPS, goto, next, prev } from '../src/exhibits/tls/logic';

describe('TLS journey steps', () => {
  it('covers the three cryptographic jobs in order', () => {
    const roles = TLS_STEPS.map((s) => s.role);
    const auth = roles.indexOf('authentication');
    const keys = roles.indexOf('key-establishment');
    const bulk = roles.indexOf('bulk-encryption');
    expect(auth).toBeGreaterThan(-1);
    expect(keys).toBeGreaterThan(auth);
    expect(bulk).toBeGreaterThan(keys);
  });

  it('every step has messages, an explanation, and a consequence', () => {
    for (const s of TLS_STEPS) {
      expect(s.messages.length).toBeGreaterThan(0);
      expect(s.explain.length).toBeGreaterThan(40);
      expect(s.without.length).toBeGreaterThan(40);
    }
  });
});

describe('stepper state machine', () => {
  it('advances and clamps', () => {
    let s = { step: 0 };
    s = next(s);
    expect(s.step).toBe(1);
    s = goto(s, 99);
    expect(s.step).toBe(TLS_STEPS.length - 1);
    s = next(s);
    expect(s.step).toBe(TLS_STEPS.length - 1);
    s = goto(s, -5);
    expect(s.step).toBe(0);
    s = prev(s);
    expect(s.step).toBe(0);
  });
});
