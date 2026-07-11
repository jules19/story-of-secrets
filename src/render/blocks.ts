import type { Block, Chapter, FactStatus } from '../content/types';
import { esc } from '../core/dom';
import type { CiteIndex } from './cite';

const FACT_LABEL: Record<FactStatus, string> = {
  record: 'historical record',
  estimate: 'estimate · disputed',
  analogy: 'educational analogy',
  mystery: 'unresolved',
};

export function factChip(status: FactStatus): string {
  return `<span class="fact fact-${status}">${FACT_LABEL[status]}</span>`;
}

export interface RenderCtx {
  cites: CiteIndex;
  exhibitCount: number;
}

/**
 * Chapter copy is trusted, authored-in-repo content; paragraphs may contain
 * inline markup (em, strong, a). Dynamic/visitor data never flows through here.
 */
export function renderBlock(block: Block, ctx: RenderCtx, isFirst: boolean): string {
  switch (block.kind) {
    case 'p':
      return `<p class="${isFirst ? 'p-first ' : ''}reveal">${block.html}${ctx.cites.refs(block.sources)}</p>`;

    case 'pull':
      return `<p class="pull reveal">${block.html}</p>`;

    case 'aside': {
      const chip = block.status ? ` ${factChip(block.status)}` : '';
      const paragraphs = block.paragraphs
        .map((p, i, arr) => {
          const refs = i === arr.length - 1 ? ctx.cites.refs(block.sources) : '';
          return `<p>${p}${refs}</p>`;
        })
        .join('');
      return `<aside class="aside-card reveal"><h4>${esc(block.title)}${chip}</h4>${paragraphs}</aside>`;
    }

    case 'deeper': {
      const paragraphs = block.paragraphs
        .map((p, i, arr) => {
          const refs = i === arr.length - 1 ? ctx.cites.refs(block.sources) : '';
          return `<p>${p}${refs}</p>`;
        })
        .join('');
      return `<details class="deeper reveal"><summary><span class="deeper-label">Go deeper</span> ${esc(
        block.title,
      )}</summary><div class="deeper-body">${paragraphs}</div></details>`;
    }

    case 'exhibit': {
      ctx.exhibitCount += 1;
      const n = ctx.exhibitCount;
      const note = block.note ? `<p class="exhibit-note">${esc(block.note)}</p>` : '';
      return `<section class="exhibit breakout reveal" data-exhibit="${block.id}" aria-labelledby="ex-${block.id}-title">
  <header class="exhibit-head">
    <span class="exhibit-tag">Exhibit ${n} · interactive</span>
    <h3 id="ex-${block.id}-title">${esc(block.title)}</h3>
    <p class="exhibit-teaches">${esc(block.teaches)}</p>
  </header>
  <div class="exhibit-body" data-exhibit-mount>
    <p class="exhibit-fallback">${esc(block.fallback)}</p>
  </div>
  ${note}
</section>`;
    }

    case 'timeline': {
      const events = block.events
        .map(
          (e) =>
            `<div class="timeline-event"><span class="timeline-year">${esc(e.year)}</span><p class="timeline-text">${e.text}</p></div>`,
        )
        .join('');
      return `<div class="timeline breakout reveal" role="list" aria-label="Timeline of events"><div class="timeline-track">${events}</div></div><p class="timeline-hint" aria-hidden="true">swipe the timeline →</p>`;
    }
  }
}

export function renderChapter(chapter: Chapter, ctx: RenderCtx): string {
  let firstParagraphSeen = false;
  const body = chapter.blocks
    .map((block) => {
      const isFirst = block.kind === 'p' && !firstParagraphSeen;
      if (isFirst) firstParagraphSeen = true;
      return renderBlock(block, ctx, isFirst);
    })
    .join('\n');

  const number = chapter.number
    ? `<span class="ch-number" aria-hidden="true">· ${esc(chapter.number)} ·</span>`
    : '';

  return `<section class="chapter" id="${esc(chapter.id)}" data-era="${chapter.era}" aria-labelledby="${esc(chapter.id)}-title" data-chapter-title="${esc(chapter.title)}">
  <header class="chapter-head reveal">
    <p class="kicker">${esc(chapter.kicker)}</p>
    ${number}
    <h2 id="${esc(chapter.id)}-title">${esc(chapter.title)}</h2>
    <p class="lede">${chapter.lede}</p>
  </header>
  <div class="chapter-body">
${body}
  </div>
</section>`;
}
