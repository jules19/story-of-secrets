import './harvest.css';
import { el } from '../../core/dom';
import {
  SEND_YEAR,
  TIMELINE_END,
  damaged,
  moscaLate,
  secrecyUntil,
  status,
  timelinePos,
  type HarvestState,
} from './logic';

const PLAINTEXT = 'NEGOTIATING POSITION: WE WILL SETTLE AT ANY PRICE BELOW FORTY';
const CIPHERTEXT = 'q7Hx0…kL9Zr2mWv4Tn8cAe1JuYb5Gd3PoIfS6hMxCw0KtRq…';

export function mount(host: HTMLElement): void {
  const state: HarvestState = {
    scheme: 'classical',
    crqcYear: 2040,
    viewYear: SEND_YEAR,
    secrecyYears: 25,
  };

  const classicalBtn = el(
    'button',
    { class: 'x-btn is-primary', type: 'button', 'aria-pressed': 'true' },
    'Encrypt with RSA/ECC (classical)',
  );
  const hybridBtn = el(
    'button',
    { class: 'x-btn', type: 'button', 'aria-pressed': 'false' },
    'Encrypt with hybrid + ML-KEM (post-quantum)',
  );

  const secrecySelect = el('select', { class: 'x-select', id: 'hv-secrecy' });
  for (const y of [10, 25, 50]) {
    secrecySelect.append(el('option', { value: String(y) }, `${y} years`));
  }
  secrecySelect.value = '25';

  const crqcSlider = el('input', {
    type: 'range',
    min: 2030,
    max: 2062,
    step: 1,
    value: state.crqcYear,
    class: 'x-range',
    id: 'hv-crqc',
  });
  const crqcReadout = el('span', { class: 'x-readout' });

  const yearSlider = el('input', {
    type: 'range',
    min: SEND_YEAR,
    max: TIMELINE_END,
    step: 1,
    value: SEND_YEAR,
    class: 'x-range',
    id: 'hv-year',
  });
  const yearReadout = el('span', { class: 'x-readout hv-year-readout' });

  // — timeline strip —
  const track = el('div', { class: 'hv-track', 'aria-hidden': 'true' });
  const secrecySpan = el('span', { class: 'hv-span-secrecy' });
  const crqcMark = el(
    'span',
    { class: 'hv-mark hv-mark-crqc' },
    el('span', { class: 'hv-mark-label' }, 'CRQC?'),
  );
  const sendMark = el(
    'span',
    { class: 'hv-mark hv-mark-send', style: 'left:0%' },
    el('span', { class: 'hv-mark-label' }, 'sent & recorded'),
  );
  const playhead = el('span', { class: 'hv-playhead' });
  track.append(secrecySpan, sendMark, crqcMark, playhead);

  const vault = el('div', { class: 'hv-vault' });
  const vaultTitle = el('p', { class: 'hv-vault-title' });
  const vaultBody = el('p', { class: 'hv-vault-body x-mono-block' });
  vault.append(vaultTitle, vaultBody);

  const verdict = el('p', { class: 'x-status', role: 'status' });
  const mosca = el('p', { class: 'x-caption hv-mosca' });

  host.append(
    el(
      'p',
      { class: 'x-caption' },
      `In ${SEND_YEAR} you send a message that must stay secret for decades — and an adversary records the ciphertext the day it crosses the wire. Recording is cheap; they can wait. Choose your protection, choose an assumption about when a code-breaking quantum computer arrives, then drag time forward.`,
    ),
    el('div', { class: 'x-controls' }, classicalBtn, hybridBtn),
    el(
      'div',
      { class: 'x-grid cols-2 hv-settings' },
      el('label', { class: 'x-field', for: 'hv-secrecy' }, 'Must stay secret for', secrecySelect),
      el(
        'label',
        { class: 'x-field', for: 'hv-crqc' },
        'Scenario: a CRQC arrives in',
        crqcSlider,
        crqcReadout,
      ),
    ),
    el(
      'label',
      { class: 'x-field hv-scrub', for: 'hv-year' },
      'Drag time forward',
      yearSlider,
      yearReadout,
    ),
    track,
    vault,
    verdict,
    mosca,
  );

  function render(): void {
    const st = status(state);
    const until = secrecyUntil(state);
    const crqcBeyond = state.crqcYear > TIMELINE_END;

    classicalBtn.classList.toggle('is-primary', state.scheme === 'classical');
    hybridBtn.classList.toggle('is-primary', state.scheme === 'hybrid');
    classicalBtn.setAttribute('aria-pressed', String(state.scheme === 'classical'));
    hybridBtn.setAttribute('aria-pressed', String(state.scheme === 'hybrid'));

    crqcReadout.textContent = crqcBeyond
      ? `not before ${TIMELINE_END} (maybe never)`
      : String(state.crqcYear);
    yearReadout.textContent = String(state.viewYear);

    secrecySpan.style.left = '0%';
    secrecySpan.style.width = `${timelinePos(until) * 100}%`;
    crqcMark.style.left = `${timelinePos(state.crqcYear) * 100}%`;
    crqcMark.style.display = crqcBeyond ? 'none' : '';
    playhead.style.left = `${timelinePos(state.viewYear) * 100}%`;

    vaultTitle.textContent =
      st === 'opened'
        ? `${state.viewYear} — the adversary runs Shor’s algorithm on the ${SEND_YEAR} recording:`
        : `${state.viewYear} — sitting in the adversary’s archive since ${SEND_YEAR}:`;
    vaultBody.textContent = st === 'opened' ? PLAINTEXT : CIPHERTEXT;
    vault.classList.toggle('is-opened', st === 'opened');

    if (st === 'opened') {
      const early = until - state.viewYear;
      verdict.textContent =
        early > 0
          ? `Opened ${early} year${early === 1 ? '' : 's'} before your secrecy requirement expires (${until}). The encryption was never “broken” in ${SEND_YEAR} — it was simply outlived.`
          : `Opened, but after your secrecy requirement expired in ${until}. This time, the calendar saved you — not the cipher.`;
    } else if (state.scheme === 'hybrid') {
      verdict.textContent = `Still sealed. The recording is protected by both a classical exchange and ML-KEM (FIPS 203, 2024): Shor’s algorithm gets the classical layer, not the lattice. No guarantee is eternal — that is why the hybrid keeps both locks.`;
    } else if (crqcBeyond || state.viewYear < state.crqcYear) {
      verdict.textContent = `Still sealed — in this scenario. But notice what has already happened: the ciphertext is in hostile hands, and your secrecy must outlast every future computer, on a schedule you don’t control.`;
    }

    const yearsToCrqc = state.crqcYear - SEND_YEAR;
    const migration = 8;
    mosca.textContent = damaged(state)
      ? `The migration arithmetic (Mosca’s inequality): your secret must live ${state.secrecyYears} years and re-equipping systems takes years — but this scenario allows only ${yearsToCrqc}. For data like this, the time to switch was before it was sent. That is why the migration began in the 2020s, years before any such machine existed.`
      : `The migration arithmetic (Mosca’s inequality): secrecy lifetime + migration time must stay inside the years remaining. Here ${state.secrecyYears} + ~${migration} vs ${crqcBeyond ? `more than ${TIMELINE_END - SEND_YEAR}` : yearsToCrqc} — ${moscaLate(state.secrecyYears, migration, yearsToCrqc) && !crqcBeyond ? 'already tight.' : 'survivable, if the assumption holds.'}`;
  }

  classicalBtn.addEventListener('click', () => {
    state.scheme = 'classical';
    render();
  });
  hybridBtn.addEventListener('click', () => {
    state.scheme = 'hybrid';
    render();
  });
  secrecySelect.addEventListener('change', () => {
    state.secrecyYears = Number(secrecySelect.value);
    render();
  });
  crqcSlider.addEventListener('input', () => {
    const v = Number(crqcSlider.value);
    state.crqcYear = v > TIMELINE_END ? TIMELINE_END + 100 : v;
    render();
  });
  yearSlider.addEventListener('input', () => {
    state.viewYear = Number(yearSlider.value);
    render();
  });

  render();
}
