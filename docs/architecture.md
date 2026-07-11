# Architecture — The History of Secrets

## Stack

- **Vite + TypeScript, no UI framework.** The site is a content-driven long-form narrative with
  eight bespoke interactive exhibits. A framework would add weight without helping; instead we
  use a small typed component convention (`(host: HTMLElement) => void` mount functions) and
  data-driven rendering from typed content modules.
- **Vitest** for unit tests of exhibit logic (all exhibit logic lives in pure modules,
  separate from DOM code).
- **Prettier** for formatting, `tsc --noEmit` for type checking.
- **Playwright** (dev-only) for screenshot capture and console-error smoke checks against the
  production build.

## Source layout

```
src/
  main.ts               entry: renders shell, chapters, mounts exhibits lazily
  styles/               design tokens, typography, layout, components, exhibits
  core/
    dom.ts              el() hyperscript helper, svg() helper
    motion.ts           reduced-motion query, IntersectionObserver reveal helper
    format.ts           shared formatting (numbers, durations)
  content/
    types.ts            Chapter/Block/Source types
    sources.ts          bibliography (id → citation), rendered in Sources section
    chapters/*.ts       one module per chapter: copy, blocks, exhibit slots, sources
  components/
    shell.ts            header, progress nav, table of contents, footer
    chapter.ts          renders a Chapter (prose, asides, fact labels, citations)
    prologue.ts         opening sequence
    timeline.ts         era timeline strip
    facts.ts            fact-status label component (record/estimate/analogy/mystery)
  exhibits/
    <name>/logic.ts     pure, tested logic
    <name>/index.ts     DOM + interaction (mount function)
tests/                  Vitest specs for each exhibit's logic
scripts/screenshots.mjs Playwright screenshot + console check harness
research/sources.md     claim-by-claim source audit
docs/                   creative brief, this file, quality report
```

## Rendering model

The site is a single HTML page composed at startup from typed content modules. Chapter prose is
authored as typed blocks (`p`, `pull`, `aside`, `deeper`, `figure`, `exhibit`) so that stories,
citations, fact labels and "go deeper" panels are consistent components rather than ad-hoc HTML.
Exhibits are mounted lazily via `IntersectionObserver` when they approach the viewport.

Content is static and versioned in the repo; there is no server component. `vite build` emits a
fully static site deployable to any static host.

## Accessibility & motion

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), one `h1`, ordered headings.
- All exhibit controls are native buttons/inputs/selects with labels; custom widgets get ARIA
  roles and keyboard handlers; focus is always visible.
- `prefers-reduced-motion` disables scroll-reveal animation, the prologue's letter-resolve
  animation (replaced by a static crossfade) and all continuous animation, without removing
  content or meaning.
- Touch targets ≥ 44px; no hover-only affordances (hover states duplicate focus/active states).

## Theming across eras

One design system, one type stack. Each chapter section carries a `data-era` attribute; CSS
custom properties (`--era-accent`, `--era-accent-soft`) shift the accent hue and rule colours
per era. Background stays a constant deep-ink ground so the site reads as one object.

## Performance

No runtime dependencies; system font stacks (no webfont downloads); SVG/Canvas only (no WebGL);
exhibits are code-split by dynamic `import()` and mounted on approach. Target: main bundle small
enough for mid-range mobile on throttled networks.
