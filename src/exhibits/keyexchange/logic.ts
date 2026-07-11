/** Small honest Diffie–Hellman: p = 23, g = 5 — the classic classroom group. */
export const P = 23;
export const G = 5;

export function modpow(base: number, exp: number, mod: number): number {
  let result = 1;
  let b = base % mod;
  let e = exp;
  while (e > 0) {
    if (e & 1) result = (result * b) % mod;
    b = (b * b) % mod;
    e >>= 1;
  }
  return result;
}

/** Alice's public value from her secret. */
export function publicValue(secret: number): number {
  return modpow(G, secret, P);
}

/** Shared secret from the other party's public value and one's own secret. */
export function sharedSecret(otherPublic: number, ownSecret: number): number {
  return modpow(otherPublic, ownSecret, P);
}

/**
 * Eve's position: given a public value, how many exponents she must try (in
 * this toy group) before hitting the right one — brute-forcing the discrete log.
 */
export function bruteForceLog(target: number): number {
  for (let x = 1; x < P; x++) {
    if (modpow(G, x, P) === target) return x;
  }
  return -1;
}

/** Map a secret exponent to a paint hue for the analogy panel (deterministic). */
export function hueFor(secret: number): number {
  return (secret * 137.5) % 360;
}

/** "Mix paints": average of hues represented as points on the colour wheel. */
export function mixHues(hues: number[]): number {
  let x = 0;
  let y = 0;
  for (const h of hues) {
    const rad = (h * Math.PI) / 180;
    x += Math.cos(rad);
    y += Math.sin(rad);
  }
  const angle = (Math.atan2(y, x) * 180) / Math.PI;
  return (angle + 360) % 360;
}
