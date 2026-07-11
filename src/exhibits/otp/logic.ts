/** Bit grids for the one-time-pad demonstration. Row-major boolean arrays. */
export const GRID = 16;

export type BitGrid = boolean[];

export function emptyGrid(): BitGrid {
  return new Array<boolean>(GRID * GRID).fill(false);
}

export function randomGrid(rng: () => number): BitGrid {
  return Array.from({ length: GRID * GRID }, () => rng() < 0.5);
}

export function xor(a: BitGrid, b: BitGrid): BitGrid {
  if (a.length !== b.length) throw new Error('grid size mismatch');
  return a.map((bit, i) => bit !== b[i]);
}

/** Fraction of set bits — used to sanity-check that ciphertext looks like noise. */
export function density(g: BitGrid): number {
  return g.filter(Boolean).length / g.length;
}

/** Hamming distance between grids, as a fraction. */
export function difference(a: BitGrid, b: BitGrid): number {
  return xor(a, b).filter(Boolean).length / a.length;
}

function set(g: BitGrid, x: number, y: number): void {
  if (x >= 0 && x < GRID && y >= 0 && y < GRID) g[y * GRID + x] = true;
}

function line(g: BitGrid, x0: number, y0: number, x1: number, y1: number): void {
  const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
  for (let i = 0; i <= steps; i++) {
    const x = Math.round(x0 + ((x1 - x0) * i) / steps);
    const y = Math.round(y0 + ((y1 - y0) * i) / steps);
    set(g, x, y);
  }
}

function rect(g: BitGrid, x0: number, y0: number, x1: number, y1: number): void {
  line(g, x0, y0, x1, y0);
  line(g, x1, y0, x1, y1);
  line(g, x1, y1, x0, y1);
  line(g, x0, y1, x0, y0);
}

/** Message A: an envelope pictogram. */
export function envelopeGlyph(): BitGrid {
  const g = emptyGrid();
  rect(g, 1, 3, 14, 12);
  line(g, 1, 3, 7, 8);
  line(g, 8, 8, 14, 3);
  line(g, 1, 12, 6, 7);
  line(g, 9, 7, 14, 12);
  return g;
}

/** Message B: a key pictogram. */
export function keyGlyph(): BitGrid {
  const g = emptyGrid();
  rect(g, 1, 5, 6, 10);
  rect(g, 2, 6, 5, 9);
  line(g, 6, 7, 14, 7);
  line(g, 6, 8, 14, 8);
  line(g, 11, 8, 11, 11);
  line(g, 14, 8, 14, 11);
  line(g, 12, 8, 12, 10);
  return g;
}
