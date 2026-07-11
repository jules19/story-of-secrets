import type { Chapter } from '../types';

export const epilogue: Chapter = {
  id: 'epilogue',
  era: 'manuscript',
  kicker: 'The contest continues',
  title: 'Epilogue: what the secrets taught us',
  lede: 'Eleven centuries of the contest, five lessons — and one timeline to walk back through.',
  blocks: [
    {
      kind: 'p',
      html: `Walk back through the rooms and the same figures keep appearing in different dress. <strong>Every cipher summons its breaker</strong> — al-Kindī answering the substitution, Rejewski answering Enigma, two Belgians with a laptop answering SIKE. <strong>Trust keeps moving house</strong>: from the messenger to the monarch’s cipher secretary, to the machine, to the mathematics, to the institution, to the audited process — each move made because the previous tenant failed, none of them final. <strong>Theory and deployment are different countries</strong>: the perfect cipher exists and guarded a trickle of hotline words, while the imperfect ones, deployable, carry the world. <strong>The human flaw outweighs the mathematical one</strong>: a factory printing pad pages twice, an operator sending the same message under two keys, a queen writing plainly because she trusted the lock. And <strong>who may hold keys is always political</strong> — the question is the same in the Vienna mail room, the Clipper hearings, and this decade’s encryption debates; only the stationery changes.`,
    },
    {
      kind: 'timeline',
      events: [
        {
          year: 'c. 850',
          text: 'Al-Kindī describes frequency analysis in Baghdad — the breaker’s art is born.',
        },
        {
          year: '1467–1800s',
          text: 'Nomenclators rule European diplomacy; black chambers industrialise interception.',
        },
        {
          year: '1586–87',
          text: 'Mary, Queen of Scots is convicted — and executed — on her own decrypted, forged-postscript correspondence.',
        },
        {
          year: '1883',
          text: 'Kerckhoffs: security must live in the key, never in the secrecy of the method.',
        },
        { year: '1917–19', text: 'Vernam and Mauborgne assemble the one-time pad.' },
        {
          year: '1932',
          text: 'Rejewski reconstructs Enigma’s wiring with permutation theory and purchased documents.',
        },
        {
          year: '1939',
          text: 'Pyry: Poland hands its Enigma break to Britain and France, five weeks before the war.',
        },
        {
          year: '1940s',
          text: 'Bletchley industrialises Ultra; the Friedmans break PURPLE and spy-ring traffic; duplicated Soviet pads seed VENONA.',
        },
        {
          year: '1949',
          text: 'Shannon proves perfect secrecy possible — and prices it beyond general use.',
        },
        {
          year: '1970–74',
          text: 'Ellis, Cocks and Williamson discover public-key cryptography at GCHQ, in secret.',
        },
        {
          year: '1976–78',
          text: 'Diffie, Hellman and Merkle publish key exchange; Rivest, Shamir and Adleman deliver RSA.',
        },
        {
          year: '1977',
          text: 'DES: the first public standard cipher — with a 56-bit key controversy attached.',
        },
        {
          year: '1991–96',
          text: 'PGP spreads worldwide; the Crypto Wars: export rules, Clipper Chip, code-as-speech.',
        },
        {
          year: '1996–99',
          text: 'Kocher: keys read from timing and power. Implementations leak even when mathematics holds.',
        },
        { year: '1998', text: 'Deep Crack brute-forces DES in 56 hours for under $250,000.' },
        {
          year: '2000–01',
          text: 'AES chosen by open worldwide competition — trust moves to public scrutiny.',
        },
        {
          year: '2006–14',
          text: 'Dual_EC_DRBG: a suspected backdoor rides a standards process, and is withdrawn.',
        },
        {
          year: '2013–17',
          text: 'CryptoLocker and WannaCry: cryptography wielded as a weapon at scale.',
        },
        {
          year: '2015–18',
          text: 'Let’s Encrypt and TLS 1.3: the encrypted web becomes the default web.',
        },
        {
          year: '1994 / 2024',
          text: 'Shor’s algorithm poses the quantum threat; NIST standardises post-quantum answers (ML-KEM, ML-DSA, SLH-DSA).',
        },
        {
          year: 'now',
          text: 'Hybrid post-quantum handshakes ship in browsers. Recorded ciphertext waits. The contest continues.',
        },
      ],
    },
    {
      kind: 'p',
      html: `A closing honesty, in the spirit of the fact-labels scattered through these rooms: the history of secrets is itself partly secret. The Polish break of Enigma waited thirty years for public credit; GCHQ’s public-key discovery waited twenty-five; VENONA, forty. It is a statistical certainty that this museum, like every history of cryptography, is missing rooms — breaks unacknowledged, backdoors unproven, contests being won and lost right now in silence. What four thousand years support is not a prediction but a posture: the breakers are always closer than the makers believe, secrecy of method is always temporary, and sunlight — published designs, public attack, auditable trust — is the only preservative that has ever reliably worked.`,
      sources: ['rejewski1981', 'ellis1987', 'venona-nsa'],
    },
    {
      kind: 'pull',
      html: `Assume the enemy knows the system. Assume the enemy is patient. Then build something worth trusting anyway — in public.`,
    },
  ],
};
