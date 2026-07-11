import './sidechannel.css';
import { el } from '../../core/dom';
import { mulberry32 } from '../frequency/logic';
import { PIN_LENGTH, probePosition, randomPin, spread } from './logic';

const TRIALS = 8;

export function mount(host: HTMLElement): void {
  let seed = 96; // Kocher's year
  let rng = mulberry32(seed);
  let secret = randomPin(rng);
  let known = '';
  let constantTime = false;
  let measurements = 0;
  let lastProbe: { digit: number; meanUs: number }[] | null = null;

  // — known digits display —
  const slots = el('div', { class: 'sc-slots', 'aria-label': 'Recovered PIN digits' });
  const slotCells = Array.from({ length: PIN_LENGTH }, () => el('span', { class: 'sc-slot' }, '·'));
  slots.append(...slotCells);

  const modeBtn = el(
    'button',
    { class: 'x-btn', type: 'button', 'aria-pressed': 'false' },
    'Comparison: early-exit (leaky)',
  );
  const probeBtn = el(
    'button',
    { class: 'x-btn is-primary', type: 'button' },
    `Time all 10 digits (×${TRIALS} tries)`,
  );
  const restartBtn = el('button', { class: 'x-btn', type: 'button' }, 'New secret PIN');

  const chart = el('div', {
    class: 'sc-chart',
    role: 'group',
    'aria-label': 'Average response time per candidate digit. Tap a bar to lock in that digit.',
  });
  const status = el('p', { class: 'x-status', role: 'status' });
  const counter = el('p', { class: 'sc-counter x-caption' });

  host.append(
    el(
      'p',
      { class: 'x-caption' },
      'This simulated device checks a 4-digit PIN one digit at a time and rejects at the first mismatch. It never prints a secret — but it answers a little slower when your first digits are right. Play the attacker: time it.',
    ),
    slots,
    el('div', { class: 'x-controls' }, probeBtn, modeBtn, restartBtn),
    chart,
    status,
    counter,
  );

  function renderSlots(): void {
    slotCells.forEach((cell, i) => {
      const digit = known[i];
      cell.textContent = digit ?? '·';
      cell.classList.toggle('is-known', digit !== undefined);
    });
  }

  function renderChart(): void {
    chart.textContent = '';
    if (!lastProbe) {
      chart.append(
        el(
          'p',
          { class: 'x-caption sc-empty' },
          known.length >= PIN_LENGTH ? '' : 'No measurements yet for this position.',
        ),
      );
      return;
    }
    const times = lastProbe.map((p) => p.meanUs);
    const min = Math.min(...times);
    const max = Math.max(...times);
    const range = Math.max(max - min, 0.001);
    for (const p of lastProbe) {
      const h = 18 + ((p.meanUs - min) / range) * 64;
      const btn = el(
        'button',
        {
          type: 'button',
          class: 'sc-bar-btn',
          'aria-label': `Digit ${p.digit}: average ${p.meanUs.toFixed(2)} microseconds. Lock in ${p.digit} for position ${known.length + 1}.`,
        },
        el('span', { class: 'sc-bar', style: `height:${h.toFixed(1)}px`, 'aria-hidden': 'true' }),
        el('span', { class: 'sc-bar-time', 'aria-hidden': 'true' }, p.meanUs.toFixed(2)),
        el('span', { class: 'sc-bar-digit', 'aria-hidden': 'true' }, String(p.digit)),
      );
      btn.addEventListener('click', () => lock(p.digit));
      chart.append(btn);
    }
  }

  function renderCounter(): void {
    counter.textContent = `Timing measurements so far: ${measurements}. Exhaustive search of all PINs would need up to 10,000 attempts; the leak reduces it to at most 40 probes.`;
  }

  function probe(): void {
    if (known.length >= PIN_LENGTH) return;
    lastProbe = probePosition(secret, known, constantTime, rng, TRIALS);
    measurements += 10 * TRIALS;
    const s = spread(lastProbe);
    if (constantTime) {
      status.textContent = `Position ${known.length + 1}: the spread between fastest and slowest digit is ${s.toFixed(2)} µs — pure noise. Constant-time code has starved the attack. There is nothing to read.`;
    } else {
      status.textContent = `Position ${known.length + 1}: one digit stands ${s.toFixed(2)} µs above the rest — the device compared one digit further before rejecting. Tap the slowest bar to lock it in.`;
    }
    renderChart();
    renderCounter();
  }

  function lock(digit: number): void {
    if (known.length >= PIN_LENGTH) return;
    known += String(digit);
    lastProbe = null;
    renderSlots();
    renderChart();
    if (known.length === PIN_LENGTH) {
      if (known === secret) {
        status.textContent = `Cracked: the PIN is ${secret}, recovered in ${measurements} timings without one lucky guess. The device never revealed a digit — its clock did. This is the logic of Kocher’s 1996 attack, and of every side channel since.`;
      } else {
        status.textContent = `The device rejects ${known} — a wrong turn somewhere (noise, or a mis-read bar; position ${1 + [...known].findIndex((d, i) => d !== secret[i])} is off). Real attackers re-measure with more trials. Start again.`;
      }
    } else {
      status.textContent = `Locked position ${known.length}. Now time position ${known.length + 1}.`;
    }
  }

  function restart(): void {
    seed += 1;
    rng = mulberry32(seed);
    secret = randomPin(rng);
    known = '';
    measurements = 0;
    lastProbe = null;
    status.textContent = '';
    renderSlots();
    renderChart();
    renderCounter();
  }

  modeBtn.addEventListener('click', () => {
    constantTime = !constantTime;
    modeBtn.textContent = constantTime
      ? 'Comparison: constant-time (fixed)'
      : 'Comparison: early-exit (leaky)';
    modeBtn.setAttribute('aria-pressed', String(constantTime));
    modeBtn.classList.toggle('is-primary', constantTime);
  });
  probeBtn.addEventListener('click', probe);
  restartBtn.addEventListener('click', restart);

  renderSlots();
  renderChart();
  renderCounter();
}
