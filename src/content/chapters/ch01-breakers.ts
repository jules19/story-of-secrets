import type { Chapter } from '../types';

export const ch01: Chapter = {
  id: 'ch-breakers',
  era: 'manuscript',
  number: 'I',
  kicker: 'Baghdad · ninth century',
  title: 'Every cipher summons its breaker',
  lede: 'Secret writing is older than paper. The art of unmaking it was born in a library in Baghdad — and it has stalked every cipher ever since.',
  blocks: [
    {
      kind: 'p',
      html: `For most of recorded history, anyone who wanted to send a message safely had two crafts to choose from. The first was to hide the message itself. Herodotus tells of a Greek who shaved a trusted slave’s head, tattooed a message of revolt onto his scalp, and waited for the hair to grow back before sending him — secrecy, at walking pace. The second craft was stranger and more durable: let the message travel in plain sight, but scramble it so that only the right reader could restore it. The first craft is steganography, the art of hiding. The second is cryptography, the art of scrambling — and it is the one that would go on to shape wars, treaties, and eventually the machine you are reading this on.`,
      sources: ['kahn', 'singh'],
    },
    {
      kind: 'p',
      html: `Early scrambling took two basic forms, and every cipher since has been built from them. You can move letters around — <em>transposition</em> — or you can replace each letter with something else — <em>substitution</em>. Suetonius reports that Julius Caesar protected his private correspondence with a substitution of the simplest kind: each letter shifted a fixed distance down the alphabet, so that <span class="x-inline-mono">A</span> became <span class="x-inline-mono">D</span>. A schoolchild can break it today. For centuries, almost nobody could.`,
      sources: ['suetonius', 'kahn'],
    },
    {
      kind: 'aside',
      title: 'The Spartan cipher stick, probably a myth',
      status: 'estimate',
      paragraphs: [
        `The <em>skytale</em> — a strip of leather wound around a rod so that writing along the rod scrambles when unwound — is the standard classroom example of ancient transposition. But the classical sources describing it as a cipher device are late, and the historian Thomas Kelly has argued the cryptographic skytale is largely a later invention. We tell you this here because it sets the rule for this whole site: where the evidence is thin, we say so.`,
      ],
      sources: ['kelly-skytale'],
    },
    {
      kind: 'p',
      html: `The general form of substitution — replace the alphabet with a shuffled alphabet, known only to sender and receiver — looks far stronger than Caesar’s shift. There are about 400 septillion ways to shuffle 26 letters (a 4 followed by 26 zeros). No army of clerks could ever try them all, and for roughly a thousand years the users of such ciphers could reasonably believe their secrets were safe.`,
      sources: ['singh'],
    },
    {
      kind: 'p',
      html: `They were not. In ninth-century Baghdad, at the height of the Abbasid translation movement, the polymath Abū Yūsuf al-Kindī — philosopher, physician, mathematician, working amid the city’s great libraries — wrote a treatise called <em>On Extracting Obscured Correspondence</em>. It is the oldest surviving description of what we now call <strong>frequency analysis</strong>, and it rests on a devastating observation: you do not need to try every key, because language betrays itself. In any long passage of a given language, some letters appear far more often than others. Scrambling the alphabet disguises each letter’s face, but not its habits. Count the symbols in a ciphertext, line the counts up against the known habits of the language, and the disguise begins to fall away. The manuscript itself was lost for centuries and rediscovered in an Istanbul archive in the twentieth century.`,
      sources: ['alkadi', 'singh', 'kahn'],
    },
    {
      kind: 'pull',
      html: `A secret can be attacked without being opened — by listening to its shape.`,
    },
    {
      kind: 'exhibit',
      id: 'frequency',
      title: 'Break a cipher with your own hands',
      teaches:
        'Why a shuffled alphabet — 400 septillion possible keys — falls to simple counting: language leaks through every simple substitution.',
      fallback:
        'In this exhibit you encrypt a passage with a randomly shuffled alphabet, then attack it the way al-Kindī described: compare the ciphertext’s letter counts with ordinary English letter frequencies, swap symbols one by one, and watch readable words surface long before you have recovered the whole key.',
      note: 'The reference frequencies are a standard published English table (Lewand 2000). Real cryptanalysts also use letter pairs and probable words — the “Go deeper” panel below explains how.',
    },
    {
      kind: 'deeper',
      title: 'How a real frequency attack proceeds',
      paragraphs: [
        `Counting single letters is only the opening move. Practitioners lean just as hard on <em>pairs</em>: in English, Q is almost always followed by U; H usually follows T or C; doubled letters are usually LL, EE, SS, OO or TT. Short words are a gift — a one-letter word is A or I; a three-letter word beginning a sentence is very often THE. Each guess constrains the next, so the attack accelerates: recovering the first five or six letters of the key often collapses the rest in minutes.`,
        `This is why ciphertext length matters. A five-word note may genuinely resist frequency analysis — the statistics haven’t settled. A page of it is doomed. Cipher clerks understood this dimly for centuries, which is why the shortest messages carried the biggest secrets.`,
      ],
      sources: ['kahn', 'lewand2000'],
    },
    {
      kind: 'p',
      html: `Al-Kindī’s treatise marks the true beginning of this story — not because it broke one cipher, but because it revealed the permanent condition of the field. From that century on, cryptography has been a <em>contest</em>: every method of making secrets eventually summons a method of breaking them, and the breakers usually arrive quietly, and first tell no one. The makers, meanwhile, tend to find out the hard way. In the next room is the most famous woman who ever found out the hard way.`,
      sources: ['kahn'],
    },
  ],
};
