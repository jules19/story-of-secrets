import type { Chapter } from '../types';

export const ch10: Chapter = {
  id: 'ch-leaks',
  era: 'network',
  number: 'X',
  kicker: 'CRYPTO conference · 1996 / Standards bodies · 2006–2014',
  title: 'Leaky implementations, betrayed standards',
  lede: 'By the 1990s the mathematics was excellent. So the attacks moved — into the physics of the machines running it, and into the committees writing it down.',
  blocks: [
    {
      kind: 'p',
      html: `A cipher is mathematics, but a <em>ciphering device</em> is physics: it takes time, draws current, and radiates. Intelligence agencies had quietly exploited this for decades — the NSA’s TEMPEST program concerned compromising emanations, and in 1985 the Dutch researcher Wim van Eck showed publicly that a video display’s image could be reconstructed from its radio emissions with modest equipment. But the idea detonated in public cryptology in 1996, when Paul Kocher showed that the <em>time</em> a device takes to compute with a private key — RSA, Diffie–Hellman, DSS — varies with the key’s bits, and that an attacker who simply measures many operations can read the key out of the clock. No broken mathematics. Just a machine being honest about its workload.`,
      sources: ['vaneck1985', 'kocher1996'],
    },
    {
      kind: 'exhibit',
      id: 'sidechannel',
      title: 'Reading a secret from a clock',
      teaches:
        'How apparently harmless leakage — response time — reveals secret-dependent information, why averaging defeats noise, and how constant-time code starves the attack.',
      fallback:
        'A simulated PIN pad checks digits one at a time and rejects at the first mismatch, so near-misses take microseconds longer. Playing attacker, you time each candidate digit, average away the noise, and recover the PIN in about forty probes instead of ten thousand guesses — until you switch the device to constant-time comparison and the signal vanishes.',
      note: 'Timings are simulated (microsecond scale, with noise) but the attack structure is faithful to Kocher’s 1996 timing attacks; the averaging trick is exactly how real measurements beat real noise.',
    },
    {
      kind: 'p',
      html: `Three years later Kocher, with Joshua Jaffe and Benjamin Jun, published differential power analysis: smart cards leak their keys through fluctuations in power draw, recoverable with statistics from equipment costing a few hundred dollars. The field it opened has never closed — acoustic leakage from keyboards, cache-timing leaks between programs sharing a processor, and in 2018 Spectre and Meltdown, which showed that the performance machinery inside <em>every modern CPU</em> leaks across security boundaries. The lesson deserves precision: Kerckhoffs said assume the enemy has your machine; the side-channel era says the enemy has your machine <em>even while it is running in your hands</em>. Security proofs live in models; attackers live in the world.`,
      sources: ['kocher1999', 'spectre2018'],
    },
    {
      kind: 'pull',
      html: `The mathematics can be sound while the machine computing it betrays you — and the standard describing it, too.`,
    },
    {
      kind: 'p',
      html: `Which brings us to the committees. In 2006 the US standards body NIST published a recommendation for random-number generators — the component every key on earth depends on — that included an oddly slow elliptic-curve design called <strong>Dual_EC_DRBG</strong>. Within a year, at the 2007 CRYPTO rump session, Dan Shumow and Niels Ferguson showed the design had a peculiar property: whoever generated its built-in constants <em>could have</em> retained numbers letting them predict all its future output from a small sample. Nobody could prove the trapdoor existed — that is the elegance of it — but the possibility alone violated every principle in this museum. In September 2013, reporting by the New York Times, ProPublica and the Guardian, based on documents leaked by Edward Snowden, indicated that the NSA had worked to promote the standard as part of a program to influence cryptography; in December 2013 Reuters reported a $10 million arrangement under which RSA Security had made Dual_EC the default in its widely-used BSAFE library — a characterisation RSA disputed. NIST withdrew the algorithm in 2014.`,
      sources: ['shumow-ferguson', 'nyt-dualec', 'reuters-rsa', 'nist-dualec'],
    },
    {
      kind: 'p',
      html: `Weigh what was damaged. Not a cipher — a <em>process</em>. The AES competition had taught the world to trust open standards as the fruit of adversarial review; Dual_EC showed that a standards pipeline could itself be an attack vector, patient and procedural, exactly as the Black Chambers had been. The repair, once again, was Kerckhoffs-shaped: more public cryptanalysis of standards, nothing-up-my-sleeve constants whose origins can be verified, and a research community that now treats “where did this constant come from?” as a first-order security question. Trust moved again — off the institution and onto the audit.`,
      sources: ['nist-dualec', 'shumow-ferguson'],
    },
    {
      kind: 'deeper',
      title: 'How a constant can hide a master key',
      paragraphs: [
        `Dual_EC works on an elliptic curve with two published points, P and Q. Its security depends on nobody knowing the number d with Q = dP. If the constants were generated honestly — say, from hashing public strings — no such d is known to anyone. But whoever <em>chose</em> Q freely could have chosen it by picking d first, and that d acts as a skeleton key: observe one output block, and the internal state — hence all future “random” numbers, hence the keys built from them — follows. The design is indistinguishable from an honest one from the outside, which is why provenance of constants, not just algorithm review, is now standard practice. It is Kerckhoffs extended one more step: assume the enemy wrote the standard.`,
      ],
      sources: ['shumow-ferguson'],
    },
  ],
};
