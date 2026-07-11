import './frequency.css';
import { el } from '../../core/dom';
import {
  applyGuesses,
  cipherOrder,
  encrypt,
  ENGLISH_FREQ,
  ENGLISH_ORDER,
  letterFrequencies,
  mulberry32,
  nextHint,
  progress,
  shuffleKey,
} from './logic';

const PASSAGES = [
  `When the young conspirator sent his letter north in the summer of fifteen eighty six, he believed the cipher would keep the plan dark until the deed was done. The men who watched the road believed otherwise. They had copied every line, counted every symbol, and matched the shape of the secret against the shape of the language. And the language, as it always does, had told them everything.`,
  `The clerk who counts letters holds a quiet kind of power. He does not need the key, and he does not need luck. He needs only enough of the message, a steady hand, and the one fact the cipher cannot hide: that beneath every disguise, the language keeps its old habits, and the most common letter still stands taller than all the rest.`,
];

export function mount(host: HTMLElement): void {
  let seedCounter = Date.now() % 100000;
  let rng = mulberry32(seedCounter);
  let passageIndex = 0;
  let key = shuffleKey(rng);
  let ciphertext = encrypt(PASSAGES[passageIndex]!, key);
  let guesses: Record<string, string> = {};
  let selected: string | null = null;

  // — structure —
  const textPane = el('div', { class: 'x-mono-block fq-text', 'aria-live': 'off' });
  const status = el('p', { class: 'x-status', role: 'status' });

  const hintBtn = el('button', { class: 'x-btn', type: 'button' }, 'Ask al-Kindī for a hint');
  const clearBtn = el('button', { class: 'x-btn', type: 'button' }, 'Clear guesses');
  const newBtn = el('button', { class: 'x-btn', type: 'button' }, 'New message & key');
  const unmapBtn = el('button', { class: 'x-btn fq-unmap', type: 'button', hidden: true }, '');

  const cipherStrip = el('div', {
    class: 'fq-strip',
    role: 'group',
    'aria-label': 'Ciphertext symbols, ordered by how often they appear',
  });
  const plainStrip = el('div', {
    class: 'fq-strip',
    role: 'group',
    'aria-label': 'English letters, ordered by typical frequency',
  });

  host.append(
    el(
      'p',
      { class: 'x-caption' },
      'Below is a message encrypted with a randomly shuffled alphabet — one key out of 400 septillion. Don’t search for the key. Count.',
    ),
    textPane,
    status,
    el(
      'p',
      { class: 'x-caption fq-howto' },
      'Tap a cipher symbol, then tap the English letter you think it hides. The bars show how often each appears — tall bars usually hide tall bars.',
    ),
    el('p', { class: 'fq-strip-label' }, 'In this ciphertext'),
    cipherStrip,
    el('p', { class: 'fq-strip-label' }, 'In ordinary English'),
    plainStrip,
    el('p', { class: 'fq-swipe-hint', 'aria-hidden': 'true' }, 'swipe the rows for more letters →'),
    el('div', { class: 'x-controls' }, hintBtn, unmapBtn, clearBtn, newBtn),
  );

  // — rendering —
  function renderText(): void {
    textPane.textContent = '';
    for (const cell of applyGuesses(ciphertext, guesses)) {
      if (!cell.isLetter) {
        textPane.append(cell.char);
      } else {
        textPane.append(
          el('span', { class: cell.resolved ? 'fq-resolved' : 'fq-cipherchar' }, cell.char),
        );
      }
    }
  }

  function renderStrips(): void {
    const freq = letterFrequencies(ciphertext);
    const maxObserved = Math.max(...Object.values(freq), 1);
    cipherStrip.textContent = '';
    for (const c of cipherOrder(ciphertext)) {
      const pct = freq[c] ?? 0;
      const mapped = guesses[c];
      const btn = el(
        'button',
        {
          type: 'button',
          class: `fq-key${selected === c ? ' is-selected' : ''}${mapped ? ' is-mapped' : ''}`,
          'aria-pressed': selected === c ? 'true' : 'false',
          'aria-label': `Cipher symbol ${c.toUpperCase()}, ${pct.toFixed(1)} percent of this message${
            mapped ? `, currently guessed as ${mapped.toUpperCase()}` : ''
          }`,
        },
        el('span', {
          class: 'fq-bar',
          style: `height:${Math.max(3, (pct / maxObserved) * 34)}px`,
          'aria-hidden': 'true',
        }),
        el('span', { class: 'fq-letter', 'aria-hidden': 'true' }, c.toUpperCase()),
        el('span', { class: 'fq-mapped', 'aria-hidden': 'true' }, mapped ? mapped : '·'),
      );
      btn.addEventListener('click', () => {
        selected = selected === c ? null : c;
        update();
      });
      cipherStrip.append(btn);
    }

    const maxEnglish = ENGLISH_FREQ['e'] ?? 12.7;
    const used = new Set(Object.values(guesses));
    plainStrip.textContent = '';
    for (const p of ENGLISH_ORDER) {
      const pct = ENGLISH_FREQ[p] ?? 0;
      const btn = el(
        'button',
        {
          type: 'button',
          class: `fq-key fq-key-plain${used.has(p) ? ' is-used' : ''}`,
          disabled: selected === null,
          'aria-label': `English letter ${p.toUpperCase()}, typically ${pct.toFixed(1)} percent${
            used.has(p) ? ', already used in a guess' : ''
          }`,
        },
        el('span', {
          class: 'fq-bar',
          style: `height:${Math.max(3, (pct / maxEnglish) * 34)}px`,
          'aria-hidden': 'true',
        }),
        el('span', { class: 'fq-letter', 'aria-hidden': 'true' }, p),
      );
      btn.addEventListener('click', () => {
        if (selected === null) return;
        // Reassign: remove this plaintext letter from any other cipher symbol.
        for (const [c, g] of Object.entries(guesses)) {
          if (g === p) delete guesses[c];
        }
        guesses[selected] = p;
        selected = null;
        update();
      });
      plainStrip.append(btn);
    }
  }

  function renderStatus(): void {
    const s = progress(ciphertext, key, guesses);
    const guessed = Object.keys(guesses).length;
    if (s.solved) {
      status.textContent =
        'Broken. You never tried a single key — you listened to the language, exactly as al-Kindī described eleven centuries ago.';
      host.classList.add('fq-solved');
    } else {
      host.classList.remove('fq-solved');
      status.textContent =
        guessed === 0
          ? 'No guesses yet. Start with the tallest bar — in English prose the most common letter is usually E.'
          : `${guessed} substitution${guessed === 1 ? '' : 's'} guessed · ${Math.round(s.readable * 100)}% of the message currently reads correctly.`;
    }
    if (selected && guesses[selected]) {
      unmapBtn.hidden = false;
      unmapBtn.textContent = `Remove ${selected.toUpperCase()} → ${guesses[selected]}`;
    } else {
      unmapBtn.hidden = true;
    }
  }

  function update(): void {
    renderText();
    renderStrips();
    renderStatus();
  }

  // — controls —
  hintBtn.addEventListener('click', () => {
    const hint = nextHint(ciphertext, key, guesses);
    if (!hint) return;
    for (const [c, g] of Object.entries(guesses)) {
      if (g === hint.plain && c !== hint.cipher) delete guesses[c];
    }
    guesses[hint.cipher] = hint.plain;
    selected = null;
    update();
  });

  clearBtn.addEventListener('click', () => {
    guesses = {};
    selected = null;
    update();
  });

  newBtn.addEventListener('click', () => {
    seedCounter += 1;
    rng = mulberry32(seedCounter);
    passageIndex = (passageIndex + 1) % PASSAGES.length;
    key = shuffleKey(rng);
    ciphertext = encrypt(PASSAGES[passageIndex]!, key);
    guesses = {};
    selected = null;
    update();
  });

  update();
}
