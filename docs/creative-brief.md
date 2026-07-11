# Creative brief — The History of Secrets

## What this is

An interactive, single-page digital-museum experience telling the history of cryptography as a
human story: a four-thousand-year contest between people who make secrets and people who break
them. It is closer to a premium editorial feature or an exhibition hall than a reference site.

## The core argument

Cryptography is not a story about mathematics acquiring armour. It is a story about **trust
changing hands** — from the messenger you could bribe, to the monarch's cipher secretary, to
machines, to public mathematics, to institutions and standards bodies, to hardware, and now to
distributed systems and lattice problems no one can quite picture. At every hand-off, someone
believed they were safe and someone else was already reading their mail.

## Recurring threads (woven through every chapter)

1. **The contest** — every cipher summons its own codebreaker.
2. **The evolution of trust** — messenger → monarch → machine → mathematics → institution →
   hardware → distributed systems.
3. **Theory vs. deployment** — the perfect cipher exists and is almost never used; the deployed
   cipher is imperfect and runs the world.
4. **The human flaw** — key reuse, lazy operators, stolen documents, misplaced confidence.
   Cryptosystems rarely fall to mathematics alone.
5. **The politics of secrecy** — who is _allowed_ strong cryptography has been contested from the
   Black Chambers to the Crypto Wars to today.
6. **Secret → public** — the shift from secret algorithms to publicly scrutinised ones is the
   field's central philosophical event (Kerckhoffs → DES grumbling → AES competition).

## Tone

Serious, warm, specific. Museum-label register: short declarative sentences carrying real facts,
not breathless "amazing hidden history!" copy. We name our uncertainty: every claim is either
**historical record**, **disputed / estimate**, **simplified analogy**, or **unresolved mystery**,
and the interface labels which.

## The opening

No title-then-wall-of-text. The visitor lands inside an intercepted ciphertext — a real fragment
of the story of Mary, Queen of Scots — which resolves into plaintext as they begin. The first
thing the site does is _show_ that a broken cipher can kill, before it explains anything.

## Structure

A guided scroll narrative of a prologue + 12 chapters + epilogue, readable in 15–20 minutes.
Optional depth lives in "Go deeper" panels, source notes, and the exhibits themselves. Eight
interactive exhibits are embedded where they teach the chapter's specific idea — never as
decoration.

## Visual direction

One coherent system that ages as the story does: a paper-and-ink world whose accent hue and
texture shift subtly per era (manuscript ochre → engraving sepia → machine-age steel blue →
information-age signal green-cyan → quantum violet), on a constant deep-ink ground with a single
editorial type system. Serif for narrative, monospace for anything that is _material_ (ciphertext,
keys, frequencies). Motion is cinematic but restrained: slow reveals, resolving letters, layered
SVG diagrams. Forbidden: hooded figures, glowing padlocks, matrix rain, neon circuit boards,
stock photography.

## Non-negotiables

- Mobile-first from 360 px; every exhibit operable by touch, portrait-first.
- Keyboard navigation, visible focus, reduced-motion mode that preserves the whole narrative.
- No invented quotes, dates, or causal claims; sources traceable in `research/sources.md` and
  surfaced in-page.
- Progressive enhancement: the full story reads with JavaScript disabled; exhibits enhance it.
