import type { Chapter } from '../types';

export const ch04: Chapter = {
  id: 'ch-principle',
  era: 'principle',
  number: 'IV',
  kicker: 'Paris · 1883',
  title: 'The principle: assume the enemy has your machine',
  lede: 'A Dutch linguist teaching in Paris wrote down the sentence that separates ancient cryptography from modern — and it is a sentence about humility.',
  blocks: [
    {
      kind: 'p',
      html: `The telegraph changed the economics of secrecy. By the 1870s a military message might pass through a dozen operators’ hands at machine speed, and armies needed ciphers that thousands of soldiers could use daily under fire — not booklets guarded by two royal cryptologists. In January and February 1883, Auguste Kerckhoffs, a Dutch-born professor of languages in Paris, published “La cryptographie militaire” in the <em>Journal des sciences militaires</em>: a two-part survey with six requirements for any field cipher system.`,
      sources: ['kerckhoffs1883', 'kahn'],
    },
    {
      kind: 'p',
      html: `The second requirement is the immortal one. A military cipher, Kerckhoffs wrote, must not require secrecy of the system itself — it must be able to fall into the enemy’s hands without inconvenience. Everything may be captured, copied, defected with, or bought: the machine, the method, the manual. The <em>only</em> thing whose loss must matter is the key — the one small part you can change tomorrow morning. Designs that depend on the method staying secret are designs that cannot survive contact with an adversary, because methods leak and cannot be replaced.`,
      sources: ['kerckhoffs1883'],
    },
    {
      kind: 'pull',
      html: `Security must live in the key — the one thing you can change — never in the method, the thing you cannot.`,
    },
    {
      kind: 'p',
      html: `Sixty-six years later Claude Shannon, whom we will meet properly two rooms from here, compressed the idea to five words in his 1949 paper: “the enemy knows the system.” Design as if that were already true, because eventually it is. Notice what kind of statement this is — not mathematics but epistemic discipline, a rule about what you are allowed to believe. Mary Stuart died of believing her method was secret. Kerckhoffs’s principle is the institutional form of never believing that again.`,
      sources: ['shannon1949'],
    },
    {
      kind: 'p',
      html: `The principle also planted a question that would take a century to answer: if the method may be public, <em>could</em> it be public — examined by everyone, attacked by everyone, trusted because it survived? The nineteenth century wasn’t ready. Governments kept their methods locked up anyway, through two world wars and beyond. The full journey from secret algorithms to openly published, publicly scrutinised ones is one of the longest arcs in this museum, and it does not complete until an open worldwide competition chose an encryption standard in the year 2000. Keep the principle in your pocket; every room from here on tests it.`,
      sources: ['kahn', 'fips197'],
    },
    {
      kind: 'deeper',
      title: 'All six of Kerckhoffs’s requirements',
      paragraphs: [
        `In paraphrase: (1) the system should be materially, if not mathematically, indecipherable; (2) it must not require secrecy, and must be able to fall into enemy hands without inconvenience; (3) the key must be communicable and memorable without written notes, and changeable at will; (4) the system should be compatible with telegraphy; (5) it must be portable and operable by one person; (6) it must be easy to use — no long rulebooks, no mental strain. Read them again and they are startlingly modern: usability, key management, and deployability appear as first-class security requirements in 1883. Requirements 3 through 6 are the ancestor of every complaint a security engineer has ever filed about a system that is “secure” but unusable — the theory-versus-deployment tension that runs through this whole story.`,
      ],
      sources: ['kerckhoffs1883'],
    },
  ],
};
