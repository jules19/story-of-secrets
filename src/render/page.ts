import { CHAPTERS } from '../content/chapters';
import { SOURCES } from '../content/sources';
import { esc } from '../core/dom';
import { CiteIndex } from './cite';
import { renderChapter, factChip, type RenderCtx } from './blocks';

export const PROLOGUE_PLAINTEXT =
  'The Queen trusted her cipher. Her enemies could read every word.';

function renderPrologue(): string {
  return `<section class="prologue" id="prologue" data-era="court" aria-label="Prologue">
  <p class="kicker">England · 1586</p>
  <p class="decipher" data-decipher="${esc(PROLOGUE_PLAINTEXT)}" aria-label="${esc(PROLOGUE_PLAINTEXT)}"><span class="glyph is-plain">${esc(PROLOGUE_PLAINTEXT)}</span></p>
  <p class="prologue-attrib">Mary, Queen of Scots, wrote to her conspirators in cipher.
    Every letter passed through the hands of the spymaster she feared most —
    deciphered, copied, and sent on as if untouched. Within a year the cipher
    had helped to kill her.</p>
  <p class="prologue-intro">This is a history of cryptography — four thousand years of
    making secrets, and of the quieter art that unmakes them. It is a story about mathematics,
    war, love letters, betrayed standards, and the strange fact that the whole modern world now
    runs on ciphers almost nobody can see.</p>
  <div class="prologue-actions">
    <a class="begin-link" href="#ch-breakers">Begin the story</a>
    <span class="prologue-minutes">A guided read of about 20 minutes — with rooms to linger in</span>
  </div>
  <p class="scroll-cue" aria-hidden="true">scroll</p>
</section>`;
}

function renderShellTop(): string {
  const items = CHAPTERS.map((c) => {
    const num = c.number ?? '·';
    return `<li><a href="#${esc(c.id)}" data-era="${c.era}"><span class="toc-num">${esc(num)}</span><span class="toc-chapter-title">${esc(c.title)}</span><span class="toc-kicker">${esc(c.kicker)}</span></a></li>`;
  }).join('');

  const rail = CHAPTERS.filter((c) => c.number)
    .map(
      (c) =>
        `<a href="#${esc(c.id)}" data-target="${esc(c.id)}" title="${esc(c.title)}">${esc(c.number ?? '')}</a>`,
    )
    .join('');

  return `<a class="skip-link" href="#main">Skip to the story</a>
<div class="progress-line" data-progress aria-hidden="true"></div>
<header class="topbar" data-topbar>
  <a class="wordmark" href="#prologue">The History of <strong>Secrets</strong></a>
  <p class="topbar-now" data-now aria-live="off"></p>
  <button class="toc-button" type="button" data-toc-open aria-haspopup="dialog" aria-expanded="false">Contents</button>
</header>
<div class="toc" data-toc role="dialog" aria-modal="true" aria-label="Table of contents" hidden>
  <button class="toc-close" type="button" data-toc-close aria-label="Close contents">×</button>
  <div class="toc-inner">
    <p class="toc-title">The History of Secrets — contents</p>
    <ul class="toc-list">
      <li><a href="#prologue"><span class="toc-num">◆</span><span class="toc-chapter-title">Prologue</span><span class="toc-kicker">England · 1586</span></a></li>
      ${items}
      <li><a href="#sources"><span class="toc-num">§</span><span class="toc-chapter-title">Sources &amp; method</span><span class="toc-kicker"></span></a></li>
    </ul>
  </div>
</div>
<nav class="rail" data-rail aria-label="Chapters">${rail}</nav>`;
}

function renderSources(cites: CiteIndex): string {
  const entries = cites
    .entries()
    .map(({ id, num }) => {
      const s = SOURCES[id];
      if (!s) throw new Error(`Unknown source id: ${id}`);
      const link = s.href ? ` <a href="${esc(s.href)}" rel="noopener">link</a>` : '';
      return `<li id="src-${esc(id)}"><span class="source-num">${num}</span><span><span class="source-label">${esc(s.label)}.</span> ${esc(s.detail)}${link}</span></li>`;
    })
    .join('');

  return `<section class="sources-section chapter" id="sources" data-era="manuscript" aria-labelledby="sources-title">
  <div class="inner">
    <h2 id="sources-title">Sources &amp; method</h2>
    <p class="sources-intro">Every substantive historical claim on this site is traceable to the
      works below; a claim-by-claim audit lives in the project’s research file. Throughout the
      story, claims are labelled by epistemic status:
      ${factChip('record')} well-documented history ·
      ${factChip('estimate')} a serious scholarly estimate or contested interpretation ·
      ${factChip('analogy')} a deliberate teaching simplification ·
      ${factChip('mystery')} genuinely unresolved. No quotations, dates, or causal claims are invented;
      where credit is disputed, the dispute is stated.</p>
    <ol class="source-list">${entries}</ol>
  </div>
</section>`;
}

function renderFooter(): string {
  return `<footer class="site-footer">
  <div class="inner">
    <p>The History of Secrets — an interactive history of cryptography, built as a small digital
      museum. Written and illustrated as original work; no stock imagery.</p>
    <p>The interactive exhibits are simplified teaching instruments, and say so where they
      simplify. They are not faithful simulators, and nothing here is security advice.</p>
    <p>Typeset in your system’s own serif and monospace faces. No trackers, no cookies, no
      external requests.</p>
  </div>
</footer>`;
}

/** Render the entire page body (used at runtime and by the build-time prerender). */
export function renderSite(): string {
  const ctx: RenderCtx = { cites: new CiteIndex(), exhibitCount: 0 };
  const chapters = CHAPTERS.map((c) => renderChapter(c, ctx)).join('\n');
  return `${renderShellTop()}
<main id="main">
${renderPrologue()}
${chapters}
${renderSources(ctx.cites)}
</main>
${renderFooter()}`;
}
