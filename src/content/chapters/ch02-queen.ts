import type { Chapter } from '../types';

export const ch02: Chapter = {
  id: 'ch-queen',
  era: 'court',
  number: 'II',
  kicker: 'England · 1586–1587',
  title: 'The cipher that helped to kill a queen',
  lede: 'Mary, Queen of Scots, trusted her cipher enough to put a conspiracy in writing. The men reading her mail were counting on exactly that.',
  blocks: [
    {
      kind: 'p',
      html: `By the 1580s Mary Stuart, the Catholic former queen of Scotland, had spent eighteen years as Elizabeth I’s prisoner in a succession of English country houses. She was the natural figurehead for every Catholic plot against the English throne, and so her letters were watched, which is why the offer that reached her in 1586 seemed heaven-sent: a secure channel. Letters, wrapped waterproof, would ride in and out of Chartley Hall hidden in the bung of a beer barrel. Through this channel the young conspirator Anthony Babington laid out his plan — foreign invasion, domestic uprising, Elizabeth’s assassination, Mary’s rescue — and through it Mary replied. Everything was enciphered with a nomenclator: a substitution alphabet extended with special symbols for common words and names.`,
      sources: ['kahn', 'singh', 'tna-babington'],
    },
    {
      kind: 'p',
      html: `The channel was a trap from the first barrel. Gilbert Gifford, the courier who proposed it, was a double agent working for Sir Francis Walsingham, Elizabeth’s principal secretary and spymaster. Every letter Mary sent or received was carried first to Walsingham’s office, where his cipher secretary Thomas Phelippes — one of the finest cryptanalysts in Europe — deciphered it by exactly the methods al-Kindī had described seven centuries earlier, copied it, resealed it, and sent it onward. Mary and Babington were not corresponding <em>past</em> their enemy. They were corresponding <em>through</em> him.`,
      sources: ['kahn', 'singh'],
    },
    {
      kind: 'p',
      html: `When Mary wrote her considered answer to Babington on 17 July 1586 — the letter accepting the plot — she convicted herself in cipher. Phelippes read it at once. Then Walsingham’s office went one step further: to the deciphered letter they added a forged, enciphered postscript in Mary’s own cipher, asking Babington to name the gentlemen who would carry out the deed. The conspirators were arrested and executed; Mary was tried with her own decrypted correspondence as evidence, and beheaded at Fotheringhay Castle on 8 February 1587.`,
      sources: ['kahn', 'tna-babington'],
    },
    {
      kind: 'pull',
      html: `The most dangerous cipher is not a weak one. It is a weak one you believe to be strong.`,
    },
    {
      kind: 'p',
      html: `That is the lesson this room exists to teach, and it has never stopped being true. Mary’s cipher did not merely fail to protect her — it actively betrayed her, because her <em>confidence</em> in it changed what she was willing to write. Had she believed her letters were being read, she would have written nothing incriminating, or nothing at all. Security is not a property of a lock; it is a belief about an adversary, and when the belief is wrong, the lock becomes the adversary’s best tool. You will see this pattern again in German naval signals, in Soviet cables, and in twenty-first-century standards with quiet flaws inside them.`,
    },
    {
      kind: 'p',
      html: `And notice what Walsingham’s forged postscript really was. Reading Mary’s mail broke the cipher’s <em>confidentiality</em>. Writing convincingly <em>as Mary</em> broke something else — what we would now call <em>authenticity</em>: the assurance that a message comes from the person it claims to. Cryptography would need almost four more centuries to learn how to protect that second thing at all. Keep the distinction in mind; it returns at the end of this story, inside every secure connection your phone makes.`,
      sources: ['kahn'],
    },
    {
      kind: 'aside',
      title: 'Her lost letters, read at last — in 2023',
      status: 'record',
      paragraphs: [
        `The story is still yielding documents. In 2023, three codebreakers — George Lasry, Norbert Biermann and Satoshi Tomokiyo — announced they had decrypted 57 enciphered letters of Mary’s, written mostly between 1578 and 1584, which had sat misfiled and unread in the Bibliothèque nationale de France. The team recovered the cipher with computer search plus the old handcraft. Four centuries on, frequency analysis is still opening her mail.`,
      ],
      sources: ['lasry2023'],
    },
    {
      kind: 'deeper',
      title: 'Why Mary’s cipher fell so easily',
      paragraphs: [
        `Mary’s nomenclator replaced letters with symbols and added dedicated signs for common words — a real improvement over a bare substitution alphabet, since word-symbols carry no letter statistics. But the alphabetic core still leaked frequencies, the word-symbols repeated in guessable positions, and Phelippes had volume: months of intercepted traffic in the same cipher. Volume is the cryptanalyst’s oxygen. A cipher that might survive one short note rarely survives a correspondence.`,
        `Walsingham even extracted more traffic once the case was ripe: his agents’ handling of the channel kept the conspirators writing. An adversary who controls your channel does not just read your secrets — he can shape how many of them you produce.`,
      ],
      sources: ['kahn', 'singh'],
    },
  ],
};
