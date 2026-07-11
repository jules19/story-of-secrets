import './tls.css';
import { el } from '../../core/dom';
import { TLS_STEPS, goto, next, prev, type TlsState } from './logic';

export function mount(host: HTMLElement): void {
  let state: TlsState = { step: 0 };

  const dots = el('div', { class: 'tl-dots', role: 'tablist', 'aria-label': 'Handshake stages' });
  const dotButtons = TLS_STEPS.map((s, i) => {
    const b = el(
      'button',
      {
        class: 'tl-dot',
        type: 'button',
        role: 'tab',
        'aria-label': `Stage ${i + 1}: ${s.title}`,
        'aria-selected': 'false',
      },
      String(i + 1),
    );
    b.addEventListener('click', () => {
      state = goto(state, i);
      render();
    });
    dots.append(b);
    return b;
  });

  const stageTitle = el('h4', { class: 'tl-title' });
  const roleTag = el('span', { class: 'tl-role' });

  const wire = el(
    'div',
    { class: 'tl-wire', 'aria-hidden': 'true' },
    el('span', { class: 'tl-endpoint' }, 'your phone'),
    el('span', { class: 'tl-line' }),
    el('span', { class: 'tl-endpoint' }, 'bank.example'),
  );
  const messages = el('ul', { class: 'tl-messages' });
  const explain = el('p', { class: 'tl-explain' });

  const withoutToggle = el(
    'button',
    { class: 'x-btn', type: 'button', 'aria-expanded': 'false' },
    'What breaks without this?',
  );
  const withoutPanel = el('div', { class: 'tl-without', hidden: true });
  const withoutTitle = el('h5', {});
  const withoutText = el('p', {});
  withoutPanel.append(withoutTitle, withoutText);

  const prevBtn = el('button', { class: 'x-btn', type: 'button' }, '← Back');
  const nextBtn = el('button', { class: 'x-btn is-primary', type: 'button' }, 'Continue →');

  host.append(
    el(
      'p',
      { class: 'x-caption' },
      'Follow one tap on a banking app through the TLS handshake — and see how three different kinds of cryptography divide the work. At each stage, ask what would break without it.',
    ),
    dots,
    el('div', { class: 'tl-head' }, stageTitle, roleTag),
    wire,
    messages,
    explain,
    el('div', { class: 'x-controls tl-nav' }, prevBtn, withoutToggle, nextBtn),
    withoutPanel,
  );

  function render(): void {
    const step = TLS_STEPS[state.step]!;
    dotButtons.forEach((b, i) => {
      b.classList.toggle('is-current', i === state.step);
      b.classList.toggle('is-done', i < state.step);
      b.setAttribute('aria-selected', String(i === state.step));
    });
    stageTitle.textContent = `${state.step + 1}. ${step.title}`;
    const roleLabel: Record<string, string> = {
      setup: 'setup',
      authentication: 'job 1 · authentication',
      'key-establishment': 'job 2 · key establishment',
      'bulk-encryption': 'job 3 · bulk encryption',
      done: 'all three jobs done',
    };
    roleTag.textContent = roleLabel[step.role] ?? '';

    messages.textContent = '';
    step.messages.forEach((m, i) => {
      const arrow =
        m.from === 'client' ? '⟶' : m.from === 'server' ? '⟵' : m.from === 'both' ? '⇄' : '·';
      const li = el(
        'li',
        { class: `tl-msg tl-msg-${m.from}`, style: `--i:${i}` },
        el('span', { class: 'tl-arrow', 'aria-hidden': 'true' }, arrow),
        el('span', {}, m.text),
      );
      messages.append(li);
    });

    explain.textContent = step.explain;
    withoutTitle.textContent = step.withoutTitle;
    withoutText.textContent = step.without;
    withoutPanel.hidden = true;
    withoutToggle.setAttribute('aria-expanded', 'false');
    withoutToggle.textContent =
      step.id === 'done' ? 'A closing thought' : 'What breaks without this?';

    prevBtn.disabled = state.step === 0;
    nextBtn.disabled = state.step === TLS_STEPS.length - 1;
  }

  prevBtn.addEventListener('click', () => {
    state = prev(state);
    render();
  });
  nextBtn.addEventListener('click', () => {
    state = next(state);
    render();
  });
  withoutToggle.addEventListener('click', () => {
    const show = withoutPanel.hidden;
    withoutPanel.hidden = !show;
    withoutToggle.setAttribute('aria-expanded', String(show));
  });

  render();
}
