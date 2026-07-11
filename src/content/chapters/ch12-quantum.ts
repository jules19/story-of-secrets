import type { Chapter } from '../types';

export const ch12: Chapter = {
  id: 'ch-quantum',
  era: 'quantum',
  number: 'XII',
  kicker: 'The near future · 1994–2035?',
  title: 'The quantum horizon',
  lede: 'For the first time in the story, the defenders are rebuilding everything before the attack exists — because this attack, uniquely, works backwards in time.',
  blocks: [
    {
      kind: 'p',
      html: `In 1994 Peter Shor, a mathematician at Bell Labs, proved that a sufficiently large quantum computer could factor integers and compute discrete logarithms in polynomial time. Those two problems are not incidental: they are the “believed too hard to reverse” foundations from Chapter VII, under RSA, classic Diffie–Hellman, and their elliptic-curve descendants — the public-key layer of essentially every secure connection on earth. No machine capable of running Shor’s algorithm at scale exists; building one requires quantum error correction at a scale that remains an open engineering problem, and serious estimates of arrival range from a decade to never. The honest statement is uncertainty — and uncertainty, for defenders, is not comfort.`,
      sources: ['shor1994'],
    },
    {
      kind: 'p',
      html: `Because this threat, uniquely in the museum, reaches <em>backwards</em>. Ciphertext is forever: an adversary who records today’s encrypted traffic — cheap, silent, already prudent tradecraft — can decrypt it whenever the machine arrives. The strategy is called <strong>harvest now, decrypt later</strong>, and it is not speculation about anyone’s intent; it is the stated planning assumption of national security agencies, including the NSA’s rationale for its post-quantum migration timeline. Whether your secrets are safe therefore depends on an inequality (the cryptographer Michele Mosca’s formulation): if how long your data must stay secret, plus how long migration takes, exceeds the years until a capable machine — you are already late, today, in a world where no such machine exists.`,
      sources: ['cnsa-2'],
    },
    {
      kind: 'exhibit',
      id: 'harvest',
      title: 'Ciphertext is forever',
      teaches:
        'The harvest-now-decrypt-later threat model: why data recorded today inherits tomorrow’s attacks, and how post-quantum (hybrid) protection changes the story.',
      fallback:
        'You send a message in 2026 that must stay secret for decades; an adversary records it immediately. Choose classical (RSA/ECC) or hybrid post-quantum protection, set your own assumption for when a code-breaking quantum computer arrives, and drag time forward to see when — and whether — the recording opens, measured against how long the secret needed to live.',
      note: 'The arrival year of a cryptanalytically relevant quantum computer is unknown and possibly never; the slider sets a scenario, not a prediction.',
    },
    {
      kind: 'p',
      html: `The response completed the arc this museum has been tracing since Kerckhoffs. In 2016 NIST opened a public, worldwide competition for quantum-resistant algorithms — the AES process, aimed at the future. Eighty-two submissions, years of open cryptanalysis, several celebrated casualties: most instructively SIKE, an elegant finalist-round candidate that in 2022 fell not to a quantum computer but to two Belgian mathematicians and a classical laptop, using century-old mathematics newly applied. Its authors conceded within days. That collapse was the process <em>working</em> — better a public funeral in 2022 than a private skeleton key in 2035. In August 2024 the survivors became standards: ML-KEM for key establishment, ML-DSA and SLH-DSA for signatures, resting on lattice and hash problems that resist both kinds of computer as far as anyone can show.`,
      sources: ['nist-pqc', 'sike-break'],
    },
    {
      kind: 'p',
      html: `The migration is now the largest coordinated cryptographic transition ever attempted, and it is happening mostly where you cannot see it: browsers and servers began deploying <em>hybrid</em> key exchanges — classical elliptic-curve plus ML-KEM, both locks on the same door — in 2023–24, so that traffic is protected unless <em>both</em> mathematical worlds fail. Note the humility in that design. After Mary’s misplaced confidence, after Enigma’s, after Dual_EC, the field’s answer to “is the new mathematics sound?” is: <em>we believe so, and we are not betting your mail on belief alone</em>. Symmetric ciphers, for the record, mostly shrug — Grover’s algorithm offers only a quadratic quantum speedup, so AES-256 stays comfortable. It is the public-key layer, the 1976 miracle, being rebuilt in flight.`,
      sources: ['nist-pqc', 'grover1996'],
    },
    {
      kind: 'pull',
      html: `Four centuries ago the question was whether a queen’s cipher would outlive her secrets. It is still the question — the queen is now everyone.`,
    },
    {
      kind: 'deeper',
      title: 'What lattices ask you to trust',
      paragraphs: [
        `ML-KEM’s security rests on the hardness of problems about lattices — roughly: in a grid of points in hundreds of dimensions, given a scrambled description of the grid, find an unusually short vector in it. Decades of attack, classical and quantum, have made no fundamental dent, and the NIST process battle-tested the specific designs. But the honest epistemic status is the same as factoring’s in 1978: <em>no efficient attack is known</em>, which is different from <em>no efficient attack exists</em>. Nobody has proved these problems hard; nobody has proved factoring hard either. Cryptography’s foundations remain conjectures policed by public adversarial scrutiny — which, as this museum has argued from Baghdad onward, is the only policing that has ever reliably worked.`,
      ],
      sources: ['nist-pqc'],
    },
  ],
};
