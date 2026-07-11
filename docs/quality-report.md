# Quality report — The History of Secrets

Date: 2026-07-11. This report records what was built, how it was verified, and what was
improved during self-review.

## What was built

A single-page, museum-style interactive history of cryptography: prologue (animated
intercepted-line opening), twelve chapters, epilogue with a 21-event grand timeline, an
in-page bibliography ("Sources & method"), and eight interactive exhibits. Static site;
no runtime dependencies; full narrative prerendered into the HTML at build time.

### Stories implemented (all with in-page citations)

1. Early ciphers: steganography vs cryptography, Caesar (per Suetonius), the skytale
   flagged as probably mythical (Kelly 1998).
2. Al-Kindī and the invention of frequency analysis (Al-Kadi 1992).
3. Mary, Queen of Scots: the Babington plot, Walsingham/Phelippes, the forged postscript,
   and the 2023 Lasry–Biermann–Tomokiyo decryptions; the "trusted cipher" lesson.
4. Nomenclators and the 400-year code/cipher coexistence; the Rossignols and the Great
   Cipher; Bazeries.
5. The Black Chambers (Vienna's Geheime Kabinettskanzlei; 1844/1848 closures) and the
   origin of the who-may-hold-keys politics.
6. Unresolved ciphers, evidence separated from myth: Voynich (dated vellum, undeciphered),
   Beale (probable hoax), Kryptos K4 (unsolved).
7. Kerckhoffs 1883 and the principle; Shannon's "the enemy knows the system".
8. Enigma; the Polish break (Rejewski 1932, Pyry 1939) before Bletchley; operational and
   human failures as the real door-opener; Hinsley's war-shortening claim labelled as an
   estimate.
9. Elizebeth and William Friedman (rum-runners, South-American networks, PURPLE, index of
   coincidence).
10. Vernam/Mauborgne one-time pad (credit dispute noted); Shannon's perfect-secrecy proof
    and its cost; VENONA and duplicated pads.
11. GCHQ's classified discovery of public-key cryptography (Ellis, Cocks, Williamson) and
    the public Diffie–Hellman–Merkle / RSA breakthrough; what publication changed.
12. DES: NSA involvement, 56-bit controversy, differential-cryptanalysis backstory
    (Coppersmith 1994), EFF Deep Crack.
13. Crypto Wars: export controls, PGP and the Zimmermann investigation, MIT Press source
    book, Bernstein (with the withdrawn-opinion nuance), Clipper/LEAF (Blaze 1994),
    January 2000 relaxation; AES open competition as the secret→public resolution.
14. TLS: three cryptographic jobs, CA trust and DigiNotar, Let's Encrypt and the
    encrypted-by-default web.
15. Side channels: Kocher timing (1996), DPA (1999), TEMPEST/van Eck, Spectre/Meltdown.
16. Dual_EC_DRBG: Shumow–Ferguson 2007, the 2013 reporting (Reuters $10M figure explicitly
    flagged as _reported_), NIST withdrawal 2014.
17. Ransomware: AIDS Trojan 1989, Young–Yung cryptovirology, CryptoLocker, WannaCry
    (attribution per US/UK statements).
18. Quantum era: Shor, Grover, harvest-now-decrypt-later (NSA CNSA 2.0 rationale), NIST
    PQC competition and the August 2024 standards, the SIKE break as public-scrutiny
    parable, hybrid deployment.

### Interactive exhibits (8)

| #   | Exhibit                                          | Teaches                                                    | Tested logic                                      |
| --- | ------------------------------------------------ | ---------------------------------------------------------- | ------------------------------------------------- |
| 1   | Break a cipher with your own hands               | frequency analysis beats 26! keys                          | 13 tests                                          |
| 2   | A substitution that never sits still             | rotor stepping defeats frequency analysis; frozen = broken | 10 tests (incl. reciprocity, historical wirings)  |
| 3   | Perfect secrecy, and one fatal shortcut          | OTP perfection; key reuse cancels the key (VENONA)         | 6 tests                                           |
| 4   | Agreeing on a secret in front of an eavesdropper | Diffie–Hellman (analogy labelled; real mod-arithmetic)     | 7 tests (incl. exhaustive shared-secret equality) |
| 5   | Every bit doubles the search                     | key size × compute × time                                  | 7 tests                                           |
| 6   | One tap, three kinds of cryptography             | TLS: authentication / key establishment / bulk encryption  | 3 tests                                           |
| 7   | Reading a secret from a clock                    | timing side channel; averaging; constant-time fix          | 5 tests                                           |
| 8   | Ciphertext is forever                            | harvest-now-decrypt-later; Mosca inequality; hybrid PQC    | 8 tests                                           |

59 unit tests, all passing. Interaction of every exhibit additionally exercised end-to-end
in headless Chromium (mobile emulation, touch) via `scripts/verify.mjs`.

## Sources

Bibliography of 45 works rendered in-page with numbered citations; claim-by-claim audit in
`research/sources.md`. Principal works: Kahn (1996), Singh (1999), Rejewski (1981),
Kozaczuk (1984), Fagone (2017), Shannon (1949), Kerckhoffs (1883), the NSA/CIA VENONA
volume (1996), Levy (2001), primary standards (FIPS 46/197/203-205, RFC 2246/8446), and
the primary papers for DH, RSA, Merkle, Kocher, Blaze, Shumow–Ferguson, Shor, Grover,
Castryck–Decru. Epistemic labels (record / estimate / analogy / mystery) appear in-page and
are explained in the Sources & method section.

## Commands run and results

- `npm run check` (Prettier check + 59 Vitest tests + strict `tsc` + production build +
  prerender): **passing**.
- `npm run screenshots` (production build in headless Chromium at 360, 390, 430, 768,
  1440 px, touch emulation for mobile widths, `reducedMotion: reduce`): **no horizontal
  overflow, zero console errors at every width**; screenshots reviewed.
- `scripts/verify.mjs` (mobile-emulated end-to-end): all internal anchors resolve; contents
  panel opens/closes (incl. Escape); all 8 exhibits hydrate and operate by touch (the
  side-channel attack was driven to a full PIN recovery; TLS walked to the final stage;
  frequency attack progressed via hint + manual mapping): **zero page/console errors**.
- Motion pass (animation enabled, desktop): prologue cipher line resolves exactly to the
  plaintext; first Tab focuses the skip link.

## Self-review: weakest aspects found and fixed

1. **Mobile layout blow-up (critical).** The frequency exhibit's 26-button strips forced
   the exhibit's min-content width to ~1240 px, silently expanding the mobile layout
   viewport to ~1074 px. Fixed with `min-width: 0` on chapter-body children and an explicit
   breakout-width pattern for wide blocks; regression now guarded by the harness's
   overflow check.
2. **Prologue collisions.** The scroll cue overlapped the actions row on short screens, and
   the decipher animation wrapped mid-word (stranding punctuation). Fixed: cue moved into
   flow; animation now wraps at word boundaries.
3. **Keyboard focus loss in the frequency exhibit.** Letter strips are rebuilt on every
   interaction, dumping keyboard focus to `<body>`. Fixed with focus restoration keyed by
   button identity.
4. **Factual UI inconsistency in the OTP exhibit.** In reuse mode, Ciphertext B's caption
   still read "B ⊕ Key 2". Fixed (now "B ⊕ Key 1 — the reuse").
5. **Readability details.** Citation superscripts rendered in first-use order (e.g. "5 2 1")
   — now sorted ascending; rotor diagram column labels were illegible at 360 px — enlarged;
   strip scrollability made discoverable (swipe hints) on mobile and eliminated on desktop
   (compact keys); truncated topbar chapter label hidden on narrow screens; harvest
   timeline's left label no longer clips.

## Known limitations

- The exhibits are deliberately simplified teaching instruments (each states its
  simplifications in-frame): no plugboard/ring settings in the rotor demo, toy DH group
  (p = 23), simulated side-channel timings, scenario-based (not predictive) quantum slider.
- Attacker speeds in the brute-force exhibit are order-of-magnitude illustrations (the
  Deep Crack figure is historical; the rest are labelled illustrative).
- Single-page architecture: chapter deep-links are `#fragment` anchors, not routed URLs.
- System font stacks (no webfonts) — typography varies slightly by platform by design
  (zero external requests, fast mobile loads).
- Verified in Chromium (desktop + Android-style mobile emulation with touch). iOS Safari
  was not available in this environment; CSS used is broadly supported (one notable
  dependency: `color-mix()`, supported in Safari 16.2+).

## How to re-verify

```bash
npm install
npm run check          # format + tests + typecheck + production build + prerender
npm run screenshots    # requires the build; writes screenshots/ and asserts overflow/console
node scripts/verify.mjs  # end-to-end interaction sweep against the production build
```
