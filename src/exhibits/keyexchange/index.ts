import './keyexchange.css';
import { el } from '../../core/dom';
import { G, P, bruteForceLog, hueFor, mixHues, publicValue, sharedSecret } from './logic';

const COMMON_HUE = 46; // the public "common paint"

export function mount(host: HTMLElement): void {
  let a = 6;
  let b = 15;

  const swatch = (cls = '') => el('span', { class: `kx-swatch ${cls}`, 'aria-hidden': 'true' });

  // — controls —
  const aSlider = el('input', {
    type: 'range',
    min: 2,
    max: 21,
    value: a,
    class: 'x-range',
    id: 'kx-a',
  });
  const bSlider = el('input', {
    type: 'range',
    min: 2,
    max: 21,
    value: b,
    class: 'x-range',
    id: 'kx-b',
  });

  // — paint analogy panel —
  const paintCells = {
    aSecret: swatch(),
    bSecret: swatch(),
    commonA: swatch(),
    commonB: swatch(),
    aMix: swatch(),
    bMix: swatch(),
    aFinal: swatch('kx-final'),
    bFinal: swatch('kx-final'),
  };
  const paintPanel = el(
    'div',
    { class: 'kx-panel' },
    el(
      'p',
      { class: 'kx-panel-title' },
      el('span', { class: 'fact fact-analogy' }, 'educational analogy'),
      ' The paint version',
    ),
    el(
      'div',
      { class: 'kx-grid' },
      el(
        'div',
        { class: 'kx-col' },
        el('h4', {}, 'Alice'),
        el('p', { class: 'kx-line' }, paintCells.aSecret, ' her secret colour — never leaves home'),
        el('p', { class: 'kx-line' }, paintCells.commonA, ' + the public base colour'),
        el('p', { class: 'kx-line kx-sent' }, paintCells.aMix, ' the blend she sends openly →'),
        el('p', { class: 'kx-line' }, paintCells.aFinal, ' Bob’s blend + her secret'),
      ),
      el(
        'div',
        { class: 'kx-col' },
        el('h4', {}, 'Bob'),
        el('p', { class: 'kx-line' }, paintCells.bSecret, ' his secret colour — never leaves home'),
        el('p', { class: 'kx-line' }, paintCells.commonB, ' + the public base colour'),
        el('p', { class: 'kx-line kx-sent' }, paintCells.bMix, ' ← the blend he sends openly'),
        el('p', { class: 'kx-line' }, paintCells.bFinal, ' Alice’s blend + his secret'),
      ),
    ),
    el(
      'p',
      { class: 'x-caption' },
      'Both end with the identical final colour, yet only blends ever crossed the wire — and paint, once mixed, is hard to unmix. That is the whole idea. Paint is only an analogy, though; here is the actual mathematics, shrunk small enough to check by hand.',
    ),
  );

  // — modular arithmetic panel —
  const mathCells = {
    aPub: el('span', { class: 'kx-num' }),
    bPub: el('span', { class: 'kx-num' }),
    aShared: el('span', { class: 'kx-num kx-num-final' }),
    bShared: el('span', { class: 'kx-num kx-num-final' }),
    aSecretN: el('span', { class: 'kx-num kx-num-secret' }),
    bSecretN: el('span', { class: 'kx-num kx-num-secret' }),
    aFormula: el('span', { class: 'kx-formula' }),
    bFormula: el('span', { class: 'kx-formula' }),
    aSharedFormula: el('span', { class: 'kx-formula' }),
    bSharedFormula: el('span', { class: 'kx-formula' }),
  };

  const mathPanel = el(
    'div',
    { class: 'kx-panel' },
    el(
      'p',
      { class: 'kx-panel-title' },
      el('span', { class: 'fact fact-record' }, 'the real mathematics'),
      ` Public agreement: prime p = ${P}, generator g = ${G}`,
    ),
    el(
      'div',
      { class: 'kx-grid' },
      el(
        'div',
        { class: 'kx-col' },
        el('h4', {}, 'Alice'),
        el('p', { class: 'kx-line' }, 'secret a = ', mathCells.aSecretN),
        el(
          'p',
          { class: 'kx-line kx-sent' },
          'sends A = ',
          mathCells.aFormula,
          ' = ',
          mathCells.aPub,
        ),
        el(
          'p',
          { class: 'kx-line' },
          'computes ',
          mathCells.aSharedFormula,
          ' = ',
          mathCells.aShared,
        ),
      ),
      el(
        'div',
        { class: 'kx-col' },
        el('h4', {}, 'Bob'),
        el('p', { class: 'kx-line' }, 'secret b = ', mathCells.bSecretN),
        el(
          'p',
          { class: 'kx-line kx-sent' },
          'sends B = ',
          mathCells.bFormula,
          ' = ',
          mathCells.bPub,
        ),
        el(
          'p',
          { class: 'kx-line' },
          'computes ',
          mathCells.bSharedFormula,
          ' = ',
          mathCells.bShared,
        ),
      ),
    ),
  );

  const eve = el('p', { class: 'kx-eve x-caption' });
  const status = el('p', { class: 'x-status', role: 'status' });

  host.append(
    el(
      'p',
      { class: 'x-caption' },
      'Two people who have never met agree on a secret while an eavesdropper hears every word they exchange. Slide the secrets — nothing that crosses the “wire” ever reveals them.',
    ),
    el(
      'div',
      { class: 'kx-sliders' },
      el('label', { class: 'x-field', for: 'kx-a' }, 'Alice’s secret', aSlider),
      el('label', { class: 'x-field', for: 'kx-b' }, 'Bob’s secret', bSlider),
    ),
    paintPanel,
    mathPanel,
    eve,
    status,
  );

  function paint(elm: HTMLElement, hue: number): void {
    elm.style.background = `oklch(0.72 0.13 ${hue.toFixed(1)})`;
  }

  function update(): void {
    // paints
    const hueA = hueFor(a);
    const hueB = hueFor(b);
    paint(paintCells.aSecret, hueA);
    paint(paintCells.bSecret, hueB);
    paint(paintCells.commonA, COMMON_HUE);
    paint(paintCells.commonB, COMMON_HUE);
    paint(paintCells.aMix, mixHues([COMMON_HUE, hueA]));
    paint(paintCells.bMix, mixHues([COMMON_HUE, hueB]));
    const finalHue = mixHues([COMMON_HUE, hueA, hueB]);
    paint(paintCells.aFinal, finalHue);
    paint(paintCells.bFinal, finalHue);

    // numbers
    const A = publicValue(a);
    const B = publicValue(b);
    const sA = sharedSecret(B, a);
    const sB = sharedSecret(A, b);
    mathCells.aSecretN.textContent = String(a);
    mathCells.bSecretN.textContent = String(b);
    mathCells.aFormula.textContent = `${G}^${a} mod ${P}`;
    mathCells.bFormula.textContent = `${G}^${b} mod ${P}`;
    mathCells.aPub.textContent = String(A);
    mathCells.bPub.textContent = String(B);
    mathCells.aSharedFormula.textContent = `B^a mod ${P} = ${B}^${a} mod ${P}`;
    mathCells.bSharedFormula.textContent = `A^b mod ${P} = ${A}^${b} mod ${P}`;
    mathCells.aShared.textContent = String(sA);
    mathCells.bShared.textContent = String(sB);

    const tries = bruteForceLog(A);
    eve.textContent = `Eve, listening, holds p = ${P}, g = ${G}, A = ${A}, B = ${B} — and neither secret. To recover a she must solve a discrete logarithm; in this toy group that is ${tries} guesses, so try it. In a real group the exponent has hundreds of digits, and no known classical shortcut beats astronomical search.`;
    status.textContent = `Both arrive at the same shared secret: ${sA}. It was never transmitted.`;
  }

  aSlider.addEventListener('input', () => {
    a = Number(aSlider.value);
    update();
  });
  bSlider.addEventListener('input', () => {
    b = Number(bSlider.value);
    update();
  });

  update();
}
