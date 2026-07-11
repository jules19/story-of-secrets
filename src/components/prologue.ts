import { motionOK } from '../core/motion';

const CIPHER_GLYPHS = '†‡§¶Δθλπφψωξζ∴◊∇⊕⊗≈∆ϟ⋔';

/**
 * The opening line arrives enciphered and resolves, character by character,
 * into plaintext — the visitor's first decryption. Under reduced motion (or
 * no JS) the plaintext simply stands.
 */
export function initPrologue(): void {
  const host = document.querySelector<HTMLElement>('[data-decipher]');
  if (!host || !motionOK()) return;
  const text = host.dataset.decipher ?? '';
  if (!text) return;

  host.textContent = '';
  const wrapper = document.createElement('span');
  wrapper.setAttribute('aria-hidden', 'true');
  const glyphs: Array<{ el: HTMLSpanElement; target: string }> = [];

  for (const word of text.split(' ')) {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'word';
    for (const ch of word) {
      const span = document.createElement('span');
      span.textContent = randomGlyph();
      span.className = 'glyph is-cipher';
      glyphs.push({ el: span, target: ch });
      wordSpan.append(span);
    }
    wrapper.append(wordSpan, ' ');
  }
  host.append(wrapper);

  const start = performance.now() + 500;
  const perChar = 42;
  let lastFlicker = 0;

  const tick = (now: number) => {
    const resolvedCount = Math.max(0, Math.floor((now - start) / perChar));
    if (now - lastFlicker > 70) {
      lastFlicker = now;
      for (let i = resolvedCount; i < glyphs.length; i++) {
        const g = glyphs[i];
        if (g) g.el.textContent = randomGlyph();
      }
    }
    for (let i = 0; i < Math.min(resolvedCount, glyphs.length); i++) {
      const g = glyphs[i];
      if (g && g.el.classList.contains('is-cipher')) {
        g.el.textContent = g.target;
        g.el.classList.remove('is-cipher');
        g.el.classList.add('is-plain');
      }
    }
    if (resolvedCount < glyphs.length) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function randomGlyph(): string {
  return CIPHER_GLYPHS[Math.floor(Math.random() * CIPHER_GLYPHS.length)] ?? '†';
}
