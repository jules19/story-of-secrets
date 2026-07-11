import './rotor.css';
import { el, svgEl } from '../../core/dom';
import { encipher, encipherRun, initialState, positionLetters, type RotorState } from './logic';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function mount(host: HTMLElement): void {
  let state: RotorState = initialState();
  let history: Array<{ input: string; output: string }> = [];
  let counts = new Array<number>(26).fill(0);

  // — rotor windows —
  const windows = el('div', { class: 'rt-windows', 'aria-label': 'Rotor positions' });
  const windowCells = [0, 1, 2].map((i) => {
    const cell = el('span', { class: 'rt-window', 'aria-label': `Rotor ${i + 1} position` }, 'A');
    return cell;
  });
  windows.append(el('span', { class: 'rt-window-label' }, 'rotor windows'), ...windowCells);

  // — path diagram —
  const W = 620;
  const H = 190;
  const cols = [590, 470, 350, 230, 60]; // entry, right, middle, left, reflector
  const yFor = (idx: number) => 14 + (idx * (H - 28)) / 25;
  const svg = svgEl('svg', {
    viewBox: `0 0 ${W} ${H}`,
    class: 'rt-svg',
    role: 'img',
    'aria-label':
      'Diagram of the electrical path through three rotors and a reflector. Each key press moves the rotors, so the path — and the substitution — changes every letter.',
  });
  const colLabels = ['keyboard', 'rotor 3', 'rotor 2', 'rotor 1', 'reflector'];
  cols.forEach((x, i) => {
    svg.append(
      svgEl('line', { x1: x, y1: 10, x2: x, y2: H - 10, class: 'rt-col' }),
      svgEl('text', { x, y: H - 1, class: 'rt-col-label', 'text-anchor': 'middle' }, colLabels[i]),
    );
  });
  const pathFwd = svgEl('polyline', { class: 'rt-path rt-path-fwd', points: '' });
  const pathBack = svgEl('polyline', { class: 'rt-path rt-path-back', points: '' });
  const inDot = svgEl('circle', { r: 5, class: 'rt-dot rt-dot-in', cx: -10, cy: -10 });
  const outDot = svgEl('circle', { r: 5, class: 'rt-dot rt-dot-out', cx: -10, cy: -10 });
  const inText = svgEl('text', { class: 'rt-io rt-io-in', x: -10, y: -10 });
  const outText = svgEl('text', { class: 'rt-io rt-io-out', x: -10, y: -10 });
  svg.append(pathFwd, pathBack, inDot, outDot, inText, outText);

  // — tape, keyboard, histogram —
  const tape = el('p', { class: 'rt-tape x-readout', 'aria-live': 'off' }, 'Press a letter below.');
  const status = el('p', { class: 'x-status', role: 'status' });
  const keyRow = el('div', { class: 'rt-keys', role: 'group', 'aria-label': 'Letter keys' });
  for (const ch of LETTERS) {
    const b = el('button', { class: 'rt-key', type: 'button' }, ch);
    b.addEventListener('click', () => press(ch));
    keyRow.append(b);
  }

  const histo = el('div', {
    class: 'rt-histo',
    'aria-label': 'Distribution of cipher letters produced so far',
  });
  const histoBars: HTMLElement[] = [];
  for (const ch of LETTERS) {
    const bar = el('span', { class: 'rt-histo-bar' });
    const wrap = el(
      'span',
      { class: 'rt-histo-cell', title: ch },
      bar,
      el('span', { class: 'rt-histo-letter', 'aria-hidden': 'true' }, ch),
    );
    histoBars.push(bar);
    histo.append(wrap);
  }

  const steppingBtn = el(
    'button',
    { class: 'x-btn is-primary', type: 'button', 'aria-pressed': 'true' },
    'Rotors step: on',
  );
  const runBtn = el('button', { class: 'x-btn', type: 'button' }, 'Press E twenty times');
  const resetBtn = el('button', { class: 'x-btn', type: 'button' }, 'Reset');

  host.append(
    el(
      'p',
      { class: 'x-caption' },
      'This machine uses the real wirings of Enigma rotors I–III and reflector B. Press the same letter again and again — the rotors advance with every key, so the path through the maze keeps changing.',
    ),
    windows,
    svg,
    tape,
    keyRow,
    el('div', { class: 'x-controls' }, steppingBtn, runBtn, resetBtn),
    el('p', { class: 'x-caption' }, 'Cipher letters produced so far:'),
    histo,
    status,
  );

  function drawPath(path: number[]): void {
    // stations: entry(c0)@col0, c1@col1, c2@col2, c3@col3, c4@col4 then back
    const fwd = [0, 1, 2, 3, 4].map((i) => `${cols[i]},${yFor(path[i]!)}`).join(' ');
    const back = [
      `${cols[4]},${yFor(path[4]!)}`,
      `${cols[3]},${yFor(path[5]!)}`,
      `${cols[2]},${yFor(path[6]!)}`,
      `${cols[1]},${yFor(path[7]!)}`,
      `${cols[0]},${yFor(path[7]!)}`,
    ].join(' ');
    pathFwd.setAttribute('points', fwd);
    pathBack.setAttribute('points', back);
    inDot.setAttribute('cx', String(cols[0]));
    inDot.setAttribute('cy', String(yFor(path[0]!)));
    outDot.setAttribute('cx', String(cols[0]));
    outDot.setAttribute('cy', String(yFor(path[7]!)));
    inText.setAttribute('x', String(W - 8));
    inText.setAttribute('y', String(yFor(path[0]!) + 4));
    inText.textContent = LETTERS[path[0]!] ?? '';
    outText.setAttribute('x', String(W - 8));
    outText.setAttribute('y', String(yFor(path[7]!) + 4));
    outText.textContent = LETTERS[path[7]!] ?? '';
  }

  function refresh(): void {
    positionLetters(state)
      .split('')
      .forEach((ch, i) => {
        const cell = windowCells[i];
        if (cell) cell.textContent = ch;
      });
    const recent = history.slice(-9);
    tape.textContent =
      recent.length === 0
        ? 'Press a letter below.'
        : recent.map((h) => `${h.input}→${h.output}`).join('  ');
    const max = Math.max(...counts, 1);
    counts.forEach((n, i) => {
      const bar = histoBars[i];
      if (bar) bar.style.height = `${(n / max) * 40}px`;
    });
    steppingBtn.textContent = state.stepping ? 'Rotors step: on' : 'Rotors step: frozen';
    steppingBtn.setAttribute('aria-pressed', String(state.stepping));
    steppingBtn.classList.toggle('is-primary', state.stepping);
  }

  function record(input: string, output: string): void {
    history.push({ input, output });
    const idx = output.charCodeAt(0) - 65;
    counts[idx] = (counts[idx] ?? 0) + 1;
  }

  function press(ch: string): void {
    const result = encipher(state, ch);
    state = result.state;
    record(ch, result.output);
    drawPath(result.path);
    const same = history.filter((h) => h.input === ch);
    const distinct = new Set(same.map((h) => h.output));
    status.textContent = state.stepping
      ? `${ch} became ${result.output}. You have pressed ${ch} ${same.length} time${same.length === 1 ? '' : 's'} and received ${distinct.size} different cipher letter${distinct.size === 1 ? '' : 's'} — a substitution that never sits still.`
      : `${ch} became ${result.output} — and frozen rotors will keep saying so. A machine that doesn’t move is just a one-alphabet cipher, and you already broke one of those in Exhibit 1.`;
    refresh();
  }

  steppingBtn.addEventListener('click', () => {
    state = { ...state, stepping: !state.stepping };
    refresh();
  });

  runBtn.addEventListener('click', () => {
    const { outputs, state: next } = encipherRun(state, 'E', 20);
    state = next;
    outputs.forEach((o) => record('E', o));
    // redraw the last press's path (same positions, no extra step)
    const replay = encipher({ positions: state.positions, stepping: false }, 'E');
    drawPath(replay.path);
    const distinct = new Set(outputs);
    status.textContent = state.stepping
      ? `Twenty presses of E produced ${distinct.size} different letters (${[...distinct].join(', ')}). The tallest bar an eavesdropper can find is barely taller than the rest — frequency analysis starves.`
      : `Twenty presses of E produced only “${[...distinct].join('')}”. Freeze the rotors and the old attack from Exhibit 1 works again instantly.`;
    refresh();
  });

  resetBtn.addEventListener('click', () => {
    state = initialState();
    history = [];
    counts = new Array<number>(26).fill(0);
    pathFwd.setAttribute('points', '');
    pathBack.setAttribute('points', '');
    [inDot, outDot].forEach((d) => {
      d.setAttribute('cx', '-10');
      d.setAttribute('cy', '-10');
    });
    inText.textContent = '';
    outText.textContent = '';
    status.textContent = '';
    refresh();
  });

  refresh();
}
