# Research file — sources and claim audit

This file records the sources behind every substantive historical claim on the site, and the
epistemic status we assign each claim. Status categories used across the site:

- **record** — established historical fact, well documented in primary or authoritative
  secondary sources.
- **estimate** — a serious scholarly estimate or a disputed interpretation; presented with
  attribution, never as bare fact.
- **analogy** — a deliberate educational simplification; the site says so where it is used.
- **mystery** — genuinely unresolved; the site separates evidence from mythology.

General secondary sources used throughout:

- KAHN — David Kahn, *The Codebreakers: The Story of Secret Writing* (Macmillan 1967; rev. ed.
  Scribner 1996). The standard scholarly history of cryptology to the mid-20th century.
- SINGH — Simon Singh, *The Code Book* (Fourth Estate, 1999). Reliable popular synthesis;
  used for narrative shape, cross-checked against Kahn and primary material for specifics.

---

## Prologue & Chapter: Mary, Queen of Scots

- Mary was tried and executed (8 February 1587) after the Babington Plot correspondence,
  enciphered with a nomenclator, was intercepted and read by Sir Francis Walsingham's
  organisation; Thomas Phelippes deciphered the letters and forged a postscript asking Babington
  to name the conspirators. **record** — KAHN ch. 4; SINGH ch. 1; the Babington correspondence
  is held in the UK National Archives (SP 12/193).
- The channel itself (beer-barrel courier Gilbert Gifford) was a double agent operation run by
  Walsingham, so Mary's "secure" channel was owned by her adversary from the start. **record** —
  KAHN ch. 4; SINGH ch. 1.
- In 2023 George Lasry, Norbert Biermann and Satoshi Tomokiyo announced the decryption of 57
  previously unread enciphered letters of Mary (mostly 1578–1584, found in the Bibliothèque
  nationale de France), published as "Deciphering Mary Stuart's lost letters from 1578–1584",
  *Cryptologia* 47:2 (2023). **record**.
- Framing "the most dangerous cipher is the one you believe is unbreakable" is our editorial
  synthesis of the episode, flagged as interpretation, not a quotation. **analogy/interpretation**.

## Chapter: Early ciphers and Al-Kindi

- Early substitution/transposition devices: Spartan skytale (transposition; described in later
  classical sources, e.g. Plutarch — historicity as a cryptographic device debated by modern
  scholars, per Kelly, "The Myth of the Skytale", *Cryptologia* 1998) — presented as
  **estimate/disputed**. Caesar's shifted alphabet reported by Suetonius (*Life of Julius
  Caesar* 56). **record** for the Suetonius report itself.
- Abū Yūsuf Yaʿqūb ibn ʾIsḥāq al-Kindī (c. 801–873, Baghdad) wrote *Risāla fī Istikhrāj
  al-Muʿammā* ("On Extracting Obscured Correspondence"), the earliest surviving description of
  frequency analysis; the manuscript was found in the Süleymaniye Library (Istanbul) and
  described for modern readers in Ibrahim A. Al-Kadi, "Origins of Cryptology: The Arab
  Contributions", *Cryptologia* 16:2 (1992). **record** — Al-Kadi 1992; SINGH ch. 1; KAHN ch. 3.
- Frequency analysis defeats every simple (monoalphabetic) substitution given enough text.
  **record** — standard cryptology; demonstrated live in the exhibit.
- English letter-frequency table used in the exhibit is computed from our own sample corpus and
  is consistent with published tables (e.g. Lewand, *Cryptological Mathematics*, MAA 2000).
  **record** (methodology stated in-app).

## Chapter: Nomenclators and the Black Chambers

- Nomenclators (hybrid code/cipher lists) dominated European diplomatic secrecy for ~400 years,
  roughly 15th–19th centuries. **record** — KAHN chs. 4–5.
- Antoine and Bonaventure Rossignol served the French crown; their "Great Cipher" of Louis XIV
  resisted reading until Étienne Bazeries reconstructed it in the 1890s. **record** — KAHN ch. 5;
  SINGH ch. 2.
- The Viennese Geheime Kabinettskanzlei (the Vienna Black Chamber) systematically opened,
  copied, resealed and returned diplomatic mail on an industrial schedule in the 18th century;
  other capitals ran equivalents (cabinets noirs). **record** — KAHN ch. 5.
- Black Chambers were wound down in the 19th century (e.g. Britain's Deciphering Branch closed
  1844 after the Mazzini letter-opening scandal; Austria's chamber ended 1848). **record** —
  KAHN ch. 5.

## Sidebar: Unresolved ciphers

- Voynich manuscript: ~240-page illustrated codex in an unread script, Beinecke Library, Yale,
  MS 408; radiocarbon dating of the vellum at the University of Arizona (2009) gave early 15th
  century (c. 1404–1438). No decryption has achieved scholarly acceptance; hoax vs. language vs.
  cipher remains open. **mystery** — Beinecke Library catalogue; Kennedy & Churchill, *The
  Voynich Manuscript* (2004); dating reported in Yale/Beinecke materials.
- Beale ciphers: known only from an 1885 Lynchburg pamphlet (*The Beale Papers*); paper #2
  reads out via the Declaration of Independence as a book cipher; papers #1 and #3 unsolved;
  serious analysts (including Kahn) regard the whole affair as a probable hoax; no treasure has
  ever been verified. **mystery, hoax likely** — KAHN ch. 21; the 1885 pamphlet itself.
- Kryptos (Sanborn, CIA courtyard, 1990): three of four panels solved; K4 unsolved. **mystery**
  — widely documented; CIA and Smithsonian materials.

## Chapter: Kerckhoffs

- Auguste Kerckhoffs, "La cryptographie militaire", *Journal des sciences militaires*,
  January & February 1883, states six requirements for field ciphers; the second — the system
  must not require secrecy and must be able to fall into enemy hands without inconvenience —
  is the modern "Kerckhoffs's principle". **record** — the 1883 articles (available via the
  Bibliothèque nationale / petitcolas.net transcription); KAHN ch. 6.
- Claude Shannon's restatement, "the enemy knows the system being used", appears in
  "Communication Theory of Secrecy Systems", *Bell System Technical Journal* 28:4 (1949),
  p. 662. **record** — the paper itself.

## Chapter: Machines — Enigma, the Poles, Bletchley, the Friedmans

- Commercial Enigma marketed by Arthur Scherbius from 1923; German military adoptions from
  1926 (navy) / 1928 (army) with the plugboard added for military models. **record** — KAHN
  (rev. ed.); Kozaczuk, *Enigma* (1984).
- Marian Rejewski reconstructed the military Enigma's wiring in December 1932 using permutation
  theory plus documents (operating instructions and key tables) obtained from Hans-Thilo
  Schmidt by French intelligence (Gustave Bertrand) and shared with Poland. **record** —
  Rejewski's own account, "How Polish Mathematicians Deciphered the Enigma", *Annals of the
  History of Computing* 3:3 (1981); Kozaczuk 1984.
- Rejewski, Jerzy Różycki and Henryk Zygalski built recovery methods and machines (cyclometer,
  "bomba", Zygalski sheets); Poland handed complete results, including reconstructed Enigma
  doubles, to Britain and France at the Pyry meeting near Warsaw, 25–26 July 1939. **record** —
  Rejewski 1981; Kozaczuk 1984.
- Bletchley Park (Turing, Welchman et al.) industrialised the attack (bombes, cribs); Ultra
  intelligence resulted. **record** — Hinsley & Stripp (eds.), *Codebreakers* (1993).
- Sir Harry Hinsley's estimate that Ultra shortened the European war by "not less than two
  years" is an estimate by the official historian, debated by other scholars, and is presented
  as such — not as fact. **estimate** — Hinsley, "The Influence of ULTRA in the Second World
  War" (1993 lecture; and in Hinsley & Stripp 1993).
- Operator and procedural failures (repeated message keys until 1940, cillies, re-sent messages,
  stereotyped cribs) were essential to practical breaks. **record** — Rejewski 1981; Welchman,
  *The Hut Six Story* (1982).
- Elizebeth Smith Friedman led Coast Guard cryptanalytic units, broke rum-runner networks during
  Prohibition and testified in smuggling trials; in WWII her unit broke Enigma-based and other
  traffic of German intelligence networks in South America (documented in decrypted "Operation
  Bolívar" traffic); credit long went publicly to the FBI. **record** — Jason Fagone, *The
  Woman Who Smashed Codes* (2017), which is built on her papers at the Marshall Foundation;
  NSA's declassified history of Coast Guard Unit 387.
- William F. Friedman coined "cryptanalysis", developed the index of coincidence (*The Index of
  Coincidence and Its Applications in Cryptography*, Riverbank Publication No. 22, 1922), and
  led the Army SIS team (Rowlett et al.) that reconstructed the Japanese PURPLE machine in 1940
  without ever seeing one. **record** — KAHN chs. 12, 18; NSA Cryptologic Hall of Honor
  materials.

## Chapter: The perfect cipher and VENONA

- Gilbert Vernam (AT&T) patented the XOR teletype cipher (US Patent 1,310,719, filed 1918,
  granted 1919); Joseph Mauborgne is credited with insisting the key tape be random and never
  reused, producing the one-time pad. **record** — KAHN ch. 13 (Kahn credits Mauborgne; exact
  division of credit debated — flagged where mentioned).
- Claude Shannon proved perfect secrecy is achievable (the one-time pad attains it) and that
  perfect secrecy requires key material at least as large as the message — in "Communication
  Theory of Secrecy Systems", *BSTJ* 28:4 (1949), developed in classified form in 1945.
  **record** — the paper.
- VENONA: US Army/ NSA program (begun 1943 under Gene Grabeel; Meredith Gardner's breakthroughs
  1946) read portions of Soviet diplomatic/intelligence cables because wartime Soviet pad
  production duplicated ~35,000 pad pages; duplication plus cribs made partial decryption
  possible; ~2,900 messages released publicly in 1995; identified espionage including Fuchs and
  the Rosenberg network (codename LIBERAL). **record** — NSA/CIA, *VENONA: Soviet Espionage
  and the American Response 1939–1957* (1996); Haynes & Klehr, *Venona: Decoding Soviet
  Espionage in America* (Yale, 1999). Counts (~35k duplicated pages, ~2,900 released messages)
  follow the NSA/CIA volume.
- XOR reuse demonstration (c1 ⊕ c2 = p1 ⊕ p2) is standard mathematics. **record**.

## Chapter: Public keys — discovered twice

- At GCHQ: James Ellis proposed "non-secret encryption" (1970 internal paper); Clifford Cocks
  found a practical method in 1973 (mathematically equivalent to what became RSA); Malcolm
  Williamson found the discrete-log key-agreement analogue in 1974. Kept secret until GCHQ's
  public acknowledgement on 18 December 1997 (Ellis died weeks before, November 1997).
  **record** — GCHQ's released Ellis paper "The History of Non-Secret Encryption" (1987,
  released 1997); SINGH ch. 6; Levy, *Crypto* (2001).
- Whitfield Diffie and Martin Hellman, "New Directions in Cryptography", *IEEE Transactions on
  Information Theory* 22:6 (November 1976), introduced public-key cryptography and the
  Diffie–Hellman key exchange; Ralph Merkle's "puzzles" work (conceived 1974, published as
  "Secure Communications over Insecure Channels", *CACM* 1978) independently anticipated key
  agreement; Hellman has said the scheme should be called Diffie–Hellman–Merkle. **record** —
  the 1976 paper; Merkle 1978; Levy 2001.
- RSA: Rivest, Shamir, Adleman, "A Method for Obtaining Digital Signatures and Public-Key
  Cryptosystems", *CACM* 21:2 (February 1978). **record**.
- The paint-mixing analogy for Diffie–Hellman is an educational analogy (labelled as such);
  the real system uses modular exponentiation, which our exhibit computes with small honest
  numbers. **analogy**, with the maths shown for real.

## Chapter: The Crypto Wars

- DES: developed from IBM's Lucifer; NSA involvement in design review; key reduced to 56 bits;
  published as FIPS 46 (15 January 1977) — the first public, standardised cipher, and
  criticised immediately: Diffie & Hellman, "Exhaustive Cryptanalysis of the NBS Data
  Encryption Standard", *Computer* 10:6 (1977), argued a ~$20M machine could brute-force it.
  **record** — FIPS 46; the 1977 critique.
- The S-boxes turned out to resist differential cryptanalysis (published by Biham & Shamir,
  1990); Don Coppersmith (1994, *IBM J. R&D* 38:3) confirmed IBM knew of the technique
  ("T-attack") in 1974 and had been asked to keep it quiet. **record**.
- EFF's Deep Crack (July 1998) broke a DES challenge in 56 hours for under $250,000; with
  distributed.net (January 1999) in 22 hours 15 minutes. **record** — EFF, *Cracking DES*
  (O'Reilly, 1998); EFF/RSA DES Challenge III announcements.
- US export controls treated strong cryptography as a munition (ITAR, later EAR); exportable
  products were long limited to 40-bit keys; controls were substantially relaxed in
  January 2000. **record** — Levy, *Crypto* (2001); Federal Register, Jan 14 2000 (65 FR 2492).
- Bernstein v. US DOJ: Ninth Circuit panel held source code is speech protected by the First
  Amendment (176 F.3d 1132, 1999); opinion later withdrawn for en banc review and the case
  mooted by regulation changes — presented with that nuance. **record**.
- Clipper Chip (announced April 1993): NSA-designed Skipjack with key escrow via LEAF; Matt
  Blaze, "Protocol Failure in the Escrowed Encryption Standard" (ACM CCS 1994) showed the LEAF
  checksum could be brute-forced to defeat escrow; the initiative collapsed by 1996. **record**
  — Blaze 1994; Levy 2001.
- PGP: Philip Zimmermann released PGP 1.0 in June 1991; it spread internationally on Usenet;
  a US Customs / grand jury investigation into export violation ran ~1993–96 and was dropped
  without charges (announcement by the US Attorney, N.D. Cal., 11 January 1996); MIT Press
  published the PGP 5 source code as a book (1995 for PGP 2.6.2 internals — *PGP Source Code
  and Internals*, 1995), exploiting the print/export distinction. **record** — Levy 2001;
  Zimmermann's own published account; Garfinkel, *PGP* (O'Reilly 1995).
- AES competition: NIST ran an open international competition (1997–2000, 15 candidates);
  Rijndael (Daemen & Rijmen, Belgium) selected October 2000, published as FIPS 197
  (November 2001) — the standard-setting process itself became public and adversarial.
  **record** — NIST AES archive; FIPS 197.

## Chapter: TLS and invisible cryptography

- SSL developed at Netscape (SSL 2.0 released 1995; SSL 3.0 1996); TLS 1.0 standardised as
  RFC 2246 (January 1999); TLS 1.3 as RFC 8446 (August 2018), which removed obsolete
  primitives and made forward secrecy the norm for key exchange. **record** — the RFCs.
- A TLS connection composes three distinct jobs: authentication (certificates / signatures,
  the CA system), key establishment (ephemeral Diffie–Hellman class exchanges), and bulk
  encryption with integrity (AEAD ciphers such as AES-GCM or ChaCha20-Poly1305). **record** —
  RFC 8446.
- Let's Encrypt (public launch December 2015 beta) automated free certificates; the majority of
  web page loads have been HTTPS since roughly 2017–18 per browser telemetry (Google
  Transparency Report; Let's Encrypt statistics). **record**, stated approximately.
- Certificate-authority failure example: DigiNotar (2011) — a compromised CA issued rogue
  certificates including for google.com, used against Iranian users; the CA went bankrupt.
  **record** — Fox-IT "Operation Black Tulip" report (2012).

## Chapter: Side channels and betrayed standards

- Paul Kocher, "Timing Attacks on Implementations of Diffie-Hellman, RSA, DSS, and Other
  Systems", CRYPTO '96: secret keys recovered by measuring how long private-key operations
  take. **record** — the paper.
- Kocher, Jaffe & Jun, "Differential Power Analysis", CRYPTO '99: power consumption traces leak
  key bits from smart cards. **record**.
- TEMPEST/van Eck: electromagnetic emanations reconstruct displays (van Eck, *Computers &
  Security*, 1985); NSA TEMPEST program partially declassified. **record**.
- Spectre/Meltdown (disclosed January 2018) showed CPUs themselves leak via speculative
  execution — cited as the scale of the problem. **record** — Kocher et al., Lipp et al.,
  IEEE S&P 2019 papers.
- Dual_EC_DRBG: standardised in NIST SP 800-90 (2006); Dan Shumow & Niels Ferguson (CRYPTO 2007
  rump session) showed the constants could hide a backdoor; September 2013 reporting by the
  New York Times / ProPublica / Guardian, based on Snowden documents, indicated NSA worked to
  make it a standard; Reuters (December 2013, Menn) reported a $10M NSA–RSA Security contract
  making it the BSAFE default — RSA disputed aspects of the characterisation, and the payment
  is presented as *reported*, not proven. NIST recommended against its use and removed it in
  2014 (SP 800-90A Rev. 1 process). **record for the timeline; the $10M figure flagged as
  reported by Reuters**.

## Chapter: Cryptography as a weapon — ransomware

- AIDS Trojan (December 1989, Joseph Popp): mailed diskettes, hid filenames/encrypted file
  names with symmetric crypto, demanded $189 to a Panama PO box — generally counted the first
  ransomware; weak crypto, recoverable. **record** — contemporary reporting; Bates, *Virus
  Bulletin* January 1990 analysis.
- Modern cryptoviral extortion using hybrid public-key ransomware was described academically by
  Young & Yung (IEEE S&P 1996) before it became criminal practice. **record** — their paper.
- CryptoLocker (2013) made public-key ransomware plus Bitcoin payments a criminal business
  model; taken down in Operation Tovar (2014). **record**.
- WannaCry (May 2017) spread via the EternalBlue SMB exploit and included a kill-switch domain
  registered by Marcus Hutchins, halting spread; attributed by the US, UK and others to North
  Korea (public attributions December 2017). **record** — UK NCSC / US CISA advisories, DOJ
  materials.

## Chapter: The quantum horizon

- Peter Shor's algorithm (FOCS 1994; SIAM J. Comput. 1997) factors integers and computes
  discrete logs in polynomial time on a sufficiently large fault-tolerant quantum computer,
  which would break RSA, classic Diffie–Hellman and elliptic-curve cryptography. No such
  machine is known to exist; when one might is an open engineering question. **record** for
  the algorithm; timelines are **estimate** and presented as uncertainty.
- Symmetric ciphers are affected less: Grover's algorithm (1996) gives at most a quadratic
  speedup, so AES-256 remains comfortable. **record**.
- "Harvest now, decrypt later": recording encrypted traffic today to decrypt when quantum
  machines exist — a threat model publicly acknowledged by NSA (CNSA 2.0 FAQ, 2022) and
  national cyber agencies. **record** as a threat model.
- NIST post-quantum standardisation: competition announced 2016; selections announced
  July 2022; final standards published 13 August 2024 — FIPS 203 (ML-KEM, from
  CRYSTALS-Kyber), FIPS 204 (ML-DSA, from CRYSTALS-Dilithium), FIPS 205 (SLH-DSA, from
  SPHINCS+). **record** — NIST announcements and the FIPS documents.
- One PQC finalist parable: SIKE, an isogeny-based candidate, was broken in 2022 by Castryck &
  Decru on a laptop — evidence that public scrutiny is the mechanism doing the work. **record**
  — Castryck & Decru, "An efficient key recovery attack on SIDH" (EUROCRYPT 2023).
- Hybrid deployments (e.g. X25519 + ML-KEM in browsers/TLS from 2023–24, e.g. Chrome's
  X25519Kyber768 rollout) are underway. **record**, described as in-progress.

## Epistemic practices

- No quotations appear on the site unless documented above (Kerckhoffs 1883, Shannon 1949,
  Hinsley's estimate — each sourced to its text).
- War-outcome claims are limited to attributed estimates (Hinsley) and clearly-supported
  operational effects; we never claim a single decryption alone caused a geopolitical outcome.
- Where the division of historical credit is debated (Vernam/Mauborgne; Merkle's share of
  Diffie–Hellman), the site says so.
- Exhibit simplifications (3-rotor demo without plugboard/ring settings; small-number modular
  arithmetic; simulated timing leak) are labelled "simplified demonstration" in the UI.
