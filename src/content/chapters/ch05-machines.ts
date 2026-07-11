import type { Chapter } from '../types';

export const ch05: Chapter = {
  id: 'ch-machines',
  era: 'machine',
  number: 'V',
  kicker: 'Warsaw · December 1932',
  title: 'The machines — and the mathematicians who beat them',
  lede: 'Enigma moved the contest from language to mathematics. It was beaten years before the war began — by three Polish mathematicians almost nobody had heard of.',
  blocks: [
    {
      kind: 'p',
      html: `The First World War killed the hand cipher: radio meant every message was overheard by default, and armies drowned their own cryptographers in traffic. The answer came from engineers. Arthur Scherbius began marketing his <em>Enigma</em> machine commercially in 1923; the German navy adopted a version in 1926, the army in 1928, adding a plugboard that swapped letter pairs on the way in and out. Inside, three wired rotors turned with every key press, so the machine never used the same alphabet twice in succession. The number of possible configurations was astronomical, and German cryptographers judged it secure enough to carry a nation’s military traffic.`,
      sources: ['kahn', 'kozaczuk'],
    },
    {
      kind: 'p',
      html: `Poland could not afford to agree — it sat between Germany and the Soviet Union, and listening was survival. Its Cipher Bureau did something no agency had done before: it hired mathematicians. In December 1932, twenty-seven-year-old Marian Rejewski, working with documents French intelligence had bought from a German traitor — Hans-Thilo Schmidt, a clerk selling key tables and operating instructions to Gustave Bertrand’s service — reconstructed the wiring of the military Enigma’s rotors using the algebra of permutation groups. He never saw the machine. He derived it, from mathematics plus stolen paper: theory and espionage, each useless without the other.`,
      sources: ['rejewski1981', 'kozaczuk'],
    },
    {
      kind: 'p',
      html: `Rejewski, with Jerzy Różycki and Henryk Zygalski, then spent six years staying abreast of German procedure changes — inventing the cyclometer, perforated “Zygalski sheets”, and in 1938 the <em>bomba</em>, a machine for testing rotor settings mechanically. By mid-1939, German procedure changes were outrunning Polish resources. On 25–26 July 1939, five weeks before the invasion, the Poles summoned their French and British counterparts to a forest site at Pyry near Warsaw and gave them everything: the mathematics, the methods, and reconstructed Enigma doubles. The British cryptologists, by their own accounts, arrived expecting little and left stunned.`,
      sources: ['rejewski1981', 'kozaczuk'],
    },
    {
      kind: 'exhibit',
      id: 'rotor',
      title: 'A substitution that never sits still',
      teaches:
        'Why rotor machines defeated frequency analysis: the cipher alphabet changes with every single key press — and why a frozen machine instantly becomes breakable again.',
      fallback:
        'This working model uses the real wirings of Enigma rotors I–III and reflector B. Pressing the same letter repeatedly produces a different cipher letter almost every time, and a histogram shows the flat distribution that starves frequency analysis; freezing the rotors turns it back into the simple substitution you broke in Exhibit 1.',
      note: 'Simplified demonstration: no plugboard, flat ring settings, and plain odometer stepping (the real machine’s turnover was slightly irregular). Rotor and reflector wirings are historical.',
    },
    {
      kind: 'p',
      html: `Bletchley Park industrialised what Pyry delivered. Alan Turing and Gordon Welchman redesigned the bombe around a deeper idea — testing logical consistency of guessed plaintext, the famous <em>cribs</em> — and by mid-war, Ultra intelligence flowed daily from machine traffic. But read the operational histories and a theme repeats: the mathematics opened the door only because German operators kept propping it open. Doubly-enciphered message keys (until 1940), lazy “cillies”, stereotyped weather reports offering predictable cribs, messages re-sent under old and new settings. The machine was strong. The <em>system around it</em> — procedures, habits, people — leaked, and cryptanalysis feeds on exactly that. Mary Stuart’s lesson, mechanised.`,
      sources: ['welchman1982', 'rejewski1981'],
    },
    {
      kind: 'aside',
      title: 'How much did it matter?',
      status: 'estimate',
      paragraphs: [
        `Claims about Ultra’s effect on the war deserve care. Sir Harry Hinsley, official historian of British wartime intelligence, estimated that Ultra shortened the war in Europe by “not less than two years”; other historians regard any such figure as unknowable, and Hinsley himself framed it as counterfactual judgement, not measurement. What the documents do support: Ultra materially shaped the Battle of the Atlantic, Mediterranean convoy interdiction, and Allied deception for D-Day. We report the estimate as an estimate — a war has too many causes for a single number.`,
      ],
      sources: ['hinsley1993'],
    },
    {
      kind: 'aside',
      title: 'Elizebeth and William Friedman',
      status: 'record',
      paragraphs: [
        `The era’s greatest cryptologic marriage began in an eccentric millionaire’s think-tank, testing a crank theory that Francis Bacon wrote Shakespeare. Elizebeth Smith Friedman went on to build and lead the US Coast Guard’s cryptanalytic unit: in the Prohibition years she broke the radio codes of rum-running syndicates and testified as an expert witness in their trials, and in the Second World War her unit broke the Enigma-carried traffic of German intelligence networks operating in South America — work long publicly credited to the FBI while she was bound to silence.`,
        `William Friedman coined the very word “cryptanalysis”, and his 1922 monograph on the index of coincidence brought statistics formally into the field. In 1940 the Army team he led — with Frank Rowlett central — reconstructed Japan’s PURPLE diplomatic cipher machine without ever seeing one, an act of inference so severe it contributed to Friedman’s physical collapse. Between them, the Friedmans stand for this chapter’s quieter thesis: the machines were beaten by people — patient, statistical, underpaid people.`,
      ],
      sources: ['fagone2017', 'friedman1922', 'kahn'],
    },
    {
      kind: 'deeper',
      title: 'Why the break stayed secret for thirty years',
      paragraphs: [
        `Ultra was not declassified until the 1970s, and the Polish contribution took even longer to enter popular history — Rejewski lived to read accounts of “the British break of Enigma” that omitted Poland entirely, and published his own careful record in 1981. The silence had strategic logic: nations that believe their ciphers unbroken keep using them, and several did, for years after 1945. But the cost of secrecy was a distorted history, and it teaches a research lesson this museum takes seriously: in cryptology, the first published story is often the least complete one.`,
      ],
      sources: ['rejewski1981', 'kozaczuk'],
    },
  ],
};
