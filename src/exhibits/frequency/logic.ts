export const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

/**
 * Published English letter frequencies (percent), Lewand, *Cryptological
 * Mathematics* (MAA, 2000).
 */
export const ENGLISH_FREQ: Record<string, number> = {
  e: 12.702,
  t: 9.056,
  a: 8.167,
  o: 7.507,
  i: 6.966,
  n: 6.749,
  s: 6.327,
  h: 6.094,
  r: 5.987,
  d: 4.253,
  l: 4.025,
  c: 2.782,
  u: 2.758,
  m: 2.406,
  w: 2.36,
  f: 2.228,
  g: 2.015,
  y: 1.974,
  p: 1.929,
  b: 1.492,
  v: 0.978,
  k: 0.772,
  j: 0.153,
  x: 0.15,
  q: 0.095,
  z: 0.074,
};

/** English letters ordered by descending frequency. */
export const ENGLISH_ORDER = [...ALPHABET].sort(
  (a, b) => (ENGLISH_FREQ[b] ?? 0) - (ENGLISH_FREQ[a] ?? 0),
);

/** Deterministic PRNG so behaviour is testable. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A key maps plaintext letter → ciphertext letter. Guaranteed derangement-ish shuffle. */
export function shuffleKey(rng: () => number): Record<string, string> {
  const letters = [...ALPHABET];
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const a = letters[i]!;
    letters[i] = letters[j]!;
    letters[j] = a;
  }
  const key: Record<string, string> = {};
  [...ALPHABET].forEach((p, i) => {
    key[p] = letters[i]!;
  });
  return key;
}

/** Encrypt lowercase text; non-letters pass through. Output is uppercase to read as "cipher". */
export function encrypt(plain: string, key: Record<string, string>): string {
  return [...plain.toLowerCase()]
    .map((ch) => {
      const sub = key[ch];
      return sub ? sub.toUpperCase() : ch;
    })
    .join('');
}

/** Frequency (percent) of each letter among the letters of `text` (case-insensitive). */
export function letterFrequencies(text: string): Record<string, number> {
  const counts: Record<string, number> = {};
  let total = 0;
  for (const raw of text.toLowerCase()) {
    if (raw >= 'a' && raw <= 'z') {
      counts[raw] = (counts[raw] ?? 0) + 1;
      total += 1;
    }
  }
  const freq: Record<string, number> = {};
  for (const letter of ALPHABET) {
    freq[letter] = total === 0 ? 0 : ((counts[letter] ?? 0) / total) * 100;
  }
  return freq;
}

/** Ciphertext letters ordered by descending observed frequency (absent letters excluded). */
export function cipherOrder(ciphertext: string): string[] {
  const freq = letterFrequencies(ciphertext);
  return [...ALPHABET]
    .filter((c) => (freq[c] ?? 0) > 0)
    .sort((a, b) => (freq[b] ?? 0) - (freq[a] ?? 0));
}

/**
 * Apply the visitor's guesses (cipher letter → plaintext letter) to a ciphertext.
 * Returns per-character cells so the view can style resolved vs unresolved.
 */
export interface DecryptCell {
  char: string;
  resolved: boolean;
  isLetter: boolean;
}

export function applyGuesses(ciphertext: string, guesses: Record<string, string>): DecryptCell[] {
  return [...ciphertext].map((ch) => {
    const lower = ch.toLowerCase();
    if (lower < 'a' || lower > 'z') return { char: ch, resolved: false, isLetter: false };
    const guess = guesses[lower];
    if (guess) return { char: guess, resolved: true, isLetter: true };
    return { char: ch.toUpperCase(), resolved: false, isLetter: true };
  });
}

/** True cipher→plain mapping derived from a plain→cipher key. */
export function invertKey(key: Record<string, string>): Record<string, string> {
  const inverted: Record<string, string> = {};
  for (const [plain, cipher] of Object.entries(key)) inverted[cipher] = plain;
  return inverted;
}

export interface Progress {
  /** Letters appearing in the ciphertext. */
  present: number;
  /** Of those, how many the visitor has mapped correctly. */
  correct: number;
  /** Share of letter characters in the message that currently decrypt correctly. */
  readable: number;
  solved: boolean;
}

export function progress(
  ciphertext: string,
  key: Record<string, string>,
  guesses: Record<string, string>,
): Progress {
  const truth = invertKey(key);
  const seen = new Set<string>();
  let letters = 0;
  let readableChars = 0;
  for (const ch of ciphertext.toLowerCase()) {
    if (ch < 'a' || ch > 'z') continue;
    letters += 1;
    seen.add(ch);
    if (guesses[ch] && guesses[ch] === truth[ch]) readableChars += 1;
  }
  let correct = 0;
  for (const c of seen) {
    if (guesses[c] && guesses[c] === truth[c]) correct += 1;
  }
  return {
    present: seen.size,
    correct,
    readable: letters === 0 ? 0 : readableChars / letters,
    solved: seen.size > 0 && correct === seen.size,
  };
}

/** One correct mapping the visitor doesn't have yet — most frequent first (the teacher's hint). */
export function nextHint(
  ciphertext: string,
  key: Record<string, string>,
  guesses: Record<string, string>,
): { cipher: string; plain: string } | null {
  const truth = invertKey(key);
  for (const c of cipherOrder(ciphertext)) {
    const answer = truth[c];
    if (answer && guesses[c] !== answer) return { cipher: c, plain: answer };
  }
  return null;
}
