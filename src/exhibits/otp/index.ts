import './otp.css';
import { el } from '../../core/dom';
import { mulberry32 } from '../frequency/logic';
import { envelopeGlyph, keyGlyph, randomGrid, xor, GRID, type BitGrid } from './logic';

/**
 * The one-time pad: with a fresh random key per message, ciphertext is pure
 * noise (Shannon's perfect secrecy). Reuse the key once, and XORing the two
 * ciphertexts erases the key entirely — both messages surface, no key needed.
 */
export function mount(host: HTMLElement): void {
  let seed = 1943;
  let reuse = true;

  const msgA = envelopeGlyph();
  const msgB = keyGlyph();

  const cells: Record<string, HTMLCanvasElement> = {};
  const panel = (id: string, title: string, sub: string) => {
    const canvas = el('canvas', {
      width: GRID,
      height: GRID,
      class: 'otp-grid',
      role: 'img',
      'aria-label': `${title}: ${sub}`,
    });
    cells[id] = canvas;
    return el(
      'figure',
      { class: 'otp-panel' },
      canvas,
      el('figcaption', {}, el('strong', {}, title), el('span', {}, sub)),
    );
  };

  const freshBtn = el(
    'button',
    { class: 'x-btn', type: 'button', 'aria-pressed': 'false' },
    'Fresh key for each message',
  );
  const reuseBtn = el(
    'button',
    { class: 'x-btn is-primary', type: 'button', 'aria-pressed': 'true' },
    'Reuse one key — the wartime shortcut',
  );
  const rekeyBtn = el('button', { class: 'x-btn', type: 'button' }, 'New random key');
  const status = el('p', { class: 'x-status', role: 'status' });

  const row1 = el(
    'div',
    { class: 'otp-row' },
    panel('m1', 'Message A', 'an envelope'),
    panel('k1', 'Key 1', 'coin flips'),
    panel('c1', 'Ciphertext A', 'A ⊕ Key 1'),
  );
  const row2 = el(
    'div',
    { class: 'otp-row' },
    panel('m2', 'Message B', 'a key pictogram'),
    panel('k2', 'Key 2', 'coin flips'),
    panel('c2', 'Ciphertext B', 'B ⊕ Key 2'),
  );
  const row3 = el(
    'div',
    { class: 'otp-row otp-row-result' },
    panel('xorc', 'Ciphertext A ⊕ Ciphertext B', 'what an interceptor can compute alone'),
  );

  host.append(
    el(
      'p',
      { class: 'x-caption' },
      'Each message is a small picture — every dark pixel a 1, every light pixel a 0. The key is a string of coin flips, XORed onto the message. One rule keeps it perfectly secret: never use a key twice.',
    ),
    el('div', { class: 'x-controls' }, freshBtn, reuseBtn, rekeyBtn),
    row1,
    row2,
    row3,
    status,
  );

  function draw(id: string, grid: BitGrid, highlight = false): void {
    const canvas = cells[id];
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const style = getComputedStyle(host);
    const ink = style.getPropertyValue('--ink-0').trim() || '#14110d';
    const fg = highlight
      ? style.getPropertyValue('--era-accent').trim() || '#7dbfa0'
      : style.getPropertyValue('--paper-dim').trim() || '#c8bda8';
    ctx.fillStyle = ink;
    ctx.fillRect(0, 0, GRID, GRID);
    ctx.fillStyle = fg;
    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        if (grid[y * GRID + x]) ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  function update(): void {
    const rng = mulberry32(seed);
    const key1 = randomGrid(rng);
    const key2 = reuse ? key1 : randomGrid(rng);
    const c1 = xor(msgA, key1);
    const c2 = xor(msgB, key2);
    const combined = xor(c1, c2);

    draw('m1', msgA);
    draw('m2', msgB);
    draw('k1', key1);
    draw('k2', key2);
    draw('c1', c1);
    draw('c2', c2);
    draw('xorc', combined, reuse);

    const k2caption = row2.querySelectorAll('figcaption strong')[1];
    const k2fig = row2.querySelectorAll('figure')[1];
    if (k2caption) k2caption.textContent = reuse ? 'Key 1 again' : 'Key 2';
    k2fig?.classList.toggle('otp-reused', reuse);
    const c2caption = row2.querySelectorAll('figcaption')[2]?.querySelector('span');
    if (c2caption) c2caption.textContent = reuse ? 'B ⊕ Key 1 — the reuse' : 'B ⊕ Key 2';

    freshBtn.setAttribute('aria-pressed', String(!reuse));
    reuseBtn.setAttribute('aria-pressed', String(reuse));
    freshBtn.classList.toggle('is-primary', !reuse);
    reuseBtn.classList.toggle('is-primary', reuse);

    status.textContent = reuse
      ? 'The key has vanished from the bottom panel: C1 ⊕ C2 = A ⊕ B. Both pictures surface — and no one needed the key. This is the arithmetic behind VENONA.'
      : 'With independent keys, every panel below the messages is statistically pure noise. Shannon proved this secrecy is perfect — unbreakable by any amount of computing.';
  }

  freshBtn.addEventListener('click', () => {
    reuse = false;
    update();
  });
  reuseBtn.addEventListener('click', () => {
    reuse = true;
    update();
  });
  rekeyBtn.addEventListener('click', () => {
    seed += 1;
    update();
  });

  update();
}
