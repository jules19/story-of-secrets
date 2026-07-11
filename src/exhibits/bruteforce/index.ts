import './bruteforce.css';
import { el } from '../../core/dom';
import { bigNumberName, humanDuration } from '../../core/format';
import {
  ATTACKERS,
  KEY_SIZES,
  UNIVERSE_AGE_YEARS,
  YEAR_SECONDS,
  expectedSeconds,
  keyspace,
  logPosition,
} from './logic';

const LANDMARKS: Array<{ seconds: number; label: string }> = [
  { seconds: 1, label: '1 second' },
  { seconds: 3600 * 24, label: 'a day' },
  { seconds: YEAR_SECONDS, label: 'a year' },
  { seconds: 100 * YEAR_SECONDS, label: 'a lifetime' },
  { seconds: UNIVERSE_AGE_YEARS * YEAR_SECONDS, label: 'age of the universe' },
];

export function mount(host: HTMLElement): void {
  let bitsIndex = 1; // 56 — DES
  let attackerIndex = 1; // Deep Crack

  const bitsSlider = el('input', {
    type: 'range',
    min: 0,
    max: KEY_SIZES.length - 1,
    step: 1,
    value: bitsIndex,
    class: 'x-range',
    id: 'bf-bits',
    'aria-valuetext': '',
  });
  const bitsReadout = el('span', { class: 'x-readout' });

  const attackerSelect = el('select', { class: 'x-select', id: 'bf-attacker' });
  ATTACKERS.forEach((a, i) => {
    attackerSelect.append(el('option', { value: String(i) }, a.label));
  });
  attackerSelect.value = String(attackerIndex);

  const attackerNote = el('p', { class: 'x-caption bf-note' });
  const keyspaceLine = el('p', { class: 'bf-keyspace' });
  const verdict = el('p', { class: 'bf-verdict', role: 'status' });

  // — log-scale time bar —
  const scale = el('div', { class: 'bf-scale', 'aria-hidden': 'true' });
  for (const lm of LANDMARKS) {
    const tick = el(
      'span',
      { class: 'bf-tick', style: `left:${(logPosition(lm.seconds) * 100).toFixed(2)}%` },
      el('span', { class: 'bf-tick-line' }),
      el('span', { class: 'bf-tick-label' }, lm.label),
    );
    scale.append(tick);
  }
  const fill = el('span', { class: 'bf-fill' });
  const marker = el('span', { class: 'bf-marker' });
  scale.prepend(el('span', { class: 'bf-bar' }, fill, marker));

  host.append(
    el(
      'p',
      { class: 'x-caption' },
      'Every extra key bit doubles the search. That single fact decides which secrets survive. Pick a key size and an adversary, and read off the expected time to find the key by trying them all.',
    ),
    el(
      'div',
      { class: 'x-grid cols-2 bf-controls' },
      el('label', { class: 'x-field', for: 'bf-bits' }, 'Key size', bitsSlider, bitsReadout),
      el(
        'label',
        { class: 'x-field', for: 'bf-attacker' },
        'Adversary',
        attackerSelect,
        attackerNote,
      ),
    ),
    keyspaceLine,
    scale,
    verdict,
  );

  function update(): void {
    const bits = KEY_SIZES[bitsIndex]!;
    const attacker = ATTACKERS[attackerIndex]!;
    const secs = expectedSeconds(bits, attacker.rate);

    bitsReadout.textContent = `${bits} bits${bits === 56 ? ' — DES (1977)' : bits === 128 ? ' — AES minimum' : bits === 256 ? ' — AES-256' : bits === 40 ? ' — 1990s “export grade”' : ''}`;
    bitsSlider.setAttribute('aria-valuetext', `${bits} bits`);
    attackerNote.textContent = attacker.note;
    keyspaceLine.textContent = `2^${bits} possible keys ≈ ${bigNumberName(keyspace(bits))}. Expected search: half of them.`;

    const pos = logPosition(secs);
    fill.style.width = `${(pos * 100).toFixed(2)}%`;
    marker.style.left = `${(pos * 100).toFixed(2)}%`;

    const years = secs / YEAR_SECONDS;
    let framing: string;
    if (secs < 60) framing = 'Broken before you finish reading this sentence.';
    else if (secs < 3600 * 24 * 60) framing = 'Well within a motivated adversary’s patience.';
    else if (years < 200)
      framing = 'Uncomfortable: within a human lifetime — or a well-funded agency’s.';
    else if (years < UNIVERSE_AGE_YEARS)
      framing =
        'Safe from brute force — though history says wait for a cleverer attack, not a bigger computer.';
    else framing = 'The universe retires first. Brute force is simply the wrong tool here.';

    verdict.textContent = `Expected time: ${humanDuration(secs)}. ${framing}`;
  }

  bitsSlider.addEventListener('input', () => {
    bitsIndex = Number(bitsSlider.value);
    update();
  });
  attackerSelect.addEventListener('change', () => {
    attackerIndex = Number(attackerSelect.value);
    update();
  });

  update();
}
