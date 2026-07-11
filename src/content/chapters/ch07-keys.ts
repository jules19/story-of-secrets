import type { Chapter } from '../types';

export const ch07: Chapter = {
  id: 'ch-keys',
  era: 'information',
  number: 'VII',
  kicker: 'Cheltenham · 1970 / Stanford · 1976',
  title: 'The key problem, solved twice',
  lede: 'The oldest problem in the field — how do two strangers agree on a secret? — was solved in secret by people who could not tell anyone, and then solved again in public by people who told everyone.',
  blocks: [
    {
      kind: 'p',
      html: `Every system in this museum so far shares one crippling dependency: before you can whisper, you must somehow share a key — by courier, diplomatic bag, beer barrel, or printed pad. Keys were the choke point of four thousand years of practice, and the reason cryptography belonged to states: only states could run the courier networks. By 1970, with computing spreading, the demand for keys was heading toward absurdity. The question was ancient and sounded impossible: could two parties who have <em>never met</em>, speaking only over a wire everyone can hear, end up sharing a secret?`,
      sources: ['kahn', 'levy2001'],
    },
    {
      kind: 'p',
      html: `Yes — and it was discovered twice. At GCHQ in Cheltenham, James Ellis proposed in 1970 that “non-secret encryption” was possible in principle. In 1973 a new recruit, the mathematician Clifford Cocks, heard the open problem and that evening devised a practical method using the difficulty of factoring — mathematically the same idea the world would later call RSA. In 1974 Malcolm Williamson, sceptical, tried to refute Cocks and instead found the discrete-logarithm key agreement the world would later call Diffie–Hellman. All of it was classified. The three could not publish, could not patent, could barely discuss it at lunch. GCHQ acknowledged the work publicly only on 18 December 1997 — weeks after James Ellis had died.`,
      sources: ['ellis1987', 'singh', 'levy2001'],
    },
    {
      kind: 'p',
      html: `The public discovery began from opposite values. Whitfield Diffie — an itinerant cryptography obsessive who drove across America hunting the field’s scattered open literature — and Martin Hellman at Stanford believed cryptography was about to matter to <em>everyone</em>, and that its mathematics belonged in the open. In November 1976 their paper “New Directions in Cryptography” announced public-key cryptography to the world: split the key in two, publish one half, keep the other. Ralph Merkle, then a Berkeley student whose earlier “puzzles” scheme had anticipated key agreement (his course project on it was rejected as uninteresting), joined the effort; Hellman has said the key-exchange system should properly be called Diffie–Hellman–Merkle. In 1977–78, Rivest, Shamir and Adleman at MIT delivered the factoring-based system — RSA — that made the split practical for encryption and, crucially, for <em>signatures</em>: mathematics that could finally do what Walsingham’s forged postscript proved parchment never could.`,
      sources: ['dh1976', 'merkle1978', 'rsa1978', 'levy2001'],
    },
    {
      kind: 'exhibit',
      id: 'keyexchange',
      title: 'Agreeing on a secret in front of an eavesdropper',
      teaches:
        'The conceptual heart of Diffie–Hellman: mixing public and private ingredients so both sides reach the same secret while the wire carries nothing that reveals it.',
      fallback:
        'Two sliders set Alice’s and Bob’s private numbers. A paint-mixing panel (labelled as analogy) shows why blends can cross the wire safely; below it, the real modular arithmetic runs with honest small numbers — g^a mod p travels, the shared secret never does — and shows what the eavesdropper is left holding.',
      note: 'Real deployments use numbers hundreds of digits long (or elliptic curves); p = 23 is for checking the arithmetic yourself. The paint panel is an analogy and says so.',
    },
    {
      kind: 'pull',
      html: `The same mathematics, discovered twice: once as a state secret, once as a public gift. The second discovery is the one that changed the world.`,
    },
    {
      kind: 'p',
      html: `The twin discovery is this museum’s cleanest experiment on a single question: does an idea’s power come from the idea, or from its publication? GCHQ’s version, sealed inside one agency, protected some government links and then waited out two decades in a vault. The Stanford–MIT version, published, spawned an academic discipline, an industry, digital signatures, and eventually the padlock in your browser. And notice the fulcrum on which the whole invention rests: it moved trust itself — away from couriers and institutions and into mathematical problems, factoring and discrete logarithms, believed too hard to reverse. “Believed” is doing real work in that sentence. A later room will test it.`,
      sources: ['levy2001', 'singh'],
    },
    {
      kind: 'deeper',
      title: 'What public keys did not solve',
      paragraphs: [
        `Key <em>agreement</em> was solved; key <em>trust</em> was not. If Alice fetches “Bob’s public key” over the network, who certifies it is really his and not an impostor’s? Public-key cryptography relocated the ancient authentication problem rather than abolishing it. Two answers emerged: hierarchies of certificate authorities (the CA system your browser uses, with its own failure modes — see the TLS room), and webs of personal trust (PGP’s answer, in the next chapter). Neither is fully satisfying, and disputes about key trust remain live engineering and political arguments today.`,
      ],
      sources: ['levy2001'],
    },
  ],
};
