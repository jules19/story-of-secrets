/**
 * Enigma-inspired rotor machine, deliberately simplified: three historical
 * rotor wirings (Enigma I rotors I–III) and reflector B, but no plugboard,
 * flat ring settings, and simple odometer stepping instead of the historical
 * notch (and double-step) behaviour. The teaching point is the moving
 * substitution, not fidelity.
 */
const A = 'A'.charCodeAt(0);

export const ROTOR_WIRINGS = [
  'EKMFLGDQVZNTOWYHXUSPAIBRCJ', // I
  'AJDKSIRUXBLHWTMCQGZNPYFVOE', // II
  'BDFHJLCPRTXVZNYEIWGAKMUSQO', // III
] as const;

export const REFLECTOR_B = 'YRUHQSLDPXNGOKMIEBFZCWVJAT';

function toIndex(ch: string): number {
  return ch.toUpperCase().charCodeAt(0) - A;
}

function toChar(i: number): string {
  return String.fromCharCode(A + (((i % 26) + 26) % 26));
}

function forwardTable(wiring: string): number[] {
  return [...wiring].map((c) => toIndex(c));
}

function inverseTable(wiring: string): number[] {
  const inv = new Array<number>(26).fill(0);
  [...wiring].forEach((c, i) => {
    inv[toIndex(c)] = i;
  });
  return inv;
}

const FWD = ROTOR_WIRINGS.map(forwardTable);
const INV = ROTOR_WIRINGS.map(inverseTable);
const REFL = forwardTable(REFLECTOR_B);

export interface RotorState {
  /** Rotor positions, left to right; each 0–25. */
  positions: [number, number, number];
  /** Whether rotors advance on each key press. */
  stepping: boolean;
}

export function initialState(): RotorState {
  return { positions: [0, 0, 0], stepping: true };
}

/** Odometer step: right rotor always; carries left when a rotor completes a turn. */
export function step(positions: [number, number, number]): [number, number, number] {
  const [l, m, r] = positions;
  const nr = (r + 1) % 26;
  const nm = nr === 0 ? (m + 1) % 26 : m;
  const nl = nr === 0 && nm === 0 ? (l + 1) % 26 : l;
  return [nl, nm, nr];
}

function throughRotor(c: number, rotor: number, pos: number, inverse: boolean): number {
  const table = inverse ? INV[rotor]! : FWD[rotor]!;
  return (((table[(c + pos) % 26]! - pos) % 26) + 26) % 26;
}

export interface EncipherResult {
  output: string;
  /**
   * The signal's stations, as letter indices: entry, after right rotor, after
   * middle, after left, after reflector, back through left, middle, right (=output).
   */
  path: number[];
  state: RotorState;
}

/** Encipher one letter: rotors step first (if stepping), then the signal traces through. */
export function encipher(state: RotorState, letter: string): EncipherResult {
  const positions = state.stepping ? step(state.positions) : state.positions;
  const [pl, pm, pr] = positions;
  const c0 = toIndex(letter);
  const c1 = throughRotor(c0, 2, pr, false);
  const c2 = throughRotor(c1, 1, pm, false);
  const c3 = throughRotor(c2, 0, pl, false);
  const c4 = REFL[c3]!;
  const c5 = throughRotor(c4, 0, pl, true);
  const c6 = throughRotor(c5, 1, pm, true);
  const c7 = throughRotor(c6, 2, pr, true);
  return {
    output: toChar(c7),
    path: [c0, c1, c2, c3, c4, c5, c6, c7],
    state: { positions, stepping: state.stepping },
  };
}

export function positionLetters(state: RotorState): string {
  return state.positions.map(toChar).join('');
}

/** Encipher a run of the same letter; returns outputs (used for the histogram demo). */
export function encipherRun(
  state: RotorState,
  letter: string,
  count: number,
): {
  outputs: string[];
  state: RotorState;
} {
  const outputs: string[] = [];
  let s = state;
  for (let i = 0; i < count; i++) {
    const r = encipher(s, letter);
    outputs.push(r.output);
    s = r.state;
  }
  return { outputs, state: s };
}
