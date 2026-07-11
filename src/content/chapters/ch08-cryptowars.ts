import type { Chapter } from '../types';

export const ch08: Chapter = {
  id: 'ch-cryptowars',
  era: 'cryptowars',
  number: 'VIII',
  kicker: 'Washington · 1975–2000',
  title: 'The Crypto Wars: who is allowed to keep a secret?',
  lede: 'For the first time, strong cryptography was something ordinary people might own. The argument about whether they should — fought over key sizes, export forms, and one chip — lasted twenty-five years.',
  blocks: [
    {
      kind: 'p',
      html: `In 1977 the US government did something with no precedent in the four-thousand-year story: it published a strong cipher for anyone to use. The Data Encryption Standard — grown from IBM’s Lucifer project, reviewed by the NSA, issued as a federal standard — put vetted cryptography into banks, businesses and, in time, software everywhere. It also arrived with two quiet controversies stamped into it. Its internal S-boxes had been altered on advice nobody would explain. And its key had been set at 56 bits — small enough that Whitfield Diffie and Martin Hellman published a paper the same year arguing that a determined, well-funded machine could simply try every key.`,
      sources: ['fips46', 'dh-critique1977', 'levy2001'],
    },
    {
      kind: 'p',
      html: `Both controversies resolved in ways that define the era. The S-box mystery ended honourably: when Eli Biham and Adi Shamir published the powerful technique of differential cryptanalysis in 1990, DES turned out to be strangely resistant — and Don Coppersmith of IBM confirmed in 1994 that the design team had known the attack in 1974 and been asked to keep the reasoning quiet. The key size resolved brutally: in July 1998 the Electronic Frontier Foundation built <em>Deep Crack</em> for under $250,000 and found a DES key in 56 hours; with distributed.net in January 1999, 22 hours 15 minutes. The 1977 critique had been arithmetic, not paranoia. Try that arithmetic yourself:`,
      sources: ['coppersmith1994', 'eff-descrack'],
    },
    {
      kind: 'exhibit',
      id: 'bruteforce',
      title: 'Every bit doubles the search',
      teaches:
        'How key size, computing power and time interact: why 56 bits died in a weekend, why 128 bits outlives the universe, and why key-size arguments were really political arguments.',
      fallback:
        'A slider sets the key size (40-bit export grade, 56-bit DES, up to AES-256) and a menu sets the adversary, from one laptop to the EFF’s 1998 Deep Crack machine to a planet of repurposed miners. The display converts the expected search into human time on a logarithmic scale running from seconds past the age of the universe.',
      note: 'Attacker speeds are order-of-magnitude illustrations (the Deep Crack figure is historical). Brute force is the weakest attack — real breaks usually come from cleverness, which is the point of the chapters around this one.',
    },
    {
      kind: 'p',
      html: `Meanwhile the state fought distribution itself. Under US export rules, cryptography was classed with munitions; software shipped abroad was long limited to keys around 40 bits — breakable by a student’s computer by the mid-1990s. In 1991 Phil Zimmermann, alarmed by legislation threatening access to encryption, released <strong>PGP</strong> — Pretty Good Privacy, RSA-based, free — and it spread across Usenet to the world within days. The government opened a criminal investigation into Zimmermann for unlicensed export of munitions; it ran about three years before being dropped in January 1996 without charges. In the middle of it, MIT Press published PGP’s complete source code as a printed book — books being protected speech that no export regulation dared touch — and the mathematician Daniel Bernstein sued outright; a Ninth Circuit panel held in 1999 that source code is speech protected by the First Amendment (the opinion was later withdrawn for rehearing as the rules collapsed). In January 2000 the export regime was substantially relaxed. The mail-openers of Chapter III had met the letter-writers, and this round went to the letter-writers.`,
      sources: ['zimmermann-essay', 'levy2001', 'export-relax-2000'],
    },
    {
      kind: 'aside',
      title: 'The Clipper Chip, 1993–1996',
      status: 'record',
      paragraphs: [
        `The government’s compromise offer was hardware: the Clipper Chip, carrying a classified NSA cipher called Skipjack, would encrypt strongly — while depositing a copy of each device’s key with government escrow agents, retrievable under legal authority. Every conversation would carry a Law Enforcement Access Field (LEAF) enabling that access. In 1994 Matt Blaze of Bell Labs published a protocol analysis showing the LEAF’s 16-bit checksum could be brute-forced, letting a rogue user produce a valid-looking field that the escrow system could not actually open — encryption without the promised access. Between the technical embarrassment, industry hostility and public distrust, the initiative was dead by 1996. Its ghost returns in every subsequent proposal for “exceptional access”, and so does Blaze’s underlying lesson: a backdoor is a feature for exactly as long as only the right people can find it.`,
      ],
      sources: ['blaze1994', 'levy2001'],
    },
    {
      kind: 'p',
      html: `The era closed with the state completing the long arc from Kerckhoffs. To replace DES, the US ran an open, worldwide competition (1997–2000): fifteen candidate ciphers, published designs, years of public attack by rival teams, open conferences scoring the survivors. The winner — Rijndael, by the Belgians Joan Daemen and Vincent Rijmen — became AES in 2001. Read that sentence against Chapter III: the US government adopted, as its own standard, a foreign cipher chosen by public adversarial review. Trust had migrated again — from the authority of institutions to the <em>process</em> of open scrutiny. It is the model still used for cryptographic standards today, and it is the direct ancestor of the post-quantum competition in this museum’s final room.`,
      sources: ['fips197'],
    },
    {
      kind: 'deeper',
      title: 'Why “just escrow the keys” keeps failing',
      paragraphs: [
        `The Crypto Wars’ central technical claim, made by cryptographers across three decades, is that access mechanisms are not policy features bolted onto mathematics — they are attack surface. An escrow database is the highest-value target on earth; a checksum that gates lawful access is a checksum that gates unlawful access; complexity added for oversight is complexity available to adversaries. Blaze’s LEAF result made the argument concrete in 1994, and later standards-sabotage episodes (one room ahead) made it institutional. Reasonable societies keep re-litigating the policy question — but the engineering asymmetry, that it is far easier to weaken everyone than to weaken only villains, has not moved.`,
      ],
      sources: ['blaze1994', 'levy2001'],
    },
  ],
};
