import { describe, expect, it } from 'vitest';
import {
  ALPHABET,
  applyGuesses,
  cipherOrder,
  encrypt,
  ENGLISH_ORDER,
  invertKey,
  letterFrequencies,
  mulberry32,
  nextHint,
  progress,
  shuffleKey,
} from '../src/exhibits/frequency/logic';

const rng = () => mulberry32(42);

describe('shuffleKey / encrypt', () => {
  it('produces a permutation of the alphabet', () => {
    const key = shuffleKey(rng());
    const values = Object.values(key).sort().join('');
    expect(values).toBe(ALPHABET);
    expect(Object.keys(key).sort().join('')).toBe(ALPHABET);
  });

  it('is deterministic for a given seed', () => {
    expect(shuffleKey(mulberry32(7))).toEqual(shuffleKey(mulberry32(7)));
  });

  it('encrypts letters and passes through punctuation and spaces', () => {
    const key = shuffleKey(rng());
    const out = encrypt('ab, c!', key);
    expect(out).toBe(
      `${key['a']!.toUpperCase()}${key['b']!.toUpperCase()}, ${key['c']!.toUpperCase()}!`,
    );
  });

  it('round-trips through the inverted key', () => {
    const key = shuffleKey(rng());
    const truth = invertKey(key);
    const cells = applyGuesses(encrypt('attack at dawn', key), truth);
    expect(cells.map((c) => c.char).join('')).toBe('attack at dawn');
  });
});

describe('letterFrequencies', () => {
  it('computes percentages over letters only', () => {
    const f = letterFrequencies('aab!! b??');
    expect(f['a']).toBeCloseTo(50);
    expect(f['b']).toBeCloseTo(50);
    expect(f['z']).toBe(0);
  });

  it('handles empty text', () => {
    const f = letterFrequencies('!!!');
    expect(f['e']).toBe(0);
  });
});

describe('cipherOrder', () => {
  it('orders by descending observed frequency and omits absent letters', () => {
    expect(cipherOrder('AAAB BC')).toEqual(['a', 'b', 'c']);
    expect(cipherOrder('CCB')).toEqual(['c', 'b']);
  });
});

describe('progress / hints', () => {
  const key = shuffleKey(mulberry32(1));
  const truth = invertKey(key);
  const ciphertext = encrypt('the queen trusted her cipher', key);

  it('starts unsolved and unreadable', () => {
    const p = progress(ciphertext, key, {});
    expect(p.solved).toBe(false);
    expect(p.readable).toBe(0);
    expect(p.present).toBeGreaterThan(5);
  });

  it('is solved when every present letter is correctly mapped', () => {
    const guesses: Record<string, string> = {};
    for (const c of cipherOrder(ciphertext)) guesses[c] = truth[c]!;
    const p = progress(ciphertext, key, guesses);
    expect(p.solved).toBe(true);
    expect(p.readable).toBe(1);
    expect(p.correct).toBe(p.present);
  });

  it('wrong guesses do not count as readable', () => {
    const order = cipherOrder(ciphertext);
    const first = order[0]!;
    const wrong = truth[first] === 'z' ? 'q' : 'z';
    const p = progress(ciphertext, key, { [first]: wrong });
    expect(p.correct).toBe(0);
  });

  it('hint returns the most frequent unmapped letter, correctly', () => {
    const hint = nextHint(ciphertext, key, {})!;
    expect(hint.cipher).toBe(cipherOrder(ciphertext)[0]);
    expect(hint.plain).toBe(truth[hint.cipher]);
  });

  it('hint returns null when solved', () => {
    const guesses: Record<string, string> = {};
    for (const c of cipherOrder(ciphertext)) guesses[c] = truth[c]!;
    expect(nextHint(ciphertext, key, guesses)).toBeNull();
  });
});

describe('ENGLISH_ORDER', () => {
  it('starts with the most frequent letters of English', () => {
    expect(ENGLISH_ORDER.slice(0, 3)).toEqual(['e', 't', 'a']);
  });
});
