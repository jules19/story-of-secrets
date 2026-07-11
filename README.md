# The History of Secrets

An interactive history of cryptography — four thousand years of making and breaking secrets,
told as a guided, museum-style narrative with eight hands-on exhibits. From al-Kindī's
frequency analysis and the cipher that helped kill Mary, Queen of Scots, to VENONA, the
Crypto Wars, side-channel attacks, and the post-quantum migration.

The main story reads in about 20 minutes; "Go deeper" panels, source notes and the exhibits
reward longer visits. Every historical claim is traceable (see
[`research/sources.md`](research/sources.md)) and labelled in-page by epistemic status:
historical record, estimate/disputed, educational analogy, or unresolved mystery.

## Quick start

Requires Node 20+.

```bash
npm install
npm run dev        # development server (http://localhost:5173)
```

## Commands

| Command               | What it does                                                                                             |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| `npm run dev`         | Vite dev server with hot reload                                                                          |
| `npm run build`       | Type-check, production build, then bake prerendered HTML into `dist/`                                    |
| `npm run preview`     | Serve the production build locally                                                                       |
| `npm test`            | Vitest unit tests for all exhibit logic                                                                  |
| `npm run typecheck`   | `tsc --noEmit` (strict)                                                                                  |
| `npm run format`      | Prettier write                                                                                           |
| `npm run check`       | Format check + tests + production build (CI-style gate)                                                  |
| `npm run screenshots` | Build must exist; captures mobile/desktop screenshots and fails on console errors or horizontal overflow |

## Deployment

`npm run build` produces a fully static site in `dist/` (relative asset paths, no server
component, no external requests). Deploy the `dist/` directory to any static host — GitHub
Pages, Netlify, Cloudflare Pages, or a plain file server.

The build post-processes `dist/index.html` with `scripts/prerender.mjs`, baking the entire
narrative into the HTML: the story is readable without JavaScript, paints immediately, and the
interactive exhibits hydrate lazily as they approach the viewport.

## Architecture

Vite + TypeScript, **no runtime dependencies and no UI framework**. Content is authored as
typed data modules and rendered to HTML strings shared by the client and the build-time
prerenderer. Each exhibit is a pure, unit-tested logic module plus a DOM mount function,
code-split and loaded on approach. See [`docs/architecture.md`](docs/architecture.md) for the
full source layout, and [`docs/creative-brief.md`](docs/creative-brief.md) for the design
rationale.

```
src/
  content/chapters/   one typed module per chapter (copy, asides, citations, exhibit slots)
  content/sources.ts  bibliography (rendered as the in-page "Sources & method" section)
  render/             HTML-string renderers (chapters, citations, shell, prologue)
  exhibits/<name>/    logic.ts (pure, tested) + index.ts (DOM) + css
  components/         shell (nav/progress/contents), prologue animation
  core/               DOM helpers, motion/reduced-motion utilities, formatters
  styles/             design tokens, base, shell, chapter, exhibit styles
tests/                Vitest specs for every exhibit's logic
research/sources.md   claim-by-claim source audit
docs/                 creative brief, architecture, quality report
```

## Accessibility & mobile

Designed mobile-first from 360 px. Semantic landmarks and heading order; all controls are
native elements with labels and ≥44 px touch targets; keyboard navigable with visible focus;
`prefers-reduced-motion` disables all animation (including the opening sequence) without losing
content; no hover-dependent interactions; horizontal scrolling only inside intentionally
scrollable strips. The screenshot harness asserts no page-level horizontal overflow and no
console errors at 360/390/430/768/1440 px.

## Content integrity

- No invented quotations, dates, or causal claims; war-impact claims appear only as attributed
  estimates.
- Exhibits state their simplifications in-frame (e.g. the rotor machine has no plugboard; the
  Diffie–Hellman demo uses p = 23 so you can check the arithmetic by hand).
- The bibliography is data ([`src/content/sources.ts`](src/content/sources.ts)); citations are
  superscript links resolved at render time, and unknown source ids fail the build.
