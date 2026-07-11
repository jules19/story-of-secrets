import type { Chapter } from '../types';

export const ch06: Chapter = {
  id: 'ch-shannon',
  era: 'information',
  number: 'VI',
  kicker: 'Bell Labs · 1945–1949 / Arlington Hall · 1943–1980',
  title: 'The perfect cipher and its human flaw',
  lede: 'Cryptography acquired a theory: perfect secrecy exists, and it is provable. It also acquired the most instructive failure in the whole story — perfection, reused.',
  blocks: [
    {
      kind: 'p',
      html: `In 1917 Gilbert Vernam, an engineer at AT&T, built a cipher into the teleprinter itself: punch a tape of key characters, add each one to the message character electrically, and the wire carries gibberish. Joseph Mauborgne of the Army Signal Corps is credited with seeing the crucial refinement — the key tape must be truly random, as long as the message, and <em>never used twice</em>. The one-time pad was born, though the exact division of credit between the two (and possibly earlier, unpublished anticipations) is a matter historians still argue; Kahn gives Mauborgne the decisive insight.`,
      sources: ['vernam-patent', 'kahn'],
    },
    {
      kind: 'p',
      html: `Three decades later Claude Shannon — the Bell Labs mathematician whose 1948 paper had just invented information theory — published its classified sibling, “Communication Theory of Secrecy Systems” (written by 1945, published 1949). It did something no one had done in four thousand years: it defined secrecy mathematically and <em>proved</em> things about it. Perfect secrecy — ciphertext revealing precisely nothing about the message, no matter the adversary’s computing power — is achievable, and the one-time pad achieves it. And it comes with a price tag, also proved: the key must contain at least as much randomness as everything it will ever protect. Perfection is real, and it costs a key the size of your correspondence.`,
      sources: ['shannon1949'],
    },
    {
      kind: 'pull',
      html: `The perfect cipher exists. Almost nobody can afford it — and those who could, sometimes couldn’t afford it either.`,
    },
    {
      kind: 'exhibit',
      id: 'otp',
      title: 'Perfect secrecy, and one fatal shortcut',
      teaches:
        'Why the one-time pad is unconditionally secure with fresh keys — and why reusing a key once lets an interceptor cancel it out entirely, no codebreaking required.',
      fallback:
        'Two pictogram messages are XORed with random key bits. With independent keys, every ciphertext panel is indistinguishable from coin flips. Switch to a reused key and XOR the two ciphertexts together: the key cancels — C1 ⊕ C2 = A ⊕ B — and both pictures surface without anyone touching the key.',
      note: 'The pictures stand in for text; the arithmetic (bitwise XOR) is exactly what teleprinter one-time systems used.',
    },
    {
      kind: 'p',
      html: `Now the failure. During the Second World War, Soviet intelligence services protected their cable traffic with one-time pads — the unbreakable system. But wartime pressure on pad production led to a batch of key pages being duplicated: roughly thirty-five thousand pages went out twice, to different networks. American codebreakers at Arlington Hall — the project began in 1943 with Gene Grabeel, with Meredith Gardner’s linguistic breakthroughs from 1946 — spent years finding the duplicate-key pairs and prising them apart, exactly as the exhibit above shows: two ciphertexts, one key, key cancels. The project, eventually codenamed <strong>VENONA</strong>, ran until 1980 and read portions of thousands of messages; released publicly in 1995, the decrypts documented Soviet espionage inside the Manhattan Project and identified agents including Klaus Fuchs and the network around Julius Rosenberg.`,
      sources: ['venona-nsa', 'haynes-klehr'],
    },
    {
      kind: 'p',
      html: `Hold the full weight of that. The Soviets used the only provably unbreakable cipher in existence, and it was read — not because Shannon’s theorem failed, but because a factory under wartime pressure printed some pages twice. The mathematics was perfect; the <em>key management</em> was human. This is the pattern this museum keeps returning to, and nowhere is it purer: between theoretical security and deployed security stands an organisation, and organisations have deadlines.`,
      sources: ['venona-nsa'],
    },
    {
      kind: 'deeper',
      title: 'Why not use one-time pads for everything?',
      paragraphs: [
        `Because Shannon’s price tag is merciless. Protect a gigabyte of traffic and you must first share a gigabyte of true randomness — by courier, since you cannot encrypt it (with what key?) — then store it securely at both ends, use every bit exactly once, and destroy it. Hotlines and spies with silk-printed pads could pay that price for a trickle of critical words. A bank, an army, or the internet cannot. So the world runs instead on ciphers that are <em>conjecturally</em> secure — compact keys, security resting on problems we believe are hard. Shannon proved where the ceiling is; everything below it is engineering and, ultimately, key logistics. VENONA is what the gap between the ceiling and the floor looks like in practice.`,
      ],
      sources: ['shannon1949', 'kahn'],
    },
  ],
};
