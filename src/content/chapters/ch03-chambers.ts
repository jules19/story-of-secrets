import type { Chapter } from '../types';

export const ch03: Chapter = {
  id: 'ch-chambers',
  era: 'chamber',
  number: 'III',
  kicker: 'Paris & Vienna · 17th–19th centuries',
  title: 'The paper fortress and the black chambers',
  lede: 'For four hundred years, Europe’s secrets travelled in nomenclators — and its governments built quiet rooms where other people’s mail was opened on an industrial schedule.',
  blocks: [
    {
      kind: 'p',
      html: `After frequency analysis, cipher-makers did not surrender; they compromised. The instrument that dominated European secrecy from the fifteenth century to the nineteenth was the <strong>nomenclator</strong>: part cipher, part codebook. A substitution alphabet handled ordinary words, while hundreds — later tens of thousands — of special symbols stood for whole names, places and phrases: one sign for <em>the King of Spain</em>, another for <em>attack at dawn</em>. Codes and ciphers were not rivals but roommates, bound into the same leather booklets, and the arrangement endured for four centuries precisely because word-symbols carry no letter statistics for a counter to count.`,
      sources: ['kahn'],
    },
    {
      kind: 'p',
      html: `The craft had dynasties. In France, Antoine Rossignol and his son Bonaventure served Louis XIII and Louis XIV so valuably that a study near the king’s own was set aside for them; the <em>Grand Chiffre</em> — the Great Cipher — they built for the Sun King was so well made that after it fell out of use its archive went dark for two hundred years. Only in the 1890s did the French military cryptanalyst Étienne Bazeries, after roughly three years of work, reconstruct it — the symbols, it turned out, stood mostly for syllables, with traps like signs that meant “ignore the previous symbol”. A well-run nomenclator was not embarrassed by the breakers; it outlived them.`,
      sources: ['kahn', 'singh'],
    },
    {
      kind: 'p',
      html: `But the deeper lesson of this era is institutional, not technical. Interception stopped being an art of lone spymasters and became a <em>department</em>. The most admired was Vienna’s <strong>Geheime Kabinettskanzlei</strong> — the Black Chamber. Each morning, mailbags bound for the city’s embassies arrived at the chamber first; letters were melted open, copied at speed by teams of clerks, resealed with forged seals, and returned to the post — the diplomats received their letters barely late, and the copies went to the cryptanalysts. Paris, London and other capitals ran their own <em>cabinets noirs</em>. Every ambassador in Europe wrote in cipher, and every great power read a good part of it anyway.`,
      sources: ['kahn'],
    },
    {
      kind: 'pull',
      html: `Interception was no longer a betrayal of the system. It was the system.`,
    },
    {
      kind: 'p',
      html: `This is the origin of a political fact that will follow us to the end of the story: states came to regard reading other people’s correspondence as a normal, budgeted function of government — and came to regard strong, unreadable cipher in private hands as a problem. When the black chambers finally fell — Britain’s Deciphering Branch was abolished in 1844 after a public scandal over the opened letters of the exiled Italian revolutionary Giuseppe Mazzini, and Vienna’s chamber closed in the revolutions of 1848 — they fell to public outrage, not to better ciphers. The argument between the mail-openers and the letter-writers had begun, and it has never ended; it will return wearing 1990s clothing in the chapter on the Crypto Wars.`,
      sources: ['kahn'],
    },
    {
      kind: 'aside',
      title: 'The ciphers nobody has broken',
      status: 'mystery',
      paragraphs: [
        `Not every old cipher yielded. The <em>Voynich manuscript</em> — about 240 pages of looping, unread script and botanical illustrations, now Beinecke MS 408 at Yale — has defeated every serious attempt at decryption; radiocarbon dating puts its vellum in the early fifteenth century (c. 1404–1438), but whether it is a cipher, an invented language, or an elaborate contemporary hoax remains genuinely open. No claimed solution has achieved scholarly acceptance.`,
        `The <em>Beale ciphers</em> — three number-texts said to point to buried treasure in Virginia — are known only from an 1885 pamphlet. The second text does decode via the Declaration of Independence as a book cipher, which is what keeps the story alive; but the first and third remain unsolved, no treasure has ever been verified, and most careful analysts, Kahn included, lean toward hoax. We flag the difference deliberately: the Voynich is an unsolved artifact; the Beale story is an unsolved <em>claim</em>.`,
        `And the tradition is alive: <em>Kryptos</em>, the sculpture Jim Sanborn installed at CIA headquarters in 1990, carries four encrypted panels. Three are solved. The fourth, at the time of writing, is not.`,
      ],
      sources: ['beinecke', 'beale-pamphlet', 'kahn'],
    },
    {
      kind: 'deeper',
      title: 'Why nomenclators lasted four hundred years',
      paragraphs: [
        `Partly because they worked: the code half of a nomenclator has no letter frequencies to attack, so breaking one meant accumulating traffic, guessing from context, and building the codebook back one symbol at a time — months of labour per correspondent. Partly because of economics: a nomenclator is cheap to use (look symbols up in a booklet) but expensive to attack, a trade that suited slow-moving diplomacy. And partly because of institutional inertia — which cut both ways. Kahn notes that nomenclators were often used long after they were compromised, because reprinting and redistributing codebooks to distant embassies was slow and risky. The key-management problem — how do you get fresh secrets to everyone who needs them, securely, forever — makes its first appearance here, and it will torment every era that follows.`,
      ],
      sources: ['kahn'],
    },
  ],
};
